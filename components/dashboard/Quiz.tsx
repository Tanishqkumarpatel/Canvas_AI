'use client'
import { useState } from "react"

type QuizQuestion = {
    id: string, type: string, question: string,
    options?: string[], pairs?: { left: string, right: string }[],
    answer: string, explanation: string
}

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
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
