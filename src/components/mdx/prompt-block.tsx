"use client";

import {Icon} from "@iconify/react";
import {useState} from "react";

export function PromptBlock({title = "可复制提示词", children}: {title?: string; children: React.ReactNode}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const text = typeof children === "string" ? children.replaceAll("\\n", "\n") : "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return <section className="prompt-block"><header><span><Icon icon="solar:code-square-bold" />{title}</span><button onClick={copy}><Icon icon={copied ? "solar:check-circle-bold" : "solar:copy-linear"} />{copied ? "已复制" : "复制"}</button></header><pre>{typeof children === "string" ? children.replaceAll("\\n", "\n") : children}</pre></section>;
}
