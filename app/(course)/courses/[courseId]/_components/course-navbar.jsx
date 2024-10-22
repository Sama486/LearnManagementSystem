import NavbarRoutes from '@/components/navbar-routes'
import { CourseMobileSidebar } from './course-mobile-sidebar'

export const CourseNavbar = ({ progressCount, course }) => {
    return(
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
        <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
        />
        <NavbarRoutes />
    </div>
    )
}