const rechercheInput = document.getElementById("rechercheInput"); 
const rangeInput = document.getElementById("rangeInput");
const afficheRange = document.getElementById("afficheRange");
const croissant = document.getElementById("croissant");
const decroissant = document.getElementById("decroissant");
const repasContainer = document.querySelector(".repas-container"); 
const boutonTri = document.querySelectorAll(".boutonTri");


let repasList = []; 
let triMethod = "";

const fetchRepas = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + rechercheInput.value)
    .then((response) => response.json())
    .then((data) => {
      repasList = data.meals;
      // console.log(repasList)
      afficheRepas();
    });
};

const afficheRepas = () => {
  repasContainer.innerHTML = "";
  repasList
  .sort((a1, a2) => {
    if (triMethod === "croissant")
        return a1.strMeal.localeCompare(a2.strMeal);
    else return a2.strMeal.localeCompare(a1.strMeal);
  })
    .slice(0, rangeInput.value)
    .map((repas) => {
        repasContainer.innerHTML += `
        <div class="repas-card">
            <div class="repas-info">
              <h3>${repas.strMeal}</h3>
              <p>Origine : ${repas.strArea}</p>
              <img src="${repas.strMealThumb}" alt="${repas.strMeal}" />
              <p class="description">${repas.strInstructions}</p> 
            </div>
          </div>
        `;
      });
};

const btnActive = (id) => {
  boutonTri.forEach((btn) => {
    if (btn.id === id) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
};
rangeInput.addEventListener("input", () => {
  afficheRange.textContent = rangeInput.value;
  afficheRepas();
});

rechercheInput.addEventListener("change", () => {
  fetchRepas();
});

croissant.addEventListener("click", () => {
  triMethod = "croissant";
  afficheRepas();
});

decroissant.addEventListener("click", () => {
  triMethod = "decroissant";
  afficheRepas();
});
// boutonTri.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     triMethod = btn.id;
//     btnActive(btn.id);
//     afficheRepas();
//   });
// });

fetchRepas();
