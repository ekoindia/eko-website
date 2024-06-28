const yaml = require('js-yaml');
const fs = require("fs");
const { minify } = require("terser");
const htmlmin = require("html-minifier");

// const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const blogTools = require("eleventy-plugin-blog-tools");
const svgContents = require("eleventy-plugin-svg-contents");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");

const filters = require('./utils/filters.js');
const shortcodes = require('./utils/shortcodes.js');
// const iconsprite = require('./utils/iconsprite.js');

const md = require("markdown-it");
const md_emoji = require("markdown-it-emoji");
const multimd_table = require('markdown-it-multimd-table');
const md_attrs = require('markdown-it-attrs');
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

// For safely migrating Eleventy to the latest version
// const UpgradeHelper = require("@11ty/eleventy-upgrade-help");


require('dotenv').config();


module.exports = function(eleventyConfig) {

	// Add Eleventy Plugins...
	// eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(svgContents);
	eleventyConfig.addPlugin(blogTools);
	eleventyConfig.addPlugin(pluginRss);

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


	// --------------------- Add 11ty-Image AsyncShortCodes -------------------------

	eleventyConfig.addAsyncShortcode("Image", async (src, alt, lazy, classes, urlOnly) => {
		if (!src) {
			throw new Error(`Missing \`src\` on Image: ALT = ${alt}`);
		}

		if (!alt) {
			throw new Error(`Missing \`alt\` on Image from: ${src}`);
		}

		lazy = lazy || false;
		classes = classes || '';
		src = fixSrcPath(src);

		let meta = await Image(src, {
			widths: [600, 800, 1200, null],
			formats: ["svg", "webp", "jpeg"],
			urlPath: "/img/",
			outputDir: "./_site/img/",
			svgShortCircuit: true
		});

		let lowsrc = meta.jpeg && meta.jpeg.length > 0 ? meta.jpeg[0] : meta.svg[0];

		if (urlOnly) {
			return lowsrc.url;
		}
		else {
			const sources = `${Object.values(meta).map(format => format && format[0] ? `<source type="image/${format[0].format}" srcset="${format.map(entry => entry.srcset).join(", ")}">` : '').join("\n")}`;

			return `<picture>${sources}<img class="${classes}" src="${lowsrc.url}" alt="${alt}" ${lazy ? 'loading="lazy"' : ''}></picture>`;
		}
	});

	// Returns 1200px wide JPEG social-media (open-graph) image path.
	eleventyConfig.addAsyncShortcode("SocialImagePath", async (src) => {
		if (!src) return '';
		src = fixSrcPath(src);

		let meta = await Image(src, {
			widths: [1200],
			formats: ["jpeg"],
			urlPath: "/img/",
			outputDir: "./_site/img/"
		});
		return meta.jpeg && meta.jpeg.length > 0 ? meta.jpeg[0].url : '';
	});



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
		permalink: true,
		permalinkSymbol: '§',
		slugify: s => uslug(s)
	});									// https://github.com/valeriangalliat/markdown-it-anchor
	markdownLib.use(md_toc, {
		level: [2],
		placeholder: "(\\[\\[TOC\\]\\])",
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
	markdownLib.use(md_link_attrs, [
		{
			// pattern: /^https?:/,
			matcher(href) {
				return href.match(/^https?:\/\//i) && !href.match(/^(https?:\/\/)?eko.in/);
			},
			attrs: {
				target: '_blank',
				rel: 'noopener',
				class: 'ext-link'
			}
		}
	]);								// https://github.com/crookedneighbor/markdown-it-link-attributes
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

  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });

//   eleventyConfig.setBrowserSyncConfig({
//     callbacks: {
//       ready: function(err, bs) {

//         bs.addMiddleware("*", (req, res) => {
//           const content_404 = fs.readFileSync('_site/404.html');
//           res.write(content_404);
//           res.writeHead(404);
//           res.end();
//         });
//       }
//     }
//   });

	eleventyConfig.setServerOptions({
		// Whether the live reload snippet is used
		liveReload: true,

		// Whether DOM diffing updates are applied where possible instead of page reloads
		domDiff: true,

		// The starting port number
		// Will increment up to (configurable) 10 times if a port is already in use.
		port: 8080,

		// Additional files to watch that will trigger server updates
		// Accepts an Array of file paths or globs (passed to `chokidar.watch`).
		// Works great with a separate bundler writing files to your output folder.
		// e.g. `watch: ["_site/**/*.css"]`
		watch: [],

		// Show local network IP addresses for device testing
		showAllHosts: true,

		// Use a local key/certificate to opt-in to local HTTP/2 with https
		https: {
			// key: "./localhost.key",
			// cert: "./localhost.cert",
		},

		// Change the default file encoding for reading/serving files
		encoding: "utf-8",

		// Show the dev server version number on the command line
		showVersion: false,
	});


	// Add paired shortcode to embed Markdown in templates...
	eleventyConfig.addPairedShortcode("markdown", (content) => {
		return markdownLib.render(content);
	});

	// Add Files Passthrough...
	eleventyConfig.addPassthroughCopy('src/admin');
	eleventyConfig.addPassthroughCopy('src/assets/ico');
	eleventyConfig.addPassthroughCopy('src/assets/img');
	eleventyConfig.addPassthroughCopy('src/assets/js');
	eleventyConfig.addPassthroughCopy('src/docs');
	eleventyConfig.addPassthroughCopy("src/*.pdf");
	eleventyConfig.addPassthroughCopy("src/_redirects");

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


	// To migrating Eleventy to newer versions...
	// First, `npm install @11ty/eleventy-upgrade-help@2`	Change @2 to latest version
	// Build & check for errors. If no error, uninstall this module.
	// eleventyConfig.addPlugin(UpgradeHelper);


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


/**
 * Fix public asset path relative to "src" folder
 */
function fixSrcPath(url)
{
	if ((url.startsWith('/') || url.startsWith('./')) && !url.startsWith('./src')) {
		return './src' + url;
	}
	else {
		return url;
	}
}