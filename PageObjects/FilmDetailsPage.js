class FilmDetailsPage{

    constructor(){
        this.FilmTitle=element(by.xpath("//*[@class='moviename-big']"));        
    }             
}
module.exports=new FilmDetailsPage();