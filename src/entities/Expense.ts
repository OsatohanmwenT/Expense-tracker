interface Expense {
  amount: string;
  description: string;
  category: string;
  date: string;
  category_id?:  number;
}

export default Expense