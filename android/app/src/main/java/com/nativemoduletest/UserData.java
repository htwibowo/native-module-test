package com.nativemoduletest;

/**
 * Created by isut on 3/27/17.
 */

import android.content.ContentResolver;
import android.graphics.Bitmap;

public class UserData {

    Boolean checkedBox = false;

    String name;
    String phone;
    String email;

    public UserData(String email, String name, String phone) {
        this.phone = phone;
        this.email = email;
        this.name = name;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Boolean getCheckedBox() {
        return this.checkedBox;
    }

    public void setCheckedBox(Boolean checkedBox) {
        this.checkedBox = checkedBox;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
