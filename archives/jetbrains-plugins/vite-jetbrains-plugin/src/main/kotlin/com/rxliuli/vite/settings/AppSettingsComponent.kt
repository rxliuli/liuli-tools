package com.rxliuli.vite.settings

import com.intellij.openapi.ui.DialogPanel
import com.intellij.openapi.ui.DialogWrapper
import com.intellij.openapi.ui.ValidationInfo
import com.intellij.ui.CollectionListModel
import com.intellij.ui.ToolbarDecorator
import com.intellij.ui.components.JBList
import com.intellij.ui.layout.panel
import com.rxliuli.vite.ViteMessage
import javax.swing.DefaultComboBoxModel

class AddInputDialog : DialogWrapper(true) {
    private lateinit var component: DialogPanel
    var newTemplateUrl = ""

    init {
        title = ViteMessage.msg("vite.settings.add-template.title")
        init()
    }

    override fun createCenterPanel(): DialogPanel {
        component = panel {
            row(ViteMessage.msg("vite.settings.add-template.label")) {
                textField({ newTemplateUrl },
                    {
                        newTemplateUrl = it
                    }).withValidationOnApply { if (it.text.isEmpty()) ValidationInfo("不能为空") else null }.focused()
            }
        }
        return component
    }

    override fun doValidate(): ValidationInfo? {
        if (component.validateCallbacks.isEmpty()) {
            return null
        }
        return component.validateCallbacks.map { it() }[0]
    }
}

class AppSettingsComponent {
    private val globalSettings: ViteAppSettingsState = ViteAppSettingsState.instance

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
                val dialog = AddInputDialog()
                dialog.show()
            }.setRemoveAction {
                println("remove: $it")
            }.createPanel()()
        }
    }
}