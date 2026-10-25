Local-only, minimal React type declarations used to type-check the UI in an
environment where `@types/react` could not be installed. The real project
type-check (`npm run typecheck`) uses `@types/react` from package.json and does
not read this folder.
