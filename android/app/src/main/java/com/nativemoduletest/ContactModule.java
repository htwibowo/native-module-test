package com.nativemoduletest;

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.nativemoduletest.UserData;

import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import javax.annotation.Nullable;

public class ContactModule extends ReactContextBaseJavaModule {

    public static String DURATION_TOAST_SHORT = "short";
    public static String DURATION_TOAST_LONG = "long";

    private UserDataProvider userDataProvider;

    public ContactModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.userDataProvider = new UserDataProvider(reactContext);
    }

    @ReactMethod
    public void getContacts(String query, Promise promise) {
        List<UserData> users = this.userDataProvider.searchContactFromPhonebook(query);
        promise.resolve(new Gson().toJson(users));
    }

    @Override
    public String getName() {
        return "ContactModule";
    }
}
