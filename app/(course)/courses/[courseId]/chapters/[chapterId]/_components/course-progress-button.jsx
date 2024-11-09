"use client"

import { Button } from "@/components/ui/button"
import { useConfettiStore } from "@/hooks/use-confetti-store"
import axios from "axios"
import { CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export const CourseProgressButton = ({ chapterId, courseId, isCompleted, nextChapterId }) => {

    const router = useRouter()
    const confetti = useConfettiStore()
    const [isLoading, setIsLoading] = useState(false)
    
    const onClick = async () => {

        console.log(console.log(confetti)
        );
        

        try {
            setIsLoading(true)

            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {isCompleted: !isCompleted})

            if(!isCompleted && !nextChapterId) {
                confetti.open()
            }

            if(!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            }

            toast.success("Progress updated")
            router.refresh()
        } catch {
            toast.error("Something went wrong")
        }finally {
            setIsLoading(false)
        }
    }

    const Icon = isCompleted ? XCircle : CheckCircle
    return (
        <Button
            type="button"
            variant={isCompleted ? "outline" : "success"}
            className="w-full md:w-auto"
            onClick={onClick}
            disabled={isLoading}
        >
            {isCompleted ? "Not completed" : "Mark as complete"}
            <Icon className="h-4 w-4 ml-2" />
        </Button>
    )
}