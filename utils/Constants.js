import { Dimensions } from "react-native";

export const ipPortFileName = 'IPPORT.txt';
export const userDataFileName = 'USERS.txt';
export const height = Dimensions.get('screen').height;
export const width = Dimensions.get('screen').width;

export const color = "#8A00E5";

export const colors = [
  'rgba(0, 108, 59,1)', 'rgba(0, 253, 121,1)', 'rgba(33, 192, 255,1)',
  'rgba(140, 117, 0,1)', 'rgba(0, 87, 198,1)', 'rgba(0, 50, 140,1)',
  'rgba(198, 174, 0,1)', 'rgba(255, 249, 31,1)', 'rgba(20, 218, 121,1)',
  'rgba(0, 155, 85,1)', 'rgba(0, 132, 225,1)', 'rgba(226, 208, 0,1)',
]

export const constAlarmData = [
  {
    alarmStatus: 'DANGER',
    assetType: 'Valve3',
    elevation: '0',
    id: 53,
    kksTag: 'A0PGB62AA501',
    tagsData: [
      {
        alarmStatus: 'DANGER',
        desc: 'ns=3;s=Expression',
        displayName: 'Expression',
        high: 0,
        highHigh: 0,
        low: 0,
        lowLow: 0,
        nodeValue: {
          index: 12,
          displayName: 'Expression',
          value: 0.386526714910413,
          date: '11/24/2021, 11:51:28 PM',
          nodeId: 'ns=3;s=Expression',
        },
        subscriptionName: 'ns=3;s=Expression',
        units: '',
      },
    ],
    x: '',
    y: '',
    z: '',
  },
];

export const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    outside: {
      tagName: 'Analog',
      icon: 'DANGER',
      name: '03LBA10CF001',
      x: '12',
      y: '13',
      z: '14',
    },
    inside: [
      {
        tagName: '03LBA10CF001',
        description: 'Third Item',
        value: 123.8,
        color: 'DANGER',
      },
      {
        tagName: '03LBA10CF001',
        description: 'Third Item',
        value: 123.8,
        color: 'NORMAL',
      },
    ],
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
    outside: {
      tagName: 'Pump',
      icon: 'DANGER',
      name: '03LBA10CF001',
      x: '12',
      y: '13',
      z: '14',
    },
    inside: [
      {
        tagName: '03LBA10CF001',
        description: 'Third Item',
        value: 123.8,
        color: 'DANGER',
      },
      {
        tagName: '03LBA10CF001',
        description: 'Third Item',
        value: 123.8,
        color: 'NORMAL',
      },
    ],
  },
];

export const units = [
  {
    id: 1,
    unitName: 'unit-1',
    createdAt: '2021-10-08T10:49:35.257Z',
    modifiedAt: '2021-10-08T10:49:35.257Z',
  },
  {
    id: 2,
    unitName: 'unit-2',
    createdAt: '2021-10-08T10:49:35.257Z',
    modifiedAt: '2021-10-08T10:49:35.257Z',
  },
];
