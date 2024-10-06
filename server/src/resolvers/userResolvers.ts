import { IResolvers } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserModel } from '../models/User';

const userResolvers: IResolvers = {
  Query: {
    getUser: async (_, { id }) => {
      const User = getUserModel();
      return await User.findById(id);
    },
  },
  Mutation: {
    signUp: async (_, { name, email, password, billingPeriod }) => {
      const User = getUserModel();
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const renewalDate = new Date();
      renewalDate.setMonth(renewalDate.getMonth() + (billingPeriod === 'yearly' ? 12 : 1));

      const user = new User({
        name,
        email,
        password: hashedPassword,
        billingPeriod,
        renewalDate,
      });

      await user.save();

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

      return { token, user };
    },
    login: async (_, { email, password }) => {
      const User = getUserModel();
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

      return { token, user };
    },
    changePassword: async (_, { userId, newPassword }) => {
      const User = getUserModel();
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return true;
    },
  },
};

export default userResolvers;
