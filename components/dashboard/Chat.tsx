'use client'
import ReactMarkdown from 'react-markdown'
import * as React from 'react'
type Message = { 
    role: 'user' |'model',
    content: string
}

export function ChatOut({messages, isLoading} : {
    messages: Message[],
    isLoading: boolean
}) {
    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-4 pb-4">
            
            {messages.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                    <p className="text-4xl mb-3">💬</p>
                    <p className="font-medium">Ask anything about your selected materials</p>
                </div>
            )}

            {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed
                        ${msg.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-sm'
                            : 'bg-white border border-slate-100 text-slate-700 rounded-bl-sm shadow-sm'}`}
                    >
                        {msg.role === 'model'
                            ? <ReactMarkdown>{msg.content}</ReactMarkdown>
                            : msg.content
                        }
                    </div>
                </div>
            ))}

            {isLoading && messages.length !== 0 && (
                <div className="flex justify-start">
                    <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-5 py-3 shadow-sm">
                        <div className="flex gap-1 items-center h-5">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export function ChatIn({userInput, setUserInput, sendMessage, isLoading} : {
    userInput: string,
    setUserInput: React.Dispatch<React.SetStateAction<string>>,
    sendMessage: () => Promise<void>,
    isLoading: boolean
}) {
    return (
        <div className="px-8 py-4 bg-white border-t border-slate-100 shrink-0">
            <div className="max-w-3xl mx-auto flex gap-3">
                <input
                    className="flex-1 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    placeholder="Ask about your materials..."
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                />
                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-blue-700 disabled:opacity-40 transition-colors"
                    onClick={sendMessage}
                    disabled={isLoading || !userInput.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    )
}