import { CourseCard } from '@/components/course-card'

export const CoursesList = ({ items }) => {
    return (
        <div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {items.map((item) => (
                    <CourseCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        chaptersLength={item.chapters.length}
                        price={item.price}
                        progress={item.progress}
                        category={item.category?.name}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No courses found
                </div>
            )}
        </div>
    )
}

