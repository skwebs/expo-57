export function formatTransactionDate(date: Date) {
    const now = new Date();

    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    const time = new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
    }).format(date);

    if (isToday) {
        return `Today, ${time}`;
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
    }).format(date);
}