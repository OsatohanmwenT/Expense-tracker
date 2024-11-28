interface FillData {
    budgetName: string;
    totalAmount: number;
    totalSpent: number
}

const fillData = (data: FillData[], maxLength: number) => {
    const fillerData = { budgetName: "N/A", totalAmount: 0, totalSpent: 0 };
    const repeatCount = maxLength - data.length;


    for (let i = 0; i < repeatCount; i++) {
        data.push({ ...fillerData, budgetName: `Dummy ${i + 1}` });
    }

    return data;
};

export default fillData;