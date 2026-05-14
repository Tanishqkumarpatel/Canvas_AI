import CourseLayout from '@/components/dashboard/CourseLayout'
import { listAllFiles } from '@/lib/listAllFiles'
import courses from '@/lib/mock-canvas-data.json'
// import { supabase } from '@/lib/supabase'

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const course = courses.find((course) => course.id === id)
    if (!course) {
        return (<p>Course does not exist</p>)
    }
    
    // const { data: folders } = await supabase.storage
    // .from("mock")
    // .list(course.course_code)


    // const files = await Promise.all(
    // folders?.map(async (folder) => {
    //     const { data } = await supabase.storage
    //     .from("mock")
    //     .list(`${course.course_code}/${folder.name}`)
    //     return data?.map(f => ({
    //     name: f.name,
    //     folder: folder.name,
    //     url: `${course.course_code}/${folder.name}/${f.name}`
    //     })) ?? []
    // }) ?? []
    // )

    // const allFiles = files.flat()
    const allFiles = await listAllFiles('mock', course.course_code, course.course_code)

    return (
        <>
            <CourseLayout files={allFiles} courseName={course.name} />
        </>
    )
}