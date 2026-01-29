package com.ertabatiyar.sms

import org.json.JSONArray
import org.json.JSONObject

object SmsStorage {

    private val cache: JSONArray = JSONArray()  // init مستقیم

    @Synchronized
    fun save(from: String, body: String) {
        val item = JSONObject().apply {
            put("from", from)
            put("body", body)
            put("time", System.currentTimeMillis())
        }
        cache.put(item)
    }

    fun getAll(): String {
        return cache.toString()
    }

    fun getLast(): JSONObject? {
        if (cache.length() == 0) return null
        return cache.getJSONObject(cache.length() - 1)
    }
}
