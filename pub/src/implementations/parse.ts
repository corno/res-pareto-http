import * as fs from "fs"

fs.readdirSync("./scripts").forEach((child) => {
    console.log(`########"${child}":`)
    console.log(fs.readFileSync(`./scripts/${child}`, { encoding: "utf-8"}))
})