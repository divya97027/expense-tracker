function Summary({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;
  const savings = income > 0 ? ((balance / income) * 100).toFixed(0) : 0;

  return (
    <div className="summary-grid">
      <div className="summary-card balance">
        <div className="label">Total Balance</div>
        <div className="amount">₹{balance.toFixed(2)}</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
          {savings}% savings rate
        </div>
      </div>

      <div className="summary-card income">
        <div className="label">Income</div>
        <div className="amount">₹{income.toFixed(0)}</div>
      </div>

      <div className="summary-card expense">
        <div className="label">Expenses</div>
        <div className="amount">₹{expense.toFixed(0)}</div>
      </div>

      <div className="summary-card savings">
        <div className="label">Saved</div>
        <div className="amount">₹{balance > 0 ? balance.toFixed(0) : 0}</div>
      </div>
    </div>
  );
}

export default Summary;