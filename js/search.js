const searchFilter = document.getElementById("search-filter");
const searchBox = document.getElementById("search-box");

searchBox.addEventListener("keydown", (e) => {
  setTimeout(() => {
    RenderList(
      productsList,
      products,
      CreateProductCard,
      searchFilter.value,
      e.target.value,
    );
  }, 500);
});
