package com.rxliuli.vite.settings

import com.intellij.openapi.options.BoundConfigurable
import com.intellij.openapi.ui.DialogPanel

class AppSettingsConfigurable : BoundConfigurable("SDK: Application Settings Example") {
    override fun createPanel(): DialogPanel {
        return AppSettingsComponent().panel
    }
}
