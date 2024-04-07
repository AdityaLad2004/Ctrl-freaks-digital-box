// app/api/contact/route.ts
import connect from "../../../../db";
import mongoose from "mongoose";
import EmployeeAdd from "../../../models/EmployeeAdd";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { name, _id } = await request.json()
        await connect()
        await EmployeeAdd.create({ name, _id })
        await mongoose.connection.close()
        return NextResponse.json({ message: "Employee added successfully " }, { status: 201 })
    } catch (err) {
        console.error(err)
        await mongoose.connection.close()
        return NextResponse.json({ message: "Failed adding employee" }, { status: 400 })
    }
}