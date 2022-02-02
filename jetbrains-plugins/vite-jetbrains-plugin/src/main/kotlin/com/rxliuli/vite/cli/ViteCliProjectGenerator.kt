package com.rxliuli.vite.cli

import com.intellij.execution.filters.Filter
import com.intellij.ide.util.projectWizard.SettingsStep
import com.intellij.lang.javascript.boilerplate.NpmPackageProjectGenerator
import com.intellij.lang.javascript.boilerplate.NpxPackageDescriptor
import com.intellij.openapi.project.Project
import com.intellij.openapi.roots.ContentEntry
import com.intellij.openapi.ui.ComboBox
import com.intellij.openapi.util.Key
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.platform.ProjectGeneratorPeer
import com.intellij.util.ui.UIUtil
import com.rxliuli.vite.ViteIcons
import com.rxliuli.vite.ViteMessage
import com.rxliuli.vite.settings.ViteAppSettingsState
import org.jetbrains.annotations.Nullable
import java.io.File
import javax.swing.DefaultComboBoxModel
import javax.swing.Icon

class ViteCliProjectGenerator : NpmPackageProjectGenerator() {
    private val packageName = "create-vite"
    private val executeCmd = "create-vite"

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
        return listOf(NpxPackageDescriptor.NpxCommand(packageName, executeCmd))
    }

    val settingsTemplateKey = Key.create<String>("template")
    private val globalSettings: ViteAppSettingsState = ViteAppSettingsState.instance

    override fun createPeer(): ProjectGeneratorPeer<Settings> {
        val templateComponent = ComboBox(DefaultComboBoxModel(globalSettings.templates))

        return object : NpmPackageGeneratorPeer() {
            init {
                templateComponent.selectedItem = globalSettings.template
            }

            override fun buildUI(settingsStep: SettingsStep) {
                super.buildUI(settingsStep)
                settingsStep.addSettingsField(
                    UIUtil.replaceMnemonicAmpersand(
                        ViteMessage.msg("vite.project.generator.settings.template")
                    ),
                    templateComponent
                )
            }

            override fun getSettings(): Settings {
                val settings = super.getSettings()
                settings.putUserData(
                    settingsTemplateKey,
                    templateComponent.selectedItem as @Nullable String
                )
                return settings
            }
        }
    }

    override fun generatorArgs(project: Project, baseDir: VirtualFile, settings: Settings): Array<String> {
        val template = settings.getUserData(settingsTemplateKey)
        globalSettings.template = template!!
        return arrayOf(baseDir.name, "--template", template)
    }

    override fun generateInTemp(): Boolean {
        return true
    }

    override fun workingDir(settings: Settings?, baseDir: VirtualFile): File {
        return super.workingDir(settings, baseDir).parentFile
    }
}
