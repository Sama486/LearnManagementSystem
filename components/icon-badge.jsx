// import { LucideIcon } from 'lucide-react'
import { cva } from "class-variance-authority"
import { cn } from '@/lib/utils'
import { LucideIcon } from "lucide-react"

const backgroundVariants = cva(
    "rounded-full flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-sky-100",
                success: "bg-emerald-100"
            },
            size: {
                default: "p-2",
                sm: "p-1"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
)

const iconVariants = cva(
    "",
    {
        variants: {
            variant: {
                default: "text-sky-700",
                success: "text-emerald-700"
            },
            size: {
                default: "h-8 w-8",
                sm: "h-4 w-4"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
)



export const IconBadge = ({
    icon: Icon,
    variant,
    size
}) => {
    return (
        <div className={cn(backgroundVariants({ variant, size }))}>
            <Icon className={cn(iconVariants({ variant, size }))} />
        </div>
    )
}

//  const IconVariantProps = VariantProps(iconVariants);

// type BackgroundVariantProps = VariantProps<typeof backgroundVariants>
// type IconVariantProps = VariantProps<typeof iconVariants>

// interface IconBadgeProps extends BackgroundVariantProps, IconVariantProps {
//     icon: LucideIcon
// }

