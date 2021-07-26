const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base1, base2;
var stones = [];
var bg_image
var zombie_image

function preload() {
  bg_image = loadImage("background.png")
  zombie_image = loadImage("zombie.png")


}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20, "#795548", true);
  leftWall = new Base(100, height / 2 + 50, 600, 100, "#8d6e63", true);
  rightWall = new Base(width - 300, height / 2 + 50, 600, 100, "#8d6e63", true);

  bridge = new Bridge(15, { x: width / 2 - 400, y: height / 2 });
  jointPoint = new Base(width - 600, height / 2 + 10, 40, 20, "#8d6e63", true);
  
  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  zombie = createSprite(200,height - 100,20,20)
  zombie.addImage("hjkhkjh",zombie_image)
  zombie.scale=0.2
  zombie.velocityX = 5;

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 35, 35);
    stones.push(stone);
  }

  
  axe_button = createImg("axe.png");
  axe_button.position(930,290,10,10)
  axe_button.size(70,70);
  axe_button.mouseClicked(handlePress)

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 1200,
      height: 700,
      wireframes: true,
    },
  });

  Render.run(render);
}

function draw() {
  background(bg_image);
  Engine.update(engine);

  bridge.show();
  rightWall.display();
  leftWall.display();
  ground.display();

  for(var stone of stones){
   stone.display();
   var pos = stone.body.position;
   var distance = dist(zombie.position.x, zombie.position.y,pos.x,pos.y)
   if(distance <= 50){
     zombie.velocityX = 0;
     Matter.Body.setVelocity(stone.body,{x:10, y:-10})
     collided = true;
   }
  }

  if(zombie.position.x > width ) {
    zombie.x = 230
  }

  if (touches) {
    console.log("hello");
  }

  drawSprites()
}

function handlePress() {
  jointLink.dettach();
  setTimeout(()=>{
    bridge.break();
  },1500);



}
