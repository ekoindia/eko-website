---
layout: blog
title: This is page title. It is displayed on top of the blog in large text.
description: This is a short description of the post (for example, the first paragraph). It is displayed as the short excerpt (preview) of the blog on the blog listing pages. Also helps with the SEO.
date: 2020-12-23
image: /assets/img/blog/blog-post-main-image.png
tags:
  - tag1
  - tag2
---

This document shows examples of writting markdown. Everything written here onwards will be visible on the page!

<!-- excerpt -->

Checkout a quick Markdown guide here: https://www.markdownguide.org/cheat-sheet/


## This is H1 header (largest heading size)

### This is H2 header (2nd largest heading size)

#### This is H3 (3rd largest heading size) and so on...

You can format the text as **BOLD** or _ITALICS_ or both ***BOLD & ITALICS***

#### Numbered lists can be created by normally numbering the lines like this:
1. point one
2. point two
   1. Sub point one (indent by 2-3 spaces)
   2. Sub point two (indent by 2-3 spaces)
3. point three


#### Bulleted Lists can be created by starting a line with a '*' like this:
* point one
* point two
  * Sub point one (indent by 2-3 spaces)
  * Sub point two (indent by 2-3 spaces)
* point three

#### Blockquotes can be added by starting every line of the quote with '> '
Example:
> There is not enough time
> to do all the nothing we
> want to do.
>
> -- Bill Waterson (Calvin & Hobbes)


#### Inserting Links
Example (internal link): [Link text](/link/path)
Example (external link): [Link text](https://www.example.com)

**Note:** Just writting a URL or an email will automatically turn it into a link!


#### Inserting Images
Example: ![Image Title](image-url.jpg)


#### Tables can be created like this:

| Column 1 | Centered Column | Right Aligned | Column 4 |
|----------|:---------------:|--------------:|----------|
| 1        |       Abc       |       ₹100.00 | Cdf      |
| 2        |       Xyz       |      ₹1500.50 | Ghi      |



## OTHER EXTENDED MARKDOWN FEATURES:

This website also supports extended markdown features added through external plugins:

#### Insert a github-flavored emoji
For example,  :blush: :raising_hand:  ([Full Emoji List](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md))


#### Table Of Contents can be added anywhere on the page by inserting [[toc]] on a new line.
The top header types (H1, H2, H3) are automatically added.


#### Highlight/mark some text (in yellow) by enclosing it within a pair of '=='
Ex: This sentence has a ==highlighted== word.


#### Superscript by enclosing text within a pair of '^'
Ex: The 6^th^ Sense


#### Subscript by enclosing text within a pair of '~'
Ex: H~2~O


#### Abbreviations (show full-form or definition on mouse hover)

Ex: Define abbreviations anywhere on the page like this:

*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.


#### Footnotes

Ex: add footnotes in your content like this:

Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote description.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they belong to the previous footnote.


Here is an inline note.^[Inlines notes are easier to write, since
you don't have to pick an identifier and move down to type the
note.]


#### Custom Image Size

Set a custom size for your embedded image like this: ![image title](image.png =100x200)

Here, image width = 100px & height = 200px.


#### Block Containers (adding custom 'div' for developers)

A custom block container can be added like this:

::: warning
*here be dragons*
:::

This will add a 'div' with class="warning" and the contents inside it.
This can be used by developers to create unique styled blocks!

#### MultiMarkdown Tables: Additional Table Features

Adds a lot of new ways to create complex tables. [Check usage examples & demo here](https://github.com/RedBug312/markdown-it-multimd-table#usage)

