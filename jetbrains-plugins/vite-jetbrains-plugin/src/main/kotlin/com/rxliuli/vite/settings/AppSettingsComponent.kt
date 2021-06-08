package com.rxliuli.vite.settings

import com.intellij.openapi.ui.DialogPanel
import com.intellij.ui.CollectionListModel
import com.intellij.ui.ToolbarDecorator
import com.intellij.ui.components.JBList
import com.intellij.ui.layout.panel
import javax.swing.DefaultComboBoxModel

class AppSettingsComponent {
    private val globalSettings: AppSettingsState = AppSettingsState.instance

    val panel: DialogPanel = panel {
        row("Default template:") {
            comboBox(DefaultComboBoxModel(globalSettings.templates),
                { globalSettings.template },
                { globalSettings.template = it!! })
        }
        row("Templates:", true) {
            ToolbarDecorator.createDecorator(
                JBList(*globalSettings.templates),
                CollectionListModel(globalSettings.templates)
            ).setAddAction {
                println("add: $it")
            }.setRemoveAction {
                println("remove: $it")
            }.createPanel()()
        }
    }
}