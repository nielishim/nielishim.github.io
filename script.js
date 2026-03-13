
const term=document.getElementById("terminal")
const cmd=document.getElementById("cmd")

function print(t){
term.innerHTML+=t+"<br>"
term.scrollTop=term.scrollHeight
}

cmd.addEventListener("keypress",function(e){
if(e.key==="Enter"){
let c=cmd.value
print("> "+c)
run(c)
cmd.value=""
}
})

function run(c){
switch(c){
case "whoami": print("Akpomeda Daniel Otuko - Cybersecurity Analyst"); break
case "help": print("commands: whoami tools blog clear"); break
case "tools": print("3000 cybersecurity tools indexed"); break
case "blog": print("Cybersecurity research blog loaded"); break
case "clear": term.innerHTML=""; break
default: print("command not found")
}
}

/* ATTACK MAP */
const map=L.map('map').setView([20,0],2)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

setInterval(()=>{
let lat=(Math.random()*140)-70
let lon=(Math.random()*360)-180
L.circle([lat,lon],{radius:300000,color:"#00ff9c"}).addTo(map)
},1500)

/* 3D VISUALIZATION */
const scene=new THREE.Scene()
const camera=new THREE.PerspectiveCamera(75,400/340,0.1,1000)
const renderer=new THREE.WebGLRenderer()
renderer.setSize(400,340)
document.getElementById("three").appendChild(renderer.domElement)

const geometry=new THREE.TorusKnotGeometry()
const material=new THREE.MeshBasicMaterial({wireframe:true})
const mesh=new THREE.Mesh(geometry,material)
scene.add(mesh)
camera.position.z=4

function animate(){
requestAnimationFrame(animate)
mesh.rotation.x+=0.01
mesh.rotation.y+=0.01
renderer.render(scene,camera)
}
animate()

/* SIEM LOGS */
fetch("logs.json").then(r=>r.json()).then(data=>{
const container=document.getElementById("logs")
data.forEach(l=>{
let div=document.createElement("div")
div.className="log"
div.innerText=l.time+" - "+l.event
container.appendChild(div)
})
})

/* TOOLS */
fetch("tools.json").then(r=>r.json()).then(data=>{

const list=document.getElementById("toolList")
const search=document.getElementById("search")

function show(filter=""){
list.innerHTML=""
data.filter(t=>t.name.toLowerCase().includes(filter)).slice(0,400).forEach(t=>{
let div=document.createElement("div")
div.className="tool"
div.innerText=t.name+" | "+t.category
list.appendChild(div)
})
}

show()
search.addEventListener("input",e=>show(e.target.value.toLowerCase()))
})

/* BLOG */
fetch("blog.json").then(r=>r.json()).then(data=>{
let html=""
data.forEach(p=>{
html+=`<h3>${p.title}</h3><p>${p.content}</p>`
})
document.getElementById("posts").innerHTML=html
})

/* AI ASSISTANT */
const chat=document.getElementById("chat")
const aiInput=document.getElementById("aiInput")

function ai(msg){
msg=msg.toLowerCase()
if(msg.includes("nmap")) return "Nmap discovers hosts and services on a network."
if(msg.includes("sql")) return "SQL injection manipulates database queries."
if(msg.includes("linux")) return "Linux is the backbone of most cybersecurity environments."
if(msg.includes("malware")) return "Malware analysis investigates malicious software behavior."
return "Focus on Linux, networking, and security fundamentals."
}

aiInput.addEventListener("keypress",function(e){
if(e.key==="Enter"){
let q=aiInput.value
chat.innerHTML+="<div>> "+q+"</div>"
chat.innerHTML+="<div>"+ai(q)+"</div>"
aiInput.value=""
}
})
