import React, { Component } from "react";
import { WebGLView } from "react-native-webgl";

const THREE = require('three');
global.THREE = THREE;

require("three/examples/js/renderers/Projector");

export default () => {
  class Example extends Component {
    constructor(props) {
      super(props);
    }
    onContextCreate = (gl: WebGLRenderingContext) => {
      this.callbacks = renderExample(gl, this.props);
    }
    componentWillUnmount() {
      if (this.callbacks) this.callbacks.dispose();
    }
    render() {
      return (
        <WebGLView style={this.props.style} onContextCreate={this.onContextCreate} />
      );
    }
  };
  return Example;
};

renderExample = (gl: WebGLRenderingContext, initialProps: *) => {
  
  const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
  
  const glex = gl.getExtension("RN");
  
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
    context: gl
  });
  
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1);

  let camera, scene, requestId;
  
  let imageSize = 100;
  let meshArray = [];
  let frameCount = 0;
  
  init();
  animate();
  
  function init() {
    camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000);
  
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 500;
  
    scene = new THREE.Scene();
  }
  
  function animate() {
    requestId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
    frameCount += 1;
    if(!(frameCount%60)){
      console.log("Creating Image!");
      renderImage();
    }
    if(!((frameCount%60)-30) && frameCount > 60){
      console.log("Removing Image!");
      disposeImage();
    }
    gl.flush();
    glex.endFrame();
  }
  
  function disposeImage() {
    garbageCollection(meshArray[0]);
    meshArray.splice(0,1);
  }
  
  function garbageCollection(mesh) {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.geometry = undefined;
    mesh.material.map.dispose();
    mesh.material.map = undefined;
    mesh.material.dispose();
    mesh.material = undefined;
    mesh = undefined;
  }
  
  function renderImage() {
    let geometry, materials, mesh, tileImage;
    tileImage = "http://www.logologo.com/logos/environment-logo.jpg";
    materials = loadTexture(tileImage);
    geometry = new THREE.PlaneGeometry(imageSize, imageSize, 1, 1);
    mesh = new THREE.Mesh(geometry,materials);
    mesh.geometry.computeBoundingBox();
    mesh.position.set(0,0,10);
    mesh.scale.set(1, 1, 1);
    scene.add(mesh);
    meshArray.push(mesh);
  }
  
  function loadTexture(src) {
    let texture = new THREE.Texture();
    let material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
    var properties = renderer.properties.get(texture);
    gl
      .getExtension("RN")
      .loadTexture({ yflip: true, image: src })
      .then(({ texture }) => {
        properties.__webglTexture = texture;
        properties.__webglInit = true;
        texture.needsUpdate = true;
      });
    return material;
  }
  
  return {
    dispose() {
      cancelAnimationFrame(requestId);
    }
  };
}
