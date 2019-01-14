'use strict';

var connection = new signalR.HubConnectionBuilder()
	.withUrl('/messenger')
	.withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol())
    .build();

connection.on('ReceiveMessage', function (user, message) {
	var messageList = document.getElementById("messageList");
	var node = document.createElement("li");
	var nodeText = document.createTextNode(message);
	node.appendChild(nodeText);
	messageList.appendChild(node);
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById('messageSubmit').addEventListener('click', function (event) {
    event.preventDefault();
    //var user = document.getElementById('user').value;
    var message = document.getElementById('messageInput').value;

    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
});