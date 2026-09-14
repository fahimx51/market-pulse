export const formatCurrency = (value: number): string => {
    if (isNaN(value)) return '$0';

    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 1000000) {
        const formatted = +(absValue / 1000000).toFixed(1);
        return `${sign}$${formatted}M`;
    }
    if (absValue >= 1000) {
        const formatted = +(absValue / 1000).toFixed(1);
        return `${sign}$${formatted}K`;
    }
    return `${sign}$${absValue.toLocaleString()}`;
};

export const timeAgo = (isoString: string): string => {
    const timestamp = new Date(isoString).getTime();

    // Safety check for invalid date
    if (isNaN(timestamp)) return 'Recently';

    const diffMs = Date.now() - timestamp;

    if (diffMs < 0) return 'Just now';

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes < 1) return 'Just now';

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths}mo ago`;

    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears}y ago`;
};

export const avatarColor = (ticker: string = ''): string => {
    const palette = ['#378ADD', '#7F77DD', '#1D9E75', '#D85A30', '#D4537E'];

    if (!ticker) return palette[0];

    let sum = 0;
    for (let i = 0; i < ticker.length; i++) {
        sum += ticker.charCodeAt(i);
    }

    return palette[sum % palette.length];
};