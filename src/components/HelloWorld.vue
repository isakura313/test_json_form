<template>
  <div class="panel panel-default">
    {{schema}}
    <div class="panel-heading">Form</div>
    <div class="panel-body" v-if="loading">
      <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    </div>
  </div>
</template>



<script>
// import $RefParser from "@apidevtools/json-schema-ref-parser";
import JsonRefs from 'json-refs'
import $RefParser from "@apidevtools/json-schema-ref-parser";

console.log(JsonRefs);
// import VueFormGenerator from "vue-form-generator";
  import "vue-form-generator/dist/vfg.css";  // optional full css additions
  import schema from './sheme.json'

  // console.log(schema);

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    data: () => ({
      schema: {},
      loading: false,
      model: {
            "id": 1,
            "first_name": 'Pavel',
            "last_name": "yakupov",
            "email": 'isa@k.com',
            "title": 'asd',
            "desctription": 'asdd',
            "content": 'asda',
            "date": 'asd'
      },
         formOptions: {
            validateAfterLoad: false,
            validateAfterChanged: false
        }
    }),
  async mounted () {
    console.log(JsonRefs.findRefs(schema))
    console.log(await JsonRefs.resolveRefs(schema))
    //  console.log(JsonRefs.decodePath(schema))
$RefParser.dereference(schema, (err, schema) => {
  if (err) {
    console.error(err);
  }
  else {
    // `schema` is just a normal JavaScript object that contains your entire JSON Schema,
    // including referenced files, combined into a single object
    console.log(schema);
    this.schema = schema;
    this.loading = true;
  }
})
// })
  },
    methods: {
      submit () {
        // this.model contains the valid data according your JSON Schema.
        // You can submit your model to the server here
      }
    },
  //  components: { FormSchema }
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
