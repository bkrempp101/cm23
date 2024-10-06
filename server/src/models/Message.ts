import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  userId: string;
}

const MessageSchema: Schema = new Schema({
  content: { type: String, required: true },
  sender: { type: String, enum: ['user', 'ai'], required: true },
  timestamp: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const getMessageModel = (): Model<IMessage> => {
  return mongoose.model<IMessage>('Message', MessageSchema);
};
