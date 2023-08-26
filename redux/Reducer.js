import {
  CLOSE_MODAL,
  OPEN_MODAL,
  USER_LOGIN,
  USER_LOGOUT,
  OPEN_NOTIFICATION_PANEL,
  CLOSE_NOTIFICATION_PANEL,
  GET_USER_DETAILS,
  ERASE_USER_DETAILS,
  LOADING,
  GET_ALL_ASSET,
  DOCUMENT_DATA,
  IS_IP_CONFIGURED,
  ERROR_POPUP,
  OPEN_IP_POPUP,
  CLOSE_IP_POPUP,
  IP_CONFIGURED,
  OPEN_CONFIGURATION_MODAL,
  CLOSE_CONFIGURATION_MODAL,
  GET_ALL_ASSET_LIVE_DATA,
  GET_ALL_USERS_LIST,
  SET_NOTIFICATION_DATA,
  SET_SHARED_ASSET_DATA,
  SET_SELECTED_SHARED_ASSET,
  All_UNITS,
  All_SECTION_IN_UNIT,
  ALL_ASSET_IN_SECTION,
  SELECTED_UNIT_VALUE,
  SELECTED_SECTION_VALUE,
  ALARM_PAGE_FIRST_TIME_LOADING,
  SELECTED_KKS_TAG_FROM_NOTIFICATION,
  TAGS_BY_DEFAULT_SELECTED,
  TAGS_TRENDS_DATA,
  SET_ASSET_ID,
  SHOW_TREND_POPUP,
  SET_USER_NAME,
  CHANGE_PHONE_ORIENTATION,
  TOGGLE_BETWEEN_GROUP_AND_TAG_VIEW,
  GRAPH_GROUP_DATA,
  MENU_HEADER_NAME,
  SET_KKS_TAG,
  SELECTED_GROUP_TO_SHOW_ON_VIEW,
  TOGGLE_HISTORICAL_TOP_BAR,
  TOGGLE_BETWEEN_TAGS_AND_GROUP_IN_HISTORICAL,
  ALREADY_SELECTED_ASSET_ID_IN_HISTORICAL,
  ALREADY_SELECTED_UNIT_ID_IN_HISTORICAL,
  ALREADY_SELECTED_HEADER_ID_IN_HISTORICAL,
  ALREADY_SELECTED_SUBHEADER_ID_IN_HISTORICAL,
  SELECT_ASSET_EDIT_TO_VIEW,
  HIS_START_DATE,
  HIS_END_DATE,
  CREATED_ASSIGNED_TASKID,
  ALREADY_HAVE_CONSENT,
  STATUS_COMPLETION_FOR_TASK,
  ASSET_ID_SET,
  SET_TASK_ID,
  SET_TRUE_IS_ASSET_SELECTED_TO_VIEW,
  SET_FALSE_IS_ASSET_SELECTED_TO_VIEW,
  CLOSE_HISTORICAL_TOP_BAR,
  SET_TENANT_ID,
  SAVE_DEVICE_TOKEN,
  //Vide Call
  SHOW_RESUME_CALL_TOAST,
  SHOW_VIDEO_CALL_NOTIFICATION,
  SHOW_CONTACTS_OF_VIDEO_CALL,
  SHOW_MEETING_ROOM,
  SHOW_ROOM_NAME,
  DO_NOT_SHOW_VIDEO_CALL_NOTIFICATION_AGAIN
} from './Types';

/* 
 for all modal suffixed variable true means showing modal and false means hiding modal
*/

