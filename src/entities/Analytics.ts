export interface AnalyticsExpense {
    date: string;
    total: string;
}

export interface AnalyticsDaily {
    expenses: AnalyticsExpense[];
}

export interface ExpenseCategory {
    category_id: number;
    category_name: string;
    total: number;
}

export interface BudgetSummary {
    total_expenses: number;
    budget_limit: number;
    adherence: number | null;
    expenses_by_category: ExpenseCategory[];
}