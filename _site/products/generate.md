---
pagination: 
    data: products
    size: 1
    alias: product
layout: product_page
eleventyNavigation:
    key: product.name
    parent: products
permalink: 'products/{{ product.name | slug }}/'
---