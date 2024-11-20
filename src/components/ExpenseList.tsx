import { MouseEvent, useEffect, useState } from "react"
import DialogBox from "./DialogBox";
import DeleteDialogBox from "./DeleteDialogBox";
import AddDialogBox from "./AddDialogBox";
import useExpense from "@/hooks/useExpense.tsx";

const ExpenseList = () => {
    const [openRow, setOpenRow] = useState<number | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAddBoxOpen, setIsAddBoxOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const { data } = useExpense();
      
      useEffect(() => {
        const closePopup = () => setOpenRow(null);
        document.addEventListener("click", closePopup);
    
        return () => {
          document.removeEventListener("click", closePopup);
        };
      }, []);

    function toggleAction(e: MouseEvent, id: number) {
        e.stopPropagation();
        setOpenRow((prev) => (prev === id ? null : id))
    }

    function openDialog() {
        setIsDialogOpen(true);
    }

    function openAlertDialog() {
        setIsAlertOpen(true);
    }

  return (
    <>
        <div className="flex items-center justify-between">
            <div className="rounded-md border-2 sm:flex-1 max-w-[400px] overflow-hidden">
                <input className="w-full px-2 focus:outline-none py-2" placeholder="filter by description..." type="text" />
            </div>
            <button onClick={() => setIsAddBoxOpen(true)} className="bg-black text-white rounded-md px-3 py-2 hover:bg-black/80 transition-all">Add Expense</button>
        </div>
        <table className="w-full mx-auto text-left">
            <thead>
                <tr className="border-b-[1px]">
                    <th className="h-12 px-4">Income</th>
                    <th className="h-12 px-4">Amount</th>
                    <th className="h-12 px-4">Percentage</th>
                    <th className="h-12 px-4">Discount</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((tableItem, index) => (
                    <tr className="border-b-[1px] relative" key={index}>
                        <td className="p-4 align-middle">{tableItem.amount}</td>
                        <td className="p-4 align-middle">{tableItem.category}</td>
                        <td className="p-4 align-middle">{tableItem.description}</td>
                        <td className="p-4 align-middle">{tableItem.date}</td>
                        <td className="p-4 align-middle">
                            <button onClick={(e) => toggleAction(e, index)} className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                            </button>
                        </td>
                        {openRow === index && (
                            <div className={`mt-2 flex flex-col transition-all rounded-lg duration-500 ${openRow === index ? "opacity-100 -top-10 z-10" : "opacity-0 -top-5 z-0"} absolute right-24 shadow-lg bg-gray-100`}>
                                <p className="pl-2 w-[100px] py-3 font-semibold border-b-[1px]">Action</p>
                                <button onClick={openDialog} className="font-semibold text-left pl-2 pr-6 py-3 border-b-[1px]">Edit</button>
                                <button onClick={openAlertDialog} className="font-semibold text-left pl-2 pr-6 py-3">Delete</button>
                            </div>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
        <AddDialogBox isAddBoxOpen={isAddBoxOpen} setIsAddBoxOpen={setIsAddBoxOpen} />
        <DialogBox isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        <DeleteDialogBox isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} />
    </>
  )
}

export default ExpenseList