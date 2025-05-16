import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaComments, FaTimes } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const Chatbot = ({ isOpenExternal, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [fullResponse, setFullResponse] = useState(''); // full text from API
  const [displayedResponse, setDisplayedResponse] = useState(''); // gradually typed text
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const typewriterTimeout = useRef(null);

  // Sync with external open state if provided
  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  // Typewriter effect: gradually display fullResponse text
  useEffect(() => {
    if (!fullResponse) {
      setDisplayedResponse('');
      return;
    }

    let i = 0;
    setDisplayedResponse('');

    function type() {
      if (i < fullResponse.length) {
        setDisplayedResponse((prev) => prev + fullResponse.charAt(i));
        i++;
        typewriterTimeout.current = setTimeout(type, 20); // typing speed in ms
      }
    }
    type();

    return () => clearTimeout(typewriterTimeout.current);
  }, [fullResponse]);

  // Speak text-to-speech when fullResponse changes
  useEffect(() => {
    if (!fullResponse) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(fullResponse);
    utterance.lang = 'hi-IN'; // Set language, adjust as needed
    utterance.rate = 1; // speed of speech (0.1 to 10)
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [fullResponse]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setFullResponse('');
    setDisplayedResponse('');

    try {
      const result = await axios.post(
        'https://green-heart-chatbot.vercel.app/api/explain',
        {
          text: query,
          language: 'Hindi',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (result.data && typeof result.data === 'object' && 'explanation' in result.data) {
        setFullResponse(result.data.explanation);
      } else {
        setFullResponse(JSON.stringify(result.data));
      }
    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error('Chatbot error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onOpenChange) {
      onOpenChange(newState);
    }
  };

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
          <div className="bg-gradient-to-b from-teal-400 to-teal-700 text-white p-3">
            <h2 className="text-lg font-semibold">GreenHeart AI Assistant</h2>
          </div>

          <div className="max-h-96 overflow-y-auto p-4">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {displayedResponse && (
              <div className="bg-gray-50 text-black p-3 rounded-md mb-4 whitespace-pre-wrap break-words">
                <ReactMarkdown>{displayedResponse}</ReactMarkdown>
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
                className="bg-teal-600 text-white px-3 py-2 rounded-md hover:bg-teal-700 disabled:bg-teal-300 text-sm"
              >
                {loading ? '...' : 'Ask'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
