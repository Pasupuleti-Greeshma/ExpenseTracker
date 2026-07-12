const dashboard = document.getElementById("1");
const container = document.getElementById("dashboard-container")
const pageTitle = document.getElementById("page-title");
let gaugeChartInstance;
let donutChartInstance;
let f = 1000, h = 2000, c = 3500, hc = 5000;
let income = 0;
let expense = 0;
let cashInHand = 0;

dashboard.addEventListener("click", () => {
    pageTitle.style.display = "block";
    pageTitle.innerText = "Dashboard";

    container.innerHTML = `
    <div class="top-bar">
            <input type="date" id="date-chooser" value="">
           <button id="update-btn">Update</button>
              <button id="save-btn">Save</button>
         </div>
        <div class="button-row">
            <div id="income-card" class="card">
             <div>Income</div>
                <span>Rs. <span id="income-display">${income}</span></span>
               
            </div>
            <div id="expenses-btn" class="card">
             <div>Expense</div>
                <span>Rs. <span id="expenses-display">${expense}</span></span>
               
            </div>
            <div id="incash-btn" class="card">
            <div>Cash in hand</div>
                <span>Rs. <span id="incash-display">${cashInHand}</span></span>
                
            </div>
            <div id="transactions-btn" class="card">
            <div>No of transactions</div>
                <span id="transaction-display">0</span>
                
            </div>
        </div>
        <div class="chart-row">
            <div class="chart-box"><button class="update-donut-btn">Update Categories</button><canvas id="donutChart"></canvas></div>
            <div class="chart-box"><canvas id="gaugeChart"></canvas></div>
        </div>
        
    `;

    loadTransactionCount();
    const ctx1 = document.getElementById('donutChart').getContext('2d');
    donutChartInstance = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Food', 'Household', 'Clothing', 'Healthcare'],
            datasets: [{ data: [f, h, c, hc], backgroundColor: ['#ff7675', '#fab1a0', '#ffeaa7', '#00b894'] }]
        },
        options: { plugins: { legend: { position: 'bottom' } } }
    });

    const ctx2 = document.getElementById('gaugeChart').getContext('2d');
    gaugeChartInstance = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Spent', 'Balance'],
            datasets: [{ data: [8540, 1460], backgroundColor: ['#ff7675', '#00b894'] }]
        },
        options: { circumference: 180, rotation: 270, plugins: { legend: { position: 'bottom' } } }
    });

    fetch("http://localhost:8080/dashboard")
        .then(response => response.json())
        .then(data => {

            // Update global variables
            income = data.income;
            expense = data.expense;
            cashInHand = data.cashInHand;

            document.getElementById("income-display").innerText = income;
            document.getElementById("expenses-display").innerText = expense;
            document.getElementById("incash-display").innerText = cashInHand;

            gaugeChartInstance.data.datasets[0].data = [
                expense,
                cashInHand
            ];

            gaugeChartInstance.update();

        })
        .catch(error => console.log(error));

    // 2. Event Listeners
    document.getElementById("update-btn").addEventListener("click", () => {
        document.getElementById("update-model").style.display = "block";
    });

    document.querySelector(".update-donut-btn").addEventListener("click", () => {

        document.getElementById("m-food").value = f;
        document.getElementById("m-household").value = h;
        document.getElementById("m-clothing").value = c;
        document.getElementById("m-healthcare").value = hc;

        document.getElementById("donut-update-modal").style.display = "block";
    });
    document.getElementById("save-btn").addEventListener("click", () => alert("Data saved!"));
});

// 3. Global Modal Handlers (Ensure these IDs exist in your HTML outside dashboard-container)
document.getElementById("model-save-btn").addEventListener("click", () => {
    income = parseInt(document.getElementById("model-income").value) || 0;
    expense = parseInt(document.getElementById("model-expense").value) || 0;
    cashInHand = parseInt(document.getElementById("model-incash").value) || 0;

    document.getElementById("income-display").innerText = income;
    document.getElementById("expenses-display").innerText = expense;
    document.getElementById("incash-display").innerText = cashInHand;

    if (gaugeChartInstance) {
        gaugeChartInstance.data.datasets[0].data = [expense, cashInHand];
        gaugeChartInstance.update();
    }
    // Save to Spring Boot
    fetch("http://localhost:8080/dashboard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            income: income,
            expense: expense,
            cashInHand: cashInHand
        })
    });
    document.getElementById("update-model").style.display = "none";
});

