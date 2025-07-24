import '../App.css'
import React, { useState, useEffect, useRef } from "react";
import Slider from 'react-input-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import xbot from '../Models/xbot/xbot.glb';
import ybot from '../Models/ybot/ybot.glb';
import xbotPic from '../Models/xbot/xbot.png';
import ybotPic from '../Models/ybot/ybot.png';

import * as words from '../Animations/words';
import * as alphabets from '../Animations/alphabets';
import { defaultPose } from '../Animations/defaultPose';

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import businessMan from '../Models/buisness_man_with_talking_animation.glb';
import vrGallery from '../Models/vr_modern_gallery_room.glb';

function Convert() {
  const [text, setText] = useState("");
  const [bot, setBot] = useState(businessMan); // Use the realistic avatar by default
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  let textFromAudio = React.createRef();
  let textFromInput = React.createRef();

  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {

    ref.flag = false;
    ref.pending = false;

    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xa0a0a0); // light gray background

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
    )
    ref.renderer.setSize(window.innerWidth * 0.57, window.innerHeight - 70);

    document.getElementById("canvas").innerHTML = "";
    document.getElementById("canvas").appendChild(ref.renderer.domElement);

    // Add OrbitControls
    ref.controls = new OrbitControls(ref.camera, ref.renderer.domElement);
    ref.controls.enableDamping = true;
    ref.controls.dampingFactor = 0.05;
    ref.controls.target.set(0, 1, 0); // focus on avatar's head/center

    ref.camera.position.set(0, 2, 3); // Move camera back and up for better view
    ref.controls.target.set(0, 1, 0); // Focus on avatar's head/center

    // Load the environment (vr modern gallery)
    const envLoader = new GLTFLoader();
    envLoader.load(
      vrGallery,
      (gltf) => {
        gltf.scene.position.set(0, 0, 0); // Adjust as needed
        gltf.scene.scale.set(1, 1, 1); // Adjust scale if needed
        // Try to move the rectangular object to the right
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            console.log('Mesh name:', child.name); // Log all mesh names
            // Example: Move a mesh named 'Cube' to the right
            if (child.name === 'Cube' || child.name === 'RectangularObject') {
              child.position.x = 2; // Move to the right
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
        ref.avatar.position.set(-2, 0, 0); // Move avatar to the left
        ref.avatar.scale.set(1, 1, 1); // Adjust scale if needed
        ref.scene.add(ref.avatar);
        defaultPose(ref);
      },
      (xhr) => {
        console.log(xhr);
      }
    );

    // Adjust camera for full body visibility
    ref.camera.position.set(0, 3, 7);
    ref.controls.target.set(-2, 1, 0); // Focus on avatar's head/center

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
          if(ref.animations[0][0]==='add-text'){
            setText(text + ref.animations[0][1]);
            ref.animations.shift();
          }
          else{
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
    }
    else {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false
      }, pause);
      ref.animations.shift();
    }
    // Update orbit controls
    if (ref.controls) ref.controls.update();
    ref.renderer.render(ref.scene, ref.camera);
  }

  const sign = (inputRef) => {
    
    var str = inputRef.current.value.toUpperCase();
    var strWords = str.split(' ');
    setText('')

    for(let word of strWords){
      if(words[word]){
        ref.animations.push(['add-text', word+' ']);
        words[word](ref);
        
      }
      else{
        for(const [index, ch] of word.split('').entries()){
          if(index === word.length-1)
            ref.animations.push(['add-text', ch+' ']);
          else 
            ref.animations.push(['add-text', ch]);
          alphabets[ch](ref);
          
        }
      }
    }
  }

  const startListening = () =>{
    SpeechRecognition.startListening({continuous: true});
  }

  const stopListening = () =>{
    SpeechRecognition.stopListening();
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <label className='label-style'>
            Processed Text
          </label>
          <textarea rows={3} value={text} className='w-100 input-style' readOnly />
          <label className='label-style'>
            Speech Recognition: {listening ? 'on' : 'off'}
          </label>
          <div className='space-between'>
            <button className="btn btn-primary btn-style w-33" onClick={startListening}>
              Mic On <i className="fa fa-microphone"/>
            </button>
            <button className="btn btn-primary btn-style w-33" onClick={stopListening}>
              Mic Off <i className="fa fa-microphone-slash"/>
            </button>
            <button className="btn btn-primary btn-style w-33" onClick={resetTranscript}>
              Clear
            </button>
          </div>
          <textarea rows={3} ref={textFromAudio} value={transcript} placeholder='Speech input ...' className='w-100 input-style' />
          <button onClick={() => {sign(textFromAudio)}} className='btn btn-primary w-100 btn-style btn-start'>
            Start Animations
          </button>
          <label className='label-style'>
            Text Input
          </label>
          <textarea rows={3} ref={textFromInput} placeholder='Text input ...' className='w-100 input-style' />
          <button onClick={() => {sign(textFromInput)}} className='btn btn-primary w-100 btn-style btn-start'>
            Start Animations
          </button>
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

export default Convert;