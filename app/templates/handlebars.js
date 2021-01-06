const path = require('path')
const frontMatter = require('front-matter')
const handlebars = require('handlebars')
const handlebarsWax = require('handlebars-wax')
const handlebarsHelpers = require('handlebars-helpers')
const handlebarsLayouts = require('handlebars-layouts')
const through2 = require('through2')
const PluginError = require('plugin-error')

// Handlebars setup
const handlebarsCompile = (code) => {
  // Register partials, helpers, decorators and data
  const wax = handlebarsWax(handlebars)
    .partials(path.join(__dirname, './partials/**/*.hbs'))
    .partials(path.join(__dirname, './layouts/**/*.hbs'))
    .helpers(handlebarsHelpers())
    .helpers(handlebarsLayouts) // Must be registered after handlebars-helpers
    .helpers(path.join(__dirname, './helpers/**/*.js'))
    .decorators(path.join(__dirname, './decorators/**/*.js'))
    .data(path.join(__dirname, './data/**/*.{js,json}'))
    .data(path.join(__dirname, './i18n/**/*.{js,json}'))

  // Extract front-mater (YAML) and add it as data
  const content = frontMatter(code)

  return wax.compile(content.body)(content.attributes)
}

// Gulp plugin
module.exports = () => through2.obj(function (file, _, cb) {
  if (file.isBuffer()) {
    let compiledHTML

    try {
      compiledHTML = handlebarsCompile(file.contents.toString())
    } catch (error) {
      // Report error without breaking dev server
      return cb(new PluginError('Handlebars', 'Error found in ' + file.path + '\n' + error.message), null)
    }

    file.contents = Buffer.from(compiledHTML)

    // Change .hbs extension to .html
    file.path = file.path.replace(/\.[^.]*$/, '.html')
  }

  cb(null, file)
})
