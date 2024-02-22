import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

const PieChart = () => {
    const [transactionData, setTransactionData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.bitaps.com/btc/v1/blockchain/address/transactions/1UiW61F9xnBnnC1J69aPJhFm3ZXvZEkCm');
                setTransactionData(response.data.data.list);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    const processData = () => {
        if (!transactionData) return {};

        const utxoCount = transactionData.filter(tx => tx.confirmations === 0).length;
        const spentCount = transactionData.filter(tx => tx.confirmations > 0).length;
        const confirmedCount = transactionData.filter(tx => tx.confirmations > 6).length;
        const unconfirmedCount = transactionData.filter(tx => tx.confirmations <= 6).length;

        return {
            labels: ['UTXO', 'Spent', 'Confirmed', 'Unconfirmed'],
            datasets: [
                {
                    data: [utxoCount, spentCount, confirmedCount, unconfirmedCount],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                },
            ],
        };
    };

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center' }}>Pie Chart for Bitcoin Transactions</h2>
            <div style={{ textAlign: 'center' }}>
                {transactionData && (
                    <Pie
                        data={processData()}
                        width={400}
                        height={400}
                        options={{
                            maintainAspectRatio: false,
                            legend: {
                                position: 'right',
                                labels: {
                                    fontSize: 14,
                                    fontColor: '#333',
                                },
                            },
                        }}
                    />
                )}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <ul>
                    <li><span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#FF6384', marginRight: '5px' }}></span>UTXO</li>
                    <li><span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#36A2EB', marginRight: '5px' }}></span>Spent</li>
                    <li><span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#FFCE56', marginRight: '5px' }}></span>Confirmed</li>
                    <li><span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#4BC0C0', marginRight: '5px' }}></span>Unconfirmed</li>
                </ul>
            </div>
        </div>
    );
};

export default PieChart;