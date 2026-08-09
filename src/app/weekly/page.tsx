import type {Metadata} from "next";
import {allWeeklyIssues} from "content-collections";
import {ArticleShell} from "@/components/article-shell";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {isPublished, sortByPriorityAndDate} from "@/lib/content";

export const metadata: Metadata = {
  title: "每周总结｜拾用",
  description: "每周筛选值得尝试的 AI 效率方法、工作流和工具。",
};

export default function WeeklyPage() {
  const issues = sortByPriorityAndDate(allWeeklyIssues.filter(isPublished));
  const [latest, ...archive] = issues;

  return <main><SiteHeader /><div className="inner-shell">
    <ArticleShell title={latest.title} summary={latest.summary} eyebrow={`每周总结 · ${latest.issue}`} readingTime={latest.readingTime} publishedAt={latest.publishedAt} content={latest.content} backHref="/" backLabel="返回首页" />
    {archive.length > 0 && <section className="weekly-archive">
      <div><span>WEEKLY ARCHIVE</span><h2>往期总结</h2><p>按时间回看已经筛选过的方法、工作流和工具。</p></div>
      <div className="weekly-archive-list">{archive.map((issue) => <a href={`/weekly/${issue.slug}`} key={issue.slug}><span>{issue.issue}</span><h3>{issue.title}</h3><p>{issue.summary}</p><b>{issue.readingTime} 分钟 <span>阅读 →</span></b></a>)}</div>
    </section>}
  </div><SiteFooter /></main>;
}
