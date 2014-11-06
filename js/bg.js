$(document).ready(function () {
    var camera, scene, renderer;
    var controls;

    var particlesTotal = 128;
    var positions = [];
    var objects = [];
    var current = 0;

    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
    }
    else {


        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
            camera.position.set(600, 400, 1500);
            camera.lookAt(new THREE.Vector3());

            scene = new THREE.Scene();

            var image = document.createElement('img');
            image.addEventListener('load', function (event) {

                for (var i = 0; i < particlesTotal; i++) {

                    var object = new THREE.CSS3DSprite(image.cloneNode());
                    object.position.x = Math.random() * 4000 - 2000,
                        object.position.y = Math.random() * 4000 - 2000,
                        object.position.z = Math.random() * 4000 - 2000
                    scene.add(object);

                    objects.push(object);

                }

                transition();

            }, false);
            image.src = './images/sprite.png';


            // Random

            for (var i = 0; i < particlesTotal * 4; i++) {

                positions.push(
                    Math.random() * 4000 - 2000,
                    Math.random() * 4000 - 2000,
                    Math.random() * 4000 - 2000
                );

            }


            renderer = new THREE.CSS3DRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.domElement.style.position = 'absolute';
            document.getElementById('container').appendChild(renderer.domElement);


            window.addEventListener('resize', onWindowResize, false);

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }

        function transition() {

            var offset = current * particlesTotal * 3;
            var duration = 2000;

            for (var i = 0, j = offset; i < particlesTotal; i++, j += 3) {

                var object = objects[i];

                new TWEEN.Tween(object.position)
                    .to({
                        x: positions[j],
                        y: positions[j + 1],
                        z: positions[j + 2]
                    }, Math.random() * duration + duration)
                    .easing(TWEEN.Easing.Exponential.InOut)
                    .start();

            }

            new TWEEN.Tween(this)
                .to({}, duration * 3)
                .onComplete(transition)
                .start();

            current = ( current + 1 ) % 4;

        }

        function animate() {

            requestAnimationFrame(animate);

            TWEEN.update();
            //controls.update();

            var time = performance.now();

            for (var i = 0, l = objects.length; i < l; i++) {

                var object = objects[i];
                var scale = Math.sin(( Math.floor(object.position.x) + time ) * 0.002) * 0.3 + 1;
                object.scale.set(scale, scale, scale);

            }

            renderer.render(scene, camera);

        }
    }
});