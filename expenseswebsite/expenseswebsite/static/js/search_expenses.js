const searchField = document.querySelector("#searchField");

const tableOutput = document.querySelector(".table-output");
tableOutput.style.display = "none";

const appTable = document.querySelector(".app-table");

const paginationContainer = document.querySelector(".pagination-container");

const noResults = document.querySelector(".no-results");

const tableBody = document.querySelector(".table-body");

searchField.addEventListener("keyup", (e) => {
    const searchValue = e.target.value;

    if (searchValue.trim().length > 0){
        paginationContainer.style.display = "none";

        tableBody.innerHTML = "";

        fetch("search-expense", {
            body: JSON.stringify({searchText: searchValue}),
            method: "POST"
        })
            .then((res) => res.json())
            .then((data) => {
                appTable.style.display = "none";
                tableOutput.style.display = "block";

                if (data.length === 0){
                    noResults.style.display = "block";
                    tableOutput.style.display = "none";
                } else {
                    noResults.style.display = "none";
                    data.forEach((item) => {
                        tableBody.innerHTML += `
                            <tr>
                            <td>${item.amount}</td>
                            <td>${item.category}</td>
                            <td>${item.description}</td>
                            <td>${item.date}</td>
                            </tr>`;
                    });
                };
            });
    } else {
        tableOutput.style.display = "none";
        appTable.style.display = "block";
        paginationContainer.style.display = "block";
    };
});