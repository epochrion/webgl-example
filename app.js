/* @flow */

const THREE = require('three');
global.THREE = THREE;

require("three/examples/js/renderers/Projector");

export default (gl: WebGLRenderingContext, initialProps: *) => {
  
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
  renderer.setClearColor(0xDDFFDD, 1);

  let camera, scene, requestId;
  let imageSize, gridWidth, gridHeight;
  
  init();
  animate();
  
  function init() {
    camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000);
	  
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 500;
	
    scene = new THREE.Scene();
	
    imageSize = 30;

    gridWidth = 5;
    gridHeight = 5;
	
    renderGrid();
  }
  
  function animate() {
    requestId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
    gl.flush();
    glex.endFrame();
  }
  
  function renderGrid() {
    let gridPositions = getGridPositions();
	
    let geometry, materials, mesh, tileImage;
	
    for (let k = 0; k < (gridWidth*gridHeight); k++){
      tileImage = "http://www.logologo.com/logos/environment-logo.jpg";
      materials = loadTexture(tileImage);
      geometry = new THREE.PlaneGeometry(imageSize, imageSize, 1, 1);
      mesh = new THREE.Mesh(geometry,materials);
      mesh.geometry.computeBoundingBox();
      mesh.position.set(gridPositions[k][0],gridPositions[k][1],0);
      scene.add(mesh);
    }
  }
  
  function getGridPositions() {
    let gridArray = [];
    let counter = 0;
    let x = Math.floor(gridWidth/2);
    let y = Math.floor(gridHeight/2);
    for (let j = y; j >= -y; j--) { // y : up ---> down
      for (let i = -x; i <= x; i++) { // x : left ---> right
        gridArray[counter] = [i*imageSize,j*imageSize];
        counter += 1;
      }
    }
    return gridArray;
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
    onPropsChange({ fov, touching, touchPosition }: *) {
      // nothing to do here currently...
    },
    dispose() {
      cancelAnimationFrame(requestId);
    }
  };
}
