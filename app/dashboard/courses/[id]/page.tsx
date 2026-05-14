import * as path from 'path'
import * as fs from 'fs'
import courses from '@/lib/mock-canvas-data.json'
import FileList from '@/components/dashboard/FileList'

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const course = courses.find((course) => course.id === id)
    if (!course) {
        return (<p>Course does not exist</p>)
    }
    const lectures_path = path.join(process.cwd(), course.materials_path, 'lectures')
    const problems_path = path.join(process.cwd(), course.materials_path, 'problems')

    const lectures = fs.readdirSync(lectures_path)
    const problems = fs.readdirSync(problems_path)



    return (
        <div className='flex flex-col g-6'>
            <h1>Welcome to {course?.name}</h1>
            
            {lectures.map((lecture, index)=>(
                <FileList file={(lecture)} key={index} url={`${course.materials_path}/lectures`}/>
            ))}
            {problems.map((problem, index)=>(
                <FileList file={problem} key={index} url={`${course.materials_path}/problems`}/>
            ))}
            <p>ack.txt</p>

        </div>
    )
}