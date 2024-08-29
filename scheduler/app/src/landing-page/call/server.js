const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const crypto = require('crypto');

app.use(express.static(__dirname));

const key = fs.readFileSync('cert.key');
const cert = fs.readFileSync('cert.crt');

const expressServer = https.createServer({key, cert}, app);
const io = socketio(expressServer, {
    cors: {
        origin: [
            "https://localhost",
            'https://10.40.35.137'
        ],
        methods: ["GET", "POST"]
    }
});

expressServer.listen(8181);

const rooms = new Map();

function generateRoomId() {
    return crypto.randomBytes(4).toString('hex');
}

app.get('/create-room', (req, res) => {
    const roomId = 123;
    rooms.set(roomId, { offers: [], participants: [] });
    res.json({ roomId, link: `https://10.40.35.137/join/${roomId}` });
});

app.get('/join/:roomId', (req, res) => {
    const roomId = req.params.roomId;
    if (rooms.has(roomId)) {
        res.sendFile(__dirname + '/index.html');
    } else {
        res.status(404).send('Room not found');
    }
});

io.on('connection', (socket) => {
    const userName = socket.handshake.auth.userName;
    const password = socket.handshake.auth.password;
    const roomId = socket.handshake.auth.roomId;

    if (password !== "x" || !rooms.has(roomId)) {
        socket.disconnect(true);
        return;
    }

    const room = rooms.get(roomId);
    room.participants.push({
        socketId: socket.id,
        userName
    });

    socket.join(roomId);

    if (room.offers.length) {
        socket.emit('availableOffers', room.offers);
    }

    socket.on('newOffer', newOffer => {
        const offerObj = {
            offererUserName: userName,
            offer: newOffer,
            offerIceCandidates: [],
            answererUserName: null,
            answer: null,
            answererIceCandidates: []
        };
        room.offers.push(offerObj);
        socket.to(roomId).emit('newOfferAwaiting', [offerObj]);
    });

    socket.on('newAnswer', (offerObj, ackFunction) => {
        const offerToUpdate = room.offers.find(o => o.offererUserName === offerObj.offererUserName);
        if (!offerToUpdate) {
            console.log("No OfferToUpdate");
            return;
        }
        ackFunction(offerToUpdate.offerIceCandidates);
        offerToUpdate.answer = offerObj.answer;
        offerToUpdate.answererUserName = userName;
        const socketToAnswer = room.participants.find(s => s.userName === offerObj.offererUserName);
        if (socketToAnswer) {
            socket.to(socketToAnswer.socketId).emit('answerResponse', offerToUpdate);
        }
    });

    socket.on('sendIceCandidateToSignalingServer', iceCandidateObj => {
        const { didIOffer, iceUserName, iceCandidate } = iceCandidateObj;
        if (didIOffer) {
            const offerInOffers = room.offers.find(o => o.offererUserName === iceUserName);
            if (offerInOffers) {
                offerInOffers.offerIceCandidates.push(iceCandidate);
                if (offerInOffers.answererUserName) {
                    const socketToSendTo = room.participants.find(s => s.userName === offerInOffers.answererUserName);
                    if (socketToSendTo) {
                        socket.to(socketToSendTo.socketId).emit('receivedIceCandidateFromServer', iceCandidate);
                    }
                }
            }
        } else {
            const offerInOffers = room.offers.find(o => o.answererUserName === iceUserName);
            const socketToSendTo = room.participants.find(s => s.userName === offerInOffers.offererUserName);
            if (socketToSendTo) {
                socket.to(socketToSendTo.socketId).emit('receivedIceCandidateFromServer', iceCandidate);
            }
        }
    });

    socket.on('disconnect', () => {
        const index = room.participants.findIndex(p => p.socketId === socket.id);
        if (index !== -1) {
            room.participants.splice(index, 1);
        }
        if (room.participants.length === 0) {
            rooms.delete(roomId);
        }
    });
});