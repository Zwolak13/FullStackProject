import { parseISO, format, isAfter, compareAsc } from 'date-fns';
import { useLists } from '../Context/ActiveListContext';
import { LineChart, CartesianGrid, Line, XAxis, BarChart, Bar, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const useFormattedPurchases = () => {
  const { lists } = useLists();
  const purchases = lists
  ?.filter(list => list?.completed === true);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');


  const monthlyTotals = purchases.reduce((acc, purchase) => {
    const dueDate = parseISO(purchase.dueDate);
    const purchaseMonth = format(dueDate, 'yyyy-MM');
    acc[purchaseMonth] = (acc[purchaseMonth] || 0) + purchase.price;
    return acc;
  }, {});

  const fullYear = Array.from({ length: 12 }, (_, i) => {
  const m = String(i + 1).padStart(2, '0');
  return `${year}-${m}`;
});

const chartData = fullYear.map(month => {
  const isFuture =
    parseInt(month.slice(5, 7)) > now.getMonth() + 1;
  const total = monthlyTotals[month];
  return {
    month,
    total: isFuture ? null : total ? Number(total.toFixed(2)) : 0
  };
});

  const currentMonthPurchases = purchases.filter(({ dueDate }) =>
    dueDate.startsWith(`${year}-${month}`)
  );

  const dailyTotals = currentMonthPurchases.reduce((acc, { dueDate, price }) => {
    const day = dueDate.slice(8, 10);
    acc[day] = (acc[day] || 0) + price;
    return acc;
  }, {});

  const chartDataDaily = Object.entries(dailyTotals)
    .map(([day, total]) => ({
      day: `${day}`,
      total: Number(total.toFixed(2)),
    }))
    .sort((a, b) => parseInt(a.day) - parseInt(b.day));

  const dayCounts = purchases.reduce((acc, { dueDate }) => {
    const parsed = parseISO(dueDate);
    const weekday = format(parsed, 'EEE');
    acc[weekday] = (acc[weekday] || 0) + 1;
    return acc;
  }, {});

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const chartDataTrend = daysOfWeek.map(day => ({
    day,
    count: dayCounts[day] || 0,
  }));

  const getSpendingThisWeek = () => {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    return purchases
      .filter(({ dueDate }) => {
        const d = parseISO(dueDate);
        return d >= weekStart && d <= now;
      })
      .reduce((sum, { price }) => sum + price, 0);
  };


  const getSpendingThisMonth = () => {
    return purchases
      .filter(({ dueDate }) => {
        const d = parseISO(dueDate);
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
      })
      .reduce((sum, { price }) => sum + price, 0);
  };


  const getSpendingThisYear = () => {
    return purchases
      .filter(({ dueDate }) => parseISO(dueDate).getFullYear() === now.getFullYear())
      .reduce((sum, { price }) => sum + price, 0);
  };


  const getUpcomingLists = (limit = 3) => {
    return lists
      .filter(item => item.completed === false)
      .filter(item => item?.dueDate && isAfter(parseISO(item.dueDate), now))
      .sort((a, b) => compareAsc(parseISO(a.dueDate), parseISO(b.dueDate)))
      .slice(0, limit);
  };


  const SpendingLineChart = ({ data }) => (
    <div className=" h-80 bg-white rounded-2xl shadow pr-4 pb-8 pt-2">
      <h2 className="text-center font-semibold mb-4">Yearly spendings</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#5AA658" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const CurrentMonthBarChart = ({ data }) => (
    <div className=" h-80 min-w-[600px] bg-white rounded-2xl shadow pr-4 pb-8 pt-2">
      <h2 className="text-center font-semibold mb-4">{ now.toLocaleString('en-US', { month: 'long' })} spendings</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis dataKey="day" />
          <YAxis  />
          <Tooltip />
          <Bar dataKey="total" fill="#5AA658" label={{ position: 'top' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const DayOfWeekChart = ({ data }) => (
    <div className=" h-80 bg-white rounded-2xl shadow pr-4 pb-8 pt-2">
      <h2 className="text-center font-semibold mb-4">Spending Trends</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            dataKey="day"
          />
          <YAxis  interval={1} allowDecimals={false}/>
          <Tooltip />
          <Bar dataKey="count" fill="#5AA658" label={{ position: 'top' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return {
    chartData,
    chartDataDaily,
    chartDataTrend,
    getSpendingThisWeek,
    getSpendingThisMonth,
    getSpendingThisYear,
    getUpcomingLists,
    SpendingLineChart,
    CurrentMonthBarChart,
    DayOfWeekChart,
  };
};
