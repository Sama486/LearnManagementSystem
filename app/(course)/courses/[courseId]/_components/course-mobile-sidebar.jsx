import { Menu } from "lucide-react"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { CourseSidebar } from "./course-sidebar"

export const CourseMobileSidebar = ({course, progressCount}) => {
  return (
    <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
            <Menu />
        </SheetTrigger>
        <SheetContent side="left" classname="p-0 bg-white">
            <CourseSidebar
                course={course}
                progressCount={progressCount}
            />
        </SheetContent>
    </Sheet>
  )
}
