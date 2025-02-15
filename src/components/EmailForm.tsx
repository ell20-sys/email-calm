"use client"

import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import StepLoader from "@/components/step-loader/step-loader";
import { CustomAnalysisResult } from "@/types/CustomAnalysisResults";

export default function EmailForm() {
  const [emailText, setEmailText] = useState("");
  const [analysis, setAnalysis] = useState<CustomAnalysisResult>();
  const [loading, setLoading] = useState(false);
  const analysisRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnalysis(undefined);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailText }),
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error("Error analyzing email:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (analysisRef.current && analysis) {
      analysisRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [analysis]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-6">
        <Textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          className="text-white bg-gray-700 border-gray-600"
          rows={10}
          placeholder="Paste your email draft here..."
        />
        <Button type="submit" className="mt-2 mx-auto" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </Button>
      </form>

      {loading && (
        <div className="flex justify-center my-4" ref={analysisRef}>
          <StepLoader />
        </div>
      )}

      {analysis && !loading && (
        <div ref={analysisRef} className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Analysis Results</h2>
          <div className="mb-4">
            <p className="text-lg">
              <span className="font-semibold">Sentiment Score:</span> {analysis.score}
            </p>
            {analysis.comparative !== undefined && (
              <p className="text-lg">
                <span className="font-semibold">Comparative:</span> {analysis.comparative}
              </p>
            )}
            {analysis.wordCount && (
              <p className="text-lg">
                <span className="font-semibold">Word Count:</span> {analysis.wordCount}
              </p>
            )}
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Suggestions:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {analysis.suggestions?.map((suggestion: string, index: number) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Original Text:</h3>
            <p className="whitespace-pre-wrap">{analysis.originalText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
