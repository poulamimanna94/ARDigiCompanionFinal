import { StyleSheet} from 'react-native';
import { height, width } from '../utils/Constants';



const MyTaskListCss = StyleSheet.create({
   header: {
      height: 50,
      width: "100%",
      backgroundColor: "#FFFFFF",
      borderBottomColor: '#BECDD7',
      borderBottomWidth: 1,
   },
   card: {
    padding:15,
   },
   footerCard: {
      paddingHorizontal:15,
      justifyContent:'space-between',
      flexDirection: "row",
   },
   taskName: {
      color: "#000000", 
      fontFamily: 'SiemensSans-Bold', 
      fontSize: 16,
   },
   subHeader: {
      width: width,
      height: height * 0.065,
      flexDirection: "row",
      justifyContent: "space-between"

   }
});

export default MyTaskListCss