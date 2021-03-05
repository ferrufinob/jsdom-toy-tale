let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // get request
  function fetchToys() {
    fetch("http://localhost:3000/toys")
      .then((response) => response.json())
      .then((data) => {
        renderToys(data);
        console.log(data);
      });
  }

  // display them on page
  function DisplayToy(toy) {
    const toyCollection = document.querySelector("#toy-collection");
    const card = document.createElement("div");
    card.id = "card";
    toyCollection.appendChild(card);
    const h2 = document.createElement("h2");
    h2.innerText = toy["name"];
    card.appendChild(h2);
    const img = document.createElement("img");
    img.src = toy["image"];
    img.id = "toy-avatar";
    img.style = "height: 125px";
    card.appendChild(img);
    const p = document.createElement("p");
    p.innerText = `${toy["likes"]} likes`;
    card.appendChild(p);
    const btn = document.createElement("button");
    btn.innerText = "Like ❤️";
    btn.style = "margin-left: 10px";
    btn.id = "like-btn";

    p.appendChild(btn);
  }

  //make iterable object for easier displaying
  function renderToys(toy) {
    toy.forEach((toy) => DisplayToy(toy));
  }

  // POST request
});
