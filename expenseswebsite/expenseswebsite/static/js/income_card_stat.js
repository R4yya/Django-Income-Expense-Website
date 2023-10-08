const updateCardData = (data) => {
    document.getElementById('todayIncomeCount').textContent = data.today.count;
    document.getElementById('todayIncomeAmount').textContent = data.today.amount;

    document.getElementById('weekIncomeCount').textContent = data.week.count;
    document.getElementById('weekIncomeAmount').textContent = data.week.amount;

    document.getElementById('monthIncomeCount').textContent = data.month.count;
    document.getElementById('monthIncomeAmount').textContent = data.month.amount;

    document.getElementById('yearIncomeCount').textContent = data.year.count;
    document.getElementById('yearIncomeAmount').textContent = data.year.amount;
};

const getCardData = () => {
    fetch('/income/income-card-summary')
        .then(res => res.json())
        .then(results => {
            updateCardData(results.income_card_data);
        });
};

document.onload = getCardData();
