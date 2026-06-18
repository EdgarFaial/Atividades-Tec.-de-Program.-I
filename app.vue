<script setup>
import { ref } from 'vue'

let listId = 1
let taskId = 1

const newListTitle = ref('')

const lists = ref([
{
id: listId++,
title: 'Minha primeira lista',
newTask: '',
hideCompleted: false,

tasks: [
{
id: taskId++,
text: 'Aprender Vue',
done: false
}
]
}
])

function createList() {

if (!newListTitle.value.trim())
return

lists.value.push({
id: listId++,
title: newListTitle.value,
newTask: '',
hideCompleted: false,
tasks: []
})

newListTitle.value = ''

}

function removeList(id) {

lists.value =
lists.value.filter(
list => list.id !== id
)

}

function addTask(list) {

if (!list.newTask.trim())
return

list.tasks.push({

id: taskId++,

text: list.newTask,

done: false

})

list.newTask = ''

}

function removeTask(list, id) {

list.tasks =
list.tasks.filter(
task => task.id !== id
)

}

function visibleTasks(list) {

return list.hideCompleted

? list.tasks.filter(
task => !task.done
)

: list.tasks

}

function progress(list) {

if (
list.tasks.length === 0
)
return 0

return Math.round(

list.tasks.filter(
task => task.done
).length

/

list.tasks.length

* 100

)

}
</script>

<template>

<div class="app">

<h1 class="title">
📝 Multi Lista de Tarefas
</h1>

<div class="create">

<input
v-model="newListTitle"
placeholder="Título da nova lista"
/>

<button
@click="createList"
>
Criar Lista
</button>

</div>

<div class="lists">

<div
class="card"

v-for="list in lists"

:key="list.id"
>

<div class="header">

<h2>
{{ list.title }}
</h2>

<button
class="remove"

@click="
removeList(
list.id
)
"
>

✕

</button>

</div>

<div class="bar">

<div

class="fill"

:style="{
width:
progress(list)
+ '%'
}"

></div>

</div>

<p>
{{ progress(list) }}%
concluído
</p>

<form
@submit.prevent="
addTask(list)
"
>

<input

v-model="list.newTask"

placeholder="Nova tarefa"

required

/>

<button>
Adicionar
</button>

</form>

<ul>

<li

v-for="
task
in
visibleTasks(list)
"

:key="task.id"

>

<input
type="checkbox"

v-model="
task.done
"
/>

<span

:class="{
done:
task.done
}"

>

{{ task.text }}

</span>

<button

@click="
removeTask(
list,
task.id
)
"

>

🗑

</button>

</li>

</ul>

<button

class="toggle"

@click="
list.hideCompleted =
!list.hideCompleted
"

>

{{
list.hideCompleted

?

'Mostrar todas'

:

'Ocultar concluídas'

}}

</button>

</div>

</div>

</div>

</template>

<style>

*{
box-sizing:border-box;
font-family:Arial;
}

body{
margin:0;
background:#0f172a;
}

.app{
padding:30px;
}

.title{
text-align:center;
color:#60a5fa;
margin-bottom:30px;
}

.create{

display:flex;

justify-content:center;

gap:10px;

margin-bottom:30px;

}

input{

padding:10px;

border:none;

border-radius:10px;

}

button{

padding:10px 14px;

border:none;

border-radius:10px;

cursor:pointer;

transition:.2s;

}

button:hover{

transform:
translateY(-2px);

}

.lists{

display:grid;

grid-template-columns:

repeat(
auto-fit,
minmax(
320px,
1fr
)
);

gap:20px;

}

.card{

background:white;

padding:20px;

border-radius:20px;

box-shadow:

0 10px 25px
rgba(
0,
0,
0,
0.2
);

}

.header{

display:flex;

justify-content:
space-between;

align-items:center;

}

.remove{

background:#ef4444;

color:white;

}

.bar{

height:10px;

background:#ddd;

border-radius:20px;

overflow:hidden;

margin:12px 0;

}

.fill{

height:100%;

background:

linear-gradient(
90deg,
#60a5fa,
#22c55e
);

transition:.3s;

}

ul{

padding:0;

}

li{

display:flex;

gap:10px;

align-items:center;

margin:12px 0;

list-style:none;

}

.done{

text-decoration:
line-through;

opacity:.5;

}

.toggle{

width:100%;

margin-top:12px;

}

</style>
