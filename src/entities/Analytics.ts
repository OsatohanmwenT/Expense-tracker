export interface AnalyticsExpense {
    date: string;
    total: string;
}

export interface AnalyticsDaily {
    expenses: AnalyticsExpense[];
}