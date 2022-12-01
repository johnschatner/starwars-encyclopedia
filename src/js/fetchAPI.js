// Global variables
const swapiUrl = "https://swapi.dev/api/";
const akababUrl = "https://akabab.github.io/starwars-api/api/all.json";
const searchParameter = "?search=";

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

// Get response from akabab
async function getAkababData(akababUrl) {
  const response = await fetch(akababUrl);
  const data = await response.json();
  return data;
}

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

// Render the search results from the API call
async function renderSearchResults(data) {
  console.log("Rendering search results");
  console.log(data); // Logs the API response

  // Gets the element to clone into (searchResults) and the element
  // to clone (btnNode)
  let searchResults = document.querySelector(".search-results");
  searchResults.classList.remove("hidden");
  const btnNode = document.querySelector(".search-result");
  btnNode.addEventListener("click", renderModal);
  let lastElement = [data.results.length - 1];
  btnNode.data = data.results[lastElement];

  searchResults.innerHTML = ""; // Clear previous search results
  searchResults.appendChild(btnNode); // Clear previous search results

  let names = [];
  // iterate over each API response (data.count)
  for (let j = 0; j < data.count; j++) {
    // Append the amount of search results
    let btnNodeClone = btnNode.cloneNode(true); // clone a new search result
    btnNodeClone.setAttribute("id", `clone${j}`);
    btnNodeClone.addEventListener("click", renderModal);
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
    // if (imgArray[j].name === spanValues[j].innerText) {
    //   console.log(true);
    //   spanImg[j].src = imgArray[j].image;
    // } else {
    //   console.log(false);
  }

  /// HIGHLY EXPERIMENTAL
  //get hidden button
  let cloneZero = document.querySelectorAll("#clone0");
  cloneZero[0].remove();
  // Populate image-tags
  let imgArray = await searchAkabab();
  // Get all the span tags containg the <img>
  let spanImg = searchResults.querySelectorAll("li>span.img-key>img");
  // Get all the span.value tags
  let spanNamesNodes = document.querySelectorAll("li.search-title>span.value");

  // Clear previous pictures

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

    console.log("We are people");
    for (let i = 0; i < spanNamesTrimmed.length; i++) {
      console.log(`i = ${i}`);
      for (let j = 0; j < trimmedImgArray.length; j++) {
        if (spanNamesTrimmed[i].name === trimmedImgArray[j].name) {
          console.log(
            `${spanNamesTrimmed[i].name} === ${trimmedImgArray[j].name}`
          );

          // // Attempt to push images onto modal window background
          // let modalWindow = document.querySelector(".modal");
          // modalWindow.style.backgroundImage = `url(${spanImg[i].src})`;
          // console.log(modalWindow.style.backgroundImage);

          spanImg[i].src = trimmedImgArray[j].image;
          spanImg[i].alt = trimmedImgArray[j].name;
        }
      }
    }
  } else {
    console.log("Removed src");
    for (let i = 0; i < spanNamesTrimmed.length; i++) {
      spanImg[i].src = "";
      spanImg[i].alt = "";
    }
  }
}

// Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const closeModalOverlay = document.querySelector(".overlay");
const testImg = document.createElement("img");

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
const openModal = function () {
  modal.classList.remove("modalHidden");
  overlay.classList.remove("modalHidden");
};
const closeModal = function () {
  console.log("test");
  modal.classList.add("modalHidden");
  overlay.classList.add("modalHidden");
};

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
closeModalOverlay.addEventListener("click", closeModal);
