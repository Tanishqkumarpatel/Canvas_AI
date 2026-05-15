'use client'
import { useState } from "react"
import CourseSideBar from "./CourseSideBar"
import CourseChat from "./CourseChat"

type filesType = { name: string, folder: string, url: string }[]

export default function CourseLayout({ files, courseName }: { files: filesType, courseName: string }) {
    const [selectedFiles, setSelectedFiles] = useState<filesType>([])
    
    return (
        <div className="flex h-[calc(100vh-56px)] bg-slate-50">
            <aside className="w-80 shrink-0 border-r border-blue-100 bg-white flex flex-col overflow-y-auto shadow-sm z-10">
                <CourseSideBar files={files} selectedFiles={selectedFiles} onFileSelect={setSelectedFiles} />
            </aside>
            <main className="flex-1 min-w-0 flex flex-col overflow-hidden relative">
                <CourseChat selectedFiles={selectedFiles} courseName={courseName} />
            </main>
        </div>
    )
}