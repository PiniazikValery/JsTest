class KinopoiskStartPage{

    constructor(){          
        browser.get(browser.baseUrl);       
        this.SearchLine=element(by.name("kp_query"));
        this.SearchButton=element(by.xpath("//*[@value='искать!']"));
    }       

    SendDefultKeysToSearchLine(){
        this.SearchLine.sendKeys("Пираты карибского моря");
    }

    ClickSearchButton(){
        this.SearchButton.click();
    }
    
}

module.exports=new KinopoiskStartPage();