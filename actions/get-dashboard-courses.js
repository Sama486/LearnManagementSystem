import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";


export const getDashboardCourses = async  (userId) => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
                where: {
                    isPublished: true
                }
            }
          }
        },
      },
    });

    const courses = purchasedCourses.map((purchase) => purchase.course)

    for (let course of courses){
        const progress = await getProgress(userId, course.id)
        course["progress"] = progress
    }

    const completedCourses = courses.filter((course) => course.progress === 100);
    const coursesInProgress = courses.filter((course) => course.progress !== 100);

    return {
        completedCourses,
        coursesInProgress
    }

  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
        completedCourses: [],
        courseInProgress: [],
    }
  }
}