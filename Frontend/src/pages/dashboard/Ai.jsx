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

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

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
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

            const prompt = `You are a financial advisor. Based on the following financial summary (All summery is in USD), provide concise and easy-to-read advice.
                            Do not use any markdown like bolding or highlights. Keep the text plain.

                           Financial Summary:
                           - Total Income: $${data.totalIncome}
                           - Total Expenses: $${data.totalExpense}
                           - Current Balance: $${data.totalBalance}

                           Please provide:
                           1. Tips for saving more money if current spending is not ideal also point where should cutoff the spending.
                           2. Recommendations for an emergency fund (if one is needed) and how much to save (atleast of $3,600 to $6,500).
                           3. Suggestions on where to invest the current balance.
                         `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            setAiResponse(response.text());
        } catch (err) {
            setError('Failed to generate AI advice');
            console.error(err);
        } finally {
            setLoading(false);
            setError(null)
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
                        <div className="prose max-w-none text-gray-700">
                            <p className="whitespace-pre-wrap">{aiResponse}</p>
                        </div>
                    </div>
                )}
            </div>
        </DashBoardLayout>
    );
};

export default Ai;