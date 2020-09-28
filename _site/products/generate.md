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
title:   product.name
excerpt: product.name
image:   https://ekoin.netlify.app/images/star.png
ogtype:  website
ogurl: https://ekoin.netlify.app/products/{{ product.name | slug }}/
---
