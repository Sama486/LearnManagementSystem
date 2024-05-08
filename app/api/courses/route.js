import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//create an endpoint to fetch all courses
export async function GET(){
    try{
        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const courses = await db.course.findMany({
            where: {
                userId
            }
        })

        return NextResponse.json(courses)

    }catch{
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500})
    }
}

export async function POST(req){
    try{
        const {userId} = auth()
        const {title} = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const course = await db.course.create({
            data: {
                userId,
                title
            }
        })

        return NextResponse.json(course)

    }catch{
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500})
    }
}