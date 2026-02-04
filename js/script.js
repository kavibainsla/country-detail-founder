const searchBtn = document.getElementById("searchBtn");
const countryInput = document.getElementById("countryInput");
const result = document.getElementById("result");

searchBtn.addEventListener("click", () => {
  const countryName = countryInput.value.trim();

  if (countryName === "") {
    result.innerHTML = `<p class="error">Please enter a country name</p>`;
    return;
  }

  fetchCountry(countryName);
});

function fetchCountry(country) {
  const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then(data => {
      displayCountry(data[0]);
    })
    .catch(error => {
      result.innerHTML = `<p class="error">${error.message}</p>`;
    });
}

function displayCountry(country) {
  result.innerHTML = `
    <img src="${country.flags.svg}" alt="Flag">
    <h2>${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name}</p>
  `;
}
