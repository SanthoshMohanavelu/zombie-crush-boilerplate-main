const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base1, base2


function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  base1 = new Base(180, 390, 1000, 102)
  base2 = new Base(1610, 390, 1000, 102)

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  bridge = new Bridge

}

function draw() {
  background(51);
  Engine.update(engine);
 base1.display()
 base2.display()




 if(touches) {
  console.log("hello")
}

}
