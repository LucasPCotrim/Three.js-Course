import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Objects
const group = new THREE.Group()
scene.add(group)
group.position.set(0,0,0)
group.rotation.x = Math.PI * 0.1
group.rotation.y = Math.PI * 0.3
group.rotation.z = Math.PI * 0.1

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: '#ff0000'})
)
cube1.position.set(0,0,0)
group.add(cube1)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: '#00ff00'})
)
cube2.position.set(-2,0,0)
group.add(cube2)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: '#0000ff'})
)
cube3.position.set(2,0,0)
group.add(cube3)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 'cyan'})
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(-1,1,2)
mesh.scale.set(1.5,0.5,1)
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
mesh.rotation.z = Math.PI * 0.25
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
camera.lookAt(group.position)
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)