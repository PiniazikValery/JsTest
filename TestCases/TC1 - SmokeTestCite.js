let AtKinopoiskPage=require('../Steps/AtKinopoiskStartPage');
let AtResultOfSearchPage=require('../Steps/AtResultOfSearchPage');
let AtFilmDetailsPage=require('../Steps/AtFilmDetailsPage');
describe('kinopoisk start page', function() {
  it('should find film Pirates of the Caribbean', function() {        
    AtKinopoiskPage.SearchFilm();         
    AtResultOfSearchPage.ClickOnWantedFilm();              
    expect(AtFilmDetailsPage.GetTitle()).toEqual('Пираты Карибского моря: Проклятие Черной жемчужины');
  });
});