let delayed;

const renderExpenseWeekChart = () => {
    fetch('expense-week-summary')
        .then(res => res.json())
        .then(results => {
            const week_data = results.expense_week_data;
            const [expense_week_lables, expenses_week_data] = [
                Object.keys(week_data),
                Object.values(week_data)
            ];

            const expense_week_chart_data = {
                labels: expense_week_lables,
                datasets: [{
                    label: 'This week',

                    data: expenses_week_data,

                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,

                    backgroundColor: [
                        'rgba(5, 136, 71, 0.2)',
                    ],

                    borderColor: [
                        'rgba(5, 136, 71, 1)',
                    ],
                    borderWidth: 1,

                    pointStyle: 'rect',
                    pointRadius: 2,
                    pointBackgroundColor:[
                        'rgba(5, 136, 71, 1)'
                    ],

                    fill: 'start'
                }]
            };

            const expense_week_chart_config = {
                type: 'line',
                data: expense_week_chart_data,
                options: {
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
                    },
                    plugins: {
                        legend: {
                            labels: {
                                usePointStyle: true,
                            }
                        }
                    }
                }
            };

            const canvasWeekElement = document.getElementById('expenseThisWeekChart');

            if (canvasWeekElement) {
                const expenseWeekChart = new Chart(
                    document.getElementById('expenseThisWeekChart'),
                    expense_week_chart_config
                );
            };
        });
};

const renderExpenseMonthChart = () => {
    fetch('expense-month-summary')
        .then(res => res.json())
        .then(results => {
            const month_data = results.expense_month_data;
            const [expense_month_lables, expenses_month_data] = [
                Object.keys(month_data),
                Object.values(month_data)
            ];

            const expense_month_chart_data = {
                labels: expense_month_lables,
                datasets: [{
                    label: 'This month',

                    data: expenses_month_data,

                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,

                    backgroundColor: [
                        'rgba(2, 42, 83, 0.2)',
                    ],

                    borderColor: [
                        'rgba(2, 42, 83, 1)',
                    ],
                    borderWidth: 1,

                    pointStyle: 'rect',
                    pointRadius: 2,
                    pointBackgroundColor:[
                        'rgba(2, 42, 83, 1)'
                    ],

                    fill: 'start'
                }]
            };

            const expense_month_chart_config = {
                type: 'line',
                data: expense_month_chart_data,
                options: {
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
                    },
                    plugins: {
                        legend: {
                            labels: {
                                usePointStyle: true,
                            }
                        }
                    }
                }
            };

            const canvasMonthElement = document.getElementById('expenseThisMonthChart');

            if (canvasMonthElement) {
                const expenseMonthChart = new Chart(
                    document.getElementById('expenseThisMonthChart'),
                    expense_month_chart_config
                );
            };
        });
};

const renderExpenseYearChart = () => {
    fetch('expense-year-summary')
        .then(res => res.json())
        .then(results => {
            const year_data = results.expense_year_data;
            const [expense_year_lables, expenses_year_data] = [
                Object.keys(year_data),
                Object.values(year_data)
            ];

            const expense_year_chart_data = {
                labels: expense_year_lables,
                datasets: [{
                    label: 'This year',

                    data: expenses_year_data,

                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,

                    backgroundColor: [
                        'rgba(146, 20, 12, 0.2)',
                    ],

                    borderColor: [
                        'rgba(146, 20, 12, 1)',
                    ],
                    borderWidth: 1,

                    pointStyle: 'rect',
                    pointRadius: 2,
                    pointBackgroundColor:[
                        'rgba(146, 20, 12, 1)'
                    ],

                    fill: 'start'
                }]
            };

            const expense_year_chart_config = {
                type: 'line',
                data: expense_year_chart_data,
                options: {
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
                    },
                    plugins: {
                        legend: {
                            labels: {
                                usePointStyle: true,
                            }
                        }
                    }
                }
            };

            const canvasYearElement = document.getElementById('expenseThisYearChart');

            if (canvasYearElement) {
                const expenseYearChart = new Chart(
                    document.getElementById('expenseThisYearChart'),
                    expense_year_chart_config
                );
            };
        });
};

const renderLongTermCharts = () => {
    renderExpenseWeekChart();
    renderExpenseMonthChart();
    renderExpenseYearChart();
};

document.onload = renderLongTermCharts();

function resetChart() {
    $('canvas').remove();

    $('.carousel-item.item-1.active').prepend('<canvas id="expenseThisWeekChart" class="d-block w-100 mb-5"></canvas>');
    $('.carousel-item.item-2.active').prepend('<canvas id="expenseThisMonthChart" class="d-block w-100 mb-5"></canvas>');
    $('.carousel-item.item-3.active').prepend('<canvas id="expenseThisYearChart" class="d-block w-100 mb-5"></canvas>');

    renderLongTermCharts();
}

$('#expenseStatsCarousel').on('slid.bs.carousel', function () {
    resetChart();
});
