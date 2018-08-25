#!/usr/bin/env node

const program = require('commander')

program
    .arguments('<path>')
    .option('-e2e, --end-to-end', 'end to end tests')

    .action((path) => {
        var exec = require('child_process').exec, child;

      	child = exec('sh index.sh',
	// Pasamos los parámetros error, stdout la salida 
	// que mostrara el comando
	function (error, stdout, stderr) {
	    // Imprimimos en pantalla con console.log
	    console.log(stdout);
	    // controlamos el error
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
    })
    .parse(process.argv)
