    /**
     * plantilla utilizada de repositorio anterior
     */

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 1);
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

    /**
     * CAMARA EN PRESPECTIVA
     * parametros creados para mejor ubiacion
     */

    var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000); 
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    const light = new THREE.PointLight(0xffffff);
    light.position.set(0, 0, 0);
    scene.add(light);
    
    const size = 150;
    const divisions = 160;
    const axesHelper = new THREE.AxesHelper(1000);
    scene.add(axesHelper);
    
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);  
 

    /*function createPolyhedronGeometry(faces, edges, size) {
      const vertices = [];
      const indices = [];
    
      // Función para generar un punto en una esfera
      function generatePointOnSphere(u, v) {
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.sin(phi) * Math.sin(theta);
        const z = Math.cos(phi);
        return new THREE.Vector3(x, y, z);
      }
    
      // Generar vértices en una esfera
      for (let i = 0; i < edges; i++) {
        const u = i / edges;
        for (let j = 0; j < faces; j++) {
          const v = j / faces;
          const point = generatePointOnSphere(u, v);
          point.multiplyScalar(size);
          vertices.push(point);
        }
      }
    
      // Generar índices para unir los vértices
      for (let i = 0; i < edges; i++) {
        for (let j = 0; j < faces; j++) {
          const a = i * faces + j;
          const b = ((i + 1) % edges) * faces + j;
          const c = ((i + 1) % edges) * faces + ((j + 1) % faces);
          const d = i * faces + ((j + 1) % faces);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }
    
      // Cerrar la geometría
      for (let i = 0; i < faces; i++) {
        indices.push(i, (i + 1) % faces);
      }
    
      // Substraer la posición de cada vértice desde el centro (0, 0, 0)
      const center = new THREE.Vector3(0, 0, 0);
      for (let i = 0; i < vertices.length; i++) {
        vertices[i].sub(center);
      }
    
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices.flatMap(v => v.toArray()), 3));
      geometry.setIndex(indices);
    
      return geometry;
    }
    
    const geometry = createPolyhedronGeometry(6, 4, 1);
    const kolor= new THREE.Color("rgb(0, 0, 0)");
    const material = new THREE.MeshBasicMaterial({kolor, wireframe : true});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);*/

    function createPolyhedronGeometry(faces, edges, size) {
      const vertices = [];
      const indices = [];
    
      // Función para generar un punto en una esfera
      function generatePointOnSphere(u, v) {
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.sin(phi) * Math.sin(theta);
        const z = Math.cos(phi);
        const point = new THREE.Vector3(x, y, z);
        const offset = point.clone().multiplyScalar(size * 2);
        point.multiplyScalar(size);
        point.add(offset);
        return point;
      }
    
      // Generar vértices en una esfera
      for (let i = 0; i < edges; i++) {
        const u = i / edges;
        for (let j = 0; j < faces; j++) {
          const v = j / faces;
          const point = generatePointOnSphere(u, v);
          vertices.push(point);
          // Add mirrored point
          vertices.push(point.clone().multiplyScalar(-1));
        }
      }
    
      // Generar índices para unir los vértices
      for (let i = 0; i < edges; i++) {
        for (let j = 0; j < faces; j++) {
          const a = i * faces * 2 + j * 2;
          const b = ((i + 1) % edges) * faces * 2 + j * 2;
          const c = ((i + 1) % edges) * faces * 2 + ((j + 1) % faces) * 2;
          const d = i * faces * 2 + ((j + 1) % faces) * 2;
          indices.push(a, b, d);
          indices.push(b, c, d);
          // Add mirrored face
          indices.push(a + 1, d + 1, b + 1);
          indices.push(b + 1, d + 1, c + 1);
        }
      }
    
      // Cerrar la geometría
      for (let i = 0; i < faces; i++) {
        indices.push(i * 2, ((i + 1) % faces) * 2);
        indices.push(i * 2 + 1, ((i + 1) % faces) * 2 + 1);
      }
    
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices.flatMap(v => v.toArray()), 3));
      geometry.setIndex(indices);
    
      return geometry;
    }
    
    const geometry = createPolyhedronGeometry(4, 5, 1);
    const kolor = new THREE.Color("rgb(0, 0, 0)");
    const material = new THREE.MeshBasicMaterial({kolor, wireframe: true});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


  /*  function createPolyhedronGeometry(faces, edges, size) {
      const vertices = [];
      const indices = [];
    
      // Función para generar un punto en una esfera
      function generatePointOnSphere(u, v) {
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.sin(phi) * Math.sin(theta);
        const z = Math.cos(phi);
        return new THREE.Vector3(x, y, z);
      }
    
      // Generar vértices en una esfera
      for (let i = 0; i < edges; i++) {
        const u = i / edges;
        for (let j = 0; j < faces; j++) {
          const v = j / faces;
          const point = generatePointOnSphere(u, v);
          point.multiplyScalar(size);
          vertices.push(point);
        }
      }
    
      // Generar índices para unir los vértices
      for (let i = 0; i < edges; i++) {
        for (let j = 0; j < faces; j++) {
          const a = i * faces + j;
          const b = ((i + 1) % edges) * faces + j;
          const c = ((i + 1) % edges) * faces + ((j + 1) % faces);
          const d = i * faces + ((j + 1) % faces);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }
    
      // Cerrar la geometría
      for (let i = 0; i < faces; i++) {
        indices.push(i, (i + 1) % faces);
      }
    
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices.flatMap(v => v.toArray()), 3));
      geometry.setIndex(indices);
    
      return geometry;
    }
    
    const geometry = createPolyhedronGeometry(4, 5, 1);
    const kolor= new THREE.Color("rgb(0, 0, 0)");
    const material = new THREE.MeshBasicMaterial({kolor, wireframe : true});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);*/

   function render() {
     requestAnimationFrame(render);
     renderer.render(scene, camera);
   }
   
   render();


   
 


    