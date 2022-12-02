// Global variables
const swapiUrl = "https://swapi.dev/api/"; // SWAPI API
const akababUrl = "https://akabab.github.io/starwars-api/api/all.json"; // AKABAB API (Secondary for complementary images)
const searchParameter = "?search="; // Sökterm som vi lägger till SWAPI URL strängen för att kunna söka i SWAPIs resurser

// get Loading element
const loader = document.querySelector("#searchBtn");
// show loading
function displayLoading() {
  loader.classList.add("display");
  loader.classList.remove("text-zinc-700");
  loader.classList.add("text-yellow-300");
  //Enables pointer-events-none so inputs cant be made while loading occurs
  searchBar.classList.add("pointer-events-none");
}
// hide loading
function hideLoading() {
  loader.classList.remove("display");
  loader.classList.add("text-zinc-700");
  loader.classList.remove("text-yellow-300");
  //Disables pointer-events-none so inputs can be made
  searchBar.classList.remove("pointer-events-none");
}

// Main function to fetch data from API
// Get response from SWAPI
function getSwapiData() {
  let selectValue = document.querySelector("#listSelector").value; // vilken kategori vi ska söka i
  let searchValue = document.querySelector("#searchField").value; // vad vi ska söka på
  let searchTerm = swapiUrl + selectValue + searchParameter + searchValue; // bygg upp söktermen av URL:en + kategori + sökParameter + sökVärdet
  console.log(searchTerm); // logga söktermen

  // hämta sökFältet från DOM:en
  const searchField = document.querySelector("#searchField");

  // kolla så att man skrivit in minst 2 karaktärer i sökfältet
  if (searchValue.length >= 2) {
    displayLoading();
    // hämta data för söktermen (som egentligen är en konstruerad URL)
    fetch(searchTerm)
      .then((response) => response.json())
      .then((data) => {
        // kör allt nedan när vi hämtat datan från SWAPI
        hideLoading();
        hideError();
        // Om söktermen inte ger några resultat, kör error funktionen som visar en ledsen luke
        if (data.count === 0) {
          noResults();
        }
        // om vi motförmodan får resultat så blir vi glada och rendererar dem med
        // renderSearhResults() där vi passerar in datan vi hämtade ovan som parameter
        else {
          searchField.classList.remove("focus:outline-red-700"); // ta bort error outline
          searchField.setAttribute("placeholder", "Search SWAPI"); // ta bort error placeholder
          renderSearchResults(data); // kör the main show
        }
      })
      // fånga error
      .catch((error) => {
        console.error(error);
      });
  }
  // när vi skriver in färre än 2 karaktärer ger vi lite errors i form av
  // outline och fokuserar sökfältet med en error placeholder
  else {
    console.log("TOO FEW CHARACTERS");
    searchField.value = "";
    searchField.focus();
    searchField.classList.add("focus:outline-red-700");
    searchField.setAttribute("placeholder", "Enter 2 or more characters");
  }
}

// en ny funktion som hämtar API data men denna gången från AKABAB
// vi testar här en async await funktion istället för .then
// Get response from akabab
async function getAkababData(akababUrl) {
  const response = await fetch(akababUrl);
  const data = await response.json();
  return data;
}

// en funktion som hämtar alla bilder samt namn i en ny array med objekt
// som matchar sökvärdet
async function searchAkabab() {
  let data = await getAkababData(akababUrl);
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

  // kör helper funktionen filterIt som returnerar en ny array med matchande resultat
  const matches = filterIt(people, searchValue);
  return await matches; // returnera den nya arrayen
}

let errorMessagediv = document.querySelector(".errorMessage");

// en funktion som ger error i form av en ledsen luke
// körs längre upp
// If no results were given
function noResults() {
  const imgContainer = document.querySelector(".imgContainer");
  let span = document.querySelector(".error-span");

  let searchResults = document.querySelector(".search-results");
  searchResults.classList.add("hidden");

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
  errorMessagediv.classList.add("hidden"); // hide error with class display:none;
}

