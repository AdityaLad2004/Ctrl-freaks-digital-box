import Navbar from '@/components/Navbar';
import { notFound } from 'next/navigation';
import React from 'react';
import { HfInference } from '@huggingface/inference';


async function getData() {
    const res = await fetch('http://localhost:3000/api/post', { cache: "no-store" });
    if (!res.ok) return notFound();
    return res.json();
}


async function summarizeText(description: any) {
    try {
        const hf = new HfInference('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');
        const result: any = await hf.summarization({
            model: 'facebook/bart-large-cnn',
            inputs: description,
            parameters: {
                max_length: 100
            }
        });
        const summary = result?.summary_text;
        console.log('Summary:', summary);
        return summary;
    } catch (error) {
        console.error('Error summarizing text:', error);
        return '';
    }
}

async function getSentiment(text: any) {
    try {
        const hf = new HfInference('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');
        const result = await hf.textClassification({
            model: 'distilbert-base-uncased-finetuned-sst-2-english',
            inputs: text
        });
        let sentiment = result[0].label;
        if (sentiment === 'POSITIVE') {
            sentiment = 'Normal';
        } else if (sentiment === 'NEGATIVE') {
            sentiment = 'Urgent';
        }
        console.log('Sentiment:', sentiment);
        return sentiment;
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        return 'Unknown';
    }
}

async function getDepartment(description: any) {
    try {
        const hf = new HfInference('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');
        const result = await hf.zeroShotClassification({
            model: 'facebook/bart-large-mnli',
            inputs: [description],
            parameters: {
                candidate_labels: [

                    "Retail Banking Department",
                    "Loan Department",
                    "Credit Card Department",
                    "Investment Department",
                    "Operations Department",


                ]
            }
        });
        const department = result[0].labels[0];
        console.log('Department:', department);
        return department;
    } catch (error) {
        console.error('Error determining department:', error);
        return 'Unknown';
    }
}




async function ComplaintsPage() {
    const fetchedData = await getData();
    const summarizedData = await Promise.all(fetchedData.map(async (post: any) => {
        const summary = await summarizeText(post.description);
        const sentiment = await getSentiment(post.description);
        const department = await getDepartment(post.description);

        post.summary = summary;
        post.sentiment = sentiment;
        post.department = department;

        return post;
    }));

    return (
        <div>
            <Navbar />
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Title</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Description</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Summary</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Sentiment</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Department</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {summarizedData.map((post: any, index: number) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{post.title}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{post.description}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{post.summary}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{post.sentiment}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{post.department}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}>
                                <select>
                                    <option value="Complaint Received">Complaint Received</option>
                                    <option value="Work Initiated">Work Initiated</option>
                                    <option value="Resolved">Resolved</option>
                                </select>

                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <button>Update status</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ComplaintsPage;
