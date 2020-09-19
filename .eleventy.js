const yaml = require('js-yaml');
const { DateTime } = require('luxon');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy('./_site/images');
  eleventyConfig.addPassthroughCopy('./_site/css');

  eleventyConfig.addLayoutAlias('base', 'pageTemplates/base.njk');
  eleventyConfig.addLayoutAlias('product_page', 'pageTemplates/product_page.njk');

  eleventyConfig.addDataExtension('yaml', contents => yaml.safeLoad(contents))

  eleventyConfig.addShortcode('sectionSeparator', function() {
    return `<p><br><br></p>`;
  })

  eleventyConfig.addPlugin(eleventyNavigationPlugin)

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