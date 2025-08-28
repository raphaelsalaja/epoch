#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// Keywords that indicate motivational/inspirational content
const MOTIVATIONAL_KEYWORDS = [
  // Core motivation terms
  "motivation",
  "motivational",
  "inspire",
  "inspiration",
  "inspirational",
  "encouraging",
  "uplifting",
  "empowering",
  "empowerment",

  // Success & achievement
  "success",
  "successful",
  "achieve",
  "achievement",
  "accomplish",
  "goal",
  "goals",
  "dream",
  "dreams",
  "vision",
  "purpose",
  "ambition",
  "determination",

  // Mindset & growth
  "mindset",
  "growth",
  "potential",
  "possibility",
  "opportunity",
  "believe",
  "confidence",
  "self-improvement",
  "personal-growth",
  "self-development",

  // Positive attitudes
  "positive",
  "optimism",
  "optimistic",
  "hope",
  "hopeful",
  "faith",
  "strength",
  "courage",
  "brave",
  "fearless",
  "resilience",
  "perseverance",

  // Life philosophy
  "wisdom",
  "truth",
  "enlightenment",
  "self-realization",
  "authentic-living",
  "meaningful",
  "purpose-driven",
  "intentional",
  "mindful",

  // Action & change
  "action",
  "change",
  "transform",
  "overcome",
  "breakthrough",
  "progress",
  "journey",
  "path",
  "adventure",
  "challenge",
];

// Negative keywords to exclude (even if they contain motivational words)
const EXCLUDE_KEYWORDS = [
  "death",
  "suicide",
  "depression",
  "anxiety",
  "fear",
  "hate",
  "anger",
  "revenge",
  "violence",
  "war",
  "kill",
  "murder",
  "destroy",
  "cruel",
  "pain",
  "suffering",
  "grief",
  "sorrow",
  "despair",
  "hopeless",
  "broken-heart",
  "heartbreak",
  "breakup",
  "divorce",
  "betrayal",
];

function isMotivational(quote, author, categories) {
  const text = `${quote} ${author} ${categories}`.toLowerCase();

  // Check for exclude keywords first
  const hasNegativeContent = EXCLUDE_KEYWORDS.some((keyword) =>
    text.includes(keyword.toLowerCase()),
  );

  if (hasNegativeContent) {
    return false;
  }

  // Check for motivational keywords
  const hasMotivationalContent = MOTIVATIONAL_KEYWORDS.some((keyword) =>
    text.includes(keyword.toLowerCase()),
  );

  return hasMotivationalContent;
}

function scoreQuote(quote, author, categories) {
  const text = `${quote} ${author} ${categories}`.toLowerCase();
  let score = 0;

  // Count motivational keyword matches
  MOTIVATIONAL_KEYWORDS.forEach((keyword) => {
    const matches = (text.match(new RegExp(keyword.toLowerCase(), "g")) || [])
      .length;
    score += matches;
  });

  // Bonus for shorter, more impactful quotes
  if (quote.length < 200) score += 2;
  if (quote.length < 100) score += 1;

  // Bonus for well-known authors
  const famousAuthors = [
    "einstein",
    "gandhi",
    "lincoln",
    "roosevelt",
    "mandela",
    "jobs",
    "disney",
    "ford",
    "edison",
    "churchill",
    "teresa",
    "king",
    "curie",
    "angelou",
  ];

  if (famousAuthors.some((name) => author.toLowerCase().includes(name))) {
    score += 3;
  }

  return score;
}

async function curateQuotes() {
  const csvPath = path.join(
    __dirname,
    "../apps/waitlist/lib/quotes/quotes.csv",
  );
  const outputPath = path.join(
    __dirname,
    "../apps/waitlist/lib/quotes/curated-quotes.json",
  );

  console.log("🔍 Parsing CSV file...");

  const quotes = [];
  let totalQuotes = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        totalQuotes++;

        const quote = row.quote || "";
        const author = row.author || "";
        const category = row.category || "";

        if (isMotivational(quote, author, category)) {
          const score = scoreQuote(quote, author, category);
          quotes.push({
            quote: quote.trim(),
            author: author.trim(),
            categories: category
              .split(",")
              .map((c) => c.trim())
              .filter(Boolean),
            score,
          });
        }

        // Progress indicator
        if (totalQuotes % 10000 === 0) {
          console.log(
            `📊 Processed ${totalQuotes} quotes, found ${quotes.length} motivational ones`,
          );
        }
      })
      .on("end", () => {
        console.log(`✅ Finished processing ${totalQuotes} total quotes`);
        console.log(`🎯 Found ${quotes.length} motivational quotes`);

        // Sort by score (highest first) and take top 100
        const topQuotes = quotes
          .sort((a, b) => b.score - a.score)
          .slice(0, 100)
          .map(({ score, ...quote }) => quote); // Remove score from final output

        console.log("🏆 Top 10 quotes by score:");
        quotes.slice(0, 10).forEach((q, i) => {
          console.log(
            `${i + 1}. [Score: ${q.score}] "${q.quote.substring(0, 60)}..." - ${q.author}`,
          );
        });

        // Write to JSON file
        fs.writeFileSync(outputPath, JSON.stringify(topQuotes, null, 2));
        console.log(`💾 Saved top 100 motivational quotes to: ${outputPath}`);

        resolve(topQuotes);
      })
      .on("error", reject);
  });
}

// Run the script
if (require.main === module) {
  curateQuotes()
    .then(() => {
      console.log("🎉 Quote curation completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Error curating quotes:", error);
      process.exit(1);
    });
}

module.exports = { curateQuotes };
