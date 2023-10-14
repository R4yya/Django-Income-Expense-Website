let delayed;

const renderIncomeWeekChart = () => {
    fetch('income-week-summary')
        .then(res => res.json())
        .then(results => {
            const week_data = results.income_week_data;
            const [income_week_lables, incomes_week_data] = [
                Object.keys(week_data),
                Object.values(week_data)
            ];

            const income_week_chart_data = {
                labels: income_week_lables,
                datasets: [{
                    label: 'This week',

                    data: incomes_week_data,

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
                        'rgba(4, 110, 72, 1)',
                    ]
                }]
            };

            const income_week_chart_config = {
                type: 'line',
                data: income_week_chart_data,
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
            };

            const canvasWeekElement = document.getElementById('incomeThisWeekChart');

            if (canvasWeekElement) {
                const incomeWeekChart = new Chart(
                    document.getElementById('incomeThisWeekChart'),
                    income_week_chart_config
                );
            };
        });
};

const renderIncomeMonthChart = () => {
    fetch('income-month-summary')
        .then(res => res.json())
        .then(results => {
            const month_data = results.income_month_data;
            const [income_month_lables, incomes_month_data] = [
                Object.keys(month_data),
                Object.values(month_data)
            ];

            const income_month_chart_data = {
                labels: income_month_lables,
                datasets: [{
                    label: 'This month',

                    data: incomes_month_data,

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
                        'rgba(2, 42, 83, 1)',
                    ]
                }]
            };

            const income_month_chart_config = {
                type: 'line',
                data: income_month_chart_data,
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
            };

            const canvasMonthElement = document.getElementById('incomeThisMonthChart');

            if (canvasMonthElement) {
                const incomeMonthChart = new Chart(
                    document.getElementById('incomeThisMonthChart'),
                    income_month_chart_config
                );
            };
        });
};

const renderIncomeYearChart = () => {
    fetch('income-year-summary')
        .then(res => res.json())
        .then(results => {
            const year_data = results.income_year_data;
            const [income_year_lables, incomes_year_data] = [
                Object.keys(year_data),
                Object.values(year_data)
            ];

            const income_year_chart_data = {
                labels: income_year_lables,
                datasets: [{
                    label: 'This year',

                    data: incomes_year_data,

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
                        'rgba(186, 39, 74, 1)',
                    ]
                }]
            };

            const income_year_chart_config = {
                type: 'line',
                data: income_year_chart_data,
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
            };

            const canvasYearElement = document.getElementById('incomeThisYearChart');

            if (canvasYearElement) {
                const incomeYearChart = new Chart(
                    document.getElementById('incomeThisYearChart'),
                    income_year_chart_config
                );
            };
        });
};

const renderLongTermCharts = () => {
    renderIncomeWeekChart();
    renderIncomeMonthChart();
    renderIncomeYearChart();
};

document.onload = renderLongTermCharts();

function resetChart() {
    $('canvas').remove();

    $('.carousel-item.item-1.active').prepend('<canvas id="incomeThisWeekChart" class="d-block w-100 mb-5"></canvas>');
    $('.carousel-item.item-2.active').prepend('<canvas id="incomeThisMonthChart" class="d-block w-100 mb-5"></canvas>');
    $('.carousel-item.item-3.active').prepend('<canvas id="incomeThisYearChart" class="d-block w-100 mb-5"></canvas>');

    renderLongTermCharts();
}

$('#incomeStatsCarousel').on('slid.bs.carousel', function () {
    resetChart();
});
