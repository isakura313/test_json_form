<template>
	<div class="panel panel-default">
		<!-- {{ schema }} -->
		<div class="panel-heading">Form</div>
		<div class="panel-body" v-if="loading">
			<!-- <Generator :schema="schema" :model="model" :options="formOptions"/> -->
			<vue-form-json-schema
				v-model="model"
				:schema="schema"
				:ui-schema="uiSchema"
				v-on:state-change="onChangeState"
				v-on:validated="onValidated"
			></vue-form-json-schema>
      <div>
        {{model}}
      </div>
		</div>
	</div>
</template>



<script>
	// import $RefParser from "@apidevtools/json-schema-ref-parser";
	import JsonRefs from "json-refs";
	import $RefParser from "@apidevtools/json-schema-ref-parser";

	console.log(JsonRefs);
	import schema from "./sheme.json";
	import VueFormJsonSchema from "vue-form-json-schema/dist/vue-form-json-schema.esm.js";

	export default {
		props: {
			msg: String,
		},
		data: () => ({
			schema: {},
			valid: false,
			uiSchema: [
				{
					component: "input",
					model: "Stream",
					fieldOptions: {
						class: ["form-control"],
						on: ["input"],
						attrs: {
							placeholder: "enter stream",
						},
					},
				},
				{
					component: "input",
					model: "Key Properties",
					fieldOptions: {
						class: ["form-control"],
						on: ["input"],
						attrs: {
							placeholder: "enter key",
						},
					},
				},
				{
					component: "input",
					model: "Bookmark Properties",
					fieldOptions: {
						class: ["form-control"],
						on: ["input"],
						attrs: {
							placeholder: "enter bookmark",
						},
					},
				},
				{
					component: "input",
					model: "Start State",
					fieldOptions: {
						class: ["form-control"],
						on: ["input"],
						attrs: {
							placeholder: "enter start state",   
						},
					},
				},
				{
					component: "textarea",
					model: "Query",
					fieldOptions: {
						class: ["form-control"],
						on: ["input"],
						attrs: {
							placeholder: "запрос к базе данных",   
						},
					},
				},
				{
					component: "input",
					model: "Connection String",
					fieldOptions: {
						class: ["form-control"],
						on: ["input"],
						attrs: {
							placeholder: "строка для подключения к базе данных",   
						},
					},
				},
			],
			loading: false,
			model: {},
			formOptions: {
				validateAfterLoad: false,
				validateAfterChanged: false,
			},
		}),
		async created() {
			console.log(JsonRefs.findRefs(schema));
			console.log(await JsonRefs.resolveRefs(schema));
			//  console.log(JsonRefs.decodePath(schema))
			$RefParser.dereference(schema, (err, schema) => {
				if (err) {
					console.error(err);
				} else {
					// `schema` is just a normal JavaScript object that contains your entire JSON Schema,
					// including referenced files, combined into a single object
					// console.log(schema);
					// schema.properties.map(item=>{
					//   console.log(item);
					// })
					this.schema = schema.properties;
					this.loading = true;
				}
			});
			// })
		},
		methods: {
			submit() {
				// this.model contains the valid data according your JSON Schema.
				// You can submit your model to the server here
			},
			onChangeState(value) {
				this.state = value;
			},
			onValidated(value) {
				this.valid = value;
			},
		},
		components: {
			"vue-form-json-schema": VueFormJsonSchema,
			// "pretty-print": PrettyPrint,
			// Generator: VueFormGenerator.component
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	html {
		font-family: Tahoma;
		font-size: 14px;
	}

	body {
		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-size: 14px;
		line-height: 1.42857143;
		color: #333;
	}

	pre {
		overflow: auto;
	}
	pre .string {
		color: #885800;
	}
	pre .number {
		color: blue;
	}
	pre .boolean {
		color: magenta;
	}
	pre .null {
		color: red;
	}
	pre .key {
		color: green;
	}

	h1 {
		text-align: center;
		font-size: 36px;
		margin-top: 20px;
		margin-bottom: 10px;
		font-weight: 500;
	}

	fieldset {
		border: 0;
	}

	.panel {
		margin-bottom: 20px;
		background-color: #fff;
		border: 1px solid transparent;
		border-radius: 4px;
		-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		border-color: #ddd;
	}

	.panel-heading {
		color: #333;
		background-color: #f5f5f5;
		border-color: #ddd;

		padding: 10px 15px;
		border-bottom: 1px solid transparent;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	.panel-body {
		padding: 15px;
	}

	.field-checklist .wrapper {
		width: 100%;
	}
</style>
