import { CourseCard } from "@/components/dashboard/CourseCard"
import courses from '../../lib/mock-canvas-data.json'
import { checkCanvasAccess } from '@/lib/actions'
 
export default async function Dashboard() {
    const hasCanvas = await checkCanvasAccess()
    if (hasCanvas) {
        return (
            <p>Coming SOON!!!</p>
        )
    } else {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                    <CourseCard course={course} key={course.id} />
                ))}
            </div>
        )     
    }   
}