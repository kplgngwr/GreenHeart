import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from '@google/generative-ai';

const languages = [
    { value: 'hi-IN', label: 'हिंदी (Hindi)' },
    { value: 'en-US', label: 'English' },
    { value: 'gu-IN', label: 'Gujarati' },
    { value: 'te-IN', label: 'తెలుగు (Telugu)' },
    { value: 'ta-IN', label: 'தமிழ் (Tamil)' },
    { value: 'mr-IN', label: 'Marathi' },
    { value: 'bn-IN', label: 'Bengali' },
    { value: 'kn-IN', label: 'Kannada' },
    { value: 'ml-IN', label: 'Malayalam' },
];

// Initialize Gemini API (replace YOUR_API_KEY with your actual key)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY");

// Map language code to prefix label keys used in getPromptPrefix
const languageCodeToLabel = languages.reduce((acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
}, {});

function getPromptPrefix(languageLabel) {
    const prefixes = {
        'English': 'You are Green Heart, a female farming assistant who helps farmers with agricultural advice and information. You specialize in sustainable farming practices, crop management, weather adaptation, and rural development. For crop recommendations, you analyze soil data, climate conditions, market trends, and use advanced techniques like NDVI patterns to predict yields.',
        'हिंदी (Hindi)': 'आप ग्रीन हार्ट हैं, एक महिला कृषि सहायक जो किसानों को कृषि सलाह और जानकारी के साथ मदद करती हैं। आप टिकाऊ खेती प्रथाओं, फसल प्रबंधन, मौसम अनुकूलन और ग्रामीण विकास में विशेषज्ञ हैं। फसल सिफारिशों के लिए, आप मिट्टी के डेटा, जलवायु स्थितियों, बाजार रुझानों का विश्लेषण करती हैं, और उपज की भविष्यवाणी करने के लिए NDVI पैटर्न जैसी उन्नत तकनीकों का उपयोग करती हैं।',
        'తెలుగు (Telugu)': 'మీరు గ్రీన్ హార్ట్, రైతులకు వ్యవసాయ సలహా మరియు సమాచారంతో సహాయపడే మహిళా వ్యవసాయ సహాయకురాలు. మీరు సుస్థిర వ్యవసాయ పద్ధతులు, పంట నిర్వహణ, వాతావరణ అనుసరణ మరియు గ్రామీణ అభివృద్ధిలో నిపుణులు. పంట సిఫార్సుల కోసం, మీరు నేల డేటా, వాతావరణ పరిస్థితులు, మార్కెట్ ధోరణులను విశ్లేషిస్తారు మరియు దిగుబడిని అంచనా వేయడానికి NDVI నమూనాల వంటి అధునాతన పద్ధతులను ఉపయోగిస్తారు.',
        'தமிழ் (Tamil)': 'நீங்கள் கிரீன் ஹார்ட், விவசாயிகளுக்கு விவசாய ஆலோசனை மற்றும் தகவல்களுடன் உதவும் பெண் விவசாய உதவியாளர். நீங்கள் நிலையான விவசாய நடைமுறைகள், பயிர் மேலாண்மை, வானிலை தழுவல் மற்றும் ஊரக வளர்ச்சியில் நிபுணத்துவம் பெற்றவர். பயிர் பரிந்துரைகளுக்கு, நீங்கள் மண் தரவு, காலநிலை நிலைமைகள், சந்தை போக்குகளை பகுப்பாய்வு செய்கிறீர்கள், மற்றும் விளைச்சலை கணிக்க NDVI முறைகள் போன்ற மேம்பட்ட நுட்பங்களைப் பயன்படுத்துகிறீர்கள்.',
        'ਪੰਜਾਬੀ (Punjabi)': 'ਤੁਸੀਂ ਗ੍ਰੀਨ ਹਾਰਟ ਹੋ, ਇੱਕ ਔਰਤ ਖੇਤੀਬਾੜੀ ਸਹਾਇਕ ਜੋ ਕਿਸਾਨਾਂ ਨੂੰ ਖੇਤੀਬਾੜੀ ਸਲਾਹ ਅਤੇ ਜਾਣਕਾਰੀ ਨਾਲ ਮਦਦ ਕਰਦੀ ਹੈ। ਤੁਸੀਂ ਟਿਕਾਊ ਖੇਤੀਬਾੜੀ ਅਭਿਆਸਾਂ, ਫਸਲ ਪ੍ਰਬੰਧਨ, ਮੌਸਮ ਅਨੁਕੂਲਤਾ, ਅਤੇ ਪੇਂਡੂ ਵਿਕਾਸ ਵਿੱਚ ਮਾਹਰ ਹੋ। ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ ਲਈ, ਤੁਸੀਂ ਮਿੱਟੀ ਦੇ ਡਾਟਾ, ਜਲਵਾਯੂ ਸਥਿਤੀਆਂ, ਮਾਰਕੀਟ ਰੁਝਾਨਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਦੇ ਹੋ, ਅਤੇ ਉਪਜ ਦੀ ਭਵਿੱਖਬਾਣੀ ਕਰਨ ਲਈ NDVI ਪੈਟਰਨ ਵਰਗੀਆਂ ਉੱਨਤ ਤਕਨੀਕਾਂ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹੋ।',
        // Add more if needed
    };
    return prefixes[languageLabel] || prefixes['English'];
}

