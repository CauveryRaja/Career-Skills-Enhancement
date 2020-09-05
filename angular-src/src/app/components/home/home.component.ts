import { Component, OnInit,ElementRef,ViewChild,Input,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('myCanvas') canvasRef: ElementRef;
  
  gridCube:string[60];

  constructor() { }

  //@Input() public width = 400;
  //@Input() public height = 400;
 
  ngOnInit() {

  }
  /*
  ngAfterViewInit() {
    
    let ctx: CanvasRenderingContext2D =
    this.canvasRef.nativeElement.getContext('2d');
    this.canvasRef.nativeElement.width=window.innerWidth;
    this.canvasRef.nativeElement.height=window.innerHeight;
    console.log(this.canvasRef);
    animate();
    var x=0,y=200,radius=30,dx=2,dy=2,flag=0;
    var x1,y1=y,x2,y2=y,x3,y3=y;
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0,0,innerWidth,innerHeight);
       
        ctx.beginPath();
        ctx.moveTo(200,600);
        //ctx.lineTo(190,550);
        ctx.lineTo(220,550);
        ctx.lineTo(230,530);
        ctx.lineTo(210,600);
        ctx.lineTo(200,600);
        ctx.stroke();
        //ctx.fill();
        if(x<700 && flag==0) {
          ctx.beginPath();
          ctx.arc(x,200,radius,0,Math.PI*2,false);
          ctx.strokeStyle="black";
          ctx.fillStyle="black";
          ctx.stroke();
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x-100,200,radius,0,Math.PI*2,false);
          ctx.strokeStyle="black";
          ctx.fillStyle="black";
          ctx.stroke();
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(x-200,200,radius,0,Math.PI*2,false);
          ctx.strokeStyle="black";
          ctx.fillStyle="black";
          ctx.stroke();
          ctx.fill();
        }
        else {
          x1=x;
          y1=y;
          ctx.beginPath();
          ctx.arc(x1,y1,radius,0,Math.PI*2,false);
          ctx.strokeStyle="blue";
          ctx.fillStyle="blue";
          ctx.stroke();
          ctx.fill();

          ctx.beginPath();
          x2=x-100;
          y2=y-100;
          ctx.arc(x2,-y2,radius,0,Math.PI*2,false);
          ctx.strokeStyle="grey";
          ctx.fillStyle="grey";
          ctx.stroke();
          ctx.fill();
          
          ctx.beginPath();
          x3=x-200;
          y3=y-50;
          ctx.arc(x3,y3,radius,0,Math.PI*2,false);
          ctx.strokeStyle="green";
          ctx.fillStyle="green";
          ctx.stroke();
          ctx.fill();

          if(x1 + radius >= window.innerWidth || x1-radius < 0 ||
              x2 + radius >= window.innerWidth || x2-radius < 0 ||
              x3 + radius >= window.innerWidth || x3-radius < 0) {
            dx=-dx;
            //split();
            flag++;
          }
          if(y1 + radius >= window.innerHeight || y1-radius < 0 ||
              y2 + radius >= window.innerHeight || y2-radius < 0 ||
              y3 + radius >= window.innerHeight || y3-radius < 0) {
            dy=-dy;
            //split();
            flag++;
          }
          y+=dy;
        }
        x+=dx;
        if(flag>0) {
          y+=dy;
        }
        /*
        if(flag==1) {
          y1=Math.random() * window.innerHeight;
          y2=(Math.random() - 0.5) * window.innerHeight;
          y3=(Math.random() - 0.3) * window.innerHeight;
        }*/
        /*
        if(flag==1) {
          x=Math.random() * innerWidth;
          y=Math.random() * innerHeight;
          dx=(Math.random() - 0.5) * 8;
          dy=(Math.random() - 0.5) * 8;
        }*/
   // }
/*
    function split() {
      
      var xx=Math.random() * innerWidth;
      var yy=Math.random() * innerHeight;
      var dxx=(Math.random() - 0.5) * 8;
      var dyy=(Math.random() - 0.5) * 8;
      var xx=500,yy=800;
      ctx.beginPath();
      ctx.arc(xx+x,yy,radius-20,0,Math.PI*2,false);
      ctx.strokeStyle="blue";
      ctx.fillStyle="green";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(xx+x,yy,radius-20,0,Math.PI*2,false);
      ctx.strokeStyle="grey";
      ctx.fillStyle="green";
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(xx+x,yy,radius-20,0,Math.PI*2,false);
      ctx.strokeStyle="green";
      ctx.fillStyle="green";
      ctx.stroke();
    }*/
    //ctx.fillRect(100,100,100,100);
    /*let x2=-30,y2=250;
    for(let i=0;i<5;i++) {
      ctx.beginPath();
      ctx.arc(100,y2,30,0,Math.PI*2,false);
      ctx.strokeStyle="red";
      ctx.fillStyle="green";
      ctx.stroke();  
      //animate();*/
    //}
    

  
}
