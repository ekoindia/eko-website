const yaml = require('js-yaml');
const { DateTime } = require('luxon');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const pluginSEO = require("eleventy-plugin-seo");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy('./_site/images');
  eleventyConfig.addPassthroughCopy('./_site/css');

  eleventyConfig.addLayoutAlias('base', 'pageTemplates/base.njk');
  eleventyConfig.addLayoutAlias('product_page', 'pageTemplates/product_page.njk');

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

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginSEO, {
    title: "Eko",
    description: "Best way to collect cash at your doorstep",
    url: "https://ekoin.netlify.app/",
    image: "https://ekoin.netlify.app/images/main/homepage.png"
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