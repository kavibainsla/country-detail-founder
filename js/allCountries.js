const grid = document.getElementById("countriesGrid");

fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3")
  .then(res => res.json())
  .then(data => {
    grid.innerHTML = "";

    data.forEach(country => {
      const card = document.createElement("div");
      card.className = "country-card";

      card.innerHTML = `
        <img src="${country.flags.svg}" alt="flag">
        <p class="country-name">${country.name.common}</p>
        <div class="details" style="display:none;"></div>
      `;

      card.addEventListener("click", () => toggleDetails(country.cca3, card));
      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    grid.innerHTML = "<p style='color:red'>Failed to load countries</p>";
  });

function toggleDetails(code, card) {
  const detailsDiv = card.querySelector(".details");

  // toggle OFF
  if (detailsDiv.innerHTML !== "") {
    detailsDiv.innerHTML = "";
    detailsDiv.style.display = "none";
    return;
  }

  // fetch details ON CLICK
  fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    .then(res => res.json())
    .then(data => {
      const c = data[0];

      detailsDiv.innerHTML = `
        <p><strong>Capital:</strong> ${c.capital ? c.capital[0] : "N/A"}</p>
        <p><strong>Population:</strong> ${c.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${c.region}</p>
        <p><strong>Currency:</strong> ${
          c.currencies
            ? Object.values(c.currencies)[0].name
            : "N/A"
        }</p>
      `;
      detailsDiv.style.display = "block";
    })
    .catch(() => {
      detailsDiv.innerHTML = "<p>Error loading details</p>";
      detailsDiv.style.display = "block";
    });
}
