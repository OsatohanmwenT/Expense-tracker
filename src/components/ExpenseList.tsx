import { MouseEvent, useEffect, useState } from "react"
import DialogBox from "./DialogBox";
import DeleteDialogBox from "./DeleteDialogBox";

const ExpenseList = () => {
    const [openRow, setOpenRow] = useState<number | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const tableData = [
        {
          income: "$10000.00",
          amount: "$100",
          percentage: "20%",
          discount: "15%",
        },
        {
          income: "$5000.00",
          amount: "$50",
          percentage: "10%",
          discount: "5%",
        },
        {
          income: "$15000.00",
          amount: "$200",
          percentage: "25%",
          discount: "18%",
        },
        {
            income: "$10000.00",
            amount: "$100",
            percentage: "20%",
            discount: "15%",
        },
        {
            income: "$5000.00",
            amount: "$50",
            percentage: "10%",
            discount: "5%",
        },
        {
            income: "$15000.00",
            amount: "$200",
            percentage: "25%",
            discount: "18%",
        },
      ];

      
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
                {tableData.map((tableItem, index) => (
                    <tr className="border-b-[1px] relative" key={index}>
                        <td className="p-4 align-middle">{tableItem.income}</td>
                        <td className="p-4 align-middle">{tableItem.amount}</td>
                        <td className="p-4 align-middle">{tableItem.percentage}</td>
                        <td className="p-4 align-middle">{tableItem.discount}</td>
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
        <DialogBox isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        <DeleteDialogBox isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} />
    </>
  )
}

export default ExpenseList