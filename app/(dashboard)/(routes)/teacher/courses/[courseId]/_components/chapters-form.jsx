"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Loader2, PlusCircle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ChaptersList } from "./chapters-list"

const formSchema = z.object({
    title: z.string().min(1)
})

const ChaptersForm = ({
    initialData,
    courseId
}) => {
    const [isCreating, setIsCreating] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const toggleCreating = () => setIsCreating((current) => !current)

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    });

    // const { isSubmitting, isValid } = form.formState;
    const formState = form?.formState || {};
    const { isSubmitting, isValid } = formState;

    async function onSubmit(values) {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values)
            toast.success("Chapter updated")
            toggleCreating()
            router.refresh()
        } catch {
            toast.error("Something went wrong")
        }
    }

    const onReorder = async (upDatedData ) => {
        try {
            setIsUpdating(true)
            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {list: upDatedData})
            toast.success("Chapters reordered")
            router.refresh()
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsUpdating(false)
        }
    }

    const onEdit = async (id) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`)
    }

    return (
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
            {isUpdating && (
             <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
                 <Loader2 className="animate-spin h-6 w-6 text-sky-700"/>
             </div>
            )}
            <div className="font-medium flex items-center justify-between">
                Course chapters
                <Button onClick={toggleCreating} variant="ghost">
                    {
                        isCreating ? (<>
                            Cancel
                        </>)
                            :
                            (<>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add a chapter
                            </>)
                    }
                </Button>
            </div>
            {isCreating && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="description">Courses</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="e.g. 'Indroduction to your course'" {...field} />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />

                        <Button disabled={!isValid || isSubmitting} type="submit">Create</Button>

                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.chapters?.length && "text-slate-500 italic"
                )}>
                    {!initialData.chapters?.length && "No chapters"}
                    <ChaptersList
                        onEdit={onEdit}
                        onReorder={onReorder}
                        items={initialData.chapters || []}

                    />
                </div>)}
            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4">
                    Drag and drop to reorder the chapters
                </p>
            )}
        </div>
    );
}

export default ChaptersForm