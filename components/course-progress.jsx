import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export const CourseProgress = ({ value, variant, size }) => {

    const colorByVariant = {
        success: 'text-sky-700',
        warning: 'text-emerald-700',
    }

    const sizeByVariant = {
        success: 'text-sm',
        warning: 'text-xs',
    }

    

    return (
        <div>
            <Progress
                className="h-2"
                value={value}
                variant={variant}
            />
            <p className={cn(
                "font-medium mt-2 text-sky-700",
                colorByVariant[variant || 'default'],
                sizeByVariant[size || 'default'],
            )}>
                {Math.round(value)}% Complete
            </p>
        </div>
    )
}