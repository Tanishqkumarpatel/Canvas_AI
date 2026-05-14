'use client'
import { useState } from "react"
import CourseSideBar from "./CourseSideBar"
import CourseChat from "./CourseChat"

type filesType = { name: string, folder: string, url: string }[]

export default function CourseLayout({ files, courseName }: { files: filesType, courseName: string }) {
    const [selectedFiles, setSelectedFiles] = useState<filesType>([])
    return (
        <div className="flex h-screen bg-white" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            <aside className="w-72 shrink-0 border-r border-gray-200 flex flex-col overflow-y-auto">
                <CourseSideBar files={files} selectedFiles={selectedFiles} onFileSelect={setSelectedFiles} />
            </aside>
            <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
                <CourseChat selectedFiles={selectedFiles} courseName={courseName} />
            </main>
        </div>
    )
}