import mongoose from "mongoose"

const EmailDraftSchema = new mongoose.Schema({
  original: String,
  score: Number,
  suggestions: [String],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.EmailDraft || mongoose.model("EmailDraft", EmailDraftSchema)

