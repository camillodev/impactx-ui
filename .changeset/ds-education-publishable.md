---
"@impactx/ds-education": minor
---

Make `@impactx/ds-education` publishable to npm.

- Add `build` script (tsc + `scripts/copy-assets.mjs` for CSS tokens)
- Emit `.d.ts` + `.js` + sourcemaps to `dist/`
- Override `tsconfig` with `jsx: "react-jsx"` (automatic runtime, no React import needed)
- Switch `main` / `types` / `exports` to point at `dist/`
- Remove `private: true`, add `files: ["dist"]`, `sideEffects: ["*.css"]`, `prepublishOnly`
- Add `publishConfig.access = "restricted"` (final scope/registry decision pending — see `docs/decisions/ADR-0001-ds-education-publish.md` in kumon-app workspace notes)

Dry-run publish verified: 234 files, 90.5kB tarball, all subpath exports resolve.

Not yet published — first publish requires choosing scope (`@impactx` paid org vs `@impactxlab` free user scope) and rotating GitHub token if GH Packages route is preferred.
