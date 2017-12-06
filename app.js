import React, { Component } from "react";

import { WebGLView } from "react-native-webgl";

import * as THREE from "three";

/* *******************
      Display Icons
   ******************* */

const icons = {
  "0" : require("../images/numbers/0.png"),
  "1" : require("../images/numbers/1.png"),
  "2" : require("../images/numbers/2.png"),
  "3" : require("../images/numbers/3.png"),
  "4" : require("../images/numbers/4.png"),
  "5" : require("../images/numbers/5.png"),
  "6" : require("../images/numbers/6.png"),
  "7" : require("../images/numbers/7.png"),
  "8" : require("../images/numbers/8.png"),
  "9" : require("../images/numbers/9.png")
};

/* *********************
      React Component
   ********************* */

export default class Example extends Component<{}> {
  constructor(props) {
    super(props);
  }
  
  componentWillReceiveProps (props) {
    if (this.callback) this.callback.update(props);
  }
  
  componentWillUnmount() {
    if (this.callback) this.callback.dispose();
  }
  
  onContextCreate = (gl) => {
    this.callback = renderExample(gl);
  }
  
  render() {
    return (
      <WebGLView style={this.props.style} onContextCreate={this.onContextCreate} />
    );
  }
}

/* *********************
      Render Function
   ********************* */

