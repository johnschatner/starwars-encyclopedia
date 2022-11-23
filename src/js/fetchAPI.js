const origUrl = "http://swapi.dev/api/";
const searchParameter = "/?search=";

function getSwapiData() {
  let selectValue = document.querySelector("#listSelector").value;

  console.log(origUrl + selectValue + searchParameter);
  fetch(`${origUrl + selectValue + searchParameter}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
