import React from "react"
import { ThreeDimensionalSceneTile } from "@glowbuzzer/controls"
import { AwTubeL } from "../scene/AwTubeL"
import { Environment } from "@react-three/drei"
import { PlaneShinyMetal } from "../scene/PlaneShinyMetal"

export const AwRobotSceneTile = () => {
    return (
        <ThreeDimensionalSceneTile hidePreview>
            <AwTubeL />
            <PlaneShinyMetal />
            <Environment files="/assets/environment/aerodynamics_workshop_1k.hdr" />
        </ThreeDimensionalSceneTile>
    )
}
