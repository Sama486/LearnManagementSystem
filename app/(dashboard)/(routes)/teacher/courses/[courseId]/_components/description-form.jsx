"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required",
    })
})

const DescriptionForm = ({
    initialData,
    courseId
}) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    // const { isSubmitting, isValid } = form.formState;
    const formState = form?.formState || {};
    const { isSubmitting, isValid } = formState;

    async function onSubmit(values) {
        try {
            await axios.patch(`/api/courses/${courseId}`, values)
            toast.success("Course updated")
            toggleEdit()
            router.refresh()
        } catch {
            toast.error("Something went wrong")
        }
    }
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course description
                <Button onClick={toggleEdit} variant="ghost">
                    {
                        isEditing ? (<>
                            Cancel
                        </>)
                            :
                            (<>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit description
                            </>)
                    }
                </Button>
            </div>
            {!isEditing ? (
                <p className={cn("text-sm mt-2", !initialData.description && "text-slate-500 italic")}>
                    {initialData.description||"No description"}
                </p>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={isSubmitting} placeholder="e.g. 'This course is about...'" {...field} />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid||isSubmitting} type="submit">Save description</Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}

export default DescriptionForm