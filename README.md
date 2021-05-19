# vue3-jsx-jss

<p>
  <a href="https://www.npmjs.com/package/vue3-jsx-jss"><img src="https://img.shields.io/npm/v/vue3-jsx-jss" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue3-jsx-jss"><img src="https://img.shields.io/github/license/kingdomGuo/vue3-jsx-jss" alt="License"></a>
  <a href="https://www.npmjs.com/package/vue3-jsx-jss"><img src="https://img.shields.io/bundlephobia/minzip/vue3-jsx-jss" alt="Size"></a>
  <a href="https://www.npmjs.com/package/vue3-jsx-jss"><img src="https://david-dm.org/pure-vue/vue-jss.svg" alt="Dependencies"></a>
</p>

vue3-jsx-jss is fully tested css in js library for vue based on [jss](https://cssinjs.org/).

Thanks to the jss team, we can easily implement css in js in vue. Css in js is more powerful in:

- theming
- wrapper element or component
- reuse style fragment
- dynamic calculate some style
- easy to work with transition & animation (WIP)

We are purpose to change the ecology of css management in vue.

```shell
# npm
npm i vue3-jsx-jss -S

# or yarn
yarn add vue3-jsx-jss -S
```

# Usage

### Basic

```js
import { defineComponent } from 'vue'
import { createStyleObject } from 'vue3-jsx-jss'

// Create your Styles. Remember, since vue3-jsx-jss uses the default preset,
// most plugins are available without further configuration needed.
const useStyles = createStyleObject({
  myButton: {
    color: 'green',
    backgroundColor: 'darkgoldenrod',
    margin: {
      // jss-plugin-expand gives more readable syntax
      top: 5, // jss-plugin-default-unit makes this 5px
      right: 0,
      bottom: 0,
      left: '1rem',
    },
    '& span': {
      // jss-plugin-nested applies this to a child span
      fontWeight: 'bold', // jss-plugin-camel-case turns this into 'font-weight'
    },
  },
  myLabel: {
    fontStyle: 'italic',
  },
})

// Define the component using these styles and pass it the 'classes' prop.
// Use this to assign scoped class names.
const Button = defineComponent({
  setup(props, { slots }) {
    const classes = useStyles().value
    return () => (
      <button class={classes.myButton}>
        <span class={classes.myLabel}>{slots.default && slots.default()}</span>
      </button>
    )
  },
})

const App = () => <Button>Submit</Button>

render(<App />, document.getElementById('root'))
```

The above code will compile to

```html
<div id="root">
  <button class="Button-myButton-1-25">
    <span class="Button-myLabel-1-26">
      Submit
    </span>
  </button>
</div>
```

and

```css
.Button-myButton-1-25 {
  color: green;
  margin: 5px 0 0 1rem;
}
.Button-myButton-1-25 span {
  font-weight: bold;
}
.Button-myLabel-1-26 {
  font-style: italic;
}
```

### Dynamic values

You can use [function values](https://cssinjs.org/jss-syntax#function-values), Function rules and observables out of the box. Function values and function rules will receive a props object once the component receives new props or mounts for the first time.

Caveats:

Static properties being rendered first so that function values will have higher source order specificity.

```ts

import { defineComponent } from 'vue'
import { createUseStyles } from 'vue3-jsx-jss'

interface MyProps {
  spacing: number;
  fontWeight: string;
  labelColor: string;
  fontStyle: string;
}

const useStyles = createStyleObject({
  myButton: {
    padding: (props:MyProps) => props.spacing,
  },
  myLabel: (props:MyProps) => ({
    display: 'block',
    color: props.labelColor,
    fontWeight: props.fontWeight,
    fontStyle: props.fontStyle,
  }),
})

const Button = defineComponent({
  props: {
    spacing: {
      type: Number,
      default: 10,
    },
    fontWeight: {
      type: String,
      default: 'bold',
    },
    labelColor: {
      type: String,
      default: 'red',
    },
  },
  setup({ ...props }, { slots }) {
    const classes = useStyles(props).value
    return () => (
      <button class={classes.myButton}>
        <span class={classes.myLabel}>
          {slots.default && slots.default()}
        </span>
      </button>
    )
  },
})

const App = () => <Button fontStyle="italic">Submit</Button>
```
### Dynamic values

You can use [function values](https://cssinjs.org/jss-syntax#function-values), Function rules and observables out of the box. Function values and function rules will receive a props object once the component receives new props or mounts for the first time.

Caveats:

Static properties being rendered first so that function values will have higher source order specificity.

```ts
import { defineComponent } from 'vue'
import { createStyleObject } from 'vue3-jsx-jss'

interface MyProps {
  spacing: number;
  fontWeight: string;
  labelColor: string;
  fontStyle: string;

}

const useStyles = createStyleObject({
  myButton: {
    padding: (props: MyProps) => props.spacing,
  },
  myLabel: (props: MyProps) => ({
    display: 'block',
    color: props.labelColor,
    fontWeight: props.fontWeight,
    fontStyle: props.fontStyle,
  }),
})

const Button = defineComponent({
  props: {
    spacing: {
      type: Number,
      default: 10,
    },
    fontWeight: {
      type: String,
      default: 'bold',
    },
    labelColor: {
      type: String,
      default: 'red',
    },
  },
  setup(props, { slots }) {
    const classes = useStyles( {...props}).value
    return () => (
      <button class={classes.myButton}>
        <span class={classes.myLabel}>
          {slots.default && slots.default()}
        </span>
      </button>
    )
  },
})

const App = () => <Button fontStyle="italic">Submit</Button>
```
The above code will compile to

```html
<div id="root">
  <button class="Button-myButton-1-25">
    <span class="Button-myLabel-1-26">
      Submit
    </span>
  </button>
</div>
```

and

```css
.Button-myButton-1-25 {
  padding: 10px;
}
.Button-myLabel-1-26 {
  display: block;
  color: red;
  font-weight: bold;
  font-style: italic;
}

```

**Note: if you want to update style dynamic, you should pass down reactive data. You can use `toRef` to turn an normal object into Ref**

### Theming
The idea is that you define a theme, wrap your application with ThemeProvider and pass the theme object to ThemeProvider. Later you can access theme in your styles creator function and using a useTheme() hook. After that, you may change your theme, and all your components will get the new theme automatically.

Usage of ThemeProvider:

- It has a theme prop which should be an object or function:
  - If it is an Object and used in a root ThemeProvider, then it's intact and being passed down the Vnode Tree.
  - If it is Object and used in a nested ThemeProvider, then it gets merged with the theme from a parent ThemeProvider and passed down the vnode tree.
  - If it is Function and used in a nested ThemeProvider, then it's being applied to the theme from a parent ThemeProvider. If the result is an Object it will be passed down the vnode tree, throws otherwise.
- ThemeProvider only renders `slots.default`.

```ts
import { defineComonent } from 'vue'
import { createStyleObject, useTheme, ThemeProvider } from 'vue3-jsx-jss'

// Using `theme` function is better when you have many theme dependant styles.
let useStyles = createUseStyles(theme => ({
  button: {
    background: theme.colorPrimary,
  },
  label: {
    fontWeight: 'bold',
  },
}))

// Using function values might be better if you have only few theme dependant styles
// and also props or state is used for other values.
useStyles = createStyleObject({
  button: {
    background: ({ theme }) => theme.colorPrimary,
  },
  label: {
    fontWeight: 'bold',
  },
})

const Button = defineComponent({
  setup(props, { slots }) {
    const theme = useTheme().value
    const classes = useStyles({ ...props, theme }).value
    return () => (
      <button class={classes.button}>
        <span class={classes.label}>
          {slots.default && slots.default()}
        </span>
      </button>
    )
  },
})

const theme = {
  colorPrimary: 'green',
}

const App = () => (
  <ThemeProvider theme={theme}>
    <Button>I am a button with green background</Button>
  </ThemeProvider>
)
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

