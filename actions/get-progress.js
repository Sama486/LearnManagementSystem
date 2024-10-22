import { db } from '@/lib/db'

export const getProgress = async (userId, courseId) => {
    try {
        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId,
                isPublished: true
            },
            select: {
                id: true
            }
        })

        const publishedChapterIds = publishedChapters.map(chapter => chapter.id)

        const validCompletedChapters = await db.userProgress.count({
            where: {
                userId,
                chapterId: {
                    in: publishedChapterIds
                },
                isCompleted: true
            }
        })

        const progressPercantage = (validCompletedChapters / publishedChapterIds.length) * 100

        return progressPercantage
    } catch (error) {
        console.error("GET_PROGRESS", error)
        return 0
    }
}