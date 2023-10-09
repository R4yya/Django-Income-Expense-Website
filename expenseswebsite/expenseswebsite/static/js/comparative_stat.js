let delayed;

const renderComparativeChart = (data_expenses, labels_expenses, data_income, lables_income) => {
    const ctx = document.getElementById('comparativeChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels_expenses,
            datasets: [
            {
                label: 'Expenses',

                data: data_expenses,

                backgroundColor: [
                    'rgba(4, 110, 72, 0.2)',
                ],

                borderColor: [
                    'rgba(4, 110, 72, 1)',
                ],
                borderWidth: 1,
                borderRadius: 5,

                fill: 'start',

                pointStyle: 'circle',
                pointBackgroundColor:[
                    'rgba(4, 110, 72, 1)'
                ]
            },
            {
                label: 'Income',

                data: data_income,

                backgroundColor: [
                    'rgba(196, 92, 94, 0.2)',
                ],

                borderColor: [
                    'rgba(196, 92, 94, 1)',
                ],
                borderWidth: 1,
                borderRadius: 5,

                fill: 'start',

                pointStyle: 'circle',
                pointBackgroundColor:[
                    'rgba(4, 110, 72, 1)'
                ]
            },]
        },
        options: {
            tension: 0.15,
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
    });
};

const getChartData = () => {
    fetch('comparative-stat')
        .then(res => res.json())
        .then(results => {
            const expenses_data = results.comparative_data.expenses;
            const [lables_expenses, data_expenses] = [
                Object.keys(expenses_data),
                Object.values(expenses_data)
            ];

            const income_data = results.comparative_data.income;
            const [lables_income, data_income] = [
                Object.keys(income_data),
                Object.values(income_data)
            ];

            renderComparativeChart(data_expenses, lables_expenses, data_income, lables_income);
        });
};

document.onload = getChartData();