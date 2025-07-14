export type tParams = Promise<{ lang: string }>;

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }, { lang: "pt" }, { lang: "ar" }];
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: tParams;
}>) {
  return children;
}
