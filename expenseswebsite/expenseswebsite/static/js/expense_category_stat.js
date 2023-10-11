const renderCategoryChart = () => {
    fetch('expense-category-summary')
        .then(res => res.json())
        .then(results => {
            const category_data = results.expense_category_data;
            const [expenses_lables, expenses_data] = [
                Object.keys(category_data),
                Object.values(category_data)
            ];

            const category_chart_data = {
                labels: expenses_lables,
                datasets: [{
                    label: 'Amount',
                    data: expenses_data,
                    backgroundColor: [
                        'rgba(197, 59, 92, 0.5)',
                        'rgba(245,123,108, 0.5)',
                        'rgba(251,175,105, 0.5)',
                        'rgba(255,209,102, 0.5)',
                        'rgba(131,212,131, 0.5)',
                        'rgba(6,214,160, 0.5)',
                        'rgba(12,176,169, 0.5)',
                        'rgba(17,138,178, 0.5)',
                        'rgba(7,59,76, 0.5)'
                    ],
                    borderColor: [
                        'rgba(197, 59, 92, 1)',
                        'rgba(245,123,108, 1)',
                        'rgba(251,175,105, 1)',
                        'rgba(255,209,102, 1)',
                        'rgba(131,212,131, 1)',
                        'rgba(6,214,160, 1)',
                        'rgba(12,176,169, 1)',
                        'rgba(17,138,178, 1)',
                        'rgba(7,59,76, 1)'
                    ],
                borderWidth: 3,
                hoverOffset: 10
                }]
            };

            const category_chart_config = {
                type: 'doughnut',
                data: category_chart_data,
                options: {
                    responsive: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Expenses per category'
                        },
                        subtitle: {
                            display: true,
                            text: 'Last month',
                            padding: {
                                bottom: 10
                            }
                        },
                    }
                }
            };

            const CategoryChart = new Chart(
                document.getElementById('categoryChart'),
                category_chart_config
            );
    });
};

document.onload = renderCategoryChart();


