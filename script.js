// Define data objects for all properties
const speedData = {
    labels: [],
    datasets: [{
        label: 'Speed (m/s)',
        data: [],
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red color with opacity
        fill: true
    }]
};

const batteryData = {
    labels: [],
    datasets: [{
        label: 'Battery Level',
        data: [],
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue color with opacity
        fill: true
    }]
};

const temperatureData = {
    labels: [],
    datasets: [{
        label: 'Temperature (°C)',
        data: [],
        borderColor: '#ffce56',
        backgroundColor: 'rgba(255, 206, 86, 0.2)', // Yellow color with opacity
        fill: true
    }]
};

const altitudeData = {
    labels: [],
    datasets: [{
        label: 'Altitude (meters)',
        data: [],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)', // Green color with opacity
        fill: true
    }]
};

const humidityData = {
    labels: [],
    datasets: [{
        label: 'Humidity (%)',
        data: [],
        borderColor: '#9C27B0',
        backgroundColor: 'rgba(156, 39, 176, 0.2)', // Purple color with opacity
        fill: true
    }]
};

// Define options for all charts (can be shared among multiple charts)
const chartOptions = {
    responsive: true,
    scales: {
        xAxes: [{
            ticks: {
                maxTicksLimit: 10, // Limit the number of ticks
                callback: function(value, index, values) {
                    // Return 'Time' for all x-axis labels
                    return 'Time';
                }
            }
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

window.onload = function() {
    // Speed Chart
    const speedChartCtx = document.getElementById("speedChart").getContext("2d");
    const speedChart = new Chart(speedChartCtx, {
        type: 'line',
        data: speedData,
        options: chartOptions
    });

    // Battery Chart
    const batteryChartCtx = document.getElementById("batteryChart").getContext("2d");
    const batteryChart = new Chart(batteryChartCtx, {
        type: 'line',
        data: batteryData,
        options: chartOptions
    });

    // Temperature Chart
    const temperatureChartCtx = document.getElementById("temperatureChart").getContext("2d");
    const temperatureChart = new Chart(temperatureChartCtx, {
        type: 'line',
        data: temperatureData,
        options: chartOptions
    });

    // Altitude Chart
    const altitudeChartCtx = document.getElementById("altitudeChart").getContext("2d");
    const altitudeChart = new Chart(altitudeChartCtx, {
        type: 'line',
        data: altitudeData,
        options: chartOptions
    });

    // Humidity Chart
    const humidityChartCtx = document.getElementById("humidityChart").getContext("2d");
    const humidityChart = new Chart(humidityChartCtx, {
        type: 'line',
        data: humidityData,
        options: chartOptions
    });

    // Function to update all charts and data
    function updateCharts() {
        // Generate random data for each property
        const speed = Math.floor(Math.random() * 20) + 1;
        const batteryLevel = Math.floor(Math.random() * 100) + 1;
        const temperature = Math.floor(Math.random() * 50) + 10;
        const altitude = Math.floor(Math.random() * 100) + 1;
        const humidity = Math.floor(Math.random() * 100) + 1;

        // Add data to respective datasets
        speedData.labels.push('');
        speedData.datasets[0].data.push(speed);

        batteryData.labels.push('');
        batteryData.datasets[0].data.push(batteryLevel);

        temperatureData.labels.push('');
        temperatureData.datasets[0].data.push(temperature);

        altitudeData.labels.push('');
        altitudeData.datasets[0].data.push(altitude);

        humidityData.labels.push('');
        humidityData.datasets[0].data.push(humidity);

        // Remove old data points if exceeding the limit
        const maxDataPoints = 10;
        if (speedData.labels.length > maxDataPoints) {
            speedData.labels.shift();
            speedData.datasets[0].data.shift();
        }

        if (batteryData.labels.length > maxDataPoints) {
            batteryData.labels.shift();
            batteryData.datasets[0].data.shift();
        }

        if (temperatureData.labels.length > maxDataPoints) {
            temperatureData.labels.shift();
            temperatureData.datasets[0].data.shift();
        }

        if (altitudeData.labels.length > maxDataPoints) {
            altitudeData.labels.shift();
            altitudeData.datasets[0].data.shift();
        }

        if (humidityData.labels.length > maxDataPoints) {
            humidityData.labels.shift();
            humidityData.datasets[0].data.shift();
        }

        // Update all charts
        speedChart.update();
        batteryChart.update();
        temperatureChart.update();
        altitudeChart.update();
        humidityChart.update();

        // Update data for other properties
        document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
        // Update other properties similarly...
    }

    

    // Update all charts and data every second
    setInterval(updateCharts, 1000);
    // Define canvas and context for map view
    const mapCanvas = document.getElementById("mapCanvas");
    const mapCtx = mapCanvas.getContext("2d");

    // Define grid properties
    const gridSize = 30; // Size of each grid cell
    const numRows = 10; // Number of rows in the grid
    const numCols = 10; // Number of columns in the grid

    // Initial position of the rover
    let roverPosition = { row: 5, col: 5 };

    // Function to update the map view
    function updateMapView() {
        // Clear previous drawings
        mapCtx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);

        // Draw grid lines
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                mapCtx.beginPath();
                mapCtx.rect(col * gridSize, row * gridSize, gridSize, gridSize);
                mapCtx.stroke();
            }
        }

        // Draw rover at its current position
        mapCtx.fillStyle = "red";
        mapCtx.beginPath();
        mapCtx.arc(roverPosition.col * gridSize + gridSize / 2, roverPosition.row * gridSize + gridSize / 2, gridSize / 2, 0, Math.PI * 2);
        mapCtx.fill();
    }

    // Update map view initially
    updateMapView();

    // Function to update the rover's position (sample logic)
    function updateRoverPosition() {
        // Update rover's position (sample logic)
        roverPosition.row = Math.floor(Math.random() * numRows);
        roverPosition.col = Math.floor(Math.random() * numCols);
        // Update map view
        updateMapView();
    }

    // Update rover's position every 1 second (sample interval)
    setInterval(updateRoverPosition, 1000);
    
};
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to update data table with random values
function updateDataTable(tableId, min, max) {
    // Generate random value
    const value = getRandomValue(min, max);

    // Update table with the random value
    const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    const row = table.insertRow(0);
    const cell = row.insertCell(0);
    cell.textContent = value;

    // Remove older rows if the table exceeds the limit
    const maxRows = 10; // Maximum number of rows to display
    if (table.rows.length > maxRows) {
        table.deleteRow(-1); // Delete the last row
    }
}

// Update all data tables initially
updateDataTable("speedDataTable", 1, 20); // Speed (m/s) range: 1-20
updateDataTable("temperatureDataTable", 10, 50); // Temperature (°C) range: 10-50
updateDataTable("humidityDataTable", 30, 70); // Humidity (%) range: 30-70
updateDataTable("altitudeDataTable", 100, 500); // Altitude (m) range: 100-500

// Update all data tables every second
setInterval(function() {
    updateDataTable("speedDataTable", 1, 20); // Speed (m/s) range: 1-20
    updateDataTable("temperatureDataTable", 10, 50); // Temperature (°C) range: 10-50
    updateDataTable("humidityDataTable", 30, 70); // Humidity (%) range: 30-70
    updateDataTable("altitudeDataTable", 100, 500); // Altitude (m) range: 100-500
}, 1000);
