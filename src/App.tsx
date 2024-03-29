import {
    CartesianDroTileDefinition,
    CartesianJogTileDefinition,
    ConnectTileDefinition,
    DockLayout,
    DockLayoutProvider,
    DockTileDefinitionBuilder,
    EmStatTileDefinition,
    FeedRateTileDefinition,
    FramesTileDefinition,
    IntegerOutputsTileDefinition,
    JointDroTileDefinition,
    JointJogTileDefinition,
    JointTorqueModesTileDefinition,
    PointsTileDefinition,
    SerialCommunicationsTileDefinition,
    TelemetryTileDefinition,
    ThreeDimensionalSceneTileDefinition
} from "@glowbuzzer/controls"
import * as React from "react"
import {AwRobotSceneTile} from "./tiles/AwRobotSceneTile"
import {AppMenu} from "./AppMenu"
import {AwTubeStatusTileDefinitionBuilder, RgbStateHandler} from "@glowbuzzer/awlib"
import {SimpleMoveTile} from "./tiles/SimpleMoveTile"

const AwRobotSceneTileDefinition = DockTileDefinitionBuilder(ThreeDimensionalSceneTileDefinition)
    .render(() => <AwRobotSceneTile />)
    .build()

const SimpleMoveTileDefinition = DockTileDefinitionBuilder()
    .id("aw-simple-move")
    .name("Simple Move")
    .render(() => <SimpleMoveTile />)
    .build()

export const App = () => {
    return (
        <>
            <RgbStateHandler />
            <DockLayoutProvider
                tiles={[
                    ConnectTileDefinition,
                    AwRobotSceneTileDefinition,
                    CartesianDroTileDefinition,
                    JointDroTileDefinition,
                    CartesianJogTileDefinition,
                    JointJogTileDefinition,
                    TelemetryTileDefinition,
                    PointsTileDefinition,
                    FramesTileDefinition,
                    FeedRateTileDefinition,
                    AwTubeStatusTileDefinitionBuilder({
                        showSoftwareStop: false,
                        showToolInputs: false,
                        showToolOutputs: true
                    }),
                    SimpleMoveTileDefinition,
                    SerialCommunicationsTileDefinition,
                    JointTorqueModesTileDefinition,
                    EmStatTileDefinition,
                    IntegerOutputsTileDefinition
                ]}
            >
                <AppMenu />
                <DockLayout />
            </DockLayoutProvider>
        </>
    )
}
