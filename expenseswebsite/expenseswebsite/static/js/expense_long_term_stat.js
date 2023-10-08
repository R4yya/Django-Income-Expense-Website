let delayed;

const renderWeekChart = (data, labels) => {
    const ctx = document.getElementById('thisWeekChart').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'This week',

                data: data,

                backgroundColor: [
                    'rgba(4, 110, 72, 0.2)',
                ],

                borderColor: [
                    'rgba(4, 110, 72, 1)',
                ],
                borderWidth: 1,

                fill: 'start',

                pointStyle: 'circle',
                pointBackgroundColor:[
                    'rgba(4, 110, 72, 1)'
                ]
            }]
        },
        options: {
            tension: 0.15,
            responsive: false,
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                      delay = context.dataIndex * 100 + context.datasetIndex * 100;
                    }
                    return delay;
                },
            },
            scales: {
                y: {
                    beginAtZero: true
                },
            }
        }
    });
};

const renderMonthChart = (data, labels) => {
    const ctx = document.getElementById('thisMonthChart').getContext('2d');

    new Chart(ctx, {
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
            tension: 0.15,
            responsive: false,
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                      delay = context.dataIndex * 100 + context.datasetIndex * 100;
                    }
                    return delay;
                },
            },
            scales: {
                y: {
                    beginAtZero: true
                },
            }
        }
    });
};

const renderYearChart = (data, labels) => {
    const ctx = document.getElementById('thisYearChart').getContext('2d');

    new Chart(ctx, {
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
            tension: 0.15,
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                      delay = context.dataIndex * 100 + context.datasetIndex * 100;
                    }
                    return delay;
                },
            },
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
        .then(res => res.json())
        .then(results => {
            const month_data = results.expense_month_data;
            const [lables, data] = [
                Object.keys(month_data),
                Object.values(month_data)
            ];

            renderMonthChart(data, lables);
        });

    fetch('expense-year-summary')
        .then(res => res.json())
        .then(results => {
            const year_data = results.expense_year_data;
            const [lables, data] = [
                Object.keys(year_data),
                Object.values(year_data)
            ];

            renderYearChart(data, lables);
        });

    fetch('expense-week-summary')
        .then(res => res.json())
        .then(results => {
            const week_data = results.expense_week_data;
            const [lables, data] = [
                Object.keys(week_data),
                Object.values(week_data)
            ];

            renderWeekChart(data, lables);
        });
};

document.onload = getChartData();
