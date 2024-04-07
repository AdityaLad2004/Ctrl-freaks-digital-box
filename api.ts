import { notFound } from 'next/navigation';
import { HfInference } from '@huggingface/inference';

export async function getData() {
    const res = await fetch('http://localhost:3000/api/post', { cache: "no-store" });
    if (!res.ok) return notFound();
    return res.json();
}

export async function summarizeText(description: any) {
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

export async function getSentiment(text: any) {
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

export async function getDepartment(description: any) {
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
