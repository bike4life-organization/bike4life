/* global document */
import React, { useState } from "react";
import ReactDom from "react-dom";
import MapGL from "react-map-gl";
import {
  Editor,
  EditingMode,
  DrawLineStringMode,
  DrawPolygonMode,
} from "react-map-gl-draw";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoiY2pwY3owbGFxMDVwNTNxcXdwMms2OWtzbiJ9.1PPVl0VLUQgqrosrI2nUhg";

const MODES = [
  { id: "drawPolyline", text: "Draw Polyline", handler: DrawLineStringMode },
  { id: "drawPolygon", text: "Draw Polygon", handler: DrawPolygonMode },
  { id: "editing", text: "Edit Feature", handler: EditingMode },
];

const DEFAULT_VIEWPORT = {
  width: 800,
  height: 600,
  longitude: -122.45,
  latitude: 37.78,
  zoom: 14,
};

const NebulaMap = () => {

    const [state, setState] = useState<any>({
        viewport: DEFAULT_VIEWPORT,
        modeId: null,
        modeHandler: null,
    })

    const _switchMode = (evt: any) => {
        const modeId =
          evt.target.value === state.modeId ? null : evt.target.value;
        const mode = MODES.find((m) => m.id === modeId);
        const modeHandler = mode ? new mode.handler() : null;
        setState({ modeId, modeHandler });
      };
    
    const _renderToolbar = () => {
        return (
          <div
            style={{ position: "absolute", top: 0, right: 0, maxWidth: "320px" }}
          >
            <select onChange={_switchMode}>
              <option value="">--Please choose a draw mode--</option>
              {MODES.map((mode) => (
                <option key={mode.id} value={mode.id}>
                  {mode.text}
                </option>
              ))}
            </select>
          </div>
        );
      };
    
    const _updateViewport = (viewport: any) => {
        setState({ viewport });
    };

    const { viewport, modeHandler } = state;

    return (<MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={"mapbox://styles/mapbox/dark-v9"}
        onViewportChange={_updateViewport}
      >
        <Editor
          // to make the lines/vertices easier to interact with
          clickRadius={12}
          mode={modeHandler}
          onSelect={() => {}}
        />
        {_renderToolbar()}
      </MapGL>)
}

export default NebulaMap;
