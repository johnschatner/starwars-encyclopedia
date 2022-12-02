// filtrerar en array baserat på en sökterm och returnerar
// en ny array med resultaten
function filterIt(arr, searchKey) {
  return arr.filter((obj) =>
    Object.keys(obj).some((key) => obj[key].includes(searchKey))
  );
}

// Gör första bokstaven till en versal (gigantisk)
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
