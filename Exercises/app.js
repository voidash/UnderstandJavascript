// task 1
//changing the text content

// dont use childNodes because it produces objects with more properties that are not required.
// look at that 5 for example 
var texts = document.querySelector('#table').childNodes[1].childNodes[5];
texts.textContent='beautiful';

//changing the content in reverse order. select ideas of 2nd row and get its parent element change its 2nd child nodes
var another_text = document.querySelector('.consultancy').parentElement.children[1];
another_text.textContent='1';

//Immediately invoked function expressions to capture submit event

(function (){
    var event = document.querySelector('#submit');
    function showPopUp(){
        //create a new div element
        var div = document.createElement('div');
        div.className='alert';
        div.setAttribute('title','hello Nepal');
        var text = document.createTextNode('You just clicked submit button');
        div.appendChild(text);

        var container = document.getElementsByClassName('container');
        container[0].appendChild(div);

        setTimeout(()=>{document.querySelector('.alert').remove()},3000);
        
    }
    //adding event listener
    event.addEventListener('click',showPopUp);
})();

//changing background color of the page

console.log(document.body.style.backgroundColor='#f35');


//table styling
var table_colorChange = document.querySelectorAll('#table tr:nth-child(odd)');

console.log(table_colorChange);


console.log("%c this is good",'color:red');

