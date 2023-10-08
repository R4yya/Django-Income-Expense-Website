const renderMonthChart = (data, labels) => {
    const ctx1 = document.getElementById('thisMonthChart').getContext('2d');

    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'This month',

                data: data,

                backgroundColor: [
                    'rgba(2, 42, 83, 0.2)',
                ],

                borderColor: [
                    'rgba(2, 42, 83, 1)',
                ],
                borderWidth: 1,

                fill: 'start',

                pointStyle: 'circle',
                pointBackgroundColor:[
                    'rgba(2, 42, 83, 1)'
                ]
            }]
        },
        options: {
            tension: 0.4,
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                },
            }
        }
    });
};

const renderYearChart = (data, labels) => {
    const ctx1 = document.getElementById('thisYearChart');

    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'This year',

                data: data,

                backgroundColor: [
                    'rgba(186, 39, 74, 0.2)',
                ],

                borderColor: [
                    'rgba(186, 39, 74, 1)',
                ],
                borderWidth: 1,

                fill: 'start',

                pointStyle: 'circle',
                pointBackgroundColor:[
                    'rgba(186, 39, 74, 1)'
                ]
            }]
        },
        options: {
            tension: 0.4,
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                },
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

            renderMonthChart(data, lables);
    });
    fetch('expense-year-summary')
        .then(res=>res.json())
        .then(results => {
            const year_data = results.expense_year_data;
            const [lables, data] = [
                Object.keys(year_data),
                Object.values(year_data)
            ];

            renderYearChart(data, lables);
    });
};

document.onload = getChartData();