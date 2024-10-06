import { IResolvers } from 'apollo-server-express';
import { getMessageModel } from '../models/Message';

const messageResolvers: IResolvers = {
  Query: {
    getMessages: async (_, { userId }) => {
      const Message = getMessageModel();
      return await Message.find({ userId }).sort({ timestamp: -1 });
    },
  },
  Mutation: {
    sendMessage: async (_, { content, userId }) => {
      const Message = getMessageModel();
      const message = new Message({
        content,
        sender: 'user',
        userId,
      });

      await message.save();

      // Here you would typically call your AI service to generate a response
      // For now, we'll just create a mock AI response
      const aiResponse = new Message({
        content: `AI response to: ${content}`,
        sender: 'ai',
        userId,
      });

      await aiResponse.save();

      return [message, aiResponse];
    },
  },
};

export default messageResolvers;
