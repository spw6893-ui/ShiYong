import {allLibraryItems} from "content-collections";
import {LibraryBrowser, type LibraryCardData} from "@/components/library-browser";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {isPublished, isReviewOverdue, sortByPriorityAndDate} from "@/lib/content";

export default function ResourcesPage() {
  const items: LibraryCardData[] = sortByPriorityAndDate(allLibraryItems.filter(isPublished))
    .map(({content: _content, _meta: _meta, ...item}) => item)
    .map((item) => ({...item, reviewOverdue: item.type === "工具" && isReviewOverdue(item.verifiedAt)}));

  return <main><SiteHeader /><LibraryBrowser items={items} /><SiteFooter /></main>;
}
