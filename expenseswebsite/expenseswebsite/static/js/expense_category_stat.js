const renderChart = (data, labels) => {
    const ctx1 = document.getElementById('myChart1');

    new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Amount',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(99, 255, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
                hoverOffset: 10
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Expenses per category'
                },
                subtitle: {
                    display: true,
                    text: 'Last 6 months',
                    padding: {
                        bottom: 10
                    }
                },
            }
        }
    });

    const ctx2 = document.getElementById('myChart2');

    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Amount',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(99, 255, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
                hoverOffset: 10
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Expenses per category'
                },
                subtitle: {
                    display: true,
                    text: 'Last 6 months',
                    padding: {
                        bottom: 10
                    }
                },
            }
        }
    });
};

const getChartData = () => {
    fetch('expense-category-summary')
        .then(res=>res.json())
        .then(results => {
            const category_data = results.expense_category_data;
            const [lables, data] = [
                Object.keys(category_data),
                Object.values(category_data)
            ];

            renderChart(data, lables);
    });
};

document.onload = getChartData();
