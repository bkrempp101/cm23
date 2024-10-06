import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { handleApiError } from '@/utils';
import { Email } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const EmailManagement: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await fetch(`/api/emails?userId=${user?.id}`);
      const data = await handleApiError(response);
      setEmails(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch emails. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, userId: user?.id }),
      });
      await handleApiError(response);
      toast({
        title: 'Success',
        description: 'Email added successfully.',
      });
      setNewEmail('');
      fetchEmails();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add email. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // ... rest of the component code (JSX for rendering email list and form) ...

};

export default EmailManagement;
