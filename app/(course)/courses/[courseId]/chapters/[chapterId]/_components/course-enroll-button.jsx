"use client"

import { Button } from "@/components/ui/button"
import {formatPrice} from "@/lib/format"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export const CourseEnrollButton = ({ courseId, price }) => {

    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(true)

            const response = await axios.post(`/api/courses/${courseId}/checkout`)

            window.location.assign(response.data.url)
        } catch (error) {
            toast.error("Failed to enroll")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Button onClick={onClick} disabled={isLoading} size="sm" className="w-full md:w-auto">
            Enroll for ${formatPrice(price)}
        </Button>
    )
}