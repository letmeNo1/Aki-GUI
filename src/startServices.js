const startButton  =document.getElementById("start_button")
const portValue  =document.getElementById("port_value")


startButton.addEventListener('click',()=>{
    if(startButton.getAttribute("value") =="off"){
        let path = __dirname.replace("sections","jarFile")
        const cmd = `java -Dloader.path=${path}\\lib -jar ${path}\\aki-server-1.0-SNAPSHOT.jar --server.port=${portValue.value}`
        exec(cmd, {async:true});
        startButton.setAttribute("value","on");
    }else{
        let child = exec('jps', {async:true});
        child.stdout.on('data', (data) =>{
            if(data.includes(".jar")){
                let pid = parseInt(data.split(" ")[0])
                try{
                    process.kill(pid)
                    alert("Service Stop!")
                }catch{
                    alert("Stop faild")
                }
            }
        });
        startButton.setAttribute("value","off");
    }
})
