import { useState } from 'react';

const CATEGORIES = {
  income: ['💼 Salary', '💰 Freelance', '📈 Investment', '🎁 Gift', '🏦 Business', '📦 Other'],
  expense: ['🍕 Food & Dining', '🚗 Transport', '🛒 Shopping', '💡 Bills & Utilities', '🏥 Healthcare', '🎬 Entertainment', '📚 Education', '🏠 Rent', '👗 Clothing', '📦 Other']
};

function AddExpense({ onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('🍕 Food & Dining');

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(CATEGORIES[newType][0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    onAdd({
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    });

    setTitle('');
    setAmount('');
  };

  return (
    <div className="add-card">
      <h3>➕ Add Transaction</h3>

      {/* Type Toggle */}
      <div style={{
        display: 'flex', gap: '8px', marginBottom: '14px'
      }}>
        <button
          type="button"
          onClick={() => handleTypeChange('income')}
          style={{
            flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
            cursor: 'pointer', fontWeight: 600, fontSize: '13px',
            background: type === 'income' ? '#43A047' : '#0f0f1a',
            color: type === 'income' ? '#fff' : '#666',
            transition: 'all .2s'
          }}>
          ⬆️ Income
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('expense')}
          style={{
            flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
            cursor: 'pointer', fontWeight: 600, fontSize: '13px',
            background: type === 'expense' ? '#E53935' : '#0f0f1a',
            color: type === 'expense' ? '#fff' : '#666',
            transition: 'all .2s'
          }}>
          ⬇️ Expense
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            className="form-input"
            type="text"
            placeholder="Title (e.g. Netflix, Salary)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="form-input"
            type="number"
            placeholder="Amount ₹"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <select
          className="form-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginBottom: '4px' }}
        >
          {CATEGORIES[type].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button className="add-btn" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddExpense;