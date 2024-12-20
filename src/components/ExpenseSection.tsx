import {MouseEvent, useEffect, useState} from "react"
import DialogBox from "./Dialogs/DialogBox.tsx";
import DeleteDialogBox from "./Dialogs/DeleteDialogBox.tsx";
import AddDialogBox from "./Dialogs/AddDialogBox.tsx";
import Notification from "@/components/Notification.tsx";
import Expense from "@/entities/Expense.ts";
import ActionBox from "@/components/ActionBox.tsx";
import CategoryDialogBox from "./Dialogs/CategoryDialogBox.tsx";
import { useExpense } from "@/context/ExpenseProvider.tsx";

interface Props {
    data: Expense[] | undefined;
    isLoading: boolean
    error: Error | null;
}

const ExpenseSection = ({ data, error, isLoading }: Props) => {
    const [openRow, setOpenRow] = useState<number | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const { isAddBoxOpen, isAlertOpen, isDialogOpen, setIsAddBoxOpen, setIsDialogOpen, setIsAlertOpen, isCategoryOpen, setIsCategoryOpen, deleteExpense } = useExpense()

    useEffect(() => {
        const closePopup = () => setOpenRow(null);
        document.addEventListener("click", closePopup);

        return () => {
            document.removeEventListener("click", closePopup);
        };
    }, []);

    function toggleAction(e: MouseEvent, id: number | undefined) {
        e.stopPropagation();
        if(id) {
            setSelectedId(id);
            setOpenRow((prev) => (prev === id ? null : id))
        }
    }

    function openDialog() {
        setIsDialogOpen(true);
    }

    function openAlertDialog() {
        setIsAlertOpen(true);
    }

  return (
    <div className="col-span-2">
        <div className="flex items-center justify-between">
            <h3 className="font-semibold dark:text-white text-2xl">Latest Expense</h3>
            <button onClick={() => setIsAddBoxOpen(true)} className="bg-purple rounded-md px-3 py-2 hover:bg-purple/90 text-white dark:text-black transition-all">Add Expense</button>
        </div>
        <table className="w-full mt-5 border-2  border-zinc-100 dark:border-zinc-800 tab mx-auto text-left">
            <thead>
                <tr className="border-b-[1px] dark:text-white border-zinc-100 dark:border-zinc-900">
                    <th className="h-12 font-semibold max-sm:text-sm px-2 md:px-4">Amount</th>
                    <th className="h-12 font-semibold max-sm:text-sm px-2 md:px-4">Category</th>
                    <th className="h-12 font-semibold max-sm:text-sm px-2 md:px-4">Description</th>
                    <th className="h-12 font-semibold max-sm:text-sm px-2 md:px-4">Date Added</th>
                </tr>
            </thead>
            <tbody>
            {isLoading ? (
                    <tr>
                        <td colSpan={5} className="text-center text-white font-semibold text-3xl py-10">
                            Loading expenses...
                        </td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td colSpan={5} className="text-center text-red-400 font-semibold text-3xl py-10">
                            {error?.message || "No expenses found. Click Add Expense to create one."}
                        </td>
                    </tr>
                ) : (
                    data?.map((tableItem) => (
                        <tr className="border-b-[1px] dark:text-white border-zinc-100 dark:border-zinc-800 relative" key={tableItem.id}>
                            <td className="px-2 max-md:text-sm md:px-4 py-4 align-middle">₦{tableItem.amount}</td>
                            <td className="px-2 max-md:text-sm md:px-4 py-4 align-middle">{tableItem.category_name}</td>
                            <td className="px-2 max-md:text-sm md:px-4 py-4 align-middle">{tableItem.name}</td>
                            <td className="px-2 max-md:text-sm md:px-4 py-4 align-middle">{tableItem.date}</td>
                            <td className="px-2 max-md:text-sm md:px-4 py-4 align-middle">
                                <button
                                    onClick={(e) => toggleAction(e, tableItem.id)}
                                    className="flex items-center gap-1"
                                >
                                    <div className="w-1 h-1 md:w-[6px] md:h-[6px] bg-black dark:bg-white rounded-full"></div>
                                    <div className="w-1 h-1 md:w-[6px] md:h-[6px] bg-black dark:bg-white rounded-full"></div>
                                    <div className="w-1 h-1 md:w-[6px] md:h-[6px] bg-black dark:bg-white rounded-full"></div>
                                </button>
                            </td>
                            <ActionBox openRow={openRow} tableItemId={tableItem.id} openDialog={openDialog} openAlertDialog={openAlertDialog} />
                        </tr>
                    ))
                )}
            </tbody>
        </table>
        <Notification />
        <CategoryDialogBox isDialogOpen={isCategoryOpen} setIsDialogOpen={setIsCategoryOpen} />
        <AddDialogBox isAddBoxOpen={isAddBoxOpen} setIsAddBoxOpen={setIsAddBoxOpen} />
        <DialogBox isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        <DeleteDialogBox isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} deleteExpense={deleteExpense} selectedId={selectedId} />
    </div>
  )
}

export default ExpenseSection