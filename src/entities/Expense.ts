interface Expense {
  amount: string;
  description: string;
  category: string;
  date: string | null
  category_id?:  number
}

export default Expense