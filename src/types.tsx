export interface Loan {
  id: number;
  amount: number;
  apr: number;
  term: number;
  status: string;
  owner_id: number;
}

export interface LoanData {
  month: number;
  open_balance: number;
  total_payment: number;
  principal_payment: number;
  interest_payment: number;
  close_balance: number;
}
