# Eko's Website & Blog on Jamstack
The Eko website & blog built with [Eleventy](https://www.11ty.dev). Uses reusable component and simple configurations to automate page creation.

![Netlify Status](https://api.netlify.com/api/v1/badges/16835446-1532-4951-9268-a82abe342e6a/deploy-status)
<a href="https://github.com/ekoindia/eko-website/issues">![GitHub issues](https://img.shields.io/github/issues/ekoindia/eko-website)</a>
<a href="https://eko.in" target="_blank">![Develop With Eko.in](https://img.shields.io/badge/Develop%20with-Eko.in-brightgreen)</a>
<a href="https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fekoindia%2Feko-website" target="_blank"><img alt="Twitter" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fekoindia%2Feko-website"></a>
<a href="https://twitter.com/intent/follow?screen_name=ekospeaks" target="_blank">![Twitter Follow](https://img.shields.io/twitter/follow/ekospeaks?label=Follow&style=social)</a>

---

## 🌟 Features
1. Built with [Eleventy](https://www.11ty.dev)!  [<small>(docs)</small>](https://www.11ty.dev/docs)
1. [Netlify CMS](https://www.netlifycms.org): easy blog & website configuration management.
1. Reusable components for faster development ([src/_includes](src/_includes)).
1. Simple configuration files for creating retail/API product pages ([src/_data](src/_data)).
1. Simple stack. Minification/bundling using internal 11ty plugins.

## 🔗 Table Of Contents
- [🌟 Features](#-features)
- [🔗 Table Of Contents](#-table-of-contents)
- [🏁 Getting Started (Development Setup)](#-getting-started-development-setup)
- [🔁 Pull Request Guidelines (Making Changes)](#-pull-request-guidelines-making-changes)
- [🗃 Project Structure](#-project-structure)
- [❓ How to add a new blog post?](#-how-to-add-a-new-blog-post)
- [❓ How to add or edit a Retail-product page?](#-how-to-add-or-edit-a-retail-product-page)
- [❓ How to add or edit an API-product page?](#-how-to-add-or-edit-an-api-product-page)
- [❓ How to add a custom page?](#-how-to-add-a-custom-page)
- [❓ How to add redirections to support old links?](#-how-to-add-redirections-to-support-old-links)
- [❓ How to add a new `env` variable?](#-how-to-add-a-new-env-variable)


## 🏁 Getting Started (Development Setup)
1. Install [node/npm](https://nodejs.org/en) & [git](https://git-scm.com)
1. Clone this Repository:
   `git clone https://github.com/ekoindia/eko-website`
1. Navigate to the directory: `cd eko-website`
1. Install dependencies: `npm install`
1. Copy [`.env.example`](.env.example) to a new `.env` file and setup your own defaults
1. Build and host locally for local development: `npm start`
   Checkout in the browser: `localhost:8080`
2. _How to open Admin panel locally to add blog-posts:_
   1. Run the Admin local server: `npm run local-admin`
   2. Open the Admin URL: `localhost:8080/admin`
   3. Click on the login button.

## 🔁 Pull Request Guidelines (Making Changes)
1. Fork this repository
2. Create a new branch: `git checkout -b my-new-feature`
3. Make your changes
4. Test your changes: `npm run build` and `npm start`
5. Commit your changes: `git commit -am 'Add some feature'`
6. Push to the branch: `git push origin my-new-feature`
7. Submit a pull request in this repository

## 🗃 Project Structure
* 📄🔧 [**.eleventy.js**](.eleventy.js)  `All project technical configurations go here`
* 📂 [**src/**](/src)  `Main source directory. Top-level/custom webpages are created right here`
  * 📄 [**index.njk**](/src/index.njk)  `The home page`
  * 📂✍ [**blog/**](/src/blog)  `Create blog posts here`
    * 📄 [**index.njk**](/src/blog/index.njk)  `The blog listing page`
	* 📄 [**blog-tag-pages.njk**](/src/blog/blog-tags.njk)  `Page template to list posts for individual tags`
  * 📂🔧 [**_data**](/src/_data)  `All the website configuration and data go here`
    * 📄🔧 [**website.yaml**](/src/_data/website.yaml)  `Top configurations, like, domain, logo, title, SEO, etc`
	* 📑🔧 [**products.yaml**](/src/_data/products.yaml)  `The retail products listing. Pages automatically created and added to menu`
	* 📑🔧 [**developers.yaml**](/src/_data/developers.yaml)  `The API products listing. Pages automatically created and added to menu`
	* 📑🔧 [**ekoUniversity.yaml**](/src/_data/ekoUniversity.yaml)  `The video listing for the Eko University section`
	* 📄🔧 [**footer.yaml**](/src/_data/footer.yaml)  `Configure footer links`
	* 📄🔧 [**env.yaml**](/src/_data/env.yaml)  `Secret configurations as envoirnment variables`
  * 📂👩‍💻 [**_layouts**](/src/_layouts)  `Reusable templates for various page types`
    * 📄⭐ [**base.njk**](/src/_layouts/base.njk)  `Main template with outermost common code used by all pages`
	* 📄 [**product_page.njk**](/src/_layouts/product_page.njk)  `Template for retail product pages`
	* 📄 [**developer_page.njk**](/src/_layouts/developer_page.njk)  `Template for API product pages`
	* 📄 [**blog_post.njk**](/src/_layouts/blog_post.njk)  `Template for blog post pages ideally written in markdown`
	* 📄 [**page.njk**](/src/_layouts/page.njk)  `Template for normal pages ideally written in markdown`
	* 📄 [**ekoUniversity.njk**](/src/_layouts/ekoUniversity.njk)  `For the Eko University page`
  * 📂🧩 [**_includes**](/src/_includes)  `All build-time reusable components go here`
    * 📓 ***section_\*.njk***  `Full width reusable UI components that compose the index & product pages`
	* 📄 [**navigation.njk**](/src/_includes/navigation.njk)  `Top navigation bar in every page`
	* 📄 [**footer.njk**](/src/_includes/footer.njk)  `Footer section at the bottom of every page`
	* 📄 [**blogslist.njk**](/src/_includes/blogslist.njk)  `List of all blog posts with pagination`
	* 📄 [**form.njk**](/src/_includes/form.njk)  `Visitor sign-up form`
    * 📂🎨 [**css**](/src/_includes/css)  `CSS files - inlined into HTML during build`
	  * 📄 [**base.css**](/src/_includes/css/base.css)  `Common CSS rules used in every page`
	  * 📄 [**blog.css**](/src/_includes/css/blog.css)  `CSS rules for pages using the 'blog' or 'page' template`
	  * 📄 [**nav.css**](/src/_includes/css/nav.css)  `CSS rules for top navigation menu`
	  * 📄 [**footer.css**](/src/_includes/css/footer.css)  `CSS rules for footer section`
	  * 📄 [**flex.css**](/src/_includes/css/flex.css)  `Helper classes for CSS Flexbox`
	  * 📄 [**carousel.css**](/src/_includes/css/carousel.css)  `CSS rules for the carousel section`
	  * 📄 [**section_components.css**](/src/_includes/css/section_components.css)  `CSS rules for the section_*.njk reusable components`
	* 📁 [**js**](/src/_includes/js)  `Javascript files - inlined into HTML during build`
  * 📁🖼 [**assets**](/src/assets)  `Static assets like images, icons, etc`
* 📂 [**utils/**](/utils)  `11ty build-time custom utilities...`
  * 📄 [**shortcodes.js**](/utils/shortcodes.js)  `Reusable short markup (HTML) snippets` [<small>(docs)</small>](https://www.11ty.dev/docs/shortcodes)
  * 📄 [**filters.js**](/utils/filters.js)  `Custom filters for 11ty to be used in templates to manipulate data` [<small>(docs)</small>](https://www.11ty.dev/docs/filters)


## ❓ How to add a new blog post?
1. Add a new file in the [`src/blog/`](/src/blog) folder (or, copy an existing file).
1. File name becomes the URL of the blog-post (without the extension).
1. Easiest way to write the post is to use Markdown (.md). Any other file format can be used (eg: [Nunjucks](https://mozilla.github.io/nunjucks/templating.html), HTML, Liquid, Javascript).
   1. Check [EXAMPLE-POST.md](/src/blog/EXAMPLE-POST.md) for an example page and a quick guide to markdown.
1. Add other page info (like title, description, image, etc) in the top section of the page between the two '---' lines.
   1. Make the first paragraph of the post an excerpt by add a `<!-- excerpt -->` comment after it. This will be shown as the post description.
   1. Alternatively, add a `description` field in the top section of the page between the two '---' lines.
   1. Check [EXAMPLE-POST.md](/src/blog/EXAMPLE-POST.md) for a quick example.
1. To add a Youtube video in the blogpost, use the following syntax:
   ```
   {% youtube "youtube-video-id" %}
   ```
   1. Example: `{% youtube "CM4ajkVe4to" %}`


## ❓ How to add or edit a Retail-product page?
1. Retail product pages can by added without coding by just adding the product details to the [configuration file](/src/_data/products.yaml)!
1. All configuration files reside in the [`src/_data/`](/src/_data) folder.
1. Configuration files are simple text files written in [YAML format](https://learnxinyminutes.com/docs/yaml).
   1. It is a simple format to understand and write manually.
   1. Just ensure proper _indentation and spaces_!
1. Open the [`src/_data/products.yaml`](/src/_data/products.yaml) file.
1. Add a new product by copying configuration of an existing product and changing it's values!
1. Any new product page is automatically added to the navigation menu!


## ❓ How to add or edit an API-product page?
1. API product pages can by added without coding by just adding the product details to the [configuration file](/src/_data/developers.yaml)!
1. All configuration files reside in the [`src/_data/`](/src/_data) folder.
1. Configuration files are simple text files written in [YAML format](https://learnxinyminutes.com/docs/yaml).
   1. It is a simple format to understand and write manually.
   2. Just ensure proper _indentation and spaces_!
1. Open the [`src/_data/developers.yaml`](/src/_data/developers.yaml) file.
1. Add a new product by copying configuration of an existing product and changing it's values!
1. Any new product page is automatically added to the navigation menu!


## ❓ How to add a custom page?
1. Add a new file in the [`src/`](/src/) folder (or, copy an existing file).
   1. File name becomes the URL of the blog-post (without the extension).
   2. You can also create the file under a sub-directory, if required. The page URL will reflect the sub-directory in the path.
1. Easiest way to write the post is to use Markdown (.md). Any other file format can be used (eg: Nunjucks, HTML, Liquid, Javascript).
   1. Check [EXAMPLE-POST.md](/src/blog/EXAMPLE-POST.md) for an example page and a quick guide to markdown.
1. For full customization, create a Nunjucks file (.njk) and write any custom HTML.
1. Add other page info (like description, social image, etc) at the top of the page between the two '---' lines.
1. Add to navigation menu in the [`src/_includes/navigation.njk`](/src/_includes/navigation.njk) file.

## ❓ How to add redirections to support old links?
1. Add an entry in the [`src/_redirects`](/src/_redirects) file.
1. Example and documentation in the file.

## ❓ How to add a new `env` variable?
1. Checkout the file [src/_data/env.js](/src/_data/env.js)
1. Add a new `env` variable name in this file
1. Now this variable can be accessed anywhere using `env.<VARIABLE_NAME>`
