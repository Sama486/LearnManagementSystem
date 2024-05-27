"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Combobox } from "@/components/ui/combobox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
    categoryId: z.string().min(1)
})

const CategoryForm = ({
    initialData,
    courseId,
    options
}) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData                  //maybe change to categoryId
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

    const selectedOption = options.find((option) => option.value === initialData.categoryId)

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course category
                <Button onClick={toggleEdit} variant="ghost">
                    {
                        isEditing ? (<>
                            Cancel
                        </>)
                            :
                            (<>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit category
                            </>)
                    }
                </Button>
            </div>
            {!isEditing ? (
                <p className={cn("text-sm mt-2", !initialData.categoryId && "text-slate-500 italic")}>
                    {selectedOption?.label||"No category"}
                </p>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                    <FormControl>
                                        {/* <Combobox
                                            options={options}
                                            {...field} 
                                        /> */}
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

export default CategoryForm