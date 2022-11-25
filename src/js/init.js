// SWAPI Base URL
const url = "https://swapi.dev/api/";

// Get response from SWAPI
async function getInitSwapiData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
// Run getSwapiData func
getInitSwapiData(url).then((data) => {
  const categories = Object.keys(data);
  // Run the populateSelect
  populateSelect(categories);
});

// Populate the search field dropdown with options from SWAPI resources
function populateSelect(categories) {
  const select = document.querySelector("#listSelector");
  for (let i = 0; i < categories.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", categories[i]);
    const categoryName = capitalizeFirstLetter(categories[i]);
    option.textContent = categoryName;
    select.appendChild(option);
  }
}
