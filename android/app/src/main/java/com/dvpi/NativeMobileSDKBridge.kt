/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */

package com.ardigi

import android.Manifest
import android.app.Activity
import android.app.ActivityManager
import android.content.Context
import android.content.Context.MEDIA_PROJECTION_SERVICE
import android.content.Intent
//SS
// import android.app.Activity
// import android.content.Context
// import android.content.Intent
import android.content.pm.PackageManager
import android.media.projection.MediaProjectionManager
import android.os.Bundle
import android.os.Handler
import androidx.core.app.ActivityCompat.startActivityForResult
//SS
// import android.media.projection.MediaProjectionManager
import androidx.core.content.ContextCompat
import androidx.core.content.ContextCompat.getSystemService
import com.amazonaws.services.chime.sdk.meetings.audiovideo.contentshare.ContentShareSource
import com.ardigi.RNEventEmitter.Companion.RN_EVENT_ERROR
import com.ardigi.RNEventEmitter.Companion.RN_EVENT_MEETING_END
//Might need to REMOVE_END_FUNCTIONALITY
import com.amazonaws.services.chime.sdk.meetings.analytics.EventAnalyticsObserver
import com.amazonaws.services.chime.sdk.meetings.analytics.EventName
import com.amazonaws.services.chime.sdk.meetings.analytics.EventAttributes
import com.amazonaws.services.chime.sdk.meetings.audiovideo.video.capture.CaptureSourceError
import com.amazonaws.services.chime.sdk.meetings.audiovideo.video.capture.CaptureSourceObserver
import com.amazonaws.services.chime.sdk.meetings.audiovideo.video.capture.DefaultScreenCaptureSource
import com.amazonaws.services.chime.sdk.meetings.audiovideo.video.capture.DefaultSurfaceTextureCaptureSourceFactory
import com.amazonaws.services.chime.sdk.meetings.audiovideo.video.gl.DefaultEglCoreFactory
import com.amazonaws.services.chime.sdk.meetings.device.MediaDevice
import com.amazonaws.services.chime.sdk.meetings.device.MediaDeviceType
import com.amazonaws.services.chime.sdk.meetings.session.*
import com.amazonaws.services.chime.sdk.meetings.utils.logger.ConsoleLogger
import com.amazonaws.services.chime.sdk.meetings.utils.logger.LogLevel
import com.dvpi.AudioVideoSessionHandler
//Might need to REMOVE_END_FUNCTIONALITY
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener
import com.henninghall.date_picker.DatePickerPackage.context
import org.amazon.chime.webrtc.MediaStream
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.*
import io.invertase.firebase.app.ReactNativeFirebaseApp.getApplicationContext


// import com.amazonaws.services.chime.sdk.meetings.audiovideo.audio.AudioMode
// import com.amazonaws.services.chime.sdk.meetings.audiovideo.AudioVideoConfiguration

