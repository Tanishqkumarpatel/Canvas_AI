'use client'
import { useState } from "react"
import React from "react"
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
        <div className={`flex items-center gap-2 px-3 py-1.5 mx-2 rounded-lg cursor-pointer text-sm transition-all
            ${isSelected(file) ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
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
                className="accent-blue-600 shrink-0"
            />
            <FileList name={file.name} url={file.url} />
        </div>
    )

    return (
        <div className="flex flex-col h-full">

            {/* Sidebar Header */}
            <div className="px-4 py-4 border-b border-gray-100">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">Course Materials</p>
                {selectedFiles.length > 0 && (
                    <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-gray-400">{selectedFiles.length} selected</p>
                        <button
                            className="text-xs text-blue-500 hover:text-blue-700"
                            onClick={() => onFileSelect([])}
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {/* File Tree */}
            <div className="flex-1 overflow-y-auto py-3">

                {/* Root files */}
                {grouped['root'] && (
                    <div className="mb-2">
                        {grouped['root'].map(file => <FileItem key={file.name} file={file} />)}
                    </div>
                )}

                {/* Folders */}
                {Object.entries(grouped)
                    .filter(([name]) => name !== 'root')
                    .map(([folderName, folderFiles]) => (
                        <div key={folderName} className="mb-1">
                            <button
                                className="flex items-center gap-2 w-full px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
                                onClick={() => setOpenFolders({ ...openFolders, [folderName]: !openFolders[folderName] })}
                            >
                                <span>{openFolders[folderName] ? '▾' : '▸'}</span>
                                {folderName}
                                <span className="ml-auto font-normal normal-case">{folderFiles.length}</span>
                            </button>

                            {openFolders[folderName] && (
                                <div className="flex flex-col gap-0.5">
                                    {folderFiles.map(file => <FileItem key={file.name} file={file} />)}
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}