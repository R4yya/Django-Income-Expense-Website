let delayed;

const renderComparativeMonthChart = () => {
    fetch('comparative-stat')
        .then(res => res.json())
        .then(results => {
            const expenses_to_compare_month = results.comparative_data.expenses;
            const [lables_expenses_to_compare_month, data_expenses_to_compare_month] = [
                Object.keys(expenses_to_compare_month),
                Object.values(expenses_to_compare_month)
            ];

            const income_to_compare_month = results.comparative_data.income;
            const [lables_income_to_compare_month, data_income_to_compare_month] = [
                Object.keys(income_to_compare_month),
                Object.values(income_to_compare_month)
            ];

            const comparative_month_chart_data = {
                labels: lables_expenses_to_compare_month,
                datasets: [
                {
                    label: 'Expenses',

                    data: data_expenses_to_compare_month,

                    backgroundColor: [
                        'rgba(4, 110, 72, 1)',
                    ],

                    borderRadius: 2,

                    fill: 'start',

                    pointBackgroundColor:[
                        'rgba(4, 110, 72, 1)'
                    ]
                },
                {
                    label: 'Income',

                    data: data_income_to_compare_month,

                    backgroundColor: [
                        'rgba(196, 92, 94, 0.2)',
                    ],

                    borderColor: [
                        'rgba(196, 92, 94, 1)',
                    ],
                    borderWidth: 2,
                    borderRadius: 2,

                    fill: 'start',

                    pointBackgroundColor:[
                        'rgba(4, 110, 72, 1)'
                    ]
                }
                ]
            };

            const comparative_month_chart_config = {
                type: 'bar',
                data: comparative_month_chart_data,
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
                    }
                }
            };

            const comparativeMonthChart = new Chart(
                document.getElementById('comparativeMonthChart'),
                comparative_month_chart_config
            );
        });
};

document.onload = renderComparativeMonthChart();
