// Global variables
const swapiUrl = "https://swapi.dev/api/";
const akababUrl = "https://akabab.github.io/starwars-api/api/all.json";
const searchParameter = "?search=";

// Get response from SWAPI
function getSwapiData() {
  let selectValue = document.querySelector("#listSelector").value;
  let searchValue = document.querySelector("#searchField").value;
  let searchTerm = swapiUrl + selectValue + searchParameter + searchValue;

  console.log(searchTerm);

  fetch(searchTerm)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      checkIfPeople();
    });
}

// Get response from akabab
async function getAkababData(akababUrl) {
  const response = await fetch(akababUrl);
  const data = await response.json();
  return data;
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

async function searchAkabab(data) {
  console.log(data);
  let searchValue = document.querySelector("#searchField").value;
  searchValue = searchValue.toLowerCase();
  const people = []; // Create new object to store "Name" and "Image"

  for (let i = 0; i < data.length; i++) {
    // Remove dashes when user doesn't search with it and leave it in when they do
    // Eg: search = c-3po {name: c-3po}, search = c3po {name: c3po}
    // Make everything lowercase
    const regE = /[^a-z0-9 -]/g;
    const regDash = /[^a-z0-9 é]/g;

    // fix search query for dashes (-) and special characters (é)
    // fix search query for dashes (-) and special characters (é)
    // fix search query for dashes (-) and special characters (é)
    let searchableName = data[i].name.toLowerCase();

    console.log(searchableName);
    // fix search query for dashes (-) and special characters (é)
    // fix search query for dashes (-) and special characters (é)
    // fix search query for dashes (-) and special characters (é)
    // fix search query for dashes (-) and special characters (é)
    // fix search query for dashes (-) and special characters (é)

    const person = {
      name: searchableName,
      image: data[i].image,
    };
    people.push(person);
  }

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
