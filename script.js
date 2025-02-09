const data = {
    "山田花子": [
        { month: "1月", weight: 42, height: 162, age: 1.4 },
        { month: "2月", weight: 41, height: 162, age: 1.6 },
        { month: "3月", weight: 45, height: 163, age: 1.8 },
        { month: "4月", weight: 46, height: 161, age: 2.2 },
        { month: "5月", weight: 44, height: 162, age: 2.7 }
    ],
    "田中太郎": [
        { month: "1月", weight: 65, height: 175, age: 1.8 },
        { month: "2月", weight: 66, height: 175, age: 1.9 },
        { month: "3月", weight: 67, height: 174, age: 2.0 },
        { month: "4月", weight: 68, height: 174, age: 2.3 },
        { month: "5月", weight: 66, height: 175, age: 2.5 }
    ]
};

// BMI計算
function calculateBMI(weight, height) {
    let heightInMeters = height / 100;
    return (weight / (heightInMeters ** 2)).toFixed(1);
}

// AGEリスク判定
function getAgeRisk(ageValue) {
    if (ageValue <= 1.5) return { level: "低", color: "green" };
    if (ageValue <= 2.5) return { level: "中", color: "orange" };
    return { level: "高", color: "red" };
}

// 検索処理
function searchRecord() {
    let input = document.getElementById("searchName").value.trim();
    let userNameElement = document.getElementById("userName");
    let tableBody = document.getElementById("recordTable");
    let weightChart = document.getElementById("weightChart").getContext("2d");
    let ageChart = document.getElementById("ageChart").getContext("2d");

    tableBody.innerHTML = "";

    if (data[input]) {
        userNameElement.textContent = input + " の測定データ";

        let months = [];
        let weights = [];
        let bmis = [];
        let ages = [];

        data[input].forEach(entry => {
            let bmi = calculateBMI(entry.weight, entry.height);
            let ageRisk = getAgeRisk(entry.age);

            // データの追加
            months.push(entry.month);
            weights.push(entry.weight);
            bmis.push(bmi);
            ages.push(entry.age);

            tableBody.innerHTML += `
                <tr>
                    <td>${entry.month}</td>
                    <td>${entry.weight}</td>
                    <td>${entry.height}</td>
                    <td>${bmi}</td>
                    <td>${entry.age}</td>
                    <td style="color: ${ageRisk.color}; font-weight: bold;">${ageRisk.level}</td>
                </tr>`;
        });

        // 体重とBMIのグラフ
        new Chart(weightChart, {
            type: "line",
            data: {
                labels: months,
                datasets: [
                    {
                        label: "体重 (kg)",
                        data: weights,
                        borderColor: "#ff6384",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        fill: true
                    },
                    {
                        label: "BMI",
                        data: bmis,
                        borderColor: "#36a2eb",
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        fill: true
                    }
                ]
            }
        });

        // AGEsのグラフ
        new Chart(ageChart, {
            type: "line",
            data: {
                labels: months,
                datasets: [
                    {
                        label: "AGEs値 (AU)",
                        data: ages,
                        borderColor: "#ff9f40",
                        backgroundColor: "rgba(255, 159, 64, 0.2)",
                        fill: true
                    }
                ]
            }
        });
    } else {
        userNameElement.textContent = "該当者が見つかりません";
    }
}
