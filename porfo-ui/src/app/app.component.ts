import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import p5 from 'p5';

const sketch = (p: p5) => {
  p.preload = () => {};

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(220);
    p.line(0, 0, p.windowWidth, p.windowWidth);
  };

  p.windowResized = () => {
    
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(220);
    p.line(0, 0, p.windowWidth, p.windowWidth);
  };
  let colors = [
    'dedeff',
    '#cbffcb',
    '#cbdeff',
    '#122131']
  let margin = 300
  let x = margin;
  let y = 0;
  let flip =false
  let step = 2
  let capao = 80
  p.draw = () => {
    console.log(p.width , x ,flip)
    
    p.fill(50+Math.random()*120,50+Math.random()*120,50+Math.random()*120,Math.random()*50)
    p.stroke(Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*70)
    
    let w = (x/20)*y/900
    let h = (y*y/3);
    h = h> capao ? capao : (h<-capao ? -capao : h)
    p.ellipse(x, y+ p.height / 2 ,w ,h);
      
    x = x + step*(flip?-1:1)+w*(Math.random()-0.5);
    y += h/10000+(Math.random()-0.5) *-3
    
    if(Math.abs(p.windowWidth -x) < margin || x<margin ){
      flip = !flip
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
  
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.p5 = new p5(sketch, this.sketch.nativeElement);

  }
  
  
  
}


