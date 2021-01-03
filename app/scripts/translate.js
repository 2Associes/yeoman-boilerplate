import Constants from './constants'

class Translate {

  constructor() {

    this.currentLang = window.localStorage.getItem('currentLang')
    this.otherLang

    this.setLanguage(this.currentLang)
    this.geti18n(this.currentLang)
    this.changeLanguage(this.currentLang)

  }

  setLanguage(lang) {

    if (this.currentLang === null) {

      window.localStorage.setItem('currentLang', Constants.defaultLang)
      return this.currentLang = Constants.defaultLang

    }

    if (lang) {

      window.localStorage.setItem('currentLang', lang);
      this.currentLang = window.localStorage.getItem('currentLang')
      this.geti18n(this.currentLang)

    }

  }

  changeLanguage(lang) {

    document.getElementById('js-langSwitcher').addEventListener('click', function(event) {
      this.setLanguage(event.target.innerText)
      window.location.reload()
    }.bind(this))

  }

  geti18n(lang) {

    window.localStorage.setItem('currentLang', lang)

    this.currentLang = window.localStorage.getItem('currentLang')


    if (this.currentLang === 'en-CA') {

      this.i18n = require('../i18n/en-CA.json')
      this.otherLang = 'fr-CA'

    }

    if (this.currentLang === 'fr-CA') {

      this.i18n = require('../i18n/fr-CA.json')
      this.otherLang = 'en-CA'

    }

    this.changeLanguageText(this.otherLang)

  }

  changeLanguageText(otherLang) {

    document.getElementById('js-langSwitcher').textContent=otherLang

  }

}

export { Translate }
