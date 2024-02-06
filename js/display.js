// Get references to HTML elements
const stockSymbolInput = document.getElementById("stockSymbolInput");
const trackButton = document.getElementById("trackButton");
const stockNameDisplay = document.getElementById("stockNameDisplay");
const stockSymbolDisplay = document.getElementById("stockSymbolDisplay");
const stockPriceDisplay = document.getElementById("stockPriceDisplay");
const stockChangeDisplay = document.getElementById("stockChangeDisplay");

// Event listener for the track button
trackButton.addEventListener("click", () => {
    const symbol = stockSymbolInput.value.toUpperCase();
    fetchStockData(symbol);
});

// Function to fetch stock data from an API
function fetchStockData(symbol) {
    const apiKey = '8F4GS42TWIN23N23'; 
    const functionName = 'TIME_SERIES_DAILY';
    const outputSize = 'compact'; // change this to 'full' if needed
    const dataType = 'json'; // change this to 'csv' if needed

    const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbol}&outputsize=${outputSize}&apikey=${apiKey}&datatype=${dataType}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch stock data.');
            }
            return response.json();
        })
        .then(data => {
            displayStockData(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            stockInfo.innerHTML = "Error fetching data.";
            // Clear previous data
            clearStockData();
        });
}
// Function to clear stock data
function clearStockData() {
    stockNameDisplay.textContent = "";
    stockSymbolDisplay.textContent = "";
    stockPriceDisplay.textContent = "";
    stockOpenDisplay.textContent = "";
    stockHighDisplay.textContent = "";
    stockLowDisplay.textContent = "";
    stockVolumeDisplay.textContent = "";
}
// Function to display stock data
function displayStockData(data) {
    const metaData = data['Meta Data'];
    const timeSeries = data['Time Series (Daily)'];

    if (!metaData || !timeSeries) {
        // Clear the stock data if no data is found
        stockNameDisplay.textContent = "Stock data not found.";
        stockSymbolDisplay.textContent = "";
        stockPriceDisplay.textContent = "";
        stockOpenDisplay.textContent = "";
        stockHighDisplay.textContent = "";
        stockLowDisplay.textContent = "";
        stockVolumeDisplay.textContent = "";
        return;
    }

    const symbol = metaData['2. Symbol'];
    const lastRefreshed = metaData['3. Last Refreshed'];
    const dailyData = timeSeries[lastRefreshed];
    
    const stockName = metaData['1. Information'];
    const stockPrice = dailyData['4. close'];
    const stockOpen = dailyData['1. open'];
    const stockHigh = dailyData['2. high'];
    const stockLow = dailyData['3. low'];
    const stockVolume = dailyData['5. volume'];

    // Clear the stock data first
    stockNameDisplay.textContent = "";
    stockSymbolDisplay.textContent = "";
    stockPriceDisplay.textContent = "";
    stockOpenDisplay.textContent = "";
    stockHighDisplay.textContent = "";
    stockLowDisplay.textContent = "";
    stockVolumeDisplay.textContent = "";

    // Update with the new data
    stockNameDisplay.textContent = stockName;
    stockSymbolDisplay.textContent = `Symbol: ${symbol}`;
    stockPriceDisplay.textContent = `Price: $${stockPrice}`;
    stockOpenDisplay.textContent = `Open: $${stockOpen}`;
    stockHighDisplay.textContent = `High: $${stockHigh}`;
    stockLowDisplay.textContent = `Low: $${stockLow}`;
    stockVolumeDisplay.textContent = `Volume: ${stockVolume}`;
}


