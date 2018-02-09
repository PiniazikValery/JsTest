var SearchedResultPage=require('../PageObjects/SearchedResultPage');
class KinopoiskStartPage {

    constructor() {
        console.log('Open Kinopoisk site');
        browser.get(browser.baseUrl);
        this.SearchLine = element(by.name("kp_query"));
        this.SearchButton = element(by.xpath("//*[@value='искать!']"));
    }

    SendDefultKeysToSearchLine() {         
        this.SearchLine.sendKeys('Пираты карибского моря');                
        return this.SearchButton.isEnabled();
    }

    ClickSearchButton() {        
        this.SearchButton.click();                     
    }

}

module.exports = new KinopoiskStartPage();