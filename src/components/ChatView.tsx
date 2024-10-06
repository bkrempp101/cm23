import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message } from '@/types';
import { handleApiError } from '@/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { toast } = useToast();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await handleApiError(response);
      setMessages(data);
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input, userId: user?.id }),
      });
      const newMessage = await handleApiError(response);
      setMessages([...messages, newMessage]);
      setInput('');
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  // ... rest of the component code (JSX for rendering messages and input) ...

};

export default ChatView;
