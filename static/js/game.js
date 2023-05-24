const videos = document.querySelectorAll('.videos')
const firstDiv = document.querySelector('#firstOption')
const secondDiv = document.querySelector("#secondOption")
const titles = document.querySelectorAll('.title')
const points = document.querySelectorAll('.points')
const firstOption = document.querySelector('#firstOption')
const secondOption = document.querySelector('#secondOption')
const firstButton = document.querySelector("#firstButton")
const secondButton = document.querySelector("#secondButton")


const allSongs = []
const videosArray = []
let NumberOfSongs = 0
const fightingSongs = []
const currentSongs = []
const currentSongsSecond = []

let round = 0
let numberOfRounds = 0
for (let index = 0; index < videos.length; index++) {
    allSongs.push({
        html: videos[index].textContent,
        title: titles[index].textContent,
        points: 0
    })
    videosArray.push(videos[index].textContent)
    
}

const start_game=()=>{
    const len = allSongs.length
    numberOfRounds = allSongs.length
    NumberOfSongs = len
    const optionOne = Math.floor(Math.random() * len)
    let optionTwo = Math.floor(Math.random() * len)
    while (optionOne === optionTwo){
        optionTwo = Math.floor(Math.random() * len)
    }
    firstDiv.innerHTML = videos[optionOne].textContent
    secondDiv.innerHTML = videos[optionTwo].textContent
    fightingSongs.push(allSongs[optionOne])
    fightingSongs.push(allSongs[optionTwo])
    allSongs.splice(optionOne,1)
    if (optionOne > optionTwo){
        allSongs.splice(optionTwo,1)
    }
    else{
        allSongs.splice(optionTwo-1,1)
    }
    
    
   

}
const fight=()=>{
    let len;
   
    if(round===0){
       
        len=allSongs.length
       
        let optionOne;
        let optionTwo;
        if(len===2){
            optionOne = 0
            optionTwo = 1
        }else{
            optionOne = Math.floor(Math.random() * len)
            optionTwo = Math.floor(Math.random() * len)
        while (optionOne === optionTwo ){
            optionTwo = Math.floor(Math.random() * len)
        }
        }
        
        firstDiv.innerHTML = videos[videosArray.indexOf(allSongs[optionOne].html)].textContent
        secondDiv.innerHTML = videos[videosArray.indexOf(allSongs[optionTwo].html)].textContent
        fightingSongs.push(allSongs[optionOne])
        fightingSongs.push(allSongs[optionTwo])
        allSongs.splice(optionOne,1)
        if (optionOne > optionTwo){
            allSongs.splice(optionTwo,1)
        }
        else{
            allSongs.splice(optionTwo-1,1)
        }
    }
    else if(round > 0){
        if(round % 2 === 0){
        
        NumberOfSongs = currentSongsSecond.length
        
        len = currentSongsSecond.length
        if(len===2){
            optionOne = 0
            optionTwo = 1
        }else{
            optionOne = Math.floor(Math.random() * len)
            optionTwo = Math.floor(Math.random() * len)
        while (optionOne === optionTwo ){
            optionTwo = Math.floor(Math.random() * len)
        }
        }
        firstDiv.innerHTML = videos[videosArray.indexOf(currentSongsSecond[optionOne].html)].textContent
        secondDiv.innerHTML = videos[videosArray.indexOf(currentSongsSecond[optionTwo].html)].textContent
        fightingSongs.push(currentSongsSecond[optionOne])
        fightingSongs.push(currentSongsSecond[optionTwo])
        if(currentSongsSecond.length!==2){
            currentSongsSecond.splice(optionOne,1)
        if (optionOne > optionTwo){
            currentSongsSecond.splice(optionTwo,1)
        }
        else{
            currentSongsSecond.splice(optionTwo-1,1)
        }  
        }
        if(NumberOfSongs===2){
          
           currentSongsSecond.length= 0
        }
        }
        
        else{
        NumberOfSongs = currentSongs.length
        len = currentSongs.length
        let optionOne;
        let optionTwo;
        if(len===2){
            optionOne = 0
            optionTwo = 1
        }else{
            optionOne = Math.floor(Math.random() * len)
            optionTwo = Math.floor(Math.random() * len)
            if(len >= 2){
               while (optionOne === optionTwo ){
               
           optionTwo = Math.floor(Math.random() * len)
       }
            }
       
        }
     
        firstDiv.innerHTML = videos[videosArray.indexOf(currentSongs[optionOne].html)].textContent
        secondDiv.innerHTML = videos[videosArray.indexOf(currentSongs[optionTwo].html)].textContent
        fightingSongs.push(currentSongs[optionOne])
        fightingSongs.push(currentSongs[optionTwo])
        currentSongs.splice(optionOne,1)
        if (optionOne > optionTwo){
            currentSongs.splice(optionTwo,1)
        }
        else{
            currentSongs.splice(optionTwo-1,1)
        }
        if (NumberOfSongs===2){
        
           currentSongs.length = 0
        }
        }
        
       
        
    }
    
    
    
    
}
const show_winner=(winner, second)=>{
    firstOption.innerHTML=""
    secondOption.innerHTML=""
    firstButton.classList.add('hidden')
    secondButton.classList.add('hidden')
    

   
    const form = document.createElement('form')
    form.method="POST"
    form.action="give_points"
  
    form.innerHTML= `
    {% csrf_token %}
    <input name="winner_game" id="winner_game" value='${winner}'>
    <input name="second_game" id="second_game" value='${second}'>
    <input type="submit" value="CONFIRM"></input> `
  
    const main = document.querySelector('main')
    main.appendChild(form)
}
const get_choice=(e)=>{

   NumberOfSongs-=2
    numberOfRounds-=1
   
    
    
    const result = e.target.textContent
    if(result === 'Option 1'){
       
        if(round ===0 || round%2===0){
      
            currentSongs.push(fightingSongs[0])
        }else{
          

            currentSongsSecond.push(fightingSongs[0])
        }
        
    }
    else{
 
        if(round ===0 || round%2===0){
           

            currentSongs.push(fightingSongs[1])
        }else{
           

            currentSongsSecond.push(fightingSongs[1])
        }
    }
    if(numberOfRounds===1){
       
        
       if(round%2===0){
           let result;
           if(e.target.textContent==='Option 1'){
               result = firstDiv.innerHTML
            }else{
               result = secondDiv.innerHTML
           }
           
           if(result.toString() === fightingSongs[0].html){
                   return show_winner(fightingSongs[0].title, fightingSongs[1].title) 
               }else if(result.toString() === fightingSongs[1].html){
                   return show_winner(fightingSongs[1].title, fightingSongs[0].title) 
               }
           
       }
       else{
      
          
           let result;
           if(e.target.textContent==='Option 1'){
               result = firstDiv.innerHTML
            }else{
               result = secondDiv.innerHTML
           }
           if(result.toString() === fightingSongs[0].html){
                   return show_winner(fightingSongs[0].title, fightingSongs[1].title)
               }else if(result.toString() === fightingSongs[1].html){
                   return show_winner(fightingSongs[1].title, fightingSongs[0].title)
               } 

       }
       
   }
    if(NumberOfSongs===0){
        round= round + 1
    }
    fightingSongs.length = 0
    
    fight()
    
}

firstButton.addEventListener("click",get_choice)
secondButton.addEventListener("click",get_choice)
start_game()





