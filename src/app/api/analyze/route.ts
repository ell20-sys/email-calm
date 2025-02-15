import { NextResponse } from "next/server";
import Sentiment from "sentiment";
// import dbConnect from "@/lib/mongodb"
// import EmailDraft from "@/models/EmailDraft"

export async function POST(request: Request) {
  try {
    const { emailText } = await request.json();
    if (!emailText || typeof emailText !== "string") {
      return NextResponse.json(
        { error: "Invalid email text provided." },
        { status: 400 }
      );
    }

    const sentiment = new Sentiment();
    const result = sentiment.analyze(emailText);
    // console.log("Sentiment analysis result:", result);

    const suggestions = [];
    const wordCount = emailText.trim().split(/\s+/).length;

    if (result.comparative < -0.05) {
      suggestions.push(
        "Your email has a negative tone. Consider rephrasing to sound more constructive."
      );
    } else if (result.comparative > 0.05) {
      suggestions.push(
        "Your email is quite positive. Ensure it remains professional and aligned with your intent."
      );
    } else {
      suggestions.push(
        "Your email tone appears neutral. Adding clear, engaging language might enhance its impact."
      );
    }

    // checking if the email is too long
    if (wordCount > 200) {
      suggestions.push(
        "Your email is quite long. Consider summarizing key points for clarity."
      );
    }

    // checking if negative words outweigh positive ones
    if (result.negative.length > result.positive.length) {
      suggestions.push(
        "There are more negative words than positive ones. Consider softening harsh phrases."
      );
    }

    // checking for excessive punctuation (e.g. exclamation marks)
    const exclamationCount = (emailText.match(/!/g) || []).length;
    if (exclamationCount > 3) {
      suggestions.push(
        "Your email contains many exclamation marks. Consider using them sparingly to maintain a calm tone."
      );
    }

    // checking for excessive all-caps words (i think the user may feel like they are being shouted at)
    const allCapsWords = emailText.match(/\b[A-Z]{2,}\b/g) || [];
    if (allCapsWords.length > 2) {
      suggestions.push(
        "Try to avoid using too many all-caps words; they can come off as shouting."
      );
    }

    // checking for urgent keywords and advise moderation
    const urgentKeywords = ["ASAP", "urgent", "immediately"];
    const foundUrgent = urgentKeywords.filter((keyword) =>
      new RegExp(`\\b${keyword}\\b`, "i").test(emailText)
    );
    if (foundUrgent.length > 0) {
      suggestions.push(
        "You've used urgent language. Ensure such terms are necessary and not overused."
      );
    }

    // checking for professional structure (greeting and sign-off)
    const hasGreeting = /^(hi|dear)\s+/i.test(emailText);
    const hasSignOff = /(regards|sincerely|best)\s*$/i.test(emailText.trim());
    if (!hasGreeting) {
      suggestions.push(
        "Consider adding a professional greeting at the start of your email."
      );
    }
    if (!hasSignOff) {
      suggestions.push(
        "Consider including a courteous sign-off to round off your email."
      );
    }

    const analysisResult = {
      originalText: emailText,
      score: result.score,
      comparative: result.comparative,
      wordCount,
      suggestions,
      details: {
        positiveWords: result.positive,
        negativeWords: result.negative,
        allWords: result.words,
      },
    };

    // Optionally save to MongoDB (code commented out)
    // try {
    //   await dbConnect();
    //   await EmailDraft.create(analysisResult);
    // } catch (error) {
    //   console.error("Failed to save email draft:", error);
    // }

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Error during sentiment analysis:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
