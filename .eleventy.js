const yaml = require('js-yaml');
const fs = require("fs");
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const {
  DateTime
} = require("luxon");

module.exports = function(eleventyConfig) {

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('dist/404.html');
          // Provides the 404 content without redirect.
          res.write(content_404);
          // Add 404 http status code in request header.
          // res.writeHead(404, { "Content-Type": "text/html" });
          res.writeHead(404);
          res.end();
        });
      }
    }
  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  
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

  eleventyConfig.addPassthroughCopy('./_site/images');
  eleventyConfig.addPassthroughCopy('./_site/css');

  eleventyConfig.addLayoutAlias('base', 'pageTemplates/base.njk');
  eleventyConfig.addLayoutAlias('product_page', 'pageTemplates/product_page.njk');
  eleventyConfig.addLayoutAlias('blog_post', 'pageTemplates/blog_post.njk');

  eleventyConfig.addDataExtension('yaml', contents => yaml.safeLoad(contents))

  eleventyConfig.addShortcode('sectionSeparator', function() {
    return `<p><br><br></p>`;
  })

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
  eleventyConfig.addCollection("post", function(collection) {
    return collection.getFilteredByGlob('_site/blogs/*.md');
  });

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: '_site',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
      output: 'dist'
    }
  }
}