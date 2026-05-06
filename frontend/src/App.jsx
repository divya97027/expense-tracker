import { useState, useEffect } from 'react';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import ExpenseChart from './components/ExpenseChart';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>💰 Expense Tracker</h1>
        <p>Track your income & expenses smartly</p>
      </div>
      <Summary transactions={transactions} />
      <div className="chart-card">
        <h3>📊 Expense Breakdown</h3>
        <ExpenseChart transactions={transactions} />
      </div>
      <AddExpense onAdd={handleAdd} />
      <ExpenseList transactions={transactions} onDelete={handleDelete} />
    </div>
  );
}

export default App;