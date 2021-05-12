
import { defineComponent } from 'vue'
import { createStyleObject } from '../lib'

const useStyles = createStyleObject({
  myButton: {
    color: 'green',
    margin: {
      left: '1rem',
      top: 5,
      right: 0,
      bottom: 0

    },
    background: 'red',
    // jss-plugin-nested applies this to a child span
    '& span': {
      fontWeight: 'bold' // jss-plugin-camel-case turns this into 'font-weight'
    }
  },
  myLabel: {
    fontStyle: 'italic'
  }
})

const Button = defineComponent({
  setup (props, { slots }) {
    const classes = useStyles().value
    console.log(classes)
    return () => (
      <button class={classes.myButton}>
        <span class={classes.myLabel}>{slots.default && slots.default()}</span>
      </button>
    )
  }
})
export default defineComponent({
  name: 'App',
  setup () {
    return () => {
      return <Button>Submit</Button>
    }
  }

})
