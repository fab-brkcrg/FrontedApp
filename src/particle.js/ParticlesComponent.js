import React,{useEffect} from 'react';
import Particles from 'react-tsparticles';
import { tsParticles } from "tsparticles-engine";

// const ParticlesComponent = () => {
//     const particlesOptions = {
        
//             particles: {
//               number: {
//                 value: 80, // Parçacıkların sayısı
//                 density: {
//                   enable: true,
//                   value_area: 800, // Parçacıkların dağılım yoğunluğu
//                 },
//               },
//               color: {
//                 value: "#4a3f92", // Parçacık rengi
//               },
//               shape: {
//                 type: "circle", // Parçacık şekli (örn. "circle", "edge", "triangle", "polygon", "star", "image")
//                 stroke: {
//                   width: 0,
//                   color: "#000000",
//                 },
//                 polygon: {
//                   nb_sides: 5, // Eğer şekil "polygon" ise, kenar sayısı
//                 },
//                 image: {
//                   src: "path/to/image.svg",
//                   width: 100,
//                   height: 100,
//                 },
//               },
//               opacity: {
//                 value: 0.5, // Opaklık değeri
//                 random: false,
//                 anim: {
//                   enable: false,
//                   speed: 1,
//                   opacity_min: 0.1,
//                   sync: false,
//                 },
//               },
//               size: {
//                 value: 3, // Parçacık boyutu
//                 random: true, // Rastgele boyut
//                 anim: {
//                   enable: false,
//                   speed: 40,
//                   size_min: 0.1,
//                   sync: false,
//                 },
//               },
//               line_linked: {
//                 enable: true, // Parçacıklar arası bağlantı çizgileri
//                 distance: 150, // Çizgi mesafesi
//                 color: "#ffffff",
//                 opacity: 0.4,
//                 width: 1,
//               },
//               move: {
//                 enable: true,
//                 speed: 6, // Hareket hızı
//                 direction: "none", // Hareket yönü
//                 random: false,
//                 straight: false,
//                 out_mode: "out", // "out" veya "bounce" dışarı çıkma modu
//                 bounce: false,
//                 attract: {
//                   enable: false,
//                   rotateX: 600,
//                   rotateY: 1200,
//                 },
//               },
//             },
//             interactivity: {
//               detect_on: "canvas",
//               events: {
//                 onhover: {
//                   enable: true,
//                   mode: "repulse", // "grab", "bubble", "repulse"
//                 },
//                 onclick: {
//                   enable: true,
//                   mode: "push", // "push", "remove", "bubble", "repulse"
//                 },
//                 resize: true,
//               },
//               modes: {
//                 grab: {
//                   distance: 140,
//                   line_linked: {
//                     opacity: 1,
//                   },
//                 },
//                 bubble: {
//                   distance: 400,
//                   size: 40,
//                   duration: 2,
//                   opacity: 8,
//                   speed: 3,
//                 },
//                 repulse: {
//                   distance: 200,
//                   duration: 0.4,
//                 },
//                 push: {
//                   particles_nb: 4,
//                 },
//                 remove: {
//                   particles_nb: 2,
//                 },
//               },
//             },
//             retina_detect: true, // Retina ekranlar için algılama
          
          
//     };

//     return <Particles id="tsparticles" options={particlesOptions} />;
// };
const ParticlesComponent = () => {
  useEffect(() => {
      tsParticles.load("tsparticles", {
          preset: "fire",
      });
  }, []);

  return <Particles id="tsparticles" />;
};



export default ParticlesComponent;
