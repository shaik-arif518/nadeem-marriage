window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    // Trigger mobile-specific logic, like collapsing a navigation bar
  } else {
    // Trigger desktop-specific logic
  }
});// ===== script.js =====
// scroll animations, countdown, audio, rsvp confetti,
// ring scratch reveal, curtain opening, text animation

(function () {
"use strict";

/* ------------------------------------------------ */
/* 1. SCROLL SCENE ANIMATION */
/* ------------------------------------------------ */

const scenes = document.querySelectorAll(".scene");
const scrollContainer = document.getElementById("filmScroll");

const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("in-view");
} else {
entry.target.classList.remove("in-view");
}
});
},
{ threshold: 0.4, root: scrollContainer }
);

scenes.forEach((scene) => observer.observe(scene));

if (scenes.length) scenes[0].classList.add("in-view");


/* ------------------------------------------------ */
/* 2. COUNTDOWN */
/* ------------------------------------------------ */

const weddingDate = new Date("May 10, 2026 17:00:00");
function updateCountdown() {

const now = new Date();
const diff = weddingDate - now;

if (diff <= 0) {
document.getElementById("days").innerText = "00";
document.getElementById("hours").innerText = "00";
document.getElementById("minutes").innerText = "00";
document.getElementById("seconds").innerText = "00";
return;
}

const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
const minutes = Math.floor((diff / (1000 * 60)) % 60);
const seconds = Math.floor((diff / 1000) % 60);

document.getElementById("days").innerText = days.toString().padStart(2,"0");
document.getElementById("hours").innerText = hours.toString().padStart(2,"0");
document.getElementById("minutes").innerText = minutes.toString().padStart(2,"0");
document.getElementById("seconds").innerText = seconds.toString().padStart(2,"0");

}

updateCountdown();
setInterval(updateCountdown,1000);


/* ------------------------------------------------ */
/* 3. AUDIO TOGGLE */
/* ------------------------------------------------ */

const audio = document.getElementById("bgAudio");
const toggleBtn = document.getElementById("audioToggle");

if(audio){

audio.volume = 0.3;

const playPromise = audio.play();

if (playPromise !== undefined) {
playPromise.then(() => {
toggleBtn.innerText = "🔊 mute";
}).catch(() => {
toggleBtn.innerText = "🔇 unmute";
});
}

toggleBtn.addEventListener("click", () => {

if (audio.paused) {
audio.play();
toggleBtn.innerText = "🔊 mute";
} else {
audio.pause();
toggleBtn.innerText = "🔇 unmute";
}

});

}


/* ------------------------------------------------ */
/* 4. RSVP PETAL CONFETTI */
/* ------------------------------------------------ */

const rsvpBtn = document.getElementById("rsvpSubmit");
const guestInput = document.getElementById("guestName");
const thankDiv = document.getElementById("thankyouMessage");

if(rsvpBtn){

rsvpBtn.addEventListener("click", function (e) {

e.preventDefault();

const name = guestInput.value.trim() || "beautiful soul";

thankDiv.innerHTML =
`<div class="thankyou-message" style="font-family:'Great Vibes',cursive;font-size:2.5rem;color:#653f30;animation:gentleZoom 1s;">
♡ thank you, ${name} ♡
</div>`;

for(let i=0;i<8;i++){
createPetal();
}

});

}

function createPetal(){

const petal = document.createElement("div");

petal.innerText="🌸❤️💖";
petal.style.position="fixed";
petal.style.left=Math.random()*100+"%";
petal.style.top="-10%";
petal.style.fontSize=(20+Math.random()*20)+"px";
petal.style.opacity="0.6";
petal.style.pointerEvents="none";
petal.style.zIndex="9999";
petal.style.transition="transform 8s linear, opacity 8s";

document.body.appendChild(petal);

const drift=(Math.random()-0.5)*200;

setTimeout(()=>{

petal.style.transform=
`translateY(110vh) rotate(${Math.random()*360}deg) translateX(${drift}px)`;

petal.style.opacity="0";

},50);

setTimeout(()=>{
petal.remove();
},9000);

}


