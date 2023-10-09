const renderCategoryChart = (data, labels) => {
    const ctx = document.getElementById('categoryChart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Amount',
                data: data,
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
        },
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
    });
};

const renderIncomeChart = (data, labels) => {
    const ctx = document.getElementById('sourceChart').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Amount',
                data: data,
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
        },
        options: {
            responsive: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Income per source'
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
    });
};

const getChartsData = () => {
    fetch('expense-category-summary')
        .then(res => res.json())
        .then(results => {
            const category_data = results.expense_category_data;
            const [lables, data] = [
                Object.keys(category_data),
                Object.values(category_data)
            ];

            renderCategoryChart(data, lables);
    });

    fetch('/income/income-source-summary')
        .then(res => res.json())
        .then(results => {
            const source_data = results.income_source_data;
            const [lables, data] = [
                Object.keys(source_data),
                Object.values(source_data)
            ];

            renderIncomeChart(data, lables);
    });
};

document.onload = getChartsData();
