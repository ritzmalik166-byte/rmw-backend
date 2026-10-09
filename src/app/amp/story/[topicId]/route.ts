import { NextResponse } from "next/server";
import WebStoryModel from "@/models/WebStory.Schema";
import TopicModel from "@/models/Story.Topic";
import { connectMongoDB } from "@/lib/mongo/dbConntect";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { topicId: string } }
) {
  await connectMongoDB();
  const topic = await TopicModel.findOne({ slug: params.topicId });
  const pages = await WebStoryModel.find({ topic: topic?._id });

  if (!pages || pages.length === 0) {
    return new NextResponse("No pages found", { status: 404 });
  }

  // Required Image Paths
  const publisherLogo =
    "https://ritzmediaworld.com/rmw-logo-sm-size.png"; // Must be 96x96 square
  const posterPortrait =
    `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images/${pages[0].img.split("images")[1]}`; 

  const canonicalUrl = `https://ritzmediaworld.com/amp/story/${params.topicId}`;

  const ampHtml = `
    <!doctype html>
    <html ⚡ lang="en">
      <head>
        <meta charset="utf-8">
        <title>${pages[0].title}</title>
        <link rel="canonical" title="Canonical URL" href="${canonicalUrl}">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <meta name="description" content="${pages[0].metaDescription}">
        <meta name="keywords" content="${pages[0].metaKeyWords}">
        
        <!-- AMP Scripts -->
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
        <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>

        <!-- AMP Boilerplate -->
        <style amp-boilerplate>
          body {
            -webkit-animation: -amp-start 8s steps(1,end) 0s 1 normal both;
            -moz-animation: -amp-start 8s steps(1,end) 0s 1 normal both;
            -ms-animation: -amp-start 8s steps(1,end) 0s 1 normal both;
            animation: -amp-start 8s steps(1,end) 0s 1 normal both;
          }
          @-webkit-keyframes -amp-start { from { visibility: hidden } to { visibility: visible } }
          @-moz-keyframes -amp-start { from { visibility: hidden } to { visibility: visible } }
          @-ms-keyframes -amp-start { from { visibility: hidden } to { visibility: visible } }
          @-o-keyframes -amp-start { from { visibility: hidden } to { visibility: visible } }
          @keyframes -amp-start { from { visibility: hidden } to { visibility: visible } }
        </style>
        <noscript>
          <style amp-boilerplate>
            body { -webkit-animation: none; -moz-animation: none; -ms-animation: none; animation: none }
          </style>
        </noscript>

        <!-- Custom AMP Styles -->
        <style amp-custom>
          amp-story {
            font-family: 'Poppins', sans-serif;
            color: white;
          }
          .content-bottom {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
          }
          .text-wrapper {
            background: rgba(0, 0, 0, 0.6);
            padding: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(4px);
            width: 100%;
          }
          .story-title {
            font-family: 'Playfair Display', serif;
            font-size: 1rem;
            font-weight: 700;
            margin: 0 0 10px;
            color: #fff;
          }
          .story-desc {
            font-family: 'Roboto', sans-serif;
            margin: 0 0 12px;
            color: #ddd;
          }
          .btn {
            padding: 10px 20px;
            border-radius: 24px;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
            margin-top: 10px;
            font-size: 0.8rem;
            background-color: #DEA953;
            color: #0F163F;
            text-transform: uppercase;
          }
          @media (max-width: 480px) {
            .story-title { font-size: 1.3rem; }
            .story-desc { font-size: 0.95rem; }
            .btn { padding: 8px 16px; font-size: 0.9rem; }
          }
        </style>

        <!-- Fonts -->
        <link title="Playfair Display and Roboto" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">

        <!-- ✅ Structured Data for Web Story -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${canonicalUrl}"
          },
          "headline": "${pages[0].title}",
          "datePublished": "${pages[0].createdAt}",
          "dateModified": "${pages[0].updatedAt || pages[0].createdAt}",
          "author": {
            "@type": "Person",
            "name": "Ritz Media"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Ritz Media World",
            "logo": {
              "@type": "ImageObject",
              "url": "${publisherLogo}"
            }
          },
          "image": [
            "${posterPortrait}"
          ],
          "description": "${pages[0].metaDescription}"
        }
        </script>
      </head>
      <body>
        <amp-story
          standalone
          title="${pages[0].title}"
          publisher="Ritz Media World"
          publisher-logo-src="${publisherLogo}"
          poster-portrait-src="${posterPortrait}"
          auto-advance-after="5s"
        >
          ${pages
            .map((page, index) => {
              const fullImgPath = `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images/${page.img.split("images")[1]}`;
              const titleTag = index === 0 ? "h1" : "h2";
              return `
                <amp-story-page id="page-${index}" auto-advance-after="5s">
                  <amp-story-grid-layer template="fill">
                    <amp-img src="${fullImgPath}" width="720" height="1280" layout="responsive" alt="${page.title}"></amp-img>
                  </amp-story-grid-layer>
                  <amp-story-grid-layer template="fill">
                    <div class="content-bottom">
                      <div class="text-wrapper">
                        <${titleTag} class="story-title">${page.title}</${titleTag}>
                        <p class="story-desc">${page.description}</p>
                        ${
                          page.buttonCTA?.btnTxt
                            ? `<a href="${page.buttonCTA.btnLink}" class="btn">${page.buttonCTA.btnTxt}</a>`
                            : ""
                        }
                      </div>
                    </div>
                  </amp-story-grid-layer>
                </amp-story-page>
              `;
            })
            .join("")}
        </amp-story>
      </body>
    </html>
  `;

  return new NextResponse(ampHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}