// SWAPI Base URL
const url = "https://swapi.dev/api/";

// Get the searchbar from the DOM and prevent form action
const searchBar = document.querySelector(".main-search");
searchBar.addEventListener("click", (e) => {
  e.preventDefault();
});

// Get response from SWAPI
async function getInitSwapiData() {
  displayLoading();
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
// Run getSwapiData func
getInitSwapiData(url).then((data) => {
  hideLoading();
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
