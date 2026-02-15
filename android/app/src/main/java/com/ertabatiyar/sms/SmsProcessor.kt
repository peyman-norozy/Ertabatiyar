package com.ertabatiyar.sms

import android.content.Context
import com.ertabatiyar.device.DeviceController
import com.ertabatiyar.security.SmsSecurity

object SmsProcessor {

    fun handle(context: Context, from: String, message: String) {

        // 1️⃣ همیشه پیام رو ذخیره کن (حتی اگر مجاز نبود)
        SmsStorage.save(from, message)

        // 2️⃣ اگر فرستنده مجاز نیست، فقط ذخیره می‌کنیم
        if (!SmsSecurity.isAllowedSender(context, from)) {
            SmsSender.send(context, from, "BLOCKED")
            return
        }

        val command = message.trim().uppercase()

        when (command) {

            "LIGHT_ON" -> {
                DeviceController.lightOn()
                SmsSender.send(context, from, "LIGHT_IS_ON")
            }

            "LIGHT_OFF" -> {
                DeviceController.lightOff()
                SmsSender.send(context, from, "LIGHT_IS_OFF")
            }

            else -> {
                // دستور نامعتبر
                SmsSender.send(context, from, "UNKNOWN_COMMAND")
            }
        }
    }
}
