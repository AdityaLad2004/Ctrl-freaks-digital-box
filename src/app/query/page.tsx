// Frontend: pages/query.js
'use client'
import React, { useState } from 'react';
import ReplyForm from '../../components/ReplyForm';

function QueryPage() {
    const [reply, setReply] = useState('');

    const handleSubmitReply = async (reply: any) => {
        // Submit reply to the backend and store it in the database
        try {
            const response = await fetch('/api/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reply }),
            });
            if (response.ok) {
                // Handle successful reply submission
                console.log('Reply submitted successfully!');
                setReply('');
            } else {
                // Handle error
                console.error('Failed to submit reply');
            }
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };

    return (
        <div>
            <h1>What is credit card?</h1>
            <ReplyForm onSubmit={handleSubmitReply} />
        </div>
    );
}

export default QueryPage;
