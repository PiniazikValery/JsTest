var KinopoiskStartPage=require('../PageObjects/KinopoiskStartPage.js');
class AtKinopoiskStartPage {       
    SearchFilm()
    {
        KinopoiskStartPage.SendDefultKeysToSearchLine();
        KinopoiskStartPage.ClickSearchButton();
    }    
}
module.exports=new AtKinopoiskStartPage();