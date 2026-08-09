import type {ComponentPropsWithoutRef, ReactNode} from "react";
import {Icon} from "@iconify/react";
import {PromptBlock} from "./prompt-block";

function Callout({type = "info", title, children}: {type?: "info" | "warning"; title?: string; children: ReactNode}) {
  return <aside className={`mdx-callout ${type}`}><Icon icon={type === "warning" ? "solar:danger-triangle-bold" : "solar:lightbulb-bolt-bold"} /><div>{title && <strong>{title}</strong>}<div>{children}</div></div></aside>;
}

function ActionBox({title, children}: {title: string; children: ReactNode}) {
  return <aside className="mdx-action"><Icon icon="solar:play-circle-bold" /><div><strong>{title}</strong><div>{children}</div></div></aside>;
}

function Steps({children}: {children: ReactNode}) {
  return <section className="mdx-steps">{children}</section>;
}

function ToolCard({name, href, label, children}: {name: string; href: string; label: string; children: ReactNode}) {
  return <aside className="mdx-tool"><div><Icon icon="solar:widget-5-bold" /><strong>{name}</strong></div><div className="mdx-tool-body">{children}</div><a href={href} target="_blank" rel="noreferrer">{label}<Icon icon="solar:arrow-up-linear" /></a></aside>;
}

export const mdxComponents = {
  Callout,
  ActionBox,
  PromptBlock,
  Steps,
  ToolCard,
  a: (props: ComponentPropsWithoutRef<"a">) => <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel={props.href?.startsWith("http") ? "noreferrer" : undefined} />,
};
