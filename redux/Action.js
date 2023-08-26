import {
  OPEN_MODAL,
  USER_LOGIN,
  USER_LOGOUT,
  CLOSE_MODAL,
  CLOSE_SHARE_TO_MODAL,
  OPEN_SHARE_TO_MODAL,
  OPEN_SUCCESS_MODAL,
  CLOSE_SUCCESS_MODAL,
  OPEN_NOTIFICATION_PANEL,
  CLOSE_NOTIFICATION_PANEL,
  GET_USER_DETAILS,
  ERASE_USER_DETAILS,
  LOADING,
  GET_ALL_ASSET,
  OPEN_DOCUMENT,
  CLOSE_DOCUMENT,
  DOCUMENT_DATA,
  IP_CONFIGURED,
  ERROR_POPUP,
  OPEN_IP_POPUP,
  CLOSE_IP_POPUP,
  OPEN_CONFIGURATION_MODAL,
  CLOSE_CONFIGURATION_MODAL,
  OFFLINE_ONLINE_MODE,
  IS_IP_CONFIGURED,
  OFFLINE_USER_DATA,
  GET_ALL_ASSET_LIVE_DATA,
  GET_ALL_USERS_LIST,
  SET_NOTIFICATION_DATA,
  SET_SHARED_ASSET_DATA,
  MARK_AS_READ_ID,
  SET_SELECTED_SHARED_ASSET,
  All_UNITS,
  All_SECTION_IN_UNIT,
  ALL_ASSET_IN_SECTION,
  CUSTOM_SEARCH_FOR_ASSET,
  SEARCHING_FOR_ASSET,
  NOT_SEARCHING_FOR_ASSET,
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
  ALREADY_SELECTED_UNIT_ID_IN_HISTORICAL,
  ALREADY_SELECTED_HEADER_ID_IN_HISTORICAL,
  ALREADY_SELECTED_SUBHEADER_ID_IN_HISTORICAL,
  SELECT_ASSET_EDIT_TO_VIEW,
  HIS_START_DATE,
  CREATED_ASSIGNED_TASKID,
  ALREADY_HAVE_CONSENT,
  STATUS_COMPLETION_FOR_TASK,
  ASSET_ID_SET,
  SET_TASK_ID,
  CLOSE_HISTORICAL_TOP_BAR,
  SET_TRUE_IS_ASSET_SELECTED_TO_VIEW,
  SET_FALSE_IS_ASSET_SELECTED_TO_VIEW,
  SET_TENANT_ID,
  SAVE_DEVICE_TOKEN,
  //Video Call
  SHOW_RESUME_CALL_TOAST,
  SHOW_VIDEO_CALL_NOTIFICATION,
  SHOW_CONTACTS_OF_VIDEO_CALL,
  SHOW_MEETING_ROOM,
  SHOW_ROOM_NAME,
  DO_NOT_SHOW_VIDEO_CALL_NOTIFICATION_AGAIN
} from './Types';


const setTenantID = (data) => {
  return {
    type: SET_TENANT_ID,
    payload: data,
  }
}


const closeTopHistoricalBar = () => {
  return {
    type: CLOSE_HISTORICAL_TOP_BAR,
  }
}

const setTrueIsAssetSelectedToView = () => {
  return {
    type: SET_TRUE_IS_ASSET_SELECTED_TO_VIEW,
  }
}

const setFalseIsAssetSelectedToView = () => {
  return {
    type: SET_FALSE_IS_ASSET_SELECTED_TO_VIEW,
  }
}

const setUserAlreadyHaveConsent = () => {
  return {
    type: ALREADY_HAVE_CONSENT,
  }
}

const setHisStartDate = (startDate) => {
  return {
    type: HIS_START_DATE,
    payload: startDate,
  }
}

const setHisEndDate = (endDate) => {
  return {
    type: HIS_END_DATE,
    payload: endDate,
  }
}