let renderExample = (gl) => {
  
  const glex = gl.getExtension("RN");
  
  const width = gl.drawingBufferWidth;
  const height = gl.drawingBufferHeight;
  
  const aspectRatio = width / height;
  
  const renderer = new THREE.WebGLRenderer({
    canvas: {
      width,
      height,
      style: {},
      clientWidth: width,
      clientHeight: height,
      addEventListener: () => {},
      removeEventListener: () => {}
    },
    antialias: true,
    context: gl
  });
  
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
    
  let requestId, scene, camera;
    
  let frustum = {
    width: 256 * aspectRatio,
    height: 256
  };
  
  init();
  animate();
  
  let frameCount = 0;
  let interval = 120;
    
  function init() {
    camera = new THREE.OrthographicCamera(0, frustum.width, frustum.height, 0, 100, 1000);
    
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 1500;
    
    scene = new THREE.Scene();
    
    camera.lookAt(scene.position);
    
    scene.background = new THREE.Color(0xF0F0F0);
  }
  
  function animate() {
    requestId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
      
    createGrid();
    frameCount += 1;
      
    gl.flush();
    glex.endFrame();
  }
  
  function createGrid() {
    let iconWidth = frustum.width/9;
    let iconHeight = frustum.height/9;
    
    if(frameCount == interval*0){
      // create the "1" mesh
      let material1 = new THREE.MeshBasicMaterial({map: fetchTexture(icons["1"], 1), overdraw: 0.5, side: THREE.DoubleSide, transparent: true, opacity: 1.0});
      let geometry1 = new THREE.PlaneBufferGeometry(iconWidth, iconHeight, 1, 1);
      let mesh1 = new THREE.Mesh(geometry1, material1);
      mesh1.position.set(frustum.width*1/4, frustum.height*1/4, 1000);
      mesh1.scale.set(1,1,1);
      scene.add(mesh1);
    }
    
    if(frameCount == interval*1){
      // create the "2" mesh
      let material2 = new THREE.MeshBasicMaterial({map: fetchTexture(icons["2"], 2), overdraw: 0.5, side: THREE.DoubleSide, transparent: true, opacity: 1.0});
      let geometry2 = new THREE.PlaneBufferGeometry(iconWidth, iconHeight, 1, 1);
      let mesh2 = new THREE.Mesh(geometry2, material2);
      mesh2.position.set(frustum.width*2/4, frustum.height*1/4, 1000);
      mesh2.scale.set(1,1,1);
      scene.add(mesh2);
    }
    
    if(frameCount == interval*2){
      // create the "3" mesh
      let material3 = new THREE.MeshBasicMaterial({map: fetchTexture(icons["3"], 3), overdraw: 0.5, side: THREE.DoubleSide, transparent: true, opacity: 1.0});
      let geometry3 = new THREE.PlaneBufferGeometry(iconWidth, iconHeight, 1, 1);
      let mesh3 = new THREE.Mesh(geometry3, material3);
      mesh3.position.set(frustum.width*3/4, frustum.height*1/4, 1000);
      mesh3.scale.set(1,1,1);
      scene.add(mesh3);
    }
      
    if(frameCount == interval*3){
      // create the "4" mesh
      let material4 = new THREE.MeshBasicMaterial({map: fetchTexture(icons["4"], 4), overdraw: 0.5, side: THREE.DoubleSide, transparent: true, opacity: 1.0});
      let geometry4 = new THREE.PlaneBufferGeometry(iconWidth, iconHeight, 1, 1);
      let mesh4 = new THREE.Mesh(geometry4, material4);
      mesh4.position.set(frustum.width*1/4, frustum.height*2/4, 1000);
      mesh4.scale.set(1,1,1);
      scene.add(mesh4);
    }
      
    if(frameCount == interval*4){
      // create the "5" mesh
      let material5 = new THREE.MeshBasicMaterial({map: fetchTexture(icons["5"], 5), overdraw: 0.5, side: THREE.DoubleSide, transparent: true, opacity: 1.0});
      let geometry5 = new THREE.PlaneBufferGeometry(iconWidth, iconHeight, 1, 1);
      let mesh5 = new THREE.Mesh(geometry5, material5);
      mesh5.position.set(frustum.width*2/4, frustum.height*2/4, 1000);
      mesh5.scale.set(1,1,1);
      scene.add(mesh5);
    }
      
    if(frameCount == interval*5){
      // create the "600" mesh
      let material6 = new THREE.MeshBasicMaterial({map: fetchTexture(icons["6"], 6), overdraw: 0.5, side: THREE.DoubleSide, transparent: true, opacity: 1.0});
      let geometry6 = new THREE.PlaneBufferGeometry(iconWidth, iconHeight, 1, 1);
      let mesh6 = new THREE.Mesh(geometry6, material6);
      mesh6.position.set(frustum.width*3/4, frustum.height*2/4, 1000);
      mesh6.scale.set(1,1,1);
      scene.add(mesh6);
    }
      
    if(frameCount == interval*6){
      // create the "7" mesh
      let material7 = new THREE.MeshBasicMaterial({map: fetchTexture(icons["7"], 7), overdraw: 0.5, side: THREE.DoubleSide, transparent: true, opacity: 1.0});
      let geometry7 = new THREE.PlaneBufferGeometry(iconWidth, iconHeight, 1, 1);
      let mesh7 = new THREE.Mesh(geometry7, material7);
      mesh7.position.set(frustum.width*1/4, frustum.height*3/4, 1000);
      mesh7.scale.set(1,1,1);
      scene.add(mesh7);
    }
      
    if(frameCount == interval*7){
      // create the "8" mesh
      let material8 = new THREE.MeshBasicMaterial({map: fetchTexture(icons["8"], 8), overdraw: 0.5, side: THREE.DoubleSide, transparent: true, opacity: 1.0});
      let geometry8 = new THREE.PlaneBufferGeometry(iconWidth, iconHeight, 1, 1);
      let mesh8 = new THREE.Mesh(geometry8, material8);
      mesh8.position.set(frustum.width*2/4, frustum.height*3/4, 1000);
      mesh8.scale.set(1,1,1);
      scene.add(mesh8);
    }
      
    if(frameCount == interval*8){
      // create the "9" mesh
      let material9 = new THREE.MeshBasicMaterial({map: fetchTexture(icons["9"], 9), overdraw: 0.5, side: THREE.DoubleSide, transparent: true, opacity: 1.0});
      let geometry9 = new THREE.PlaneBufferGeometry(iconWidth, iconHeight, 1, 1);
      let mesh9 = new THREE.Mesh(geometry9, material9);
      mesh9.position.set(frustum.width*3/4, frustum.height*3/4, 1000);
      mesh9.scale.set(1,1,1);
      scene.add(mesh9);
    }
  }
    
  function fetchTexture(src, num) {
    let textureObject = new THREE.Texture();
    let properties = renderer.properties.get(textureObject);
    glex.loadTexture({ yflip: true, image: src })
      .then(({ texture }) => {
        console.log("Texture [" + num + "] Loaded!")
        properties.__webglTexture = texture;
        properties.__webglInit = true;
        texture.needsUpdate = true;
      });
    return textureObject;
  }
  
  return {
    update(props) {
      // empty at the moment...
    },
    dispose() {
      // empty at the moment...
    }
  };
}
