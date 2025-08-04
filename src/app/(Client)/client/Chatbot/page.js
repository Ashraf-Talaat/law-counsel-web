import { AskGemini } from "@/_components/test";

export default function Page() {
  return (
    <main className="min-h-screen  p-8 bg-[#eee]">
      <div className="">
        <h1 className="text-2xl font-bold mb-4"> محاميك الذكي</h1>
        <AskGemini />
      </div>
    </main>
  );
}
