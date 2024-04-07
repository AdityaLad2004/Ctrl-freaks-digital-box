import Navbar from '@/components/Navbar';
import { notFound } from 'next/navigation';
import React from 'react'

async function page() {

    async function getData() {
        const res = await fetch('http://localhost:3000/api/post', { cache: "no-store" });
        if (!res.ok) return notFound();
        return res.json();
    }


    const fetchedData = await getData();

    return (
        <div>


            <Navbar />
        </div>
    )
}

export default page