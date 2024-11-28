const AnalyticsCard = () => {
  return (
    <div className="flex flex-col justify-center p-6 rounded-2xl border-zinc-900 border-2">
      <div>
        <p className="font-semibold text-sm text-white/70">Total Budget</p>
      </div>
      <p className="font-bold text-2xl text-white/80">₦400.6k</p>
      <p className="text-sm text-red-400">-37% from yesterday</p>
    </div>
  )
}

export default AnalyticsCard