const productsList = document.getElementById("products-list");

function CreateProductCard(product) {
  let btnClasses = "btn my-btn-primary me-1";
  let btnText = "Add To Cart";
  let btnFunction = "AddToCart";

  if (userCart[product.id]) {
    btnClasses = "btn my-btn-danger me-1";
    btnText = "Remove From Cart";
    btnFunction = "RemoveFromCart";
  }

  let heartClasses = "btn my-text-secondary shadow-sm";
  let heartFunction = "AddToFavourite";

  if (userFavourites[product.id]) {
    heartClasses = "btn my-text-danger shadow-sm";
    heartFunction = "RemoveFromFavourite";
  }

  let cardComponent = `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card-hover card p-0 shadow">
            <img class="card-img-top" src="${product.img}" alt="product image" />

            <div class="card-body">
              <h5 class="card-title my-text-secondary">${product.title}</h5>
              <p class="card-text mb-0">
                Price: <span id="price-value">$${product.price}</span>
              </p>
              <p class="card-text mb-3">
                Category: <span id="category-value">${product.category}</span>
              </p>

              <div class="flex-row justify-content-start align-items-center">
                <button
                  id="${product.id}"
                  onclick="${btnFunction}(this)"
                  type="button"
                  class="${btnClasses}"
                >
                  ${btnText}
                </button>

                <button
                  onclick="${heartFunction}(this, ${+product.id})"
                  type="button"
                  class="${heartClasses}"
                >
                  <i
                    class="fa fa-heart"
                    style="pointer-events: none"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>`;

  return cardComponent;
}

CheckLogin();
RenderList(productsList, products, CreateProductCard);
RenderDictionary(cartContent, userCart, CreateCartMenuCard);
