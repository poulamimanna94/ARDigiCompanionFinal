package com.dvpi;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class MyModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    static final int REQUEST_VIDEO_CAPTURE = 1;
     ReactApplicationContext reactContext;
    Promise promise;
    public MyModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.reactContext.addActivityEventListener(this);
    }
    @Override
    public String getName() {
        return "MyModule ";
    }


    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        this.promise.resolve(data.getDataString());
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
