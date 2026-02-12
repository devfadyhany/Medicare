const cart = document.getElementById("cart");
const cartOpen = document.getElementById("cart-open");
const cartClose = document.getElementById("cart-close");
const cartContent = document.getElementById("cart-content");

document.addEventListener("click", (e) => {
  if (cart) {
    if (
      !cart.contains(e.target) &&
      !cartOpen.contains(e.target) &&
      !e.target.classList.contains("cart-ignore")
    ) {
      cart.classList.remove("open");
    }
  }
});

if (cart) {
  cartOpen.addEventListener("click", () => cart.classList.add("open"));
  cartClose.addEventListener("click", () => cart.classList.remove("open"));
}

function CreateCartMenuCard(product) {
  let cardComponent = `<div class="d-flex gap-2 border rounded align-items-center p-2 shadow-sm">
          <img
            class="rounded-circle"
            src="${product.img}"
            style="width: 70px; height: 70px;object-fit: cover;"
          />

          <div class="d-flex flex-column flex-grow-1">
            <h5 class="my-text-secondary m-0">${product.title}</h5>
            <p class="m-0">Price: $${(product.price * product.quantity).toFixed(2)}</p>
          </div>

          <div
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <button
              onclick="ChangeQuantity(${+product.id}, 1)"
              type="button"
              class="btn btn-sm my-btn-primary cart-ignore"
            >
              <i class="fa fa-plus cart-ignore" aria-hidden="true"></i>
            </button>

            <p class="m-0 my-2">${product.quantity}</p>

            <button
              onclick="ChangeQuantity(${+product.id}, -1)"
              type="button"
              class="btn btn-sm my-btn-primary cart-ignore"
            >
              <i class="fa fa-minus cart-ignore" aria-hidden="true"></i>
            </button>
          </div>
        </div>`;

  return cardComponent;
}

function AddToCart(e) {
  if (!currentUser) {
    location.href = "login.html";
    return;
  }

  userCart[+e.id] = 1;

  e.classList = "btn my-btn-danger me-1";
  e.innerHTML = "Remove From Cart";
  e.setAttribute("onclick", "RemoveFromCart(this)");

  RenderDictionary(cartContent, userCart, CreateCartMenuCard, true);
}

function RemoveFromCart(e, type = "cart-menu") {
  delete userCart[+e.id];

  if (type == "cart-menu") {
    e.classList = "btn my-btn-primary me-1";
    e.innerHTML = "Add To Cart";
    e.setAttribute("onclick", "AddToCart(this)");
    RenderDictionary(cartContent, userCart, CreateCartMenuCard, true);
  } else if (type == "cart") {
    RenderUserCart();
  } else if (type == "favourite") {
  }
}

function ChangeQuantity(id, val, type = "cart-menu") {
  userCart[id] += val;

  if (userCart[id] == 0) {
    delete userCart[id];

    if (type == "cart-menu") {
      let btn = document.getElementById(id);

      btn.classList = "btn btn-primary me-1";
      btn.innerHTML = "Add To Cart";
      btn.setAttribute("onclick", "AddToCart(this)");
    }
  }

  currentUser.cart = userCart;

  if (type == "cart-menu") {
    RenderDictionary(cartContent, userCart, CreateCartMenuCard, true);
  } else if (type == "cart") {
    RenderUserCart();
  } else if (type == "favourite") {
    RenderDictionary(
      favouriteContent,
      userFavourites,
      CreateFavouriteCard,
      "favourite",
    );
  }
}
