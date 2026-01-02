package com.ertabatiyar.sms

import android.content.Context
import android.telephony.SmsManager
import android.util.Log

object SmsSender {

    fun send(context: Context, number: String, text: String) {
        try {
            val smsManager =
                context.getSystemService(SmsManager::class.java)

            if (smsManager == null) {
                Log.e("SmsSender", "❌ SmsManager در دسترس نیست")
                return
            }

            smsManager.sendTextMessage(
                number,
                null,
                text,
                null,
                null
            )

            Log.d("SmsSender", "✅ SMS ارسال شد به $number")

        } catch (e: Exception) {
            Log.e("SmsSender", "❌ خطا در ارسال SMS", e)
        }
    }
}
