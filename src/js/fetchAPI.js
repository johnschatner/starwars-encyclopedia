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
      searchAkabab(data);
    });
  } else {
    console.log("(❁´◡`❁)");
  }
}

function searchAkabab(data) {
  console.log(data);
  let searchValue = document.querySelector("#searchField").value;
  searchValue = searchValue.toLowerCase();
  const people = []; // Create new object to store "Name" and "Image"

  for (let i = 0; i < data.length; i++) {
    // - Rebecca
    const person = {
      name: searchValue.includes("-")
        ? data[i].name.toLowerCase()
        : data[i].name.toLowerCase().replace("-", ""),
      image: data[i].image,
    };
    // - Rebecca
    people.push(person);
  }

  console.log(filterIt(people, searchValue));
}
