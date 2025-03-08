import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import p5 from 'p5';

const sketch = (p: p5) => {
  let cam: p5.Camera;
  let margin = 300
  let x = margin;
  let y = 0;
  let flipX =false
  let flipY =false
  let step = 10
  let capao = 80
  let globalScroll = {x:0,y:0,z:0}
  p.preload = () => {};
  const appMargin = {x:0,y:0}
  p.setup = () => {
    p.createCanvas(p.windowWidth-appMargin.x, p.windowHeight-appMargin.y, 'webgl');
    // cam = p.createCamera();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth-appMargin.x, p.windowHeight-appMargin.y);
  };
  
  p.mouseMoved= (event:any)=>{
    if(Math.random()>0.7){
      // p.background('#131313')
    }
    // if(event.target.className.includes('logo')){
    //   // console.log(event.target.className)
    // }
    if(p){
      p.fill(180,170,200,Math.random()*2)
      p.stroke(100,Math.random()*100,200,Math.random()*50)
      p.rotateX(0)
      p.translate(0,0,0)
      p.torus(event.clientX-p.windowWidth/2,event.clientY-p.windowHeight/2,10 ,10);
      p.translate(0,0,0)
      p.ellipse(event.clientX-p.windowWidth/2,event.clientY-p.windowHeight/2,10 ,10);
    }
  }

  let scrollStep = 0
  p.mouseWheel=(event:any)=>{
    const anyofthis =['albums','album','track','tracks','title', 'release']
    const shouldNotScroll = anyofthis.some(word=>event.target.parentNode.className.includes(word))
    if(!shouldNotScroll){
      scrollStep += (event.wheelDelta >0 ? 1 :-1)*75
      let musicDiv = document.getElementsByClassName('movable') as HTMLCollectionOf<HTMLElement>
      if(musicDiv){
        Array.from(musicDiv).forEach((d:any)=>{
          globalScroll = {
            x: -(globalScroll.x + scrollStep)/150,
            y: (globalScroll.x + scrollStep)/150,
            z: globalScroll.x + scrollStep
          }
          d.style.transform = 'translate3d('+globalScroll.x+'cm,'+globalScroll.y+'cm,'+globalScroll.z+'cm)'
        })
      }
    }
  }

  p.draw = () => {
    // TODO: que caiga lluvia moraita y que por donde vaya el raton haya un paraguas, y la lluvia rebote
    // cam.tilt(p.mouseX/100)
    p.fill(180,170,200,Math.random()*50)
    p.stroke(100,Math.random()*100,200,Math.random()*60)
    step = p.mouseX == 0? step : p.mouseX/100 
    capao =  p.mouseY == 0? 10 :  p.mouseY/20
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
        logo.style.filter = 'blur(30px) invert('+x*y/40000+'%)'
      })
    }
    // TODO: need to adapt font color to background changing
    
  };
};

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'porfo-ui';
  p5!: p5;
  @ViewChild('sketch') sketch!: ElementRef;
  sites: any = {'soundcloud': 'https://soundcloud.com/nilodude', 'bandcamp':'https://nilodude.bandcamp.com/', 'spotify':'https://open.spotify.com/artist/5QO3kUcqzBsVIwbtviZ2Be'}
  jap:string = "ニ ロ ヅ デ" //en verda ナイル川の男 (Nairukawa no otoko)
  catalog: any =  [
      {
          "type": "album",
          "title": "Bitches On Acid",
          "release":"[DDNS17]",
          "release_date": new Date("2021-12-01"),
          "platform": "bandcamp",
          "url": "https://bitchesonacidacid.bandcamp.com/album/ddns17-bitches-on-acid",
          "wiki":"https://en.wikipedia.org/wiki/Portal:Current_events/December_2021",
          "tracks": [
            {
              "title": "Cruisin",
              "url": "https://bitchesonacidacid.bandcamp.com/track/cruisin"
            },
            {
              "title": "Días Viejos",
              "url": "https://bitchesonacidacid.bandcamp.com/track/d-as-viejos"
            },
            {
              "title": "Wearing Very Suspicious Sunglasses for Obvious Reasons",
              "url": "https://bitchesonacidacid.bandcamp.com/track/wearing-very-suspicious-sunglasses-for-obvious-reasons"
            },
            {
              "title": "Aztec-1",
              "url": "https://bitchesonacidacid.bandcamp.com/track/aztec-1"
            },
            {
              "title": "Alien B-Boy Battle",
              "url": "https://bitchesonacidacid.bandcamp.com/track/alien-b-boy-battle"
            },
            {
              "title": "Ácido Chupacabra",
              "url": "https://bitchesonacidacid.bandcamp.com/track/cido-chupacabra"
            },
            // {
            //   "title": "Dennis Coffey",
            //   "url": "https://bitchesonacidacid.bandcamp.com/track/dennis-coffey"
            // },
            // {
            //   "title": "Uncanny Silicon",
            //   "url": "https://bitchesonacidacid.bandcamp.com/track/uncanny-silicon"
            // },
            // {
            //   "title": "Ácido Two",
            //   "url": "https://bitchesonacidacid.bandcamp.com/track/cido-two"
            // },
            // {
            //   "title": "Sérselo",
            //   "url": "https://bitchesonacidacid.bandcamp.com/track/s-rselo"
            // }
          ]
        },
      {
        "type": "album",
        "title": "Acid on Bitches",
        "release":"[IND012]",
        "release_date": "2021-12-01",
        "platform": "bandcamp",
        "url": "https://nilodude.bandcamp.com/releases",
        "wiki":"https://en.wikipedia.org/wiki/Portal:Current_events/December_2021",
        "path": "D:\\MUSICA\\ableton\\ni uno mas\\bitchesonacid\\entrega",
        "tracks": [
          {"title": "Dennis Coffey", "url": "https://nilodude.bandcamp.com/track/dennis-coffey"},
          {"title": "Uncanny Silicon", "url": "https://nilodude.bandcamp.com/track/uncanny-silicon"},
          {"title": "Ácido Two", "url": "https://nilodude.bandcamp.com/track/a3-cido-two"},
          {"title": "Sérselo", "url": "https://nilodude.bandcamp.com/track/s-rselo"},
          // {"title": "Cruisin", "url": "https://nilodude.bandcamp.com/track/cruisin"},
          // {"title": "Dias Viejos", "url": "https://nilodude.bandcamp.com/track/dias-viejos"},
          // {"title": "Wearing Very Suspicious Sunglasses for Obvious Reasons", "url": "https://nilodude.bandcamp.com/track/wearing-very-suspicious-sunglasses-for-obvious-reasons"},
          // {"title": "Aztec-1", "url": "https://nilodude.bandcamp.com/track/aztec-1"},
          // {"title": "Alien B-Boy Battle", "url": "https://nilodude.bandcamp.com/track/alien-b-boy-battle"},
          // {"title": "Ácido Chupacabra", "url": "https://nilodude.bandcamp.com/track/cido-chupacabra"}
        ]
      },
      {
        "type": "album",
        "title": "Bounded Input Bouncing Output",
        "release":"[IND005]",
        "release_date": "2019-01-21",
        "platform": "bandcamp",
        "url": "https://nilodude.bandcamp.com/album/bounded-input-bouncing-output-ind005",
        "wiki":"https://en.wikipedia.org/wiki/Portal:Current_events/January_2019",
        "path": "D:\\MUSICA\\horno\\nilodude_bibo_ind005",
        "tracks": [
          {"title": "iloguarda", "url": "https://nilodude.bandcamp.com/track/iloguarda"},
          {"title": "Lowpass Fistro", "url": "https://nilodude.bandcamp.com/track/lowpass-fistro-2"},
          {"title": "AAAAAAA", "url": "https://nilodude.bandcamp.com/track/aaaaaaa"},
          {"title": "Mazedrum", "url": "https://nilodude.bandcamp.com/track/mazedrum"},
          {"title": "BBBBBBBB", "url": "https://nilodude.bandcamp.com/track/bbbbbbbb"}
        ]
      },
      {
        "type": "compilation",
        "title": "Grandes Edits Vol.1",
        "release":"[DDNS09]",
        "release_date": "2018-10-26",
        "platform": "bandcamp",
        "url": "https://discosdenuestrasegnora.bandcamp.com/album/ddns09-grandes-edits-vol-1?t=3",
        "wiki":"https://en.wikipedia.org/wiki/Portal:Current_events/October_2018",
        "tracks": [
          {"title": "Funky Axe", "url": "https://discosdenuestrasegnora.bandcamp.com/track/nilo-dude-funky-axe"}
        ]
      },
      {
        "type": "album",
        "title": "Grinding EP",
        "release":"[IND001]",
        "release_date": "2017-08-17",
        "platform": "bandcamp",
        "url": "https://industrias94.bandcamp.com/album/grinding-ep-ind001",
        "wiki":"https://en.wikipedia.org/wiki/Portal:Current_events/August_2017",
        "tracks": [
          {
            "title": "No Chances",
            "artist": "Alphone",
            "url": "https://industrias94.bandcamp.com/track/alphone-no-chances"
          },
          {
            "title": "Dungeology",
            "artist": "Alphone",
            "url": "https://industrias94.bandcamp.com/track/alphone-dungeology"
          }
        ]
      },
      {
        "type": "album",
        "title": "AL-YABR",
        "release_date": "2016-06-16",
        "platform": "soundcloud",
        "url": "https://soundcloud.com/nilodude/sets/al-yabr",
        "wiki":"https://en.wikipedia.org/wiki/Portal:Current_events/June_2016",
        "tracks": [
          {"title": "94 Dunas (farsantedeaupa's First Blood)", "url": "https://soundcloud.com/nilodude/01-94-dunas-farsantedeaupas-first-blood?in=nilodude/sets/al-yabr"},
          {"title": "Remember Soundboy (voices From Creep Afrika)", "url": "https://soundcloud.com/nilodude/02-remember-soundboy-voices-from-creep-afrika?in=nilodude/sets/al-yabr"},
          {"title": "Getal Mear (farsantedeaupa Hunts El Colibri)", "url": "https://soundcloud.com/nilodude/03-getal-mear-farsantedeaupa-hunts-el-colibri?in=nilodude/sets/al-yabr"},
          {"title": "Otsirc Usej Re", "url": "https://soundcloud.com/nilodude/04-otsirc-usej-re?in=nilodude/sets/al-yabr"},
          {"title": "Sahara Y Sedal [BONUS]", "url": "https://soundcloud.com/nilodude/05-sahara-y-sedal-bonus?in=nilodude/sets/al-yabr"}
        ]
      },
      {
        "type": "album",
        "title": "TOTALPH 94",
        "release_date": "2016-05-10",
        "platform": "soundcloud",
        "url": "https://soundcloud.com/nilodude/sets/totalph-94",
        "wiki":"https://en.wikipedia.org/wiki/Portal:Current_events/May_2016",
        "tracks": [
          {"title": "Jiomega", "url": "https://soundcloud.com/nilodude/01-jiomega?in=nilodude/sets/totalph-94"},
          {"title": "Mentalidad", "url": "https://soundcloud.com/nilodude/02-mentalidad?in=nilodude/sets/totalph-94"},
          {"title": "Street Shark", "url": "https://soundcloud.com/nilodude/03-street-shark?in=nilodude/sets/totalph-94"},
          {"title": "Y si Yo (madre)", "url": "https://soundcloud.com/nilodude/04-y-si-yo-madre?in=nilodude/sets/totalph-94"},
          {"title": "Farsantedeaupa - Cacatura (alphone Divides By Zero)[BONUS]", "url": "https://soundcloud.com/nilodude/05-farsantedeaupa-cacatura-alphone-divides-by-zerobonus?in=nilodude/sets/totalph-94"}
        ]
      },
      
      
    ]
  
  arcaraho: boolean = false
  
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.p5 = new p5(sketch, this.sketch.nativeElement);
  }
  
  open(site: string){
    window.open(this.sites[site])
  }
  openAlbum(site: string){
    window.open(site)
  }
}


