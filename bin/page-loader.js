#!/usr/bin/env node

import { program } from 'commander'
import loader from '../index.js'

program.version('1.0.0.')
  .description('page loader by Edmart :)')
  .option('-o, --output [dir]', 'output dir (default: "/app)')
  .argument('<url>')
  .action(async (url) => {
    try {
      const option = program.opts().output || process.cwd()
      await loader(url, option)
    }
    catch (error) {
      console.error(`Failed to download page: ${error.message}`)
      process.exit(1)
    }
  })
  .parse(process.argv)
