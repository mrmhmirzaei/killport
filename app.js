#!/usr/bin/env node

const util = require('util');
const exec = util.promisify(require('child_process').exec);
let args = process.argv.slice(process.execArgv.length + 2);
if(args.length == 0 || checkNeedHelp()){
  console.log("WARNING : Forget get port as argument.");
  console.log("> killport <port> [-y]");
  console.log('\nOptions :\n -y : Don\'t ask to confirm (optional).');
  process.exit(1);
} else {
  let port = args[0];
  let confirmed = false;
  if(args[1] && args[1] == '-y') confirmed = true;
  port = parseInt(port);
  if(isNaN(port)){
    console.log("WARNING : Port must be a number.");
    process.exit(1);
  } else {
    run(`sudo netstat -lpn |grep :${port}`)
    .then(result=>{
      return findProcess(result);
    })
    .then(result=>{
      if(confirmed == false)
        return confirm(result);
      else return Promise.resolve(result['id']);
    })
    .then(result=>{
      run(`sudo kill -9 ${result}`);
      process.exit(1);
    })
    .catch(error=>{
      if(error != 'reject') console.log('ERROR : An error heppent!');
      if(error == undefined) console.log(`\tCould not find a process that using <${port}> TCP/IP port.`);
      process.exit(1);
    })
  }
}

function checkNeedHelp(){
  let result = false;
  args.forEach(arg=>{
    if(arg == '-h' || arg == '--help') result = true;
  })
  return result;
}

function run(command=''){
  return new Promise(async (resolve, reject)=>{
    try {
      const { stdout, stderr } = await exec(command);
      if(stderr) reject(stderr);
      else resolve(stdout);
    } catch (error) {
      reject();
    }
  });
}

function findProcess(string=''){
  return new Promise(async (resolve, reject)=>{
    string = await string.split('\n');
    if(string.length == 0) reject();
    else string = string[0];
    string = await string.split(' ');
    string = await string.filter(item => item !== '');
    string = await string.reverse();
    await string.forEach(async item=>{
      if(await item.includes('/')) {
        item = await item.split('/');
        if(item.length == 2){
          let id = await parseInt(item[0]);
          let name = item[1].slice(0,-1);
          resolve({id, name});
        } else reject();
      }
    });
  });
}

function confirm(info){
  return new Promise(async (resolve, reject)=>{
    await process.stdout.write(`Are you sure to kill <${info['name']}> [y/n]? `);
    let stdin = process.openStdin();
    await stdin.addListener("data", result=>{
      result = result.toString().trim();
      if(result == 'y') resolve(info['id']);
      else reject('reject');
    });
  })
}
