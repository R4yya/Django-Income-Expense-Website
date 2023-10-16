let delayed;

const renderComparativeMonthChart = () => {
    fetch('comparative-stat-month')
        .then(res => res.json())
        .then(results => {
            const expenses_to_compare_month = results.comparative_data_month.expenses;
            const [lables_expenses_to_compare_month, data_expenses_to_compare_month] = [
                Object.keys(expenses_to_compare_month),
                Object.values(expenses_to_compare_month)
            ];

            const income_to_compare_month = results.comparative_data_month.income;
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
                        'rgba(146, 20, 12, 0.2)',
                    ],

                    borderColor: [
                        'rgba(146, 20, 12, 1)',
                    ],
                    borderWidth: 2,
                    borderRadius: 2,

                    pointStyle: 'rect'
                },
                {
                    label: 'Income',

                    data: data_income_to_compare_month,

                    backgroundColor: [
                        'rgba(5, 136, 71, 0.2)',
                    ],

                    borderColor: [
                        'rgba(5, 136, 71, 1)',
                    ],
                    borderWidth: 2,
                    borderRadius: 2,
                    
                    pointStyle: 'rect'
                }
                ]
            };

            const comparative_month_chart_config = {
                type: 'bar',
                data: comparative_month_chart_data,
                options: {
                    responsive: true,
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
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Сomparative graph of both expenses and income'
                        },
                        subtitle: {
                            display: true,
                            text: 'This month (' + this_month + ')'
                        },
                        legend: {
                            labels: {
                                usePointStyle: true,
                            }
                        }
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
