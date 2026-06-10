---js
{
  pagination: {
    data: "products",
    size: 1,
    alias: "product",
    before: function (paginationData) {
      return paginationData.filter(item => !item.hidden && !item.redirect_301);
    }
  },
  layout: "product_page",
  permalink: "products/{{ product.name | slug }}/",
  business: "retail"
}
---