const initialState = {
  isUserLoggedIn: false, //states weather is user logged in or not
  showModal: false, // for showing modal on screen
  showShareModal: false, // this one is for share modal
  showSuccessModal: false, //this one is for success modal
  notificationPanel: false, // for notification panel
  accessToken: '', //for  user accessToken
  userDetail: {}, //for user details
  loading: false, // for showing loading screen
  allAssetData: [], //
  allAssetLiveData: [], //for live asset data
  documentPopup: false, //this one is for document data
  documentData: {}, // to store document data
  ipPortData: {}, //this will use to store ip and port data
  isIpConfigured: false, // check weather ip and port data is available or not
  ipPopup: false, //this is for ip and  port
  showErrorPopup: false,
  message: '', //this is for showing some message over the error popup
  offlineUserData: '', //this is used to store
  configurationModal: false, //
  offlineOnlineMode: true, //true = online mode and false = offline mode
  allUserList: [],
  assetId: 0,
  allNotificationData: [],
  sharedAssetData: [],
  markAsReadId: 0,
  selectedAssetId: 0, //to save asset id when click from notification
  allUnits: [],
  allSectionsInUnit: [],
  allAssetInSection: [],
  customSearchAssetList: [],
  isSearching: false,
  unitValue: 0,
  sectionValue: 0,
  selectedKksTagName: '',
  loadingAlarmPageFirstTime: true,
  tagList: [],
  selectedTrendTagList: [],
  toggleTrendsPopup: false,
  username: '',
  toggleOrientation: false,
  toggleBetweenGroupAndTags: false,
  graphGroupData: [],
  menuHeaderName: '',
  kksTag: '',
  groupNameToShowOnView: '',
  toggleHistoricalTopBar: false,
  toggleBetweenGroupAndTagsInHistorical: false,
  selectedUnitIdInHisTagView: 0,
  selectedHeaderIdInHisTagView: 0,
  selectedSubHeaderInHisTagView: 0,
  hisStartDate: '',
  hisEndDate: '',
  userConsent: false,
  selectAssetEditToViewData: '',
  setCreatedAssignedTaskId: null,
  setStatusCompletionForTask: false,
  setAssetIdSet: null,
  setTaskId: null,
  isAssetSelectedToView: false,
  tenantId: '',
  deviceToken: '',
  //Video Call
  showResumeCall: false,
  showVideoCallNotification: '',
  showContactsOfVideoCall: [],
  showMeetingRoom: false,
  showRoomName: '',
  doNotShowVideoCallAgain: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DEVICE_TOKEN: {
      return {
        ...state,
        deviceToken: action.payload,
      }
    }
    case SET_TENANT_ID: {
      return {
        ...state,
        tenantId: action.payload,
      }
    }

    case CLOSE_HISTORICAL_TOP_BAR: {
      return {
        ...state,
        toggleHistoricalTopBar: false,
      }
    }

    case SET_TRUE_IS_ASSET_SELECTED_TO_VIEW: {
      return {
        ...state,
        isAssetSelectedToView: true,

      }
    }
    case SET_FALSE_IS_ASSET_SELECTED_TO_VIEW: {
      return {
        ...state,
        selectedAssetToView: false,
      }
    }

    case ALREADY_HAVE_CONSENT: {
      return {
        ...state,
        userConsent: true,
      }
    }

    case HIS_START_DATE: {
      return {
        hisStartDate: action.payload,
      }
    }
    case HIS_END_DATE: {
      return {
        hisEndDate: action.payload,
      }
    }

    case ALREADY_SELECTED_UNIT_ID_IN_HISTORICAL: {
      return {
        ...state,
        selectedUnitIdInHisTagView: action.payload,
      }
    }
    case ALREADY_SELECTED_HEADER_ID_IN_HISTORICAL: {
      return {
        ...state,
        selectedHeaderIdInHisTagView: action.payload,
      }
    }
    case ALREADY_SELECTED_SUBHEADER_ID_IN_HISTORICAL: {

      return {
        ...state,
        selectedSubHeaderInHisTagView: action.payload,
      }
    }
    case ALREADY_SELECTED_ASSET_ID_IN_HISTORICAL: {
      return {
        ...state,
        assetId: action.payload
      }
    }

    case TOGGLE_BETWEEN_TAGS_AND_GROUP_IN_HISTORICAL: {

      let locToggleBetweenGroupAndTagsInHistorical = false
      if (action.payload !== 'Tags') locToggleBetweenGroupAndTagsInHistorical = true

      return {
        ...state,
        toggleBetweenGroupAndTagsInHistorical: locToggleBetweenGroupAndTagsInHistorical,
      }
    }

    case TOGGLE_HISTORICAL_TOP_BAR: {
      return {
        ...state,
        toggleHistoricalTopBar: !state.toggleHistoricalTopBar,
      }
    }

    case SELECTED_GROUP_TO_SHOW_ON_VIEW: {
      return {
        ...state,
        groupNameToShowOnView: action.payload,
      }
    }

    case SET_KKS_TAG: {
      return {
        ...state,
        kksTag: action.payload,
      }
    }

    case MENU_HEADER_NAME: {
      return {
        ...state,
        menuHeaderName: action.payload,
      }
    }

    case GRAPH_GROUP_DATA: {
      return {
        ...state,
        graphGroupData: action.payload,
      }
    }

    case TOGGLE_BETWEEN_GROUP_AND_TAG_VIEW: {
      let temp = false;
      if (action.payload === 'GroupView') temp = true;

      return {
        ...state,
        toggleBetweenGroupAndTags: temp,
      }
    }

    case CHANGE_PHONE_ORIENTATION: {
      return {
        ...state,
        toggleOrientation: action.payload === "LANDSCAPE" ? true : false,
      }
    }

    case SHOW_TREND_POPUP: {
      return {
        ...state,
        toggleTrendsPopup: !state.toggleTrendsPopup,
      }
    }

    case SET_ASSET_ID: {
      return {
        ...state,
        assetId: action.payload,
      }
    }

    case TAGS_TRENDS_DATA: {
      return {
        ...state,
        selectedTrendTagList: action.payload,
      }
    }

    case TAGS_BY_DEFAULT_SELECTED: {
      return {
        ...state,
        tagList: action.payload,
      }
    }

    case SELECTED_KKS_TAG_FROM_NOTIFICATION: {
      return {
        ...state,
        selectedKksTagName: action.payload,
      };
    }

    case ALARM_PAGE_FIRST_TIME_LOADING: {
      return {
        ...state,
        loadingAlarmPageFirstTime: false,
      };
    }

    case SELECTED_UNIT_VALUE: {
      return {
        ...state,
        unitValue: action.payload,
      };
    }

    case SELECTED_SECTION_VALUE: {
      return {
        ...state,
        sectionValue: action.payload,
      };
    }


    case ALL_ASSET_IN_SECTION: {
      return {
        ...state,
        allAssetInSection: action.payload,
      };
    }

    case All_SECTION_IN_UNIT: {
      return {
        ...state,
        allSectionsInUnit: action.payload,
      };
    }

    case All_UNITS: {
      return {
        ...state,
        allUnits: action.payload,
      };
    }

    case SET_SELECTED_SHARED_ASSET: {
      return {
        ...state,
        selectedAssetId: action.payload,
      };
    }

    case SET_SHARED_ASSET_DATA: {
      return {
        ...state,
        sharedAssetData: action.payload,
      };
    }

    case SET_NOTIFICATION_DATA: {
      console.log(action.payload.length, action.payload, "...action.payload.length")
      return {
        ...state,
        allNotificationData: action.payload.length === 0 ? [] : [...state?.allNotificationData, ...action.payload],
      };
    }
    case GET_ALL_USERS_LIST: {
      return {
        ...state,
        allUserList: action.payload,
      };
    }

    case GET_ALL_ASSET_LIVE_DATA: {
      return {
        ...state,
        allAssetLiveData: action.payload,
      };
    }

    case IS_IP_CONFIGURED: {
      return {
        ...state,
        isIpConfigured: true,
      };
    }
    case OPEN_CONFIGURATION_MODAL: {
      return {
        ...state,
        configurationModal: true,
      };
    }

    case CLOSE_CONFIGURATION_MODAL: {
      return {
        ...state,
        configurationModal: false,
      };
    }

    case IP_CONFIGURED: {
      return {
        ...state,
        ipPortData: action.payload,
      };
    }
    case ERROR_POPUP: {
      return {
        ...state,
        showErrorPopup: !state.showErrorPopup,
        message: action.payload,
      };
    }

    case OPEN_IP_POPUP: {
      return {
        ...state,
        ipPopup: true,
      };
    }

    case CLOSE_IP_POPUP: {
      return {
        ...state,
        ipPopup: false,
      };
    }
    case DOCUMENT_DATA: {
      return {
        ...state,
        documentData: action.payload,
      };
    }

    case GET_ALL_ASSET: {
      return {
        ...state,
        allAssetData: action.payload,
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case USER_LOGIN:
      return {
        ...state,
        isUserLoggedIn: true,
        accessToken: 'Bearer ' + action.payload,
      };
    case SET_USER_NAME:
      return {
        ...state,
        username: action.payload
      };
    case USER_LOGOUT:
      return {
        ...state,
        showErrorPopup: false,
        accessToken: action.payload,
        isUserLoggedIn: false, //states weather is user logged in or not
        showModal: false, // for showing modal on screen
        showShareModal: false, // this one is for share modal
        showSuccessModal: false, //this one is for success modal
        notificationPanel: false, // for notification panel
        userDetail: {}, //for user details
        loading: false, // for showing loading screen
        allAssetData: [], //
        allAssetLiveData: [], //for live asset data
        documentPopup: false, //this one is for document data
        documentData: {}, // to store document data
        loadingAlarmPageFirstTime: true,
        ipPopup: false, //this is for ip and  port
        message: '', //this is for showing some message over the error popup
        offlineUserData: '', //this is used to store
        configurationModal: false, //
        offlineOnlineMode: true, //true = online mode and false = offline mode
        allUserList: [],
        assetId: 0,
        allNotificationData: [],
        markAsReadId: 0,
        selectedAssetId: 0, //to save asset id when click from notification
        allUnits: [],
        allSectionsInUnit: [],
        allAssetInSection: [],
        sharedAssetData: [],
      };
    case GET_USER_DETAILS: {
      return {
        ...state,
        userDetail: action.payload,
      };
    }

    case ERASE_USER_DETAILS: {
      return {
        ...state,
        userDetail: {},
      };
    }

    case OPEN_MODAL:
      return {
        ...state,
        isUserLoggedIn: false,
        showModal: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isUserLoggedIn: false,
        showModal: false,
      };

    case OPEN_NOTIFICATION_PANEL: {
      return {
        ...state,
        notificationPanel: !state.notificationPanel,
      };
    }

    case CLOSE_NOTIFICATION_PANEL: {
      return {
        ...state,
        notificationPanel: false,
      };
    }

    case SELECT_ASSET_EDIT_TO_VIEW: {
      console.log(action.payload, "setSelectAssetEditToView data")
      return {
        ...state,
        selectAssetEditToViewData: action.payload
      }
    }

    case CREATED_ASSIGNED_TASKID: {
      console.log(action.payload, "action.payload for created task id")
      return {
        ...state,
        setCreatedAssignedTaskId: action.payload
      }
    }

    case STATUS_COMPLETION_FOR_TASK: {
      console.log(action.payload, "action.payload for status completion for task")
      return {
        ...state,
        setStatusCompletionForTask: action.payload
      }
    }

    case ASSET_ID_SET: {
      console.log(action.payload, "action.payload for ASSET_ID_SET for task")
      return {
        ...state,
        setAssetIdSet: action.payload
      }
    }

    case SET_TASK_ID: {
      console.log(action.payload, "action.payload for SET_TASK_ID for task")
      return {
        ...state,
        setTaskId: action.payload
      }
    }

    //Video Call
    case SHOW_RESUME_CALL_TOAST: {
      console.log(action.payload, "action.payload for SHOW_RESUME_CALL_TOAST for task")
      return {
        ...state,
        showResumeCall: action.payload
      }
    }

    case SHOW_VIDEO_CALL_NOTIFICATION: {
      console.log(action.payload, "action.payload for SHOW_VIDEO_CALL_NOTIFICATION for task")
      return {
        ...state,
        showVideoCallNotification: action.payload
      }
    }

    case SHOW_CONTACTS_OF_VIDEO_CALL: {
      console.log(action.payload, "action.payload for SHOW_CONTACTS_OF_VIDEO_CALL for task")
      return {
        ...state,
        showContactsOfVideoCall: action.payload
      }
    }

    case SHOW_MEETING_ROOM: {
      console.log(action.payload, "action.payload for SHOW_MEETING_ROOM for task")
      return {
        ...state,
        showMeetingRoom: action.payload
      }
    }

    case SHOW_ROOM_NAME: {
      console.log(action.payload, "action.payload for SHOW_ROOM_NAME for task")
      return {
        ...state,
        showRoomName: action.payload
      }
    }

    case DO_NOT_SHOW_VIDEO_CALL_NOTIFICATION_AGAIN: {
      console.log(action.payload, "action.payload for SHOW_ROOM_NAME for task")
      return {
        ...state,
        doNotShowVideoCallAgain: action.payload
      }
    }
    
    default:
      return state;
  }
};

export default reducer;
