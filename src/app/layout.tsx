import type {Metadata} from "next";
import {Providers} from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "拾用｜拾取真正有用的内容",
  description: "每周 10 分钟，发现值得知道、也真正用得上的内容与工具。",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="zh-CN">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
