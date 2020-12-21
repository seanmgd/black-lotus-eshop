const NextI18Next = require('next-i18next').default
const path = require('path')

module.exports = new NextI18Next({
  browserLanguageDetection: true,
  defaultLanguage: 'fr',
  otherLanguages: ['fr', 'en'],
  strictMode: false,
  localePath: path.resolve('./public/static/locales'),
})
