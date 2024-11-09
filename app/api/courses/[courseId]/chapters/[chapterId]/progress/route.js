import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"

export async function PUT( req, { params }) {
    try {
        const { userId } = auth()
        const { isCompleted } = await req.json()

        if(!userId) {
            return new NextResponse("Unauthorized",{ status: 401 })
        }

        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId: params.chapterId
                }
            },
            update: {
                isCompleted
            },
            create: {
                userId,
                chapterId: params.chapterId,
                isCompleted
            }
        })

        return NextResponse.json(userProgress)
        
    } catch (error) {
        console.log("[CHAPTER_ID_PROGRESS]", error)
        return new NextResponse({ status: 500 })
    }
}