var SearchedResultPage = require('../PageObjects/SearchedResultPage');
var FilmDetailsPage=require('../PageObjects/FilmDetailsPage');
class AtResultOfSearchPage {
    ClickOnWantedFilm() {
        var result=SearchedResultPage.WantedFilm.getText(); 
        console.log('Click on wanted film');
        SearchedResultPage.ClickOnWantedFilm(); 
        return FilmDetailsPage.FilmTitle.getText();
    }
}
module.exports = new AtResultOfSearchPage();