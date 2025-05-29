import { useFormattedPurchases } from './FormatedSummaryData.jsx';


export default function Summary(){

    const {
    chartData,
    chartDataDaily,
    chartDataTrend,
    getSpendingThisWeek,
    getSpendingThisMonth,
    getSpendingThisYear,
    getUpcomingLists,
    SpendingLineChart,
    CurrentMonthBarChart,
    DayOfWeekChart
  } = useFormattedPurchases();

  const upcoming = getUpcomingLists();

    return (
    <div className="w-full px-4 relative">
      <h1 className="text-4xl font-bold">Summary    </h1>
      <hr className="w-1/4 bg-primary-light/40 h-1 border-0 mt-2 mb-5" />
      <div className='grid gap-10 grid-cols-[repeat(auto-fit,minmax(500px,1fr))]'>
        <div className="h-80 bg-white rounded-xl shadow-sm p-8 flex flex-col justify-between ">
            <div className="space-y-3">
                {[{
                label: "Total this week",
                value: getSpendingThisWeek().toFixed(2)
                }, {
                label: "Total this month",
                value: getSpendingThisMonth().toFixed(2)
                }, {
                label: "Total this year",
                value: getSpendingThisYear().toFixed(2)
                }].map(({label, value}) => (
                <div key={label} className="flex justify-between items-center text-gray-800 font-medium text-lg">
                    <span>{label}</span>
                    <span className="font-semibold text-black">{value}</span>
                </div>
                ))}
            </div>

        <div>
    <h3 className="text-gray-600 font-semibold mb-3 uppercase text-xs tracking-wide">Upcoming</h3>
    <ul className="max-h-28 overflow-y-auto divide-y divide-gray-100">
      {upcoming.map(item => (
        <li key={item.id} className="flex justify-between py-2 text-sm text-gray-700">
          <span className="truncate">{item.name}</span>
          <time dateTime={item.dueDate} className="ml-4 text-gray-400 whitespace-nowrap">{item.dueDate}</time>
        </li>
      ))}
    </ul>
  </div>
</div>

        <SpendingLineChart data={chartData} />
        <CurrentMonthBarChart data={chartDataDaily} />
        <DayOfWeekChart data={chartDataTrend}/>
      </div>
    </div>
    )

}