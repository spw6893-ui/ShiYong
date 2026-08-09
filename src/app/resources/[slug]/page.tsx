import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {allLibraryItems} from "content-collections";
import {ArticleShell} from "@/components/article-shell";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {isPublished, isReviewOverdue} from "@/lib/content";

type PageProps = {params: Promise<{slug: string}>};

export function generateStaticParams() {
  return allLibraryItems.filter(isPublished).map((item) => ({slug: item.slug}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params;
  const item = allLibraryItems.find((entry) => entry.slug === slug && isPublished(entry));
  return item ? {title: `${item.title}｜拾用`, description: item.summary} : {};
}

export default async function LibraryDetailPage({params}: PageProps) {
  const {slug} = await params;
  const item = allLibraryItems.find((entry) => entry.slug === slug && isPublished(entry));
  if (!item) notFound();

  return <main><SiteHeader /><div className="inner-shell"><ArticleShell title={item.title} summary={item.summary} eyebrow={`${item.type} · ${item.scenario}`} readingTime={item.readingTime} publishedAt={item.publishedAt} verifiedAt={item.verifiedAt} reviewOverdue={item.type === "工具" && isReviewOverdue(item.verifiedAt)} sources={item.sources} content={item.content} /></div><SiteFooter /></main>;
}
