import { Component, createElement } from "react";
import ReferenceSelector from "./components/ReferenceSelector";

export class preview extends Component {
    render() {
        return <ReferenceSelector />;
    }
}

export function getPreviewCss() {
    return require("./ui/ReferenceSelector.css");
}
