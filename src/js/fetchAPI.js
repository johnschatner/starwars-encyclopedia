const swapiUrl = "https://swapi.dev/api/";
const searchParameter = "?search=";

function getSwapiData() {
  let selectValue = document.querySelector("#listSelector").value;
  let searchValue = document.querySelector("#searchField").value;
  let searchTerm = swapiUrl + selectValue + searchParameter + searchValue;

  console.log(searchTerm);

  fetch(searchTerm)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
