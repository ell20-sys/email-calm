import dbConnect from "@/lib/mongodb"
import EmailDraft from "@/models/EmailDraft"

async function getEmailDrafts() {
  await dbConnect()
  const drafts = await EmailDraft.find({}).sort({ createdAt: -1 }).limit(10)
  return drafts.map((draft) => ({
    id: draft._id.toString(),
    originalText: draft.originalText,
    score: draft.score,
    suggestions: draft.suggestions,
    createdAt: draft.createdAt.toISOString(),
  }))
}

export default async function HistoryPage() {
  const drafts = await getEmailDrafts()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Email Analysis History</h1>
      {drafts.map((draft) => (
        <div key={draft.id} className="mb-6 p-4 border border-gray-300 rounded">
          <p className="text-sm text-gray-500 mb-2">Analyzed on: {new Date(draft.createdAt).toLocaleString()}</p>
          <p className="mb-2">Sentiment Score: {draft.score}</p>
          <h3 className="text-lg font-bold mb-2">Suggestions:</h3>
          <ul className="list-disc pl-5 mb-2">
            {draft.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
          <h3 className="text-lg font-bold mb-2">Original Text:</h3>
          <p>{draft.originalText}</p>
        </div>
      ))}
    </div>
  )
}

