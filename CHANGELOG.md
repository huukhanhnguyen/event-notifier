# Changelog
This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)  
and [Semantic Versioning](https://semver.org/).
## [1.0.5] – 2025-07-27

### Changed
- `Listener` type allow any arguments
- listener.onCleanup rename to listener.afterSubscribe 
## [1.0.4] – 2025-07-2
### Removed
- `addOnceListener` helper — simplified in favor of a manual wrapping pattern (see updated tutorial).
- `removeAllListeners` — removed due to low usage and to reduce API surface.
## [1.0.3] – 2025-07-1
### Changed
- Fixed `package.json`: corrected `"module"` field from `"dist/index.esm.js"` → `"dist/index.js"` for proper ESM resolution.

## [1.0.2] – 2025-07-1
### Changed
- Refactored the entire codebase to TypeScript
- Migrated build system to `tsup`.
- **Renamed** UMD output from `index.umd.js` → `index.global.js` (CDN users: update your script URL!)
## [1.0.1] – 2025-06-21
### Added
- Introduced this changelog file to track future changes

## [1.0.0] – 2025-06-20
### Added
- Initial release of the `event-notifier` package