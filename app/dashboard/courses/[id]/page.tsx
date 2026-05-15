import CourseLayout from '@/components/dashboard/CourseLayout'
import { listAllFiles } from '@/lib/listAllFiles'
import courses from '@/lib/mock-canvas-data.json'

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const course = courses.find((course) => course.id === id)
    if (!course) {
        return (<p>Course does not exist</p>)
    }
    const allFiles = await listAllFiles('mock', course.course_code, course.course_code)

    return (
        <>
            <CourseLayout files={allFiles} courseName={course.name} />
        </>
    )
}