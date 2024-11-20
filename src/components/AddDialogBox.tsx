import { useMediaQuery } from "../hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ExpenseForm from "@/components/ExpenseForm.tsx";
import { ExpenseFormSchema } from "./ExpenseFormSchema";
import Expense from "@/entities/Expense";

interface DialogDemoProps {
  isAddBoxOpen: boolean;
  setIsAddBoxOpen: (isOpen: boolean) => void;
}

function AddDialogBox({
  isAddBoxOpen,
  setIsAddBoxOpen,
}: DialogDemoProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const form = useForm({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues: {
      amount: "",
      description: "",
      category: "",
      date: ""
    },
  });

  const onSubmit = (data: Expense) => {
    console.log("Submitted Data:", data);
  };

  if (isDesktop) {
    return (
      <Dialog open={isAddBoxOpen} onOpenChange={setIsAddBoxOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
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
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Expense</DrawerTitle>
          <DrawerDescription>
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
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddDialogBox;
