import path from 'path'
import fs from 'fs/promises'
const unrealPath = 'unrealPath111=++'

fs.access(unrealPath).then(data => console.log(data))
