class FilmDetailsPage{

    constructor(){
        this.FilmTitle=element(by.xpath("//*[@class='moviename-big']"));
        
    }    
    ClickOnFilmTitle(){
        this.FilmTitle.click();
    }      
}
module.exports=new FilmDetailsPage();