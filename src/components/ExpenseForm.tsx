import {FormProvider, UseFormReturn} from "react-hook-form";
import {cn} from "@/lib/utils.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FormField} from "@/components/ui/form.tsx";
import SelectInput from "@/components/SelectInput.tsx";
import CalenderInput from "@/components/CalenderInput.tsx";
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {ExpenseFormData} from "@/components/ExpenseFormSchema.ts";

interface ExpenseFormProps {
    className?: string;
    form: UseFormReturn<ExpenseFormData>;
    onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = React.memo(({ className, form, onSubmit }: ExpenseFormProps) => {
    return (
        <FormProvider {...form}>
            <form
                className={cn("grid items-start gap-4 dark", className)}
                onSubmit={form.handleSubmit(onSubmit)}
            >
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" {...form.register("amount")} />
                            {form.formState.errors.amount && (
                                <p className="text-red-500 text-[12px]">
                                    {form.formState.errors.amount.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" {...form.register("description")} />
                            {form.formState.errors.description && (
                                <p className="text-red-500 text-[12px]">
                                    {form.formState.errors.description.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <FormField
                                control={form.control}
                                name="category_name"
                                render={({field}) => <SelectInput field={field}/>}
                            />
                            {form.formState.errors.category_name && (
                                <p className="text-red-500 text-[12px]">
                                    {form.formState.errors.category_name.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="date">Date</Label>
                            <FormField
                                control={form.control}
                                name="date"
                                render={({field}) => <CalenderInput field={field}/>}
                            />
                            {form.formState.errors.date && (
                                <p className="text-[12px] text-red-500">
                                    {form.formState.errors.date.message}
                                </p>
                            )}
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </FormProvider>
    );
});


export default ExpenseForm;