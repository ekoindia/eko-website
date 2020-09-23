---
pagination: 
    data: products
    size: 1
    alias: product
permalink: 'products/{{ product.name | slug }}/'
layout: product_page
eleventyNavigation:
    key: product.name
    parent: products
---
