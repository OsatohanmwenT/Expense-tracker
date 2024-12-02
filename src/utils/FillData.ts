import {format, addMonths} from "date-fns";

export type FillDataType = {
    month: string;
    totalAmount: number;
    totalSpent: number
}

const fillData = (data: FillDataType[], maxLength: number) => {
    const fillerData = { month: "N/A", totalAmount: 0, totalSpent: 0 };
    const currentMonth = new Date(); // Get the current date
    const repeatCount = maxLength - data.length;

    for (let i = 0; i < repeatCount; i++) {
        const monthName = format(addMonths(currentMonth, i), "MMM");
        data.push({ ...fillerData, month: monthName });
    }

    return data;
};

export default fillData;