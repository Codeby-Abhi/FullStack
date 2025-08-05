import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../../components/layout/DashBoardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import { data } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosinstance';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';

const Income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false)

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch income details", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => { };

  const deleteIncome = async (id) => { };

  const handleDownloadIncome = async (id) => { };

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, [])

  return (
    <DashBoardLayout activeMenu={'Income'}>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transaction={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
        </div>

        <Modal
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashBoardLayout>
  )
}

export default Income;