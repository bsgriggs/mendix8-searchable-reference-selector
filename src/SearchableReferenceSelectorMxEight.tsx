import { Component, createElement } from "react";
import ReferenceSelector from "./components/ReferenceSelector";

import "./ui/ReferenceSelector.css";

class SearchableReferenceSelector extends Component {
    render() {
        if (this.props.currentValue.status !== "loading" && this.props.selectableObjects.status !== "loading") {
            const emptyText =
                this.props.noneSelectedText !== undefined && this.props.noneSelectedText.value !== undefined
                    ? this.props.noneSelectedText.value
                    : "";
            return (
                <ReferenceSelector
                    key={this.props.name}
                    tabIndex={this.props.tabIndex ? this.props.tabIndex : -1}
                    className={this.props.class}
                    name={this.props.name}
                    style={this.props.style}
                    currentValue={
                        this.props.currentValue && this.props.currentValue.value
                            ? this.props.currentValue.value
                            : emptyText
                    }
                    selectableObjects={this.props.selectableObjects}
                    displayAttribute={this.props.displayAttribute}
                    noneSelectedText={emptyText}
                    allowEmptySelection={this.props.allowEmptySelection}
                    onSelectAssociation={this.props.onSelectAssociation}
                    onSelectEmpty={this.props.onSelectEmpty}
                />
            );
        } else {
            return <div></div>;
        }
    }
}

export default SearchableReferenceSelector;
