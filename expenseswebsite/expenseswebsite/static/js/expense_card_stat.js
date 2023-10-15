const updateCardData = (data) => {
    document.getElementById('todayExpenseCount').textContent = data.today.count;
    document.getElementById('todayExpenseAmount').textContent = data.today.amount;

    document.getElementById('weekExpenseCount').textContent = data.week.count;
    document.getElementById('weekExpenseAmount').textContent = data.week.amount;

    document.getElementById('monthExpenseCount').textContent = data.month.count;
    document.getElementById('monthExpenseAmount').textContent = data.month.amount;

    document.getElementById('yearExpenseCount').textContent = data.year.count;
    document.getElementById('yearExpenseAmount').textContent = data.year.amount;
};

const getCardData = () => {
    fetch('expense-card-summary')
        .then(res => res.json())
        .then(results => {
            var placeholders = document.querySelectorAll(".placeholder");

            placeholders.forEach(function(placeholder) {
                placeholder.classList.remove("placeholder");
                placeholder.classList.remove("placeholder-wave");
                placeholder.classList.remove("w-100");
            });
            updateCardData(results.expense_card_data);
        });
};

document.onload = getCardData();