// the main show
// the main event
// Render the search results from the API call
async function renderSearchResults(data) {
  console.log("Rendering search results");
  console.log(data); // Logs the API response

  // Gets the element to clone into (searchResults) and the element
  // to clone (btnNode)
  let searchResults = document.querySelector(".search-results");
  searchResults.classList.remove("hidden"); // visa sökresultat DIV:en
  const btnNode = document.querySelector(".search-result"); // hämta första knappen (hårdkodad i HTML:en)
  btnNode.addEventListener("click", renderModal); // lägg till en eventListener på första knappen (hårdkodad)
  let lastElement = [data.results.length - 1]; // ta fram sista index i API data arrayen (dvs, sista elementet)
  btnNode.data = data.results[lastElement]; // lägg till en property på första knappen som innehåller sista elementet

  searchResults.innerHTML = ""; // Clear previous search results
  searchResults.appendChild(btnNode); // Clear previous search results

  // deklarera en tom array
  let names = [];
  // iterate over each API response (data.count)
  for (let j = 0; j < data.count; j++) {
    // Append the amount of search results
    let btnNodeClone = btnNode.cloneNode(true); // clone a new search result
    btnNodeClone.setAttribute("id", `clone${j}`); // ge varje ny klon ett id
    btnNodeClone.addEventListener("click", renderModal); // ge varje klon en eventListener som kör renderModal()
    btnNodeClone.data = data.results[j - 1]; // assign the API response to the button
    searchResults.appendChild(btnNodeClone); // append a new search result

    // Get each span tag with applicable class (key || value)
    let spanKeys = searchResults.querySelectorAll("li>span.key");
    let spanValues = searchResults.querySelectorAll("li>span.value");

    // iterate over each attribute
    // Print the attributes for each search result

    const searchResultObject = data.results[j];
    const keys = Object.keys(searchResultObject);
    const values = Object.values(searchResultObject);
    names.push(data.results[j].name);

    // Loopa 4 gånger
    for (let i = 0; i < 4; i++) {
      spanKeys[i].innerText = keys[i];
      spanValues[i].innerText = values[i];
    }
  }

  ///////////////////////////////////////////////////////
  ///// RENDER IMAGES FROM SECONDARY API (DONT ASK FOR EXPLANATION)
  //get hidden button
  let cloneZero = document.querySelectorAll("#clone0");
  cloneZero[0].remove(); // remove first clone for causing bug
  // Populate image-tags
  // run the SearchAkabab function that runs getAkabab within
  // AKA: get imgArray from AKABAB API
  let imgArray = await searchAkabab();
  // Get all the span tags containg the <img>
  let spanImg = searchResults.querySelectorAll("li>span.img-key>img");
  // Get all the span.value tags
  let spanNamesNodes = document.querySelectorAll("li.search-title>span.value");

  console.log(spanNamesNodes);
  // Declare trimmed nodeList
  let spanNamesTrimmed = [];
  // Trim spanNamesNodes then push to spanNamesTrimmed
  for (let i = 0; i < spanNamesNodes.length; i++) {
    if (spanNamesNodes[i].innerText !== "") {
      spanNamesTrimmed.push({
        name: spanNamesNodes[i].innerText.toLowerCase(),
      });
    }
  }
  console.log(spanNamesTrimmed);

  // Begin the attempt to map names and images
  let selectValue = document.querySelector("#listSelector").value;
  if (selectValue === "people") {
    // Trim imgArray then push to trimmedImgArray
    let trimmedImgArray = [];
    for (let i = 0; i < spanNamesTrimmed.length; i++) {
      trimmedImgArray.push({
        name: imgArray[i].name,
        image: imgArray[i].image,
      });
    }
    console.log(trimmedImgArray);

    // match corresponding image to the search result
    for (let i = 0; i < spanNamesTrimmed.length; i++) {
      console.log(`i = ${i}`);
      for (let j = 0; j < trimmedImgArray.length; j++) {
        if (spanNamesTrimmed[i].name === trimmedImgArray[j].name) {
          console.log(
            `${spanNamesTrimmed[i].name} === ${trimmedImgArray[j].name}`
          );
          // populate the searchResults with images
          spanImg[i].src = trimmedImgArray[j].image;
          spanImg[i].alt = trimmedImgArray[j].name;
        }
      }
    }
  } else {
    // remove the previous images from the previous search result
    console.log("Removed src");
    for (let i = 0; i < spanNamesTrimmed.length; i++) {
      spanImg[i].src = "";
      spanImg[i].alt = "";
    }
  }
  ///// RENDER IMAGES FROM SECONDARY API (DONT ASK FOR EXPLANATION)
  ///////////////////////////////////////////////////////
}

// Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const closeModalOverlay = document.querySelector(".overlay");
const testImg = document.createElement("img");

try {
  function renderModal(data) {
    console.log("rendering modal");
    openModal();

    const searchResultObject = data.currentTarget.data;
    console.log(searchResultObject);

    const listItems = document.querySelectorAll(".modal > ul > li");
    const keys = Object.keys(searchResultObject);
    console.log(keys);
    const values = Object.values(searchResultObject);
    console.log(values);

    for (let i = 0; i < keys.length; i++) {
      // console.log(`${keys}: ${values}`);
      let modalKeys = modal.querySelectorAll("li>span.modalKey");
      let modalValues = modal.querySelectorAll("li>span.modalValue");

      if (values[i].length === 0 || Array.isArray(values[i])) {
        console.log(`${values[i]} is invalid`);
        modalKeys[i].innerText = "";
        modalValues[i].innerText = "";

        // Hide unpopulated <li>
        listItems[i + 1].classList.add("!hidden");
      } else {
        modalKeys[i].innerText = keys[i];
        modalValues[i].innerText = values[i];

        // Show previously hidden <li>
        listItems[i + 1].classList.remove("!hidden");
      }
    }
  }
} catch (error) {
  console.log(error);
}
const openModal = function () {
  modal.classList.remove("modalHidden");
  overlay.classList.remove("modalHidden");
};
const closeModal = function () {
  console.log("test");
  modal.classList.add("modalHidden");
  overlay.classList.add("modalHidden");
};
