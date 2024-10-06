export interface User {
  id: string;
  name: string;
  email: string;
  billingPeriod: 'monthly' | 'yearly';
  renewalDate: string;
  endDate?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Email {
  id: string;
  subject: string;
  sender: string;
  received: string;
  content: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  disease: 'diabetes' | 'hypertension';
  checkupFrequency: 'daily' | 'bi-daily' | 'weekly';
  weeklyCheckupDay?: string;
}

export interface CheckIn {
  id: string;
  patientId: string;
  scheduledDate: Date;
  status: 'PENDING' | 'SENT' | 'COMPLETED';
}

export interface TrainingDocument {
  id: string;
  name: string;
  url: string;
  userId: string;
}
