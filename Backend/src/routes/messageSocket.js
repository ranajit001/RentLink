import { handleSendMessage } from '../controllers/messageController.js';

export const setupMessageSocket = (io) => {
  const userSocketMap = new Map();

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
    }

    //  Handle send-message
    socket.on('send-message', async (data) => {
      const { senderId, receiverId } = data;

      try {
        const savedMessage = await handleSendMessage(data);

        // emit to sender
        socket.emit('message-sent', savedMessage);

        // emit to receiver if online
        const receiverSocket = userSocketMap.get(receiverId);
        if (receiverSocket) {
          io.to(receiverSocket).emit('receive-message', savedMessage);
        }
      } catch (err) {
        socket.emit('message-error', { error: err.message });
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      for (let [uid, sid] of userSocketMap.entries()) {
        if (sid === socket.id) {
          userSocketMap.delete(uid);
          break;
        }
      }
      console.log(`User ${userId} disconnected`);
    });
  });
};
