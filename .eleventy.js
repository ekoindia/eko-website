const yaml = require('js-yaml');
const fs = require("fs");
const { minify } = require("terser");
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const blogTools = require("eleventy-plugin-blog-tools");
const { DateTime } = require("luxon");

require('dotenv').config();


module.exports = function(eleventyConfig) {

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
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

//   eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(blogTools);

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
      }).toFormat('yy-MM-dd');
    });

  eleventyConfig.addFilter("readableDate", dateObj => {
  return DateTime.fromJSDate(dateObj, {
    zone: 'utc'
    }).toFormat("dd-MM-yy");
  });

  // Filter out all elements from a list (eg: products) that has a 'hidden: true' property in it
  eleventyConfig.addFilter("hiddenFilter", list => list.filter(item => item.hidden ? false : true));

  // Filter out all elements from a list (eg: products) that has a 'disabled: true' property in it
  eleventyConfig.addFilter("disabledFilter", list => list.filter(item => item.disabled ? false : true));

  // Useful to change property of an object in the Nunjucks 'set' method which is fairly limited...
  eleventyConfig.addFilter("mergeObjectFilter", (obj1, obj2) => { return { ...obj1, ...obj2 } });


  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/admin');
  eleventyConfig.addPassthroughCopy('src/js');

  eleventyConfig.addLayoutAlias('base', 'pageTemplates/base.njk');
  eleventyConfig.addLayoutAlias('product_page', 'pageTemplates/product_page.njk');
  eleventyConfig.addLayoutAlias('developer_page', 'pageTemplates/developer_page.njk');
  eleventyConfig.addLayoutAlias('blog_post', 'pageTemplates/blog_post.njk');
  eleventyConfig.addLayoutAlias('career_post', 'pageTemplates/career_post.njk');
  eleventyConfig.addLayoutAlias('ekoUniversity', 'pageTemplates/ekoUniversity.njk');

  eleventyConfig.addDataExtension('yaml', contents => yaml.safeLoad(contents))

  eleventyConfig.addShortcode('orangeDot', function() {
    return `<span class="orange-dot"></span></span>`;
  })

  eleventyConfig.addShortcode('iconScroll', function() {
    return `<center><div class="icon-scroll">
    <div class="mouse"></div>
  </div></center>`;
  });

  // Filter source file names using a glob
  eleventyConfig.addCollection("blog", function(collection) {
    return collection.getFilteredByGlob('src/blogs/*.md');
  });
  // TODO: add a front-matter config "disabled" and append a 'disabledFilter' to hide any disabled post.
  // TODO: Specially for "Career" section

  eleventyConfig.addCollection("career", function(collection) {
    return collection.getFilteredByGlob('src/careers/*.md');
  });

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
      output: '_site'
    }
  }
}