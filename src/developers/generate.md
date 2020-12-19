---
pagination:
    data: developers
    size: 1
    alias: developer
layout: developer_page
eleventyNavigation:
    key: developer.name
    parent: developers
permalink: 'developers/eps/{{ developer.name | slug }}/'
# TODO
# permalink: {{  false if developer.disabled else false 'developers/' + (developer.name | slug) }}
# Convert to generate.njk and use javascript (njk) conditions

---
