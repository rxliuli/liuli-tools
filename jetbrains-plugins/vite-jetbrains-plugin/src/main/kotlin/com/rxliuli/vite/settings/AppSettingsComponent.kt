package com.rxliuli.vite.settings

import com.intellij.openapi.ui.DialogPanel
import com.intellij.ui.layout.panel
import javax.swing.JPanel

class AppSettingsComponent {
    private val settings: AppSettingsState = AppSettingsState.instance
    val panel: DialogPanel = panel {
        row("Enter user name: ") {
            textField({
                settings.userId
            }, setter = { v ->
                settings.userId = v
            }).focused()
        }
        row {
            checkBox("Do you use IntelliJ IDEA? ", { settings.ideaStatus }, { v ->
                settings.ideaStatus = v
            })
        }
    }
}