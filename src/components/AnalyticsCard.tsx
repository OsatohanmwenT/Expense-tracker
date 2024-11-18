const AnalyticsCard = () => {
  return (
    <div className="p-6 py-8 rounded-2xl shadow">
      <div>
        <p className="font-semibold">Total Amount Processed</p>
      </div>
      <p className="font-bold text-4xl">$40.6k</p>
      <p className="text-sm text-red-400 mt-2">-37% from yesterday</p>
    </div>
  )
}

export default AnalyticsCard