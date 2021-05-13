# vue3-jsx-jss

<p>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/static/v1?label=npm&message=7.6.0&color=orange" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/github/license/kingdomGuo/vue3-jsx-jss" alt="License"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/static/v1?label=minizipped%20size&message=5.63%20kB&color=blue" alt="Size"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://david-dm.org/pure-vue/vue-jss.svg" alt="Dependencies"></a>
</p>

vue-jss is fully tested css in js library for vue based on [jss](https://cssinjs.org/).

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

// Create your Styles. Remember, since Vue-JSS uses the default preset,
// most plugins are available without further configuration needed.
const useStyles = createUseStyles({
  myButton: {
    color: 'green',
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
、、、



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