class NativeMobileSDKBridge(
        reactContext: ReactApplicationContext,
        private val eventEmitter: RNEventEmitter,
        private val meetingObservers: MeetingObservers) : ReactContextBaseJavaModule(reactContext), PermissionListener, ActivityEventListener, AudioVideoSessionHandler {
    companion object {
        private const val WEBRTC_PERMISSION_REQUEST_CODE = 1
        private const val TAG = "ChimeReactNativeSDKDemoManager"
        private const val KEY_MEETING_ID = "MeetingId"
        private const val KEY_ATTENDEE_ID = "AttendeeId"
        private const val KEY_JOIN_TOKEN = "JoinToken"
        private const val KEY_EXTERNAL_ID = "ExternalUserId"
        private const val KEY_MEDIA_PLACEMENT = "MediaPlacement"
        private const val KEY_AUDIO_FALLBACK_URL = "AudioFallbackUrl"
        private const val KEY_AUDIO_HOST_URL = "AudioHostUrl"
        private const val KEY_TURN_CONTROL_URL = "TurnControlUrl"
        private const val KEY_SIGNALING_URL = "SignalingUrl"
        private const val TOPIC_CHAT = "chat"
        
        var meetingSession: MeetingSession? = null


    }

    private val logger = ConsoleLogger(LogLevel.DEBUG)
    private val SCREEN_CAPTURE_REQUEST_CODE = 1001
    private val eglCoreFactory = DefaultEglCoreFactory()
    var screenCaptureSource: DefaultScreenCaptureSource? = null
    private  var eventAnalyticsObserver: EventAnalyticsObserver? = null


    private val webRtcPermissionPermission = arrayOf(
            Manifest.permission.MODIFY_AUDIO_SETTINGS,
            Manifest.permission.RECORD_AUDIO,
            Manifest.permission.CAMERA,   
            )

    override fun getName(): String {
        return "NativeMobileSDKBridge"
    }

//Might need to REMOVE_END_FUNCTIONALITY Callback
    @ReactMethod
    fun startMeeting(meetingInfo: ReadableMap, attendeeInfo: ReadableMap, meetingEndedListener: Callback) {
        logger.info(TAG, "Called startMeeting")

        currentActivity?.let { activity ->
            if (meetingSession != null) {
                meetingSession?.audioVideo?.stop()
                meetingSession = null

            }

            try {
                val sessionConfig = createSessionConfiguration(meetingInfo, attendeeInfo)
                val meetingSession = sessionConfig?.let {
                    DefaultMeetingSession(
                            it,
                            logger,
                            activity.applicationContext,
                            eglCoreFactory
                    )
                }

                if (meetingSession != null) {
                    NativeMobileSDKBridge.meetingSession = meetingSession


                    //Might need to REMOVE_END_FUNCTIONALITY From observer
                    eventAnalyticsObserver = object: EventAnalyticsObserver {
                        override fun onEventReceived(name: EventName, attributes: EventAttributes ) {
                          when (name) {
                            EventName.meetingEnded -> {
                            meetingEndedListener();
                            // eventEmitter.sendReactNativeEvent(RN_EVENT_ERROR, "Meeting has been ended.")
                            // meetingSession?.audioVideo?.stop();
                            // eventEmitter.sendReactNativeEvent(RN_EVENT_MEETING_END, null);
                        }
                        }
                        }
                    }
                    if (!hasPermissionsAlready()) {
                        val permissionAwareActivity = activity as PermissionAwareActivity
                        permissionAwareActivity.requestPermissions(webRtcPermissionPermission, WEBRTC_PERMISSION_REQUEST_CODE, this)
                        return
                    }
                    startAudioVideo();
                } else {
                    logger.error(TAG, "Failed to create meeting session")
                    eventEmitter.sendReactNativeEvent(RN_EVENT_ERROR, "Failed to create meeting session")
                }
            } catch (exception: Exception) {
                logger.error(TAG, "Error starting the meeting session: ${exception.localizedMessage}")
                eventEmitter.sendReactNativeEvent(RN_EVENT_ERROR, "Error starting the meeting session: ${exception.localizedMessage}")
                return
            }
        }
    }

    private fun hasPermissionsAlready(): Boolean {
        return currentActivity?.let { activity ->
            webRtcPermissionPermission.all {
                ContextCompat.checkSelfPermission(activity, it) == PackageManager.PERMISSION_GRANTED
            }
        } ?: false
    }

    private fun startAudioVideo() {
        if(eventAnalyticsObserver != null) {
            meetingSession?.audioVideo?.addEventAnalyticsObserver(eventAnalyticsObserver!!);
        }
        meetingObservers.addAudioVideoSessionHandler(this)
        meetingSession?.let {
            it.audioVideo.removeAudioVideoObserver(meetingObservers)
            it.audioVideo.addRealtimeObserver(meetingObservers)
            it.audioVideo.addVideoTileObserver(meetingObservers)
            it.audioVideo.addAudioVideoObserver(meetingObservers)
            it.audioVideo.addRealtimeDataMessageObserver(TOPIC_CHAT, meetingObservers)
            it.audioVideo.start()
            it.audioVideo.startRemoteVideo()
        }
    }

    private fun createSessionConfiguration(meetingInfo: ReadableMap, attendeeInfo: ReadableMap): MeetingSessionConfiguration? {
        reactApplicationContext.addActivityEventListener(this)
        return try {
            val meetingId = meetingInfo.getString(KEY_MEETING_ID) ?: ""
            val attendeeId = attendeeInfo.getString(KEY_ATTENDEE_ID) ?: ""
            val joinToken = attendeeInfo.getString(KEY_JOIN_TOKEN) ?: ""
            val externalUserId = attendeeInfo.getString(KEY_EXTERNAL_ID) ?: ""
            var audioFallbackUrl = ""
            var audioHostUrl = ""
            var turnControlUrl = ""
            var signalingUrl = ""

            meetingInfo.getMap(KEY_MEDIA_PLACEMENT)?.let {
                logger.info(TAG, it.toString())
                audioFallbackUrl = it.getString(KEY_AUDIO_FALLBACK_URL) ?: ""
                audioHostUrl = it.getString(KEY_AUDIO_HOST_URL) ?: ""
                turnControlUrl = it.getString(KEY_TURN_CONTROL_URL) ?: ""
                signalingUrl = it.getString(KEY_SIGNALING_URL) ?: ""
            }

            MeetingSessionConfiguration(meetingId,
                    MeetingSessionCredentials(attendeeId, externalUserId, joinToken),
                    MeetingSessionURLs(audioFallbackUrl, audioHostUrl, turnControlUrl, signalingUrl, ::defaultUrlRewriter))
        } catch (exception: Exception) {
            logger.error(TAG, "Error creating session configuration: ${exception.localizedMessage}")
            eventEmitter.sendReactNativeEvent(RN_EVENT_ERROR, "Error creating session configuration: ${exception.localizedMessage}")
            null
        }
    }

    @ReactMethod
    fun stopMeeting() {
        logger.info(TAG, "Called stopMeeting")

        meetingSession?.audioVideo?.stop()
        eventEmitter.sendReactNativeEvent(RN_EVENT_MEETING_END, null)
    }

    @ReactMethod
    fun setMute(isMute: Boolean) {
        logger.info(TAG, "Called setMute: $isMute")
        
        if (isMute) {
            meetingSession?.audioVideo?.realtimeLocalMute()
        } else {
            meetingSession?.audioVideo?.realtimeLocalUnmute()
        }
    }

    @ReactMethod
    fun setCameraOn(enabled: Boolean) {
        logger.info(TAG, "Called setCameraOn: $enabled")

        if (enabled) {
            meetingSession?.audioVideo?.startLocalVideo()
        } else {
            meetingSession?.audioVideo?.stopLocalVideo()
        }
    }

    @ReactMethod
    fun rotateCamera() {
        meetingSession?.audioVideo?.switchCamera()
    }
    
    @ReactMethod
    fun setScreenSharing(enabled: Boolean) {
        logger.info(TAG, "Called setScreenSharing: $enabled")
        if (enabled) {
            requestScreenCapturePermission()

        } else {
            meetingSession?.audioVideo?.stopContentShare()
        }
    }
    @ReactMethod
    fun requestScreenCapturePermission() {
//        val mReactInstanceManager: ReactInstanceManager = getReactNativeHost().getReactInstanceManager()
        logger.info(TAG,"screenshare")
        val reactContext = getReactApplicationContext()
        val mediaProjectionManager =  reactContext.getSystemService(Context.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager

        // Show prompt for screen capture permission

        startActivityForResult(
                currentActivity!!,
                mediaProjectionManager.createScreenCaptureIntent(),
                SCREEN_CAPTURE_REQUEST_CODE,
//                Bundle()
        null
        )
    }

    val screenCaptureSourceObserver = object : CaptureSourceObserver {

        override fun onCaptureStarted() {
            logger.info(TAG, "onCaptureStarted")
            val contentShareSource = ContentShareSource()
            contentShareSource.videoSource = screenCaptureSource
            meetingSession?.audioVideo?.startContentShare(contentShareSource)
        }

        override fun onCaptureStopped() {
            logger.info(TAG, "onCaptureStopped")

        }



        override fun onCaptureFailed(error: CaptureSourceError) {
            logger.info(TAG, "onCaptureFailed" + " error " + error.name)
        }
    }
    override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
        // ...
        logger.info(TAG, "requestCode" + requestCode + "data" + data + "resultCode" + resultCode)
        if (SCREEN_CAPTURE_REQUEST_CODE == requestCode && resultCode == Activity.RESULT_OK && data != null) {
            // (Android Q and above) Start the service created in step 1
            val reactContext = getReactApplicationContext()
            reactContext.startService(Intent(reactContext, ScreenCaptureService::class.java))
            Handler().postDelayed({
                val screenCaptureSource = DefaultScreenCaptureSource(
                        reactContext,
                        logger,
                        // Use the same EglCoreFactory instance as passed into DefaultMeetingSession
                        DefaultSurfaceTextureCaptureSourceFactory(
                                logger,
                                eglCoreFactory),
                        resultCode,
                        data
                )
                screenCaptureSource.addCaptureSourceObserver(screenCaptureSourceObserver)
                this.screenCaptureSource = screenCaptureSource
                this.screenCaptureSource!!.start()


            }, 1000)
            // Initialize a DefaultScreenCaptureSource instance using given result

        }
        // ... Complete any other initialization
    }

    override fun onNewIntent(intent: Intent?) {

    }
    @ReactMethod
    fun bindVideoView(viewIdentifier: Double, tileId: Int) {
        logger.info(TAG, "Called bindVideoView for tileId: $tileId with identifier: $viewIdentifier")
    }

    @ReactMethod
    fun unbindVideoView(tileId: Int) {
        logger.info(TAG, "Called unbindVideoView for tileId: $tileId")

        meetingSession?.run {
            audioVideo.unbindVideoView(tileId)
        }
    }

    @ReactMethod
    fun sendDataMessage(topic: String, message: String, lifetimeMs: Int) {
        meetingSession?.audioVideo?.realtimeSendDataMessage(topic, message, lifetimeMs)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>?, grantResults: IntArray?): Boolean {
        return when (requestCode) {
            WEBRTC_PERMISSION_REQUEST_CODE -> {
                val isMissingPermission: Boolean =
                        grantResults?.isEmpty() ?: false || grantResults?.any { PackageManager.PERMISSION_GRANTED != it } ?: false

                if (isMissingPermission) {
                    eventEmitter.sendReactNativeEvent(RN_EVENT_ERROR, "Unable to start meeting as permissions are not granted")
                    meetingSession?.audioVideo?.stop()
                    eventEmitter.sendReactNativeEvent(RN_EVENT_MEETING_END, null)
                    false
                } else {
                    startAudioVideo()
                    true
                }
            }
            else -> false
        }
    }

    override fun onVideoSessionStarted(sessionStatus: MeetingSessionStatus) {
        logger.info("audioVideo.Received attendee join event for sessionStatus.statusCode","" + (sessionStatus.statusCode))
        if(sessionStatus.statusCode == MeetingSessionStatusCode.OK) {
            selectAudio()
        }
    }

    override fun onAudioSessionStarted(reconnecting: Boolean) {
        logger.info("audioVideo.Received attendee join event for sessionStatus.statusCode audio started","")
        selectAudio()
    }

    override fun onVideoSessionStopped(sessionStatus: MeetingSessionStatus) {
        logger.info("audioVideo.Received attendee join event for sessionStatus.statusCode stop","" + (sessionStatus.statusCode))
        removeMeetingObserver()
    }

    override fun onAudioSessionStopped(sessionStatus: MeetingSessionStatus) {
        logger.info("audioVideo.Received attendee join event for sessionStatus.statusCode audio stop","" + (sessionStatus.statusCode))
        removeMeetingObserver()
    }

    private fun selectAudio() {
        logger.info("audioVideo.Received attendee join event for attendee()","" + (meetingSession?.audioVideo?.listAudioDevices()))
//        val audioDevices = meetingSession?.audioVideo?.listAudioDevices()
//        for(audio in audioDevices!!)  {
//            logger.info("audioVideo.Received attendee join event for attendeeType()","" + audio.type)
//            if(audio.type == MediaDeviceType.AUDIO_BLUETOOTH || audio.type == MediaDeviceType.AUDIO_WIRED_HEADSET || audio.type == MediaDeviceType.AUDIO_BUILTIN_SPEAKER) {
//                logger.info("audioVideo.Received attendee join event for attendeeType() audio type","" + audio.type)
//                meetingSession?.audioVideo?.chooseAudioDevice(audio)
//                break;
//            }
//
//        }
        var type = getMediaDevice(MediaDeviceType.AUDIO_BLUETOOTH)
        if(type == null) {
            type = getMediaDevice(MediaDeviceType.AUDIO_WIRED_HEADSET)
        }
        if(type == null) {
            type = getMediaDevice(MediaDeviceType.AUDIO_BUILTIN_SPEAKER)
        }
        if(type != null) {
            meetingSession?.audioVideo?.chooseAudioDevice(type)
        }

    }

    private fun getMediaDevice(type: MediaDeviceType): MediaDevice? {
        val audioDevices = meetingSession?.audioVideo?.listAudioDevices()
        for(audio in audioDevices!!)  {
            logger.info("audioVideo.Received attendee join event for attendeeType()","" + audio.type)
            if(audio.type == type) {
                logger.info("audioVideo.Received attendee join event for attendeeType() audio type","" + audio.type)
                meetingSession?.audioVideo?.chooseAudioDevice(audio)
                return audio
            }

        }
        return null
    }

    private fun removeMeetingObserver() {
        meetingSession?.audioVideo?.removeAudioVideoObserver(meetingObservers)
    }


//SS
//     @ReactMethod
//     private fun toggleScreenCapture() {

//         val mediaProjectionManager = currentActivity?.getSystemService(Context.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
//         val SCREEN_CAPTURE_REQUEST_CODE = 0
//         getCurrentActivity()?.startActivityForResult(
//                 mediaProjectionManager?.createScreenCaptureIntent(),
//                 SCREEN_CAPTURE_REQUEST_CODE
//         )
//     }
//     fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
//         //mReactInstanceManager.onActivityResult(requestCode, resultCode, data)
//         val SCREEN_CAPTURE_REQUEST_CODE = null
//         if (SCREEN_CAPTURE_REQUEST_CODE == requestCode) {
//             if (resultCode != Activity.RESULT_OK) {
//                 data?.let { startScreenShare(resultCode, it) }

//                 // Toast.makeText(currentActivity!!.applicationContext, "Screen share cannot work without permissions", Toast.LENGTH_LONG).show()

//             } else {
//                 data?.let { startScreenShare(resultCode, it) }
//             }
//         }
//     }

//     private fun startScreenShare(resultCode: Int, it: Intent) {
//         TODO("Not yet implemented")
//     }
// }

// private fun Nothing?.createScreenCaptureIntent(): Intent? {
//     TODO("Not yet implemented")
// }
        }
