function ExpenseList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="list-card">
        <h3>📋 Recent Transactions</h3>
        <div className="empty-state">
          <p>🏦 Koi transaction nahi abhi</p>
          <p style={{ marginTop: '6px' }}>Upar se add karo!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-card">
      <h3>📋 Recent Transactions</h3>
      {[...transactions].reverse().map(t => (
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

          <button
            className="delete-btn"
            onClick={() => onDelete(t.id)}
            title="Delete"
          >
            🗑️
          </button>

        </div>
      ))}
    </div>
  );
}

export default ExpenseList;