import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get('http://localhost:5000/api/expenses', config);
      setExpenses(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch expenses', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!title || !amount || !category) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(
        'http://localhost:5000/api/expenses',
        { title, amount, category },
        config
      );
      setTitle('');
      setAmount('');
      setCategory('');
      fetchExpenses();
    } catch (error) {
      console.error('Failed to add expense', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, config);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error('Failed to delete expense', error);
    }
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="summary-cards">
        <div className="summary-card glass">
          <span>Total Balance</span>
          <h3>${totalExpenses.toFixed(2)}</h3>
        </div>
        <div className="summary-card glass">
          <span>Transactions</span>
          <h3>{expenses.length}</h3>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="expense-form-card glass">
          <h3>Add New Transaction</h3>
          <form onSubmit={handleAddExpense}>
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g. Groceries"
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-full">Add Transaction</button>
          </form>
        </div>

        <div className="expense-list-card glass">
          <h3>Recent Transactions</h3>
          {expenses.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            expenses.map((expense) => (
              <div key={expense._id} className="expense-item">
                <div className="expense-info">
                  <h4>{expense.title}</h4>
                  <p>{expense.category} • {new Date(expense.date).toLocaleDateString()}</p>
                </div>
                <div className="expense-amount expense">
                  -${expense.amount.toFixed(2)}
                  <button 
                    onClick={() => handleDelete(expense._id)}
                    className="btn btn-danger"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                  >
                    X
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
