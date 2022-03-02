let shell = require('shelljs')
let nodePath = (shell.which('node').toString());
shell.config.execPath = nodePath;
let exec = shell.exec


const checkButton  =document.getElementById("check_env")

checkButton.addEventListener('click',()=>{
    const { stderr } = exec('java -version', { silent: true })
    const { stdout } = exec("jps");
    console.log(stdout)
    if(stderr.includes("java")){
        alert("The environment is OK")
    }else{
        alert("Please install the java environment first!")
    }
})
