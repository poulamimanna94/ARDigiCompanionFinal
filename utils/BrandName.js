import DeviceInfo from 'react-native-device-info';

export const brandName = DeviceInfo.getApplicationName();
console.log(brandName, "brandName");