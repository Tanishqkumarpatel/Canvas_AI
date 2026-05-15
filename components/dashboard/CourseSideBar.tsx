'use client'
import { useState } from "react"
import FileList from "./FileList"

type filesType = { name: string, folder: string, url: string }[]

export default function CourseSideBar({ files, selectedFiles, onFileSelect }: {
    files: filesType, selectedFiles: filesType,
    onFileSelect: React.Dispatch<React.SetStateAction<filesType>>
}) {
    const grouped = files.reduce((acc, file) => {
        if (!acc[file.folder]) acc[file.folder] = []
        acc[file.folder].push(file)
        return acc
    }, {} as Record<string, filesType>)

    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(
        Object.keys(grouped).reduce((acc, folder) => {
            acc[folder] = true
            return acc
        }, {} as Record<string, boolean>)
    )

    const isSelected = (file: filesType[0]) => selectedFiles.some(f => f.url === file.url)

    const FileItem = ({ file }: { file: filesType[0] }) => (
        <div className={`group flex items-center gap-3 px-4 py-2 mx-2 rounded-lg cursor-pointer text-sm transition-all duration-200
            ${isSelected(file) ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'}`}
        >
            <input
                type="checkbox"
                checked={isSelected(file)}
                onChange={() => {
                    if (isSelected(file)) {
                        onFileSelect(selectedFiles.filter(f => f.url !== file.url))
                    } else {
                        onFileSelect([...selectedFiles, file])
                    }
                }}
                className={`w-4 h-4 rounded border-gray-300 transition-all ${isSelected(file) ? 'accent-white' : 'accent-blue-600'}`}
            />
            <span className="flex-1 truncate"><FileList name={file.name} url={file.url} /></span>
        </div>
    )

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="px-6 py-6 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Library</h2>
                <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium">{selectedFiles.length} files active</p>
                    {selectedFiles.length > 0 && (
                        <button
                            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                            onClick={() => onFileSelect([])}
                        >
                            Clear Selection
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                {/* Folders */}
                {Object.entries(grouped).map(([folderName, folderFiles]) => (
                    <div key={folderName} className="mb-4">
                        <button
                            className="flex items-center gap-2 w-full px-6 py-1 text-xs font-bold text-slate-400 uppercase tracking-tighter hover:text-blue-600 transition-colors"
                            onClick={() => setOpenFolders({ ...openFolders, [folderName]: !openFolders[folderName] })}
                        >
                            <span className="text-[10px] opacity-70">{openFolders[folderName] ? '▼' : '▶'}</span>
                            {folderName === 'root' ? 'General' : folderName}
                            <span className="ml-auto bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full text-[10px]">{folderFiles.length}</span>
                        </button>

                        {openFolders[folderName] && (
                            <div className="mt-1 space-y-0.5">
                                {folderFiles.map(file => <FileItem key={file.url} file={file} />)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}