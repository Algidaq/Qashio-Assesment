export interface TableData {
  id: number;
  date: string;
  receiptStatus: boolean;
  amount: string;
}

export interface CustomTableProps {
  data: Receipt[];
}

export interface Receipt {
  id: number;
  company: {
    name: string;
    category: string;
    logo?: string;
  };
  buyer: {
    name: string;
  };
  transaction:
    | { amount: number; status: "pending" }
    | {
        amount: number;
        date: string;
        status: "completed";
      };
}
