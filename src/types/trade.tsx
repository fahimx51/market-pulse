export type InsiderTrade = {
    id: string;
    ticker: string;
    company: string;
    sector: string;
    insider: string;
    role: "CEO" | "CFO" | "Director" | "Officer";
    type: "purchase" | "sale";
    transactionCode: "P" | "S";
    shares: number;
    pricePerShare: number;
    value: number;
    transactionDate: string;
    filedAt: string;
    signal: string;
    signalStrength: "High" | "Medium" | "Low";
    activityChart: number[];
};