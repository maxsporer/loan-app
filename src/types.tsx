export interface Loan {
  id: number;
  amount: number;
  apr: number;
  term: number;
  status: string;
  owner_id: number;
  value?: string;
  label?: string;
};

export interface LoanData {
  month: number;
  open_balance: number;
  total_payment: number;
  principal_payment: number;
  interest_payment: number;
  close_balance: number;
};

export interface User {
  id: number;
  label: string;
  value: string;
};

export interface UserData {
  id: number;
  username: string;
};

export interface Month {
  value: number;
  label: number;
};

export interface LoanMonth {
  current_principal: number;
  aggregate_principal_paid: number;
  aggregate_interest_paid: number;
}
