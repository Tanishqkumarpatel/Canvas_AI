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
            <div className="flex flex-col gap-6">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                    <p className="text-sm text-blue-700 font-medium text-center">
                        Viewing Demo Material. Submit your Canvas URL and Token in 
                        <span className="font-bold"> Settings</span> to view your actual courses.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <CourseCard course={course} key={course.id} />
                    ))}
                </div>
            </div>
        )     
    }   
}