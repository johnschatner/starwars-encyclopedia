/////////////////////////////////////////
// Animation Toggle
// Get cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Get animation toggle from DOM
const animationToggle = document.querySelector("#animationState");
const introToggle = document.querySelector("#introToggle");
console.log(introToggle);
// check if animation toggle was toggled previous session
if (getCookie("animationState") == "true") {
  animationToggle.checked = true;
  introToggle.setAttribute("data-after", "Disable intro");
} else if (getCookie("animationState") == "false") {
  animationToggle.checked = false;
  introToggle.setAttribute("data-after", "Enable intro");
}

// update the cookie when clicking animation toggle
animationToggle.addEventListener("click", () => {
  if (animationToggle.checked) {
    animationToggle.checked = true;
    document.cookie = "animationState=true";
    introToggle.setAttribute("data-after", "Disable intro");
  } else {
    animationToggle.checked = false;
    document.cookie = "animationState=false";
    introToggle.setAttribute("data-after", "Enable intro");
  }
  console.log(getCookie("animationState"));
});

// Fetch the DOM elements to pause animation
const starwarsDemoDiv = document.querySelector(".starwars-demo");
const wordStar = document.querySelector(".star");
const wordWars = document.querySelector(".wars");
const byline1 = document.querySelector(".byline");
const bylineSpan = document.querySelector(".byline span");
const mainAppWrapper = document.querySelector(".main-app-wrapper");

let elements = [
  starwarsDemoDiv,
  wordStar,
  wordWars,
  byline1,
  bylineSpan,
  mainAppWrapper,
];

// Set the animation duration
if (getCookie("animationState") == "true") {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.animationDuration = "4s";
  }
} else if (getCookie("animationState") == "false") {
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.animationDuration = "0s";
  }
}
