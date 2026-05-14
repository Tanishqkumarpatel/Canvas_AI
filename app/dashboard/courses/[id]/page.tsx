import courses from '@/lib/mock-canvas-data.json'
import FileList from '@/components/dashboard/FileList'
import { supabase } from '@/lib/supabase'

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const course = courses.find((course) => course.id === id)
    if (!course) {
        return (<p>Course does not exist</p>)
    }

    const { data: lectures } = await supabase.storage.from("mock").list(`${course.course_code}/lectures`)
    if (!lectures) console.log("lectures Not Found")
    const { data: problems } = await supabase.storage.from("mock").list(`${course.course_code}/problems`)
    if (!problems) console.log("problems Not found")

    return (
        <div className='flex flex-col g-6'>
            <h1>Welcome to {course?.name}</h1>
            
            {lectures?.map((lecture, index)=> (
                <FileList file={lecture.name} key={index} url={`${course.course_code}/lectures`} />
            ))}
            {problems?.map((problem, index)=>(
                <FileList file={problem.name} url={`${course.course_code}/problems`} key={index} />
            ))}
            
            <FileList file='ack.txt' url={course.course_code} />

        </div>
    )
}