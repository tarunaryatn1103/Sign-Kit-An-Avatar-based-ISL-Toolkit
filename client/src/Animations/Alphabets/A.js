export const A = (ref) => {

    let animations = []

    animations.push(["L_Index1_065", "rotation", "y", -Math.PI/9, "-"]);
    animations.push(["L_Mid1_062", "rotation", "y", -Math.PI/18, "-"]);
    animations.push(["L_Ring1_059", "rotation", "y", Math.PI/18, "+"]);
    animations.push(["L_Pinky1_056", "rotation", "y", Math.PI/9, "+"]);

    animations.push(["L_Hand_055", "rotation", "x", Math.PI/2, "+"]);
    animations.push(["L_Hand_055", "rotation", "z", Math.PI/6, "+"]);
    animations.push(["L_Hand_055", "rotation", "y", Math.PI/9, "+"]);

    animations.push(["L_Forearm_051", "rotation", "x", Math.PI/10, "+"]);
    animations.push(["L_Forearm_051", "rotation", "z", -Math.PI/18, "-"]);

    animations.push(["L_Upperarm_050", "rotation", "x", -Math.PI/11, "-"]);

    animations.push(["R_Mid1_087", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["R_Mid2_088", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["R_Mid3_089", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["R_Ring1_084", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["R_Ring2_085", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["R_Ring3_086", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["R_Pinky1_096", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["R_Pinky2_097", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["R_Pinky3_098", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["R_Pinky1_096", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["R_Pinky2_097", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["R_Pinky3_098", "rotation", "z", Math.PI/2, "+"]);
    animations.push(["R_Thumb2_091", "rotation", "y", -Math.PI/2.5, "-"]);
    animations.push(["R_Thumb3_092", "rotation", "y", -Math.PI/2.5, "-"]);

    animations.push(["R_Hand_083", "rotation", "x", -Math.PI/2, "-"]);
    animations.push(["R_Hand_083", "rotation", "z", Math.PI/12, "+"]);

    animations.push(["R_Forearm_079", "rotation", "z", Math.PI/4, "+"]);
    animations.push(["R_Forearm_079", "rotation", "x", -Math.PI/36, "-"]);

    animations.push(["R_Upperarm_078", "rotation", "x", -Math.PI/9, "-"]);
    animations.push(["R_Upperarm_078", "rotation", "y", -Math.PI/72, "-"]);

    ref.animations.push(animations);

    animations = []

    animations.push(["L_Index1_065", "rotation", "y", 0, "+"]);
    animations.push(["L_Mid1_062", "rotation", "y", 0, "+"]);
    animations.push(["L_Ring1_059", "rotation", "y", 0, "-"]);
    animations.push(["L_Pinky1_056", "rotation", "y", 0, "-"]);

    animations.push(["L_Hand_055", "rotation", "x", 0, "-"]);
    animations.push(["L_Hand_055", "rotation", "z", 0, "-"]);
    animations.push(["L_Hand_055", "rotation", "y", 0, "-"]);

    animations.push(["L_Forearm_051", "rotation", "x", 0, "-"]);
    animations.push(["L_Forearm_051", "rotation", "z", 0, "+"]);

    animations.push(["L_Upperarm_050", "rotation", "x", 0, "+"]);

    animations.push(["R_Mid1_087", "rotation", "z", 0, "-"]);
    animations.push(["R_Mid2_088", "rotation", "z", 0, "-"]);
    animations.push(["R_Mid3_089", "rotation", "z", 0, "-"]);
    animations.push(["R_Ring1_084", "rotation", "z", 0, "-"]);
    animations.push(["R_Ring2_085", "rotation", "z", 0, "-"]);
    animations.push(["R_Ring3_086", "rotation", "z", 0, "-"]);
    animations.push(["R_Pinky1_096", "rotation", "z", 0, "-"]);
    animations.push(["R_Pinky2_097", "rotation", "z", 0, "-"]);
    animations.push(["R_Pinky3_098", "rotation", 0, "-"]);
    animations.push(["R_Pinky1_096", "rotation", "z", 0, "-"]);
    animations.push(["R_Pinky2_097", "rotation", "z", 0, "-"]);
    animations.push(["R_Pinky3_098", "rotation", "z", 0, "-"]);
    animations.push(["R_Thumb2_091", "rotation", "y", 0, "+"]);
    animations.push(["R_Thumb3_092", "rotation", "y", 0, "+"]);

    animations.push(["R_Hand_083", "rotation", "x", 0, "+"]);
    animations.push(["R_Hand_083", "rotation", "z", 0, "-"]);

    animations.push(["R_Forearm_079", "rotation", "z", 0, "-"]);
    animations.push(["R_Forearm_079", "rotation", "x", 0, "+"]);

    animations.push(["R_Upperarm_078", "rotation", "x", 0, "+"]);
    animations.push(["R_Upperarm_078", "rotation", "y", 0, "+"]);

    ref.animations.push(animations);

    if(ref.pending === false){
        ref.pending = true;
        ref.animate();
    }

}