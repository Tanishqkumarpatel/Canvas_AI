import Link from 'next/link'

export function CourseCard({ course }: {
  course: {
    id: string
    name: string
    course_code: string
    term: string
    enrollment_status: string
  }
}) {
  const isActive = course.enrollment_status === 'active'

  return (
    <Link href={`/dashboard/courses/${course.id}`}>
      <div className="flex flex-col gap-3 p-6 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
        
        <div className="flex justify-between items-start">
          <span className="text-lg font-bold text-blue-600">{course.course_code}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {course.enrollment_status}
          </span>
        </div>

        <p className="font-medium">{course.name}</p>

        <p className="text-sm text-gray-500">{course.term}</p>

      </div>
    </Link>
  )
}