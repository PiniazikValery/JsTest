let AtKinopoiskStartPage = require('../Steps/AtKinopoiskStartPage');
let AtResultOfSearchPage = require('../Steps/AtResultOfSearchPage');

describe('Smoke test for kinopoisk site', function () {
  it('should find film Pirates of the Caribbean', function () {
    AtKinopoiskStartPage.SearchFilm().then(function (WantedFilmIsClickable) {
      console.log('Check button clickability');
      expect(WantedFilmIsClickable).toBe(true);
      AtResultOfSearchPage.ClickOnWantedFilm().then(function (TitleOfFoundFilm) {
        console.log('Check found film');
        expect(TitleOfFoundFilm).toEqual('Пираты Карибского моря: Проклятие Черной жемчужины');
      });
    });
  });
});