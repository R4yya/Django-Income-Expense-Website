function handleHover(evt, item, legend) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
    if (index !== item.index) {
            colors[index] = color.replace('0.6', '0.2');
        }
    });
    legend.chart.update();
};

function handleLeave(evt, item, legend) {
legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
        colors[index] = color.replace('0.2', '0.6');
    });
    legend.chart.update();
};

const renderSourceChart = () => {
    fetch('dahsboard-income-source-summary')
        .then(res => res.json())
        .then(results => {
            const source_data = results.income_source_data;
            const [income_lables, income_data] = [
                Object.keys(source_data),
                Object.values(source_data)
            ];

            const source_chart_data = {
                labels: income_lables,
                datasets: [{
                    label: 'Amount',

                    data: income_data,

                    backgroundColor: [
                        'rgba(197, 59, 92, 0.6)',
                        'rgba(245,123,108, 0.6)',
                        'rgba(251,175,105, 0.6)',
                        'rgba(255,209,102, 0.6)',
                        'rgba(131,212,131, 0.6)',
                        'rgba(6,214,160, 0.6)',
                        'rgba(12,176,169, 0.6)',
                        'rgba(17,138,178, 0.6)',
                        'rgba(7,59,76, 0.6)'
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
                    borderWidth: 1,

                    hoverOffset: 30
                }]
            };

            const source_chart_config = {
                type: 'doughnut',
                data: source_chart_data,
                options: {
                    responsive: true,
                    radius: '90%',
                    plugins: {
                        title: {
                            display: true,
                            text: 'Income per source'
                        },
                        subtitle: {
                            display: true,
                            text: 'This month',
                            padding: {
                                bottom: 10
                            }
                        },
                        legend: {
                            onHover: handleHover,
                            onLeave: handleLeave,
                            labels: {
                                usePointStyle: true,
                            }
                        }
                    }
                }
            };

            const canvasSourceElement = document.getElementById('sourceChart');

            if (canvasSourceElement) {
                const sourceChart = new Chart(
                    document.getElementById('sourceChart'),
                    source_chart_config
                );
            };
        });

    
};

const renderCategoryChart = () => {
    fetch('dahsboard-expense-category-summary')
        .then(res => res.json())
        .then(results => {
            const category_data = results.expense_category_data;
            const [expense_lables, expense_data] = [
                Object.keys(category_data),
                Object.values(category_data)
            ];

            const category_chart_data = {
                labels: expense_lables,
                datasets: [{
                    label: 'Amount',

                    data: expense_data,

                    backgroundColor: [
                        'rgba(197, 59, 92, 0.6)',
                        'rgba(245,123,108, 0.6)',
                        'rgba(251,175,105, 0.6)',
                        'rgba(255,209,102, 0.6)',
                        'rgba(131,212,131, 0.6)',
                        'rgba(6,214,160, 0.6)',
                        'rgba(12,176,169, 0.6)',
                        'rgba(17,138,178, 0.6)',
                        'rgba(7,59,76, 0.6)'
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
                    borderWidth: 1,

                    hoverOffset: 30
                }]
            };

            const category_chart_config = {
                type: 'doughnut',
                data: category_chart_data,
                options: {
                    responsive: true,
                    radius: '90%',
                    plugins: {
                        title: {
                            display: true,
                            text: 'Expense per category'
                        },
                        subtitle: {
                            display: true,
                            text: 'This month',
                            padding: {
                                bottom: 10
                            }
                        },
                        legend: {
                            onHover: handleHover,
                            onLeave: handleLeave,
                            labels: {
                                usePointStyle: true,
                            }
                        }
                    }
                }
            };

            const canvasCategoryElement = document.getElementById('categoryChart');

            if (canvasCategoryElement) {
                const categoryChart = new Chart(
                    document.getElementById('categoryChart'),
                    category_chart_config
                );
            };
        });
};

const renderDashboardCharts = () => {
    renderSourceChart();
    renderCategoryChart();
};

document.onload = renderDashboardCharts();
