window.onload = function() {
	Player.init();
}

Player = {
	init: function() {
		var container = document.getElementsByClassName('webgl')[0];
		var aspect = container.offsetWidth / container.offsetHeight;
		var geometry, material, light, pointLight, axisHelper, pointLightHelper, textureLoader;

		this.scene = new THREE.Scene();
		/* Делаем сцену глобальной для threejs inspector */
		window.scene = this.scene;

		axisHelper = new THREE.AxisHelper(500);
		this.scene.add(axisHelper);

		/*
		PerspectiveCamera параметры
		1. угол обзора
		2. соотношение сторон (aspect)
		3. ближняя плоскость отсечения
		4. дальняя плоскость отсечения
		(плоскости отсечения - это предельные плоскости видимости объектов в камере)
		*/
		this.camera = new THREE.PerspectiveCamera(45.0, aspect, 1, 1000);
		/* отодвигаем камеру на 20 чтобы видеть что происходит в точке 0,0 */
		this.camera.position.z = 20; 
		this.scene.add(this.camera);

		/* Добавляем обычный рассеянный свет */
		light = new THREE.AmbientLight();
		this.scene.add(light);

		pointLight = new THREE.PointLight(0xff0000, 2, 100);
		pointLight.position.set(10,10,10);
		//this.scene.add(pointLight);

		pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
		//this.scene.add(pointLightHelper);

		this.renderer = new THREE.WebGLRenderer();
		container.appendChild(this.renderer.domElement);
		/*  
			Устанавливаем размер пикселя в соответствии с девайсом
			для более четкого отображения
		*/
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(container.offsetWidth, container.offsetHeight);

		/*
			SphereGeomerty параметры
			1. размер
			2. количество полигонов по ширине
			3. количество полигонов по высоте
			(полигон простейший элемент состоящий из вершин (треугольник))
		*/
		textureLoader = new THREE.TextureLoader();
		textureLoader.load('earth4.jpg', function(texture) {
			geometry = new THREE.SphereGeometry(5, 30, 30);
			material = new THREE.MeshPhongMaterial({map: texture});
			Player.mesh = new THREE.Mesh(geometry, material);
			Player.scene.add(Player.mesh);
		});
		

		this.controls = new THREE.TrackballControls(this.camera, container);
		this.controls.zoomSpeed = 0.1;

		this.animate();
	},

	animate: function() {
		requestAnimationFrame(this.animate.bind(this));
		this.controls.update();
		Player.mesh.rotation.y += 0.003;
		//Player.mesh.position.z += 0.01;
		this.renderer.render(this.scene, this.camera);
	}
}