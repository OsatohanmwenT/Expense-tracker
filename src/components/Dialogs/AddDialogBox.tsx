import { useMediaQuery } from "@/hooks/use-media-query.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ExpenseForm from "@/components/ExpenseForm.tsx";
import { ExpenseFormSchema } from "../ExpenseFormSchema.ts";
import Expense from "@/entities/Expense.ts";
import usePostExpense from "@/hooks/usePostExpense.ts";

interface DialogDemoProps {
  isAddBoxOpen: boolean;
  setIsAddBoxOpen: (isOpen: boolean) => void;
}


function AddDialogBox({
  isAddBoxOpen,
  setIsAddBoxOpen,
}: DialogDemoProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { mutate: postExpense } = usePostExpense();

  const form = useForm({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues: {
      amount: "",
      name: "",
      category_name: "",
      date: ""
    },
  });

  const onSubmit = (data: Expense) => {
    postExpense(data, {
      onSuccess: () => {
        form.reset();
        setIsAddBoxOpen(false);
      },
    });
  };

  if (isDesktop) {
    return (
      <Dialog open={isAddBoxOpen} onOpenChange={setIsAddBoxOpen}>
        <DialogContent className="sm:max-w-[425px] dark:bg-black dark:text-white dark:border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-purple">Add Expense</DialogTitle>
            <DialogDescription>
              Fill in the details below and submit
            </DialogDescription>
          </DialogHeader>
          <ExpenseForm
              className={isDesktop ? undefined : "px-4"}
              form={form}
              onSubmit={onSubmit}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isAddBoxOpen} onOpenChange={setIsAddBoxOpen}>
      <DrawerContent className="dark:dark dark:text-white">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-white">Add Expense</DrawerTitle>
          <DrawerDescription className="text-purple">
            Fill in the details below and submit
          </DrawerDescription>
        </DrawerHeader>
        <ExpenseForm
            className={isDesktop ? undefined : "px-4"}
            form={form}
            onSubmit={onSubmit}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="bg-purple text-white" variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddDialogBox;
