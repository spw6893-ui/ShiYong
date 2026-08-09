import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {allWeeklyIssues} from "content-collections";
import {ArticleShell} from "@/components/article-shell";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {isPublished} from "@/lib/content";

type PageProps = {params: Promise<{slug: string}>};

export function generateStaticParams() {
  return allWeeklyIssues.filter(isPublished).map((issue) => ({slug: issue.slug}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params;
  const issue = allWeeklyIssues.find((entry) => entry.slug === slug && isPublished(entry));
  return issue ? {title: `${issue.title}｜拾用`, description: issue.summary} : {};
}

export default async function WeeklyDetailPage({params}: PageProps) {
  const {slug} = await params;
  const issue = allWeeklyIssues.find((entry) => entry.slug === slug && isPublished(entry));
  if (!issue) notFound();

  return <main><SiteHeader /><div className="inner-shell"><ArticleShell title={issue.title} summary={issue.summary} eyebrow={`每周总结 · ${issue.issue}`} readingTime={issue.readingTime} publishedAt={issue.publishedAt} content={issue.content} backHref="/weekly" backLabel="返回每周总结" /></div><SiteFooter /></main>;
}