const setAlreadySelectedUnitIdInHistorical = (data) => {
  return {
    type: ALREADY_SELECTED_UNIT_ID_IN_HISTORICAL,
    payload: data,
  }
}

const setAlreadySelectedHeaderIdInHistorical = (data) => {
  return {
    type: ALREADY_SELECTED_HEADER_ID_IN_HISTORICAL,
    payload: data,
  }
}
const setAlreadySelectedSubHeaderIdInHistorical = (data) => {
  return {
    type: ALREADY_SELECTED_SUBHEADER_ID_IN_HISTORICAL,
    payload: data,
  }
}
const setAlreadySelectedAssetIdInHistorical = (data) => {
  return {
    type: ALREADY_SELECTED_ASSET_ID_IN_HISTORICAL,
    payload: data,
  }
}


const toggleBetweenGroupAndTagsInHistorical = (data) => {
  return {
    type: TOGGLE_BETWEEN_TAGS_AND_GROUP_IN_HISTORICAL,
    payload: data,
  }
}

const toggleHistoricalTopBar = () => {
  return {
    type: TOGGLE_HISTORICAL_TOP_BAR,
  }
}

const setSelectedGroupToShowOnView = (data) => {
  return {
    type: SELECTED_GROUP_TO_SHOW_ON_VIEW,
    payload: data,
  }
}

const setKksTag = (data) => {
  return {
    type: SET_KKS_TAG,
    payload: data,
  }
}

const setMenuHeaderName = (data) => {
  return {
    type: MENU_HEADER_NAME,
    payload: data,
  }
}

const setGraphGroupData = (data) => {
  return {
    type: GRAPH_GROUP_DATA,
    payload: data,
  }
}

const toggleBetweenGroupAndTagView = (data) => {
  return {
    type: TOGGLE_BETWEEN_GROUP_AND_TAG_VIEW,
    payload: data,
  }
}

const toggleOrientation = (data) => {
  return {
    type: CHANGE_PHONE_ORIENTATION,
    payload: data,
  }
}

const toggleTrendsPopup = () => {
  return {
    type: SHOW_TREND_POPUP,

  }
}

const setAssetId = (data) => {
  return {
    type: SET_ASSET_ID,
    payload: data,

  }
}

const setTagsTrendsData = (data) => {
  return {
    type: TAGS_TRENDS_DATA,
    payload: data,
  }
}

const tagsByDefaultSelected = data => {
  return {
    type: TAGS_BY_DEFAULT_SELECTED,
    payload: data,
  }
}


const setSelectedKksTagFromNotification = (data) => {
  return {
    type: SELECTED_KKS_TAG_FROM_NOTIFICATION,
    payload: data,
  }
}

const setAlarmFirstTimeLoading = () => {
  return {
    type: ALARM_PAGE_FIRST_TIME_LOADING,
  };
};

const setSelectedUnitValue = data => {
  return {
    type: SELECTED_UNIT_VALUE,
    payload: data,
  };
};
const setSelectedSectionValue = data => {
  return {
    type: SELECTED_SECTION_VALUE,
    payload: data,
  };
};

const isNotSearchingForAsset = () => {
  return {
    type: NOT_SEARCHING_FOR_ASSET,
  };
};
const isSearchForAsset = () => {
  return {
    type: SEARCHING_FOR_ASSET,
  };
};

const customSearchForAsset = data => {
  return {
    type: CUSTOM_SEARCH_FOR_ASSET,
    payload: data,
  };
};

const setAllAssetInSection = data => {
  return {
    type: ALL_ASSET_IN_SECTION,
    payload: data,
  };
};

const setAllSectionInUnit = data => {
  return {
    type: All_SECTION_IN_UNIT,
    payload: data,
  };
};

const setAllUnits = data => {
  return {
    type: All_UNITS,
    payload: data,
  };
};

