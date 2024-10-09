let songName = document.querySelector("#song-name");
let songSinger = document.querySelector("#song-singer");
let songImage = document.querySelector(".song-img");
let playPauseImg = document.querySelector("#play-img");
let volumeRange = document.querySelector("#volume-range");
let songRange = document.querySelector("#song-duration");
let volSvg = document.querySelector("#vol-svg");
let musicAnim = document.querySelector("#music-anim");
let playlistImg = document.querySelector("#playlist-img"); 
let playlist = document.querySelector(".playlist");
let playlistSong = document.querySelectorAll(".playlist-song");
let index=0;                       
let playingSongs=false;
let track= document.createElement("audio");
let songs=[
  {
    name:"Shaayraana",
    path:"songs/Shaayraana.mp3",
    image:"image/image-1.jpg",
    singer:"Arijit Singh"
  }, 
{
    name:"Tum prem ho preet ho ",
    path:"songs/Tum Prem Ho Tum Preet Ho.mp3",
    image:"image/image2.jpg",
    singer:"Mohit Lalwani"
  },
  {
    name:"Ve Kamleya",
    path:"songs/Ve Kamleya.mp3",
    image:"image/image-3.jpeg",
    singer:"Arijit Singh"
  },
  {
    name:"Banjaara",
    path:"songs/Banjaara .mp3",
    image:"image/image4.jpg",
    singer:"Mohammed Irfan"
  }, 
]
function loadTrack(index){
track.src=songs[index].path;
songName.innerHTML=songs[index].name;
songSinger.innerHTML=songs[index].singer;
songImage.style=`background-image: url("${ songs[index].image}");` 

volume();
duration();
track.load();
setInterval(()=>{
  songRange.max = track.duration
  songRange.value = track.currentTime
},1000)
track.loop= true;
}
loadTrack(index); 

function playPause(){
   if(playingSongs==false){
    playSong();
   }
   else{
    pauseSong();
   }
}
function playSong(){
  track.play();
  playingSongs=true;
  playPauseImg.src="pause.svg";
  musicAnim.style.display="block";

}
 function pauseSong(){
  track.pause();
   playingSongs=false;
  playPauseImg.src="play.svg"
  musicAnim.style.display="none";

 }
 function nextSong(){
  if(index<songs.length-1){
    index++;
    loadTrack(index);
    playSong();
  }else{
    index=0;
    loadTrack(index);
    playSong();
  }
 }
 function previousSong(){
  if(index>0){
    index--;
    loadTrack(index);
    playSong();
  }else{
    index=songs.length-1 ;
    loadTrack(index);
    playSong();
  }
 }
 function volume(){
track.volume = volumeRange.value/100;
if(volumeRange.value==0){
volSvg.src="mute.svg";
}else{
  volSvg.src="volume.svg";
}
 }
 function duration(){
 track.currentTime = songRange.value;
 }
 
 
 playlistImg.addEventListener("click", ()=>{
   playlist.classList.toggle("playlist-active");
   if(  playlist.classList.contains("playlist-active")){
    playlistImg.src="cross.svg";
   }else{
    playlistImg.src="playlist.svg";
   }
 })

playlistSong.forEach((song,index)=>{
  song.addEventListener('click',()=>{
    loadTrack(index);
    playSong();
    playlist.classList.remove("playlist-active");
    playlistImg.src="playlist.svg";
  })
})