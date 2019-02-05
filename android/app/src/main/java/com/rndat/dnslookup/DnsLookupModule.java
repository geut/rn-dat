//  Created by react-native-create-bridge

package com.rndat.dnslookup;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Callback;

import java.util.HashMap;
import java.util.Map;
import java.net.InetAddress;
import java.net.UnknownHostException;

import android.util.Log;

public class DnsLookupModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "DnsLookup";
    private static ReactApplicationContext reactContext = null;

    public DnsLookupModule(ReactApplicationContext context) {
        // Pass in the context to the constructor and save it so you can emit events
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        super(context);

        reactContext = context;
    }

    @Override
    public String getName() {
        // Tell React the name of the module
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        return REACT_CLASS;
    }

    @ReactMethod
    public void lookup(String domain, final Callback callback) {
        String ipAddressString;
        String error;
        try {
            ipAddressString = InetAddress.getByName(domain).getHostAddress();
            error = null;
        } catch (UnknownHostException ex) {
            Log.e(REACT_CLASS, "Unable to determine IP address.");
            ipAddressString = null;
            error = ex.getMessage();
        }

        callback.invoke(error, ipAddressString);
    }

    private static void emitDeviceEvent(String eventName, @Nullable WritableMap eventData) {
        // A method for emitting from the native side to JS
        // https://facebook.github.io/react-native/docs/native-modules-android.html#sending-events-to-javascript
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }
}
