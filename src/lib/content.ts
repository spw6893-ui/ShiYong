const REVIEW_MAX_AGE_DAYS = 90;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

type Publishable = {
  status: "draft" | "published";
  priority: number;
  publishedAt: string;
};

export function isPublished(item: Publishable) {
  return item.status === "published";
}

export function sortByPriorityAndDate<T extends Publishable>(items: T[]) {
  return [...items].sort((a, b) =>
    b.priority - a.priority || b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function isReviewOverdue(verifiedAt?: string, now = new Date()) {
  if (!verifiedAt) return false;
  const verifiedTime = new Date(`${verifiedAt}T00:00:00Z`).getTime();
  return now.getTime() - verifiedTime > REVIEW_MAX_AGE_DAYS * DAY_IN_MS;
}
