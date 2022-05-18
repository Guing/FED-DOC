import { defineComponent, ref, Ref, reactive, watchEffect } from 'vue'
import { createUseStyles } from 'vue-jss'

import MonacoEditor from './components/MonacoEditor'

import demos from './demos'

import SchemaForm, { ThemeProvider } from '../lib'

import Theme from '../lib/theme-default'

// TODO: 在lib中export
type Schema = any
type UISchema = any

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '1200px',
    margin: '0 auto',
  },
  menu: {
    marginBottom: 20,
  },
  code: {
    width: 700,
    flexShrink: 0,
  },
  codePanel: {
    minHeight: 400,
    marginBottom: 20,
  },
  uiAndValue: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '46%',
    },
  },
  content: {
    display: 'flex',
  },
  form: {
    padding: '0 20px',
    flexGrow: 1,
  },
  menuButton: {
    appearance: 'none',
    borderWidth: 0,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'inline-block',
    padding: 15,
    borderRadius: 5,
    '&:hover': {
      background: '#efefef',
    },
  },
  menuSelected: {
    background: '#337ab7',
    color: '#fff',
    '&:hover': {
      background: '#337ab7',
    },
  },
})

function toJSON(code: any) {
  return JSON.stringify(code, null, 2)
}
export default defineComponent({
  name: 'App',
  setup() {
    const selectedRef = ref(0)
    const demo: {
      schema: Schema
      uiSchema: UISchema
      data: any
      schemaCode: string
      uiSchemaCode: string
      dataCode: string
    } = reactive({
      schema: {},
      uiSchema: {},
      data: {},
      schemaCode: '',
      uiSchemaCode: '',
      dataCode: '',
    })
    watchEffect(() => {
      let newDemo = demos[selectedRef.value]
      demo.schema = newDemo.schema
      demo.uiSchema = newDemo.uiSchema
      demo.data = newDemo.default
      demo.schemaCode = toJSON(newDemo.schema)
      demo.uiSchemaCode = toJSON(newDemo.uiSchema)
      demo.dataCode = toJSON(newDemo.default)
    })
    function handleCodeChange(
      filed: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) {
      try {
        const json = JSON.parse(value)
        demo[filed] = json
        ;(demo as any)[filed + 'Code'] = value
      } catch (e) {
        console.log(e)
      }
    }
    const handleChange = (v: any) => {
      demo.data = v
      demo.dataCode = toJSON(v)
    }
    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)
    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value
      const selected = selectedRef.value

      return (
        // <StyleThemeProvider>
        // <VJSFThemeProvider theme={theme as any}>
        <div class={classes.container}>
          <div class={classes.menu}>
            <h1>Vue3 JsonSchema Form</h1>
            <div>
              {demos.map((demo, index) => (
                <button
                  class={{
                    [classes.menuButton]: true,
                    [classes.menuSelected]: index === selected,
                  }}
                  onClick={() => (selectedRef.value = index)}
                >
                  {demo.name}
                </button>
              ))}
            </div>
          </div>
          <div class={classes.content}>
            <div class={classes.code}>
              <MonacoEditor
                code={demo.schemaCode}
                class={classes.codePanel}
                onChange={handleSchemaChange}
                title="Schema"
              />
              <div class={classes.uiAndValue}>
                <MonacoEditor
                  code={demo.uiSchemaCode}
                  class={classes.codePanel}
                  onChange={handleUISchemaChange}
                  title="UISchema"
                />
                <MonacoEditor
                  code={demo.dataCode}
                  class={classes.codePanel}
                  onChange={handleDataChange}
                  title="Value"
                />
              </div>
            </div>
            <div class={classes.form}>
              <ThemeProvider theme={Theme}>
                <SchemaForm
                  schema={demo.schema}
                  onChange={handleChange}
                  value={demo.data}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
      )
    }
  },
})
