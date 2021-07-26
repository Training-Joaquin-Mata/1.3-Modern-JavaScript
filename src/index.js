 import '../assets/css/style.css';


function variableDeclarationVSInitializacion(){
/////////////////////////////////////////////////
//// Variable Declaration vs Initialization ////
///////////////////////////////////////////////
// A variable declaration introduces a new identifier.

// var declaration
// Above we create a new identifier called declaration. In JavaScript, variables are initialized with the value of undefined when they are created. What that means is if we try to log the declaration variable, we’ll get undefined.

// var declaration

// console.log(declaration) // undefined
// So if we log the declaration variable, we get undefined.

// In contrast to variable declaration, variable initialization is when you first assign a value to a variable.

// var declaration

// console.log(declaration) // undefined

// declaration = 'This is an initialization'
// So here we’re initializing the declaration variable by assigning it to a string.

// This leads us to our second concept, Scope.

// Scope
// Scope defines where variables and functions are accessible inside of your program. In JavaScript, there are two kinds of scope - global scope, and function scope. According to the official spec,

// “If the variable statement occurs inside a FunctionDeclaration, the variables are defined with function-local scope in that function.”.

// What that means is if you create a variable with var, that variable is “scoped” to the function it was created in and is only accessible inside of that function or, any nested functions.

// function getDate () {
//   var date = new Date()

//   return date
// }

// getDate()
// console.log(date) // ❌ Reference Error
// Above we try to access a variable outside of the function it was declared. Because date is “scoped” to the getData function, it’s only accessible inside of getDate itself or any nested functions inside of getDate (as seen below).

// function getDate () {
//   var date = new Date()

//   function formatDate () {
//     return date.toDateString().slice(4) // ✅
//   }

//   return formatDate()
// }

// getDate()
// console.log(date) // ❌ Reference Error
// Now let’s look at a more advanced example. Say we had an array of prices and we needed a function that took in that array as well as a discount and returned us a new array of discounted prices. The end goal might look something like this.

// discountPrices([100, 200, 300], .5) // [50, 100, 150]
// And the implementation might look something like this

// function discountPrices (prices, discount) {
//   var discounted = []

//   for (var i = 0; i < prices.length; i++) {
//     var discountedPrice = prices[i] * (1 - discount)
//     var finalPrice = Math.round(discountedPrice * 100) / 100
//     discounted.push(finalPrice)
//   }

//   return discounted
// }
// Seems simple enough but what does this have to do with block scope? Take a look at that for loop. Are the variables declared inside of it accessible outside of it? Turns out, they are.

// function discountPrices (prices, discount) {
//   var discounted = []

//   for (var i = 0; i < prices.length; i++) {
//     var discountedPrice = prices[i] * (1 - discount)
//     var finalPrice = Math.round(discountedPrice * 100) / 100
//     discounted.push(finalPrice)
//   }

//   console.log(i) // 3
//   console.log(discountedPrice) // 150
//   console.log(finalPrice) // 150

//   return discounted
// }
// If JavaScript is the only programming language you know, you may not think anything of this. However, if you’re coming to JavaScript from another programming language, specifically a programming language that is blocked scope, you’re probably a little bit concerned about what’s going on here. It’s not really broken, it’s just kind of weird. There’s not really a reason to still have access to i, discountedPrice, and finalPrice outside of the for loop. It doesn’t really do us any good and it may even cause us harm in some cases. However, since variables declared with var are function scoped, you do.

// Now that we’ve discussed variable declarations, initializations, and scope, the last thing we need to flush out before we dive into let and const is hoisting.

// Hoisting
// Remember earlier we said that “In JavaScript, variables are initialized with the value of undefined when they are created.”. Turns out, that’s all that “Hoisting” is. The JavaScript interpreter will assign variable declarations a default value of undefined during what’s called the “Creation” phase.

// For a much more in depth guide on the Creation Phase, Hoisting, and Scopes see “The Ultimate Guide to Hoisting, Scopes, and Closures in JavaScript”

// Let’s take a look at the previous example and see how hoisting affects it.

// function discountPrices (prices, discount) {
//   var discounted = undefined
//   var i = undefined
//   var discountedPrice = undefined
//   var finalPrice = undefined

//   discounted = []
//   for (i = 0; i < prices.length; i++) {
//     discountedPrice = prices[i] * (1 - discount)
//     finalPrice = Math.round(discountedPrice * 100) / 100
//     discounted.push(finalPrice)
//   }

//   console.log(i) // 3
//   console.log(discountedPrice) // 150
//   console.log(finalPrice) // 150

//   return discounted
// }
// Notice all the variable declarations were assigned a default value of undefined. That’s why if you try access one of those variables before it was actually declared, you’ll just get undefined.

// function discountPrices (prices, discount) {
//   console.log(discounted) // undefined

//   var discounted = []

//   for (var i = 0; i < prices.length; i++) {
//     var discountedPrice = prices[i] * (1 - discount)
//     var finalPrice = Math.round(discountedPrice * 100) / 100
//     discounted.push(finalPrice)
//   }

//   console.log(i) // 3
//   console.log(discountedPrice) // 150
//   console.log(finalPrice) // 150

//   return discounted
// }
// Now that you know everything there is to know about var, let’s finally talk about the whole point of why you’re here, what’s the difference between var, let, and const?

// var VS let VS const
// First, let’s compare var and let. The main difference between var and let is that instead of being function scoped, let is block scoped. What that means is that a variable created with the let keyword is available inside the “block” that it was created in as well as any nested blocks. When I say “block”, I mean anything surrounded by a curly brace {} like in a for loop or an if statement.

// So let’s look back to our discountPrices function one last time.

// function discountPrices (prices, discount) {
//   var discounted = []

//   for (var i = 0; i < prices.length; i++) {
//     var discountedPrice = prices[i] * (1 - discount)
//     var finalPrice = Math.round(discountedPrice * 100) / 100
//     discounted.push(finalPrice)
//   }

//   console.log(i) // 3
//   console.log(discountedPrice) // 150
//   console.log(finalPrice) // 150

//   return discounted
// }
// Remember that we were able to log i, discountedPrice, and finalPrice outside of the for loop since they were declared with var and var is function scoped. But now, what happens if we change those var declarations to use let and try to run it?

// function discountPrices (prices, discount) {
//   let discounted = []

//   for (let i = 0; i < prices.length; i++) {
//     let discountedPrice = prices[i] * (1 - discount)
//     let finalPrice = Math.round(discountedPrice * 100) / 100
//     discounted.push(finalPrice)
//   }

//   console.log(i)
//   console.log(discountedPrice)
//   console.log(finalPrice)

//   return discounted
// }

// discountPrices([100, 200, 300], .5) // ❌ ReferenceError: i is not defined
// 🙅‍♀️ We get ReferenceError: i is not defined. What this tells us is that variables declared with let are block scoped, not function scoped. So trying to access i (or discountedPrice or finalPrice) outside of the “block” they were declared in is going to give us a reference error as we just barely saw.

// var VS let

// var: function scoped

// let: block scoped
// The next difference has to do with Hoisting. Earlier we said that the definition of hoisting was “The JavaScript interpreter will assign variable declarations a default value of undefined during what’s called the ‘Creation’ phase.” We even saw this in action by logging a variable before it was declared (you get undefined)

// function discountPrices (prices, discount) {
//   console.log(discounted) // undefined

//   var discounted = []

//   for (var i = 0; i < prices.length; i++) {
//     var discountedPrice = prices[i] * (1 - discount)
//     var finalPrice = Math.round(discountedPrice * 100) / 100
//     discounted.push(finalPrice)
//   }

//   console.log(i) // 3
//   console.log(discountedPrice) // 150
//   console.log(finalPrice) // 150

//   return discounted
// }
// I can’t think of any use case where you’d actually want to access a variable before it was declared. It seems like throwing a ReferenceError would be a better default than returning undefined. In fact, this is exactly what let does. If you try to access a variable declared with let before it’s declared, instead of getting undefined (like with those variables declared with var), you’ll get a ReferenceError.

// function discountPrices (prices, discount) {
//   console.log(discounted) // ❌ ReferenceError

//   let discounted = []

//   for (let i = 0; i < prices.length; i++) {
//     let discountedPrice = prices[i] * (1 - discount)
//     let finalPrice = Math.round(discountedPrice * 100) / 100
//     discounted.push(finalPrice)
//   }

//   console.log(i) // 3
//   console.log(discountedPrice) // 150
//   console.log(finalPrice) // 150

//   return discounted
// }
// var VS let

// var:
//   function scoped
//   undefined when accessing a variable before it's declared

// let:
//   block scoped
//   ReferenceError when accessing a variable before it's declared
// let VS const
// Now that you understand the difference between var and let, what about const? Turns out, const is almost exactly the same as let. However, the only difference is that once you’ve assigned a value to a variable using const, you can’t reassign it to a new value.

// let name = 'Tyler'
// const handle = 'tylermcginnis'

// name = 'Tyler McGinnis' // ✅
// handle = '@tylermcginnis' // ❌ TypeError: Assignment to constant variable.
// The take away above is that variables declared with let can be re-assigned, but variables declared with const can’t be.

// Cool, so anytime you want a variable to be immutable, you can declare it with const. Well, not quite. Just because a variable is declared with const doesn’t mean it’s immutable, all it means is the value can’t be re-assigned. Here’s a good example.

// const person = {
//   name: 'Kim Kardashian'
// }

// person.name = 'Kim Kardashian West' // ✅

// person = {} // ❌ Assignment to constant variable.
// Notice that changing a property on an object isn’t reassigning it, so even though an object is declared with const, that doesn’t mean you can’t mutate any of its properties. It only means you can’t reassign it to a new value.

// Now the most important question we haven’t answered yet, should you use var, let, or const? The most popular opinion, and the opinion that I subscribe to, is that you should always use const unless you know the variable is going to change. The reason for this is by using const, you’re signalling to your future self as well as any other future developers that have to read your code that this variable shouldn’t change. If it will need to change (like in a for loop), you should use let.

// So between variables that change and variables that don’t change, there’s not much left. That means you shouldn’t ever have to use var again.

// Now the unpopular opinion, though it still has some validity to it, is that you should never use const because even though you’re trying to signal that the variable is immutable, as we saw above, that’s not entirely the case. Developers who subscribe to this opinion always use let unless they have variables that are actually constants like _LOCATION_ = ....

// So to recap, var is function scoped and if you try to use a variable declared with var before the actual declaration, you’ll just get undefined. const and let are blocked scoped and if you try to use variable declared with let or const before the declaration you’ll get a ReferenceError. Finally the difference between let and const is that once you’ve assigned a value to const, you can’t reassign it, but with let, you can.

// var VS let VS const

// var:
//   function scoped
//   undefined when accessing a variable before it's declared

// let:
//   block scoped
//   ReferenceError when accessing a variable before it's declared

// const:
//   block scoped
//   ReferenceError when accessing a variable before it's declared
//   can't be reassigned

}

