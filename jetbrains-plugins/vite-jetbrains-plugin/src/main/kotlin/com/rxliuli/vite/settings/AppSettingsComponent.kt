package com.rxliuli.vite.settings

import com.intellij.openapi.ui.DialogPanel
import com.intellij.ui.layout.panel

class AppSettingsComponent {
    private val settings: AppSettingsState = AppSettingsState.instance

    val panel: DialogPanel = panel {
        row("Enter user name: ") {
            textField({ settings.userId }, { settings.userId = it }).focused()
        }
        row {
            checkBox("Do you use IntelliJ IDEA? ", { settings.ideaStatus }, { settings.ideaStatus = it })
        }
    }
}