import '../App.css'
import React, { useState, useEffect, useRef } from "react";
import Slider from 'react-input-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import xbot from '../Models/xbot/xbot.glb';
import ybot from '../Models/ybot/ybot.glb';
import xbotPic from '../Models/xbot/xbot.png';
import ybotPic from '../Models/ybot/ybot.png';
import businessMan from '../Models/buisness_man_with_talking_animation.glb';
import vrGallery from '../Models/vr_modern_gallery_room.glb';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as words from '../Animations/words';
import * as alphabets from '../Animations/alphabets';
import { defaultPose } from '../Animations/defaultPose';

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function LearnSign() {
  const [bot, setBot] = useState(businessMan); // Use the realistic avatar by default
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  useEffect(() => {

    ref.flag = false;
    ref.pending = false;

    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xa0a0a0);

    // Add ambient and directional light for realism
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    ref.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    ref.scene.add(directionalLight);

    ref.renderer = new THREE.WebGLRenderer({ antialias: true });
    ref.camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth * 0.57 / (window.innerHeight - 70),
        0.1,
        1000
    );
    ref.renderer.setSize(window.innerWidth * 0.57, (window.innerHeight - 70));
    document.getElementById("canvas").innerHTML = "";
    document.getElementById("canvas").appendChild(ref.renderer.domElement);

    // Add OrbitControls
    ref.controls = new OrbitControls(ref.camera, ref.renderer.domElement);
    ref.controls.enableDamping = true;
    ref.controls.dampingFactor = 0.05;
    ref.controls.target.set(-2, 1, 0);

    ref.camera.position.set(0, 3, 7);
    ref.controls.target.set(-2, 1, 0);

    // Load the environment (vr modern gallery)
    const envLoader = new GLTFLoader();
    envLoader.load(
      vrGallery,
      (gltf) => {
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(1, 1, 1);
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            console.log('Mesh name:', child.name);
            if (child.name === 'Cube' || child.name === 'RectangularObject') {
              child.position.x = 2;
            }
          }
        });
        ref.scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error loading environment:', error);
      }
    );

    // Load the avatar (business man)
    let loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if ( child.type === 'SkinnedMesh' ) {
            child.frustumCulled = false;
          }
        });
        ref.avatar = gltf.scene;
        ref.avatar.position.set(-2, 0, 0);
        ref.avatar.scale.set(1, 1, 1);
        ref.scene.add(ref.avatar);
        defaultPose(ref);
      },
      (xhr) => {
        console.log(xhr);
      }
    );

    // Start a continuous render loop for OrbitControls
    ref.orbitRender = function orbitRenderLoop() {
      if (ref.controls) ref.controls.update();
      ref.renderer.render(ref.scene, ref.camera);
      ref.orbitFrame = requestAnimationFrame(ref.orbitRender);
    };
    ref.orbitRender();

    // Clean up on unmount
    return () => {
      if (ref.orbitFrame) cancelAnimationFrame(ref.orbitFrame);
    };
  }, [ref, bot]);

  ref.animate = () => {
    if(ref.animations.length === 0){
        ref.pending = false;
      return ;
    }
    requestAnimationFrame(ref.animate);
    if(ref.animations[0].length){
        if(!ref.flag) {
          for(let i=0;i<ref.animations[0].length;){
            let [boneName, action, axis, limit, sign] = ref.animations[0][i]
            if(sign === "+" && ref.avatar.getObjectByName(boneName)[action][axis] < limit){
                ref.avatar.getObjectByName(boneName)[action][axis] += speed;
                ref.avatar.getObjectByName(boneName)[action][axis] = Math.min(ref.avatar.getObjectByName(boneName)[action][axis], limit);
                i++;
            }
            else if(sign === "-" && ref.avatar.getObjectByName(boneName)[action][axis] > limit){
                ref.avatar.getObjectByName(boneName)[action][axis] -= speed;
                ref.avatar.getObjectByName(boneName)[action][axis] = Math.max(ref.avatar.getObjectByName(boneName)[action][axis], limit);
                i++;
            }
            else{
                ref.animations[0].splice(i, 1);
            }
          }
        }
    }
    else {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false
      }, pause);
      ref.animations.shift();
    }
    ref.renderer.render(ref.scene, ref.camera);
  }

  let alphaButtons = [];
  for (let i = 0; i < 26; i++) {
    alphaButtons.push(
        <div className='col-md-3'>
            <button className='signs w-100' onClick={()=>{
              if(ref.animations.length === 0){
                alphabets[String.fromCharCode(i + 65)](ref);
              }
            }}>
                {String.fromCharCode(i + 65)}
            </button>
        </div>
    );
  }

  let wordButtons = [];
  for (let i = 0; i < words.wordList.length; i++) {
    wordButtons.push(
        <div className='col-md-4'>
            <button className='signs w-100' onClick={()=>{
              if(ref.animations.length === 0){
                words[words.wordList[i]](ref);
              }
            }}>
                {words.wordList[i]}
            </button>
        </div>
    );
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
            <h1 className='heading'>
              Alphabets
            </h1>
            <div className='row'>
                {
                    alphaButtons
                }
            </div>
            <h1 className='heading'>
              Words
            </h1>
            <div className='row'>
                {
                    wordButtons
                }
            </div>
        </div>
        <div className='col-md-7'>
          <div id='canvas'/>
        </div>
        <div className='col-md-2'>
          <p className='bot-label'>
            Select Avatar
          </p>
          <img src={xbotPic} className='bot-image col-md-11' onClick={()=>{setBot(xbot)}} alt='Avatar 1: XBOT'/>
          <img src={ybotPic} className='bot-image col-md-11' onClick={()=>{setBot(ybot)}} alt='Avatar 2: YBOT'/>
          <p className='label-style'>
            Animation Speed: {Math.round(speed*100)/100}
          </p>
          <Slider
            axis="x"
            xmin={0.05}
            xmax={0.50}
            xstep={0.01}
            x={speed}
            onChange={({ x }) => setSpeed(x)}
            className='w-100'
          />
          <p className='label-style'>
            Pause time: {pause} ms
          </p>
          <Slider
            axis="x"
            xmin={0}
            xmax={2000}
            xstep={100}
            x={pause}
            onChange={({ x }) => setPause(x)}
            className='w-100'
          />
        </div>
      </div>
    </div>
  )
}

export default LearnSign;
