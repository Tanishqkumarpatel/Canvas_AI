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
      <div className="group relative flex flex-col h-full bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150 group-hover:bg-blue-100/50" />

        <div className="relative z-10 flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              {course.course_code}
            </span>
            <div className={`inline-flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight
              ${isActive 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                : 'bg-slate-50 text-slate-500 border border-slate-100'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
              {course.enrollment_status}
            </div>
          </div>

          <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 flex-1">
          <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
            {course.name}
          </h3>
        </div>

        <div className="relative z-10 mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-400">
            {course.term}
          </p>
          <span className="text-[10px] font-bold text-blue-600/40 group-hover:text-blue-600 transition-colors uppercase tracking-widest">
            View Course
          </span>
        </div>
      </div>
    </Link>
  )
}