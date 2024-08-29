const userName = "User-" + Math.floor(Math.random() * 100000);
const password = "x";
document.querySelector('#user-name').innerHTML = userName;

// Extract room ID from URL
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('roomId');

if (!roomId) {
    alert('No room ID provided. Please use a valid meeting link.');
}

const socket = io.connect('https://your-domain.com:8181/', {
    auth: {
        userName,
        password,
        roomId
    }
});

const localVideoEl = document.querySelector('#local-video');
const remoteVideoEl = document.querySelector('#remote-video');

let localStream;
let remoteStream;
let peerConnection;
let didIOffer = false;

const peerConfiguration = {
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302'
            ]
        }
    ]
};

// Rest of the code remains the same...

// Modify the createOfferEls function to include the room ID
function createOfferEls(offers) {
    const answerEl = document.querySelector('#answer');
    answerEl.innerHTML = '';

    offers.forEach(o => {
        const newOfferEl = document.createElement('button');
        newOfferEl.className = "btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2";
        newOfferEl.textContent = `Answer ${o.offererUserName}`;
        newOfferEl.addEventListener('click', () => answerOffer(o));
        answerEl.appendChild(newOfferEl);
    });
}

document.querySelector('#call').addEventListener('click', call);

// Add a function to create a new room
async function createRoom() {
    try {
        const response = await fetch('/create-room');
        const data = await response.json();
        const meetingLink = `${window.location.origin}/join/${data.roomId}?roomId=${data.roomId}`;
        alert(`Your meeting link: ${meetingLink}`);
    } catch (error) {
        console.error('Error creating room:', error);
    }
}

// Add a button to create a new room
const createRoomButton = document.createElement('button');
createRoomButton.textContent = 'Create New Room';
createRoomButton.className = "btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2";
createRoomButton.addEventListener('click', createRoom);
document.body.insertBefore(createRoomButton, document.body.firstChild);