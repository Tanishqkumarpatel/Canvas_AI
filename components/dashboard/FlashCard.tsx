'use client'
import { useState } from "react"
type Flashcard = { question: string, answer: string }

export default function FlashCard({ cards }: { cards: Flashcard[] }) {
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
