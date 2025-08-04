import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875cf5", "#fc3d3d", "#fa7c2d"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    const balancedata = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expense", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];

    return <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg '>Financial Overview</h5>
        </div>

        <CustomPieChart
            data={balancedata}
            label="total Balance"
            totalAmount={`$${totalBalance}`}
            colors={COLORS}
            showTextAnchor
        />

    </div>;
}

export default FinanceOverview