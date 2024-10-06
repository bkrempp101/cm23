import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  billingPeriod: 'monthly' | 'yearly';
  renewalDate: Date;
  endDate?: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  billingPeriod: { type: String, enum: ['monthly', 'yearly'], required: true },
  renewalDate: { type: Date, required: true },
  endDate: { type: Date },
});

export const getUserModel = (): Model<IUser> => {
  return mongoose.model<IUser>('User', UserSchema);
};
