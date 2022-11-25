function filterIt(arr, searchKey) {
  return arr.filter((obj) =>
    Object.keys(obj).some((key) => obj[key].includes(searchKey))
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
