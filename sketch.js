//Create variables here
var dog, happyDog, database,  foodStock;
var feed,add;
var lastfed;
var foodobj;
var gamereferstate;
var curenttime;
function preload(){
  //load images here
 happydogimg=loadImage("images/Dog.png");
  dogimg=loadImage("images/Happy.png");
  sleep = loadImage("images/Lazy.png");
  bedimg = loadImage("images/Bed Room.png");
  garimg = loadImage("images/Garden.png");4
  liveimg = loadImage("images/Living Room.png ");
  leftimg = loadImage("images/runningleft.png");
  rightimg = loadImage("images/running.png");
  washimg = loadImage("images/Wash Room.png");
}

function setup() {
  database = firebase.database();
  //console.log(database);
  createCanvas(500, 500);
  gamereferstate = database.ref('gamestate');
  gamereferstate.on("value",function(data){
    gamestate=data.val();
  })
  foodobj = new Food();
  foodStock = database.ref('food');
  foodStock.on("value",readstock);
  fedtime=database.ref('feedtime');
  fedtime.on("value",function(data){
   lastfed=data.val();
  })
  dog=createSprite(300,400,150,150);
  dog.addImage(happydogimg);
  dog.scale=0.15;
  feed  = createButton("FEED THE DOG");
  feed.position(700,70);
  feed.mousePressed(feeddog);
  add  =  createButton("ADD FOOD");
  add.position(600,70);
  add.mousePressed(addfoods);
}


function draw() {  
  //background(46, 139, 87);
  //fill("black");
  //foodobj.display();
  currentime=hour();


  if(curenttime===(lastfed+1)){
    update("playing");
    foodobj.garden();
  /*  feed.hide();
    add.hide();
    dog.hide();*/
  }else if(curenttime===(lastfed+2)){
   update("sleeping");
   foodobj.sleeping();
   /*feed.hide();
   add.hide();
   dog.hide();*/
  }else if(curenttime>(lastfed+2)&&curenttime<=(lastfed+4)){
    update("bathing");
    foodobj.washroom();
 
  }else if(curenttime>(lastfed+4) && curenttime<=(lastfed+5)){
    update("sitting in room");
    foodobj.livingroom();

  }else{
    update("hungry");
    foodobj.display();
  }
  textSize(16);
  stroke(0);
  //text("food Remaing :"+foodStock,100,40);
 if(gamestate!=="hungry"){
   feed.hide();
   add.hide();
   dog.remove();
 }else{
   feed.show();
   add.show();
   dog.addImage(dogimg);

 }
  drawSprites();
  //add styles here

}

function readstock(data){
  foodStock = data.val();
  foodobj.updatefoodstock(foodStock);
}
function addfoods(){
  foodStock++
  database.ref('/').update({
    food:foodStock
  })
}
function feeddog(){
  dog.addImage(dogimg);
 
  foodobj.updatefoodstock(foodobj.getfoodstock()-1);
  //foodobj.detuctfood();
  database.ref('/').update({
    food:foodobj.getfoodstock(),
    feedtime:hour(),
    gamestate:"hungry"
  
  })

}
function update(state){
  database.ref('/').update({
  gamestate:state
  })
}



