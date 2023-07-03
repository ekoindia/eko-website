---
pagination:
    data: products
    size: 1
    alias: product
layout: product_page
permalink: 'products/{{ product.name | slug }}/'
business: retail
# TODO
# permalink: {{  false if product.disabled else false 'products/' + (product.name | slug) }}
# Convert to generate.njk and use javascript (njk) conditions

---