function ObjectandArrayDestructuring(){
//     In this post, we’ll cover an ES2015 feature called destructuring. To better understand it, let’s take a look at some of the basics of Javascript objects. To add a single property to an object, you use dot notation. With dot notation, you can only add properties to an object one at a time. The same syntax can be used to extract data, again, one property at a time.

// const user = {};
// user.name = 'Tyler McGinnis';
// user.handle = '@tylermcginnis';
// user.location = 'Eden, Utah';

// const name = user.name;
// const handle = user.handle;
// If you wanted to add multiple properties to an object at the same time, you would need to use JavaScript’s “object literal notation” when you initialize the object.

// const user = {
//   name: 'Tyler McGinnis';
//   handle: '@tylermcginnis';
//   location: 'Eden, Utah';
// };

// const name = user.name;
// const handle = user.handle;
// There’s a way to add properties one at a time, extract properties one at a time, add multiple properties at the same time, but unfortunately, there’s no comparable way to extract multiple properties from an object at the same time. That is, until “destructuring” was introduced in ES2015. Destructuring allows us to extract multiple properties from an object. This can drastically decrease the amount of code we need to write when we want to extract data from an object, because what used to look like this,

// const name = user.name;
// const handle = user.handle;
// const location = user.location;
// can now look like this,

// const { name, handle, location } = user;
// The syntax can be a little bit weird but know that these two blocks of code are identical in that they both create and initialize three new variables. You can think of it like this, if you want to add properties to an object, do it as you are used to, on the right-hand side of the equal sign. If you want to extract properties from an object, do it on the left-hand side of the equal sign.

// Destructuring also allows you to destructure the results of function invocations. For example, below we have a function called getUser() which returns the user object. Rather than invoking getUser() and grabbing all of the properties off of it one by one, we could get the same result by destructuring the result of that invocation.

// function getUser () {
//   return {
//     name: 'Tyler McGinnis',
//     handle: '@tylermcginnis',
//     location: 'Eden, Utah'
//   };
// }

// const { name, handle, location } = getUser();
// Up until this point we’ve talked about how destructuring helps us extract data from objects, but what about arrays? Though not as common as object destructuring, array destructuring is a thing and it is still pretty useful in certain circumstances, specifically when the location of an item in the array is the main differentiator for that item. So here we have a user array with each item being a unique piece of information about the user,

// const user = ['Tyler McGinnis', '@tylermcginnis', 'Eden, Utah'];
// You’ll notice that this array probably should just be an object. But sometimes you have to take what you can get from weird external API’s. Typically if we want to better identify each item in the array we need to create a variable for each item.

// const name = user[0];
// const handle = user[1];
// const location = user[2];
// However just like with objects, array destructuring allows us to more effectively extract items from an array so the above code, can now look like the code below.

// const [ name, handle, location ] = user;
// Just as we saw from objects you can use array destructuring with function invocations. For example, below “split” is going to return an array with each item in the array being a specific property of the car.

// const cvs = '1997,Ford,F350,MustSell!'
// const [ year, make, model, description ] = csv.split(',');
// By using array destructuring, we are able to extract each property into their own, user readable variable.

// So that’s it in regards to the basics of destructuring, again destructuring allows us to easily extract data from an object or an array. There are, however, what I’d consider to be more advanced features of destructuring that are worth taking a look at.

// For example, what if when we do destructure an object, we wanted the variable name to be different than the property name on that object. So say we had an object that looked like this,

// const user = {
//   n: 'Tyler McGinnis',
//   h: '@tylermcginnis',
//   l: 'Eden, Utah'
// };
// Since we are not masochists and we actually like the other developers on our team, we don’t want to make three one letter variable names. Instead, we can have the property names on the left of the colon and the new variable names on the right. Now, we are not only destructuring the user object, but we are also renaming the poorly named properties into more easily understood variable names.

// const { n: name, h: handle, l: location } = user;
// console.log(name) // Tyler McGinnis
// console.log(handle) // @tylermcginnis
// console.log(location) // Eden, Utah
// This may seem like a rarely used feature, but it is actually pretty common. To find a real world example we don’t have to look very far. This is the implementation of the render method in React Router Native’s Link component. Note how we’re renaming component with a lowercase “c” to Component with a capitalized “c”.

// render () {
//   const { component: Component, to , replace, ...rest } = this.props
//   return <Component {...rest} onPress={this.handlePress}/>
// }
// Next, let’s talk about function arguments and parameters. Below we have a fetchRepos() function which is going to be in charge of fetching a group of repositories from the Github API.

// function fetchRepos (language, minStars, maxStars, createdBefore, createAfter) {

// }
// The first thing you’ll notice is that we have a lot of control over the type of repositories that we will be fetching. Fortunately, this leads to a stupid amount of arguments that can be passed into the function. Currently when we invoke our fetchRepos() function, we have two issues. First, we need to remember or look up which arguments go in which order. Second, we need to read and hope that the documentation has instructions for what to do with our arguments that we do not care about. In this case, we will just use null and hope for the best.

// function fetchRepos (language, minStars, maxStars, createdBefore, createAfter) {

// }

// fetchRepos('JavaScript', 100, null, new Date('01.01.2017').getTime(),null);
// The good news is that destructuring helps us with both of these problems. First, let’s solve the positional parameters problem. What if instead of passing in each argument one by one, we pass in an object instead? Now, before we ever need to look at the function definition of fetchRepos, we know exactly what information it needs. Even more important, order no longer matters.

// function fetchRepos (language, minStars, maxStars, createdBefore, createAfter) {

// }

// fetchRepos({
//   language: 'JavaScript',
//   maxStars: null,
//   createdAfter: null,
//   createdBefore: new Date('01/01/2017').getTime(),
//   minStars: 100,
// });
// Now we need to modify the fetchRepos function definition. This is where destructuring comes into play. Because we are receiving an object as the argument to the function, we can destructure it. So now the code above, can be changed to this.

// function fetchRepos ({ language, minStars, maxStars, createdBefore, createAfter }) {

// }

// fetchRepos({
//   language: 'JavaScript',
//   maxStars: null,
//   createdAfter: null,
//   createdBefore: new Date('01/01/2017').getTime(),
//   minStars: 100,
// });
// Again, the biggest benefit here is that we have removed the order out of the equation entirely, so that’s one less thing we have to worry about.

// The second problem we had earlier with our code was that we needed to figure out what to do with the arguments we did not care about. Before we just passed in null, but now that we are passing in an object rather than arguments one by one, we can actually just remove the null values altogether and that will give us a function invocation that looks like this.

// function fetchRepos ({ language, minStars, maxStars, createdBefore, createAfter }) {

// }

// fetchRepos({
//   language: 'JavaScript',
//   createdBefore: new Date('01/01/2017').getTime(),
//   minStars: 100,
// });
// This now leads us back to our function definition of fetchRepos. We need a way to establish default values for any properties that aren’t on the arguments object when the function is invoked. Typically that would look like this.

// function fetchRepos ({ language, minStars, maxStars, createdBefore, createAfter }) {
//   language = language || All;
//   minStars = minStars || 0;
//   maxStars = maxStars || '';
//   createdBefore = createdBefore || '';
//   createdAfter = createdAfter || '';
// }

// fetchRepos({
//   language: 'JavaScript',
//   createdBefore: new Date('01/01/2017').getTime(),
//   minStars: 100,
// });
// For each different possible property, we’d set the value of that property to itself or a default value if the original value was undefined. Luckily for us, another feature of destructuring is it allows you to set default values for any properties. If a partially destructured value is undefined, it will default to whatever you specify. What that means is that the ugly code above can be transformed into this,

// function fetchRepos({ language='All', minStars=0, maxStars='', createdBefore='', createdAfter='' }){

// }
// We set the default value of each property in the same place where we just destructured the parameters. Now that we’ve seen the power of using object destructuring to destructure an object’s parameters, can the same thing be done with array destructuring? Turns out, it can.

// My favorite example of this is with Promise.all. Below we have a getUserData function.

// function getUserData (player) {
//   return Promise.all([
//     getProfile(player),
//     getRepos(player)
//   ]).then(function (data) {
//     const profile = data[0];
//     const repos = data[1];

//     return {
//       profile: profile,
//       repos: repos
//     }
//   })
// }
// Notice it’s taking in a player and returning us the invocation of calling Promise.all. Both getProfile and getRepos return a promise. The whole point of this getUserDate function is that it’s going to take in a player and return an object with that player's profile as well as that player's repositories. If you’re not familiar with the Promise.all API, what’s going to happen here is getProfile and getRepos are both asynchronous functions. When those promises resolve (or when we get that information back from the Github API), the function that we passed to then is going to be invoked receiving an array (in this case we are calling it data). The first element in that array is going to be the user’s profile and the second item in the array is going to be the user’s repositories. You’ll notice that order matters here. For example, if we were to pass another invocation to Promise.all, say getUsersFollowers, then the third item in our data array would be their followers.

// The first update we can make to this code is we can destructure our data array. Now we still have our profile and repos variables, but instead of plucking out the items one by one, we destructure them.

// function getUserData (player) {
//   return Promise.all([
//     getProfile(player),
//     getRepos(player)
//   ]).then(function (data) {
//     const [ profile, repos ] = data
//     return {
//       profile: profile,
//       repos: repos
//     }
//   })
// }
// Now just as we saw with objects, we can move that destructuring into the parameter itself.

// function getUserData (player) {
//   return Promise.all([
//     getProfile(player),
//     getRepos(player)
//   ]).then(([ profile, repos ]) => {
//     return {
//       profile: profile,
//       repos: repos
//     }
//   })
// }
// Now we still have profile and repos, but those are being created with array destructuring inside of the function’s parameters.
}


function ShorthandProperties(){
    
// With Shorthand Properties, whenever you have a variable which is the same name as a property on an object, when constructing the object, you can omit the property name.

// What that means is that code that used to look like this,

// function formatMessage (name, id, avatar) {
//   return {
//     name: name,
//     id: id,
//     avatar: avatar,
//     timestamp: Date.now()
//   }
// }
// can now look like this.

// function formatMessage (name, id, avatar) {
//   return {
//     name,
//     id,
//     avatar,
//     timestamp: Date.now()
//   }
// }
// Shorthand Method Names
// Now, what if one of those properties was a function?

// A function that is a property on an object is called a method. With ES6’s Shorthand Method Names, you can omit the function keyword completely. What that means is that code that used to look like this,

// function formatMessage (name, id, avatar) {
//   return {
//     name,
//     id,
//     avatar,
//     timestamp: Date.now(),
//     save: function () {
//       // save message
//     }
//   }
// }
// can now look like this

// function formatMessage (name, id, avatar) {
//   return {
//     name,
//     id,
//     avatar,
//     timestamp: Date.now(),
//     save () {
//       //save message
//     }
//   }
// }
}

function computedPropertyNames(){
//     ES6’s “Computed Property Names” feature allows you to have an expression (a piece of code that results in a single value like a variable or function invocation) be computed as a property name on an object.

// For example, say you wanted to create a function that took in two arguments (key, value) and returned an object using those arguments. Before Computed Property Names, because the property name on the object was a variable (key), you’d have to create the object first, then use bracket notation to assign that property to the value.

// function objectify (key, value) {
//   let obj = {}
//   obj[key] = value
//   return obj
// }

// objectify('name', 'Tyler') // { name: 'Tyler' }
// However, now with Computed Property Names, you can use object literal notation to assign the expression as a property on the object without having to create it first. So the code above can now be rewritten like this.

// function objectify (key, value) {
//   return {
//     [key]: value
//   }
// }

// objectify('name', 'Tyler') // { name: 'Tyler' }
// Where key can be any expression as long as it’s wrapped in brackets, [].

}

