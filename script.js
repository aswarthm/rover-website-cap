// Define data objects for all properties
// KEEP ALL ARRAYS OF SAME LENGTH
const slen=40; //lenght of array
function addNoise(array, noiseLevel, divideBy = 1) {
    return array.map(value => (value + (Math.random() - 0.5) * noiseLevel) / divideBy);
}

const speedArray = addNoise([0, 0.005, 0.01, 0.015, 0.02, 0.025, 0.03, 0.035, 0.04, 0.045, 0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095], 0.005);
const batteryArray = addNoise([100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 80], 1);
const temperatureArray = addNoise([20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 2);
const altitudeArray = addNoise([0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 4000], 400, 100);
const humidityArray = addNoise([50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50], 0.1,);
let i=0;
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
        
        if(i>slen)
        {
            i=0;
        }
        i++;
        const speed = speedArray[i];
        

        const batteryLevel = batteryArray[i];
        const temperature = temperatureArray[i];
        const altitude = altitudeArray[i];
        const humidity = humidityArray[i];

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
        const maxDataPoints = slen;
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
        mapCtx.strokeStyle = "#ffffff"; // White color

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
    // updateMapView();

    // // Function to update the rover's position (sample logic)
    // function updateRoverPosition() {
    //     // Update rover's position (sample logic)
    //     roverPosition.row = Math.floor(Math.random() * numRows);
    //     roverPosition.col = Math.floor(Math.random() * numCols);
    //     // Update map view
    //     updateMapView();
    // }

    // Update rover's position every 1 second (sample interval)
    setInterval(updateRoverPosition, 1000);
    
};
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to update data table with random values
function updateDataTable(tableId, val) {
    // Generate random value
    const value = val

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
updateDataTable("speedDataTable", speedArray[i]); // Speed (m/s) range: 1-20
updateDataTable("temperatureDataTable", temperatureArray[i]); // Temperature (°C) range: 10-50
updateDataTable("humidityDataTable", humidityArray[i]); // Humidity (%) range: 30-70
updateDataTable("altitudeDataTable", altitudeArray[i]); // Altitude (m) range: 100-500

// Update all data tables every second
setInterval(function() {
   // Update all data tables initially
updateDataTable("speedDataTable", speedArray[i]); // Speed (m/s) range: 1-20
updateDataTable("temperatureDataTable", temperatureArray[i]); // Temperature (°C) range: 10-50
updateDataTable("humidityDataTable", humidityArray[i]); // Humidity (%) range: 30-70
updateDataTable("altitudeDataTable", altitudeArray[i]); // Altitude (m) range: 100-500

}, 1000);
