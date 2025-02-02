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

  let x = 100;
  let y = 0;
  let flip =false
  p.draw = () => {
    console.log(p.width , x ,flip)
    
      p.fill(255,255,255,Math.random()*100)
      p.ellipse(x, p.height / 2 +y, x*y/900,y/5);
      x = !flip ? x + 3+Math.random()-0.5 : x - 3+Math.random()-0.5;
      y += (Math.random()-0.5) *-5
    
    if(Math.abs(p.width -x) < 10 || x<100 ){
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


