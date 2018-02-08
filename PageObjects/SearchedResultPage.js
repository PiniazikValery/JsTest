class SearchedResultPage{

    constructor(){          
        this.WantedFilm=element(by.linkText('Пираты Карибского моря: Проклятие Черной жемчужины'));
    }       

    ClickOnWantedFilm(){
        this.WantedFilm.click();
    }
    
}

module.exports=new SearchedResultPage();