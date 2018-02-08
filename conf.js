var HtmlReporter = require('protractor-beautiful-reporter');
exports.config = {

  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-3.9.1.jar',

  specs: [
  'TestCases/TC1 - SmokeTestCite.js'
  ],
    
  baseUrl: 'https://www.kinopoisk.ru/',

  allScriptsTimeout: 30000,

  onPrepare: function () {
    browser.ignoreSynchronization=true;    
    jasmine.getEnv().addReporter(new HtmlReporter({     
      baseDirectory: 'Report',
      screenshotsSubfolder:'screenshots',
      jsonsSubfolder: 'jsons',
      docTitle: 'Kinopoisk reporter',
      docName:'KinopoiskReport.html'
   }).getJasmine2Reporter());
  }

  };
  