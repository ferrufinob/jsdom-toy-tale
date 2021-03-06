let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const form = document.querySelector(".add-toy-form");
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      form.addEventListener("submit", postToyData);
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // get request
  function fetchToys() {
    fetch("http://localhost:3000/toys/")
      .then((response) => response.json())
      .then((data) => {
        data.forEach(displayToy);
        console.log(data);
      });
  }

  // POST request
  function postToyData(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const destinationURL = "http://localhost:3000/toys/";
    fetch(destinationURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0,
      }),
    })
      .then((response) => response.json())

      .then((data) => {
        let newToy = renderToys(data);
        toyCollection.append(newToy);
      });
  }

  function likes(event) {
    // p -> direct child of same parent and in same tree, increase count for p
    let likeCount = parseInt(event.target.previousElementSibling.innerText) + 1;
    fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: likeCount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        event.target.previousElementSibling.innerText = `${likeCount} likes`;
      });
  }
  // display them on page
  function displayToy(toy) {
    let h2 = document.createElement("h2");
    h2.innerText = toy.name;
    let img = document.createElement("img");
    img.src = toy.image;
    img.className = "toy-avatar";
    let p = document.createElement("p");
    p.innerText = `${toy.likes} likes`;
    let btn = document.createElement("button");
    btn.id = toy.id;
    btn.className = "like-btn";
    btn.innerText = "Like ❤️";

    btn.addEventListener("click", (e) => {
      // the ${event.target.id} needed for url
      // console.log(e.target.id);
      likes(e);
    });
    const card = document.createElement("div");
    card.className = "card";
    card.append(h2, img, p, btn);
    toyCollection.append(card);
  }

  //make iterable object for easier displaying
  function renderToys(toy) {
    toy.forEach((toy) => displayToy(toy));
  }
});
