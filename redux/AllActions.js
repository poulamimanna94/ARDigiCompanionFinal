
import {
  openPopup,
  closePopup,
  openShareToModal,
  closeShareToModal,
  closeSuccessModal,
  openSuccessModal,
  openNotificationPanel,
  closeNotificationPanel,
  getUserDetails,
  eraseUserDetails,
  loading,
  getAllAsset,
  openDocument,
  closeDocument,
  documentData,
  errorPopup,
  ipConfigured,
  openIPPopup,
  closeIPPopup,
  openConfigurationModal,
  closeConfigurationModal,
  offlineOnlineMode,
  isIpConfigured,
  offlineUserData,
  getAllAssetLiveData,
  getAllUserList,
  userLoggedIn,
  userLoggedOut,
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
  toggleHistoricalTopBar,
  toggleBetweenGroupAndTagsInHistorical,
  setAlreadySelectedUnitIdInHistorical,
  setAlreadySelectedHeaderIdInHistorical,
  setAlreadySelectedSubHeaderIdInHistorical,
  setAlreadySelectedAssetIdInHistorical,
  setSelectAssetEditToView,
  setHisStartDate,
  setHisEndDate,
  setCreatedAssignedTaskId,
  setUserAlreadyHaveConsent,
  setStatusCompletionForTask,
  setAssetIdSet,
  setTaskId,
  setTrueIsAssetSelectedToView,
  setFalseIsAssetSelectedToView,
  closeTopHistoricalBar,
  setTenantID,
  setDeviceToken,
  // Video Call
  showResumeCallAction,
  showVideoCallNotificationAction,
  showContactsOfVideoCallAction,
  showMeetingRoomAction,
  showRoomNameAction,
  doNotShowVideoCallAgainAction
} from './Action';

const AllActions = {
  setTenantID,
  closeTopHistoricalBar,
  setTrueIsAssetSelectedToView,
  setFalseIsAssetSelectedToView,
  setUserAlreadyHaveConsent,
  setHisStartDate,
  setHisEndDate,
  toggleBetweenGroupAndTagsInHistorical,
  setMenuHeaderName,
  setGraphGroupData,
  ipConfigured,
  errorPopup,
  userLoggedOut,
  userLoggedIn,
  openPopup,
  closePopup,
  openShareToModal,
  closeShareToModal,
  closeSuccessModal,
  openSuccessModal,
  openNotificationPanel,
  closeNotificationPanel,
  eraseUserDetails,
  getUserDetails,
  loading,
  getAllAsset,
  openDocument,
  closeDocument,
  documentData,
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
  setKksTag,
  setSelectedGroupToShowOnView,
  toggleHistoricalTopBar,
  setAlreadySelectedUnitIdInHistorical,
  setAlreadySelectedHeaderIdInHistorical,
  setAlreadySelectedSubHeaderIdInHistorical,
  setAlreadySelectedAssetIdInHistorical,
  setSelectAssetEditToView,
  setCreatedAssignedTaskId,
  setStatusCompletionForTask,
  setAssetIdSet,
  setTaskId,
  setDeviceToken,
  //Video call
  showResumeCallAction,
  showVideoCallNotificationAction,
  showContactsOfVideoCallAction,
  showMeetingRoomAction,
  showRoomNameAction,
  doNotShowVideoCallAgainAction
};

export default AllActions;
