<script lang=ts>
  import { onMount } from 'svelte';
	import { PUBLIC_PDB_HOST } from '$env/static/public';
	import * as THREE from 'three';
	import { PDBLoader } from 'three/addons/loaders/PDBLoader.js';
	import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
	import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
	export let pid;

	const PDB_MODEL = `${PUBLIC_PDB_HOST}${pid}.pdb`;
	const loader = new PDBLoader();
	const offset = new THREE.Vector3();
	let camera, scene, renderer, controls, container, root;

	const aspect_ratio = () => max_width() / max_height();
	const max_width = () => window.innerWidth > 600 ? 600 : window.innerWidth;
	const max_height = () => window.innerHeight > 300 ? 300 : window.innerHeight;

	onMount(() => {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(70, aspect_ratio(), 1, 5000 );
		camera.position.z = 800;
		scene.add(camera);
		const light1 = new THREE.DirectionalLight(0xffffff, 2.5);
		light1.position.set(1,1,1);
		scene.add(light1);
		const light2 = new THREE.DirectionalLight(0xffffff, 1.5);
		light2.position.set(-1,-1,1);
		scene.add(light2);
		root = new THREE.Group();
		scene.add(root);
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(max_width(), max_height());
		container.appendChild(renderer.domElement);
		controls = new TrackballControls( camera, renderer.domElement );
		controls.minDistance = 500;
		controls.maxDistance = 2000;

		load_compound();
		animate();
	})
	
	const load_compound = () => {
		loader.load(PDB_MODEL, pdb => {
			const geometryAtoms = pdb.geometryAtoms;
			const geometryBonds = pdb.geometryBonds;
			const json = pdb.json;
			const boxGeometry = new THREE.BoxGeometry(1,1,1);
			const sphereGeometry = new THREE.IcosahedronGeometry(1,3);

			geometryAtoms.computeBoundingBox()
			geometryAtoms.boundingBox.getCenter(offset).negate();
			geometryAtoms.translate(offset.x, offset.y, offset.z);
			geometryBonds.translate(offset.x, offset.y, offset.z);

			let positions = geometryAtoms.getAttribute('position');
			const colors = geometryAtoms.getAttribute('color');
			const position = new THREE.Vector3();
			const color = new THREE.Color();

			for ( let i = 0; i < positions.count; i ++ ) {
				position.x = positions.getX(i);
				position.y = positions.getY(i);
				position.z = positions.getZ(i);
				color.r = colors.getX(i);
				color.g = colors.getY(i);
				color.b = colors.getZ(i);
				const material = new THREE.MeshPhongMaterial( { color: color } );
				const object = new THREE.Mesh(sphereGeometry, material);
				object.position.copy(position);
				object.position.multiplyScalar(75);
				object.scale.multiplyScalar(25);
				root.add(object);
				const atom = json.atoms[i];
			}

			positions = geometryBonds.getAttribute('position');
			const start = new THREE.Vector3();
			const end = new THREE.Vector3();

			for ( let i = 0; i < positions.count; i += 2 ) {
				start.x = positions.getX(i);
				start.y = positions.getY(i);
				start.z = positions.getZ(i);
				end.x = positions.getX(i + 1);
				end.y = positions.getY(i + 1);
				end.z = positions.getZ(i + 1);
				start.multiplyScalar(75);
				end.multiplyScalar(75);

				const object = new THREE.Mesh(
					boxGeometry,
					new THREE.MeshPhongMaterial(0xffffff)
				);

				object.position.copy(start);
				object.position.lerp(end, 0.5);
				object.scale.set(5, 5, start.distanceTo(end));
				object.lookAt(end);
				root.add(object);

			}
			render();
		})
	}

	const animate = () => {
		requestAnimationFrame( animate );
		controls.update();
		const time = Date.now() * 0.0015;
		root.rotation.x = time * 0.6;
		root.rotation.y = time * 0.4;
		render();
	}

	const render = () => renderer.render(scene, camera);

</script>

<div class="CompoundViewer" bind:this={container} ></div>
