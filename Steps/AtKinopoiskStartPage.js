var KinopoiskStartPage = require('../PageObjects/KinopoiskStartPage.js');
var SearchedResultPage=require('../PageObjects/SearchedResultPage');
class AtKinopoiskStartPage {
    SearchFilm() {
        var result;
        console.log('Send keys to search line');
        KinopoiskStartPage.SendDefultKeysToSearchLine().then(function(SearchButtonIsClickable){
            expect(SearchButtonIsClickable).toBe(true);
            console.log('Click search button'); 
            KinopoiskStartPage.ClickSearchButton();               
        });                
        return SearchedResultPage.WantedFilm.isEnabled();
    }
}
module.exports = new AtKinopoiskStartPage();