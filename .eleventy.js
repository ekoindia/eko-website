const yaml = require('js-yaml');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const {
  DateTime
} = require("luxon");

module.exports = function(eleventyConfig) {

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
  eleventyConfig.addLayoutAlias('blog', 'pageTemplates/blog.njk');

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
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob(['_site/blogs/*.md','_site/blogs/**/*.md'] );
  });

  eleventyConfig.addCollection("technology", function(collection) {
    return collection.getFilteredByGlob('_site/blogs/technology/*.md');
  });

  eleventyConfig.addCollection("finance", function(collection) {
    return collection.getFilteredByGlob('_site/blogs/finance/*.md');
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