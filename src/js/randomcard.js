const randomCardDisplay = document.querySelector("#randomCardDisplay");

//hämtar akabab peoeple
function addRandomCard() {
  const promiseGetPeople = fetch(
    "https://akabab.github.io/starwars-api/api/all.json"
  );

  promiseGetPeople
    .then((response) => {
      const processingPromise = response.json();
      return processingPromise;
    })

    //använder randomNUmmerGEnerator för att slumpa fram plats i array
    .then((arrayOfPeople) => {
      const randomNumber1 = getRandomNumber(0, arrayOfPeople.length - 1);

      let randomNumber2 = -1;
      do {
        randomNumber2 = getRandomNumber(0, arrayOfPeople.length - 1);
      } while (randomNumber1 === randomNumber2);

      let randomNumber3 = -1;
      do {
        randomNumber3 = getRandomNumber(0, arrayOfPeople.length - 1);
      } while (
        randomNumber3 === randomNumber1 ||
        randomNumber3 === randomNumber2
      );

      //Använder framslumpat arraynummer, hämtar bild och appendar till div.
      const img1 = document.createElement("img");
      img1.src = arrayOfPeople[randomNumber1].image;
      img1.alt = "";

      randomCardDisplay.appendChild(img1);
      console.log(randomCardDisplay);

      const img2 = document.createElement("img");
      img2.src = arrayOfPeople[randomNumber2].image;
      img2.alt = "";

      randomCardDisplay.appendChild(img2);
      console.log(randomCardDisplay);

      const img3 = document.createElement("img");
      img3.src = arrayOfPeople[randomNumber3].image;
      img3.alt = "";

      randomCardDisplay.appendChild(img3);
      console.log(randomCardDisplay);
    });
}
//om img inte finns visas denna tyvärr ändå. Svårlöst för mig. Jag får tillbaks en URL som ska ha en bild, men jag kan inte veta om URLen inte fungerar i förhand.

//randome numemrgenerator
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
