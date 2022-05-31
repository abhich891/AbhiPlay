console.log("Welcone to Dhawal Song's");
let songIndex = 0;
let audioElement = new Audio('songs/0.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let previndex = 0;
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    { songName: "Khamoshiyan", filePath: "songs\0.mp3", coverPath: "cover/icons.jpg" },
    { songName: "Mast Magan", filePath: "songs\1.mp3", coverPath: "cover/icons.jpg" },
    { songName: "Shayad", filePath: "songs\2.mp3", coverPath: "cover/icons.jpg" },
    { songName: "Tum Saath Ho", filePath: "songs\3.mp3", coverPath: "cover/icons.jpg" },
    { songName: "Khairiyat", filePath: "songs\4.mp3", coverPath: "cover/icons.jpg" },
    { songName: "Hawayein", filePath: "songs\5.mp3", coverPath: "cover/icons.jpg" },

]
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innertext = songs[i].songName;

})

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(audioElement.currentTime);
    // console.log(audioElement.duration);
    let musiccurrtime = document.getElementById('timer');
    let musicduration = document.getElementById('right');


    audioElement.addEventListener("loadeddata" , () =>{
        let totalmin = parseInt(audioElement.duration / 60 );
        let totalsec = parseInt(audioElement.duration % 60) ;
        if(totalmin < 10 )
        {
            totalmin = `0${totalmin}` ;
        }
        if(totalsec < 10 )
        {
            totalsec = `0${totalsec}` ;
    
        }
        // console.log(audioElement.duration) ;
         musicduration.innerText= `${(totalmin)}:${(totalsec )}` ;
    
    })
    
    let currmin = Math.floor(audioElement.currentTime / 60 );
    let currsec = Math.floor(audioElement.currentTime % 60 ) ;
    if(currmin < 10 )
    {
        currmin = `0${currmin}`;

    }
    if(currsec < 10)
    {
        currsec = `0${currsec}` ;
    }
    musiccurrtime.innerText = `${currmin}:${currsec}` ;

        myProgressBar.value = progress;

        if(myProgressBar.value >= 100)
        {
            myProgressBar.value = 0 ;
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            Array.from(document.getElementsByClassName('gift')).forEach((element1) => {
                if(element1.id==songIndex)
                {
                    element1.style.opacity = 0 ;
                    element1.style.transition = "0.7s ease-in" ; 
        
                }
            })
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
                if(element.id==songIndex)
                {
                    element.classList.remove('fa-circle-pause');
                    element.classList.add('fa-circle-play');
                }
            })
            gif.style.opacity = 0 ;
            if (songIndex >= 5 ) {
                songIndex = 0;
            }
            else {
                songIndex += 1;
            }
            
            audioElement.src = `songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.play();

            Array.from(document.getElementsByClassName('gift')).forEach((element1) => {
                if(element1.id==songIndex)
                {
                    element1.style.opacity = 1 ;
                    element1.style.transition = "0.7s ease-in" ; 
                }
            })
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
                if(element.id==songIndex)
                {
                    element.classList.remove('fa-circle-play');
                    element.classList.add('fa-circle-pause');
                }
            })
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            previndex = songIndex ;
        }

    // Update seek 
})

// audioElement.play(); 
// Handle Play / Pause Click
masterPlay.addEventListener('click', () => {
    // console.log(songIndex);
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        // console.log(element.id);
        // console.log(songIndex);
        if(element.id==songIndex)
        {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                element.classList.remove('fa-circle-play');
                element.classList.add('fa-circle-pause');
                Array.from(document.getElementsByClassName('gift')).forEach((element1) => {
                    if(element1.id==songIndex)
                    {
                        element1.style.opacity = 1 ;
                        element1.style.transition = "0.7s ease-in" ; 
                    }
                })
                gif.style.opacity = 1;
            }
            else {
                audioElement.pause();
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                element.classList.remove('fa-circle-pause');
                Array.from(document.getElementsByClassName('gift')).forEach((element1) => {
                    if(element1.id==songIndex)
                    {
                        element1.style.opacity = 0 ;
                        element1.style.transition = "0.7s ease-in" ; 
                        
                    }
                })
                element.classList.add('fa-circle-play');
                gif.style.opacity = 0;
            }
        }

    })

})
// Listen to Events


myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration / 100);
    // console.log(audioElement.currentTime);

})

const makeallplays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    // console.log(element.id);
    element.addEventListener('click', (e) => {
        // console.log(e.target.classList.value + ' 1 ');
        makeallplays();
        songIndex = parseInt(e.target.id);

        if((audioElement.paused || audioElement.currentTime <= 0) && (songIndex==previndex)) {
        
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            // console.log('Dhawal');
            // console.log(e.target.classList[songIndex]) ;
            audioElement.src = `songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            // audioElement.currentTime = 0;
            // audioElement.duration = 0 ;
            audioElement.play();
            Array.from(document.getElementsByClassName('gift')).forEach((element1) => {
                if(element1.id==songIndex)
                {
                    element1.style.opacity = 1 ;
                    element1.style.transition = "0.7s ease-in" ; 

                }
            })
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else {
            if( songIndex==previndex)
            {
                audioElement.pause();
                Array.from(document.getElementsByClassName('gift')).forEach((element1) => {
                    if(element1.id==songIndex)
                    {
                        element1.style.opacity = 0 ;
                        element1.style.transition = "0.7s ease-in" ; 

                    }
                })
                masterSongName.innerText = songs[songIndex].songName;
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                gif.style.opacity = 0;

            }
            else
            {
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
            // console.log('Dhawal');
                // console.log(e.target.classList[songIndex]) ;
                audioElement.src = `songs/${songIndex}.mp3`;
                masterSongName.innerText = songs[songIndex].songName;
                // audioElement.currentTime = 0;
                // audioElement.duration = 0 ;
                audioElement.play();
                Array.from(document.getElementsByClassName('gift')).forEach((element1) => {
                    if(element1.id==songIndex)
                    {
                        element1.style.opacity = 1 ;
                        element1.style.transition = "0.7s ease-in" ; 

                    }
                    if(element1.id==previndex)
                    {
                        element1.style.opacity = 0 ;
                        element1.style.transition = "0.7s ease-in" ; 

                    }
                })
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');

            }  
            previndex = songIndex ;

        }
      
    })
})
document.getElementById('next').addEventListener('click', () => {
    Array.from(document.getElementsByClassName('gift')).forEach((element1) => {
        if(element1.id==songIndex)
        {
            element1.style.opacity = 0 ;
            element1.style.transition = "0.7s ease-in" ; 

        }
    })
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        if(element.id==songIndex)
        {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    })
    

    if (songIndex >= 5) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    // console.log(audioElement.duration);
    audioElement.play();
    Array.from(document.getElementsByClassName('gift')).forEach((element1) => {
        if(element1.id==songIndex)
        {
            element1.style.opacity = 1 ;
            element1.style.transition = "0.7s ease-in" ; 
        }
    })
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        if(element.id==songIndex)
        {
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        }
    })
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    previndex = songIndex ;

})
document.getElementById('previous').addEventListener('click', () => {

    Array.from(document.getElementsByClassName('gift')).forEach((element1) => {
        if(element1.id==songIndex)
        {
            element1.style.opacity = 0 ;
            element1.style.transition = "0.7s ease-in" ; 

        }
    })
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        if(element.id==songIndex)
        {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    })
    
    if (songIndex <= 0) {
        songIndex = 5 ;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    Array.from(document.getElementsByClassName('gift')).forEach((element1) => {
        if(element1.id==songIndex)
        {
            element1.style.opacity = 1 ;
            element1.style.transition = "0.7s ease-in" ; 

        }
    })
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        if(element.id==songIndex)
        {
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        }
    })

    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    previndex = songIndex ;

})

