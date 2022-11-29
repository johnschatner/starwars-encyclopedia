// Global variables
const swapiUrl = "https://swapi.dev/api/";
const akababUrl = "https://akabab.github.io/starwars-api/api/all.json";
const searchParameter = "?search=";

// get Loading element
const loader = document.querySelector("#loading");
// show loading
function displayLoading() {
  loader.classList.add("display");
  //Enables pointer-events-none so inputs cant be made while loading occurs
  searchBar.classList.add("pointer-events-none");
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}
// hide loading
function hideLoading() {
  loader.classList.remove("display");
  //Disables pointer-events-none so inputs can be made
  searchBar.classList.remove("pointer-events-none");
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
        hideError();
        //checkIfPeople();
        if (data.count === 0) {
          noResults();
        } else {
          searchField.classList.remove("focus:outline-red-700");
          searchField.setAttribute("placeholder", "Search SWAPI");
          renderSearchResults(data);
        }
      })
      .catch((e) => {
        console.error(e);
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
  if (selectValue === "people") {
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
let errorMessagediv = document.querySelector(".errorMessage");

// If no results were given
function noResults() {
  const imgContainer = document.querySelector(".imgContainer");
  let span = document.querySelector(".error-span");

  span.innerHTML = "No results were found!";
  errorMessagediv.classList.remove("hidden");
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
function hideError() {
  errorMessagediv.classList.add("hidden");
}
// Render the search results from the API call
function renderSearchResults(data) {
  console.log("Rendering search results");
  console.log(data);
  let spanKeys = document.querySelectorAll("li>span.key");
  let spanValues = document.querySelectorAll("li>span.value");

  console.log(data.results[0]);
  let keyValuePairs = Object.entries(data.results[0]);
  console.log(keyValuePairs);

  // Make the array pretty
  // let prettyArray = [];
  // for (let i = 0; i < keyValuePairs.length; i++) {
  //   prettyArray.push(capitalizeFirstLetter(keyValuePairs[i][0]));
  //   prettyArray.push(capitalizeFirstLetter(keyValuePairs[i][1]));
  // }

  for (let i = 0; i < keyValuePairs.length; i++) {
    if (keyValuePairs[i][1] !== "n/a") {
      spanKeys[i].innerText = keyValuePairs[i][0];
      spanValues[i].innerText = keyValuePairs[i][1];
    } else {
      spanKeys[i].innerText = keyValuePairs[i + 1][0];
      spanValues[i].innerText = keyValuePairs[i + 1][1];
    }
  }
}