function TemplateLiterals (){
    /*
    String concatenation is hard. Take this code for example.

function makeGreeting (name, email, id) {
  return 'Hello, ' + name +
    '. We\'ve emailed you at ' + email +
    '. Your user id is "' + id + '".'
}
All we’re trying to do is take three variables (name, email, and id) and create a sentence using them. Sadly, in order to do that, it’s a balancing act between using the right quotations, + signs, and escaping (\) the right characters. This is the exact problem that Template Literals (also called Template Strings) was created to solve.

With Template Literals, instead of using single ('') or double quotes (""), you use backticks (``) (located to the left of the 1 key if you’re using a QWERTY keyboard 🙂). Anywhere inside of your backticks where you have an expression (a piece of code that results in a single value like a variable or function invocation), you can wrap that expression in ${expression goes here}.

So using Template Literals, we can take the confusing makeGreeting function above and simplify it to look like this.

function makeGreeting (name, email, id) {
  return `Hello, ${name}. We've emailed you at ${email}. Your user id is "${id}".`
}
Much better. No more worrying about using the right quotations, + signs, and escaping the right characters. Not only is it easier to write, but it’s also much easier to read.

Now instead of having a makeGreeting function, say we wanted a makeGreetingTemplate function that returned us an HTML string that we could throw into the DOM. Without template strings, we’d have something like this.

function makeGreetingTemplate (name, email, id) {
  return '<div>' +
    '<h1>Hello, ' + name + '.</h1>' +
    '<p>We\'ve emailed you at ' + email + '. ' +
    'Your user id is "' + id + '".</p>' +
  '</div>'
}
Perfect, except for the fact that not only is it terribly hard to write, it’s even harder to read. What’s nice about ES6’s Template Strings is they also support multi-line strings. That means, using Template Strings, we can rewrite makeGreetingTemplate to look like this.

function makeGreetingTemplate (name, email, id) {
  return `
    <div>
      <h1>Hello, ${name}</h1>
      <p>
        We've email you at ${email}.
        Your user id is "${id}".
      </p>
    </div>
  `
}
    */ 
}


function ArrowFunctions(){
/*
Arrow functions provide two main benefits over regular functions. First, they’re more terse. Second, they make managing the this keyword a little easier.

What I’ve seen with new developers learning about Arrow Functions is that it’s not really the concept itself that’s difficult to grasp. Odds are you’re already familiar with functions, their benefits, use cases, etc. However, for some reason, it’s the actual syntax that throws your brain for a loop when you’re first exposed to them. Because of that, we’re going to take things slow and first just introduce how the syntax compares with typical functions you’re used to.

Here we have a very basic function declaration and a function expression.

// fn declaration
function add (x,y) {
  return x + y;
}

// fn expression
var add = function (x,y) {
  return x + y;
}
Now, if we wanted to change that function expression to an arrow function, we’d do it like this.

var add = function (x,y) {
  return x + y;
}

var add = (x,y) => {
  return x + y;
}
Again, the most difficult part about getting started with arrow functions is just getting used to the syntax. Once you’re cool with it, move on and we’ll dive deeper.

At this point you may be wondering what all the hype is about with arrow functions. Truthfully, the example above doesn’t really lend well to their strengths. What I’ve found is that arrow functions really thrive when you’re using anonymous functions. We can warm our brain up a little more to the syntax by looking at another basic example of this is using .map.

users.map(function () {

})

users.map(() => {

})
Alright enough with the warm up. Let’s dive into it.

Let’s say we had a getTweets function that took in a user id and, after hitting a poorly designed API, returned us all of the user’s Tweets with over 50 stars and retweets. Using promise chaining, that function may look something like this,

function getTweets (uid) {
  return fetch('https://api.users.com/' + uid)
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      return response.data
    }).then(function (tweets) {
      return tweets.filter(function (tweet) {
        return tweet.stars > 50
      })
    }).then(function (tweets) {
      return tweets.filter(function (tweet) {
        return tweet.rts > 50
      })
    })
}
Well, it works. But it’s not the prettiest function in the world 🤷‍♀️. Even though this specific implementation is kind of dense, the idea is all too common. Let’s take a look at how what we know about arrow functions thus far, can improve our getTweets function.

function getTweets (uid) {
  return fetch('https://api.users.com/' + uid)
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      return response.data
    }).then((tweets) => {
      return tweets.filter((tweet) => {
        return tweet.stars > 50
      })
    }).then((tweets) => {
      return tweets.filter((tweet) => {
        return tweet.rts > 50
      })
    })
}
OK, cool. It looks basically the same we just didn’t have to type function. Beneficial, but nothing worth Tweeting about. Let’s look at the next benefit of arrow functions, “implicit returns”.

With arrow functions, if your function has a “concise body” (a fancy way for saying one line function), then you can omit the “return” keyword and the value will be returned automatically (or implicitly).

So the add example from earlier can be updated to look like this,

var add = function (x,y) {
  return x + y;
}

var add = (x,y) => x + y;
and more importantly, the getTweets example can be update to look like this,

function getTweets (uid) {
  return fetch('https://api.users.com/' + uid)
    .then((response) => response.json())
    .then((response) => response.data)
    .then((tweets) => tweets.filter((tweet) => tweet.stars > 50))
    .then((tweets) => tweets.filter((tweet) => tweet.rts > 50))
}
Now we’re talking 📈. That code is not only much easier to write, but more importantly, it’s much easier to read.

Now, one further change we can make is that if the arrow function only has one parameter, you can omit the () around it. With that in mind, getTweets now looks like this,

function getTweets (uid) {
  return fetch('https://api.users.com/' + uid)
    .then(response => response.json())
    .then(response => response.data)
    .then(tweets => tweets.filter(tweet => tweet.stars > 50))
    .then(tweets => tweets.filter(tweet => tweet.rts > 50))
}
Overall, I’d say that’s a huge improvement in just about every category.

The next benefit of arrow functions is how they manage the this keyword. If you’re not familiar with the this keyword, check out this post - Understanding the this keyword, call, apply, and bind in JavaScript.

Let’s take a look at some typical React code.

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      repos: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount () {
    this.updateLanguage('javascript')
  }
  updateLanguage(lang) {
    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        });
      });
  }
  render() {
    // Stuff
  }
}
When the component mounts, it’s making an API request (to the Github API) to fetch JavaScript’s most popular repositories. When it gets the repositories, it takes them and updates the component’s local state, or at least that’s what we want it to do. Unfortunately, it doesn’t do that. Instead, we get an error. Can you spot the bug?

The error the code above is going to throw is “cannot read setState of undefined”. Now, why that’s happening is outside the scope of this post (again, read or watch Understanding the this keyword, call, apply, and bind in JavaScript if you need it) but a typical ES5 solution uses .bind and looks something like this

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      repos: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount () {
    this.updateLanguage('javascript')
  }
  updateLanguage(lang) {
    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        });
      }.bind(this));
  }
  render() {
    // Stuff
  }
}
This is the second major benefit as to why arrow functions are great, they don’t create their own context. What that means is that typically the this keyword Just Works™ without you having to worry about what context a specific function is going to be invoked in. So by using arrow functions in the updateLanguage method, we don’t have to worry about this which means we don’t have to call .bind anymore.

updateLanguage(lang) {
  api.fetchPopularRepos(lang)
    .then((repos) => {
      this.setState(() => {
        return {
          repos: repos
        }
      });
    });
}
📈📈📈

Nice to knows
At this point, we’ve covered all of the “need to knows” about arrow functions. There are, however, two different “nice to knows” that I think are worth mentioning.

Looking at the updateLanguage method again, if we wanted to implicitly return the object inside of the setState callback, how would we do that? Your first intuition would be to remove the return statement and just return an object.

api.fetchPopularRepos(lang)
  .then((repos) => {
    this.setState(() => {
      repos: repos
    });
  });
The problem with this, as you probably guessed, is that that syntax is the exact same as creating a function body. JavaScript can’t magically tell the difference between when you want to create a function body and when you want to return an object so it’ll throw an error. To fix this, we can wrap the object inside of ().

api.fetchPopularRepos(lang)
  .then((repos) => {
    this.setState(() => ({
      repos: repos
    }));
  });
Now, with that syntax, we can use an arrow function to implicitly return an object.

Now I know if I don’t put this, someone will mention it. As a bonus since we’re using ES6, we can go ahead use ES6’s shorthand property and method names feature to get rid of the repos:repos and use Arrow Function’s implicit return to shorten it up a bit.

api.fetchPopularRepos(lang)
  .then((repos) =>
    this.setState(() => repos)
  );
Next tip. Say we wanted to examine the previous state of the component inside of setState by logging it. If this was your setState function, how would you approach logging nextState?

this.setState((nextState) => ({
  repos: repos
}));
The obvious move would be to change your implicit return to an explicit return, create a function body, then log inside of that body.

this.setState((nextState) => {
  console.log(nextState)
  return {
    repos: repos
  }
});
Well, that’s pretty annoying. There is a better way though and it’s done using the || operator. Instead of messing with all of your code, you can do something like this

this.setState((nextState) => console.log(nextState) || ({
  repos: repos
}));
*/

}

function DefaultParameters(){
/*Often times when writing a function, you need to assign default values for arguments that weren’t passed to the function when it was invoked.

For example, let’s say we were creating a calculatePayment function. This function has three parameters, price, salesTax, and discount. The purpose of this function, as the name implies, is to calculate the final price of a bill taking into account the initial price as well as any sales tax or discounts that should be applied.

With a function like this, the only parameter that we want to make required is the price. We’ll set the default value of salesTax to 0.05 (5%) and the default value of discount to 0 so our function will still work if those values aren’t passed in when the function is invoked. This way, the consumer of this function can supply a sales tax as well as a discount if they want, but if they don’t, the default values will kick in.

calculatePayment(10) // 9.50
calculatePayment(10, 0, 10) // 9.00
Historically, one way you could accomplish this is by using the Logical || operator.

function calculatePayment (price, salesTax, discount) {
  salesTax = salesTax || 0.05
  discount = discount || 0

  // math
}
If you’re not familiar with ||, you can think of it like you would an if statement checking for falsy values.

function calculatePayment (price, salesTax, discount) {
  if (!salesTax) {
    salesTax = 0.05
  }

  if (!discount) {
    discount = 0
  }

  // math
}
However, this approach has some downsides. Can you spot the issue? What if we wanted to set the salesTax to 0? With our current implementation that would be impossible since 0 is classified as a falsy value so our if (!salesTax) would always evaluate to true setting the salesTax to our default value of 0.05. To fix this, let’s check for undefined rather than falsy.

function calculatePayment (price, salesTax, discount) {
  salesTax = typeof salesTax === 'undefined' ? 0.05 : salesTax
  discount = typeof discount === 'undefined' ? 0 : discount

  // math
}
Now, both salesTax and discount will only take on their default values if their arguments are undefined.

At this point our code works well, but as you’ll see, there’s now a better way to do this with ES6’s “Default Parameters”.

Default Parameters
Default Parameters allow you to set the default values for any parameters that are undefined when a function is invoked. Using Default Parameters, we can now update our calculatePayment function to look like this,

function calculatePayment (price, salesTax = 0.05, discount = 0) {

  // math
}
Now, just as we had before, if salesTax or discount are undefined when calculatePayment is invoked, they’ll be set to their default values of 0.05 and 0.

Required Arguments
One neat trick you can do using Default Parameters is to throw an error if a function is invoked without a required argument. For example, what if we wanted calculatePayment to throw an error if the price wasn’t specified when it was invoked?

To do this, first create the function that will throw the error.

function isRequired (name) {
  throw new Error(`${name}` is required)
}
Next, using Default Parameters, assign the required parameter to the invocation of isRequired

function calculatePayment (
  price = isRequired('price'),
  salesTax = 0.05,
  discount = 0
) {

  // math
}
Now if calculatePayment is invoked without a price, JavaScript will invoke the isRequired function, throwing the error. Clever? Totally. A good idea? I’ll leave that up to you. */

}

