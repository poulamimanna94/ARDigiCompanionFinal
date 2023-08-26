package com.dvpi

import com.amazonaws.services.chime.sdk.meetings.session.MeetingSessionStatus

interface AudioVideoSessionHandler {
    fun onVideoSessionStarted(sessionStatus: MeetingSessionStatus)
    fun onAudioSessionStarted(reconnecting: Boolean)
    fun onVideoSessionStopped(sessionStatus: MeetingSessionStatus)
    fun onAudioSessionStopped(sessionStatus: MeetingSessionStatus)
}