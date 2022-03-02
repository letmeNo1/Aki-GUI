let shell = require('shelljs')
let nodePath = (shell.which('node').toString());
shell.config.execPath = nodePath;
let exec = shell.exec


module.exports = function ss(){
    let out  = exec("jps").toString()
    if(out.includes(".jar")){
        return true
    }else{
        return false
    }
}
