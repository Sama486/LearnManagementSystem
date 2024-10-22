"use client"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { ConfirmModal } from "@/components/modals/confirm-modal"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useConfettiStore } from "@/hooks/use-confetti-store"

const Actions = ({ disabled, courseId, isPublished }) => {

    const router = useRouter()
    const confetti = useConfettiStore()
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(true)

            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`)
                toast.success("Course unpublished")
                confetti.close()
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`)
                toast.success("Course published")
                confetti.open()
            }

            router.refresh()
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)

            await axios.delete(`/api/courses/${courseId}`)

            toast.success("Course deleted")
            router.push(`/teacher/courses`)
            router.refresh()
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="flex items-canter gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button disabled={isLoading} size="sm">
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    )
}

export default Actions