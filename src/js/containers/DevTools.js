import React from "react"

// Exported from redux-devtools
import { createDevTools } from "redux-devtools"

// Monitors are separate packages, and you can make a custom one
import LogMonitor from "@osener/redux-devtools-log-monitor"
import DockMonitor from "redux-devtools-dock-monitor"
import actionTransformer from "../store/actionTransformer"

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  <DockMonitor toggleVisibilityKey="alt-h" changePositionKey="alt-q">
    <LogMonitor actionTransformer={actionTransformer} />
  </DockMonitor>
)

export default DevTools