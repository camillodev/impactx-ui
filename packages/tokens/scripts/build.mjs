import { cpSync, mkdirSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")

mkdirSync(resolve(root, "dist/themes"), { recursive: true })

cpSync(resolve(root, "src/base.css"), resolve(root, "dist/base.css"))
cpSync(resolve(root, "src/themes/education.css"), resolve(root, "dist/themes/education.css"))
cpSync(resolve(root, "src/themes/kumon.css"), resolve(root, "dist/themes/kumon.css"))
cpSync(resolve(root, "src/themes/impactx.css"), resolve(root, "dist/themes/impactx.css"))

console.log("@impactx/tokens built ✓")
