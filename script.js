document.addEventListener('DOMContentLoaded', function() {
    loadData(); // Load data when the page loads
});

function loadData() {
    const date = document.getElementById('pickdate').value;
    const time = document.getElementById('picktime').value;

    fetch(`/api/readings?station=AlorGajah&date=${date}&time=${time}`)
        .then(response => response.json())
        .then(data => {
            const outputDiv = document.getElementById('data-output');
            outputDiv.innerHTML = '';

            if (data.length === 0) {
                outputDiv.innerHTML = '<p>No data available for the selected date and time.</p>';
                return;
            }

            const table = document.createElement('table');
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
                <th>Date</th>
                <th>Time</th>
                <th>API</th>
            `;
            table.appendChild(headerRow);

            data.forEach(reading => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${reading.date}</td>
                    <td>${reading.time}</td>
                    <td>${reading.api}</td>
                `;
                table.appendChild(row);
            });

            outputDiv.appendChild(table);
        })
        .catch(error => console.error('Error fetching data:', error));
}
