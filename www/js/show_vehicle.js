/**
 * Created by rwp on 2016/7/12.
 */
var scenesLoading=false;
var scenesIndex=0;
var scenes = [
  {
    index:      0 ,//default object
    lights:[
      {
        name: 'ambientLight',
        type: 'AmbientLight',
        color: 0xffffff,
        intensity: 0.5
      },
      {
        name: 'pointLight',
        type: 'PointLight',
        color: 0xb8b8b8,
        intensity: 1.2,
        distance: 0,
        decay: 2,
        initPosition: [0, 0, 0],
        nowPosition: [0, 0, 0]
      },
      {
        name: 'directionalLight',
        type: 'DirectionalLight',
        color: 0xb8b8b8,
        intensity: 1.2,
        castShadow: true,
        shadowMapSize: [1024,1024],
        shadowCameraRect: [-15,15,-15,15],
        shadowBias: false,
        initPosition: [0, 0, 0], initTarget: [0, 0, 0],
        nowPosition: [0, 0, 0], nowTarget: [0, 0, 0]
      },
      {
        name: 'hemisphereLight',
        type: 'HemisphereLight',
        skyColor: 0xffffbb,
        groundColor: 0x080820,
        intensity: 1
      },
      {
        name: 'spotLight',
        type: 'SpotLight',
        color: 0xb8b8b8,
        intensity: 1.2,
        distance: 0,
        decay: 2,
        castShadow: true,
        shadowMapSize: [1024,1024],
        shadowCameraRect: [-15,15,-15,15],
        shadowBias: false,
        initPosition: [0, 0, 0], initTarget: [0, 0, 0],
        nowPosition: [0, 0, 0], nowTarget: [0, 0, 0]
      }
    ],
    models:[
      {
        name: 'body',
        path: 'assets/SL500 Benz/',
        obj:  'body.obj',
        mtl:  'body.mtl',
        initPosition: [0, 0, 0], initRotation: [0, 0, 0], initScale: [0.5,0.5,0.5],
        nowPosition: [0, 0, 0], nowRotation: [0, 0, 0], nowScale: [0.5,0.5,0.5]
      },
      {
        name: 'wheel_fl',
        path: 'assets/SL500 Benz/',
        obj:  'wheel.obj',
        mtl:  'wheel.mtl',
        initPosition: [4.2, 1.6, 6.5], initRotation: [0, 0, 0], initScale: [0.5,0.5,0.5],
        nowPosition: [4.2, 1.6, 6.5], nowRotation: [0, 0, 0], nowScale: [0.5,0.5,0.5]
      },
      {
        name: 'brake_fl',
        path: 'assets/SL500 Benz/',
        obj:  'brake.obj',
        mtl:  'brake.mtl',
        initPosition: [4.2, 1.6, 6.5], initRotation: [0, 0, 0], initScale: [0.5,0.5,0.5],
        nowPosition: [4.2, 1.6, 6.5], nowRotation: [0, 0, 0], nowScale: [0.5,0.5,0.5]
      },
      {
        name: 'wheel_fr',
        path: 'assets/SL500 Benz/',
        obj:  'wheel.obj',
        mtl:  'wheel.mtl',
        initPosition: [-4.2, 1.6, 6.5], initRotation: [0, 0, 0], initScale: [-0.5,0.5,0.5],
        nowPosition: [-4.2, 1.6, 6.5], nowRotation: [0, 0, 0], nowScale: [0.5,0.5,0.5]
      },
      {
        name: 'brake_fr',
        path: 'assets/SL500 Benz/',
        obj:  'brake.obj',
        mtl:  'brake.mtl',
        initPosition: [-4.2, 1.6, 6.5], initRotation: [0, 0, 0], initScale: [-0.5,0.5,0.5],
        nowPosition: [-4.2, 1.6, 6.5], nowRotation: [0, 0, 0], nowScale: [0.5,0.5,0.5]
      },
      {
        name: 'wheel_bl',
        path: 'assets/SL500 Benz/',
        obj:  'wheel.obj',
        mtl:  'wheel.mtl',
        initPosition: [4.2, 1.6, -6.3], initRotation: [0, 0, 0], initScale: [0.5,0.5,0.5],
        nowPosition: [4.2, 1.6, -6.3], nowRotation: [0, 0, 0], nowScale: [0.5,0.5,0.5]
      },
      {
        name: 'brake_bl',
        path: 'assets/SL500 Benz/',
        obj:  'brake.obj',
        mtl:  'brake.mtl',
        initPosition: [4.2, 1.6, -6.3], initRotation: [0, 0, 0], initScale: [0.5,0.5,0.5],
        nowPosition: [4.2, 1.6, -6.3], nowRotation: [0, 0, 0], nowScale: [0.5,0.5,0.5]
      },
      {
        name: 'wheel_br',
        path: 'assets/SL500 Benz/',
        obj:  'wheel.obj',
        mtl:  'wheel.mtl',
        initPosition: [-4.2, 1.6, -6.3], initRotation: [0, 0, 0], initScale: [-0.5,0.5,0.5],
        nowPosition: [-4.2, 1.6, -6.3], nowRotation: [0, 0, 0], nowScale: [0.5,0.5,0.5]
      },
      {
        name: 'brake_fr',
        path: 'assets/SL500 Benz/',
        obj:  'brake.obj',
        mtl:  'brake.mtl',
        initPosition: [-4.2, 1.6, -6.3], initRotation: [0, 0, 0], initScale: [-0.5,0.5,0.5],
        nowPosition: [-4.2, 1.6, -6.3], nowRotation: [0, 0, 0], nowScale: [0.5,0.5,0.5]
      }
    ],
    // switch object showed in circular sequence
    onSwitch:  function(){
      if(this.index<0 || this.index>=1){
        this.index=0;
      }else{
        this.index=this.index+1;
      }
      this.onIndex(this.index);
    },
    // switch object showed in circular sequence
    onIndex:  function(index){
      if (index<0 || index>=1){
        index=0;
      }
      this.index=index;
      switch(this.index){
        case 0:
          ShowObject('House01_1st');
          ShowObject('House01_2nd');
          ShowObject('House01_3rd');
          break;
        // case 1:
        //     ShowObject('House01_1st');
        //     ShowObject('House01_2nd');
        //     HideObject('House01_3rd');
        //     break;
        // case 2:
        //     ShowObject('House01_1st');
        //     HideObject('House01_2nd');
        //     HideObject('House01_3rd');
        //     break;
        default:
          ShowObject('House01_1st');
          ShowObject('House01_2nd');
          ShowObject('House01_3rd');
          break;
      }
    }
  },
  {
    index:      0 ,//default object
    models:[
      {
        name: 'wheel',
        path: 'assets/SL500 Benz/',
        obj:  'wheel.obj',
        mtl:  'wheel.mtl',
        initPosition: [0, 1.6, 0], initRotation: [0, 0, 0], initScale: [5,5,5],
        nowPosition: [0, 1.6, 0], nowRotation: [0, 0, 0], nowScale: [5,5,5]
      }
    ],
    // switch object showed in circular sequence
    onSwitch:  function(){
      if(this.index<0 || this.index>=1){
        this.index=0;
      }else{
        this.index=this.index+1;
      }
      this.onIndex(this.index);
    },
    // switch object showed in circular sequence
    onIndex:  function(index){
      if (index<0 || index>=1){
        index=0;
      }
      this.index=index;
      switch(this.index){
        case 0:
          ShowObject('House01_1st');
          ShowObject('House01_2nd');
          ShowObject('House01_3rd');
          break;
        // case 1:
        //     ShowObject('House01_1st');
        //     ShowObject('House01_2nd');
        //     HideObject('House01_3rd');
        //     break;
        // case 2:
        //     ShowObject('House01_1st');
        //     HideObject('House01_2nd');
        //     HideObject('House01_3rd');
        //     break;
        default:
          ShowObject('House01_1st');
          ShowObject('House01_2nd');
          ShowObject('House01_3rd');
          break;
      }
    }
  }
];

