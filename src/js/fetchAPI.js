// Global variables
const swapiUrl = "https://swapi.dev/api/";
const akababUrl = "https://akabab.github.io/starwars-api/api/all.json";
const searchParameter = "?search=";

// get Loading element
const loader = document.querySelector("#loading");
// show loading
function displayLoading() {
  loader.classList.add("display");
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}
// hide loading
function hideLoading() {
  loader.classList.remove("display");
}

// Main function to fetch data from API
// Get response from SWAPI
function getSwapiData() {
  let selectValue = document.querySelector("#listSelector").value;
  let searchValue = document.querySelector("#searchField").value;
  let searchTerm = swapiUrl + selectValue + searchParameter + searchValue;
  console.log(searchTerm);

  const searchField = document.querySelector("#searchField");

  if (searchValue.length >= 2) {
    displayLoading();
    fetch(searchTerm)
      .then((response) => response.json())
      .then((data) => {
        hideLoading();
        console.log(data);
        checkIfPeople();
        if (data.count === 0) {
          noResults();
        } else {
          searchField.classList.remove("focus:outline-red-700");
          searchField.setAttribute("placeholder", "Search SWAPI");
          renderSearchResults(data);
        }
      });
  } else {
    console.log("TOO FEW CHARACTERS");
    searchField.value = "";
    searchField.focus();
    searchField.classList.add("focus:outline-red-700");
    searchField.setAttribute("placeholder", "Enter 2 or more characters");
  }
}

// Run getSwapiData func
function checkIfPeople() {
  let selectValue = document.querySelector("#listSelector").value;
  console.log(selectValue);
  if (selectValue == "people") {
    getAkababData(akababUrl).then((data) => {
      searchAkabab(data).then((matches) => {
        renderAkabab(matches);
      });
    });
  } else {
    console.log("(❁´◡`❁)");
  }
}

// Get response from akabab
async function getAkababData(akababUrl) {
  const response = await fetch(akababUrl);
  const data = await response.json();
  return data;
}

async function searchAkabab(data) {
  console.log(data);
  let searchValue = document.querySelector("#searchField").value;
  searchValue = searchValue.toLowerCase();
  const people = []; // Create new object to store "Name" and "Image"

  for (let i = 0; i < data.length; i++) {
    // replace the original array with updated names that
    // are easier to find with our search function
    let searchableName = data[i].name.toLowerCase();
    // checks if the original name has a "-" or "é" and if we have either
    // character in our search query
    if (searchableName.includes("-") && !searchValue.includes("-")) {
      searchableName = searchableName.replace("-", "");
    } else if (searchableName.includes("é") && !searchValue.includes("é")) {
      searchableName = searchableName.replace("é", "e");
    }

    // Create the person object {} that will be pushed into the
    // people array []
    const person = {
      name: searchableName,
      image: data[i].image,
    };
    people.push(person);
  }

  console.log(people);
  const matches = filterIt(people, searchValue);
  return await matches;
}

function renderAkabab(matches) {
  console.log(matches);
  const result = document.querySelector(".result");
  for (let i = 0; i < matches.length; i++) {
    const img = document.createElement("img");
    img.src = matches[i].image;
    img.className = "w-64";
    result.appendChild(img);
  }
}

// If no results were given
function noResults() {
  const imgContainer = document.querySelector(".imgContainer");
  let span = document.querySelector(".error-span");

  span.innerHTML = "No results were found!";

  let img = document.createElement("img");
  img.setAttribute("id", "existingImg");
  img.className = "w-full h-full object-cover rounded-md";
  img.src =
    "https://starwarsblog.starwars.com/wp-content/uploads/sites/8/2017/10/star-wars-empire-strikes-back-luke-skywalker-1.jpg";
  if (document.querySelector("#existingImg")) {
    console.log("Already error");
  } else {
    imgContainer.appendChild(img);
  }
  imgContainer.appendChild(span);
}
// Render the search results from the API call
function renderSearchResults(data) {
  console.log("Rendering search results");
}
