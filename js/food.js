class Food{
    constructor(){
     this.foodstock = 0
     this.lastfed
     this.image = loadImage("images/milk.png");
    }
 
    updatefoodstock(food){
    this.foodstock=food;
    }
    getfedtime(time){
this.lastfed=time;
    }
    detuctfood(){
      if(this.foodstock>0){
    this.foodstock=this.foodstock-1;
      }
    }
    getfoodstock(){
    return this.foodstock;
    }
    display(){
      background(46,139,87);
      fill(255,255,254);
      textSize(15);
      if(lastfed>=12){
        text("LAST_FED_TIME  : "+lastfed%12+"PM",50,100);
      }else if(lastfed===0){
        text("LAST_FED_TIME : 12AM",50,100)
      }else{
        text("LAST_FED_TIME"+lastfed+"AM",50,100);
      }
      
      var x=80,y=100;
      imageMode(CENTER); 
      image(this.image,720,220,70,70);
      if(this.foodstock!==0){
        for(var i = 0;i<this.foodstock;i++){
          if(i%10===0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
    bedroom(){
  background(bedimg,550,500);
    }
    garden(){
      background(garimg,550,500);
    }
    livingroom(){
      background(liveimg,550,500);
    }
    sleeping(){
      background(sleep,550,500);
    }
    washroom(){
      background(washimg,550,500);
    }

  }

