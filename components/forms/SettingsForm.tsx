'use client'
import { saveSettings } from "@/lib/actions"

// import { useState } from "react"
export default function SettingsForm() {
    // const [canvasToken, setCanvasToken] = useState('')
    // const [canvasUrl, setCanvasUrl] = useState('')

    return ( 
    <div className="max-w-lg mx-auto mt-10 p-6">       
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>
        <form className="flex flex-col gap-6" action={saveSettings} >

            <div className="flex flex-col gap-2">
                <label className="font-medium">Canvas URL</label>
                <p className="text-sm text-gray-500">Your University Canvas URL e.g. https://canvas.ubc.ca</p> 
                <input
                    className="border rounded p-2 w-full"
                    type="url"
                    placeholder="https://canvas.university.ca"
                    name="canvas_url"
                    required
                    // value={canvasUrl}
                    // onChange={(e) => setCanvasUrl(e.target.value)}
                /> 
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-medium">Canvas API Token</label>
                <p className="text-sm text-gray-500">Generate this from Canvas ➡️ Account ➡️ Settings ➡️ New Access Token</p>
                <input
                    className="border rounded p-2 w-full"
                    type="password"
                    placeholder="Your Canvas API Token"
                    name="canvas_token"
                    required
                    // value={canvasToken}
                    // onChange={(e) => setCanvasToken(e.target.value)}
                />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                Save Settings
            </button>

        </form>
    </div>
    )
}