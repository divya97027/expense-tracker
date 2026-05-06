import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#E53935', '#FB8C00', '#1E88E5', '#7c4dff', '#43A047', '#00ACC1'];

function ExpenseChart({ transactions }) {
  const categoryData = transactions
    .filter(t => t.type === 'expense')  // sirf expense
    .reduce((acc, t) => {
      const key = t.category || t.title;
      const existing = acc.find(item => item.name === key);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: key, value: t.amount });
      }
      return acc;
    }, []);

  if (categoryData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px', color: '#555' }}>
        📊 Expenses add karo — chart yahan dikhega
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) =>
            `${(percent * 100).toFixed(0)}%`
          }
        >
          {categoryData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ExpenseChart;