const Chatbot = ({ isOpenExternal, onOpenChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [fullResponse, setFullResponse] = useState('');
    const [displayedResponse, setDisplayedResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('hi-IN');
    const typewriterTimeout = useRef(null);

    // Sync external open state
    useEffect(() => {
        if (isOpenExternal !== undefined) {
            setIsOpen(isOpenExternal);
        }
    }, [isOpenExternal]);

    // Typewriter effect for displaying text
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
                typewriterTimeout.current = setTimeout(type, 20);
            }
        }
        type();
        return () => clearTimeout(typewriterTimeout.current);
    }, [fullResponse]);

    // Speak the full response when it updates or language changes
    useEffect(() => {
        if (!fullResponse) return;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(fullResponse);
        utterance.lang = language;
        utterance.rate = 1;

        window.speechSynthesis.speak(utterance);

        return () => window.speechSynthesis.cancel();
    }, [fullResponse, language]);

    // Cancel speech when chatbot is closed
    useEffect(() => {
        if (!isOpen) window.speechSynthesis.cancel();
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setFullResponse('');
        setDisplayedResponse('');

        try {
            const languageLabel = languageCodeToLabel[language] || 'English';
            const promptPrefix = getPromptPrefix(languageLabel);

            const prompt = `${promptPrefix}

User input: "${query}"

Important instructions:
1. If the input is related to farming, agriculture, crops, soil, weather, or rural development, provide a detailed and helpful explanation.
2. Explain any technical terms or concepts used in the input.
3. Focus on practical, actionable advice that farmers can implement.
4. If numbers are mentioned, explain the importance of those numbers (e.g., Nitrogen (N) 280 kg/ha).
5. Use simple language that is easy to understand.
6. Include specific examples where appropriate.
7. If technical terms are used, explain them clearly.
8. Do not start with phrases like "Here's an explanation" or "Let me explain" - start explaining directly.
9. Keep your response concise but informative.
10. For crop recommendations, provide detailed analysis like soil suitability, water requirements, market demand, and expected yield.
11. For specific crops like Soybean, explain suitability, soil compatibility, water requirements, market demand, yield predictions, and profit estimates.
12. For crop planning, explain why a crop was chosen, how yield predictions were calculated, and all relevant factors in the appropriate language.
13. For crop recommendations, explain in detail how NDVI patterns and district success rates are used to calculate yield estimates.

Respond in ${languageLabel} language.`;
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();

            setFullResponse(text);
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

        if (!newState) {
            window.speechSynthesis.cancel();
        }

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
                <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all">
                    <div className="flex gap-2 items-center bg-gradient-to-b from-teal-400 to-teal-700 text-white p-3">
                        <h2 className="text-lg font-semibold">GreenHeart AI Assistant</h2>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="flex-1 px-2 py-1 border text-black rounded-md text-sm"
                        >
                            {languages.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
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
