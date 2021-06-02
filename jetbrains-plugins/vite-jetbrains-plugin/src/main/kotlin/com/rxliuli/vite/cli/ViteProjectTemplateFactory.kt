package com.rxliuli.vite.cli

import com.intellij.ide.util.projectWizard.WizardContext
import com.intellij.openapi.module.WebModuleBuilder
import com.intellij.platform.ProjectTemplate
import com.intellij.platform.ProjectTemplatesFactory

class ViteProjectTemplateFactory : ProjectTemplatesFactory() {
    override fun getGroups(): Array<String> = arrayOf(WebModuleBuilder.GROUP_NAME)

    override fun createTemplates(group: String?, context: WizardContext): Array<ProjectTemplate> {
        return arrayOf(ViteCliProjectGenerator())
    }
}