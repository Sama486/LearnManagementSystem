"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    })
})

const TitleForm = ({
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
                Course title
                <Button onClick={toggleEdit} variant="ghost">
                    {
                        isEditing ? (<>
                            Cancel
                        </>)
                            :
                            (<>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit title
                            </>)
                    }
                </Button>
            </div>
            {!isEditing ? (
                <div className="mt-2">
                    {initialData.title}
                </div>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="e.g." {...field} />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid||isSubmitting} type="submit">Save title</Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}

export default TitleForm