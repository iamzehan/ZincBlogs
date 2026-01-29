export const formatPostDate = (date: string | Date): string => {
  const postDate = date instanceof Date ? date : new Date(date);
  const now = new Date();

  const diffMs = now.getTime() - postDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);

  // Format time (07:31 AM)
  const time = postDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Today & Yesterday checks
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // < 1 hour → minutes ago
  if (diffMinutes < 60) {
    return `${Math.max(diffMinutes, 1)} min ago`;
  }

  // < 12 hours → hours ago
  if (diffHours < 12) {
    return `${diffHours} hr ago`;
  }

  // Posted today → show time
  if (postDate >= today) {
    return time;
  }

  // Posted yesterday
  if (postDate >= yesterday) {
    return `Yesterday at ${time}`;
  }

  // Older → date + time
  const dateStr = postDate.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return `${dateStr} at ${time}`;
};
