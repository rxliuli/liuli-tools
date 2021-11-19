<!-- Keep a Changelog guide -> https://keepachangelog.com -->

# Changelog

## [0.2.1]


### Fixed

- fix: fix expired API `ServiceManager.getService`

## [0.2.0]

### Changed

- chore: change the name of the plugin displayed in the creation panel to Vite
- feat: use create-vite instead of the deprecated @vitejs/create-app

## [0.1.6]

### Changed

- feat(vite-jetbrains-plugin): Remove jetbrains ide version restriction

### Fixed

- refactor(vite-jetbrains-plugin): Use more streamlined kotlin ui dsl getter/setter code
- fix(vite-jetbrains-plugin): Delete settings.gradle.kts under jetbrains-plugins.vite-jetbrains-plugin to solve the error

## [0.1.5]

### Fixed

- feat(vite-jetbrains-plugin): Persistent the selected template, the last selected template is selected by default

## [0.1.4]

### Changed

- Migrate to <https://github.com/rxliuli/liuli-tools/tree/master/jetbrains-plugins/vite-jetbrains-plugin>

## [0.1.3]

### Changed

- docs: Screenshots are no longer included in the introduction

### Fixed

- fix: Fix an issue with using the outdated API IconLoader.getIcon

## [0.1.2]

### Fixed

- Fix the error that README and CHANGELOG are not read

## [0.1.1]

### Added

- Internationalization (English first) support

### Changed

### Fixed

- Generate items to temporary locations in the plugin and then cut them to the actual directory
- Fix the path error of icons
- Fix the path error of the icon, fix the problem that the plugin does not work in webstorm, change the README

## [0.1.0]

### Added

- Support for creating vite projects in the boot panel
