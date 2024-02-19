/*
 * Copyright (c) 2023. Glowbuzzer. All rights reserved
 */

import { Button, Space, InputNumber, Alert, Progress } from "antd"
import { useIntegerOutputState, useStream } from "@glowbuzzer/store"
import { useState } from "react"



export const SimpleMoveTile = () => {
    const { execute } = useStream(0)
    const [, setColour] = useIntegerOutputState(0)
    const [loop_iterations, setLoopIterations] = useState<number>(1);
    const [current_iteration, setCurrentIteration] = useState(0);
    const [visible, setVisible] = useState(false);
    const [start_disabled, setStartDisable] = useState(false);
    const [reset_disabled, setResetDisable] = useState(false);
    const [input_disable, setInputDisable] = useState(false);

    async function drawSquare() {
        setStartDisable(true);
        setResetDisable(false);
        setInputDisable(true);

        for (let it = 0; it < loop_iterations; it++) {
            const edge = 180
            await execute(api => [
                api
                    .moveToPosition()
                    .translation(400, 400, -30)
                    .rotationEuler(0, Math.PI, Math.PI)
                    .configuration(0)
                    .promise()
                    .then(() => setColour(0x0000ff, true)), // turn blue
                api.moveLine(-edge).relative(),
                api.moveLine(0, edge).relative(),
                api.moveLine(edge, 0).relative(),
                api.moveLine(0, -edge).relative(),

            ]).then(() => {
                setCurrentIteration(it + 1)
            })
        }
        setVisible(true);
        setResetDisable(true);
    }

    function reset() {
        setCurrentIteration(0);
        setLoopIterations(1);
        setVisible(false);
        setStartDisable(false);
        setInputDisable(false);
        setResetDisable(false);
    }

    return (
        <div style={{ padding: "10px" }}>
            <Space direction="vertical">
                <Space>
                    <Space>
                        Draw a square
                        <InputNumber disabled={input_disable} size="small" min={1} max={1000} defaultValue={1} changeOnWheel value={loop_iterations} onChange={setLoopIterations} />
                        times
                    </Space>

                </Space>

                <Space size={50} >
                    <Space>
                        {current_iteration} / {loop_iterations}

                    </Space>
                    <Progress steps={50} size="small" percent={Math.round((current_iteration / loop_iterations) * 100)} status="active" />
                </Space>

                <Space>
                    {visible && (<Alert
                        message={`All ${loop_iterations} loop iterations are done `}
                        type="success"
                        showIcon
                    />)}
                </Space>

                <Space>
                    <Button disabled={start_disabled} size="small" onClick={drawSquare}>
                        Start
                    </Button>
                    <Button disabled={!reset_disabled} size="small" onClick={reset}>
                        Reset
                    </Button>
                </Space>
            </Space>
        </div >
    )
}
