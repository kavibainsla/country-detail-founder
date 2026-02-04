const grid = document.getElementById("countriesGrid");

fetch("https://restcountries.com/v3.1/all?fields=name,flags")
  .then(res => res.json())
  .then(data => {
    data.forEach(country => {
      const card = document.createElement("div");
      card.className = "country-card";

      card.innerHTML = `
        <img src="${country.flags.svg}" alt="flag">
        <p>${country.name.common}</p>
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => {
    grid.innerHTML = "<p style='color:red'>Failed to load countries</p>";
  });
