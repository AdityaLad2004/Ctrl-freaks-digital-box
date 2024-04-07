import { NextResponse } from "next/server";
import connect from "../../../../db";
import Complaint from "../../../models/Complaint";


export const GET = async (request) => {
    try {
        await connect();
        const posts = await Complaint.find();
        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new NextResponse("Error in fetching" + error, { status: 500 });
    }
}

