1. [Coersion Free Code Camp](https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839)


important takeway from the blog:

    123 + ''  //converted to string
    +'123'   //converted to integer
	
The associativity of + operator is left to right.for 1st case  (Binary) + invokes string conversion if any of its operand is string
2nd case : +'123' is unary so it invokes integer conversion

			'ba' + + 'anything' +'na' //'baNaNa'
			
(+A) Unary has higher precedence so first `+'anything'` is converted to NaN, due to unary operator coersion to integer.
In the hand of Binary + operator(a+b)  `NaN` is converted to `String(NaN)` so it actually is `'ba'+'NaN' +'na'`

similarly most of the  comparison (< , > .... loose equals) , aithmetic ,bitwise numeric conversion is instantiated.


			Boolean(0) //false
			Boolean(null) //false
			Boolean(NaN) //false
			Boolean(undefined) //false
			Boolean(-0) //false
			Boolean('') //False
			
			Boolean([]) //true
			Boolen(Symbol()) //true

Remember this statement `var greet = greet || {greetings:'Namaste'}`. This is ultimate example of coersion working. BTW this statement does not assign boolean value to greet variable. If greet is empty, undefined ,null or 0; then the statement will be `false||true` after coersion. greet is assigned to object which returned true rather than being assigned true.This is primary catch. 

Similarly if `true || true` condition is encountered then associativity of || operator is checked. Since it is left to right, 
`true || false` returns true.
			
    
converts into number

2. [A re introduction to javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

3. [Execution context in javascript](https://medium.com/@happymishra66/execution-context-in-javascript-319dd72e8e2c)

