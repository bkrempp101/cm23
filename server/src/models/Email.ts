import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEmail extends Document {
  subject: string;
  sender: string;
  received: Date;
  content: string;
  userId: string;
}

const EmailSchema: Schema = new Schema({
  subject: { type: String, required: true },
  sender: { type: String, required: true },
  received: { type: Date, required: true },
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const getEmailModel = (): Model<IEmail> => {
  return mongoose.model<IEmail>('Email', EmailSchema);
};
