let currentsong = new Audio()
let songs;
function convertSecondsToTimeFormat(seconds) {
  // Ensure the seconds value is an integer (ignore milliseconds if passed as floating-point)
  seconds = Math.floor(seconds);

  // Calculate the minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Format minutes and seconds with leading zeros if necessary
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  // Return the formatted time
  return `${formattedMinutes}:${formattedSeconds}`;
}

// Example usage:


function createcard(image,name){
let html=`<div class="card">
 <div>
 <img src="${image}" alt="">
 </div>
<h2>${name}</h2>
  artist
 </div>`
 document.getElementsByClassName("cardcontainer")[0].innerHTML=document.getElementsByClassName("cardcontainer")[0].innerHTML+html;
}
createcard("Marriage Pic.jpg","kumar sanu");
createcard("yo-yo-honey-singh-raat-jashan-d8cqx2677dvf9uda.jpg","honey singh");
createcard("sonu nigam.png","sonu nigam");
function createcard2(image,name){
  let html=`<div class="card2">
 <div class="play">
  <svg width="800px" height="800px" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
 <!-- Background Circle -->
<circle cx="400" cy="400" r="350" fill="green" />
 <!-- Original SVG inside the circle with padding -->
 <svg x="125" y="125" width="550px" height="550px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#1C274C"/>
  </svg>
  </svg>
</div>
<div>
 <img src="${image}" alt="">
                                
 </div>
 <h2>${name}</h2>
   artist
  </div>
   </div>
  </div>
 </div>`
   document.getElementsByClassName("cardcontainer2")[0].innerHTML=document.getElementsByClassName("cardcontainer2")[0].innerHTML+html;
  }
  createcard2("Marriage Pic.jpg","kumar sanu");
  createcard2("yo-yo-honey-singh-raat-jashan-d8cqx2677dvf9uda.jpg","honey singh");
  createcard2("sonu nigam.png","sonu nigam");
   async function getsongs(){
    let a = await fetch("songs");
    let response= await a.text();
    console.log(response);
    let element= document.createElement("div")
    element.innerHTML=response;
    let as = element.getElementsByTagName("a")
    let songs = []

    for(let index=0 ; index<as.length ; index++){
      const data = as[index];
      if(data.href.endsWith(".mp3")){
        songs.push(data.href.split("/songs/")[1])
      }
    }
    return songs;

  }
  const playmusic=(track)=>{
    currentsong.src="songs/"+track
    currentsong.play()
     play.src="svgs/pause.svg.svg"
     document.querySelector(".songinfo").innerHTML=track.replaceAll("%20"," ")
     document.querySelector(".songduration").innerHTML

  }
  async function main() {
     songs=  await getsongs()
    console.log(songs);
     let songul =document.querySelector(".songlist").getElementsByTagName("ul")[0]
     for (const song of songs ) {
       songul.innerHTML=songul.innerHTML+`   <li>
                            <img src="svgs/misic (1).svg" alt="" >
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>harsh</div>
                            </div>
                              <div class="playnow">
                               <span> play now</span>
                                <img src="svgs/play.svg" alt=" ">
                            </div>
                        </li>`;
      
     }
     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
      e.addEventListener("click", element =>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
      })
     })
     play.addEventListener("click",()=>{
      if(currentsong.paused){
        currentsong.play()
        play.src="svgs/pause.svg.svg"
      }
      else{
        currentsong.pause()
        play.src="svgs/play.svg"
      }
     })
     currentsong.addEventListener("timeupdate",()=>{
      console.log(currentsong.currentTime,currentsong.duration);
     document.querySelector(".songduration").innerHTML=`${convertSecondsToTimeFormat(currentsong.currentTime)}/${convertSecondsToTimeFormat(currentsong.duration)}`
      document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100 + "%"
     })
     document.querySelector(".seekbar").addEventListener("click",e=>{
      let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100
      document.querySelector(".circle").style.left= percent +"%"
      currentsong.currentTime=(currentsong.duration)*percent/100;

     })
     document.getElementById("prev").addEventListener("click",()=>{
      let index= songs.indexOf(currentsong.src.split("/").slice(-1)[0])
      if((index-1)>=0){
        playmusic(songs[index-1])
      }
     })
     document.getElementById("forward").addEventListener("click",()=>{
      let index= songs.indexOf(currentsong.src.split("/").slice(-1)[0])
      if((index+1)>length){
        playmusic(songs[index+1])
      }
     })

  }
  main()


