// Backend: pages/api/reply.js

import connect from '../../../../db'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { db } = await connect();
            const { reply } = req.body;

            // Store the reply in the database
            await db.collection('replies').insertOne({ text: reply });

            res.status(201).json({ message: 'Reply submitted successfully' });
        } catch (error) {
            console.error('Error submitting reply:', error);
            res.status(500).json({ message: 'Failed to submit reply' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
