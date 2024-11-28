import {MouseEvent, useEffect, useState} from "react"
import DialogBox from "./Dialogs/DialogBox.tsx";
import DeleteDialogBox from "./Dialogs/DeleteDialogBox.tsx";
import AddDialogBox from "./Dialogs/AddDialogBox.tsx";
import Notification from "@/components/Notification.tsx";
import useAxiosInstance from "@/services/apiClient.ts";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import Expense from "@/entities/Expense.ts";
import ActionBox from "@/components/ActionBox.tsx";

interface Props {
    data: Expense[] | undefined;
    error: Error | null;
}

const ExpenseSection = ({ data, error }: Props) => {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();
    const [openRow, setOpenRow] = useState<number | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAddBoxOpen, setIsAddBoxOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

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

    async function deleteExpense(id: number): Promise<void> {
        try {
            await axiosInstance.delete(`/expenses/${id}`);
            toast.success("Expense deleted!");
            queryClient.invalidateQueries({
                queryKey: ["expenses"]
            })
            setSelectedId(null)
        } catch {
            toast.error("Failed to delete the expense.");
        }
    }

  return (
    <div className="col-span-2">
        <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white text-2xl">Latest Expense</h3>
            <button onClick={() => setIsAddBoxOpen(true)} className="bg-purple rounded-md px-3 py-2 hover:bg-purple/90 transition-all">Add Expense</button>
        </div>
        <table className="w-full mt-5 border-2 border-zinc-800 tab mx-auto text-left">
            <thead>
                <tr className="border-b-[1px] text-white  border-zinc-900">
                    <th className="h-12 font-semibold px-2 md:px-4">Amount</th>
                    <th className="h-12 font-semibold px-2 md:px-4">Category</th>
                    <th className="h-12 font-semibold px-2 md:px-4">Description</th>
                    <th className="h-12 font-semibold px-2 md:px-4">Date Added</th>
                </tr>
            </thead>
            <tbody>
            {error ? (
                <tr>
                    <td colSpan={5} className="text-center text-red-400 font-semibold text-3xl py-10">
                        {error?.message || "No expenses found.  Click Add Expense to create one"}
                    </td>
                </tr>
            )
            :
                (
                    data?.map((tableItem) => (
                        <tr className="border-b-[1px] text-white border-zinc-800 relative" key={tableItem.id}>
                            <td className="px-2 max-md:text-sm md:px-4 py-4 align-middle">₦{tableItem.amount}</td>
                            <td className="px-2 max-md:text-sm md:px-4 py-4 align-middle">{tableItem.category_name}</td>
                            <td className="px-2 max-md:text-sm md:px-4 py-4 align-middle">{tableItem.description}</td>
                            <td className="px-2 max-md:text-sm md:px-4 py-4 align-middle">{tableItem.date}</td>
                            <td className="px-2 max-md:text-sm md:px-4 py-4 align-middle">
                                <button
                                    onClick={(e) => toggleAction(e, tableItem.id)}
                                    className="flex items-center gap-1"
                                >
                                    <div className="w-1 h-1 md:w-[6px] md:h-[6px] bg-white rounded-full"></div>
                                    <div className="w-1 h-1 md:w-[6px] md:h-[6px] bg-white rounded-full"></div>
                                    <div className="w-1 h-1 md:w-[6px] md:h-[6px] bg-white rounded-full"></div>
                                </button>
                            </td>
                                <ActionBox openRow={openRow} tableItemId={tableItem.id} openDialog={openDialog} openAlertDialog={openAlertDialog} />
                        </tr>
                    ))
                )
            }
            </tbody>
        </table>
        <Notification />
        <AddDialogBox isAddBoxOpen={isAddBoxOpen} setIsAddBoxOpen={setIsAddBoxOpen} />
        <DialogBox isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        <DeleteDialogBox isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} deleteExpense={deleteExpense} selectedId={selectedId} />
    </div>
  )
}

export default ExpenseSection