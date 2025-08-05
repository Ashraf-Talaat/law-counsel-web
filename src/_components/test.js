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
    
    <div className="flex flex-col max-w-4xl mx-auto p-4">
      
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">اسأل Law Consoule</h1>
        <p className="text-sm text-gray-500">
          اكتب سؤالك القانوني أو مشكلتك وسيقوم النظام بالرد عليك. السؤال والرد
          هيظهروا تحت في شكل شات.
        </p>
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 space-y-6">
          {history.length === 0 && !loading && (
            <div className="flex items-center justify-center text-gray-400">
              <p>ابدأ بكتابة سؤالك في الأسفل واضغط اسأل.</p>
            </div>
          )}

          {history.map((item, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-[#262b3e] text-white rounded-xl px-5 py-3 max-w-[80%] shadow">
                  <p className="text-sm leading-relaxed">{item.prompt}</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div
                  className={`rounded-xl px-5 py-4 max-w-[85%] shadow ${
                    item.error
                      ? "bg-red-50 border border-red-200 text-red-900"
                      : "bg-white border border-gray-200 text-gray-800"
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
              <div className="bg-[#262b3e] text-white rounded-xl px-5 py-3 max-w-[80%] shadow animate-pulse">
                <p className="text-sm leading-relaxed">جاري المعالجة...</p>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t px-4 py-3 flex items-start gap-3 bg-gray-50"
        >
          <div className="flex-1 relative">
            <label htmlFor="prompt" className="sr-only">
              اكتب سؤالك
            </label>
            <textarea
              id="prompt"
              className="w-full resize-none rounded-xl border border-gray-300 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#262b3e] h-20"
              placeholder="اكتب مشكلتك القانونية..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
              rows={2}
            />
            <div className="absolute top-2 right-2 text-xs text-gray-500">
              {prompt.length} حرف
            </div>
          </div>
          <button
            type="submit"
            className="flex-shrink-0 bg-[#262b3e] text-white px-5 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "جاري المعالجة..." : "اسأل"}
          </button>
        </form>
      </div>
    </div>
    
  );

}
