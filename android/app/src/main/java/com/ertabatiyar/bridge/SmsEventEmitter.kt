package com.ertabatiyar.bridge

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule

object SmsEventEmitter {

    private var reactContext: ReactApplicationContext? = null

    fun bind(context: ReactApplicationContext) {
        reactContext = context
        Log.i("SmsEmitter", "✅ ReactContext bind شد")
    }

    fun emit(from: String, body: String) {
        val ctx = reactContext
        if (ctx == null || !ctx.hasActiveReactInstance()) {
            Log.w("SmsEmitter", "⏳ React هنوز آماده نیست")
            return
        }

        val params = Arguments.createMap().apply {
            putString("from", from)
            putString("body", body)
        }

        ctx
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("onSmsReceived", params)

        Log.i("SmsEmitter", "📡 SMS emit شد به JS")
    }
}
