const satelliteContainer = document.querySelector(".satellite");

// Function to create a card element for satellite data
function createSatelliteCard(element) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${element.country}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${element.launch_date}</h6>
            <p class="card-text">ID : ${element.id}</p>
            <p class="card-text">Mass : ${element.mass} Kilograms</p>
            <p class="card-text">Launcher : ${element.launcher}</p>
        </div>`;
    return card;
}

// Function to fetch satellite data from the ISRO API
async function fetchSatelliteData() {
    const apiUrl = "https://isro.vercel.app/api/customer_satellites";

    try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Function to display satellite data on the webpage
function displaySatelliteData() {
    fetchSatelliteData()
        .then(data => {
            data.customer_satellites.forEach(element => {
                const card = createSatelliteCard(element);
                satelliteContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error displaying data:", error));
}

// Initial call to display satellite data when the page loads
displaySatelliteData();
