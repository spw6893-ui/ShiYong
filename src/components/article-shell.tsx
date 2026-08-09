import {Icon} from "@iconify/react";
import {MDXContent} from "@content-collections/mdx/react";
import {mdxComponents} from "./mdx/mdx-components";

type ArticleShellProps = {
  title: string;
  summary: string;
  eyebrow: string;
  readingTime: number;
  publishedAt: string;
  verifiedAt?: string;
  reviewOverdue?: boolean;
  sources?: string[];
  content: string;
  backHref?: string;
  backLabel?: string;
};

export function ArticleShell({title, summary, eyebrow, readingTime, publishedAt, verifiedAt, reviewOverdue = false, sources = [], content, backHref = "/resources", backLabel = "返回资料库"}: ArticleShellProps) {
  return <article className="article-shell">
    <header className="article-header"><a href={backHref}><Icon icon="solar:arrow-left-linear" />{backLabel}</a><span>{eyebrow}</span><h1>{title}</h1><p>{summary}</p><div><b><Icon icon="solar:clock-circle-bold" />{readingTime} 分钟</b><b><Icon icon="solar:calendar-mark-bold" />发布于 {publishedAt}</b>{verifiedAt && <b className={reviewOverdue ? "review-overdue" : ""}><Icon icon={reviewOverdue ? "solar:danger-triangle-bold" : "solar:check-circle-bold"} />{reviewOverdue ? `待复核 · 上次 ${verifiedAt}` : `验证于 ${verifiedAt}`}</b>}</div></header>
    <div className="article-layout"><div className="article-content"><MDXContent code={content} components={mdxComponents} /></div><aside className="article-side"><div><b>内容原则</b><p>方法优先，工具其次。</p><p>重要信息需要核查。</p><p>敏感资料不要上传。</p></div>{sources.length > 0 && <div className="article-sources"><b>官方核查来源</b>{sources.map((source, index) => <a href={source} target="_blank" rel="noreferrer" key={source}>来源 {index + 1}<Icon icon="solar:arrow-up-linear" /></a>)}</div>}<a href="/resources">继续浏览资料库 <Icon icon="solar:arrow-right-linear" /></a></aside></div>
  </article>;
}