document.getElementById("donut-save-btn").addEventListener("click", () => {
    const f = parseInt(document.getElementById("m-food").value) || 0;
    const h = parseInt(document.getElementById("m-household").value) || 0;
    const c = parseInt(document.getElementById("m-clothing").value) || 0;
    const hc = parseInt(document.getElementById("m-healthcare").value) || 0;

    if (donutChartInstance) {
        donutChartInstance.data.datasets[0].data = [f, h, c, hc];
        donutChartInstance.update();
    }
    document.getElementById("donut-update-modal").style.display = "none";


});

const profile = document.getElementById("6");
// const pageTitle = document.getElementById("page-title");
// const container = document.getElementById("dashboard-container");

profile.addEventListener("click", () => {

    pageTitle.style.display = "block";
    pageTitle.innerText = "Settings";

    container.innerHTML = `
        <div class="settings">

            <div class="profile-info">
                <h2 id="profile-name">${localStorage.getItem("username") || "Greeshma"}</h2>
<p>greeshma@gmail.com</p>
            </div>

            <label>Username</label>
            <input
    type="text"
    class="username"
    id="username"
    value="${localStorage.getItem("username") || "Greeshma"}">

            <label>Current Password</label>
            <input type="password" class="cp">

            <label>New Password</label>
            <input type="password" class="password">

            <label>Confirm Password</label>
            <input type="password" class="confirm">

            <button class="update-btn" id="update-profile-btn">
                Update Password
            </button>

        </div>
    `;
    document.getElementById("update-profile-btn").addEventListener("click", () => {

        const username = document.getElementById("username").value.trim();
        const currentPassword = document.querySelector(".cp").value;
        const newPassword = document.querySelector(".password").value;
        const confirmPassword = document.querySelector(".confirm").value;

        // Default password first time
        const savedPassword = localStorage.getItem("password") || "12345678";

        if (currentPassword !== savedPassword) {
            alert("Current password is incorrect");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Save new username and password
        localStorage.setItem("username", username);
        localStorage.setItem("password", newPassword);

        // Change h2 immediately
        document.getElementById("profile-name").innerText = username;

        alert("Profile Updated Successfully");
    });

});



const newTransaction = document.getElementById("3");

newTransaction.addEventListener("click", () => {

    pageTitle.style.display = "block";
    pageTitle.innerText = "New Transaction";

    container.innerHTML = `
        <div class="transaction-page">

            <div class="transaction-type">
                <button class="type-btn active" id="expense-btn">Expense</button>
                <button class="type-btn" id="income-btn">Income</button>
            </div>

            <div class="category-section">
                <label>Transaction Category</label>

                <div class="category-grid" id="category-grid">

                </div>
            </div>

            <div class="form-group">
                <label>Transaction Description</label>
                <input type="text" id="description" placeholder="Enter description">
            </div>

            <div class="form-group">
                <label>Amount</label>
                <input type="number" id="amount" placeholder="Enter amount">
            </div>

            <div class="form-group">
                <label>Date</label>
                <input type="date" id="date">
            </div>

            <div class="buttons">
                <button id="save-transaction">Save Transaction</button>
                <button id="cancel-transaction">Cancel</button>
            </div>

        </div>
    `;

    let type = "Expense";

    const expenseCategories = [
        "Other",
        "Food",
        "Leisure",
        "Household",
        "Clothing",
        "Education",
        "Healthcare"
    ];

    const incomeCategories = [
        "Salary",
        "Freelance",
        "Bonus",
        "Investment",
        "Interest",
        "Rental",
        "Gift",
        "Other"
    ];

    const categoryGrid = document.getElementById("category-grid");

    function loadCategories(categories) {

        categoryGrid.innerHTML = "";

        categories.forEach(category => {

            categoryGrid.innerHTML += `
                <label>
                    <input type="radio"
                           name="category"
                           value="${category}">
                    ${category}
                </label>
            `;

        });

    }

    // Default
    loadCategories(expenseCategories);

    const expenseBtn = document.getElementById("expense-btn");
    const incomeBtn = document.getElementById("income-btn");

    expenseBtn.onclick = function () {

        type = "Expense";

        expenseBtn.classList.add("active");
        incomeBtn.classList.remove("active");

        loadCategories(expenseCategories);

    };

    incomeBtn.onclick = function () {

        type = "Income";

        incomeBtn.classList.add("active");
        expenseBtn.classList.remove("active");

        loadCategories(incomeCategories);

    };

    document.getElementById("save-transaction").onclick = function () {

        const category = document.querySelector("input[name='category']:checked");

        const description = document.getElementById("description").value.trim();

        const amount = document.getElementById("amount").value;

        const date = document.getElementById("date").value;

        if (!category || description === "" || amount === "" || date === "") {

            alert("Please fill all fields.");

            return;

        }

        const transaction = {

            type: type,

            category: category.value,

            description: description,

            amount: Number(amount),

            date: date

        };

        fetch("http://localhost:8080/transactions", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(transaction)

        })
            .then(response => response.json())
            .then(data => {

                alert("Transaction Saved Successfully!");

                // Update transaction count if dashboard is open
                loadTransactionCount();

            })
            .catch(error => console.log(error));



        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("date").value = "";

        document.querySelectorAll("input[name='category']").forEach(r => r.checked = false);

    };

    document.getElementById("cancel-transaction").onclick = function () {

        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("date").value = "";

        document.querySelectorAll("input[name='category']").forEach(r => r.checked = false);

    };

});

