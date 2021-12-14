# Typescript

- builds on top of javascript.
- Static types .
- needs to be converted into javascript for being executable in browser.


# Why Typescript

- Add types
- Support for older browsers
- Adds non js functionality such  interfaces and generics. (only when types are present these things shine)
- Decorators
- Configuration options

# Example 
```typescript
// in typescript
const button: HTMLButtonElement = document.querySelector("button");
const input1: HTMLInputElement = document.querySelector("#num");

function add(num1: number, num2: number) : number {
    return num1 + num2;
}

console.log(add(+input1.value , 12));
```


```Javascript
// in javascript
var button = document.querySelector("button");
var input1 = document.querySelector("#num");
function add(num1, num2) {
    return num1 + num2;
}
console.log(add(+input1.value, 12));
```

# Setting up

- install node and npm
- VScode has good support
- `npm install i -g typescript`
- `tsc file.ts`
- for setting on watch mode `tsc -w`

## Type Inference

- Typescript automatically inferring the types according to RHS(right hand side)

## Types
![2e4140129f0e91422a6135d7617776d4.png](:/c4583fed0f8e464181476a56f29f69d8)
- `	string, number, boolean , object , Array`
-  for array : `string[], number[]`
-  `Tuple`:  `[string, number]`
-  `enum`: `enum Role { ADMIN, TESTER }`
 
 -  `any` is the most flexible type on typescript. disables checking
 -  `unknown` is restrictive type which allows it to store any type but still will chack before being assigned to other types. example unknown has to be converted to string if it has to be stored in variable of type string.

## Function type
- First class functions can be stored in variable.
- a variable that holds function can have its own type
```typescript
let myCustomFunction : (a:number) => string;
```

## Compiler options

- Typescript has watch mode. `tsc file.ts --watch`
	- It looks for changes and as soon as no error is found converts into js
- To start a typescript project
	- `tsc --init`
		-	Generates a `tsconfig.json`

## Inside tsconfig.json

- `outdir` to specify the output of JS files.
-  `noEmitOnError` if there is error on TS file javascript is not generated.
-  `removeComments` to remove comments on emitted JS file 
-   `noImplicitAny` if set to False , Any type wont throw error


## Modern JS and TS

 ```typescript

type TwoVarFunction = (a:number,b:number) => number;

const username : string= 'Ash';
let age: number = 30;

if (age < 20) {
    //this variable is present only on this scope 
    let something = 12;
}


const add = (a: number, b: number=3) => a+b;

// Spread operator
const hobbies = ['sports','cooking'];
const activeHobbies = ['Hiking'];
activeHobbies.push(...hobbies);


const person = {
    name: 'Ash',
    age: 20
}
//deep copying using spread operator
const copiedPerson = {...person}

console.log(add(2,3));
console.log(add(4));
console.log(copiedPerson);

// using varargs or Rest Parameters
const addXNumbers = (...numbers: number[]) => {
    let result = 0;
    numbers.forEach((x: number)=> {
         result+=x;
    });
    return result;
}

console.log(addXNumbers(2,3,4,5));
```

## Classes And Interfaces
```typescript
class Department {
    public name: string;
    private employees: string[] = [];
    private readonly id = 12;

    constructor(n: string) {
        this.name = n;
    }
    //typescript feature, to let us know: `this` really means Department
    getName(this: Department){
        return this.name;
    }
    addEmployee(this: Department, employee: string){
        this.employees.push(employee);
    }

}

let depart = new Department("Computer Science");
console.log(depart);

// const departCopy = {name: 'haha',describe: depart.getName};
// console.log(departCopy.describe());

// it would result in error because on defintion it specifically asks for this that is related to Department 
// if we remove that
// output : haha because `this` looks for outer context

const departCopy = {name: 'haha',describe: depart.getName.bind(depart)};
console.log(departCopy.describe());
// output : Computer science
```

- to make a method or member variable static add `static` keyword on front
- to create a abstract method that all the child classes has to implment add `absract` keyword on the front

### Interfaces
- Interfaces : similar to trait on rust, and Interface on java 
```typescript
interface Person {
    name: string; 
    age: number;

    greet(phrase: string): void;
}

let user1: Person;

user1 = {
    name: 'Max',
    age:12,
    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
};


class Remy implements Person {
    constructor(public name: string, public age: number){

    }
    greet(phrase: string) {
        console.log("phrase = " + phrase);
    }
    
}
```

## Advanced Types
### Intersection types
- Intersection types are useful when we want to create new type out of already existing types
```typescript
// Intersection Types
type Admin = {
    name: string; 
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};


type ElevatedEmployee = Admin & Employee;

let Ashish : ElevatedEmployee = {
	name: "Ashish",
	privileges: ['management','admin panel'],
	startDate: new Date().today()
}
```
 
### Type Guards

Type guards show up when there are union types show up. 
- for primitive literals i.e `string, number, boolean`
```typescript
//use typeof
type Combinable = string | number;
function add(a: Combinable, b: Combinable) {
	// type guard
    if (typeof a==='string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
}
```
- for  `Objects`
```typescript
//use in
type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(emp: UnknownEmployee) {
	// type guard
    if ('privileges' in emp)
        console.log('Privileges'+ emp.privileges);
}
```
- for `Classes and structs`
```typescript
//use instanceof
class Truck {
    drive(){
        console.log('Driving');
    }
    loadCargo(amount: number){
        console.log('Loading cargo ...' + amount);
     }
}
class Car {
    drive(){
        console.log('Driving');
    }
}

type Vehicle = Car | Truck ;
const v1 = new Car();
const v2 = new Truck();

// use instanceof 

function useVehicle(vehicle: Vehicle) {
 vehicle.drive();
	// type guarding
 if(vehicle instanceof Truck) {
     vehicle.loadCargo(12);
 }
}

	
```

