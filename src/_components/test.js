"use client";
import { useState, useRef, useEffect } from "react";
import MainNav from "./layout/navbar/mainNav";

export function AskGemini() {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const initialSkip = useRef(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed) return;

    const userQuestion = trimmed;
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userQuestion }),
      });

      const data = await res.json();
      const reply = data.reply || "لا يوجد رد.";

      setHistory((h) => [
        ...h,
        { prompt: userQuestion, response: reply, error: false },
      ]);
    } catch (err) {
      setHistory((h) => [
        ...h,
        {
          prompt: userQuestion,
          response: "حدث خطأ أثناء الاتصال بالخادم.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialSkip.current) {
      initialSkip.current = false;
      return;
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [history]);

  const renderResponse = (text) => {
    const cleaned = text.replace(/\*\*/g, "");
    const paragraphs = cleaned.split("\n\n");

    return paragraphs.map((para, pi) => {
      const lines = para
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      const isListBlock = lines.every((l) => l.startsWith("*"));

      if (isListBlock) {
        return (
          <ul
            key={pi}
            className="list-disc list-inside mb-3 space-y-1 text-sm leading-relaxed"
          >
            {lines.map((l, li) => (
              <li key={li}>{l.replace(/^\*\s*/, "")}</li>
            ))}
          </ul>
        );
      }

      return (
        
       
        <>
        
        <div key={pi} className="mb-3 space-y-2">
          
          {lines.map((line, li) => {
            // إذا السطر هو عنوان (قصير ومش جملة كاملة)
            if (line.length <= 40 && !line.startsWith("*")) {
              return (
                <p
                  key={li}
                  className="font-bold text-[#1f2d50] text-sm"
                >
                  {line}
                </p>
              );
            }
            return (
              <p key={li} className="text-sm leading-relaxed">
                {line.replace(/^\*\s*/, "")}
              </p>
            );
          })}
        </div>
        </>
      );
    });
  };

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col max-w-5xl mx-auto p-6">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#262b3e] to-[#687693] bg-clip-text text-transparent mb-3">
            اسأل Law Console
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            اكتب سؤالك القانوني أو مشكلتك وسيقوم النظام بالرد عليك. السؤال والرد
            هيظهروا تحت في شكل شات.
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          
          {/* Messages Area */}
          <div className="flex-1 p-8 space-y-6 min-h-[500px] max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {history.length === 0 && !loading && (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#687693]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-lg">ابدأ بكتابة سؤالك في الأسفل واضغط اسأل</p>
                </div>
              </div>
            )}

            {history.map((item, idx) => (
              <div key={idx} className="space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-[#262b3e] to-[#687693] text-white rounded-2xl rounded-tr-md px-6 py-4 max-w-[80%] shadow-lg">
                    <p className="text-sm leading-relaxed">{item.prompt}</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div
                    className={`rounded-2xl rounded-tl-md px-6 py-5 max-w-[85%] shadow-lg ${
                      item.error
                        ? "bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-900"
                        : "bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 text-gray-800"
                    }`}
                  >
                    {item.response
                      .split("\n\n")
                      .map((block, bi) => (
                        <div key={bi}>{renderResponse(block)}</div>
                      ))}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-[#262b3e] to-[#687693] text-white rounded-2xl rounded-tr-md px-6 py-4 max-w-[80%] shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <p className="text-sm leading-relaxed mr-3">جاري المعالجة...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex items-end gap-4">
                <div className="flex-1 relative">
                  <label htmlFor="prompt" className="sr-only">
                    اكتب سؤالك
                  </label>
                  <div className="relative">
                    <textarea
                      id="prompt"
                      className="w-full resize-none rounded-2xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm p-4 pr-12 focus:outline-none focus:border-[#262b3e] focus:ring-1 focus:ring-[#262b3e] transition-all duration-200 shadow-sm hover:shadow-md min-h-[60px] max-h-[120px] placeholder-gray-400"
                      placeholder="اكتب مشكلتك القانونية هنا..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      disabled={loading}
                      rows={2}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                    />
                    <div className="absolute top-3 right-3 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                      {prompt.length}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex-shrink-0 bg-gradient-to-r from-[#262b3e] to-[#262b3e] hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                  disabled={loading || !prompt.trim()}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري المعالجة...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      اسأل
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                اضغط Enter للإرسال أو Shift+Enter لسطر جديد
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  );

}
