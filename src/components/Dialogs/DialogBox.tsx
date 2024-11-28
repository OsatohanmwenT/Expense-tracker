import * as React from "react";
import { cn } from "@/lib/utils.ts";
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
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {Controller, useForm} from "react-hook-form";
import formSchema, {formData} from "@/components/EditFormSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import SelectInput from "@/components/Inputs/SelectInput.tsx";
import {ExpenseUpdate} from "@/entities/Expense.ts";

interface DialogDemoProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

export function DialogBox({ isDialogOpen, setIsDialogOpen }: DialogDemoProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { control, handleSubmit, register, formState: {errors}, } = useForm<formData>({
    resolver: zodResolver(formSchema)
  });

  const submitForm = (data: ExpenseUpdate) => {
    setIsDialogOpen(false);
    console.log(data);
  }

  const ProfileForm = ({ className }: React.ComponentProps<"form">) => (
    <form onSubmit={handleSubmit(submitForm)} className={cn("grid items-start gap-4 text-white", className)}>
      <div className="grid gap-2">
        <Label htmlFor="amount" className="text-purple">Amount</Label>
        <Input
            id="amount"
            className="text-white border-zinc-400 focus:border-white"
            {...register("amount")}
        />
        {errors.amount && (
            <span className="text-red-500 text-sm">{errors.amount.message}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description" className="text-purple">Description</Label>
        <Input
            id="description"
            className="text-white border-zinc-400 focus:border-white"
            {...register("description")}
        />
        {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
        )}
      </div>
      <div>
        <Label className="text-purple" htmlFor="email">Category</Label>
        <Controller name="category" control={control} render={({field}) => (
            <SelectInput field={field} />
        )} />
      </div>
      <Button className="bg-purple hover:bg-purple/80" type="submit">Save changes</Button>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] border-zinc-800 bg-zinc-900">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Profile</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DialogBox
