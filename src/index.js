let addToy = false;
const destinationURL = "http://localhost:3000/toys/";

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const form = document.querySelector(".add-toy-form");
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    // ↓↓↓ the job of this code is to make the form go away if add toy  button has been clicked on more than once (toggler) ↓↓↓
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
    fetch(destinationURL)
      .then((response) => response.json())
      .then((data) => {
        data.forEach(displayToy);
        console.log(data);
      });
  }

  // POST request
  function postToyData(e) {
    e.preventDefault();
    fetch(destinationURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        image: e.target.image.value,
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
    toyCollection.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar"></img>
        <p>${toy.likes} likes</p>
        <button id="${toy.id}" class="like-btn">
          Like ❤️
        </button>
      </div> `
    );

    const btn = document.querySelectorAll(".like-btn");
    btn.forEach((button) => {
      button.addEventListener("click", (e) => {
        // the ${event.target.id} needed for url
        // console.log(e.target.id);
        likes(e);
      });
    });
  }

  //make iterable object for easier displaying
  function renderToys(toy) {
    toy.forEach((toy) => displayToy(toy));
  }
});
