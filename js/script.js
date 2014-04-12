var App = angular.module('drawingApp',['colorpicker.module']);

App.directive('atool',function(){
	return {
		restrict:'AE',
		scope:{
			config :'=',
			myModel :'=ngModel',
			submit : '&',
			sbmtext:'@',
			atoolChange:'&'
		},
		templateUrl:'paramReader.html',
		link:function(scope,element,attrs){
			/*
			angular.forEach(scope.config.properties,function(val,key){
				/*
				if(scope.myModel[val.name]){} else {
					if(val.initial){
						scope.myModel[val.name] = val.initial;
					}
				}
				
				
			}); */
			

			console.log('hello');
			//console.log(attrs);
		}
	};
});

App.directive('nrKineticCanvas',function(){
	return {
		restrict:'A',
		scope:{
			layer:'=',
			stage:'='
		},

		link:function(scope,element,attrs){
			var width = element.width();
			var height = element.height();
			height = (height>400)? height : 400;
			element.css('height',height+'px');
			/*
			if(attrs.width){
				 width = attrs.width;
			}

			if(attrs.height){
				 height = attrs.height;
			} */

			scope.stage = new Kinetic.Stage({
		        container: attrs.id,
		        width: width,
		        height: height
		    });
			
		    scope.layer = new Kinetic.Layer();

		    scope.stage.add(scope.layer);

		}
	}
});


function MainCtl($scope){
	$scope.noop = function(){};
	$scope.tools = {};
	$scope.editing = false;
	$scope.curIndex = null;
	$scope.kLayer,$scope.kStage,$scope.kRect;
	$scope.kShapes = [];

	$scope.tools.circle={
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
	
	$scope.circle1 = {};

	$scope.lg = function(){
		var c1 = $scope.circle1;
		var cr = new Kinetic.Circle({
		        x: c1.cx,
		        y: c1.cy,
		        radius: c1.radius,
		        fill: c1.fillColor,
		        stroke: c1.strokeColor,
		        strokeWidth: c1.strokeWidth,
		        id:c1.id
		});
		var circle1 = {};
		angular.copy($scope.circle1,circle1);
		var shapeEntry = {id:c1.id,knt:cr,obj:circle1};
		$scope.kShapes.push(shapeEntry);
		$scope.kLayer.add(cr);
		$scope.kLayer.draw();
		console.log($scope.kShapes);
	}; 

	$scope.draw = function(){
		$scope.kLayer.draw();
	};

	$scope.edit = function(ind){
		$scope.editing = true;
		$scope.curIndex = ind;
		console.log($scope.kShapes[$scope.curIndex].obj);

	}

	$scope.finishEditing = function(){
		$scope.editing = false;
		$scope.curIndex = null;
	};

	$scope.update = function(){
		var curIndex = $scope.curIndex;
		
			var c1 = $scope.kShapes[curIndex].obj;
			var knt = $scope.kShapes[curIndex].knt;
			
			knt.setX(c1.cx);
			knt.setY(c1.cy);
			knt.setRadius(c1.radius);
			knt.setFill(c1.fillColor);
			knt.setStroke(c1.strokeColor);
			knt.setStrokeWidth(c1.strokeWidth); 

		/*	//angular.copy(c1,tweenObj);
			var tweenObj = {
				x:c1.cx,
				y:c1.cy,
				radius:c1.radius,
				fill:c1.fillColor,
				stroke:c1.strokeColor,
				strokeWidth:c1.strokeWidth
			};
			
			tweenObj.node = knt;
			tweenObj.duration = 0.7;
		

			var tween = new Kinetic.Tween(tweenObj);
		*/
			knt.setId(c1.id);
		//	tween.play();
			//console.log('tween = '+JSON.stringify(tweenObj));
			$scope.draw();
			
	
		
	};


}