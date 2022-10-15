console.log("connected!")
//CSS

//TYPING SIGN
let text=document.getElementById("input");
let result=document.querySelector("#result");
let inputtext="My Signature";
let parentcanvas=document.getElementsByClassName("resultcanvas")[0]
let fontsize=document.querySelector("#fontsize");
let selectedfont = 'Arial';
let fontcolor=document.querySelector("#fontcolor")
let bgcolor=document.querySelector("#bgcolor");
let slope=document.querySelector("#Slope")
let skew=document.querySelector("#slant")
let ctx=null;
let fontname=null;
let fonturl=null;

let items=document.querySelectorAll('.dropdown-item')
Array.from(items).map(i=>{
  i.addEventListener('click',(e)=>{
    console.log(e.currentTarget.dataset.url)
    fontname=e.currentTarget.dataset.toggle
    fonturl=e.currentTarget.dataset.url
    loadfonts(fontname,fonturl)
  // selectedfont=e.currentTarget.dataset.toggle
   document.fonts.ready.then(function(){
    let fontimg=document.createElement("img")
    fontimg.style.verticalAlign='top';
    fontimg.style.height='36px'
    fontimg.style.width='144px'
    fontimg.src=e.currentTarget.dataset.path
    document.querySelector("#dropdownMenuButton").innerHTML='';
    document.querySelector("#dropdownMenuButton").appendChild(fontimg)
   }) 

    drawcanvas() 
  })
})
function loadfonts(){
  WebFont.load({
    google: {
      families: [fontname]
    }
  });
  selectedfont=fontname;
}
document.querySelector("#typesignbtn").addEventListener("click",()=>{
  document.querySelector("#typesignaturecontainer").style.display="block";
  document.querySelector(".maindisplaybuttons").style.display="none"
  document.querySelector(".mainheading").style.marginTop="2%";
  drawcanvas()
})

document.querySelector("#drawsignbtn").addEventListener("click",()=>{
  document.querySelector("#drawsignaturecontainer").style.display="block";
  document.querySelector(".maindisplaybuttons").style.display="none"
  document.querySelector(".mainheading").style.marginTop="2%";
})

document.querySelector("#fontsize").addEventListener("keyup",()=>{
drawcanvas();
})

text.addEventListener("keyup",()=>{
drawcanvas();
})

fontcolor.addEventListener("change",()=>{
drawcanvas()
})

bgcolor.addEventListener("change",()=>{
drawcanvas()
})

document.querySelector("#font-decrease").addEventListener("click",()=>{
    fontsize.value=Number(fontsize.value)-1
    drawcanvas()
})
document.querySelector("#font-increase").addEventListener("click",()=>{
fontsize.value=Number(fontsize.value)+1;
drawcanvas()
})

slope.addEventListener("input",()=>{
    drawcanvas(true);
})

document.querySelector("#downloadtype").addEventListener("click",()=>{
 
  let canvas = document.querySelector("#maincanvas1");
  let url = canvas.toDataURL(`image/png`)
  let a = document.createElement('a')
  a.href = url
  a.download = `safeimagekit-signature`
  document.body.appendChild(a)
  a.click()
})
// skew.addEventListener("input",()=>{
//   drawcanvas(true);
// })


function drawcanvas(rotate=false){
    parentcanvas.innerHTML=''
    let newcanvas=document.createElement('canvas');
    newcanvas.setAttribute("id","maincanvas1")
    let ctx=newcanvas.getContext("2d");
    inputtext=text.value
    newcanvas.height=336
    newcanvas.width=558;
    ctx.font=`${fontsize.value}px ${selectedfont}`
    ctx.fillStyle=fontcolor.value;
    ctx.textBaseline="middle"
    newcanvas.style.backgroundColor=bgcolor.value;
    ctx.textAlign="center"
    if(rotate) {
      ctx.translate(newcanvas.width/2, newcanvas.height/2)
      ctx.rotate(slope.value*Math.PI/180)
      ctx.fillText(inputtext ,0,0);}  
    else 
    ctx.fillText(inputtext , newcanvas.width/2, newcanvas.height/2)
    parentcanvas.appendChild(newcanvas)
}

// DRAWING SIGN
// When true, moving the mouse draws on the canvas
let drawingcanvas=document.querySelector("#myPics")
let drawwidth=document.querySelector("#drawwidth")
let drawcolor=document.querySelector("#signcolor")
let drawangle=document.querySelector("#drawangle")
let isDrawing = false;
let x = 0;
let y = 0;
const myPics = document.getElementById('myPics');
const context = myPics.getContext('2d');
let rotate =null;

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
myPics.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

myPics.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = `${drawcolor.value}`;
  context.lineWidth = `${drawwidth.value}`;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
  context.save();
}
document.querySelector("#drawreset").addEventListener("click",()=>{
    context.clearRect(0,0,drawingcanvas.width,drawingcanvas.height)
})

document.querySelector("#downloaddraw").addEventListener("click",()=>{
  let canvas = document.querySelector("#myPics");
  let url = canvas.toDataURL(`image/png`)
  let a = document.createElement('a')
  a.href = url
  a.download = `safeimagekit-signature`
  document.body.appendChild(a)
  a.click()
})