const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message); // Emit the 'send' event
    messageInput.value = ''; // Clear the input field
});

const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

// Listen for the 'user-joined' event and append the message when a user joins
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right'); // Use 'left' for received messages
});

// Listen for the 'receive' event and append the received message
socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`, 'left');
});
