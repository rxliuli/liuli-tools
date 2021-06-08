package com.rxliuli.vite.settings

import com.intellij.openapi.components.PersistentStateComponent
import com.intellij.openapi.components.ServiceManager
import com.intellij.openapi.components.State
import com.intellij.openapi.components.Storage
import com.intellij.util.xmlb.XmlSerializerUtil

@State(name = "org.intellij.sdk.settings.AppSettingsState", storages = [Storage("SdkSettingsPlugin.xml")])
class AppSettingsState : PersistentStateComponent<AppSettingsState?> {
    var template = "react-ts"
    val templates = arrayOf(
        "vanilla",
        "vanilla-ts",
        "vue",
        "vue-ts",
        "react",
        "react-ts",
        "preact",
        "preact-ts",
        "lit-element",
        "lit-element-ts",
        "svelte",
        "svelte-ts",
    )

    override fun getState(): AppSettingsState {
        return this
    }

    override fun loadState(state: AppSettingsState) {
        XmlSerializerUtil.copyBean(state, this)
    }

    companion object {
        val instance: AppSettingsState
            get() = ServiceManager.getService(AppSettingsState::class.java)
    }
}