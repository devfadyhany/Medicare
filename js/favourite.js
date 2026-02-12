const favouriteContent = document.getElementById("favourite-content");

function CreateFavouriteCard(product) {
  let btnClasses, btnFunction;

  if (!userFavourites[product.id]) {
    btnClasses = "btn btn-danger";
    btnFunction = "AddToFavourite";
  } else {
    btnClasses = "btn text-danger";
    btnFunction = "RemoveFromFavourite";
  }

  let cardComponent = `<div class="fav-card card text-center p-0" style="width: 300px">
          <img class="card-img-top" style="height: 200px" src="${product.img}" />

          <div class="card-body">
            <h5 class="card-title my-text-primary">${product.title}</h5>
            <p class="card-text mb-3">
              Category: <span id="category-value">${product.category}</span>
            </p>
            <button
              onclick="${btnFunction}(this, ${+product.id}, true)"
              type="button"
              class="${btnClasses}"
            >
              <i
                class="fa fa-heart"
                style="pointer-events: none"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>`;

  return cardComponent;
}

function AddToFavourite(e, id, view = false) {
  if (!currentUser) {
    location.href = "login.html";
    return;
  }

  userFavourites[id] = 1;

  e.classList = "btn my-text-danger shadow-sm";
  e.setAttribute("onclick", `RemoveFromFavourite(this, ${id})`);

  if (view) {
    RenderDictionary(
      favouriteContent,
      userFavourites,
      CreateFavouriteCard,
      "favourite",
    );
  } else {
    UpdateCartInStorage();
  }
}

function RemoveFromFavourite(e, id, view = false) {
  delete userFavourites[id];

  e.classList = "btn my-text-secondary shadow-sm";
  e.setAttribute("onclick", `AddToFavourite(this, ${id})`);

  if (view) {
    RenderDictionary(
      favouriteContent,
      userFavourites,
      CreateFavouriteCard,
      "favourite",
    );
  } else {
    UpdateCartInStorage();
  }
}
