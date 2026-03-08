const fs = require('fs');

const code = fs.readFileSync('app/match/[id]/page.tsx', 'utf8');

const shareBlock = `
          <div style={{ marginTop: "16px" }}>
            
              href={"https://wa.me/?text=" + encodeURIComponent((match.teams ? match.teams[0] : "") + " vs " + (match.teams ? match.teams[1] : "") + " - " + (match.status || "") + " - Live on CricScore: https://cricscore-xi.vercel.app/match/" + match.id)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", color: "#25d366", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", textDecoration: "none" }}
            >
              Share on WhatsApp
            </a>
          </div>`;

const target = `        {match.scorecard && match.scorecard.length > 0 && (`;

if (code.includes(target)) {
  const updated = code.replace(target, shareBlock + '\n\n' + target);
  fs.writeFileSync('app/match/[id]/page.tsx', updated, 'utf8');
  console.log('Share button added!');
} else {
  console.log('Target not found!');
}
