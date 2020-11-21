const yaml = require('js-yaml');
const fs = require("fs");
const { minify } = require("terser");
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const blogTools = require("eleventy-plugin-blog-tools");

const {
  DateTime
} = require("luxon");

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


  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/admin');
  eleventyConfig.addPassthroughCopy('src/js');

  eleventyConfig.addLayoutAlias('base', 'pageTemplates/base.njk');
  eleventyConfig.addLayoutAlias('product_page', 'pageTemplates/product_page.njk');
  eleventyConfig.addLayoutAlias('blog_post', 'pageTemplates/blog_post.njk');
  eleventyConfig.addLayoutAlias('ekoUniversity', 'pageTemplates/ekoUniversity.njk');

  eleventyConfig.addDataExtension('yaml', contents => yaml.safeLoad(contents))

  eleventyConfig.addShortcode('orangeDot', function() {
    return `<span class="orange-dot"></span></span>`;
  })

  eleventyConfig.addShortcode('iconScroll', function() {
    return `<center><div class="icon-scroll icon-scroll-container">
    <div class="mouse">
      <div class="wheel"></div>
    </div>
  </div></center>`;
  })

  // Filter source file names using a glob
  eleventyConfig.addCollection("blog", function(collection) {
    return collection.getFilteredByGlob('src/blogs/*.md');
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