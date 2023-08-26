import {StyleSheet} from 'react-native';

const ScanCss = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
      },
      subContainer: {
         width: '100%',
        backgroundColor: 'white',
        flex: 0.3,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 30,

      },
      inputStyle: {
       
        color: 'black',
        backgroundColor: 'white',
        fontFamily: 'SiemensSans-Roman',
        borderBottomColor: 'lightblue',
        borderBottomWidth: 2,
        fontSize: 25,
        width: 300,
        height: 50,
        
      
      },
      logo: {
       
        height: 50,
        width: 50,
      },

      bar: {
        flex: 0.2,
        height: 3,
        width: 50,
        backgroundColor: "#BECDD7",
        marginLeft: 150,
        marginBottom: 10  
      },

      toggleView: {
        position: 'absolute',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'flex-end',
        right: 2,
        top: 50,
        zIndex: 1
      },
      switchContainer: {alignItems: 'flex-end'},
});

export default ScanCss;