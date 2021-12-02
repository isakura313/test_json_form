<template>
  <FormSchema :schema="schema" v-model="model" @submit.prevent="submit">
    <button type="submit">Subscribe</button>
  </FormSchema>
</template>




<script>
import $RefParser from "@apidevtools/json-schema-ref-parser";

  import FormSchema from '@formschema/native'
  import schema from './sheme.json'

  // console.log(schema);

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    data: () => ({
      schema: {},
      model: {}
    }),
  created () {
$RefParser.dereference(schema, (err, schema) => {
  if (err) {
    console.error(err);
  }
  else {
    // `schema` is just a normal JavaScript object that contains your entire JSON Schema,
    // including referenced files, combined into a single object
    this.schema = schema
    console.log(this.schema)
  }
})
  },
    methods: {
      submit () {
        // this.model contains the valid data according your JSON Schema.
        // You can submit your model to the server here
      }
    },
   components: { FormSchema }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
