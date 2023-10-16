let delayed;

const renderComparativeChart = () => {
    fetch('comparative-stat')
        .then(res => res.json())
        .then(results => {
            const expenses_to_compare_data = results.comparative_data.expenses;
            const [lables_expenses_to_compare, data_expenses_to_compare] = [
                Object.keys(expenses_to_compare_data),
                Object.values(expenses_to_compare_data)
            ];

            const income_to_compare_data = results.comparative_data.income;
            const [lables_income_to_compare, data_income_to_compare] = [
                Object.keys(income_to_compare_data),
                Object.values(income_to_compare_data)
            ];

            const comparative_chart_data = {
                labels: lables_expenses_to_compare,
                datasets: [
                {
                    label: 'Expenses',

                    data: data_expenses_to_compare,

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

                    data: data_income_to_compare,

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

            const comparative_chart_config = {
                type: 'bar',
                data: comparative_chart_data,
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

            const comparativeChart = new Chart(
                document.getElementById('comparativeChart'),
                comparative_chart_config
            );
        });
};

document.onload = renderComparativeChart();
