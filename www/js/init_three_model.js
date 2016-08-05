/**
 * Created by Tevil on 2016/7/12.
 */
/**
 * 用法：
 *     initControls('viewport');
 loadModel('assets/Models/basic_scene.json');
 animate();
 */
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var orbit, container, scene, camera, renderer,ambientLight,directionalLight,planeMesh,skyMesh;
var olddom =null;
//var sky, sunSphere;
var active = false;
function render() {
    if ( scene !== undefined ) {
        renderer.render( scene, camera );
    }
}

function setupScene() {
    scene = new THREE.Scene();
    //scene.add( new THREE.AxisHelper(5) );

    //light
    ambientLight = new THREE.AmbientLight( 0xffffff );
    ambientLight.intensity = 0.5;
    scene.add( ambientLight );
    directionalLight = new THREE.DirectionalLight( 0xb8b8b8 );
    directionalLight.position.set( -9, 8, -12 );
    directionalLight.intensity = 1.2;
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadowCameraLeft = -15;
    directionalLight.shadowCameraRight = 15;
    directionalLight.shadowCameraTop = 15;
    directionalLight.shadowCameraBottom = -15;
    directionalLight.shadowBias = false;
    scene.add( directionalLight );

    directionalLight = new THREE.DirectionalLight( 0xb8b8b8 );
    directionalLight.position.set( 9, 8, 12 );
    directionalLight.intensity = 1.2;
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadowCameraLeft = -15;
    directionalLight.shadowCameraRight = 15;
    directionalLight.shadowCameraTop = 15;
    directionalLight.shadowCameraBottom = -15;
    directionalLight.shadowBias = false;
    scene.add( directionalLight );
    //scene.add( new THREE.DirectionalLightHelper( directionalLight ) );

    //ground
    var planeGeometry = new THREE.CylinderGeometry( 15, 15, 0.01, 64, 1 );
    //planeGeometry.rotateX( - Math.PI / 2 );
    planeGeometry.translate(0,-0.01,0);
    //var planeTexture = new THREE.TextureLoader().load( "assets/Models/ground.jpg" ); , map: planeTexture}
    var planeMaterial = new THREE.MeshLambertMaterial( { color: 0x999999, side: THREE.FrontSide });
    planeMesh = new THREE.Mesh( planeGeometry, planeMaterial );
    planeMesh.receiveShadow=true;
    scene.add( planeMesh );

    //ground
    planeGeometry = new THREE.CylinderGeometry( 15, 15, 100, 64, 1 );
    //planeGeometry.rotateX( - Math.PI / 2 );
    planeGeometry.translate(0,-50.01, 0);
    //var planeTexture = new THREE.TextureLoader().load( "assets/Models/ground.jpg" ); , map: planeTexture}
    planeMaterial = new THREE.MeshLambertMaterial( { color: 0x999999, side: THREE.FrontSide });
    planeMesh = new THREE.Mesh( planeGeometry, planeMaterial );
    planeMesh.receiveShadow=false;
    scene.add( planeMesh );

    //sky
    // method 1
    var skyGeometry = new THREE.SphereBufferGeometry( 1000, 32, 32 );
    skyGeometry.translate(0,-3,0);
    var skyTexture = new THREE.TextureLoader().load( "assets/Textures/sky.jpg" );
    var skyMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, map: skyTexture , side: THREE.BackSide} );
    skyMesh = new THREE.Mesh( skyGeometry, skyMaterial );
    scene.add( skyMesh);
    // method 2
    // var textureCube = new THREE.CubeTextureLoader()
    //     .setPath( 'assets/Textures/cube/Bridge2/')
    //     .load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );
    // scene.background = textureCube;
    // method 3
    // var sky = new THREE.Sky();
    // scene.add( sky.mesh );

    //meshList
    objectList = new Array();
}

