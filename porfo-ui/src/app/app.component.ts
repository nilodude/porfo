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
    p.background(220);
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  let x = 0;

  p.draw = () => {
    p.background(220);
    // if (x < 300) {
      p.ellipse(x, p.height / 2, 20, 20);
      x = x + 1;
    // }
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


