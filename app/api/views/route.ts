import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const res = await fetch('https://api.visitorbadge.io/api/visitors?path=kaveeth555.portfolio', {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache',
                'Accept-Language': 'en-US,en;q=0.9',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
            }
        });

        if (!res.ok) {
            console.error("View API returned status:", res.status);
            return NextResponse.json({ count: "---" }, { status: res.status });
        }

        const svgText = await res.text();

        // The visitor badge SVG usually has the label and the count as <text> elements
        // The last <text> element with numbers/letters is the count.
        const matches = [...svgText.matchAll(/<text[^>]*>([^<]+)<\/text>/g)];

        let count = "---";
        if (matches && matches.length > 0) {
            // The last element is definitely the count
            count = matches[matches.length - 1][1];
        }

        return NextResponse.json({ count });
    } catch (error) {
        console.error("Error fetching view count:", error);
        return NextResponse.json({ count: "---" }, { status: 500 });
    }
}
