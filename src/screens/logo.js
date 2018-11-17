import $ from 'jquery';
import TimelineMax from 'gsap/TimelineMax';
import { Power1, Power2 } from 'gsap/TweenLite';
import {Elastic} from 'gsap/EasePack';
import TweenMax from 'gsap/umd/TweenMax.js';

function logoWebbab() {

        // VARIABLES

        var self = this;
        self.wrapperLogo = $('.logo-wrapper');
        self.svgLogo = $('#logo-webbab');
        self.isoLogo = $('#logo-webbab #iso');
        self.rhombusLogo = $('.rhombus');
        self.logoCircle = $('.logo-circle');
        self.logoEllipse = $('.logo-ellipse');
        self.wordLogo = $('.word');

        // MOBILE DETECT: IF A MOBILE IS DETECTED THE LOGO IS REPLACED FOR AVOID PERFORMANCE PROBLEMS.

        self.isDevice = (/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));
        self.mobileLogoColor = '#FFFFFF';
        self.mobileLogo = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 388.691 120"><path fill="' + self.mobileLogoColor + '" d="M152.605 40.084l5.905 29.605h.277l5.045-29.606h11.31l5.044 29.605h.276l6.126-29.606h10.062L186.533 80.66H175.14l-5.515-28.902h-.277l-5.516 28.903h-11.586l-9.924-40.576M197.37 40.084h30.77v8.447h-20.652v6.792h18.85v8.334h-18.85v8.446h21.51v8.56H197.37M232.518 40.084H251.2c9.535 0 14.303 3.564 14.303 10.69 0 2.134-.453 3.855-1.358 5.165-.85 1.234-2.272 2.31-4.27 3.226 2.015.187 3.688 1.27 5.02 3.255 1.2 1.797 1.8 3.78 1.8 5.95 0 4.957-1.932 8.38-5.793 10.27-2.717 1.348-6.82 2.02-12.307 2.02h-16.077V40.085zm17.157 15.912c4.084 0 6.127-1.375 6.127-4.126 0-2.487-1.913-3.73-5.738-3.73h-7.706v7.856h7.317zm6.958 12.206c0-3.143-1.743-4.714-5.23-4.714h-9.046v9.12h7.968c4.205-.02 6.308-1.487 6.308-4.406M270.104 40.084h18.682c9.535 0 14.303 3.564 14.303 10.69 0 2.134-.454 3.855-1.36 5.165-.85 1.234-2.272 2.31-4.268 3.226 2.014.187 3.687 1.27 5.017 3.255 1.2 1.797 1.8 3.78 1.8 5.95 0 4.957-1.93 8.38-5.79 10.27-2.718 1.348-6.82 2.02-12.31 2.02h-16.075V40.085zm17.158 15.912c4.083 0 6.126-1.375 6.126-4.126 0-2.487-1.913-3.73-5.738-3.73h-7.706v7.856h7.318zm6.957 12.206c0-3.143-1.744-4.714-5.23-4.714h-9.047v9.12h7.968c4.206-.02 6.31-1.487 6.31-4.406M318 40.084h10.895l14.718 40.576h-10.92l-2.494-7.576h-13.39l-2.384 7.576H303.7L318 40.084zm9.87 24.61L323.57 50.44l-4.38 14.255h8.677zM345.276 40.084h18.682c9.535 0 14.304 3.564 14.304 10.69 0 2.134-.453 3.855-1.358 5.165-.85 1.234-2.273 2.31-4.27 3.226 2.015.187 3.687 1.27 5.018 3.255 1.2 1.797 1.802 3.78 1.802 5.95 0 4.957-1.932 8.38-5.793 10.27-2.716 1.348-6.818 2.02-12.307 2.02h-16.076V40.085zm17.158 15.912c4.084 0 6.126-1.375 6.126-4.126 0-2.487-1.912-3.73-5.737-3.73h-7.706v7.856h7.317zm6.958 12.206c0-3.143-1.743-4.714-5.23-4.714h-9.045v9.12h7.968c4.203-.02 6.307-1.487 6.307-4.406"/><g fill="' + self.mobileLogoColor + '"><path d="M381.69 45.39v-3.614h-1.334v-.757h3.506v.756h-1.297v3.613M384.384 45.39v-4.37h1.365l.785 3.008.79-3.01h1.366v4.37h-.832v-3.484l-.933 3.485h-.79l-.928-3.486v3.485"/></g><g fill="' + self.mobileLogoColor + '" fill-rule="evenodd" clip-rule="evenodd"><path d="M4.07 50.13l7.843-7.842c3.55 3.73 7.49 7.37 11.785 10.866-.068.11-.13.22-.19.335-5.64-.22-11.217-.923-16.575-2.205-1.046-.25-2.104-.53-3.17-.838.1-.106.204-.212.308-.316M13.547 40.654L50.13 4.07c5.428-5.427 14.31-5.427 19.74 0l12.28 12.283c-.23 5.728-.842 11.477-1.78 17.163-.132-.007-.267-.01-.403-.01-4.545 0-8.232 3.686-8.232 8.232 0 1.01.182 1.978.516 2.87-5.156 2.09-10.422 3.802-15.633 5.14-7.445 1.912-15.36 3.21-23.318 3.65-.942-1.72-2.77-2.89-4.872-2.89-1.163 0-2.242.36-3.134.97-4.165-3.38-8.108-6.99-11.747-10.824M97.83 32.032l18.098 18.1c5.43 5.427 5.43 14.31 0 19.738l-14.753 14.753c-9.12-1.293-18.182-3.546-26.86-6.483l.003-.19c0-2.334-1.18-4.393-2.977-5.612 1.513-3.513 2.926-7.132 4.23-10.848 1.355-3.866 2.552-7.724 3.595-11.558.264.026.532.04.803.04 4.546 0 8.232-3.687 8.232-8.233 0-.986-.174-1.93-.49-2.806 3.648-2.16 7.032-4.474 10.12-6.902M99.146 86.652L69.87 115.928c-5.43 5.43-14.31 5.43-19.74 0l-3.82-3.82c7.042-7.742 13.585-17.082 19.227-27.68.633.195 1.304.302 2 .302 2.868 0 5.32-1.782 6.312-4.298 8.586 2.89 17.087 4.953 25.296 6.22M44.676 110.474L4.07 69.87C-.797 65-1.3 57.353 2.567 51.912c6.122 1.844 13 2.966 20.377 3.29-.043.28-.066.564-.066.855 0 3.064 2.485 5.55 5.55 5.55 1.624 0 3.086-.7 4.1-1.813 8.105 5.624 17.172 10.738 27.023 15.09.542.24 1.085.477 1.628.71-.272.734-.422 1.527-.422 2.356 0 2.218 1.067 4.188 2.715 5.426-5.194 9.767-11.474 19.048-18.794 27.098M76.903 49.38c-1.6-.642-2.95-1.77-3.87-3.204-5.04 2.052-10.386 3.827-15.983 5.264-7.904 2.03-15.698 3.232-23.155 3.67.053.308.08.625.08.947 0 .604-.096 1.184-.274 1.73 8.515 5.913 17.646 10.933 26.79 14.97.62.275 1.246.547 1.874.813 1.243-1.468 3.1-2.4 5.175-2.4.58 0 1.145.073 1.683.21 1.523-3.54 2.91-7.105 4.155-10.66 1.292-3.69 2.474-7.48 3.525-11.34M84.357 18.56L96.59 30.79c-3.038 2.383-6.272 4.575-9.646 6.575-.99-1.578-2.502-2.796-4.294-3.414.862-5.242 1.427-10.387 1.707-15.394"/></g></svg>';

        // INCREASE OR DECREACE THE ANIMATION SPEED.

        self.timer = 0.9;


        self.init = function () {

            if (!self.isDevice) {
                self.setObj();
                self.animation();
            } else {
                self.wrapperLogo.empty().append(self.mobileLogo);
            }

        };

        self.setObj = function () {

            TweenMax.set(self.isoLogo, { attr: { rx: 50, ry: 50 }, transformOrigin: "50% 50%", rotation: 90, scale: 0, autoAlpha: 1 });
            TweenMax.set(self.logoCircle, { transformOrigin: "50% 50%", scale: 2, autoAlpha: 0 });
            TweenMax.set(self.logoEllipse, { attr: { cx: 100, cy: 150, rx: 180, ry: 180 }, strokeWidth: 60, transformOrigin: "50% 50%", autoAlpha: 0 });

        };

        self.animation = function () {

            TweenMax.ticker.fps(60);


            function rhombusRotation() {
                var tl = new TimelineMax();
                tl.to(self.isoLogo, 0.6, {
                    autoAlpha: 1,
                    scale: 1,
                    ease: Power1.easeIn
                })
                    .to(self.isoLogo, 0.6, {
                        attr: { rx: 15, ry: 15 },
                        rotation: -45,
                        ease: Power1.easeOut
                    });
                return tl;
            }

            function ellipsesAnimation() {
                var tl = new TimelineMax();
                tl.to(self.logoEllipse.eq(0), 0.4, {
                    attr: {
                        cx: 6,
                        cy: -64,
                        rx: 150,
                        ry: 150
                    },
                    strokeWidth: 2,
                    autoAlpha: 1,
                    ease: Power2.easeOut
                })
                    .to(self.logoEllipse.eq(1), 0.4, {
                        attr: {
                            cx: 138,
                            cy: -80,
                            rx: 150,
                            ry: 150
                        },
                        strokeWidth: 2,
                        autoAlpha: 1,
                        ease: Power2.easeOut
                    }, '-=0.2')
                    .to(self.logoEllipse.eq(2), 0.4, {
                        attr: {
                            cx: 190,
                            cy: 15,
                            rx: 150,
                            ry: 150
                        },
                        strokeWidth: 2,
                        autoAlpha: 1,
                        ease: Power2.easeOut
                    }, '-=0.2');
                return tl;
            }

            function circleIntersection() {
                var tl = new TimelineMax();
                tl.staggerFromTo(self.logoCircle, 0.4, {
                    autoAlpha: 0,
                    scale: 0
                }, {
                        autoAlpha: 1,
                        scale: 1,
                        ease: Elastic.easeInOut
                    }, 0.1);
                return tl;
            }

            function textAnimation() {
                var tl = new TimelineMax();
                tl.staggerFromTo(self.wordLogo, 1.5, {
                    autoAlpha: 0,
                    scale: 0.8,
                    x: -20,
                    transformOrigin: "left center",
                    ease: Elastic.easeOut.config(1, 0.3)
                }, {
                        autoAlpha: 1,
                        scale: 1,
                        x: 0,
                        ease: Elastic.easeOut.config(1, 0.5)
                    }, 0.05);
                return tl;
            }

            // MASTER SCENES

            var master = new TimelineMax({

                // LOOP
                /*repeat: -1,
                repeatDelay: 0.5, 
                yoyo: true*/

            });
            master//.add(pulseCircle(), "scene1")
                .add(rhombusRotation(), "scene2")
                .add(ellipsesAnimation(), "-=0.6", "scene3")
                .add(circleIntersection(), "-=0.4", "scene4")
                .add(textAnimation(), "-=0.5", "scene5");
            master.timeScale(self.timer);

            // Control buttons - delete

            $('.play').on('click', function (e) {
                e.preventDefault();
                master.play(!master.play());
            });

            $('.reverse').on('click', function (e) {
                e.preventDefault();
                master.reversed(!master.reversed());
            });

        };

    }

export default logoWebbab