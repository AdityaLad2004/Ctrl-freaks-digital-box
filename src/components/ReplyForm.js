// Frontend: components/ReplyForm.js

import React, { useState } from 'react';

function ReplyForm({ onSubmit }) {
    const [reply, setReply] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(reply);
        setReply('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write your reply..."
                rows={4}
                cols={50}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default ReplyForm;
