const renderChart = (data, labels) => {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
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
                hoverOffset: 25
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
