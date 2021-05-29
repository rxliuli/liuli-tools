package com.rxliuli.vite.cli

import com.intellij.execution.filters.Filter
import com.intellij.ide.util.projectWizard.SettingsStep
import com.intellij.lang.javascript.boilerplate.NpmPackageProjectGenerator
import com.intellij.lang.javascript.boilerplate.NpxPackageDescriptor
import com.intellij.openapi.project.Project
import com.intellij.openapi.roots.ContentEntry
import com.intellij.openapi.util.Key
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.platform.ProjectGeneratorPeer
import com.intellij.ui.components.JBList
import com.intellij.util.ui.UIUtil
import com.rxliuli.vite.ViteIcons
import com.rxliuli.vite.ViteMessage
import java.io.File
import javax.swing.*

class ViteCliProjectGenerator : NpmPackageProjectGenerator() {
    private val packageName = "@vitejs/create-app"

    override fun getName(): String {
        return ViteMessage.msg("vite.project.generator.name")
    }

    override fun getDescription(): String {
        return ViteMessage.msg("vite.project.generator.description")
    }

    override fun getIcon(): Icon {
        return ViteIcons.ICON_16
    }

    override fun customizeModule(baseDir: VirtualFile, entry: ContentEntry) {}

    override fun filters(project: Project, baseDir: VirtualFile): Array<Filter> {
        return emptyArray()
    }

    override fun packageName(): String {
        return packageName
    }

    override fun presentablePackageName(): String {
        return ViteMessage.msg("vite.project.generator.presentablePackageName")
    }

    override fun getNpxCommands(): List<NpxPackageDescriptor.NpxCommand> {
        return listOf(NpxPackageDescriptor.NpxCommand(packageName, "create-app"))
    }

    val settingsTemplateKey = Key.create<String>("template")

    override fun createPeer(): ProjectGeneratorPeer<Settings> {
        val pluginNameTextField = JBList(
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

        return object : NpmPackageGeneratorPeer() {
            override fun buildUI(settingsStep: SettingsStep) {
                super.buildUI(settingsStep)
                pluginNameTextField.setSelectedValue("react-ts", true)
                settingsStep.addSettingsField(
                    UIUtil.replaceMnemonicAmpersand(
                        ViteMessage.msg("vite.project.generator.settings.template")
                    ),
                    pluginNameTextField
                )
            }

            override fun getSettings(): Settings {
                val settings = super.getSettings()
                settings.putUserData(
                    settingsTemplateKey,
                    pluginNameTextField.selectedValue
                )
                return settings
            }
        }
    }

    override fun generatorArgs(project: Project, baseDir: VirtualFile, settings: Settings): Array<String> {
        val template = settings.getUserData<String>(settingsTemplateKey)
        return arrayOf(" ${baseDir.name} --template $template")
    }

    override fun generateInTemp(): Boolean {
        return true
    }

    override fun workingDir(settings: Settings?, baseDir: VirtualFile): File {
        return super.workingDir(settings, baseDir).parentFile
    }
}