### Discriminated Unions
- for interfaces we can't just use type guards but if all the interfaces have one or more same property then typescript doesn't complain.
```typescript
// Discriminated Unions

interface Bird {
    type:'bird';
    flyingSpeed : number;
}

interface Horse {
    type:'horse'
    runningSpeed: number;
}

type Animal = Bird | Horse;
function moveAnimal(animal: Animal) {
    let speed: number;
    switch(animal.type){
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
}
```

### Type Casting
-  when ide doesn't know the type we can use typecasting for autocompletion purposes. 
```typescript
const userInputElement = document.querySelector("#myElement")! as HTMLInputElement;
const userInputElement2 = <HTMLInputElement> document.querySelector("#myElement");
```
### Indexing property
- scenario where we don't know the property name we can just create a interface that can have any property name 
```typescript
interface Error {
	[prop: string] : string;
}

let UsernameError : Error = {
	'username': "can't place that username"
}

```
### Function Overloads
- Function defined with union types will have its return type also as a union type
- If we want exact type then use function overloading

### Optional Chaining
- similar Dart like feature
- If you don't know if the object has property or not use `?.`

```typescript
if (jobs?.hasBenifits()) {
	// TODO
}
```

### Nullish coalesing
- check if the variable stores null value or not with  `??` operator. similar to dart
```typescript
let flameThrower = gameContainsFlameThrower ?? 'Far cry like flamethrower';
```
- if `gameContainsFlameThrower` is null or undefined then it will set the right operand.

# Generics

- Similar feature as on java, dart  and rust. 
- Generics allow defining custom types but for typescript generics is all about code completion
```typescript
const promise :Promise<string> = new Promise((resolve, reject)=> {
    setTimeout(() => {
        resolve('This is done');
    },2000);
});


promise.then(data => {
    data.split(" ");
});
```

- well i don't see a reason to constrain the type if you at first wanted to use generics in the first place
- Useful places: if you want like all the classes that extends from object
```typescript
//wtf moment
function merge<T extends object, U extends object>(objA: T , objB: U) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({name:'Ash'}, { age: 20, hobbies: ['Sports'] })
console.log(mergedObj);

console.log(mergedObj.hobbies);
```

### Generic Classes
```typescript
class DataStorage<T> {
    private data: T[] = [];
    
    addItem(item: T) {
        this.data.push(item);
    }
    removeItem(item: T){
        this.data.splice(this.data.indexOf(item),1);
    }
    getItems() {
        return [...this.data];
    }

}

const textStorage = new DataStorage<string>();
textStorage.addItem("ashish");
textStorage.addItem("thapa");
```
### Useful Generics type
- Partial 
```typescript

// without partial 

function createCourseGoal(title:string, description: string, date: Date) : CourseGoal {
//     we have to fulfill all the properties otherwise interface won't be implemented properly 
//     let courseGoal: CourseGoal = {};
 
	// to avoid that use
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    //convert to coursegoal from partial courseGoal type
    return courseGoal as CourseGoal;
}
```

# Decorators

-  Decorators are similar like in python
	- but you can't add decorator to function
	- There are four types :
		- to classes
		- to methods (classes member function) 
		- accessor (getter setters)
		- property (class members)
		
```typescript
function addLogMethod(){
    console.log("logging");
    return function(target: any, propertyKey:string, descriptor: PropertyDescriptor) {
        let dataOutput = target;
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor.value());
        // return `${text} - ${dataOutput}`;
    };
}


function classDecorator(){
    console.log("this should be shown first");
    return function(constructor: Function){
        console.log(constructor);
    };
}


function accessorDecorator(){
    console.log("accessor logger");
    return function(target:any, propertyKey:string, descriptor: PropertyDescriptor) {
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
    }
}


@classDecorator()
class FilSystem {
    @PropertyDecorator()
    data: string = "test";

    private _x: number = 12;
    @accessorDecorator()
    get x() {
        return this._x;
    }
// @addLogMethod()
testError(): string{
    return "File can't be opnened";
}
}

```

# Bundling
- If `app.ts`  and `filename.ts` are part of same namespace 
- `app.ts`
```typescript
/// <reference path="filename.ts">
namespace app {
	
}
```
- `filename.ts` 
```typescript
namespace app {
	export interface Dash {
		name: String;	
	}
}
```

## Bundling and seperating with ES6 modules

- Export the required functions
- `import {Function} from 'myfile.js'` 
	- don't use .ts , use .js
-  `import *as myAwesomeFile from 'myFile.js'`
	-  if you use such syntax then you have to use dot(.) operator to exactly point what you want to use. example `myAwesomeFile.functionInside()`
-  `export default someFunction () {}`
	-  while importing we don't need to bind the name inside curly braces
	-  `import test from 'myFile.js'`

## Webpack

-  webpack is a bundler program built with node-js. 
	-  used for bundling many js files into a single file 
	-  highly configurable
	-  can be used with typescript 
- To use it with typescript
```
$ npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
```
- configuration file
```javascript
const path = require('path');

// exporting in nodejs environment
module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist') 
    },
    devtool: 'inline-source-map',
    module:{
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts','.js']
    }
}
```