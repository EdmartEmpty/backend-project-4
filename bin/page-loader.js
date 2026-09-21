#!/usr/bin/env node

import { program } from 'commander'
import getPage from '../src/getPage.js'
program.version('0.0.0.1')
  .description('page loader by Edmart :)')
  .option('-o, --output [dir]', 'output dir (default: "/app)', `${process.cwd()}/app`)
  .argument('<url>')
  .action((url) => {
    const option = program.opts().output
    getPage(url, option)
  })
  .parse(process.argv)
