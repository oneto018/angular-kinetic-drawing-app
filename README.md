angular-kinetic-drawing-app
===========================

A proof of concept drawing app using angular js and kinetic js.

For now I just added circle only. It could be customized with lots of other shapes too.

http://oneto018.github.io/angular-kinetic-drawing-app/

ParamReader
------------
I this project I created a very simple directive 'atool' which takes [paramReader.html](https://github.com/oneto018/angular-kinetic-drawing-app/blob/master/paramReader.html) as template. The code for atool directive lies in the [script.js](https://github.com/oneto018/angular-kinetic-drawing-app/blob/master/js/script.js).

I created this directive a generalized param reader ie., whenever you need to get a bunch of parameters from user with an ui. For example in this project, I needed to get a number of properties about circle to draw. Using this directive its really easy to get arbitrary params.It also provides hooks for change callbacks and a submit callback.

This directive creates a scope of on its own but all the things you specify belongs the scope in which you use the directive. Its best understood in an illustration.

In HTML,

	<div ng-controller="myCtl">
		<div atool config="toolsConfig" ng-model="circle1" submit="lg()" atool-change="changeHandler()" sbmtext="create"></div>
	</div>

In JS,

function myCtl($scope){
	
	$scope.circle1 = {};

	//config to create a form ui , the form items and its types
	$scope.toolsConfig={
		properties:[
			{name:'radius',type:'number',initial:5,label:'radius'},
			{name:'cx',type:'number',initial:50,label:'center X'},
			{name:'cy',type:'number',initial:50,label:'center Y'},
			{name:'strokeWidth',type:'number',initial:4,label:'stroke width'},
			{name:'fillColor',type:'color',label:'Fill Color',size:'40'},
			{name:'strokeColor',type:'color',label:'Stroke Color',size:'40'},
			{name:'id',type:'text',label:'Name',size:'40'},
			{
				name:'ctype',type:'select',label:'Type of the circle',size:'40',
				options:[
					['option1','value1'],['option2','value2'],['option3','value3'],['option4','value4']
				]
			},
		],
		title:'Circle'
	};

}



