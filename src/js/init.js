// SWAPI Base URL
const url = "https://swapi.dev/api/";

// Get the searchbar from the DOM and prevent form action
const searchBar = document.querySelector(".main-search");
searchBar.addEventListener("click", (e) => {
  e.preventDefault();
});

// Get initial response from SWAPI
async function getInitSwapiData() {
  // visa loadingAnimation
  displayLoading();
  // response innehåller body, headers, status
  const response = await fetch(url);
  // data innehåller ett .JSON objekt (javascript)
  const data = await response.json();
  return data;
}

// Run getSwapiData func
try {
  getInitSwapiData(url).then((data) => {
    hideLoading(); // när datan har hämtats ta bort loading animationen
    const categories = Object.keys(data); // skapa kategorier från data objektet
    // Run the populateSelect med vår ovanstående array med kategorier
    populateSelect(categories); // populera kategori select taggen dynamiskt med options
  });
} catch (error) {
  console.error(error);
}

// Populate the search field dropdown with options from SWAPI resources
function populateSelect(categories) {
  // hämta select från DOM:en
  const select = document.querySelector("#listSelector");
  // loopa igenom alla kategorier vi får från SWAPI
  for (let i = 0; i < categories.length; i++) {
    // skapar option taggar med createElement
    const option = document.createElement("option");
    option.setAttribute("value", categories[i]); // sätt value till kategorins namn
    const categoryName = capitalizeFirstLetter(categories[i]); // kör helper func för att göra första bokstaven versal
    option.textContent = categoryName; // lägg kategorins namn som textContent
    select.appendChild(option); // populera den färska option taggen till select
    // repetera tills alla kategorier är inne
  }
}