const transaction = document.getElementById("2");

transaction.addEventListener("click", () => {

    pageTitle.style.display = "block";
    pageTitle.innerText = "Transaction History";

    // Display the table
    container.innerHTML = `
        <div class="transaction-history">
            <table class="history-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody id="history-body">
                </tbody>
            </table>
        </div>
    `;

    // Fetch data from backend
    fetch("http://localhost:8080/transactions")
        .then(response => response.json())
        .then(data => {
            console.log(data);


            let html = "";

            data.forEach(t => {

                html += `
                    <tr>
                        <td>${t.date}</td>
                       <td class="${t.type === 'Income' ? 'income' : 'expense'}">${t.type}</td>
                        <td>${t.category}</td>
                        <td>${t.description}</td>
                        <td>₹${t.amount}</td>
                    </tr>
                `;

            });

            document.getElementById("history-body").innerHTML = html;

        })
        .catch(error => {
            console.error("Error fetching transactions:", error);
        });

});

const statistics = document.getElementById("5");
statistics.addEventListener("click", () => {
    pageTitle.style.display = "block";
    pageTitle.innerText = "Statistics";
    container.innerHTML = `
        <div class="statistics-page">
            <canvas id="statisticsChart"></canvas>
        </div>
    `;

    loadStatistics();

})
function loadStatistics() {

    fetch("http://localhost:8080/transactions")
        .then(response => response.json())
        .then(data => {

            const income = Array(12).fill(0);
            const expense = Array(12).fill(0);

            data.forEach(t => {

                const month = new Date(t.date).getMonth();

                if (t.type === "Income") {
                    income[month] += Number(t.amount);
                } else {
                    expense[month] += Number(t.amount);
                }

            });

            drawStatisticsChart(income, expense);

        })
        .catch(error => console.log(error));

}
function drawStatisticsChart(income, expense) {

    const ctx = document
        .getElementById("statisticsChart")
        .getContext("2d");

    Chart.register(ChartDataLabels);

    new Chart(ctx, {

        type: "line",

        data: {
            labels: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],

            datasets: [
                {
                    label: "Income",
                    data: income,
                    borderColor: "#2563eb",
                    backgroundColor: "#2563eb",
                    pointBackgroundColor: "#2563eb",
                    pointRadius: 5,
                    tension: 0.4,
                    fill: false
                },
                {
                    label: "Expense",
                    data: expense,
                    borderColor: "#ef4444",
                    backgroundColor: "#ef4444",
                    pointBackgroundColor: "#ef4444",
                    pointRadius: 5,
                    tension: 0.4,
                    fill: false
                }
            ]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                mode: "index",
                intersect: false
            },

            plugins: {

                legend: {
                    position: "top"
                },

                tooltip: {
                    enabled: true,
                    backgroundColor: "#1f2937",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    borderColor: "#2563eb",
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,

                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ": ₹" + context.raw;
                        }
                    }
                },

                datalabels: {
                    color: "#111827",
                    anchor: "end",
                    align: "top",
                    font: {
                        weight: "bold",
                        size: 12
                    },
                    formatter: function (value) {
                        return "₹" + value;
                    }
                }

            },

            scales: {

                x: {
                    grid: {
                        color: "#e5e7eb"
                    },
                    ticks: {
                        color: "#374151"
                    }
                },

                y: {
                    beginAtZero: true,
                    grid: {
                        color: "#e5e7eb"
                    },
                    ticks: {
                        color: "#374151",
                        callback: function (value) {
                            return "₹" + value;
                        }
                    }
                }

            }

        }

    });

}
// ===========================
// Load Transaction Count
// ===========================
function loadTransactionCount() {

    fetch("http://localhost:8080/transactions")
        .then(response => response.json())
        .then(data => {

            const countElement = document.getElementById("transaction-display");

            if (countElement) {
                countElement.innerText = data.length;
            }

        })
        .catch(error => console.log(error));

}

const logout = document.getElementById("7");

logout.addEventListener("click", () => {

    // Redirect to login page
    window.location.href = "index.html";

});