import { CourseCard } from "@/components/dashboard/CourseCard"
import courses from '../../lib/mock-canvas-data.json'
 
export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <CourseCard course={course} key={course.id} />
            ))}
        </div>
    )        
}