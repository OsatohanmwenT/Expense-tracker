import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog.tsx"

  interface Props {
    isAlertOpen: boolean;
    setIsAlertOpen: (isAlertOpen: boolean) => void;
    selectedId: number | null;
    deleteExpense: (id: number) => void;
  }
  
  function DeleteDialogBox({ isAlertOpen, setIsAlertOpen, deleteExpense, selectedId }:Props) {
      const handleDelete = () => {
          if (selectedId !== null) {
              deleteExpense(selectedId);
              setIsAlertOpen(false);
          }
      };

    return (
      <AlertDialog open={isAlertOpen} >
        <AlertDialogContent className="dark:bg-zinc-900 dark:border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-600">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-purple hover:bg-red-600" onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }  

export default DeleteDialogBox