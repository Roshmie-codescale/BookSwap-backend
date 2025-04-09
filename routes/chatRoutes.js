import express from 'express';
import chat from '../models/chat';  

const router = express.Router();

router.post('/send', async (req, res) => {
    try {
        const { senderID, receiverID, bookID, message } = req.body;
        const newChat = new chat({ senderID, receiverID, bookID, message });
        await newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/get/:senderID/:receiverID', async (req, res) => {
    try {
        const { senderID, receiverID } = req.params;
        const chats = await chat.find({ senderID, receiverID });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});