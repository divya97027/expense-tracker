import { useState } from 'react';

function ExpenseList({ transactions, onDelete, showSearch = false }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = [...transactions]
    .reverse()
    .filter(t => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'all' || t.type === filter;
      return matchSearch && matchFilter;
    });

  if (transactions.length === 0) {
    return (
      <div className="list-card">
        <h3>📋 Recent Transactions</h3>
        <div className="empty-state">
          <p style={{ fontSize: '28px', marginBottom: '8px' }}>💸</p>
          <p>No transactions yet.</p>
          <p style={{ marginTop: '4px', fontSize: '12px' }}>Add one above to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3>📋 {showSearch ? 'All Transactions' : 'Recent Transactions'}</h3>
        <span style={{ fontSize: '12px', color: '#888' }}>{filtered.length} records</span>
      </div>

      {showSearch && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
          <input
            style={{
              flex: 1, padding: '9px 14px', border: '1.5px solid #EBEBEB',
              borderRadius: '8px', fontSize: '13px', outline: 'none',
              fontFamily: 'Inter, sans-serif', background: '#F7F8FA'
            }}
            placeholder="🔍 Search transactions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            style={{
              padding: '9px 14px', border: '1.5px solid #EBEBEB',
              borderRadius: '8px', fontSize: '13px', outline: 'none',
              fontFamily: 'Inter, sans-serif', background: '#F7F8FA', cursor: 'pointer'
            }}
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">No matching transactions found.</div>
      ) : (
        filtered.map(t => (
          <div key={t.id} className="transaction-item">
            <div className={`t-icon ${t.type}`}>
              {t.type === 'income' ? '⬆️' : '⬇️'}
            </div>
            <div className="t-info">
              <div className="t-title">{t.title}</div>
              <div className="t-date">{t.date}</div>
              <span className="t-category">{t.category}</span>
            </div>
            <div className={`t-amount ${t.type}`}>
              {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
            </div>
            <button className="delete-btn" onClick={() => onDelete(t.id)}>🗑️</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;