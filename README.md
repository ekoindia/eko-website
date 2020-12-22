# Android UIDAI RD-Service Manager
The Eko website built with [Eleventy](https://www.11ty.dev). It is built on a component-based architecture with simple configuration files to automate page creation.

![Netlify Status](https://api.netlify.com/api/v1/badges/16835446-1532-4951-9268-a82abe342e6a/deploy-status)
<a href="https://github.com/ekoindia/android-uidai-rdservice-manager/issues">![GitHub issues](https://img.shields.io/github/issues/ekoindia/eko-website)</a>
<a href="https://github.com/ekoindia/android-uidai-rdservice-manager/blob/master/LICENSE">![GitHub license](https://img.shields.io/github/license/ekoindia/eko-website)</a>
<a href="https://eko.in" target="_blank">![Develop With Eko.in](https://img.shields.io/badge/Develop%20with-Eko.in-brightgreen)</a>
<a href="https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fekoindia%2Feko-website" target="_blank"><img alt="Twitter" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fekoindia%2Feko-website"></a>
<a href="https://twitter.com/intent/follow?screen_name=ekospeaks" target="_blank">![Twitter Follow](https://img.shields.io/twitter/follow/ekospeaks?label=Follow&style=social)</a>

---

## Features
1. Built with [Eleventy](https://www.11ty.dev)!
1. Netlify CMS: easy blog & website configuration management.
1. Reusable components for faster development ([src/_includes](src/_includes)).
1. Simple configuration files for creating retail/API product pages.
1. Simple stack. Minification/bundling using internal 11ty plugins.

## Getting Started (Local Development)
1. Install [node/npm](https://nodejs.org/en) & [git](https://git-scm.com)
1. Clone this Repository:
   `git clone https://github.com/ekoindia/eko-website`
1. Navigate to the directory: `cd eko-website`
1. Install
1. Install dependencies: `npm install`
1. Copy [`.env.example`](.env.example) to a new `.env` file and setup your own defaults
1. Build and host locally for local development: `npm start`
   Checkout in the browser: `localhost:8080`


## Project Structure
* 📄🔧 [**.eleventy.js**](.eleventy.js)  `All project technical configurations go here`
* 📂 [**src/**](/src)  `Main source directory. Top-level/custom webpages are created right here`
  * 📄 [**index.njk**](/src/index.njk)  `The home page`
  * 📂✍ [**blog/**](/src/blog)  `Create blog posts here`
    * 📄 [**index.njk**](/src/blog/index.njk)  `The blog listing page`
	* 📄 [**blog-tags.njk**](/src/blog/blog-tags.njk)  `The listing page template for blog tags`
  * 📂🔧 [**_data**](/src/_data)  `All the website configuration and data go here`
    * 📄🔧 [**website.yaml**](/src/_data/website.yaml)  `Top configurations, like, domain, logo, title, SEO, etc`
	* 📑🔧 [**products.yaml**](/src/_data/products.yaml)  `The retail products listing. Pages automatically created and added to menu`
	* 📑🔧 [**developers.yaml**](/src/_data/developers.yaml)  `The API products listing. Pages automatically created and added to menu`
	* 📑🔧 [**ekoUniversity.yaml**](/src/_data/ekoUniversity.yaml)  `The video listing for the Eko University section`
	* 📄🔧 [**footer.yaml**](/src/_data/footer.yaml)  `Configure footer links`
	* 📄🔧 [**env.yaml**](/src/_data/env.yaml)  `Secret configurations as envoirnment variables`
  * 📂👩‍💻 [**_layouts/pageTemplates**](/src/_layouts/pageTemplates)  `Reusable templates for various page types`
    * 📄⭐ [**base.njk**](/src/_layouts/pageTemplates/base.njk)  `Main template with outermost common code used by all pages`
	* 📄 [**product_page.njk**](/src/_layouts/pageTemplates/product_page.njk)  `Template for retail product pages`
	* 📄 [**developer_page.njk**](/src/_layouts/pageTemplates/developer_page.njk)  `Template for API product pages`
	* 📄 [**blog_post.njk**](/src/_layouts/pageTemplates/blog_post.njk)  `Template for blog post pages ideally written in markdown`
	* 📄 [**page.njk**](/src/_layouts/pageTemplates/page.njk)  `Template for normal pages ideally written in markdown`
	* 📄 [**ekoUniversity.njk**](/src/_layouts/pageTemplates/ekoUniversity.njk)  `For the Eko University page`
  * 📂👩‍💻 [**_includes**](/src/_includes)  `All build-time reusable components go here`
    * 📄 ***section_\*.njk***  `Full width reusable UI components that compose the index & product pages`
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
  * 📁🖼 [**images**](/src/images)  `Public images folder`

