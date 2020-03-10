# 4.3.2 React State

---

## Application state

State is _dynamic data_. Things that change.

---

## Example

```jsx live=true
const Counter = () => {
  const [count, setCount] = React.useState(0);  // 0 is initial value

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  )
}

render(<Counter />)
```

---

# Deconstruction

These snippets are identical:

```jsx
// Using deconstruction:
const [value, setValue] = React.useState(null);
```

```jsx
// Without deconstruction:
const valueState = React.useState(null);
const value = valueState[0];
const setValue = valueState[1];
```

---

# `useState`

"useState" is a **React hook**.

Hooks are way of "hooking into" React's abilities, like managing state.

---


# 🙅‍♀️ Mutating state

This snippet won't throw an error, but it also won't work:

```jsx
let [value, setValue] = React.useState(null);

value = 10;
```

---

# Re-rendering

When you call the state setter, it _triggers a re-render_.

This is why the values on the screen change.

---

# Forms in React

---

`value` and `onChange`

```jsx live=true
const Name = () => {
  const [name, setName] = React.useState('');

  //can put a handler here

  return (
    <div style={{ fontSize: 32 }}>
      <input
        type="text"
        value={name}
        onChange={ev => {
          setName(ev.target.value); //then call the handle here instead of this format
        }}
        style={{ fontSize: 32 }}
      />
      <p>Your name is {name}</p>
    </div>
  )
}

render(<Name />)
```

<!--
// Extra Information...

- `onChange` takes a function that receives the "event". This is an object that holds data about what just happened.
- One of those pieces of data is the "target", the DOM node that the event was triggered on.
- Input DOM nodes have a `value` property, which holds the newly-set value

By calling `setName` with `ev.target.value`, we ensure that React is kept in sync with the value being put in this text input.
-->

---

# Exercises

What is logged in the following scenarios?

---

The button is clicked **3 times**:

```jsx live=true inline=true
function SomeComponent() {
  const [count, setCount] = React.useState(10);

  console.log(count);

  return (
    <button onClick={() => setCount(count + 1)}>
      One, Two, Three!
    </button>
  )
}
```

---

The user types "!" in the input

```jsx live=true inline=true
function SomeComponent() {
  const [thing, setThing] = React.useState("Hi");

  console.log(thing);

  return (
    <input
      value={thing}
      onChange={(ev) =>
        setThing(ev.target.value)
      }
    />
  )
}
```

---

The user types "123" in the input

```jsx live=true inline=true
function SomeComponent() {
  const [thing, setThing] = React.useState(0);

  console.log(thing);

  return (
    <input
      value={thing}
      onChange={(ev) =>
        setThing(
          thing +
          Number(ev.target.value)
        )
      }
    />
  )
}
```

---

The user clicks the checkbox

```jsx live=true inline=true
function SomeComponent() {
  const [agreed, setAgreed] = React.useState(false);

  console.log(agreed);

  return (
    <label>
      <input
        type="checkbox"
        checked={agreed}
        onChange={(ev) =>
          setAgreed(!agreed)
        }
      />
      Yes I want to receive spam
    </label>
  )
}
```
---

# State and Props

---

What happens when you want to share state between components?

---

```jsx
const App = () => {
  // const [searchTerm, setSearchTerm] = React.useState('');
  return (
    <>
      <SearchInput 
      // searchTerm={searchTerm}
      // searchTerm={setSearchTerm}/>
      <SearchResults />
    </>
  )
}

const SearchInput = (//{searchTerm, SetSearachTerm}) => {
  const [searchTerm, setSearchTerm] = React.useState(''); //MOVING THIS UP^

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(ev) => {
        setSearchTerm(ev.target.value);
      }}
    />
  );
}

const SearchResults = (//{searchTerm}) => {
  // ??
}
```

---

This is called "lifting state up".

---

# Exercises

Lift state up in the following examples

---

```jsx live=true
const Counter = ({count, setCount}) => { //blue was added
  const [count, setCount] = React.useState(0); //moving to app

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  )
};

const App = ({count, setCount}) => { //the blue in brackets {} was added
  //const [count, setCount] = React.useState(0);

  return (
    <>
      <p>The current count is: {count}</p>

      <Counter count={count} setCount={setCount}/> //the blue was added
    </>
  )
}

render(<App />)
```

---

```jsx live=true
const FavouriteFood = ({setFood}) => { //BLUE WAS ADDED
  const [food, setFood] = React.useState(''); //MOVING THIS

  return (
    <>
      <label>
        <input
          type="radio"
          name="food"
          value="pizza" //this can be removed
          // checked={food === 'pizza'} THIS IS REMOVED
          onChange={() => setFood('pizza')}
        />
        Pizza
      </label>
      <label>
        <input
          type="radio"
          name="food"
          value="broccoli" //this can be removed too
          // checked={food === 'broccoli'} THIS IS REMOVED TOO
          onChange={() => setFood('broccoli')}
        />
        Broccoli
      </label>
    </>
  )
};

const App = () => { 
    // const [food, setFood] = React.useState(''); // MOVED HERE

  return (
    <>
      My favourite food is: ???
      <br /><br />

      // <br />My favourite food is: {food}<br />
      <FavouriteFood food={food} setFood={setFood}/> //blue was added
    </>
  )
}

render(<App />)
```

---

### Conditional rendering

---

```jsx live=true inline=true
() => {
  const [showAnswer, setShowAnswer] = React.useState(false);

  return (
    <>
      <h3>What do you call someone with no body and no nose?</h3>

      {showAnswer && ( //&& is shorthand to toggle the false upstairs
        <p>Nobody knows!</p>
      )} 
      
      <button onClick={() => setShowAnswer(!showAnswer)}> //changed from true to !showAnswer
        Show punchline
      </button>
    </>
  )
}

```

---
