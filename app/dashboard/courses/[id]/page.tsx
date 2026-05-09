import courses from '@/lib/mock-canvas-data.json'

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const course = courses.find((course) => course.id === id)
    return <p>Welcome to {course?.name}</p>
}