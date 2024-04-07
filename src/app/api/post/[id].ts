// pages/api/post/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';


const complaints = [
    { _id: '1', title: 'Complaint 1', description: 'Description of complaint 1' },
    { _id: '2', title: 'Complaint 2', description: 'Description of complaint 2' },

];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
    } = req;

    const complaint = complaints.find((c) => c._id === id);

    if (!complaint) {
        res.status(404).json({ error: 'Complaint not found' });
        return;
    }

    res.status(200).json(complaint);
}
