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

                    backgroundColor: [
                        'rgba(4, 110, 72, 0.2)',
                    ],

                    borderColor: [
                        'rgba(4, 110, 72, 1)',
                    ],
                    borderWidth: 2,

                    pointBackgroundColor:[
                        'rgba(4, 110, 72, 1)'
                    ]
                },
                {
                    label: 'Income',

                    data: data_income_to_compare_year,

                    backgroundColor: [
                        'rgba(196, 92, 94, 0.2)',
                    ],

                    borderColor: [
                        'rgba(196, 92, 94, 1)',
                    ],
                    borderWidth: 2,

                    pointBackgroundColor:[
                        'rgba(196, 92, 94, 1)'
                    ]
                }
                ]
            };

            const comparative_year_chart_config = {
                type: 'line',
                data: comparative_year_chart_data,
                options: {
                    responsive: false,
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
