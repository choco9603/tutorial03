window.addEventListener('DOMContentLoaded',init);

function init(){
  //サイズ指定
  const width = 960;
  const height = 540;
  //角度
  let rot = 0;
  //マウス座標
  let mouseX = 0;
  
  //レンダラーを作成
  const canvasElement = document.querySelector('#myCanvas4');
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
  });
  renderer.setSize(width,height);
  
  //シーンを作成
  const scene = new THREE.Scene();
  
  //カメラを作成
  const camera = new THREE.PerspectiveCamera(45,width/height);
  camera.position.set(0,0,1000);
  
  //カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera,canvasElement);
  
  //球体を作成
  const geometry = new THREE.SphereGeometry(300,30,30);
  
  //マテリアルを作成(色指定)
  //const material = new THREE.MeshStandardMaterial({color:0xff0000});
  
  //画像を読み込む
  const loader = new THREE.TextureLoader();
  const texture = loader.load('https://github.com/choco9603/tutorial03/blob/master/imgs/moon_map.jpeg?raw=true');
  //マテリアルテクスチャーを設定
  const material = new THREE.MeshStandardMaterial({
    map:texture,
    side:THREE.DoubleSide,
  });
  //メッシュ作成
  const moonMesh = new THREE.Mesh(geometry,material);
  
  //3D空間にメッシュを追加
  scene.add(moonMesh);
  
  //星屑を作成
  createStarField();
  
  function createStarField(){
    //頂点情報を作成
    const vertices = [];
    for(let i = 0; i < 1000; i++){
      const x = 3000 * (Math.random()-0.5);
      const y = 3000 * (Math.random()-0.5);
      const z = 3000 * (Math.random()-0.5);
      
      vertices.push(x,y,z);
    }
    
    //形状データを作成
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
    //マテリアルを作成
    const material = new THREE.PointsMaterial({
      size:10,
      color:0xffffff,
    });
    //星屑追加
    const mesh = new THREE.Points(geometry,material);
    scene.add(mesh);
  }
  
  //平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff,1.5);
  directionalLight.position.set(1,1,1);
  //シーンに追加
  scene.add(directionalLight);
  
  document.addEventListener("mousemove",(event)=>{
    mouseX = event.pageX;
  });
  
  tick();
  
  //毎フレーム時に実行されるループイベント
  function tick(){
    //回転
    //moonMesh.rotation.y -= 0.01;
    //ラジアンに変換
    //const radian = (rot * Math.PI)/100;
    //camera.position.x = 1000 * Math.sin(radian);
    //camera.position.z = 1000 * Math.cos(radian);
    
    //カメラ方向を原点へ固定
    //camera.lookAt(new THREE.Vector3(0,0,0));
    //レンダリング
    renderer.render(scene,camera);
    requestAnimationFrame(tick);
  }
}
