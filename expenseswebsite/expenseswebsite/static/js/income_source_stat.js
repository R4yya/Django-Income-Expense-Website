const renderSourceChart = () => {
    fetch('/income/income-source-summary')
        .then(res => res.json())
        .then(results => {
            const source_data = results.income_source_data;
            const [income_lables, income_data] = [
                Object.keys(source_data),
                Object.values(source_data)
            ];

        const income_chart_data = {
            labels: income_lables,
            datasets: [{
                label: 'Amount',
                data: income_data,
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
            borderWidth: 2,
            hoverOffset: 3
            }]
        };

        const income_chart_config = {
            type: 'doughnut',
            data: income_chart_data,
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
        };

        const SourceChart = new Chart(
            document.getElementById('sourceChart'),
            income_chart_config
        );
    });
};

document.onload = renderSourceChart();


