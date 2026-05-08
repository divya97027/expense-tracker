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

  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (t) => setTransactions([...transactions, t]);
  const handleDelete = (id) => setTransactions(transactions.filter(t => t.id !== id));

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">💰 ExpenseIQ</div>
        {[
          { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
          { id: 'transactions', icon: '📋', label: 'Transactions' },
          { id: 'reports', icon: '📊', label: 'Reports' },
          { id: 'budgets', icon: '🎯', label: 'Budgets' },
          { id: 'settings', icon: '⚙️', label: 'Settings' },
        ].map(item => (
          <div
            key={item.id}
            className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            {item.icon} {item.label}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="main">

        {/* DASHBOARD */}
        {activePage === 'dashboard' && (
          <>
            <div className="main-header">
              <h1>Good day! 👋</h1>
              <p>Here's what's happening with your money today.</p>
            </div>
            <Summary transactions={transactions} />
            <div className="two-col">
              <div className="chart-card">
                <h3>📊 Expense Breakdown</h3>
                <ExpenseChart transactions={transactions} />
              </div>
              <AddExpense onAdd={handleAdd} />
            </div>
            <ExpenseList transactions={transactions} onDelete={handleDelete} />
          </>
        )}

        {/* TRANSACTIONS */}
{activePage === 'transactions' && (
  <>
    <div className="main-header">
      <h1>📋 Transactions</h1>
      <p>View, search and manage all your transactions.</p>
    </div>
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      <div style={{
        flex: 1, background: '#fff', borderRadius: '12px',
        padding: '16px 20px', border: '1px solid #EBEBEB',
        display: 'flex', alignItems: 'center', gap: '12px'
      }}>
        <span style={{ fontSize: '24px' }}>⬆️</span>
        <div>
          <div style={{ fontSize: '12px', color: '#888' }}>Total Income</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#43A047' }}>
            +₹{income.toLocaleString()}
          </div>
        </div>
      </div>
      <div style={{
        flex: 1, background: '#fff', borderRadius: '12px',
        padding: '16px 20px', border: '1px solid #EBEBEB',
        display: 'flex', alignItems: 'center', gap: '12px'
      }}>
        <span style={{ fontSize: '24px' }}>⬇️</span>
        <div>
          <div style={{ fontSize: '12px', color: '#888' }}>Total Expenses</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#E53935' }}>
            -₹{expense.toLocaleString()}
          </div>
        </div>
      </div>
      <div style={{
        flex: 1, background: '#fff', borderRadius: '12px',
        padding: '16px 20px', border: '1px solid #EBEBEB',
        display: 'flex', alignItems: 'center', gap: '12px'
      }}>
        <span style={{ fontSize: '24px' }}>📊</span>
        <div>
          <div style={{ fontSize: '12px', color: '#888' }}>Transactions</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#6C3FE8' }}>
            {transactions.length}
          </div>
        </div>
      </div>
    </div>
    <AddExpense onAdd={handleAdd} />
    <ExpenseList transactions={transactions} onDelete={handleDelete} showSearch={true} />
  </>
)}
        {/* REPORTS */}
        {activePage === 'reports' && (
          <>
            <div className="main-header">
              <h1>📊 Reports</h1>
              <p>Visual overview of your spending habits.</p>
            </div>
            <div className="two-col">
              <div className="chart-card">
                <h3>Expense Breakdown</h3>
                <ExpenseChart transactions={transactions} />
              </div>
              <div className="chart-card">
                <h3>📈 Summary</h3>
                <div style={{ padding: '12px 0' }}>
                  {[
                    { label: 'Total Income', value: `+₹${income.toLocaleString()}`, color: '#43A047' },
                    { label: 'Total Expenses', value: `-₹${expense.toLocaleString()}`, color: '#E53935' },
                    { label: 'Net Savings', value: `₹${(income - expense).toLocaleString()}`, color: '#6C3FE8' },
                    { label: 'Savings Rate', value: `${income > 0 ? ((income - expense) / income * 100).toFixed(0) : 0}%`, color: '#1E88E5' },
                  ].map(item => (
                    <div key={item.label} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '12px 0', borderBottom: '1px solid #f0f0f0'
                    }}>
                      <span style={{ fontSize: '13px', color: '#888' }}>{item.label}</span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* BUDGETS */}
        {activePage === 'budgets' && (
          <>
            <div className="main-header">
              <h1>🎯 Budgets</h1>
              <p>Track your spending against monthly budgets.</p>
            </div>
            {[
              { category: '🍕 Food & Dining', budget: 8000, color: '#E53935' },
              { category: '🚗 Transport', budget: 5000, color: '#FB8C00' },
              { category: '🛒 Shopping', budget: 6000, color: '#1E88E5' },
              { category: '💡 Bills & Utilities', budget: 4000, color: '#7c4dff' },
              { category: '🎬 Entertainment', budget: 3000, color: '#43A047' },
            ].map(item => {
              const spent = transactions
                .filter(t => t.type === 'expense' && t.category === item.category)
                .reduce((s, t) => s + t.amount, 0);
              const pct = Math.min((spent / item.budget) * 100, 100).toFixed(0);
              return (
                <div key={item.category} className="list-card" style={{ marginBottom: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 500 }}>{item.category}</span>
                    <span style={{ fontSize: '13px', color: '#888' }}>
                      ₹{spent.toLocaleString()} / ₹{item.budget.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ background: '#f0f0f0', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`, height: '100%',
                      background: pct >= 90 ? '#E53935' : pct >= 70 ? '#FB8C00' : item.color,
                      borderRadius: '8px', transition: 'width .4s'
                    }} />
                  </div>
                  <div style={{ fontSize: '11px', color: pct >= 90 ? '#E53935' : '#888', marginTop: '4px', textAlign: 'right' }}>
                    {pct}% used {pct >= 90 ? '⚠️ Over budget!' : ''}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* SETTINGS */}
        {activePage === 'settings' && (
          <>
            <div className="main-header">
              <h1>⚙️ Settings</h1>
              <p>Manage your account preferences.</p>
            </div>
            <div className="list-card">
              <h3 style={{ marginBottom: '16px' }}>Account</h3>
              {[
                { label: 'Name', value: 'Divya Upadhyay' },
                { label: 'Email', value: 'divya@email.com' },
                { label: 'Currency', value: '₹ Indian Rupee' },
                { label: 'Theme', value: 'Light (Default)' },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 0', borderBottom: '1px solid #f0f0f0'
                }}>
                  <span style={{ fontSize: '13.5px', color: '#555' }}>{item.label}</span>
                  <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#1a1a1a' }}>{item.value}</span>
                </div>
              ))}
              <button onClick={() => { localStorage.clear(); window.location.reload(); }}
                style={{
                  marginTop: '20px', padding: '10px 20px',
                  background: '#FDECEA', color: '#E53935',
                  border: '1px solid #FFCDD2', borderRadius: '8px',
                  cursor: 'pointer', fontWeight: 600, fontSize: '13px'
                }}>
                🗑️ Clear All Data
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default App;