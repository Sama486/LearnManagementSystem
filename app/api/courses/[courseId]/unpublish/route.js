import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req, { params }) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            },
        })

        if (!course) {
            return new NextResponse("Not Found", { status: 404 });
        }


       const unPublishedCourse = await db.course.update({
           where: {
               id: params.courseId
           },
           data: {
               isPublished: false
           }
       })

         return NextResponse.json(unPublishedCourse);
    } catch (error) {
        console.log("[CHAPTER_ID_UNPUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}