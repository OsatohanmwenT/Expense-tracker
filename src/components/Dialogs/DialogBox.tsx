import * as React from "react";
import { cn } from "@/lib/utils.ts";
import { useMediaQuery } from "../../hooks/use-media-query.ts";
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

interface DialogDemoProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

export function DialogBox({ isDialogOpen, setIsDialogOpen }: DialogDemoProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const ProfileForm = ({ className }: React.ComponentProps<"form">) => (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label className="text-purple" htmlFor="email">Email</Label>
        <Input className="text-white border-zinc-800" type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label className="text-purple" htmlFor="username">Username</Label>
        <Input className="text-white border-zinc-800" id="username" defaultValue="@shadcn" />
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