export default {
  name: 'Demo',
  schema: {
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        // minLength: 10,
        test: true,
        title: 'password',
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: 're try password',
      },
      color: {
        type: 'string',
        format: 'color',
        title: 'Input Color',
      },
    },
    // type: 'number',
  },

  uiSchema: {
    properties: {},
  },
  // default: 1,
  default: {
    pass1: 'abc',
    pass2: '1234567890',
    color: 'red',
  },
}
