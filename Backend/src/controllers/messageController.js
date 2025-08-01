
import MessageModel from '../models/Message.js';

export const handleSendMessage = async ({ senderId, receiverId, content }) => {
  try {
    const newMsg = new MessageModel({ senderId, receiverId, content });
    await newMsg.save();
    return newMsg;
  } catch (err) {
    console.error( err.message);
    throw err; 
  }
};


