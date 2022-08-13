import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("java")
    id("org.jetbrains.kotlin.jvm")
    id("org.jetbrains.intellij") version "1.6.0"
}

group = "com.rxliuli"
version = "0.2.2"

repositories {
    mavenCentral()
}

intellij {
    pluginName.set("vite-jetbrains-plugin")
    version.set("2021.3")
    type.set("IU")

    plugins.set(listOf("JavaScript"))
}

tasks {
    withType<JavaCompile> {
        sourceCompatibility = "11"
        targetCompatibility = "11"
    }
    withType<KotlinCompile> {
        kotlinOptions.jvmTarget = "11"
    }

    patchPluginXml {
        sinceBuild.set("213")
        untilBuild.set("223.*")
    }
}
