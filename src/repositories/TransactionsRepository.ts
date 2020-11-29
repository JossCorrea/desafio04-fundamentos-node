import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  private getTotalIncome(): number {
    const incomes = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const totalIncome = incomes.reduce((total, income) => {
      return total + income.value;
    }, 0);

    return totalIncome;
  }

  private getTotalOutcome(): number {
    const outcomes = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const totalOutcome = outcomes.reduce((total, income) => {
      return total + income.value;
    }, 0);

    return totalOutcome;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.getTotalIncome();
    const outcome = this.getTotalOutcome();
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
