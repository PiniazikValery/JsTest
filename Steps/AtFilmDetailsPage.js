var FilmDetailsPage=require('../PageObjects/FilmDetailsPage');
class AtFilmDetailsPage{
      GetTitle(){
          return FilmDetailsPage.FilmTitle.getText();
      }
           
}
module.exports=new AtFilmDetailsPage();