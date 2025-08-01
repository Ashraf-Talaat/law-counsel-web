"use client";
import { useState } from "react";

export function AskGemini() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.reply || "لا يوجد رد.");
    } catch (err) {
      setResponse("حدث خطأ أثناء الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border p-2 rounded"
          rows={4}
          placeholder="اكتب مشكلتك القانونية..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "جاري المعالجة..." : "اسأل"}
        </button>
      </form>

     {response && (
  <div className="mt-6 p-4 bg-gray-100 rounded space-y-3 text-gray-800 leading-relaxed">
    {response.split("\n\n").map((block, idx) => (
      <div key={idx} className="space-y-1">
        {block.split("\n").map((line, i) => {
          const trimmed = line.trim();

          if (!trimmed) return null;

          // عناوين تبدأ بـ **
          if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
            return (
              <p key={i} className="font-bold text-blue-900">
                {trimmed.replace(/\*\*/g, "")}
              </p>
            );
          }

          // عناصر قائمة تبدأ بـ *
          if (trimmed.startsWith("*")) {
            return (
              <p key={i} className="ml-4 before:content-['•'] before:mr-2">
                {trimmed.replace(/^\*\s*/, "")}
              </p>
            );
          }

          // باقي النص
          return <p key={i}>{trimmed}</p>;
        })}
      </div>
    ))}
  </div>
)}

    </div>
  );
}
