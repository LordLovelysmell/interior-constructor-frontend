import React from "react";
import { UniversalCamera, Vector3, HemisphericLight, MeshBuilder, Scene, Mesh, StandardMaterial, SceneLoader } from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials";
import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods
import "@babylonjs/inspector"; // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version

import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";

import SceneComponent from "../SceneComponent"; // uses above component in same directory
import cubeMesh from '../../../assets/models/cube.glb';

import "./BasicScene.scss";

const onSceneReady = async (scene: Scene) => {
  const camera = new UniversalCamera("camera", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
  const light = new HemisphericLight("light", new Vector3(0, -15, 0), scene);
  light.intensity = 0.7;

  const boxWidth = 1;
  const boxHeight = 0.100;
  const box = MeshBuilder.CreateBox("box", { width: boxWidth, height: boxHeight });
  const opacityMaterial = new StandardMaterial("opacity-material");
  opacityMaterial.alpha = 0.5;

  box.material = opacityMaterial;
  
  const gridSize = 10;
  const centerOffset = gridSize / 2 - boxWidth / 2;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const _box = box.clone(`tile/row:${i};element:${j}`);
      _box.position = new Vector3(j - centerOffset, boxHeight / 2, i - centerOffset);

      _box.metadata = {
        name: 'tile',
        row: i,
        index: j
      }
    }
  }

  // const _squaredWalls = await SceneLoader.ImportMeshAsync('', './models/', 'cube.glb', scene);
  const _squaredWalls = await SceneLoader.ImportMeshAsync('', '', cubeMesh, scene, undefined, '.glb');

  scene.onPointerDown = function (evt, { pickedMesh }) {
    if (pickedMesh && pickedMesh.metadata && pickedMesh.metadata.name == 'tile') {
      // const clonedSqWall = squaredWallsMesh.clone("name", '');

      // clonedSqWall.scalingDeterminant = 0.5;

      // clonedSqWall.position = pickedMesh.position;
      // clonedSqWall.position.y = 0.5;
    }
  }

  box.dispose();

  const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
  ground.material = new GridMaterial("grid", scene);

  scene.debugLayer.show();
};

export default () => (
    <SceneComponent antialias onSceneReady={onSceneReady} id="my-canvas" />
);