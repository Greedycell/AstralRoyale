const express = require("express")
const fs = require("fs")
const path = require("path")
const GamefilesFolder = path.join(__dirname, "../AstralRoyale.Server/Gamefiles")
const updateFolder = path.join(GamefilesFolder, "update")
const patchName = require("crypto").randomBytes(20)/*20 = 40 so basically this is doubled*/.toString("hex")
const patchFolder = path.join(updateFolder, patchName)
fs.mkdirSync(patchFolder, { recursive: true }) // create the patch folder

for (const item of fs.readdirSync(GamefilesFolder)) {
    if (item === "update") continue // skip the update folder creation cuz the folder exists
    fs.cpSync(path.join(GamefilesFolder, item), path.join(patchFolder, item), { recursive: true }) // copy gamefiles stuff into patch folder
}

const fingerprintJSON = path.join(GamefilesFolder, "fingerprint.json")
if (fs.existsSync(fingerprintJSON)) {
    const data = JSON.parse(fs.readFileSync(fingerprintJSON, "utf8"))
    data.sha = patchName // update the sha name with the new patch name
    data.version = data.version.split(".").map((value, index, array) => index === array.length - 1 ? +value + 1 : value).join(".") // this increments the last number in the version string, for example 3.830.6 > 3.830.7

    // save fingerprint.json
    const out = JSON.stringify(data, null, 4)
    fs.writeFileSync(fingerprintJSON, out)
    fs.writeFileSync(path.join(patchFolder, "fingerprint.json"), out)
}

const expressServer = express()
expressServer.use(express.static(updateFolder))
expressServer.listen(9340, "0.0.0.0", () => {
    console.log("Content server listening on port 9340")
})