/* ------------------------------------------------ */
/* 5. RING → SCRATCH CARD */
/* ------------------------------------------------ */

const ringWrapper = document.getElementById("ringWrapper");
const scratchCard = document.getElementById("scratchCard");

if(ringWrapper){

ringWrapper.addEventListener("click",()=>{

ringWrapper.style.transform="scale(0)";

setTimeout(()=>{

ringWrapper.style.display="none";
scratchCard.classList.remove("hidden");

initScratch();

},600);

});

}


function initScratch(){

const canvas=document.getElementById("scratchCanvas");
const ctx=canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle="#c0c0c0";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#000";
ctx.font="22px serif";
ctx.fillText("Scratch Here",120,110);

let drawing=false;
let revealed=false;

canvas.addEventListener("mousedown",()=>drawing=true);
canvas.addEventListener("mouseup",()=>drawing=false);
canvas.addEventListener("mousemove",scratch);

canvas.addEventListener("touchstart",()=>drawing=true);
canvas.addEventListener("touchend",()=>drawing=false);
canvas.addEventListener("touchmove",scratch);

function scratch(e){

if(!drawing) return;

const rect=canvas.getBoundingClientRect();

const x=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;
const y=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;

ctx.globalCompositeOperation="destination-out";

ctx.beginPath();
ctx.arc(x,y,22,0,Math.PI*2);
ctx.fill();

checkReveal();

}

function checkReveal(){

const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);

let transparent=0;

for(let i=3;i<pixels.data.length;i+=4){
if(pixels.data[i]===0) transparent++;
}

let percent=transparent/(pixels.data.length/4)*100;

if(percent>50 && !revealed){

revealed=true;

heartExplosion();
flowerFall();

}

}

}


/* ------------------------------------------------ */
/* 6. HEART EXPLOSION */
/* ------------------------------------------------ */

function heartExplosion(){

for(let i=0;i<40;i++){

let heart=document.createElement("div");

heart.className="heart";
heart.innerHTML="❤️💖💖";

heart.style.left=Math.random()*100+"vw";
heart.style.bottom="0px";

document.body.appendChild(heart);

setTimeout(()=>heart.remove(),2000);

}

}


/* ------------------------------------------------ */
/* 7. FLOWER FALL */
/* ------------------------------------------------ */

function flowerFall(){

for(let i=0;i<30;i++){

let flower=document.createElement("div");

flower.className="flower";
flower.innerHTML="🌸❤️💖";

flower.style.left=Math.random()*100+"vw";
flower.style.animationDuration=(3+Math.random()*3)+"s";

document.body.appendChild(flower);

setTimeout(()=>flower.remove(),6000);

}

}


/* ------------------------------------------------ */
/* 8. CURTAIN OPENING + TEXT REVEAL */
/* ------------------------------------------------ */

const curtainContainer=document.getElementById("curtain-container");
const leftCurtain=document.querySelector(".left");
const rightCurtain=document.querySelector(".right");

if(curtainContainer){

curtainContainer.addEventListener("click",()=>{

leftCurtain.classList.add("open-left");
rightCurtain.classList.add("open-right");

setTimeout(()=>{

curtainContainer.style.display="none";
showSceneText();

},2000);

});

}


function showSceneText(){

setTimeout(()=>{
document.getElementById("text1").classList.add("show-text");
},500);

setTimeout(()=>{
document.getElementById("text2").classList.add("show-text");
},1200);

setTimeout(()=>{
document.getElementById("text3").classList.add("show-text");
},1900);

}

})();
const canvas = document.getElementById("yourCanvasId"); // Assuming you have a canvas element
const ctx = canvas.getContext("2d", { willReadFrequently: true });