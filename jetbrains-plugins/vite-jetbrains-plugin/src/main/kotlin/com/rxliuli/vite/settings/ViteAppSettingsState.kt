package com.rxliuli.vite.settings

import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.components.PersistentStateComponent
import com.intellij.openapi.components.State
import com.intellij.openapi.components.Storage
import com.intellij.util.xmlb.XmlSerializerUtil

@State(name = "com.rxliuli.vite.settings.ViteAppSettingsState", storages = [Storage("SdkSettingsPlugin.xml")])
class ViteAppSettingsState : PersistentStateComponent<ViteAppSettingsState?> {
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
        "lit",
        "lit-ts",
        "svelte",
        "svelte-ts",
    )

    override fun getState(): ViteAppSettingsState {
        return this
    }

    override fun loadState(state: ViteAppSettingsState) {
        XmlSerializerUtil.copyBean(state, this)
    }

    companion object {
        val instance: ViteAppSettingsState
            get() = ApplicationManager.getApplication().getService(ViteAppSettingsState::class.java)
    }
}