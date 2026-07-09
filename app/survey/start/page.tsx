import { Suspense } from "react";
import StartSurveyContent from "./components/StartSurveyContent";

export default function StartSurveyPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-purple-700 text-xl font-bold">
            Loading survey...
          </div>
        </main>
      }
    >
      <StartSurveyContent />
    </Suspense>
  );
}
