package com.ertabatiyar.receiver

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.provider.Telephony
import android.util.Log
import com.ertabatiyar.security.SmsSecurity
import com.ertabatiyar.sms.SmsProcessor
import com.ertabatiyar.sms.SmsStorage

class SmsReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context?, intent: Intent?) {
        if (context == null) return
        if (intent?.action != Telephony.Sms.Intents.SMS_RECEIVED_ACTION) return

        val messages =
            Telephony.Sms.Intents.getMessagesFromIntent(intent)

        if (messages.isNullOrEmpty()) return

        val fullBody = StringBuilder()
        var from = ""

        messages.forEach { sms ->
            from = sms.originatingAddress ?: from
            fullBody.append(sms.messageBody ?: "")
        }

        if (from.isBlank()) return

        val body = fullBody.toString().trim()

        if (!SmsSecurity.isAllowedSender(context, from)) {
            Log.d("SmsReceiver", "⛔ SMS از شماره غیرمجاز: $from")
            return
        }

        Log.d("SmsReceiver", "📩 SMS کامل: $from → $body")

        SmsProcessor.handle(context, from, body)
        SmsStorage.save(from, body)
    }
}