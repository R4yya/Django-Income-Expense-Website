const renderComparativeYearChart = () => {
    fetch('comparative-stat')
        .then(res => res.json())
        .then(results => {
            const expenses_to_compare_year = results.comparative_data.expenses;
            const [lables_expenses_to_compare_year, data_expenses_to_compare_year] = [
                Object.keys(expenses_to_compare_year),
                Object.values(expenses_to_compare_year)
            ];

            const income_to_compare_year = results.comparative_data.income;
            const [lables_income_to_compare_year, data_income_to_compare_year] = [
                Object.keys(income_to_compare_year),
                Object.values(income_to_compare_year)
            ];

            const comparative_year_chart_data = {
                labels: lables_expenses_to_compare_year,
                datasets: [
                {
                    label: 'Expenses',

                    data: data_expenses_to_compare_year,

                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,

                    backgroundColor: [
                        'rgba(146, 20, 12, 0.2)',
                    ],

                    borderColor: [
                        'rgba(146, 20, 12, 1)',
                    ],
                    borderWidth: 2,

                    pointStyle: 'rect',
                    pointRadius: 2,
                    pointBackgroundColor:[
                        'rgba(146, 20, 12, 1)'
                    ],

                    fill: 'start',
                },
                {
                    label: 'Income',

                    data: data_income_to_compare_year,

                    cubicInterpolationMode: 'monotone',
                    tension: 0.4,

                    backgroundColor: [
                        'rgba(5, 136, 71, 0.2)',
                    ],

                    borderColor: [
                        'rgba(5, 136, 71, 1)',
                    ],
                    borderWidth: 2,

                    pointStyle: 'rect',
                    pointRadius: 2,
                    pointBackgroundColor:[
                        'rgba(5, 136, 71, 1)'
                    ],

                    fill: 'start',
                }
                ]
            };

            const comparative_year_chart_config = {
                type: 'line',
                data: comparative_year_chart_data,
                options: {
                    responsive: true,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
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

            const comparativeYearChart = new Chart(
                document.getElementById('comparativeYearChart'),
                comparative_year_chart_config
            );
        });
};

document.onload = renderComparativeYearChart();
