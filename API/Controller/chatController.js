const Chat = require("../Models/chatModel");

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // Create a new chat document
    const newChat = new Chat({
      sender: senderId,
      receiver: receiverId,
      message: message,
    });

    // Save the chat document
    await newChat.save();

    res
      .status(201)
      .json({ message: "Message sent successfully", chat: newChat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;

    // Find messages between the two users
    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