function   CompilingvsPolyfillswithBabel(){
/*
JavaScript is a living language that’s constantly progressing. As a developer, this is great because we’re constantly learning and our tools are constantly improving. The downside of this is that it typically takes browsers a few years to catch up. Whenever a new language proposal is created, it needs to go through five different stages before it’s added to the official language specification. Once it’s part of the official spec, it still actually needs to be implemented into every browser you think your users will use. Because of this delay, if you ever want to use the newest JavaScript features, you need to either wait for the latest browsers to implement them (and then hope your users don’t use older browsers) or you need to use a tool like Babel to compile your new, modern code back to code that older browsers can understand. When it’s framed like that, it’s almost certain that a compiler like Babel will always be a fundamental part of building JavaScript applications, assuming the language continues to progress. Again, the purpose of Babel is to take your code which uses new features that browsers may not support yet, and transform it into code that any browser you care about can understand.

So for example, code that looks like this,

const getProfile = username => {
  return fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then(({ data }) => ({
      name: data.name,
      location: data.location,
      company: data.company,
      blog: data.blog.includes('https') ? data.blog : null
    }))
    .catch((e) => console.warn(e))
}
would get compiled into code that looks like this,

var getProfile = function getProfile(username) {
  return fetch('https://api.github.com/users/' + username).then(function (response) {
    return response.json();
  }).then(function (_ref) {
    var data = _ref.data;
    return {
      name: data.name,
      location: data.location,
      company: data.company,
      blog: data.blog.includes('https') ? data.blog : null
    };
  }).catch(function (e) {
    return console.warn(e);
  });
};
You’ll notice that most of the ES6 code like the Arrow Functions and Template Strings have been compiled into regular old ES5 JavaScript. There are, however, two features that didn’t get compiled: fetch and includes. The whole goal of Babel is to take our “next generation” code (as the Babel website says) and make it work in all the browsers we care about. You would think that includes and fetch would get compiled into something native like indexOf and XMLHttpRequest, but that’s not the case. So now the question becomes, why didn’t fetch or includes get compiled? fetch isn’t actually part of ES6 so that one at least makes a little bit of sense assuming we’re only having Babel compile our ES6 code. includes, however, is part of ES6 but still didn’t get compiled. What this tells us is that compiling only gets our code part of the way there. There’s still another step, that if we’re using certain new features, we need to take - polyfilling.

What’s the difference between compiling and polyfilling? When Babel compiles your code, what it’s doing is taking your syntax and running it through various syntax transforms in order to get browser compatible syntax. What it’s not doing is adding any new JavaScript primitives or any properties you may need to the browser’s global namespace. One way you can think about it is that when you compile your code, you’re transforming it. When you add a polyfill, you’re adding new functionality to the browser.

If this is still fuzzy, here are a list of new language features. Try to figure out if they are compiled or if they need to be polyfilled.

Arrow Functions
Classes
Promises
Destructuring
Fetch
String.includes
Arrow functions: Babel can transform arrow functions into regular functions, so, they can be compiled.

Classes: Like Arrow functions, Class can be transformed into functions with prototypes, so they can be compiled as well.

Promises: There’s nothing Babel can do to transform promises into native syntax that browsers understand. More important, compiling won’t add new properties, like Promise, to the global namespace so Promises need to be polyfilled.

Destructuring: Babel can transform every destructured object into normal variables using dot notation. So, compiled.

Fetch: fetch needs to be polyfilled because, by the definition mentioned earlier, when you compile code you’re not adding any new global or primitive properties that you may need. fetch would be a new property on the global namespace, therefore, it needs to be polyfilled.

String.includes: This one is tricky because it doesn’t follow our typical routine. One could argue that includes should be transformed to use indexOf, however, again, compiling doesn’t add new properties to any primitives, so it needs to be polyfilled.

Here’s a pretty extensive list from the Babel website as to what features are compiled and what features need to be polyfilled.

Features that need to be compiled
Arrow functions
Async functions
Async generator functions
Block scoping
Block scoped functions
Classes
Class properties
Computed property names
Constants
Decorators
Default parameters
Destructuring
Do expressions
Exponentiation operator
For-of
Function bind
Generators
Modules
Module export extensions
New literals
Object rest/spread
Property method assignment
Property name shorthand
Rest parameters
Spread
Sticky regex
Template literals
Trailing function commas
Type annotations
Unicode regex
Features that need to be polyfilled
ArrayBuffer
Array.from
Array.of
Array#copyWithin
Array#fill
Array#find
Array#findIndex
Function#name
Map
Math.acosh
Math.hypot
Math.imul
Number.isNaN
Number.isInteger
Object.assign
Object.getOwnPropertyDescriptors
Object.is
Object.entries
Object.values
Object.setPrototypeOf
Promise
Reflect
RegExp#flags
Set
String#codePointAt
String#endsWith
String.fromCodePoint
String#includes
String.raw
String#repeat
String#startsWith
String#padStart
String#padEnd
Symbol
WeakMap
WeakSet
Because adding new features to your project isn’t done very often, instead of trying to memorize what’s compiled and what’s polyfilled, I think it’s important to understand the general rules behind the two concepts, then if you need to know if you should include a polyfill for a specific feature, check Babel’s website.
*/

}

