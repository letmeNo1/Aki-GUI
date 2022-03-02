const startButton  =document.getElementById("start_button")
const portValue  =document.getElementById("port_value")


startButton.addEventListener('click',()=>{
    if(startButton.getAttribute("value") =="off"){
        let path = __dirname.replace("sections","jarFile")
        const cmd1 = "jps"
        const cmd2 = `java -Dloader.path=${path}\\lib -jar ${path}\\aki-server-1.0-SNAPSHOT.jar --server.port=${portValue.value}`
        let out1 = ""
        let  child1 = exec(cmd1,{async:true});
        child1.stdout.on("data",(data)=>{
            out1=out1+data
        })
        child1.stdout.on("close",(data)=>{
            if(out1.includes(".jar")||out1.includes("App")){
                alert("Already start!")
                startButton.setAttribute("value","on");
            }else{
                let child2 = exec(cmd2,{async:true});
                child2.stdout.on("data",(data)=>{
                   if(data.includes("Started App in")){
                     alert("Services start!")
                     startButton.setAttribute("value","on");
                   }else if(data.includes("configure this application to listen on another port.")){
                     window.location.reload()
                     alert("The port is occupied!")
                     startButton.setAttribute("value","off");
                   }
                })
            }
        })
    }
    else{
        let child3 = exec('jps', {async:true});
        child3.stdout.on('data', (data) =>{
            if(data.includes(".jar")){
                let pid = parseInt(data.split(" ")[0])
                try{
                    process.kill(pid)
                    alert("Service Stop!")
                    startButton.setAttribute("value","off");

                }catch{
                    alert("Stop faild")
                }
            }
        })
    }
})