const setSelectedSharedAsset = data => {
  return {
    type: SET_SELECTED_SHARED_ASSET,
    payload: data,
  };
};

const markAsReadId = data => {
  return {
    type: MARK_AS_READ_ID,
    payload: data,
  };
};

const setSharedAssetData = data => {
  return {
    type: SET_SHARED_ASSET_DATA,
    payload: data,
  };
};

const setNotificationData = data => {
  return {
    type: SET_NOTIFICATION_DATA,
    payload: data,
  };
};

const getAllUserList = data => {
  return {
    type: GET_ALL_USERS_LIST,
    payload: data,
  };
};

const getAllAssetLiveData = data => {
  return {
    type: GET_ALL_ASSET_LIVE_DATA,
    payload: data,
  };
};

const offlineOnlineMode = () => {
  return {
    type: OFFLINE_ONLINE_MODE,
  };
};

const openConfigurationModal = data => {
  return {
    type: OPEN_CONFIGURATION_MODAL,
    payload: data,
  };
};

const closeConfigurationModal = () => {
  return {
    type: CLOSE_CONFIGURATION_MODAL,
  };
};

const openIPPopup = () => {
  return {
    type: OPEN_IP_POPUP,
  };
};

const closeIPPopup = () => {
  return {
    type: CLOSE_IP_POPUP,
  };
};

const errorPopup = data => {
  return {
    type: ERROR_POPUP,
    payload: data,
  };
};
const isIpConfigured = () => {
  return {
    type: IS_IP_CONFIGURED,
  };
};

const ipConfigured = data => {
  return {
    type: IP_CONFIGURED,
    payload: data,
  };
};

const documentData = data => {
  return {
    type: DOCUMENT_DATA,
    payload: data,
  };
};

const closeDocument = () => {
  return {
    type: CLOSE_DOCUMENT,
  };
};

const openDocument = () => {
  return {
    type: OPEN_DOCUMENT,
  };
};

const getAllAsset = data => {
  return {
    type: GET_ALL_ASSET,
    payload: data,
  };
};

const loading = () => {
  return {
    type: LOADING,
  };
};

const getUserDetails = data => {
  return {
    type: GET_USER_DETAILS,
    payload: data,
  };
};

const eraseUserDetails = () => {
  return {
    type: ERASE_USER_DETAILS,
    payload: {},
  };
};

const openNotificationPanel = () => {
  return {
    type: OPEN_NOTIFICATION_PANEL,
  };
};

const closeNotificationPanel = () => {
  return {
    type: CLOSE_NOTIFICATION_PANEL,
  };
};

const userLoggedIn = id_token => {
  return {
    type: USER_LOGIN,
    payload: id_token,
  };
};

const userLoggedOut = id_token => {
  return {
    type: USER_LOGOUT,
    payload: id_token,
  };
};

const openPopup = () => {
  return {
    type: OPEN_MODAL,
  };
};

const closePopup = () => {
  return {
    type: CLOSE_MODAL,
  };
};

const openShareToModal = data => {
  return {
    type: OPEN_SHARE_TO_MODAL,
    payload: data,
  };
};

const closeShareToModal = () => {
  return {
    type: CLOSE_SHARE_TO_MODAL,
  };
};

const openSuccessModal = () => {
  return {
    type: OPEN_SUCCESS_MODAL,
  };
};
const closeSuccessModal = () => {
  return {
    type: CLOSE_SUCCESS_MODAL,
  };
};

const offlineUserData = data => {
  return {
    type: OFFLINE_USER_DATA,
    payload: data,
  };
};

const setUserName = (data) => {
  return {
    type: SET_USER_NAME,
    payload: data,
  };
};

const setSelectAssetEditToView = (data) => {
  return {
    type: SELECT_ASSET_EDIT_TO_VIEW,
    payload: data,
  };
};

const setCreatedAssignedTaskId = (data) => {
  return {
    type: CREATED_ASSIGNED_TASKID,
    payload: data,
  };
};

