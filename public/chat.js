// Query DOM
let output      = document.querySelector(".output"),
    feedback    = document.querySelector(".feedback"),
    name        = document.getElementById("name"),
    message     = document.getElementById("msg"),
    sendMessage = document.querySelector(".send");

// connecting to server
var socket = io.connect("http://localhost:4000");

// emit events
sendMessage.addEventListener("click", () => {
  socket.emit("chat", {
    handler: name.value,
    message: message.value
  });
  message.value = "";
});

// listen for events
socket.on("chat", data => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.handler}: </strong> ${data.message}</p>`;
});
socket.on("typing", data => {
  feedback.innerHTML = `<p>${data} is typing a message</p>`;
})

message.addEventListener("keypress", e => {
  socket.emit("typing", name.value);
  console.log(e.target.value.length);
});