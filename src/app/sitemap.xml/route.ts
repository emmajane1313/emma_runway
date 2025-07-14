import { NextResponse } from "next/server";
import { INFURA_GATEWAY_INTERNAL } from "../lib/constantes";
import { getCollections } from "../../../graphql/queries/getCollections";

const locales = ["en", "es", "ar", "pt"];

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://emmajanemackinnonlee-runway.com";

  const data = await getCollections(0);

  const imagesXml = () =>
    data?.data?.collectionCreateds
      ?.flatMap((col: any) => col?.collections)
      ?.map(
        (col: any) =>
          `
      <url>
        <loc>${baseUrl}/channel/${col?.metadata?.title?.replaceAll(
            " ",
            "-"
          )}/</loc>
        ${locales
          .map(
            (locale) => `
          <xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}/${locale}/channel/${col?.metadata?.title?.replaceAll(
              " ",
              "-"
            )}/" />
        `
          )
          .join("")}
        <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/channel/${col?.metadata?.title?.replaceAll(
            " ",
            "-"
          )}" />
  <image:image>
            <image:loc>${INFURA_GATEWAY_INTERNAL}${
            col?.metadata?.cover?.split("ipfs://")?.[1]
          }</image:loc>
            <image:title><![CDATA[${
              col?.metadata?.title
            } | Runway | Emma-Jane MacKinnon-Lee]]></image:title>
            <image:caption><![CDATA[${
              col?.metadata?.title
            } | Runway | Emma-Jane MacKinnon-Lee]]></image:caption>
          </image:image>
      </url>
        `
      )
      .join("");

  const localeUrls = locales
    .map((locale) => {
      const altLinks = locales
        .map(
          (alt) => `
          <xhtml:link rel="alternate" hreflang="${alt}" href="${baseUrl}/${alt}/" />
        `
        )
        .join("");

      return `
      <url>
        <loc>${baseUrl}/${locale}/</loc>
        ${altLinks}
        <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
      </url>`;
    })
    .join("");

  const rootUrl = `
    <url>
      <loc>${baseUrl}/</loc>
      ${locales
        .map(
          (locale) => `
        <xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}/${locale}/" />
      `
        )
        .join("")}
      <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
    </url>
  `;

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  ${rootUrl}
  ${localeUrls}
  ${imagesXml()}
</urlset>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
