import {db} from "@/lib/db"
// import {Course, Purchase} from "@/prisma/client"

const groupByCourse = (purchases) => {
    const grouped = {}

    purchases.forEach((purchase) => {
        const courseTitle = purchase.course.title
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0
        }

        grouped[courseTitle] += purchase.course.price
    })

    return grouped
}

export const getAnalytics = async (userId) => {
    try {
        const purchases = await db.purchase.findMany({
            where: {
                course: {
                    userId: userId
                }
            },
            include: {
                course: true
            }
        })

        const groupedEarnings = groupByCourse(purchases)
        const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
            name: courseTitle,
            total
        }))

        const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0)
        const totalSales = purchases.length
        


        return {
            data,
            totalRevenue,
            totalSales
        }
        
    } catch (error) {
        console.error("[GET_ANALYTICS]", error)
        return {
            data: [],
            totalRevenue: 0,
            totasSales: 0
        }
    }
}