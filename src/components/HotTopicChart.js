import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axiosClient from "../utils/axiosHelper";

ChartJS.register(ArcElement, Tooltip, Legend);

// 커스텀 차트 레이블 생성
const chartLabel = {
    id: 'centerLabel',
    afterDatasetsDraw(chart) {
        const { ctx, data } = chart;
        chart.data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach((element, index) => {
                const label = data.labels[index];
                const radius = element.outerRadius * 0.7;
                const midAngle = (element.startAngle + element.endAngle) / 2;
                const labelX = element.x + radius * Math.cos(midAngle);
                const labelY = element.y + radius * Math.sin(midAngle);

                // 레이블 그리기
                ctx.fillStyle = '#000'; // 글자 색상
                ctx.font = 'bold 12px Arial'; // 글자 스타일
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, labelX, labelY);
            });
        });
    },
};

ChartJS.register(chartLabel);

const HotTopicChart = ({onTopicSelect}) => {
    // ****************     init values      **************** //
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ],
                borderColor: '#fff',
                borderWidth: 5,
            },
        ],
    });

    // ****************     loading(rendering) hook      **************** //
    useEffect(() => {
        axiosClient.get('/api/keyword/hot')
            .then(response => {
                const keywordFrequency = response.data

                // 가져온 데이터를 차트 데이터에 반영
                setChartData(prevChartData => ({
                    ...prevChartData,
                    labels: keywordFrequency.map(item => item.keyword), // keyword 목록을 labels로 설정
                    datasets: [
                        {
                            ...prevChartData.datasets[0],
                            data: keywordFrequency.map(item => item.frequency) // frequency를 data로 설정
                        }
                    ]
                }));

                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching chart data: " + error);
                setLoading(false);
            });

        setTimeout(() => {
        });
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // 범례 숨기기
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        return '';
                    },
                },
            },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const chart = elements[0].element.$context;
                const topic = chartData.labels[chart.index];
                handleTopicClick(topic)
            }
        },
    };

    // ****************     component event handler      **************** //
    const handleTopicClick = (topicParam) => {
        onTopicSelect(topicParam);
    };

    // ****************     UI      **************** //
    return (
        <div>
            {!loading && (
                <div style={{ height: '600px' }}>
                    <Pie data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default HotTopicChart;
