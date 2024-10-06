import { IResolvers } from 'apollo-server-express';
import { getEmailModel } from '../models/Email';

const emailResolvers: IResolvers = {
  Query: {
    getEmails: async (_, { userId }) => {
      const Email = getEmailModel();
      return await Email.find({ userId }).sort({ received: -1 });
    },
  },
  Mutation: {
    addEmail: async (_, { subject, sender, content, userId }) => {
      const Email = getEmailModel();
      const email = new Email({
        subject,
        sender,
        received: new Date(),
        content,
        userId,
      });

      await email.save();
      return email;
    },
  },
};

export default emailResolvers;
