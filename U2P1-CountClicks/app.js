/* Recuperar un elemento
1.*/
const containerClicks = document.getElementById('containerClicks'); /*cuando se hagan valores de recuperar elementos, se hacen con const y no con let

console.log(containerClicks);
*/

/*2.*/
const btnIncrement = document.querySelector('.btn-primary'); /*va a traer el primer elemento que tenga esa caract.*/
const btnDecrement = document.querySelector('.btn-secondary'); 
const btnReset = document.querySelector('.btn-reset'); 
console.log(btnIncrement, btnDecrement, btnReset);

let conter = 0;

btnIncrement.onclick = function() {
    conter++;
    containerClicks.innerText = conter;

}

btnDecrement.onclick = function() {
    conter--;
    containerClicks.innerText = conter;
}

btnReset.onclick = function() {
    conter = 0;
    containerClicks.innerText = conter;
}