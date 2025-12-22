import cheerio from "cheerio";

export function parseResults(html) {
  const $ = cheerio.load(html);
  const results = [];

  $("tr").each((_, row) => {
    const text = $(row).text();
    if (text.includes("Civil Engg.") && text.includes("View")) {
      results.push({
        department: "Civil Engg.",
        year: "Second Year"
      });
    }
  });

  return results;
}
