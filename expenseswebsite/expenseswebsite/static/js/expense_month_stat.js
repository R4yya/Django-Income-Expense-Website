const renderChart = (data, labels) => {
    const ctx = document.getElementById('thisMonthChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'This month',

                data: data,

                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],

                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,

                fill: 'start',

                pointStyle: 'circle',
                pointBackgroundColor:[
                    'rgba(255, 99, 132, 1)'
                ]
            }]
        },
        options: {
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

const getChartData = () => {
    fetch('expense-month-summary')
        .then(res=>res.json())
        .then(results => {
            const month_data = results.expense_month_data;
            const [lables, data] = [
                Object.keys(month_data),
                Object.values(month_data)
            ];

            renderChart(data, lables);
    });
};

document.onload = getChartData();