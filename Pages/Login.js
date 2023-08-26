import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  View,
  ToastAndroid,
  ScrollView
} from 'react-native';
import axios from 'axios';
import AllActions from '../redux/AllActions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loader';
import Configuration from '../Pages/Configuration';
import LoginCss from '../css/LoginCss';
import ErrorPopup from '../components/ErrorPopup';
import {
  deleteFile,
  ReadFiles,
  ReadUserDataFile,
  writeUserData,
} from '../utils/ReadWriteFunc';
import {
  TopView,
  MiddleView,
} from '../components/LoginComponents/LoginComponents';
import base64 from 'react-native-base64';
import Orientation from 'react-native-orientation';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';

const Login = () => {
  const offlineOnlineMode = useSelector(state => state.offlineOnlineMode);
  const ipPortData = useSelector(state => state.ipPortData);
  const isIpConfigured = useSelector(state => state.isIpConfigured);
  const [loginLoader, setLoginLoader] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [invalidAttemptCount, setInvalidAttemptCount] = React.useState(0);
  const [tenantId, setTenantId] = React.useState('');
  const [timerDuration, setTimerDuration] = React.useState(60);
  const [headerLoginError, setHeaderLoginError] = React.useState(false);
  const [user, setUser] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(true);
  const [timerInterval, setTimerInterval] = useState({
    a: 0,
    b: 1,
  })
  const [factor, setFactor] = React.useState(0);



  const timeOutInterval = React.useRef(null);
  const regularInterval = React.useRef(null);

  React.useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

  React.useEffect(() => {
    if (invalidAttemptCount >= 3) {
      setFactor(timerDuration);
      setHeaderLoginError(true);
      setLoginLoader(true);
      regularInterval.current = setInterval(() => {
        setTimerDuration(prev => prev - 1);
      }, 1000);
    }

  }, [invalidAttemptCount])

  React.useEffect(() => {
    if (timerDuration <= 0) {
      setLoginLoader(false);
      setHeaderLoginError(false);
      setError(false);

      let c = timerInterval.a + timerInterval.b;
      setTimerInterval({
        a: timerInterval.b,
        b: c
      })
      setTimerDuration(factor);
      setTimerDuration(factor * c);
      clearInterval(regularInterval.current);
    }

    return () => clearTimeout(timeOutInterval.current);
  }, [timerDuration]);

  React.useEffect(async () => {
    // const storedUserData = await ReadUserDataFile();
    // const parsedData = JSON.parse(storedUserData);
    // if (parsedData && ipPortData.ip) {
    //  // syncAlreadySignedUser(parsedData.SessionKey.trim(), parsedData.username.trim());
    // }
  }, [ipPortData])

  const onAutoLoginFailed = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  function syncAlreadySignedUser(accessToken, userName) {

    try {
      if (accessToken) {
        setLoginLoader(true);

        const headers = {
          Authorization: 'Bearer ' + accessToken,
        };

        axios
          .get(
            `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/user-auth/i/sync?name=${user.username}`,
            { headers },
          ).finally(() => { setLoginLoader(false) })
          .then(response => {
            dispatch(AllActions.getUserDetails(response.data));
            dispatch(AllActions.userLoggedIn(accessToken));
            dispatch(AllActions.setUserName("admin"));
          })
          .catch((err) => {
            onAutoLoginFailed('Session key Expired. \n Please login again')
            console.log(err);
          });
      }
    }
    catch (e) {
      onAutoLoginFailed('Session key Expired. \n Please login again')
    }

  }

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);

    });

    return () => unsubscribe();
  }, [])


 
  

  async function syncUser(accessToken) {

    const retValue = {
      res: false,
    }
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    await axios
      .get(
        `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/user-auth/i/sync?name=${user.username}`,
        { headers },
      )
      .then(response => {
        dispatch(AllActions.getUserDetails(response.data));
        dispatch(AllActions.userLoggedIn(response.data.id_token));
        dispatch(AllActions.setUserName("admin"));

        retValue.res = true;

      })
      .catch(() => {
        dispatch(AllActions.errorPopup('Something went wrong'));
        retValue.res = false;
      });


    return Promise.resolve(retValue.res);
  }

  function onFocusTextBox() {
    if (error) {
      setError(false);
    }
  }

  async function validate() {

    setLoginLoader(true);

    if (user.password.length === 0 || user.password.trim() === '') {
      setLoginLoader(false)
      setError(true);
      setInvalidAttemptCount((prev) => setInvalidAttemptCount(prev + 1));
      return;
    }

    if (user.username.length === 0 || user.username.trim() === '') {
      setLoginLoader(false)
      setError(true);
      setInvalidAttemptCount((prev) => setInvalidAttemptCount(prev + 1));
      return;
    }

    if (!isIpConfigured) {
      dispatch(AllActions.errorPopup('Configure server and port !'));
      setLoginLoader(false)
      return;
    }
    user.rememberMe = true;
    const userToPass = {
      username: user.username.trim(),
      password: user.password,
      rememberMe: user.rememberMe,
    }
    if(tenantId !== "master"){
      console.log("hello")
    axios
      .post(
        `${ipPortData.protocol}://${ipPortData.ip}:${ipPortData.port}/api/${tenantId}/user-auth/authorize`,
        userToPass,
      )
      .finally(() => setLoginLoader(false))
      .then(response => {
        syncUser(response.data.id_token)
          .then(async (res) => {
            console.log(res, "login response")
            if (res) {
              dispatch(AllActions.setTenantID(tenantId));
              dispatch(AllActions.userLoggedIn(response.data.id_token));
              dispatch(AllActions.setUserName("admin"));
              await AsyncStorage.setItem('@Key', response.data.id_token)
              await AsyncStorage.setItem('@username', user.username);
              await AsyncStorage.setItem('@hostname', ipPortData.ip);
              await AsyncStorage.setItem('@port', ipPortData.port);
              await AsyncStorage.setItem('@protocol', ipPortData.protocol);
              await AsyncStorage.setItem('@tenantId', tenantId);
              const userData = {
                SessionKey: response.data.id_token,
                username: user.username,
                port: ipPortData.port,
                ip: ipPortData.ip,
              };
              deleteFile(JSON.stringify(userData))
                .then(() => {
                  writeUserData(JSON.stringify(userData));
                  ReadUserDataFile();
                })
                .catch(err => {
                  console.log(err);
                });
            }
            else {
              dispatch(AllActions.errorPopup('Something went wrong.'));
            }
          })


      })
      .catch(() => {
        setError(true);
        setInvalidAttemptCount((prev) => setInvalidAttemptCount(prev + 1));
      });
    }

    else {
      dispatch(AllActions.errorPopup('master not allowed to login'));
        setError(true);
        setInvalidAttemptCount((prev) => setInvalidAttemptCount(prev + 1));
        setLoginLoader(false)
    }
  }

  const handleUsername = username => {
    setUser({
      ...user,
      username: username,
    });
  };

  const handlePassword = password => {
    setUser({
      ...user,
      password: base64.encode(password),
    });
  };

  React.useEffect(() => {
    Orientation.lockToPortrait();
  }, [])

  useEffect(() => {
    if (offlineOnlineMode && Object.entries(ipPortData).length === 0) {
      ReadFiles(dispatch, offlineOnlineMode);
    }
  }, [offlineOnlineMode]);


  return (
    <ScrollView behavior='padding' style={LoginCss.container}>
      <StatusBar
        backgroundColor={'#190D35'}
        animated={true}
      />
      <Configuration />
      <ErrorPopup />
      <Loading />
      <TopView />
      <View style={LoginCss.middleView}>
        <MiddleView
          user={user}
          headerLoginError={headerLoginError}
          timerDuration={timerDuration}
          invalidAttemptCount={invalidAttemptCount}
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          showPassword={showPassword}
          error={error}
          tenantId={tenantId}
          setTenantId={setTenantId}
          onFocusTextBox={onFocusTextBox}
          isIpConfigured={isIpConfigured}
          AllActions={AllActions}
          setShowPassword={setShowPassword}
          validate={validate}
          loginLoader={loginLoader}
          dispatch={dispatch}
        />
      </View>
    </ScrollView>
  );
};

export default Login;
