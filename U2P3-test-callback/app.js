const btn = document.getElementById('btn');
const title = document.getElementById('title');
const input = document.getElementById('textinput');
const containter = document.getElementById('container');
window.addEventListener("load", () => [
    //alert("La ventana termino de cargar")
]);
/*console.log(btn);
Forma 1
function clickEvent() {
    console.log("Me dieron click") 
}

btn.addEventListener('click', clickEvent)
*/

//Forma 2
btn.addEventListener('click', function() {
    //document.getElementById('titulo').innerText = "cambio el titulo"
    //title.innerText = "Cambio el titulo"
    const innerValue = input.value;
    containter.innerHTML = input.value;
});

btn.addEventListener('dblclick', () => [
    fetch('/info.json')
    .then((respuesta) => {
        return respuesta.text();
    })
    .then(() => {
        
    })
])