function CallbacksPromisesAsyncAwait(){
/*One of my favorite sites is BerkshireHathaway.com - it’s simple, effective, and has been doing its job well since it launched in 1997. Even more remarkable, over the last 20 years, there’s a good chance this site has never had a bug. Why? Because it’s all static. It’s been pretty much the same since it launched over 20 years ago. Turns out sites are pretty simple to build if you have all of your data up front. Unfortunately, most sites now days don’t. To compensate for this, we’ve invented “patterns” for handling fetching external data for our apps. Like most things, these patterns each have tradeoffs that have changed over time. In this post, we’ll break down the pros and cons of three of the most common patterns, Callbacks, Promises, and Async/Await and talk about their significance and progression from a historical context.

Let’s start with the OG of these data fetching patterns, Callbacks.

Callbacks
I’m going to assume you know exactly 0 about callbacks. If I’m assuming wrong, just scroll down a bit.

When I was first learning to program, it helped me to think about functions as machines. These machines can do anything you want them to. They can even accept input and return a value. Each machine has a button on it that you can press when you want the machine to run, ().

function add (x, y) {
  return x + y
}

add(2,3) // 5 - Press the button, run the machine.
Whether I press the button, you press the button, or someone else presses the button doesn’t matter. Whenever the button is pressed, like it or not, the machine is going to run.

function add (x, y) {
  return x + y
}

const me = add
const you = add
const someoneElse = add

me(2,3) // 5 - Press the button, run the machine.
you(2,3) // 5 - Press the button, run the machine.
someoneElse(2,3) // 5 - Press the button, run the machine.
In the code above we assign the add function to three different variables, me, you, and someoneElse. It’s important to note that the original add and each of the variables we created are pointing to the same spot in memory. They’re literally the exact same thing under different names. So when we invoke me, you, or someoneElse, it’s as if we’re invoking add.

Now, what if we take our add machine and pass it to another machine? Remember, it doesn’t matter who presses the () button, if it’s pressed, it’s going to run.

function add (x, y) {
  return x + y
}

function addFive (x, addReference) {
  return addReference(x, 5) // 15 - Press the button, run the machine.
}

addFive(10, add) // 15
Your brain might have got a little weird on this one, nothing new is going on here though. Instead of “pressing the button” on add, we pass add as an argument to addFive, rename it addReference, and then we “press the button” or invoke it.

This highlights some important concepts of the JavaScript language. First, just as you can pass a string or a number as an argument to a function, so too can you pass a reference to a function as an argument. When you do this the function you’re passing as an argument is called a callback function and the function you’re passing the callback function to is called a higher order function.

Because vocabulary is important, here’s the same code with the variables re-named to match the concepts they’re demonstrating.

function add (x,y) {
  return x + y
}

function higherOrderFunction (x, callback) {
  return callback(x, 5)
}

higherOrderFunction(10, add)
This pattern should look familiar, it’s everywhere. If you’ve ever used any of the JavaScript Array methods, you’ve used a callback. If you’ve ever used lodash, you’ve used a callback. If you’ve ever used jQuery, you’ve used a callback.

[1,2,3].map((i) => i + 5)

_.filter([1,2,3,4], (n) => n % 2 === 0 );

$('#btn').on('click', () =>
  console.log('Callbacks are everywhere')
)
In general, there are two popular use cases for callbacks. The first, and what we see in the .map and _.filter examples, is a nice abstraction over transforming one value into another. We say “Hey, here’s an array and a function. Go ahead and get me a new value based on the function I gave you”. The second, and what we see in the jQuery example, is delaying execution of a function until a particular time. “Hey, here’s this function. Go ahead and invoke it whenever the element with an id of btn is clicked.” It’s this second use case that we’re going to focus on, “delaying execution of a function until a particular time”.

Right now we’ve only looked at examples that are synchronous. As we talked about at the beginning of this post, most of the apps we build don’t have all the data they need up front. Instead, they need to fetch external data as the user interacts with the app. We’ve just seen how callbacks can be a great use case for this because, again, they allow you to “delay execution of a function until a particular time”. It doesn’t take much imagination to see how we can adapt that sentence to work with data fetching. Instead of delaying execution of a function until a particular time, we can delay execution of a function until we have the data we need. Here’s probably the most popular example of this, jQuery’s getJSON method.

// updateUI and showError are irrelevant.
// Pretend they do what they sound like.

const id = 'tylermcginnis'

$.getJSON({
  url: `https://api.github.com/users/${id}`,
  success: updateUI,
  error: showError,
})
We can’t update the UI of our app until we have the user’s data. So what do we do? We say, “Hey, here’s an object. If the request succeeds, go ahead and call success passing it the user’s data. If it doesn’t, go ahead and call error passing it the error object. You don’t need to worry about what each method does, just be sure to call them when you’re supposed to”. This is a perfect demonstration of using a callback for async requests.

At this point, we’ve learned about what callbacks are and how they can be beneficial both in synchronous and asynchronous code. What we haven’t talked yet is the dark side of callbacks. Take a look at this code below. Can you tell what’s happening?

// updateUI, showError, and getLocationURL are irrelevant.
// Pretend they do what they sound like.

const id = 'tylermcginnis'

$("#btn").on("click", () => {
  $.getJSON({
    url: `https://api.github.com/users/${id}`,
    success: (user) => {
      $.getJSON({
        url: getLocationURL(user.location.split(',')),
        success (weather) {
          updateUI({
            user,
            weather: weather.query.results
          })
        },
        error: showError,
      })
    },
    error: showError
  })
})
If it helps, you can play around with the live version here.

Notice we’ve added a few more layers of callbacks. First, we’re saying don’t run the initial AJAX request until the element with an id of btn is clicked. Once the button is clicked, we make the first request. If that request succeeds, we make a second request. If that request succeeds, we invoke the updateUI method passing it the data we got from both requests. Regardless of if you understood the code at first glance or not, objectively it’s much harder to read than the code before. This brings us to the topic of “Callback Hell”.

As humans, we naturally think sequentially. When you have nested callbacks inside of nested callbacks, it forces you out of your natural way of thinking. Bugs happen when there’s a disconnect between how your software is read and how you naturally think.

Like most solutions to software problems, a commonly prescribed approach for making “Callback Hell” easier to consume is to modularize your code.

function getUser(id, onSuccess, onFailure) {
  $.getJSON({
    url: `https://api.github.com/users/${id}`,
    success: onSuccess,
    error: onFailure
  })
}

function getWeather(user, onSuccess, onFailure) {
  $.getJSON({
    url: getLocationURL(user.location.split(',')),
    success: onSuccess,
    error: onFailure,
  })
}

$("#btn").on("click", () => {
  getUser("tylermcginnis", (user) => {
    getWeather(user, (weather) => {
      updateUI({
        user,
        weather: weather.query.results
      })
    }, showError)
  }, showError)
})
If it helps, you can play around with the live version here.

OK, the function names help us understand what’s going on, but is it objectively “better”? Not by much. We’ve put a band-aid over the readability issue of Callback Hell. The problem still exists that we naturally think sequentially and, even with the extra functions, nested callbacks break us out of that sequential way of thinking.

The next issue of callbacks has to do with inversion of control. When you write a callback, you’re assuming that the program you’re giving the callback to is responsible and will call it when (and only when) it’s supposed to. You’re essentially inverting the control of your program over to another program. When you’re dealing with libraries like jQuery, lodash, or even vanilla JavaScript, it’s safe to assume that the callback function will be invoked at the correct time with the correct arguments. However, for many third-party libraries, callback functions are the interface for how you interact with them. It’s entirely plausible that a third party library could, whether on purpose or accidentally, break how they interact with your callback.

function criticalFunction () {
  // It's critical that this function
  // gets called and with the correct
  // arguments.
}

thirdPartyLib(criticalFunction)
Since you’re not the one calling criticalFunction, you have 0 control over when and with what argument it’s invoked. Most of the time this isn’t an issue, but when it is, it’s a big one.

Promises
Have you ever been to a busy restaurant without a reservation? When this happens, the restaurant needs a way to get back in contact with you when a table opens up. Historically, they’d just take your name and yell it when your table was ready. Then, as naturally occurs, they decided to start getting fancy. One solution was, instead of taking your name, they’d take your number and text you once a table opened up. This allowed you to be out of yelling range but more importantly, it allowed them to target your phone with ads whenever they wanted. Sound familiar? It should! OK, maybe it shouldn’t. It’s a metaphor for callbacks! Giving your number to a restaurant is just like giving a callback function to a third party service. You expect the restaurant to text you when a table opens up, just like you expect the third party service to invoke your function when and how they said they would. Once your number or callback function is in their hands though, you’ve lost all control.

Thankfully, there is another solution that exists. One that, by design, allows you to keep all the control. You’ve probably even experienced it before - it’s that little buzzer thing they give you. You know, this one.

Restaurant Buzzer

If you’ve never used one before, the idea is simple. Instead of taking your name or number, they give you this device. When the device starts buzzing and glowing, your table is ready. You can still do whatever you’d like as you’re waiting for your table to open up, but now you don’t have to give up anything. In fact, it’s the exact opposite. They have to give you something. There is no inversion of control.

The buzzer will always be in one of three different states - pending, fulfilled, or rejected.

pending is the default, initial state. When they give you the buzzer, it’s in this state.

fulfilled is the state the buzzer is in when it’s flashing and your table is ready.

rejected is the state the buzzer is in when something goes wrong. Maybe the restaurant is about to close or they forgot someone rented out the restaurant for the night.

Again, the important thing to remember is that you, the receiver of the buzzer, have all the control. If the buzzer gets put into fulfilled, you can go to your table. If it gets put into fulfilled and you want to ignore it, cool, you can do that too. If it gets put into rejected, that sucks but you can go somewhere else to eat. If nothing ever happens and it stays in pending, you never get to eat but you’re not actually out anything.

Now that you’re a master of the restaurant buzzer thingy, let’s apply that knowledge to something that matters.

If giving the restaurant your number is like giving them a callback function, receiving the little buzzy thing is like receiving what’s called a “Promise”.

As always, let’s start with why. Why do Promises exist? They exist to make the complexity of making asynchronous requests more manageable. Exactly like the buzzer, a Promise can be in one of three states, pending, fulfilled or rejected. Unlike the buzzer, instead of these states representing the status of a table at a restaurant, they represent the status of an asynchronous request.

If the async request is still ongoing, the Promise will have a status of pending. If the async request was successfully completed, the Promise will change to a status of fulfilled. If the async request failed, the Promise will change to a status of rejected. The buzzer metaphor is pretty spot on, right?

Now that you understand why Promises exist and the different states they can be in, there are three more questions we need to answer.

How do you create a Promise?
How do you change the status of a promise?
How do you listen for when the status of a promise changes?
1) How do you create a Promise?
This one is pretty straight forward. You create a new instance of Promise.

const promise = new Promise()
2) How do you change the status of a promise?
The Promise constructor function takes in a single argument, a (callback) function. This function is going to be passed two arguments, resolve and reject.

resolve - a function that allows you to change the status of the promise to fulfilled

reject - a function that allows you to change the status of the promise to rejected.

In the code below, we use setTimeout to wait 2 seconds and then invoke resolve. This will change the status of the promise to fulfilled.

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve() // Change status to 'fulfilled'
  }, 2000)
})
We can see this change in action by logging the promise right after we create it and then again roughly 2 seconds later after resolve has been called.

Use resolve to change the status of a promise to fulfilled

Notice the promise goes from <pending> to <resolved>.

3) How do you listen for when the status of a promise changes?
In my opinion, this is the most important question. It’s cool we know how to create a promise and change its status, but that’s worthless if we don’t know how to do anything after the status changes.

One thing we haven’t talked about yet is what a promise actually is. When you create a new Promise, you’re really just creating a plain old JavaScript object. This object can invoke two methods, then, and catch. Here’s the key. When the status of the promise changes to fulfilled, the function that was passed to .then will get invoked. When the status of a promise changes to rejected, the function that was passed to .catch will be invoked. What this means is that once you create a promise, you’ll pass the function you want to run if the async request is successful to .then. You’ll pass the function you want to run if the async request fails to .catch.

Let’s take a look at an example. We’ll use setTimeout again to change the status of the promise to fulfilled after two seconds (2000 milliseconds).

function onSuccess () {
  console.log('Success!')
}

function onError () {
  console.log('💩')
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 2000)
})

promise.then(onSuccess)
promise.catch(onError)
If you run the code above you’ll notice that roughly 2 seconds later, you’ll see “Success!” in the console. Again the reason this happens is because of two things. First, when we created the promise, we invoked resolve after ~2000 milliseconds - this changed the status of the promise to fulfilled. Second, we passed the onSuccess function to the promises’ .then method. By doing that we told the promise to invoke onSuccess when the status of the promise changed to fulfilled which it did after ~2000 milliseconds.

Now let’s pretend something bad happened and we wanted to change the status of the promise to rejected. Instead of calling resolve, we would call reject.

function onSuccess () {
  console.log('Success!')
}

function onError () {
  console.log('💩')
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject()
  }, 2000)
})

promise.then(onSuccess)
promise.catch(onError)
Now this time instead of the onSuccess function being invoked, the onError function will be invoked since we called reject.

Now that you know your way around the Promise API, let’s start looking at some real code.

Remember the last async callback example we saw earlier?

function getUser(id, onSuccess, onFailure) {
  $.getJSON({
    url: `https://api.github.com/users/${id}`,
    success: onSuccess,
    error: onFailure
  })
}

function getWeather(user, onSuccess, onFailure) {
  $.getJSON({
    url: getLocationURL(user.location.split(',')),
    success: onSuccess,
    error: onFailure,
  })
}

$("#btn").on("click", () => {
  getUser("tylermcginnis", (user) => {
    getWeather(user, (weather) => {
      updateUI({
        user,
        weather: weather.query.results
      })
    }, showError)
  }, showError)
})
Is there any way we could use the Promise API here instead of using callbacks? What if we wrap our AJAX requests inside of a promise? Then we can simply resolve or reject depending on how the request goes. Let’s start with getUser.

function getUser(id) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: `https://api.github.com/users/${id}`,
      success: resolve,
      error: reject
    })
  })
}
Nice. Notice that the parameters of getUser have changed. Instead of receiving id, onSuccess, and onFailure, it just receives id. There’s no more need for those other two callback functions because we’re no longer inverting control. Instead, we use the Promise’s resolve and reject functions. resolve will be invoked if the request was successful, reject will be invoked if there was an error.

Next, let’s refactor getWeather. We’ll follow the same strategy here. Instead of taking in onSuccess and onFailure callback functions, we’ll use resolve and reject.

function getWeather(user) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: getLocationURL(user.location.split(',')),
      success: resolve,
      error: reject,
    })
  })
}
Looking good. Now the last thing we need to update is our click handler. Remember, here’s the flow we want to take.

Get the user’s information from the Github API.
Use the user’s location to get their weather from the Yahoo Weather API.
Update the UI with the user’s info and their weather.
Let’s start with #1 - getting the user’s information from the Github API.

$("#btn").on("click", () => {
  const userPromise = getUser('tylermcginnis')

  userPromise.then((user) => {

  })

  userPromise.catch(showError)
})
Notice that now instead of getUser taking in two callback functions, it returns us a promise that we can call .then and .catch on. If .then is called, it’ll be called with the user’s information. If .catch is called, it’ll be called with the error.

Next, let’s do #2 - Use the user’s location to get their weather.

$("#btn").on("click", () => {
  const userPromise = getUser('tylermcginnis')

  userPromise.then((user) => {
    const weatherPromise = getWeather(user)
    weatherPromise.then((weather) => {

    })

    weatherPromise.catch(showError)
  })

  userPromise.catch(showError)
})
Notice we follow the exact same pattern we did in #1 but now we invoke getWeather passing it the user object we got from userPromise.

Finally, #3 - Update the UI with the user’s info and their weather.

$("#btn").on("click", () => {
  const userPromise = getUser('tylermcginnis')

  userPromise.then((user) => {
    const weatherPromise = getWeather(user)
    weatherPromise.then((weather) => {
      updateUI({
        user,
        weather: weather.query.results
      })
    })

    weatherPromise.catch(showError)
  })

  userPromise.catch(showError)
})
Here’s the full code you can play around with.

Our new code is better, but there are still some improvements we can make. Before we can make those improvements though, there are two more features of promises you need to be aware of, chaining and passing arguments from resolve to then.

Chaining
Both .then and .catch will return a new promise. That seems like a small detail but it’s important because it means that promises can be chained.

In the example below, we call getPromise which returns us a promise that will resolve in at least 2000 milliseconds. From there, because .then will return a promise, we can continue to chain our .thens together until we throw a new Error which is caught by the .catch method.

function getPromise () {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}

function logA () {
  console.log('A')
}

function logB () {
  console.log('B')
}

function logCAndThrow () {
  console.log('C')

  throw new Error()
}

function catchError () {
  console.log('Error!')
}

getPromise()
  .then(logA) // A
  .then(logB) // B
  .then(logCAndThrow) // C
  .catch(catchError) // Error!
Cool, but why is this so important? Remember back in the callback section we talked about one of the downfalls of callbacks being that they force you out of your natural, sequential way of thinking. When you chain promises together, it doesn’t force you out of that natural way of thinking because chained promises are sequential. getPromise runs then logA runs then logB runs then....

Just so you can see one more example, here’s a common use case when you use the fetch API. fetch will return you a promise that will resolve with the HTTP response. To get the actual JSON, you’ll need to call .json. Because of chaining, we can think about this in a sequential manner.

fetch('/api/user.json')
  .then((response) => response.json())
  .then((user) => {
    // user is now ready to go.
  })
Now that we know about chaining, let’s refactor our getUser/getWeather code from earlier to use it.

function getUser(id) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: `https://api.github.com/users/${id}`,
      success: resolve,
      error: reject
    })
  })
}

function getWeather(user) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: getLocationURL(user.location.split(',')),
      success: resolve,
      error: reject,
    })
  })
}

$("#btn").on("click", () => {
  getUser("tylermcginnis")
    .then(getWeather)
    .then((weather) => {
      // We need both the user and the weather here.
      // Right now we just have the weather
      updateUI() // ????
    })
    .catch(showError)
})
It looks much better, but now we’re running into an issue. Can you spot it? In the second .then we want to call updateUI. The problem is we need to pass updateUI both the user and the weather. Currently, how we have it set up, we’re only receiving the weather, not the user. Somehow we need to figure out a way to make it so the promise that getWeather returns is resolved with both the user and the weather.

Here’s the key. resolve is just a function. Any arguments you pass to it will be passed along to the function given to .then. What that means is that inside of getWeather, if we invoke resolve ourself, we can pass to it weather and user. Then, the second .then method in our chain will receive both user and weather as an argument.

function getWeather(user) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: getLocationURL(user.location.split(',')),
      success(weather) {
        resolve({ user, weather: weather.query.results })
      },
      error: reject,
    })
  })
}

$("#btn").on("click", () => {
  getUser("tylermcginnis")
    .then(getWeather)
    .then((data) => {
      // Now, data is an object with a
      // "weather" property and a "user" property.

      updateUI(data)
    })
    .catch(showError)
})
You can play around with the final code here

It’s in our click handler where you really see the power of promises shine compared to callbacks.

// Callbacks 🚫
getUser("tylermcginnis", (user) => {
  getWeather(user, (weather) => {
    updateUI({
      user,
      weather: weather.query.results
    })
  }, showError)
}, showError)


// Promises ✅
getUser("tylermcginnis")
  .then(getWeather)
  .then((data) => updateUI(data))
  .catch(showError);
Following that logic feels natural because it’s how we’re used to thinking, sequentially. getUser then getWeather then update the UI with the data.

Now it’s clear that promises drastically increase the readability of our asynchronous code, but is there a way we can make it even better? Assume that you were on the TC39 committee and you had all the power to add new features to the JavaScript language. What steps, if any, would you take to improve this code?

$("#btn").on("click", () => {
  getUser("tylermcginnis")
    .then(getWeather)
    .then((data) => updateUI(data))
    .catch(showError)
})
As we’ve discussed, the code reads pretty nicely. Just as our brains work, it’s in a sequential order. One issue that we did run into was that we needed to thread the data (users) from the first async request all the way through to the last .then. This wasn’t a big deal, but it made us change up our getWeather function to also pass along users. What if we just wrote our asynchronous code the same way which we write our synchronous code? If we did, that problem would go away entirely and it would still read sequentially. Here’s an idea.

$("#btn").on("click", () => {
  const user = getUser('tylermcginnis')
  const weather = getWeather(user)

  updateUI({
    user,
    weather,
  })
})
Well, that would be nice. Our asynchronous code looks exactly like our synchronous code. There’s no extra steps our brain needs to take because we’re already very familiar with this way of thinking. Sadly, this obviously won’t work. As you know, if we were to run the code above, user and weather would both just be promises since that’s what getUser and getWeather return. But remember, we’re on TC39. We have all the power to add any feature to the language we want. As is, this code would be really tricky to make work. We’d have to somehow teach the JavaScript engine to know the difference between asynchronous function invocations and regular, synchronous function invocations on the fly. Let’s add a few keywords to our code to make it easier on the engine.

First, let’s add a keyword to the main function itself. This could clue the engine to the fact that inside of this function, we’re going to have some asynchronous function invocations. Let’s use async for this.

$("#btn").on("click", async () => {
  const user = getUser('tylermcginnis')
  const weather = getWeather(user)

  updateUI({
    user,
    weather,
  })
})
Cool. That seems reasonable. Next let’s add another keyword to let the engine know exactly when a function being invoked is asynchronous and is going to return a promise. Let’s use await. As in, “Hey engine. This function is asynchronous and returns a promise. Instead of continuing on like you typically do, go ahead and ‘await’ the eventual value of the promise and return it before continuing”. With both of our new async and await keywords in play, our new code will look like this.

$("#btn").on("click", async () => {
  const user = await getUser('tylermcginnis')
  const weather = await getWeather(user.location)

  updateUI({
    user,
    weather,
  })
})
Pretty slick. We’ve invented a reasonable way to have our asynchronous code look and behave as if it were synchronous. Now the next step is to actually convince someone on TC39 that this is a good idea. Lucky for us, as you probably guessed by now, we don’t need to do any convincing because this feature is already part of JavaScript and it’s called Async/Await.

Don’t believe me? Here’s our live code now that we’ve added Async/Await to it. Feel free to play around with it.

async functions return a promise
Now that you’ve seen the benefit of Async/Await, let’s discuss some smaller details that are important to know. First, anytime you add async to a function, that function is going to implicitly return a promise.

async function getPromise(){}

const promise = getPromise()
Even though getPromise is literally empty, it’ll still return a promise since it was an async function.

If the async function returns a value, that value will also get wrapped in a promise. That means you’ll have to use .then to access it.

async function add (x, y) {
  return x + y
}

add(2,3).then((result) => {
  console.log(result) // 5
})
await without async is bad
If you try to use the await keyword inside of a function that isn’t async, you’ll get an error.

$("#btn").on("click", () => {
  const user = await getUser('tylermcginnis') // SyntaxError: await is a reserved word
  const weather = await getWeather(user.location) // SyntaxError: await is a reserved word

  updateUI({
    user,
    weather,
  })
})
Here’s how I think about it. When you add async to a function it does two things. It makes it so the function itself returns (or wraps what gets returned in) a promise and makes it so you can use await inside of it.

Error Handling
You may have noticed we cheated a little bit. In our original code we had a way to catch any errors using .catch. When we switched to Async/Await, we removed that code. With Async/Await, the most common approach is to wrap your code in a try/catch block to be able to catch the error.

$("#btn").on("click", async () => {
  try {
    const user = await getUser('tylermcginnis')
    const weather = await getWeather(user.location)

    updateUI({
      user,
      weather,
    })
  } catch (e) {
    showError(e)
  }
}) */

}

