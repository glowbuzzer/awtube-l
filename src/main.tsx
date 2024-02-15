import * as React from "react"
import {createRoot} from "react-dom/client"

import {GlowbuzzerApp, SerialCommunicationsProvider} from "@glowbuzzer/controls"
import {App} from "./App"

import "antd/dist/reset.css"
import "dseg/css/dseg.css"
import "flexlayout-react/style/light.css"

const root = createRoot(document.getElementById("root")!)

root.render(
    <GlowbuzzerApp appName="awtube-l">
        <SerialCommunicationsProvider>
            <App/>
        </SerialCommunicationsProvider>
    </GlowbuzzerApp>
)
