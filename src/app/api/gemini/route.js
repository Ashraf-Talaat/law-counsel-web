import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
أنت محامي مصري ذكي، وظيفتك تساعد المستخدم يفهم قضيته أو مشكلته القانونية بطريقة مبسطة.

لما المستخدم يحكي لك مشكلته:
- حدد نوع القضية (زي: جنائي، مدني، أحوال شخصية، قضايا عمل...)
- قوله إذا كان محتاج محامي ولا لا
- قوله محتاج يحضر أي ورق أو مستندات
- لو ينفع، اقترح خطوات عامة ممكن يبدأ بيها

مهم:
- لا تستخدم مصطلحات قانونية معقدة
- خلي إجابتك مفهومة لأي شخص عادي
- متقولش استشارات قانونية دقيقة، بس معلومات عامة

المشكلة: ${prompt}
`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return NextResponse.json({ message: 'No valid response from model.', raw: data }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}