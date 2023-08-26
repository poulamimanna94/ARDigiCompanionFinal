import {PORT } from '@env';

const PROTOCOL = __DEV__ ? 'http' : 'https';
const HOSTNAME = __DEV__ ? 'ec2-34-196-202-136.compute-1.amazonaws.com' : 'arpowertestapis.daac-apps.siemens.cloud'

const devProtocol = {
    PROTOCOL,
    HOSTNAME,
    PORT,
}




//
export default devProtocol 