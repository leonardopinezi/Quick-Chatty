const Socket = io();

Socket.on("update", ({c})=> {
    document.getElementById("chat-info").innerText = `Online users [${c}]`;
});

const username = prompt("Choose a Username!!!") || Date.now();
alert("This is a public anonymous chat, I am not responsible for your actions, be respectful and ethical.");

Socket.on("msg", ({message})=>{
    let msg = document.createElement("p");
    msg.innerText = message;
    document.getElementById("messages").appendChild(msg);
    
    if(message.includes("@" + username)) msg.setAttribute("class", "mark");
});

document.getElementById("sendMessage").addEventListener("click", (e)=> {
    if(document.getElementById("msg").value.trim().length > 0) Socket.emit("message", `${username} : ${document.getElementById("msg").value.trim()}`);
    document.getElementById("msg").value = "";
});