var objectList;
function LoadOBJMTLObject(nameStr, path, obj, mtl ,
                          position, rotation, scale,
                          onLoaded) {
    //find object, if exist do nothing
    for (var i = 0; i < objectList.length; i++) {
        if (objectList[i].Name == nameStr) {
            return;
        }
    }
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( path );
    mtlLoader.load( mtl, function( materials ) {
        materials.preload();
        for(m in materials.materials){
          materials.materials[m].side = THREE.DoubleSide;
        }
        var objLoader = new THREE.OBJLoader();
        // materials.side=THREE.DoubleSide();
        objLoader.setMaterials( materials );
        objLoader.setPath( path );
        objLoader.load( obj, function ( object ) {
            for(k in object.children){
              childName=object.children[k].name;
              if(childName.length>9){
                if(childName[0]=='s'){
                  if(childName[1]=='1'){
                    object.children[k].castShadow = true;
                  }
                }
                if(childName[3]=='r'){
                  if(childName[4]=='1'){
                    object.children[k].receiveShadow = true;
                  }
                }
                if(childName[6]=='t'){
                  var tStr=childName.substr(7,2);
                  var tVal=parseInt(tStr)/100;
                  if(tVal>0.01){
                    object.children[k].material.refractionRatio=tVal;
                  }
                }
                if(childName[10]=='g'){
                  var gStr=childName.substr(11,2);
                  var gVal=parseInt(gStr)/100;
                  if(gVal>0.01){
                    object.children[k].material.shininess=100;
                    //object.children[k].material.reflectivity=gVal;
                  }
                  object.children[k].material.envMap=scene.background;
                }
                if(childName[10]=='m'){
                  var mStr=childName.substr(11,2);
                  var mVal=parseInt(gStr)/100;
                  if(mVal>0.01){
                    object.children[k].material.shininess=100;
                    //object.children[k].material.reflectivity=mVal;
                  }
                  //object.children[k].material.envMap=scene.background;
                }
              }
            }
            object.position.x=position[0];
            object.position.y=position[1];
            object.position.z=position[2];
            object.rotation.x=rotation[0];
            object.rotation.y=rotation[1];
            object.rotation.z=rotation[2];
            object.scale.x=scale[0];
            object.scale.y=scale[1];
            object.scale.z=scale[2];
            objectList.push(
                {
                    Name: nameStr,
                    Object: object,
                    IsHide: false
                }
            );
            scene.add( object );
            onLoaded();
        }, onProgress, onError );

    });
}
function ClearObject(){
    objectList = new Array();
}
function HideObject(nameStr) {
    var index=-1;
    //find object, if exist do nothing
    for (var i = 0; i < objectList.length; i++) {
        if (objectList[i].Name == nameStr) {
            index=i;
            break;
        }
    }
    //hide object from scene and meshList
    if(index>=0) {
        if(objectList[index].IsHide == false){
            //scene;
            //scene.removeObject(meshList[index].Object);
            //meshList[index].Object.position.x=40;
            objectList[index].Object.visible=false;
            objectList[index].IsHide = true;
        }
    }
}
function ShowObject(nameStr) {
    var index=-1;
    //find object, if exist do nothing
    for (var i = 0; i < objectList.length; i++) {
        if (objectList[i].Name == nameStr) {
            index=i;
            break;
        }
    }
    //show object from scene and meshList
    if(index>=0) {
        if(objectList[index].IsHide == true){
            //scene;
            //scene.add(meshList[index].Object);
            //meshList[index].Object.position.x=0;
            objectList[index].Object.visible=true;
            objectList[index].IsHide = false;
        }
    }
}
function ShowAllObject() {
    //find object, if exist do nothing
    for (var i = 0; i < objectList.length; i++) {
        if (objectList[i].Name == nameStr) {
            if(objectList[i].IsHide == true){
                //scene.add(meshList[index].Object);
                // meshList[index].Object.position.x=0;
                objectList[index].Object.visible=true;
                objectList[index].IsHide = false;
            }
        }
    }
}
function onWindowResize() {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    if(active){
        render();
    }
}
var onProgress =function ( xhr ) {
};
var onError =function ( xhr ) {
    console.log( 'An error happened' );
};
function initControls(element_id) {
    if(olddom!=null){
        container.removeChild(olddom);
    }
    container = document.getElementById( element_id );
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true	} );
    renderer.shadowMapEnabled=true;
    renderer.shadowMapType=THREE.PCFSoftShadowMap;
    renderer.setClearColor( 0x000000, 0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    olddom = renderer.domElement;
    var aspect = container.offsetWidth / container.offsetHeight;
    camera = new THREE.PerspectiveCamera( 60, aspect );
    orbit = new THREE.OrbitControls( camera, container );
    orbit.maxPolarAngle = Math.PI/2;
    orbit.minDistance = 8;
    orbit.maxDistance = 100;
    orbit.addEventListener( 'change', render );
    camera.position.z = -20;
    camera.position.x = 0;
    camera.position.y = 0;
    var target = new THREE.Vector3( 0, 1, 0 );
    camera.lookAt( target );
    orbit.target = target;
    camera.updateProjectionMatrix();
    window.addEventListener( 'resize', onWindowResize, false );
}
function animate() {
    if(active){
        // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        requestAnimationFrame(animate);
        // Render the scene.
        render();
        //orbit.update();
    }
}
