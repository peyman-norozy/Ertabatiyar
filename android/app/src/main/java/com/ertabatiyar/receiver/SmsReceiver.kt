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

        val messages = Telephony.Sms.Intents.getMessagesFromIntent(intent)
        if (messages.isNullOrEmpty()) return

        for (sms in messages) {
            val from = sms.originatingAddress ?: continue
            val body = sms.messageBody ?: continue

            if (!SmsSecurity.isAllowedSender(context, from)) {
                Log.d("SmsReceiver", "⛔ SMS از شماره غیرمجاز: $from")
                continue
            }

            Log.d("SmsReceiver", "📩 SMS معتبر: $from → $body")

            SmsProcessor.handle(context, from, body)
            SmsStorage.save(from, body)
        }
    }
}
