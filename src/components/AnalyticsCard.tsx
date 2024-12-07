interface Props {
    total: number | undefined;
    name: string;
}

const AnalyticsCard = ({ total, name }:Props) => {
    const amount = total && total > 1000 ? "₦" + (total / 1000).toFixed(1) + "k" : total?.toLocaleString();
  return (
    <div className="flex flex-col justify-center p-6 rounded-2xl border-zinc-100 dark:border-zinc-900 border-2">
      <div>
        <p className="font-semibold text-sm dark:text-white/70">{name}</p>
      </div>
      <p className="font-bold text-2xl dark:text-white/80">{amount}</p>
      <p className="text-sm text-red-400">-37% from yesterday</p>
    </div>
  )
}

export default AnalyticsCard