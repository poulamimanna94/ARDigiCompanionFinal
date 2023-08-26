import AllActions from '../redux/AllActions';
import RNFS from 'react-native-fs';

function writeFiles(data, offlineOnlineMode, dispatch) {
  if (offlineOnlineMode) {
    RNFS.writeFile(RNFS.ExternalDirectoryPath + '/MYIPPORT.txt', data)
      .then(() => {
        dispatch(AllActions.closeConfigurationModal());
        dispatch(AllActions.isIpConfigured());
        dispatch(AllActions.errorPopup('Server configured successfully !'));
        ReadFiles(dispatch, offlineOnlineMode);
      })
      .catch(err => {
        dispatch(AllActions.errorPopup('Not configured !'));
      });
  } else {
    RNFS.writeFile(RNFS.ExternalDirectoryPath + '/MYUSERDATA.txt', data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  }
}

function ReadFiles(dispatch, offlineOnlineMode) {
  RNFS.readDir(RNFS.ExternalDirectoryPath)
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        if (offlineOnlineMode) {
          if (result[i].name === 'MYIPPORT.txt') {
            return Promise.all([RNFS.stat(result[i].path), result[i].path]);
          }
        } else {
          if (result[i].name === 'MYUSERDATA.txt') {
            return Promise.all([RNFS.stat(result[i].path), result[i].path]);
          }
        }
      }
    })
    .then(statResult => {
      if (statResult) {
        if (statResult[0].isFile()) {
          return RNFS.readFile(statResult[1], 'utf8');
        }
      }
      return 'no file';
    })
    .then(contents => {
      if (contents === 'no file') {

        return
      }

      if (offlineOnlineMode) {
        let ipPortData;
        
        if (contents.indexOf('}') + 1 !== -1) {
          ipPortData = contents.substr(0, contents.indexOf('}') + 1);
          ipPortData = JSON.parse(ipPortData);
          
        } else {
          ipPortData = { ip: '', port: '' };
        }
        dispatch(AllActions.isIpConfigured());
        dispatch(AllActions.ipConfigured(ipPortData));
      } else {
        if (contents.match('-')) {
          dispatch(AllActions.offlineUserData(contents));
        }
      }
    })
    .catch(err => {
      console.log('inside error', err);
      console.log(err.message, err.code);
    });
}
async function ReadUserDataFile() {
  let userData ;
  await RNFS.readDir(RNFS.ExternalDirectoryPath)
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].name === 'UserData.txt') {
          return Promise.all([RNFS.stat(result[i].path), result[i].path]);
        }
      }
    })
    .then(statResult => {
      if (statResult) {
        if (statResult[0].isFile()) {
          return RNFS.readFile(statResult[1], 'utf8');
        }
      }
      return 'no file';
    })
    .then(contents => {
      console.log('user data file = ', contents);
      userData = contents;
    })
    .catch(err => {
      console.log('inside error', err);
      userData = 'no data';
    });
  
   return userData;
}
function writeUserData(data) {
  RNFS.writeFile(RNFS.ExternalDirectoryPath + '/UserData.txt', data)
    .then(() => {
      console.log('Success');
    })
    .catch(err => {
      dispatch(AllActions.errorPopup('Not configured !!!'));
    });
}

async function deleteFile(userDataToWrite) {
  const filepath = RNFS.ExternalDirectoryPath + '/UserData.txt';
  let exists = await RNFS.exists(filepath);
  if (exists) {
    RNFS.unlink(filepath);
    console.log('File Deleted');

  } else {
    console.log('File Not Available');
  }
}

export { writeFiles, ReadFiles, writeUserData, ReadUserDataFile, deleteFile };
