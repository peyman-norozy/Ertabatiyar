package com.ertabatiyar.sms.event

import android.content.Context
import android.util.Log
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

object SmsEventEmitter {

    fun emitIfReady(
        context: Context,
        from: String,
        message: String,
        status: String
    ) {
        val app =
            context.applicationContext as? ReactApplication

        if (app == null) {
            Log.d("SmsEventEmitter", "❌ Context برنامه React نیست، Event ارسال نمی‌شود.")
            return
        }

        val reactContext =
            app.reactNativeHost
                .reactInstanceManager
                .currentReactContext

         // ⚠️ اگر null است، فقط لاگ بزن و برگرد
        if (reactContext == null) {
            Log.d("SmsEventEmitter", "ReactContext هنوز آماده نیست. SMS از $from دریافت شد ولی Event نمی‌تواند ارسال شود.")
            return
        }

        val params = Arguments.createMap().apply {
            putString("phoneNumber", from)
            putString("message", message)
            putString("status", status)
            putDouble("timestamp", System.currentTimeMillis().toDouble())
        }

        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("SMS_RECEIVED", params)

        Log.d("SmsEventEmitter", "✅ Event SMS_RECEIVED به JS ارسال شد: $from -> $status")
    }
}
