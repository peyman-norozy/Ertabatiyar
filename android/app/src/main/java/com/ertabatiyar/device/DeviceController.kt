package com.ertabatiyar.device

import android.util.Log

object DeviceController {

    fun lightOn() {
        Log.i("DeviceController", "LIGHT ON")
        // TODO GPIO / Relay
    }

    fun lightOff() {
        Log.i("DeviceController", "LIGHT OFF")
    }
}
