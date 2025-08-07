import React, { useState, useEffect } from 'react';
import { LuRefreshCw } from 'react-icons/lu';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashBoardLayout from '../../components/layout/DashBoardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';

const Ai = () => {
    useUserAuth();

    const [dashboardData, setDashboardData] = useState(null);
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const genAI = new GoogleGenerativeAI("AIzaSyAhjlevH0_Icgi9XSc0dgjaT2ZMToF1-oI");

    const fetchDashboardData = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
            setDashboardData(response.data);
            if (response.data) {
                generateAiAdvice(response.data);
            }
        } catch (err) {
            setError('Failed to fetch dashboard data');
            console.error(err);
        }
    };

    const generateAiAdvice = async (data) => {
        try {
            setLoading(true);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const prompt = `
                You are a finance Expert show my 
                Total Income: $${data.totalIncome}
                Total Expenses: $${data.totalExpense}
                Current Balance: $${data.totalBalance} 
                based this given json data give me tips for saving more if its not an ideal spending
                suggest me to collect emergancy fund and how much to collect if its i dont have than suggest me where can i invest money which i haveing right now 
                make sure to keep it shorter and well structured thus it can be easy to read keep the text plain don't make anthing bold or highlight
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            setAiResponse(response.text());
        } catch (err) {
            setError('Failed to generate AI advice');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleRefresh = async () => {
        if (dashboardData) {
            setAiResponse('');
            await generateAiAdvice(dashboardData);
        }
    };

    return (
        <DashBoardLayout activeMenu="ai-advisor">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">AI Financial Advisor</h2>
                    <button
                        className="add-btn flex items-center gap-2"
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        <LuRefreshCw className={`text-lg ${loading ? 'animate-spin' : ''}`} />
                        Refresh Advice
                    </button>
                </div>

                {loading && (
                    <div className="animate-pulse text-center p-4">
                        Analyzing your financial data...
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {aiResponse && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">Financial Analysis & Recommendations</h3>
                        <div className="prose max-w-none">
                            {aiResponse.split('\n').map((line, index) => (
                                <p key={index} className="mb-2">{line}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </DashBoardLayout>
    );
};

export default Ai;