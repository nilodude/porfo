import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import p5 from 'p5';

const sketch = (p: p5) => {
  let cam: p5.Camera;
  p.preload = () => {};
  const appMargin = {x:0,y:5}
  p.setup = () => {
    p.createCanvas(p.windowWidth-appMargin.x, p.windowHeight-appMargin.y, 'webgl');
    cam = p.createCamera();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth-appMargin.x, p.windowHeight-appMargin.y);
    // p.background(220);
  };
  
  p.mouseMoved= (event:any)=>{
    p.fill(180,170,200,Math.random()*2)
    p.stroke(100,Math.random()*100,200,Math.random()*50)
    
    p.rotateX(0)
    p.translate(0,0,0)
    p.ellipse(event.clientX-p.windowWidth/2,event.clientY-p.windowHeight/2,10 ,10);
    // p.torus(event.clientX-p.windowWidth/2,event.clientY-p.windowHeight/2,10 ,10);

  }

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
  p.draw = () => {
    // TODO: que caiga lluvia moraita y que por donde vaya el raton haya un paraguas, y la lluvia rebote
    // cam.tilt(p.mouseX/100)
    step = p.mouseX/100
    capao = p.mouseY/20
    p.fill(180,170,200,Math.random()*50)
    p.stroke(100,Math.random()*100,200,Math.random()*60)
    // p.ellipse(0,-p.windowHeight/2,50,50)
    let w = (x/40)*y/10000
    let h = (y*y/3);
    h = h> capao ? capao : (h<-capao ? -capao : h)
    // TODO: this rotateX should change over time as well. lower the denominator, "crazier" the pattern. whatever "crazy" means 
    p.rotateX(-x*y/50000)
    p.translate(0,0,y/10)
    p.ellipse(x-p.width/2,y,w ,h);
   
    x = x + step*(flipX?-1:1)+w*(Math.random()-0.5);
    y =y + (flipX?-1:1)*h/400+(Math.random()-0.5) *-88
    
    if(Math.abs(p.windowWidth -x) < margin || x<margin ){
      flipX = !flipX
    }
    if(y>p.windowHeight/2){
      y = -p.windowHeight/2
      flipY = true
    } 
    if(y<-p.windowHeight/2){
      y =p.windowHeight/2
      flipY = true
    }
    let logos = document.getElementsByClassName('logo')
    if(logos){
      Array.from(logos).forEach((logo:any)=>{
        logo.style.filter = 'blur(40px) invert('+y/70+'%)'
      })
    }
  };
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'porfo-ui';
  p5!: p5;
  @ViewChild('sketch') sketch!: ElementRef;
  sites: any = {'soundcloud': 'https://soundcloud.com/nilodude', 'bandcamp':'https://nilodude.bandcamp.com/', 'spotify':'https://open.spotify.com/artist/5QO3kUcqzBsVIwbtviZ2Be'}
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.p5 = new p5(sketch, this.sketch.nativeElement);
  }
  
  open(site: string){
    window.open(this.sites[site])
  }
  
}


