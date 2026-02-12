function CreateCartCard(product) {
  let cardComponent = `<div
          class="col-10 col-md-4 d-flex flex-column flex-lg-row align-items-center gap-2 shadow rounded p-2 p-lg-1"
        >
          <img class="rounded cart-card-img" src="${product.img}" />

          <div class="d-flex flex-column flex-grow-1 p-0 m-0 w-100">
            <h5 class="my-text-secondary m-0">${product.title}</h5>
            <p class="m-0"><span class="fw-bold">Category:</span> ${product.category}</p>
            <p class="m-0"><span class="fw-bold">Price:</span> $${(product.price * product.quantity).toFixed(2)}</p>

            <div
              class="d-flex flex-column flex-lg-row mt-auto mt-lg-2 gap-0 gap-lg-2 flex-wrap"
            >
              <div
                class="d-flex align-items-center gap-2"
              >
                <button
                  onclick="ChangeQuantity(${+product.id}, -1, 'cart')"
                  type="button"
                  class="btn btn-sm my-btn-primary"
                >
                  <i class="fa fa-minus" aria-hidden="true"></i>
                </button>

                <p class="m-0 my-2 text-center">${product.quantity}</p>

                <button
                  onclick="ChangeQuantity(${+product.id}, 1, 'cart')"
                  type="button"
                  class="btn btn-sm my-btn-primary"
                >
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>

              <div class="flex-grow-1 d-flex justify-content-end align-items-center">
                <button
                  id="${product.id}"
                  onclick="RemoveFromCart(this, 'cart')"
                  type="button"
                  class="btn btn-sm my-btn-danger w-100"
                >
                  Remove From Cart
                </button>
              </div>
            </div>
          </div>
        </div>`;

  return cardComponent;
}

function CalcTotalPrice() {
  const totalPrice = document.getElementById("total-price");

  let total = 0;

  for (const id in userCart) {
    let product = products.find((product) => product.id == id);
    total += product.price * userCart[id];
  }

  totalPrice.innerHTML = total.toFixed(2);
}

function RenderUserCart() {
  RenderDictionary(cartContent, userCart, CreateCartCard, "cart");
  CalcTotalPrice();
}

RenderUserCart();
RenderDictionary(
  favouriteContent,
  userFavourites,
  CreateFavouriteCard,
  "favourite",
);
