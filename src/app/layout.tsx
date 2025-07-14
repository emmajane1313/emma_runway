import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Web3 Fashion Runway - Emma-Jane MacKinnon-Lee",
  description:
    "F3M++ collections in motion, with Bush TV for those down under.",
  metadataBase: new URL("https://emmajanemackinnonlee-runway.com/"),
  twitter: {
    card: "summary_large_image",
    creator: "@emmajane1313",
    title: "Web3 Fashion Runway - Emma-Jane MacKinnon-Lee",
    description:
      "F3M++ collections in motion, with Bush TV for those down under.",
  },
  openGraph: {
    title: "Web3 Fashion Runway - Emma-Jane MacKinnon-Lee",
    description:
      "F3M++ collections in motion, with Bush TV for those down under.",
  },
  robots: {
    googleBot: {
      index: true,
      follow: true,
    },
  },
  creator: "Emma-Jane MacKinnon-Lee",
  publisher: "Emma-Jane MacKinnon-Lee",
  keywords: [
    "Web3",
    "Web3 Fashion",
    "Moda Web3",
    "Open Source",
    "CC0",
    "Emma-Jane MacKinnon-Lee",
    "Open Source LLMs",
    "DIGITALAX",
    "F3Manifesto",
    "digitalax",
    "f3manifesto",
    "syntheticfutures",
    "Women",
    "Life",
    "Freedom",
  ],
  pinterest: {
    richPin: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="selection:bg-violet-500">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://emmajanemackinnonlee.com/#person",
              name: "Emma-Jane MacKinnon-Lee",
              url: "https://emmajanemackinnonlee.com/",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://emmajanemackinnonlee.com/",
              },
              sameAs: [
                "https://emmajanemackinnonlee.com/",
                "https://emmajanemackinnon.com/",
                "https://janefuture.com/",
                "https://emmajanemackinnonlee.xyz/",
                "https://emmajanemackinnonlee.net/",
                "https://emmajanemackinnonlee.ai/",
                "https://emmajanemackinnonlee.org/",
                "https://emmajanemackinnonlee-f3manifesto.com/",
                "https://emmajanemackinnonlee-digitalax.com/",
                "https://emmajanemackinnonlee-runway.com/",
                "https://icoinedweb3fashion.com/",
                "https://syntheticfutures.xyz/",
                "https://web3fashion.xyz/",
                "https://emancipa.xyz/",
                "https://highlangu.com/",
                "https://digitalax.xyz/",
                "https://cc0web3fashion.com/",
                "https://cc0web3.com/",
                "https://cuntism.net/",
                "https://dhawu.com/",
                "https://casadeespejos.com/",
                "https://emancipa.net/",
                "https://dhawu.emancipa.xyz/",
                "https://highlangu.emancipa.xyz/",
                "https://twitter.com/emmajane1313",
                "https://medium.com/@casadeespejos",
                "https://www.flickr.com/photos/emmajanemackinnonlee/",
              ],
            }),
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
