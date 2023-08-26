package com.ardigi;

import com.facebook.react.ReactActivity;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.rnfs.RNFSPackage;
import android.content.Intent; // <--- import 
import android.content.res.Configuration; // <--- import 
import java.util.Arrays;
import java.util.List;

import android.os.Build;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.media.AudioAttributes;
import android.net.Uri;
import android.content.ContentResolver;
import android.util.Log;

import androidx.core.app.NotificationCompat;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel notificationChannel = new NotificationChannel("sound_channel", "Notification", NotificationManager.IMPORTANCE_HIGH);
      notificationChannel.setShowBadge(true);
      notificationChannel.setDescription("");
      AudioAttributes att = new AudioAttributes.Builder()
              .setUsage(AudioAttributes.USAGE_NOTIFICATION)
              .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
              .build();
      notificationChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/telephone_ring"), att);
      notificationChannel.enableVibration(true);
      notificationChannel.setVibrationPattern(new long[]{400, 400});
      notificationChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
      NotificationManager manager = getSystemService(NotificationManager.class);
      manager.createNotificationChannel(notificationChannel);
    }
    super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "arDigi";
  }
  
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
}

//  @Override
//  public void onActivityResult(int requestCode, int resultCode, Intent data) {
//    super.onActivityResult(requestCode, resultCode, data);
//    getReactInstanceManager().onActivityResult(this, requestCode, resultCode, data);
////    Log.i("ChimeReactNativeSDKDemoManager", "requestCode" + requestCode + "data" + data + "resultCode" + resultCode);
//
//
//  }
}
