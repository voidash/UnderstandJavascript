

/*
objects can be defined in two ways
var a = new Object(0;
    or use curly braces to initiate a object
    
*/
function greet(person){
    person = person || {lastname:'thakuri'};
    console.log("hello " + person.lastname);

}
var tony= {
    firstname : 'Tony',
    lastname : 'Stark' 
}
greet(tony);





//pass by value for primitive types and pass by reference for objects

//pass by reference for object holds true

var c={greeting:'hello'};  //same as new Object();
var d;
d=c;
c.greeting='Namaste';  //mutate greeting
console.log(c); //Namaste
console.log(d); //Namaste

changeGreeting(c); //this is possible because functions are objects that run only on execution phase.  
//two process of javascript compilation process. first declare and define then run.  
//as changeGreeting is initiated. its important properties(attributes) such as CODE and name are filled.
//next step is execution phase 
function changeGreeting(obj){
    obj.greeting='Guten Morgen';
}

console.log(c); //Guten Morgen
console.log(d); //Guten Morgen


c = {greeting:'Ni Hau'};  //this will point to different memory location. First its previous linkages are broken then new linkages are added
console.log(c); //Ni Hau
console.log(d); //Guten Morgen



//Reason to hate Javascript
//object functions and this

function a(){
    console.log(this);  //ok should point at window object
}

 //create an object with anonymous function
var c = {name:'Ashish',
        log: function(){
            this.name = 'Updated Ashish';
            console.log(this); // should point to variable C object and this is fine  
            var d = function(newname){
                this.name = newname;
            }
            d('Updated again Ashish');
            //now next uncommented line is really a mess. By logic : "since 'this' keyword is link to its outer execution context. 
            //Changes due to d() function should reflect the name attribute mutation relating to c object 
            //but no javascript sucks so this will actually add the new Name attribute in global execution context.

            //How to understand this?
            //it can support linking upto two calls only. //3rd call will actually reset to the global execution context
            console.log(this);  
        }}; 

        c.log(); //btw


        
        //how to mitigiate this problem?
        //add another self variable that points to C object
        var c = {name:'Ashish',
        log: function(){
            var self = this; //crucial line. this will always point to C
            self.name = 'Updated Ashish';
            console.log(this);   
            var d = function(newname){
                self.name = newname;  //self. is related to c not global object
            }
            d('Updated again Ashish');
            console.log(this);  
        }}; 

        c.log(); //btw  

        


//arrays in javascript
//collection of objects. Unlike other programming languages which only allows one type ,Arrays can hold any objects in javascript
var defArr = new Array(); //defination of array
var arr = [1,2,3];
defArr[0] =11;
console.log(defArr[0]);


//objects holding capacity

var objArr = [
    1,
    false,
    {name:'Ashish'},
    function myfunc(){console.log('this has to be a joke');}
];

//javscript can sometimes be poa
//because it preassumes certain things such as semicolons
//one prime example

function funky(){
    return
    {
        name:'Ashish'
        
    }
}
 
console.log("javascript self assuming the semicolon statement "+funky());   //javascript puts return;



//IIFE --> Immediately invoked Function expression

(2+3); //valid javascript statement
//everything inside () these brackets are read as expressions by javascript
/* function(){
    return 'This is error field. Javscript won't accept this because it takes this function defination as function statement and expects a identifier. ';
}   
*/

//To trick the javascript engine
(function(/*parameters*/){}(/*arguments*/ ));


//immediately invoked function expression example
var Surname = 'Thakuri';

(function(global){
    

    var marry = function(n,surnameNew){
        global.Surname=surnameNew;   //will change global execution context variable
        return 'Congrats '+ n +' '+surnameNew;
        
    }
    global.Marry = marry;  //way to be embarrased when revising code
}(window)); //Remember the call 

//yes yes. 
console.log(Marry('Arya','Thapa'));




//now about closures
//what about them
//closures literally mean closing the data , In python it means binding the data without passing anything .. same here

function greet(whatToSay){
    return function(name){
        console.log(whatToSay+' '+name);
    }
}

greet('Hi')('Jhamak');

//same thing but different way

var sayHi = greet('Namaste');
sayHi('samikshya');



//closures another example

function buildFunctions(){
    arr=[]; //remember array is collection of objects which means this can hold functions too.
    for(var i =0;i<3;i++){
        
        arr.push(
            function(){console.log('closure example (variable i) iteration process.The value of i is '+i);}
        );

    }
    return arr;
}

var func=buildFunctions();
func[0]();
func[1]();
func[2]();

/*
Output

closure example (variable i) iteration process.The value of i is 3
app.js:192 closure example (variable i) iteration process.The value of i is 3
app.js:192 closure example (variable i) iteration process.The value of i is 3

why is that?
Its simple. 
Contrary to other programming langauge logic. 
javascript stores code as its property. It only looks and process what is inside when it is invoked.
the function is being called after i is set to 3 outside of its execution context. Memory stack is storing i as 3 even though the context is already processed and removed.

*/



//how to mitigiate this problem?
//for ES6 javascript
//one of the method is using let variable

function buildFunctionsReloaded(){
    var arr=[];
    for(var i=0;i<3;i++){
        let j=i;   //this will create new memory space everytime it is called.
        arr.push(
            function (){console.log('This is reloaded buildFunctions with let keyword where the value of i is '+j);}
        );
        /*
        using IIFE functionality
        arr.push(
            function(j){
                return function(){
                    console.log('using Immediately invoked function expression capabilities '+j);
                }

                Defination area:






            }(i);
        )
        */
    }
    return arr;
}

var callFunc = buildFunctionsReloaded();
callFunc[0]();
callFunc[1]();
callFunc[2]();



// Function factories

function greetLang(language){
    language = language || 'en';
    return function(firstname,lastname){
        if(language == 'en'){
            console.log("hello "+ firstname + " "+ lastname);
        }else if(language == 'np'){
            console.log("नमस्ते "+ firstname + " "+ lastname);
        }
    }
}

var startGreet = greetLang('np');
startGreet('ashish','thapa');



//callback functions 