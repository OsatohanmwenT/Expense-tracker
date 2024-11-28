interface Props {
    openRow: number | null;
    tableItemId: number | undefined;
    openDialog: () => void;
    openAlertDialog: () => void;
}

const ActionBox = ({ openRow, openDialog, openAlertDialog, tableItemId }: Props) => {
    return (
        <div
            className={`absolute mt-2 text-white right-10 sm:right-12 md:right-24 -translate-x-5 shadow-lg bg-zinc-900 rounded-lg flex flex-col transition-all ${
                openRow === tableItemId ? "opacity-100 z-10" : "opacity-0 translate-y-2 -z-10"
            }`}
        >
            <p className="pl-2 w-[100px] py-3 font-semibold border-zinc-800 border-b-[1px]">Action</p>
            <button
                onClick={openDialog}
                className="font-semibold text-left pl-2 pr-6 py-3 border-zinc-800 border-b-[1px]"
            >
                Edit
            </button>
            <button
                onClick={openAlertDialog}
                className="font-semibold text-left pl-2 pr-6 py-3"
            >
                Delete
            </button>
        </div>
    )
}

export default ActionBox