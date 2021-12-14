
/*
objects can be defined in two ways
var a = new Object(0);
    or use curly braces to initiate a object
    
*/
function greet(person){
    person = person || {lastname:'surname'};
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


//Deep copy and shallow copy in javascript
//as objects are pass by reference . one way to copy a reference completely is

JSON.parse(JSON.stringify(object));
//for shallow copy. use the spread operator
obj1 = {...object}

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
var c = {name:'Ram',
        log: function(){
            this.name = 'Updated Ram';
            console.log(this); // should point to variable C object and this is fine  
            var d = function(newname){
                this.name = newname;
            }
            d('Updated again Ram');
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
        var c = {name:'Ram',
        log: function(){
            var self = this; //crucial line. this will always point to C
            self.name = 'Updated Ram';
            console.log(this);   
            var d = function(newname){
                self.name = newname;  //self. is related to c not global object
            }
            d('Updated again Ram');
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
    {name:'Ram'},
    function myfunc(){console.log('this has to be a joke');}
];

//javscript can sometimes be poa
//because it preassumes certain things such as semicolons
//one prime example

function funky(){
    return
    {
        name:'Ram'
        
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
var Surname = 'surname';

(function(global){
    

    var marry = function(n,surnameNew){
        global.Surname=surnameNew;   //will change global execution context variable
        return 'Congrats '+ n +' '+surnameNew;
        
    }
    global.Marry = marry;  //way to be embarrased when revising code
}(window)); //Remember the call 

//yes yes. 
console.log(Marry('surname','Kuwar'));




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
startGreet('Ram','Kuwar');



//bind call and apply

var person = {
    firstname:'Ram',
    lastname:'Kuwar',
    getFullName: function(){
        return this.firstname+ ' ' +this.lastname;
    }
}

var myFunction = function(lang){
    console.log(this.getFullName()); //this means person here
    console.log("languages familiar with is "+ lang);
}

myCopyFunc = myFunction.bind(person);  //copy of myFunction is created with reference to person object. 



myCopyFunc('en');
myFunction.call(person,'en');  //call binds then invokes the function
myFunction.apply(person,['en']); //same as call function , the only difference is that array has to be passed as argument here



//function borrowing
var person2 = {
    firstname :'surname',
    lastname:'surname'
}
//if same variable names are used then, coninciding variable names will be binded and replaced with original
console.log(person.getFullName.call(person2));

//function currying
//creating a copy of function with preset parameters or changed parameters

function hotelSelection(SelectionApp,Region){
    return SelectionApp + ' is looking for '+Region; 
}

var trivagoHotelSearch =   hotelSelection.bind(this,'HOTEL TRIVAGO');


/*


equivalent of saying
function trivagoHotelSearch(Region){
    var SelectionApp = 'HOTEL TRIVAGO';
    return SelectionApp + ' is looking for '+Region;
}

*/

console.log(trivagoHotelSearch('NEPAL'));



//functional programming example
var arr = [1,2,3]
function mapForEach(arr,fn){
    newArr = [];
    for(var i=0;i<arr.length;i++){
        newArr.push(fn(arr[i]))

    }
    return newArr;
}
var isGreaterThan2 = mapForEach(arr,function(val){return val>2;});
console.log(isGreaterThan2);


//function that takes two parameters
var checkForLimit = function(limiter,item){
    return limiter<item;
}

//with bind method you can set default parameter.
var isItgreaterthan10 = mapForEach(arr,checkForLimit.bind(this,10));
console.log(isItgreaterthan10);

//simplified checkForLimit that only needs one value
var checkPastLimitSimplified = function(limiter){
    return function(limiter,value){
        return limiter<value;
    }.bind(this,limiter);

};

console.log(mapForEach(arr,checkPastLimitSimplified(1)));

//protoypical inheritance
var person ={
    firstName:'Default',
    lastName:'Default',
    getFullName:function(){return this.firstName + ' '+ this.lastName}
}

var Ram = {
    firstName:'Ram',
    lastName:'Kuwar'
}
console.log(person.getFullName.call(Ram));
//performance issues in real life

Ram.__proto__ = person;

console.log(Ram.getFullName());

for(var attributes in Ram){
    if(Ram.hasOwnProperty(attributes)){
        console.log(attributes+ ' : '+Ram[attributes]);
    }
}


function blister(a,b,c){
    console.log(arguments.length);
    return function(obj){
        console.log('hey '+obj);
    }
}
var keyring= blister(1,2,3);
keyring(12);


//creating custom extend function


var obj1={a:'1as',b:'2bs'};
var obj2={c:'3cs',d:'4ds'};
var extend = createAssigner(function(obj){
    keys =[]
    for(var key in obj){   //iterates and stores keys in buffer and not object 
        keys.push(key);
    }
    return keys;
}) //all i need is to pass this whole code as parameter


function createAssigner(keysData){  //keysData is a code that is being passed through
    return function(obj){
        //when extend is called
        
        if(arguments.length < 2) return [];
        for(var i=0;i<arguments.length;i++){
            source = arguments[i];
            //console.log(source);
            keys=keysData(arguments[i]);
            length = keys.length;
            for(var j=0;j<length;j++){
                key = keys[j];
                obj[key]=source[key];
            }
        }
        return obj;
    };

}console.log(extend(obj1,obj2));