var modelsNum=0;
var modelsLoaded=0;
function reloadModles(scIndex,onLoaded) {
  if(scenesLoading){
    console.log('Unfinished loading(>_<)');
    return;
  }
  scenesLoading=true;
  initControls('viewer3D');
  setupScene();
  ClearObject();
  var scenesNum=0;
  scenesIndex=0;
  if(scenes[scIndex]!=undefined){
    scenesIndex=scIndex;
  }
  modelsNum=0;
  modelsLoaded=0;
  for(var j in scenes[scenesIndex].models){
    modelsNum=modelsNum+1;
  }
  for(var i in scenes[scenesIndex].models){
    LoadOBJMTLObject(scenes[scenesIndex].models[i].name,
      scenes[scenesIndex].models[i].path,
      scenes[scenesIndex].models[i].obj,
      scenes[scenesIndex].models[i].mtl,
      scenes[scenesIndex].models[i].initPosition,
      scenes[scenesIndex].models[i].initRotation,
      scenes[scenesIndex].models[i].initScale,
      function(){
        //onLoading();
        modelsLoaded=modelsLoaded+1;
        if(modelsLoaded==modelsNum){
            scenesLoading=false;
            console.log('Load models completed(^_^)');
            scenes[scenesIndex].onIndex(0);
            //requestAnimationFrame(render);
            onLoaded();
        }
      }
    );
  }
}
function switchTo() {
  if(scenesLoading){
    console.log('Unfinished loading(>_<)');
    return;
  }
  scenes[scenesIndex].onSwitch();
  requestAnimationFrame(render);
}
function startAnimate() {
  active=true;
  animate();
}
function stopAnimate() {
  active=false;
}
