

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
var c = {name:'Ashish'
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
        var c = {name:'Ashish'
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

        


