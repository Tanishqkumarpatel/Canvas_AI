'use client'
import { useState } from "react"
import ReactMarkdown from 'react-markdown'

type filesType = { name: string, folder: string, url: string }[]
type Flashcard = { question: string, answer: string }
type QuizQuestion = {
    id: string, type: string, question: string,
    options?: string[], pairs?: { left: string, right: string }[],
    answer: string, explanation: string
}

function FlashcardView({ cards }: { cards: Flashcard[] }) {
    const [index, setIndex] = useState(0)
    const [flipped, setFlipped] = useState(false)

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 px-4 py-12">
            <div className="flex items-center gap-2 mb-4">
                {cards.map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'}`} 
                    />
                ))}
            </div>

            <div
                className="w-full max-w-xl min-h-[320px] relative transition-all duration-500 preserve-3d cursor-pointer group"
                onClick={() => setFlipped(!flipped)}
            >
                <div className={`absolute inset-0 bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center p-12 text-center transition-all duration-500 backface-hidden ${flipped ? 'rotate-y-180 opacity-0' : 'rotate-y-0 opacity-100'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-6 bg-blue-50 px-3 py-1 rounded-full">Question {index + 1}</span>
                    <p className="text-slate-800 text-xl font-medium leading-relaxed">{cards[index].question}</p>
                    <p className="text-slate-400 text-xs mt-8 group-hover:text-blue-400 transition-colors">Click card to reveal answer</p>
                </div>
                
                <div className={`absolute inset-0 bg-slate-900 rounded-3xl shadow-xl flex flex-col items-center justify-center p-12 text-center transition-all duration-500 backface-hidden ${flipped ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-6 bg-emerald-400/10 px-3 py-1 rounded-full">The Answer</span>
                    <p className="text-white text-xl font-medium leading-relaxed">{cards[index].answer}</p>
                    <p className="text-slate-400 text-xs mt-8">Click to return to question</p>
                </div>
            </div>

            <div className="flex items-center gap-6 mt-4">
                <button
                    className="p-3 rounded-full border border-slate-200 text-slate-500 hover:bg-white hover:text-blue-600 hover:border-blue-200 disabled:opacity-30 transition-all shadow-sm"
                    onClick={() => { setIndex(index - 1); setFlipped(false) }}
                    disabled={index === 0}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <span className="text-sm font-bold text-slate-500 bg-slate-100 px-4 py-1 rounded-full">{index + 1} of {cards.length}</span>
                <button
                    className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30 transition-all shadow-lg shadow-blue-100"
                    onClick={() => { setIndex(index + 1); setFlipped(false) }}
                    disabled={index === cards.length - 1}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
    )
}

