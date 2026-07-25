import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const imageUrl = host ? `${protocol}://${host}/og.png` : undefined;
  const title = "1業務7日ラボ｜AIを導入する前に、投資判断をつくる";
  const description =
    "1つの業務を7日だけ試し、時間・品質・手戻りを測って、AI化の採用・改善・不採用を決める実験キット。";

  return {
    title,
    description,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: imageUrl
      ? {
          title,
          description,
          images: [{ url: imageUrl, width: 1200, height: 630, alt: "1業務7日ラボ" }],
        }
      : undefined,
    twitter: imageUrl
      ? { card: "summary_large_image", title, description, images: [imageUrl] }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
