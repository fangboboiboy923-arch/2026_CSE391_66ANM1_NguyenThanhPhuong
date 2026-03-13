const nameInput=document.getElementById("nameField")
const scoreInput=document.getElementById("scoreField")
const addBtn=document.getElementById("addStudent")

const searchBox=document.getElementById("searchName")
const rankFilter=document.getElementById("filterRank")
const sortBtn=document.getElementById("sortScore")

const listBody=document.getElementById("studentList")
const summary=document.getElementById("summaryBox")

let data=[]
let view=[]
let sortType=null

function getRank(score){

if(score>=8.5) return "Giỏi"
if(score>=7) return "Khá"
if(score>=5) return "Trung bình"
return "Yếu"

}

function updateSummary(arr){

const total=arr.length
let avg=0

if(total>0){

const sum=arr.reduce((s,v)=>s+v.score,0)
avg=sum/total

}

summary.textContent=`Tổng số sinh viên: ${total} | Điểm trung bình: ${avg.toFixed(2)}`

}

function draw(){

listBody.innerHTML=""

if(view.length===0){

listBody.innerHTML=`<tr><td colspan="5" class="empty">Không có kết quả</td></tr>`
updateSummary(view)
return

}

view.forEach((sv,i)=>{

const row=document.createElement("tr")

if(sv.score<5){
row.classList.add("warning")
}

row.innerHTML=`
<td>${i+1}</td>
<td>${sv.name}</td>
<td>${sv.score.toFixed(1)}</td>
<td>${getRank(sv.score)}</td>
<td><button class="remove-btn" data-id="${sv.id}">Xóa</button></td>
`

listBody.appendChild(row)

})

updateSummary(view)

}

function filterData(){

const keyword=searchBox.value.toLowerCase().trim()
const rank=rankFilter.value

view=data.filter(sv=>{

const matchName=sv.name.toLowerCase().includes(keyword)
const matchRank=(rank==="all")||(getRank(sv.score)===rank)

return matchName&&matchRank

})

if(sortType==="asc") view.sort((a,b)=>a.score-b.score)
if(sortType==="desc") view.sort((a,b)=>b.score-a.score)

if(sortType==="asc") sortBtn.textContent="Điểm ▲"
else if(sortType==="desc") sortBtn.textContent="Điểm ▼"
else sortBtn.textContent="Điểm"

draw()

}

function addStudent(){

const name=nameInput.value.trim()
const score=parseFloat(scoreInput.value)

if(name===""){
alert("Họ tên không được để trống!")
nameInput.focus()
return
}

if(isNaN(score)||score<0||score>10){
alert("Điểm phải từ 0 đến 10!")
scoreInput.focus()
return
}

data.push({
id:Date.now(),
name:name,
score:score
})

filterData()

nameInput.value=""
scoreInput.value=""
nameInput.focus()

}

addBtn.onclick=addStudent

scoreInput.addEventListener("keydown",e=>{
if(e.key==="Enter") addStudent()
})

searchBox.addEventListener("input",filterData)

rankFilter.addEventListener("change",filterData)

sortBtn.addEventListener("click",()=>{

if(sortType===null) sortType="asc"
else if(sortType==="asc") sortType="desc"
else sortType="asc"

filterData()

})

listBody.addEventListener("click",e=>{

if(e.target.classList.contains("remove-btn")){

const id=Number(e.target.dataset.id)

data=data.filter(sv=>sv.id!==id)

filterData()

}

})

filterData()