function GuidetoJavaScriptsprototype(){
  /*You can’t get very far in JavaScript without dealing with objects. They’re foundational to almost every aspect of the JavaScript programming language. In fact, learning how to create objects is probably one of the first things you studied when you were starting out. With that said, in order to most effectively learn about prototypes in JavaScript, we’re going to channel our inner Jr. developer and go back to the basics.

Objects are key/value pairs. The most common way to create an object is with curly braces {} and you add properties and methods to an object using dot notation.

let animal = {}
animal.name = 'Leo'
animal.energy = 10

animal.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

animal.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

animal.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}
Simple. Now odds are in our application we’ll need to create more than one animal. Naturally, the next step for this would be to encapsulate that logic inside of a function that we can invoke whenever we needed to create a new animal. We’ll call this pattern Functional Instantiation and we’ll call the function itself a “constructor function” since it’s responsible for “constructing” a new object.

Functional Instantiation
function Animal (name, energy) {
  let animal = {}
  animal.name = name
  animal.energy = energy

  animal.eat = function (amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }

  animal.sleep = function (length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }

  animal.play = function (length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)
"I thought this was an Advanced JavaScript course...?" - Your brain It is. We’ll get there.

Now whenever we want to create a new animal (or more broadly speaking a new “instance”), all we have to do is invoke our Animal function, passing it the animal’s name and energy level. This works great and it’s incredibly simple. However, can you spot any weaknesses with this pattern? The biggest and the one we’ll attempt to solve has to do with the three methods - eat, sleep, and play. Each of those methods are not only dynamic, but they’re also completely generic. What that means is that there’s no reason to re-create those methods as we’re currently doing whenever we create a new animal. We’re just wasting memory and making each animal object bigger than it needs to be. Can you think of a solution? What if instead of re-creating those methods every time we create a new animal, we move them to their own object then we can have each animal reference that object? We can call this pattern Functional Instantiation with Shared Methods, wordy but descriptive.

Functional Instantiation with Shared Methods
const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  },
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  },
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

function Animal (name, energy) {
  let animal = {}
  animal.name = name
  animal.energy = energy
  animal.eat = animalMethods.eat
  animal.sleep = animalMethods.sleep
  animal.play = animalMethods.play

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)
By moving the shared methods to their own object and referencing that object inside of our Animal function, we’ve now solved the problem of memory waste and overly large animal objects.

Object.create
Let’s improve our example once again by using Object.create. Simply put, Object.create allows you to create an object which will delegate to another object on failed lookups. Put differently, Object.create allows you to create an object and whenever there’s a failed property lookup on that object, it can consult another object to see if that other object has the property. That was a lot of words. Let’s see some code.

const parent = {
  name: 'Stacey',
  age: 35,
  heritage: 'Irish'
}

const child = Object.create(parent)
child.name = 'Ryan'
child.age = 7

console.log(child.name) // Ryan
console.log(child.age) // 7
console.log(child.heritage) // Irish
So in the example above, because child was created with Object.create(parent), whenever there’s a failed property lookup on child, JavaScript will delegate that look up to the parent object. What that means is that even though child doesn’t have a heritage property, parent does so when you log child.heritage you’ll get the parent's heritage which was Irish.

Now with Object.create in our tool shed, how can we use it in order to simplify our Animal code from earlier? Well, instead of adding all the shared methods to the animal one by one like we’re doing now, we can use Object.create to delegate to the animalMethods object instead. To sound really smart, let’s call this one Functional Instantiation with Shared Methods and Object.create 🙃

Functional Instantiation with Shared Methods and Object.create
const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  },
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  },
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

function Animal (name, energy) {
  let animal = Object.create(animalMethods)
  animal.name = name
  animal.energy = energy

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

leo.eat(10)
snoop.play(5)
📈 So now when we call leo.eat, JavaScript will look for the eat method on the leo object. That lookup will fail, then, because of Object.create, it’ll delegate to the animalMethods object which is where it’ll find eat.

So far, so good. There are still some improvements we can make though. It seems just a tad “hacky” to have to manage a separate object (animalMethods) in order to share methods across instances. That seems like a common feature that you’d want to be implemented into the language itself. Turns out it is and it’s the whole reason you’re here - prototype.

So what exactly is prototype in JavaScript? Well, simply put, every function in JavaScript has a prototype property that references an object. Anticlimactic, right? Test it out for yourself.

function doThing () {}
console.log(doThing.prototype) // {}
What if instead of creating a separate object to manage our methods (like we’re doing with animalMethods), we just put each of those methods on the Animal function’s prototype? Then all we would have to do is instead of using Object.create to delegate to animalMethods, we could use it to delegate to Animal.prototype. We’ll call this pattern Prototypal Instantiation.

Prototypal Instantiation
function Animal (name, energy) {
  let animal = Object.create(Animal.prototype)
  animal.name = name
  animal.energy = energy

  return animal
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

leo.eat(10)
snoop.play(5)
👏👏👏 Hopefully, you just had a big “aha” moment. Again, prototype is just a property that every function in JavaScript has and, as we saw above, it allows us to share methods across all instances of a function. All our functionality is still the same but now instead of having to manage a separate object for all the methods, we can just use another object that comes built into the Animal function itself, Animal.prototype.

Let’s. Go. Deeper.
At this point we know three things:

How to create a constructor function.
How to add methods to the constructor function’s prototype.
How to use Object.create to delegate failed lookups to the function’s prototype.
Those three tasks seem pretty foundational to any programming language. Is JavaScript really that bad that there’s no easier, “built-in” way to accomplish the same thing? As you can probably guess at this point there is, and it’s by using the new keyword.

What’s nice about the slow, methodical approach we took to get here is you’ll now have a deep understanding of exactly what the new keyword in JavaScript is doing under the hood.

Looking back at our Animal constructor, the two most important parts were creating the object and returning it. Without creating the object with Object.create, we wouldn’t be able to delegate to the function’s prototype on failed lookups. Without the return statement, we wouldn’t ever get back the created object.

function Animal (name, energy) {
  let animal = Object.create(Animal.prototype)
  animal.name = name
  animal.energy = energy

  return animal
}
Here’s the cool thing about new - when you invoke a function using the new keyword, those two lines are done for you implicitly (“under the hood”) and the object that is created is called this.

Using comments to show what happens under the hood and assuming the Animal constructor is called with the new keyword, it can be re-written as this.

function Animal (name, energy) {
  // const this = Object.create(Animal.prototype)

  this.name = name
  this.energy = energy

  // return this
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)
and without the “under the hood” comments

function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)
Again the reason this works and that the this object is created for us is because we called the constructor function with the new keyword. If you leave off new when you invoke the function, that this object never gets created nor does it get implicitly returned. We can see the issue with this in the example below.

function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

const leo = Animal('Leo', 7)
console.log(leo) // undefined
The name for this pattern is Pseudoclassical Instantiation.

If JavaScript isn’t your first programming language, you might be getting a little restless.

“WTF this dude just re-created a crappier version of a Class” - You

For those unfamiliar, a Class allows you to create a blueprint for an object. Then whenever you create an instance of that Class, you get an object with the properties and methods defined in the blueprint.

Sound familiar? That’s basically what we did with our Animal constructor function above. However, instead of using the class keyword, we just used a regular old JavaScript function to re-create the same functionality. Granted, it took a little extra work as well as some knowledge about what happens “under the hood” of JavaScript but the results are the same.

Here’s the good news. JavaScript isn’t a dead language. It’s constantly being improved and added to by the TC-39 committee. What that means is that even though the initial version of JavaScript didn’t support classes, there’s no reason they can’t be added to the official specification. In fact, that’s exactly what the TC-39 committee did. In 2015, EcmaScript (the official JavaScript specification) 6 was released with support for Classes and the class keyword. Let’s see how our Animal constructor function above would look like with the new class syntax.

class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)
Pretty clean, right?

So if this is the new way to create classes, why did we spend so much time going over the old way? The reason for that is because the new way (with the class keyword) is primarily just “syntactical sugar” over the existing way we’ve called the pseudo-classical pattern. In order to fully understand the convenience syntax of ES6 classes, you first must understand the pseudo-classical pattern.

At this point we’ve covered the fundamentals of JavaScript’s prototype. The rest of this post will be dedicated to understanding other “good to know” topics related to it. In another post, we’ll look at how we can take these fundamentals and use them to understand how inheritance works in JavaScript.

Array Methods
We talked in depth above about how if you want to share methods across instances of a class, you should stick those methods on the class’ (or function’s) prototype. We can see this same pattern demonstrated if we look at the Array class. Historically you’ve probably created your arrays like this

const friends = []
Turns out that’s just sugar over creating a new instance of the Array class.

const friendsWithSugar = []

const friendsWithoutSugar = new Array()
One thing you might have never thought about is how does every instance of an array have all of those built-in methods (splice, slice, pop, etc)?

Well as you now know, it’s because those methods live on Array.prototype and when you create a new instance of Array, you use the new keyword which sets up that delegation to Array.prototype on failed lookups.

We can see all the array’s methods by simply logging Array.prototype.

console.log(Array.prototype)

/*
  concat: ƒn concat()
  constructor: ƒn Array()
  copyWithin: ƒn copyWithin()
  entries: ƒn entries()
  every: ƒn every()
  fill: ƒn fill()
  filter: ƒn filter()
  find: ƒn find()
  findIndex: ƒn findIndex()
  forEach: ƒn forEach()
  includes: ƒn includes()
  indexOf: ƒn indexOf()
  join: ƒn join()
  keys: ƒn keys()
  lastIndexOf: ƒn lastIndexOf()
  length: 0n
  map: ƒn map()
  pop: ƒn pop()
  push: ƒn push()
  reduce: ƒn reduce()
  reduceRight: ƒn reduceRight()
  reverse: ƒn reverse()
  shift: ƒn shift()
  slice: ƒn slice()
  some: ƒn some()
  sort: ƒn sort()
  splice: ƒn splice()
  toLocaleString: ƒn toLocaleString()
  toString: ƒn toString()
  unshift: ƒn unshift()
  values: ƒn values()


The exact same logic exists for Objects as well. All objects will delegate to Object.prototype on failed lookups which is why all objects have methods like toString and hasOwnProperty.

Static Methods
Up until this point we’ve covered the why and how of sharing methods between instances of a Class. However, what if we had a method that was important to the Class, but didn’t need to be shared across instances? For example, what if we had a function that took in an array of Animal instances and determined which one needed to be fed next? We’ll call it nextToEat.

function nextToEat (animals) {
  const sortedByLeastEnergy = animals.sort((a,b) => {
    return a.energy - b.energy
  })

  return sortedByLeastEnergy[0].name
}
It doesn’t make sense to have nextToEat live on Animal.prototype since we don’t want to share it amongst all instances. Instead, we can think of it as more of a helper method. So if nextToEat shouldn’t live on Animal.prototype, where should we put it? Well, the obvious answer is we could just stick nextToEat in the same scope as our Animal class then reference it when we need it as we normally would.

class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

function nextToEat (animals) {
  const sortedByLeastEnergy = animals.sort((a,b) => {
    return a.energy - b.energy
  })

  return sortedByLeastEnergy[0].name
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

console.log(nextToEat([leo, snoop])) // Leo
Now this works, but there’s a better way.

Whenever you have a method that is specific to a class itself but doesn’t need to be shared across instances of that class, you can add it as a static property of the class.

class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
  static nextToEat(animals) {
    const sortedByLeastEnergy = animals.sort((a,b) => {
      return a.energy - b.energy
    })

    return sortedByLeastEnergy[0].name
  }
}
Now, because we added nextToEat as a static property on the class, it lives on the Animal class itself (not its prototype) and can be accessed using Animal.nextToEat.

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

console.log(Animal.nextToEat([leo, snoop])) // Leo
Because we’ve followed a similar pattern throughout this post, let’s take a look at how we would accomplish this same thing using ES5. In the example above we saw how using the static keyword would put the method directly onto the class itself. With ES5, this same pattern is as simple as just manually adding the method to the function object.

function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

Animal.nextToEat = function (animals) {
  const sortedByLeastEnergy = animals.sort((a,b) => {
    return a.energy - b.energy
  })

  return sortedByLeastEnergy[0].name
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)

console.log(Animal.nextToEat([leo, snoop])) // Leo
Getting the prototype of an object
Regardless of whichever pattern you used to create an object, getting that object’s prototype can be accomplished using the Object.getPrototypeOf method.

function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = new Animal('Leo', 7)
const prototype = Object.getPrototypeOf(leo)

console.log(prototype)
// {constructor: ƒ, eat: ƒ, sleep: ƒ, play: ƒ}

prototype === Animal.prototype // true
There are two important takeaways from the code above.

First, you’ll notice that proto is an object with 4 methods, constructor, eat, sleep, and play. That makes sense. We used getPrototypeOf passing in the instance, leo getting back that instances’ prototype, which is where all of our methods are living. This tells us one more thing about prototype as well that we haven’t talked about yet. By default, the prototype object will have a constructor property which points to the original function or the class that the instance was created from. What this also means is that because JavaScript puts a constructor property on the prototype by default, any instances will be able to access their constructor via instance.constructor.

The second important takeaway from above is that Object.getPrototypeOf(leo) === Animal.prototype. That makes sense as well. The Animal constructor function has a prototype property where we can share methods across all instances and getPrototypeOf allows us to see the prototype of the instance itself.

function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

const leo = new Animal('Leo', 7)
console.log(leo.constructor) // Logs the constructor function
To tie in what we talked about earlier with Object.create, the reason this works is because any instances of Animal are going to delegate to Animal.prototype on failed lookups. So when you try to access leo.constructor, leo doesn’t have a constructor property so it will delegate that lookup to Animal.prototype which indeed does have a constructor property. If this paragraph didn’t make sense, go back and read about Object.create above.

You may have seen __proto__ used before to get an instances’ prototype. That’s a relic of the past. Instead, use Object.getPrototypeOf(instance) as we saw above.

Determining if a property lives on the prototype
There are certain cases where you need to know if a property lives on the instance itself or if it lives on the prototype the object delegates to. We can see this in action by looping over our leo object we’ve been creating. Let’s say the goal was the loop over leo and log all of its keys and values. Using a for in loop, that would probably look like this.

function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = new Animal('Leo', 7)

for(let key in leo) {
  console.log(`Key: ${key}. Value: ${leo[key]}`)
}
What would you expect to see? Most likely, it was something like this -

Key: name. Value: Leo
Key: energy. Value: 7
However, what you saw if you ran the code was this -

Key: name. Value: Leo
Key: energy. Value: 7
Key: eat. Value: function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}
Key: sleep. Value: function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}
Key: play. Value: function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}
Why is that? Well, a for in loop is going to loop over all of the enumerable properties on both the object itself as well as the prototype it delegates to. Because by default any property you add to the function’s prototype is enumerable, we see not only name and energy, but we also see all the methods on the prototype - eat, sleep, and play. To fix this, we either need to specify that all of the prototype methods are non-enumerable or we need a way to only console.log if the property is on the leo object itself and not the prototype that leo delegates to on failed lookups. This is where hasOwnProperty can help us out.

hasOwnProperty is a property on every object that returns a boolean indicating whether the object has the specified property as its own property rather than on the prototype the object delegates to. That’s exactly what we need. Now with this new knowledge, we can modify our code to take advantage of hasOwnProperty inside of our for in loop.

...

const leo = new Animal('Leo', 7)

for(let key in leo) {
  if (leo.hasOwnProperty(key)) {
    console.log(`Key: ${key}. Value: ${leo[key]}`)
  }
}
And now what we see are only the properties that are on the leo object itself rather than on the prototype leo delegates to as well.

Key: name. Value: Leo
Key: energy. Value: 7
If you’re still a tad confused about hasOwnProperty, here is some code that may clear it up.

function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = new Animal('Leo', 7)

leo.hasOwnProperty('name') // true
leo.hasOwnProperty('energy') // true
leo.hasOwnProperty('eat') // false
leo.hasOwnProperty('sleep') // false
leo.hasOwnProperty('play') // false
Check if an object is an instance of a Class
Sometimes you want to know whether an object is an instance of a specific class. To do this, you can use the instanceof operator. The use case is pretty straight forward but the actual syntax is a bit weird if you’ve never seen it before. It works like this

object instanceof Class
The statement above will return true if object is an instance of Class and false if it isn’t. Going back to our Animal example we’d have something like this.

function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

function User () {}

const leo = new Animal('Leo', 7)

leo instanceof Animal // true
leo instanceof User // false
The way that instanceof works is it checks for the presence of constructor.prototype in the object’s prototype chain. In the example above, leo instanceof Animal is true because Object.getPrototypeOf(leo) === Animal.prototype. In addition, leo instanceof User is false because Object.getPrototypeOf(leo) !== User.prototype.

Creating new agnostic constructor functions
Can you spot the error in the code below?

function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

const leo = Animal('Leo', 7)
Even seasoned JavaScript developers will sometimes get tripped up on the example above. Because we’re using the pseudoclassical pattern that we learned about earlier, when the Animal constructor function is invoked, we need to make sure we invoke it with the new keyword. If we don’t, then the this keyword won’t be created and it also won’t be implicitly returned.

As a refresher, the commented out lines are what happens behind the scenes when you use the new keyword on a function.

function Animal (name, energy) {
  // const this = Object.create(Animal.prototype)

  this.name = name
  this.energy = energy

  // return this
}
This seems like too important of a detail to leave up to other developers to remember. Assuming we’re working on a team with other developers, is there a way we could ensure that our Animal constructor is always invoked with the new keyword? Turns out there is and it’s by using the instanceof operator we learned about previously.

If the constructor was called with the new keyword, then this inside of the body of the constructor will be an instanceof the constructor function itself. That was a lot of big words. Here’s some code.

function Animal (name, energy) {
  if (this instanceof Animal === false) {
    console.warn('Forgot to call Animal with the new keyword')
  }

  this.name = name
  this.energy = energy
}
Now instead of just logging a warning to the consumer of the function, what if we re-invoke the function but with the new keyword this time?

function Animal (name, energy) {
  if (this instanceof Animal === false) {
    return new Animal(name, energy)
  }

  this.name = name
  this.energy = energy
}
Now regardless of if Animal is invoked with the new keyword, it’ll still work properly.

Re-creating Object.create
Throughout this post, we’ve relied heavily upon Object.create in order to create objects which delegate to the constructor function’s prototype. At this point, you should know how to use Object.create inside of your code but one thing that you might not have thought of is how Object.create actually works under the hood. In order for you to really understand how Object.create works, we’re going to re-create it ourselves. First, what do we know about how Object.create works?

It takes in an argument that is an object.
It creates an object that delegates to the argument object on failed lookups.
It returns the new created object.
Let’s start off with #1.

Object.create = function (objToDelegateTo) {

}
Simple enough.

Now #2 - we need to create an object that will delegate to the argument object on failed lookups. This one is a little more tricky. To do this, we’ll use our knowledge of how the new keyword and prototypes work in JavaScript. First, inside the body of our Object.create implementation, we’ll create an empty function. Then, we’ll set the prototype of that empty function equal to the argument object. Then, in order to create a new object, we’ll invoke our empty function using the new keyword. If we return that newly created object, that’ll finish #3 as well.

Object.create = function (objToDelegateTo) {
  function Fn(){}
  Fn.prototype = objToDelegateTo
  return new Fn()
}
Wild. Let’s walk through it.

When we create a new function, Fn in the code above, it comes with a prototype property. When we invoke it with the new keyword, we know what we’ll get back is an object that will delegate to the function’s prototype on failed lookups. If we override the function’s prototype, then we can decide which object to delegate to on failed lookups. So in our example above, we override Fn's prototype with the object that was passed in when Object.create was invoked which we call objToDelegateTo.

Note that we’re only supporting a single argument to Object.create. The official implementation also supports a second, optional argument which allows you to add more properties to the created object.

Arrow Functions
Arrow functions don’t have their own this keyword. As a result, arrow functions can’t be constructor functions and if you try to invoke an arrow function with the new keyword, it’ll throw an error.

const Animal = () => {}

const leo = new Animal() // Error: Animal is not a constructor
Also, because we demonstrated above that the pseudo-classical pattern can’t be used with arrow functions, arrow functions also don’t have a prototype property.

const Animal = () => {}
console.log(Animal.prototype) // undefined 
  */
}


