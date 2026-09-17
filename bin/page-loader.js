#!/usr/bin/env node

import { program } from 'commander'

program.version('0.0.0.1')
  .description('page loader by Edmart :)')
  .option('-o, --output [dir]', 'output dir (default: "/app)', '/app')
  .argument('<url>')
  .action((name) => {
    const option = program.opts()
    console.log(name, option.output)
  })
  .parse(process.argv)
