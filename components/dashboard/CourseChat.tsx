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
        <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
            <div className="flex items-center gap-2">
                {cards.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all ${i === index ? 'w-6 bg-blue-600' : 'w-2 bg-gray-200'}`} />
                ))}
            </div>

            <div
                className="w-full max-w-2xl min-h-56 rounded-2xl flex flex-col items-center justify-center p-10 cursor-pointer transition-all select-none border border-gray-100 shadow-sm hover:shadow-md bg-white"
                onClick={() => setFlipped(!flipped)}
            >
                <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${flipped ? 'text-green-500' : 'text-blue-500'}`}>
                    {flipped ? 'Answer' : 'Question'}
                </p>
                <p className="text-gray-700 text-lg text-center leading-relaxed">
                    {flipped ? cards[index].answer : cards[index].question}
                </p>
                <p className="text-xs text-gray-300 mt-6">Click to flip</p>
            </div>

            <div className="flex items-center gap-4">
                <button
                    className="px-6 py-2 rounded-full border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-all"
                    onClick={() => { setIndex(index - 1); setFlipped(false) }}
                    disabled={index === 0}
                >← Previous</button>
                <span className="text-sm text-gray-400">{index + 1} / {cards.length}</span>
                <button
                    className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-30 transition-all"
                    onClick={() => { setIndex(index + 1); setFlipped(false) }}
                    disabled={index === cards.length - 1}
                >Next →</button>
            </div>
        </div>
    )
}

function QuizView({ questions }: { questions: QuizQuestion[] }) {
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [submitted, setSubmitted] = useState(false)

    const score = submitted
        ? questions.filter(q => answers[q.id]?.toLowerCase() === q.answer.toLowerCase()).length
        : 0

    return (
        <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full pb-8">
            {submitted && (
                <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white text-center shadow-md">
                    <p className="text-4xl font-bold">{score}<span className="text-blue-200 text-2xl"> / {questions.length}</span></p>
                    <p className="text-blue-100 text-sm mt-1">Score</p>
                </div>
            )}

            {questions.map((q, i) => (
                <div key={q.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold shrink-0">{i + 1}</span>
                        <span className="text-xs text-gray-400 capitalize">{q.type.replace('_', ' ')}</span>
                    </div>
                    <p className="text-gray-800 font-medium text-sm">{q.question}</p>

                    {q.type === 'multiple_choice' && q.options && (
                        <div className="flex flex-col gap-2">
                            {q.options.map(opt => (
                                <label key={opt} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border cursor-pointer text-sm transition-all
                                    ${submitted
                                        ? opt.toLowerCase() === q.answer.toLowerCase()
                                            ? 'bg-green-50 border-green-300 text-green-700'
                                            : answers[q.id] === opt
                                                ? 'bg-red-50 border-red-200 text-red-600'
                                                : 'opacity-40 border-gray-100'
                                        : answers[q.id] === opt
                                            ? 'bg-blue-50 border-blue-300 text-blue-700'
                                            : 'border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <input type="radio" name={q.id} value={opt} disabled={submitted}
                                        onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                                        className="accent-blue-600" />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    )}

                    {q.type === 'true_false' && (
                        <div className="flex gap-2">
                            {['true', 'false'].map(opt => (
                                <label key={opt} className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl border cursor-pointer text-sm capitalize transition-all
                                    ${submitted
                                        ? opt === q.answer.toLowerCase()
                                            ? 'bg-green-50 border-green-300 text-green-700'
                                            : answers[q.id] === opt
                                                ? 'bg-red-50 border-red-200'
                                                : 'opacity-40 border-gray-100'
                                        : answers[q.id] === opt
                                            ? 'bg-blue-50 border-blue-300 text-blue-700'
                                            : 'border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <input type="radio" name={q.id} value={opt} disabled={submitted}
                                        onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                                        className="accent-blue-600" />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    )}

                    {(q.type === 'short_answer' || q.type === 'problem_solving') && (
                        <textarea
                            className="border border-gray-200 rounded-xl p-3 text-sm w-full resize-none focus:outline-none focus:border-blue-400 transition-colors"
                            rows={3} disabled={submitted} placeholder="Type your answer..."
                            onChange={e => setAnswers({ ...answers, [q.id]: e.target.value })}
                        />
                    )}

                    {submitted && (
                        <div className="bg-blue-50 rounded-xl p-3 text-sm border-l-4 border-blue-500">
                            <p className="font-semibold text-blue-700 mb-1">✓ {q.answer}</p>
                            <p className="text-gray-500 text-xs">{q.explanation}</p>
                        </div>
                    )}
                </div>
            ))}

            {!submitted && (
                <button
                    className="bg-blue-600 text-white px-8 py-3 rounded-full text-sm self-center hover:bg-blue-700 transition-colors shadow-sm"
                    onClick={() => setSubmitted(true)}
                >
                    Submit Quiz
                </button>
            )}
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
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ files: selectedFiles })
        })
        const data = await res.json()
        setOutput(tool === 'Summary' ? data.summary : data)
        setIsLoading(false)
    }

    const tools = [
        { label: 'Flashcards', tool: 'Flashcard', endpoint: '/api/ai/flashcard', icon: '🃏' },
        { label: 'Quiz', tool: 'Quiz', endpoint: '/api/ai/quiz', icon: '📝' },
        { label: 'Summary', tool: 'Summary', endpoint: '/api/ai/summary', icon: '📄' },
    ]

    return (
        <div className="flex flex-col h-full">

            {/* Course Header */}
            <div className="px-8 py-4 border-b border-gray-100 bg-white">
                <h1 className="text-lg font-semibold text-gray-800">{courseName}</h1>
                <p className="text-xs text-gray-400 mt-0.5">
                    {selectedFiles.length > 0 ? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected` : 'Select files to get started'}
                </p>
            </div>

            {/* Tool Pills */}
            {selectedFiles.length > 0 && (
                <div className="px-8 py-3 border-b border-gray-100 bg-white flex gap-2">
                    {tools.map(({ label, tool, endpoint, icon }) => (
                        <button
                            key={tool}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all
                                ${activeTool === tool
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            onClick={() => callApi(tool, endpoint)}
                        >
                            <span>{icon}</span>
                            {label}
                        </button>
                    ))}
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">

                {selectedFiles.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">📂</div>
                        <div className="text-center">
                            <p className="text-gray-600 font-medium">Select files to begin</p>
                            <p className="text-gray-400 text-sm mt-1">Choose files from the sidebar to use AI study tools</p>
                        </div>
                    </div>

                ) : !activeTool ? (
                    <div className="h-full flex flex-col items-center justify-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">🧠</div>
                        <div className="text-center">
                            <p className="text-gray-600 font-medium">What would you like to do?</p>
                            <p className="text-gray-400 text-sm mt-1">{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} ready</p>
                        </div>
                        <div className="flex gap-3">
                            {tools.map(({ label, tool, endpoint, icon }) => (
                                <button
                                    key={tool}
                                    className="flex flex-col items-center gap-2 px-6 py-4 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-sm text-gray-600 hover:text-blue-600"
                                    onClick={() => callApi(tool, endpoint)}
                                >
                                    <span className="text-2xl">{icon}</span>
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                ) : isLoading ? (
                    <div className="h-full flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-400 text-sm">Generating {activeTool.toLowerCase()}...</p>
                    </div>

                ) : output ? (
                    <div className="p-8 h-full">
                        {activeTool === 'Summary' && (
                            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100 prose prose-sm prose-headings:text-gray-800 prose-p:text-gray-600">
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