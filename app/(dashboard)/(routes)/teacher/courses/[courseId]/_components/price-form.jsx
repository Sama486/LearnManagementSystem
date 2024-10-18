"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form, FormControl, Formprice, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/format.ts"

const formSchema = z.object({
    price: z.coerce.number()
})

const PriceForm = ({
    initialData,
    courseId
}) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialData              //maybe change to price
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
                Course price
                <Button onClick={toggleEdit} variant="ghost">
                    {
                        isEditing ? (<>
                            Cancel
                        </>)
                            :
                            (<>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit price
                            </>)
                    }
                </Button>
            </div>
            {!isEditing ? (
                <p className={cn("text-sm mt-2", !initialData.price && "text-slate-500 italic")}>
                    {initialData.price ? formatPrice(initialData.price) : "No price"}
                </p>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="price">price</FormLabel>
                                    <FormControl>
                                        <Input type="number" step="0.01" disabled={isSubmitting} placeholder="Set a price'" {...field} />
                                    </FormControl>
                                    <FormMessage {...field} />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid||isSubmitting} type="submit">Save price</Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}

export default PriceForm