variableDeclarationVSInitializacion();
ObjectandArrayDestructuring();
ShorthandProperties();
computedPropertyNames();
TemplateLiterals();
ArrowFunctions();
DefaultParameters();
CompilingvsPolyfillswithBabel();
CallbacksPromisesAsyncAwait();
GuidetoJavaScriptsprototype();

function privateAndPublicClassFields(){
  /*Here’s a simple Player class which encompasses everything we discussed in regards to ES6 classes.

class Player {
  constructor() {
    this.points = 0
    this.assists = 0
    this.rebounds = 0
    this.steals = 0
  }
  addPoints(amount) {
    this.points += amount
  }
  addAssist() {
    this.assists++
  }
  addRebound() {
    this.rebounds++
  }
  addSteal() {
    this.steals++
  }
}
Looking at that code, is there any way we can make it a little more intuitive? The methods are fine, those come pretty naturally. What about the constructor? What even is a constructor and why do we have to define instance values there? Now, there are answers to those questions but why can’t we just add state to our instances just like we did with the methods? Something like this

class Player {
  points = 0
  assists = 0
  rebounds = 0
  steals = 0
  addPoints(amount) {
    this.points += amount
  }
  addAssist() {
    this.assists++
  }
  addRebound() {
    this.rebounds++
  }
  addSteal() {
    this.steals++
  }
}
It turns out this is the foundation for the Class Fields Declaration proposal which is currently at Stage 3 in the TC-39 process. This proposal will allow you to add instance properties directly as a property on the class without having to use the constructor method. Pretty slick, but where this proposal really shines is if we look at some React code. Here’s a typical React component. It has local state, some methods, and a few static properties being added to the class.

class PlayerInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  render() {
    ...
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

PlayerInput.defaultProps = {
  label: 'Username',
}
Let’s see how the new Class Fields proposal improves the code above First, we can take our state variable out of the constructor and define it directly as a property (or “field”) on the class.

class PlayerInput extends Component {
  state = {
    username: ''
  }
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  render() {
    ...
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

PlayerInput.defaultProps = {
  label: 'Username',
}
Cool, but nothing to get too excited over. Let’s keep going. In the previous post, we talked about how you can add static methods to the class itself by using the static keyword. However, according to the ES6 class specification, this only works with methods, not values. That’s why in the code above we have to add propTypes and defaultProps to PlayerInput after we define it and not in the class body. Again, why can’t those go directly on the class body just as a static method would? Well, the good news is this is encompassed in the Class Fields proposal as well. So now instead of just defining static methods in the class body, you can also define static values. What that means for our code is we can move propTypes and defaultProps up into the class definition.

class PlayerInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  static defaultProps = {
    label: 'Username'
  }
  state = {
    username: ''
  }
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  render() {
    ...
  }
}
Much better, but we still have that ugly constructor method and super invocation. Again, the reason we need the constructor right now is in order to bind the handleChange method to the correct context. If we could figure out another way to make sure handleChange was always invoked in the correct context, we could get rid of the constructor altogether.

If you’ve used arrow functions before, you know that they don’t have their own this keyword. Instead, the this keyword is bound lexically. That’s a fancy way of saying when you use the this keyword inside of an arrow function, things behave how you’d expect them to. Taking that knowledge and combining it with the “Class Fields” proposal, what if we swapped out the handleChange method for an arrow function? Seems a little weird but by doing this we’d get rid of the .bind issue altogether since, again, arrow functions bind this lexically.

class PlayerInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  static defaultProps = {
    label: 'Username'
  }
  state = {
    username: ''
  }
  handleChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  render() {
    ...
  }
}
Well, would you look at that? That’s much better than the original class we started with and it’s all thanks to the Class Fields proposal which will be part of the official EcmaScript specification soon.

From a developer experience standpoint, Class Fields are a clear win. However, there are some downsides to them that are rarely talked about. In the last post, we talked about how ES6 classes are just sugar over what we called the “pseudo-classical” pattern. Meaning, when you add a method to a class, that’s really like adding a method to the function’s prototype.

class Animal {
  eat() {}
}

// Is equivalent to

function Animal () {}
Animal.prototype.eat = function () {}
This is performant because eat is defined once and shared across all instances of the class. What does this have to do with Class Fields? Well, as we saw above, Class Fields are added to the instance. This means that, when using Class Fields, for each instance we create we’ll be re-creating all of the methods in memory.

class Animal {
  eat() {}
  sleep = () => {}
}

// Is equivalent to

function Animal () {
  this.sleep = function () {}
}

Animal.prototype.eat = function () {}
Notice how sleep gets put on the instance and not on Animal.prototype. Is this a bad thing? Well, it can be. Making broad statements about performance without measuring is generally a bad idea. The question you need to answer in your application is if the developer experience you gain from Class Fields outweighs the potential performance hit.

If you want to use any of what we’ve talked about so far in your app, you’ll need to use the babel-plugin-transform-class-properties plugin.

Private Fields
Another aspect of the Class Fields proposal are “private fields”. Sometimes when you’re building a class, you want to have private values that aren’t exposed to the outside world. Historically in JavaScript, because we’ve lacked the ability to have truly private values, we’ve marked them with an underscore.

class Car {
  _milesDriven = 0
  drive(distance) {
    this._milesDriven += distance
  }
  getMilesDriven() {
    return this._milesDriven
  }
}
In the example above, we’re relying on the consumer of the Car class to get the car’s mileage by invoking the getMilesDriven method. However, because there’s really nothing making _milesDriven private, any instance can access it.

const tesla = new Car()
tesla.drive(10)
console.log(tesla._milesDriven)
There are fancy (hacky) ways around this problem using WeakMaps, but it would be nice if a simpler solution existed. Again, the Class Fields proposal is coming to our rescue. According to the proposal, you can create a private field using a #. Yes, you read that right, #. Let’s take a look at what that does to our code,

class Car {
  #milesDriven = 0
  drive(distance) {
    this.#milesDriven += distance
  }
  getMilesDriven() {
    return this.#milesDriven
  }
}
and we can go one step further with the shorthand syntax

class Car {
  #milesDriven = 0
  drive(distance) {
    #milesDriven += distance
  }
  getMilesDriven() {
    return #milesDriven
  }
}

const tesla = new Car()
tesla.drive(10)
tesla.getMilesDriven() // 10
tesla.#milesDriven // Invalid */
}
