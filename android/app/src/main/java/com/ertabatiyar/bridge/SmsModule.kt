package com.ertabatiyar.bridge

import android.telephony.SmsManager
import android.util.Log
import com.facebook.react.bridge.*
import com.ertabatiyar.sms.SmsStorage
import com.ertabatiyar.security.SmsSecurity
import com.ertabatiyar.bridge.SmsEventEmitter

class SmsModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    init {
            SmsEventEmitter.bind(reactContext)
        }

    override fun getName(): String = "SmsModule"

    // 📥 دریافت همه SMSهای ذخیره‌شده
    @ReactMethod
    fun getAllSms(promise: Promise) {
        try {
            promise.resolve(SmsStorage.getAll().toString())
        } catch (e: Exception) {
            Log.e("SmsModule", "❌ getAllSms error", e)
            promise.reject("GET_SMS_ERROR", e.message)
        }
    }

    // 📤 ارسال SMS
@ReactMethod
fun sendSms(phoneNumber: String, message: String, promise: Promise) {
    try {
        val cleanNumber = phoneNumber.trim()

        if (cleanNumber.isEmpty()) {
            promise.reject("SMS_ERROR", "شماره خالی است")
            return
        }

        val smsManager = try {
            val subscriptionId =
                android.telephony.SubscriptionManager.getDefaultSmsSubscriptionId()

            if (subscriptionId != android.telephony.SubscriptionManager.INVALID_SUBSCRIPTION_ID) {
                SmsManager.getSmsManagerForSubscriptionId(subscriptionId)
            } else {
                SmsManager.getDefault()
            }
        } catch (e: Exception) {
            SmsManager.getDefault()
        }

        smsManager.sendTextMessage(
            cleanNumber,
            null,
            message,
            null,
            null
        )

        promise.resolve("✅ SMS ارسال شد")

    } catch (e: Exception) {
        Log.e("SmsModule", "❌ sendSms error", e)
        promise.reject("SMS_ERROR", "❌ خطا: ${e.message}")
    }
}

    // 🔐 ذخیره شماره مجاز
    @ReactMethod
    fun setAllowedNumber(number: String, promise: Promise) {
        try {
            SmsSecurity.setAllowedNumber(reactApplicationContext, number)
            promise.resolve("شماره مجاز ذخیره شد: $number")
        } catch (e: Exception) {
            Log.e("SmsModule", "❌ setAllowedNumber error", e)
            promise.reject("SET_NUMBER_ERROR", e.message)
        }
    }

    // 🔎 دریافت شماره مجاز
    @ReactMethod
    fun getAllowedNumber(promise: Promise) {
        try {
            promise.resolve(
                SmsSecurity.getAllowedNumber(reactApplicationContext)
            )
        } catch (e: Exception) {
            Log.e("SmsModule", "❌ getAllowedNumber error", e)
            promise.reject("GET_NUMBER_ERROR", e.message)
        }
    }

    // 🆕 آخرین SMS
    @ReactMethod
    fun getLastSms(promise: Promise) {
        val last = SmsStorage.getLast()
        if (last == null) {
            promise.resolve(null)
        } else {
            promise.resolve(last.toString())
        }
    }
}
