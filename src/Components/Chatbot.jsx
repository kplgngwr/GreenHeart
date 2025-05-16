import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaComments, FaTimes } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
const Chatbot = ({ isOpenExternal, onOpenChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Sync with external open state if provided
    useEffect(() => {
        if (isOpenExternal !== undefined) {
            setIsOpen(isOpenExternal)
        }
    }, [isOpenExternal])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!query.trim()) return

        setLoading(true)
        setError(null)

        // In the handleSubmit function, update how you set the response:
        try {
            const result = await axios.post('https://green-heart-chatbot.vercel.app/api/explain', {
                text: query,
                language: 'English'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // Check if result.data is an object with explanation key
            if (result.data && typeof result.data === 'object' && 'explanation' in result.data) {
                setResponse(result.data.explanation)
            } else {
                // Fallback if response format is different
                setResponse(JSON.stringify(result.data))
            }
        } catch (err) {
            setError('Failed to get response. Please try again.')
            console.error('Chatbot error:', err)
        } finally {
            setLoading(false)
        }
    }

    const toggleChat = () => {
        const newState = !isOpen
        setIsOpen(newState)
        // Notify parent component if callback provided
        if (onOpenChange) {
            onOpenChange(newState)
        }
    }

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {/* Chat toggle button */}
            <button
                onClick={toggleChat}
                className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all"
            >
                {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
            </button>

            {/* Chat modal */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden transition-all">
                    <div className="bg-green-600 text-white p-3">
                        <h2 className="text-lg font-semibold">GreenHeart Assistant</h2>
                    </div>

                    <div className="max-h-96 overflow-y-auto p-4">
                        {error && <div className="text-red-500 mb-4">{error}</div>}

                        {response && (
                            <div className="bg-gray-50 text-black p-3 rounded-md mb-4">
                                <ReactMarkdown>{response}</ReactMarkdown>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="p-3 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ask about sustainable farming..."
                                className="flex-1 p-2 border text-black rounded-md text-sm"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 disabled:bg-green-300 text-sm"
                            >
                                {loading ? '...' : 'Ask'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Chatbot