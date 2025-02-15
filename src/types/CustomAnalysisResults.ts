export interface CustomAnalysisResult {
  originalText: string;
  score: number;
  comparative: number;
  wordCount: number;
  suggestions: string[];
  details: {
    positiveWords: string[];
    negativeWords: string[];
    allWords: string[];
  };
}