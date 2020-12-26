const yaml = require('js-yaml');
const fs = require("fs");
const { minify } = require("terser");
const htmlmin = require("html-minifier");

// const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const blogTools = require("eleventy-plugin-blog-tools");
const svgContents = require("eleventy-plugin-svg-contents");

const filters = require('./utils/filters.js');
const shortcodes = require('./utils/shortcodes.js');
// const iconsprite = require('./utils/iconsprite.js');

const md = require("markdown-it");
const md_emoji = require("markdown-it-emoji");
const multimd_table = require('markdown-it-multimd-table');
const md_attrs = require('@gerhobbelt/markdown-it-attrs');
const md_abbr = require('markdown-it-abbr');
const md_footnote = require('markdown-it-footnote');
const md_sub = require('markdown-it-sub');
const md_sup = require('markdown-it-sup');
const md_container = require('markdown-it-container');
const md_anchor = require('markdown-it-anchor');
const uslug = require('uslug');
const md_toc = require("markdown-it-toc-done-right");
const md_lazy_loading = require('markdown-it-image-lazy-loading');
const md_link_attrs = require('markdown-it-link-attributes');
const md_mark = require('markdown-it-mark');
const md_image_size = require('markdown-it-imsize');


require('dotenv').config();


module.exports = function(eleventyConfig) {


	// Add Eleventy Plugins...
	// eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(svgContents);
	eleventyConfig.addPlugin(blogTools);

	// Add Universal Filters
	Object.keys(filters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filters[filterName]);
	});

	// Add Universal Shortcodes
	Object.keys(shortcodes).forEach((shortcodeName) => {
		eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName](eleventyConfig));
	});

	// Add Icon Sprite
	// eleventyConfig.addNunjucksAsyncShortcode('iconsprite', iconsprite);


	// ---------------------- Configure Markdown Support ----------------------------

	const markdownLib = md({
		html: true,
		breaks: true,
		linkify: true,
		typographer: true
	});

	markdownLib.use(md_emoji);			// https://github.com/markdown-it/markdown-it-emoji
	markdownLib.use(md_anchor, {
		level: [1, 2, 3],
		slugify: s => uslug(s)
	});									// https://github.com/valeriangalliat/markdown-it-anchor
	markdownLib.use(md_toc, {
		level: [1, 2, 3],
		// placeholder: '[[TOC]]',
		listType: 'ol',
		slugify: s => uslug(s)
	});									// https://github.com/nagaozen/markdown-it-toc-done-right
	markdownLib.use(multimd_table, {
		multiline: true,
		rowspan: true,
		headerless: true
	});									// https://github.com/RedBug312/markdown-it-multimd-table
	markdownLib.use(md_attrs, {
		allowedAttributes: ["class"]
	});									// https://github.com/GerHobbelt/markdown-it-attrs
	markdownLib.use(md_link_attrs, {
		pattern: /^https?:/,
		attrs: {
			target: '_blank',
			rel: 'noopener',
			class: 'ext-link'
		}
	});								// https://github.com/crookedneighbor/markdown-it-link-attributes
	markdownLib.use(md_lazy_loading);	// https://github.com/ruanyf/markdown-it-image-lazy-loading
	markdownLib.use(md_abbr);			// https://github.com/markdown-it/markdown-it-abbr
	markdownLib.use(md_footnote);		// https://github.com/markdown-it/markdown-it-footnote
	markdownLib.use(md_sub);			// https://github.com/markdown-it/markdown-it-sub
	markdownLib.use(md_sup);			// https://github.com/markdown-it/markdown-it-sup
	markdownLib.use(md_container);		// https://github.com/markdown-it/markdown-it-container
	markdownLib.use(md_mark);			// https://github.com/markdown-it/markdown-it-mark
	markdownLib.use(md_image_size);		// https://github.com/tatsy/markdown-it-imsize

	eleventyConfig.setLibrary("md", markdownLib);

		// Simple typographic replacements (with typographer: true config):
		// 		quotes beautification
		// 		(c) (C) → ©
		// 		(tm) (TM) → ™
		// 		(r) (R) → ®
		// 		+- → ±
		// 		(p) (P) -> §
		// 		... → … (also ?.... → ?.., !.... → !..)
		// 		???????? → ???, !!!!! → !!!, `,,` → `,`
		// 		-- → &ndash;, --- → &mdash;

	// ---------------------------------------------------------------------------------

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "<!-- excerpt -->"	// default: "---"
	});

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          res.write(content_404);
          res.writeHead(404);
          res.end();
        });
      }
    }
  });


	// Add Files Passthrough...
	eleventyConfig.addPassthroughCopy('src/images');
	eleventyConfig.addPassthroughCopy('src/admin');
	eleventyConfig.addPassthroughCopy('src/assets/ico')

	// Add Layouts...
	eleventyConfig.addLayoutAlias('base', 'base.njk');
	eleventyConfig.addLayoutAlias('page', 'page.njk');
	eleventyConfig.addLayoutAlias('product_page', 'product_page.njk');
	eleventyConfig.addLayoutAlias('developer_page', 'developer_page.njk');
	eleventyConfig.addLayoutAlias('blog', 'blog_post.njk');
	eleventyConfig.addLayoutAlias('career_post', 'career_post.njk');
	eleventyConfig.addLayoutAlias('ekoUniversity', 'ekoUniversity.njk');

	// Add Data Extensions...
	eleventyConfig.addDataExtension('yaml', contents => yaml.safeLoad(contents));


	// Add Collections......

	// Collection of blog posts with files created in the '/blog' folder
	eleventyConfig.addCollection("blog", function(collection) {
		return collection.getFilteredByGlob('src/blog/*.md');
	});
	// TODO: add a front-matter config "disabled" and append a 'disabledFilter' to hide any disabled post.
	// TODO: Specially for "Career" section

	// Collection of career posts [WIP]
	// eleventyConfig.addCollection("career", function(collection) {
	// 	return collection.getFilteredByGlob('src/careers/*.md');
	// });

	// Collection of blog tags...
	eleventyConfig.addCollection("blogtags", function (collection) {
		let _tags = {};
		collection.getFilteredByGlob('src/blog/*.md').map(item => {
			if ("tags" in item.data) {
				// TODO: optionally filter tags
				for (let tag of item.data.tags) {
					_tags[tag] = 1;
				}
			}
		});
		return Object.keys(_tags).sort();
	});


	return {
		dir: {
			input: 'src',
			data: '_data',
			includes: '_includes',
			layouts: '_layouts',
			output: '_site'
		},
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
	}
}