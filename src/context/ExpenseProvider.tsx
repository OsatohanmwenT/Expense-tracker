import { createContext, ReactNode, useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosInstance from "@/services/apiClient.ts";

interface ExpenseContextType {
  deleteExpense: (id: number) => Promise<void>;
  isDialogOpen: boolean;
  isCategoryOpen: boolean;
  isAddBoxOpen: boolean;
  isAlertOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  setIsCategoryOpen: (isOpen: boolean) => void;
  setIsAddBoxOpen: (isOpen: boolean) => void;
  setIsAlertOpen: (isOpen: boolean) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAddBoxOpen, setIsAddBoxOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const deleteExpense = async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/expenses/${id}`);
      toast.success("Expense deleted!");
      queryClient.invalidateQueries({ queryKey: [["expenses", "summary"]] });
    } catch {
      toast.error("Failed to delete the expense.");
    }
  };

  const context = {
    deleteExpense,
    setIsAddBoxOpen,
    isAddBoxOpen,
    isAlertOpen,
    isCategoryOpen,
    isDialogOpen,
    setIsAlertOpen,
    setIsCategoryOpen,
    setIsDialogOpen,
  };

  return (
    <ExpenseContext.Provider value={context}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};
