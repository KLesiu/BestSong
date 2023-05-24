const li = document.querySelectorAll('li')
const titles = document.querySelectorAll('.title')
const scores = document.querySelectorAll('.score')
const ranking = document.querySelector('#ranking')

const arr = Object.values(li)
let array = []


for (let index = 0; index < arr.length; index++) {
  array.push(arr[index].children)
  
}
const generate_new_list = (arr)=>{

  ranking.innerHTML= ""
  const h2 = document.createElement('h2')
  h2.textContent= "Ranking"
  ranking.appendChild(h2)
  for (let index = 0; index < arr.length; index++) {
      
      const li = document.createElement('li')
      const score = document.createElement('span')
      const title = document.createElement('span')
      const space= document.createElement('span')
      score.classList.add('score')
      title.classList.add('title')
      space.textContent=" : "
      score.textContent=arr[arr.length-1-index][1].textContent
      title.textContent=arr[arr.length-1-index][0].textContent
      li.appendChild(title)
      li.appendChild(space)
      li.appendChild(score)
      ranking.append(li)
      
  }
}
const newList = array.sort((a,b)=>{
 return parseInt(a[1].textContent) - parseInt(b[1].textContent)
})
generate_new_list(newList)
