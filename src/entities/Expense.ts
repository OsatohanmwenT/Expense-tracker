interface Expense {
  amount: string;
  description: string;
  id: number;
  category_name: string;
  date: string;
  category_id?:  number;
}

export default Expense