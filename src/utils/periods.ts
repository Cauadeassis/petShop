export const periodRanges = {
    morning: { start: 9, end: 13 },
    afternoon: { start: 13, end: 19 },
    evening: { start: 19, end: 22 }
} as const;

export type Period = keyof typeof periodRanges;

export const getPeriod = (hour: number): Period | null => {
    for (const [period, range] of Object.entries(periodRanges)) {
        if (hour >= range.start && hour < range.end) {
            return period as Period;
        }
    }
    return null;
};