const setStatusCompletionForTask = (data) => {
  return {
    type: STATUS_COMPLETION_FOR_TASK,
    payload: data,
  };
};

const setAssetIdSet = (data) => {
  return {
    type: ASSET_ID_SET,
    payload: data,
  };
};

const setTaskId = (data) => {
  return {
    type: SET_TASK_ID,
    payload: data,
  };
};

const setDeviceToken = (data) => {
  return {
    type: SAVE_DEVICE_TOKEN,
    payload: data,
  };
};

//Video Call
const showResumeCallAction = (data) => {
  return {
    type: SHOW_RESUME_CALL_TOAST,
    payload: data,
  };
};

const showVideoCallNotificationAction = (data) => {
  return {
    type: SHOW_VIDEO_CALL_NOTIFICATION,
    payload: data,
  };
};

const showContactsOfVideoCallAction = (data) => {
  return {
    type: SHOW_CONTACTS_OF_VIDEO_CALL,
    payload: data,
  };
};

const showMeetingRoomAction = (data) => {
  return {
    type: SHOW_MEETING_ROOM,
    payload: data,
  };
};

const showRoomNameAction = (data) => {
  return {
    type: SHOW_ROOM_NAME,
    payload: data,
  };
};

const doNotShowVideoCallAgainAction = (data) => {
  return {
    type: DO_NOT_SHOW_VIDEO_CALL_NOTIFICATION_AGAIN,
    payload: data,
  };
};

export {
  setTenantID,
  setUserAlreadyHaveConsent,
  toggleHistoricalTopBar,
  userLoggedIn,
  userLoggedOut,
  openPopup,
  closePopup,
  openShareToModal,
  closeShareToModal,
  openSuccessModal,
  closeSuccessModal,
  openNotificationPanel,
  closeNotificationPanel,
  getUserDetails,
  eraseUserDetails,
  loading,
  getAllAsset,
  openDocument,
  closeDocument,
  documentData,
  ipConfigured,
  errorPopup,
  openIPPopup,
  closeIPPopup,
  openConfigurationModal,
  closeConfigurationModal,
  offlineOnlineMode,
  isIpConfigured,
  offlineUserData,
  getAllAssetLiveData,
  getAllUserList,
  setNotificationData,
  setSharedAssetData,
  markAsReadId,
  setSelectedSharedAsset,
  setAllUnits,
  setAllSectionInUnit,
  setAllAssetInSection,
  customSearchForAsset,
  isSearchForAsset,
  isNotSearchingForAsset,
  setSelectedUnitValue,
  setSelectedSectionValue,
  setAlarmFirstTimeLoading,
  setSelectedKksTagFromNotification,
  tagsByDefaultSelected,
  setTagsTrendsData,
  setAssetId,
  toggleTrendsPopup,
  setUserName,
  toggleOrientation,
  toggleBetweenGroupAndTagView,
  setGraphGroupData,
  setMenuHeaderName,
  setKksTag,
  setSelectedGroupToShowOnView,
  toggleBetweenGroupAndTagsInHistorical,
  setAlreadySelectedUnitIdInHistorical,
  setAlreadySelectedHeaderIdInHistorical,
  setAlreadySelectedSubHeaderIdInHistorical,
  setAlreadySelectedAssetIdInHistorical,
  setSelectAssetEditToView,
  setHisStartDate,
  setHisEndDate,
  setCreatedAssignedTaskId,
  setStatusCompletionForTask,
  setAssetIdSet,
  setTaskId,
  setTrueIsAssetSelectedToView,
  setFalseIsAssetSelectedToView,
  closeTopHistoricalBar,
  setDeviceToken,
  //Video Call
  showResumeCallAction,
  showVideoCallNotificationAction,
  showContactsOfVideoCallAction,
  showMeetingRoomAction,
  showRoomNameAction,
  doNotShowVideoCallAgainAction
};

