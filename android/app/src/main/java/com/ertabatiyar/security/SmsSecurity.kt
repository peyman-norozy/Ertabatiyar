package com.ertabatiyar.security

import android.content.Context

object SmsSecurity {

    private const val PREFS_NAME = "sms_security"
    private const val KEY_ALLOWED_NUMBER = "allowed_number"

    fun setAllowedNumber(context: Context, number: String) {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        prefs.edit().putString(KEY_ALLOWED_NUMBER, number).apply()
    }

    fun getAllowedNumber(context: Context): String? {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        return prefs.getString(KEY_ALLOWED_NUMBER, null)
    }

    fun isAllowedSender(context: Context, number: String): Boolean {
        val allowedNumber = getAllowedNumber(context) ?: return false
        val normalizedIncoming = normalizeNumber(number)
        val normalizedAllowed = normalizeNumber(allowedNumber)
        return normalizedIncoming == normalizedAllowed
    }

    private fun normalizeNumber(number: String): String {
        val n = number.replace("[^0-9+]".toRegex(), "") // فقط اعداد و +
        return when {
            n.startsWith("0") -> "+98" + n.substring(1)
            n.startsWith("+98") -> n
            else -> "+$n" // fallback، اگر کاربر بدون صفر یا +98 وارد کرده
        }
    }
}
