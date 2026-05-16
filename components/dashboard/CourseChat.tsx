'use client'
import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import FlashCard from "./FlashCard"
import Quiz from "./Quiz"
import { ChatOut, ChatIn } from "./Chat"

type filesType = { 
    name: string, 
    folder: string, 
    url: string 
}[]

type Flashcard = { 
    question: string, 
    answer: string 
}

type QuizQuestion = {
    id: string, 
    type: string, 
    question: string,
    options?: string[], 
    pairs?: { 
        left: string, 
        right: string 
    }[],
    answer: string, 
    explanation: string
}

type Message = { 
    role: 'user' |'model',
    content: string
}

export default function CourseChat({ selectedFiles, courseName }: { selectedFiles: filesType, courseName: string }) {
    const [activeTool, setActiveTool] = useState('')
    const [output, setOutput] = useState<unknown>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [userInput, setUserInput] = useState('')

    const callApi = async (tool: string, endpoint: string) => {
        setMessages([])
        setActiveTool(tool)
        setIsLoading(true)
        setOutput(null)
        if (tool === 'Chat') return
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ files: selectedFiles })
            })
            const data = await res.json()
            setOutput(tool === 'Summary' ? data.summary : data)
        } catch (error) {
            console.error("AI Error:", error)
        }
        setIsLoading(false)
    }

    const sendMessage = async ()=> {
        if (!userInput.trim()) return

        const newMessage:Message = { role:'user', content:userInput }
        const updatedMessages = [...messages, newMessage]
        setMessages(updatedMessages)
        setUserInput('')
        setIsLoading(true)

        const res = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                files: selectedFiles,
                messages: updatedMessages,
                userMessage: userInput
             })
        })
        const data = await res.json()
        setMessages([...updatedMessages, { role:'model', content: data.message }])
        setIsLoading(false)
    }

    const tools = [
        { label: 'Flashcards', tool: 'Flashcard', endpoint: '/api/ai/flashcard', icon: '🃏' },
        { label: 'Practice Quiz', tool: 'Quiz', endpoint: '/api/ai/quiz', icon: '📝' },
        { label: 'Deep Summary', tool: 'Summary', endpoint: '/api/ai/summary', icon: '📄' },
        { label: 'Ask AI', tool: 'Chat', endpoint: '/api/ai/chat', icon: '💬' }
    ]

    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
            <header className="px-8 py-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">{courseName}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`w-2 h-2 rounded-full ${selectedFiles.length > 0 ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'}`} />
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                            {selectedFiles.length > 0 ? `${selectedFiles.length} Selected Files` : 'No context provided'}
                        </p>
                    </div>
                </div>
            </header>

            {selectedFiles.length > 0 && (
                <div className="px-8 py-3 bg-white border-b border-slate-100 flex gap-4 shrink-0 shadow-sm z-10 overflow-x-auto no-scrollbar">
                    {tools.map(({ label, tool, endpoint, icon }) => (
                        <button
                            key={tool}
                            className={`flex items-center gap-2 px-6 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300
                                ${activeTool === tool
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105'
                                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'}`}
                            onClick={() => callApi(tool, endpoint)}
                        >
                            <span>{icon}</span>
                            {label}
                        </button>
                    ))}
                </div>
            )}

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {!selectedFiles.length && activeTool !== "Chat" ? (
                    <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center text-4xl mb-8 border border-slate-50 rotate-3">📂</div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Build your study context</h2>
                        <p className="text-slate-500 max-w-xs leading-relaxed">Choose specific materials from the sidebar to generate AI-powered study aids.</p>
                    </div>
                ) : !activeTool ? (
                    <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-20 h-20 rounded-3xl bg-blue-600 shadow-xl shadow-blue-200 flex items-center justify-center text-3xl mb-10 -rotate-2">✨</div>
                        <h2 className="text-2xl font-black text-slate-900 mb-8">Choose a Learning Tool</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                            {tools.map(({ label, tool, endpoint, icon }) => (
                                <button
                                    key={tool}
                                    className="flex flex-col items-center gap-4 p-8 bg-white rounded-[2rem] border border-slate-100 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50 transition-all group"
                                    onClick={() => callApi(tool, endpoint)}
                                >
                                    <span className="text-4xl p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">{icon}</span>
                                    <span className="font-bold text-slate-700 group-hover:text-blue-600">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : isLoading && activeTool!== 'Chat' ? (
                    <div className="h-full flex flex-col items-center justify-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-100 rounded-full" />
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0" />
                        </div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Processing Context...</p>
                    </div>
                ) : activeTool === 'Chat' ? (
                    <div className="p-8">
                        {<ChatOut messages={messages} isLoading={isLoading} />}
                    </div>
                ) : output ? (
                    <div className="p-8">
                        {activeTool === 'Summary' && (
                            <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-12 shadow-sm border border-slate-100 prose prose-slate prose-headings:text-slate-900 prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed">
                                <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-8">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold">∑</div>
                                    <h2 className="m-0! text-3xl font-black tracking-tight text-slate-900">Knowledge Summary</h2>
                                </div>
                                <ReactMarkdown>{output as string}</ReactMarkdown>
                            </div>
                        )}
                        {activeTool === 'Flashcard' && <FlashCard cards={output as Flashcard[]} />}
                        {activeTool === 'Quiz' && <Quiz questions={output as QuizQuestion[]} />}
                    </div>
                ) : null}
            </div>
            {activeTool === 'Chat' && (<ChatIn userInput={userInput} setUserInput={setUserInput} sendMessage={sendMessage} isLoading={isLoading} />)}
        </div>
    )
}