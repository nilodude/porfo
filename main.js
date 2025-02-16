let colors = [
    'dedeff',
    '#cbffcb',
    '#cbdeff',
    '#122131']
  let margin = 300
  let x = margin;
  let y = 0;
  let flipX =false
  let flipY =false
  let step = 10
  let capao = 80
  const appMargin = {x:2.59,y:2.59}
async function setup() {
    let cnv =createCanvas(innerWidth-appMargin.x, innerHeight-appMargin.y, WEBGL);
    // cam = p.createCamera();
}

function mouseMoved(event){
    if(event.target.className.includes('logo')){
      console.log(event.target.className)
    }
      
    fill(180,170,200,Math.random()*2)
    stroke(100,Math.random()*100,200,Math.random()*50)
    
    rotateX(0)
    translate(0,0,0)
    torus(event.clientX-displayWidth/2,event.clientY-displayHeight/2,10 ,10);
    translate(0,0,0)
    ellipse(event.clientX-displayWidth/2,event.clientY-displayHeight/2,10 ,10);

}
let sites = {'soundcloud': 'https://soundcloud.com/nilodude', 'bandcamp':'https://nilodude.bandcamp.com/', 'spotify':'https://open.spotify.com/artist/5QO3kUcqzBsVIwbtviZ2Be'}
let clic = 0
function openLink(site){
    console.log(site)
    if(clic == 0){
        window.open(sites[site])
        clic = 1
    }
    
}

function mouseClicked(event) {
    // Code to run that uses the event.
    if(event.target.className.includes('logo')){
        let c = event.target.className.split(' ')[0]
        openLink(c.slice(0,c.indexOf('L')))
       
    }
  }

function draw(){
    // TODO: que caiga lluvia moraita y que por donde vaya el raton haya un paraguas, y la lluvia rebote
    // cam.tilt(p.mouseX/100)
    step = mouseX/100
    capao = mouseY/20
    fill(180,170,200,Math.random()*50)
    stroke(100,Math.random()*100,200,Math.random()*60)
    // p.ellipse(0,-p.windowHeight/2,50,50)
    let w = (x/40)*y/10000
    let h = (y*y/3);
    h = h> capao ? capao : (h<-capao ? -capao : h)
    // TODO: this rotateX should change over time as well. lower the denominator, "crazier" the pattern. whatever "crazy" means 
    rotateX(-x*y/50000)
    translate(0,0,y/10)
    ellipse(x-displayWidth/2,y,w ,h);
   
    x = x + step*(flipX?-1:1)+w*(Math.random()-0.5);
    y =y + (flipX?-1:1)*h/400+(Math.random()-0.5) *-88
    
    if(Math.abs(displayWidth -x) < margin || x<margin ){
      flipX = !flipX
    }
    if(y>displayHeight/2){
      y = -displayHeight/2
      flipY = true
    } 
    if(y<-displayHeight/2){
      y =displayHeight/2
      flipY = true
    }
    let logos = document.getElementsByClassName('logo')
    if(logos){
      Array.from(logos).forEach((logo)=>{
        logo.style.filter = 'blur(40px) invert('+y/70+'%)'
      })
    }
}