import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../../components/layout/DashBoardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [Loading, setLoading] = useState(true);

  const fetchdeshboardData = async () => {
    if (Loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchdeshboardData();
    return () => {
    }
  }, [])


  return (
    <DashBoardLayout activeMenu="dashboard">
      <div className='my-5 mx-auto'>Home</div>
    </DashBoardLayout>
  )
}

export default Home;