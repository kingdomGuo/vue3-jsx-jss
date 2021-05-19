
import { defineComponent } from 'vue'
import { createStyleObject, JssProvider, createThemes } from 'vue3-jsx-jss'
const generateId = (rule: any, sheet:any) => 'some-id'
// Creating a namespaced theming object.
const ThemeContext = Symbol('')
const defaultTheme = Symbol('')
const theming = createThemes(ThemeContext, defaultTheme)
const { ThemeProvider, useTheme } = theming

const useStylesKK = createStyleObject(
  {
    button: {
      background: ({ theme }) => {
        console.log(theme)
        return theme.colorPrimary
      }
    }
    // Passing theming object to `createUseStyles()`
  },
  { theming }
)
const useStyles = createStyleObject({
  myButton: {
    color: 'green',
    backgroundColor: 'darkgoldenrod',
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
interface MyProps {
  'spacing': number;
  'fontWeight': string;
  'labelColor': string;
}

const useStylesM = createStyleObject({

  myButton: (MyPropss: MyProps) => {
    console.log(MyPropss)
    return { padding: MyPropss.spacing }
  },

  myLabel: () => ({
    display: 'block',
    color: 'red',
    fontWeight: 'bolde'
    // fontStyle: props.fontStyle,
  })
})
// const useStylesM = createStyleObject({
//   myButton: {
//     padding: (props:MyProps) => props.spacing
//   },
//   myLabel: (props:MyProps) => ({
//     display: 'block',
//     color: props.labelColor,
//     fontWeight: props.fontWeight,
//     fontStyle: props.fontStyle
//   })
// })
const myTheme = {
  colorPrimary: 'green'
}
const Button = defineComponent({
  props: {
    spacing: {
      type: Number,
      default: 10
    },
    fontWeight: {
      type: String,
      default: 'bold'
    },
    labelColor: {
      type: String,
      default: 'red'
    }
  },
  setup (props, { slots }) {
    // const classes = useStyles().value
    console.log({ ...props })
    const classess = useStylesM({ ...props }).value
    const theme = useTheme().value
    const classes = useStylesKK({ ...props, theme }).value
    console.log(classess)
    return () => (
      <JssProvider generateId={generateId}>
        <button class={[classes.button, classess.myButton]}>
          <span class={classess.myLabel}>{slots.default && slots.default()}</span>
        </button>
      </JssProvider>
    )
  }
})
export default defineComponent({
  name: 'App',
  setup () {
    return () => {
      return <ThemeProvider theme={myTheme}><Button>Submit</Button></ThemeProvider>
    }
  }

})
