#!/usr/bin/env node

const program = require('commander')

program
    .arguments('<path>')
    .option('-e2e, --end-to-end', 'end to end tests')

    .action((path) => {
      console.log(path)
    })
    .parse(process.argv)