function QuizView({ questions }: { questions: QuizQuestion[] }) {
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [showAnswers, setShowAnswers] = useState(false)

    return (
        <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full pb-20">
            <div className="rounded-3xl bg-white border border-blue-100 p-6 flex items-center justify-between shadow-sm">
                <div>
                    <h3 className="text-slate-900 font-bold text-lg">Practice Quiz</h3>
                    <p className="text-slate-500 text-xs">Test your knowledge. Reveal answers when you are ready to review.</p>
                </div>
                <button
                    onClick={() => setShowAnswers(!showAnswers)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${showAnswers ? 'bg-slate-100 text-slate-600' : 'bg-blue-600 text-white shadow-lg shadow-blue-100'}`}
                >
                    {showAnswers ? 'Hide Answers' : 'Show All Answers'}
                </button>
            </div>

            {questions.map((q, i) => (
                <div key={q.id} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 text-sm flex items-center justify-center font-bold">{i + 1}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">{q.type.replace('_', ' ')}</span>
                    </div>
                    
                    <p className="text-slate-800 font-semibold text-lg leading-snug">{q.question}</p>

                    {q.type === 'multiple_choice' && q.options && (
                        <div className="grid grid-cols-1 gap-3 mt-2">
                            {q.options.map(opt => {
                                const isCorrect = opt.toLowerCase() === q.answer.toLowerCase()
                                const isSelected = answers[q.id] === opt
                                
                                return (
                                    <label key={opt} className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 cursor-pointer transition-all
                                        ${showAnswers && isCorrect 
                                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                                            : isSelected 
                                                ? 'bg-blue-50 border-blue-600 text-blue-700 ring-4 ring-blue-50' 
                                                : 'border-slate-100 hover:border-blue-100 hover:bg-slate-50'}`}
                                    >
                                        <input type="radio" name={q.id} value={opt} 
                                            onChange={() => !showAnswers && setAnswers({ ...answers, [q.id]: opt })}
                                            className="w-4 h-4 accent-blue-600" />
                                        <span className="text-sm font-medium">{opt}</span>
                                        {showAnswers && isCorrect && <span className="ml-auto text-emerald-600 text-xs font-bold">Correct Answer</span>}
                                    </label>
                                )
                            })}
                        </div>
                    )}

                    {q.type === 'true_false' && (
                        <div className="flex gap-4 mt-2">
                            {['true', 'false'].map(opt => {
                                const isCorrect = opt === q.answer.toLowerCase()
                                const isSelected = answers[q.id] === opt

                                return (
                                    <label key={opt} className={`flex items-center justify-center gap-3 flex-1 py-4 rounded-2xl border-2 cursor-pointer transition-all
                                        ${showAnswers && isCorrect 
                                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                                            : isSelected 
                                                ? 'bg-blue-50 border-blue-600 text-blue-700 ring-4 ring-blue-50' 
                                                : 'border-slate-100 hover:border-blue-100 hover:bg-slate-50'}`}
                                    >
                                        <input type="radio" name={q.id} value={opt}
                                            onChange={() => !showAnswers && setAnswers({ ...answers, [q.id]: opt })}
                                            className="w-4 h-4 accent-blue-600" />
                                        <span className="text-sm font-bold capitalize">{opt}</span>
                                    </label>
                                )
                            })}
                        </div>
                    )}

                    {(q.type === 'short_answer' || q.type === 'problem_solving') && (
                        <textarea
                            className="border-2 border-slate-100 bg-slate-50 rounded-2xl p-5 text-sm w-full resize-none focus:outline-none focus:border-blue-400 focus:bg-white transition-all min-h-[120px]"
                            placeholder="Draft your answer..."
                            onChange={e => setAnswers({ ...answers, [q.id]: e.target.value })}
                        />
                    )}

                    {showAnswers && (
                        <div className="bg-slate-50 rounded-2xl p-6 border-l-4 border-blue-500 mt-2">
                            <p className="font-bold text-blue-700 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                                Explanation
                            </p>
                            <p className="text-slate-600 leading-relaxed italic text-sm">&quot;{q.explanation}&quot;</p>
                            {(q.type === 'short_answer' || q.type === 'problem_solving') && (
                                <p className="mt-3 text-slate-800 text-sm font-bold">Suggested Answer: <span className="font-normal">{q.answer}</span></p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default function CourseChat({ selectedFiles, courseName }: { selectedFiles: filesType, courseName: string }) {
    const [activeTool, setActiveTool] = useState('')
    const [output, setOutput] = useState<unknown>(null)
    const [isLoading, setIsLoading] = useState(false)

    const callApi = async (tool: string, endpoint: string) => {
        setActiveTool(tool)
        setIsLoading(true)
        setOutput(null)
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

    const tools = [
        { label: 'Flashcards', tool: 'Flashcard', endpoint: '/api/ai/flashcard', icon: '🃏' },
        { label: 'Practice Quiz', tool: 'Quiz', endpoint: '/api/ai/quiz', icon: '📝' },
        { label: 'Deep Summary', tool: 'Summary', endpoint: '/api/ai/summary', icon: '📄' },
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
                {!selectedFiles.length ? (
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
                ) : isLoading ? (
                    <div className="h-full flex flex-col items-center justify-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-100 rounded-full" />
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0" />
                        </div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Processing Context...</p>
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
                        {activeTool === 'Flashcard' && <FlashcardView cards={output as Flashcard[]} />}
                        {activeTool === 'Quiz' && <QuizView questions={output as QuizQuestion[]} />}
                    </div>
                ) : null}
            </div>
        </div>
    )
}