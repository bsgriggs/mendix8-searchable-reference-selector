import { Component, Fragment, ReactNode, createElement } from "react";
import { hot } from "react-hot-loader/root";

import { ReferenceSelector } from "./components/ReferenceSelector";
import { SearchableReferenceSelectorContainerProps } from "../typings/SearchableReferenceSelectorProps";
import { Alert } from "./components/Alert";

import "./ui/ReferenceSelector.css";

enum defaultSearch {
    NoSearch = "- None -"
}

class SearchableReferenceSelector extends Component<SearchableReferenceSelectorContainerProps> {
    private readonly onLeaveHandle = this.onLeave.bind(this);

    componentDidMount(): void {
        this.props.returnJSON.setValidator(this.validator.bind(this));
    }

    render(): ReactNode {
        const value = this.props.current.value ? this.props.current.value : defaultSearch.NoSearch;
        const validationFeedback = this.props.current.validation;
        const required = !!(this.props.requiredMessage && this.props.requiredMessage.value);

        return (
            <Fragment>
                {(this.props.current.status === "available" || this.props.current.status === "unavailable") && (
                    <Fragment>
                        <ReferenceSelector
                            id={this.props.id}
                            value={value}
                            style={this.props.style}
                            class={this.props.class}
                            tabIndex={this.props.tabIndex}
                            onLeave={this.onLeaveHandle}
                            required={required}
                            hasError={!!validationFeedback}
                            datasource={this.props.Datasource}
                            dropdownValue={this.props.dropdownValue}
                        />
                        <Alert id={this.props.id + "-error"}>{validationFeedback}</Alert>
                    </Fragment>
                )}
            </Fragment>
        );
    }

    private validator(value: string | undefined): string | undefined {
        const { requiredMessage } = this.props;

        if (requiredMessage && requiredMessage.value && !value) {
            return requiredMessage.value;
        }
    }

    private onLeave(value: string, isChanged: boolean): void {
        if (!isChanged) {
            return;
        }
        console.log(value);
        const returnJSON = { attribute: value };
        this.props.returnJSON.setValue(JSON.stringify(returnJSON));
        if (this.props.onChangeAction !== undefined && this.props.onChangeAction.canExecute) {
            this.props.onChangeAction.execute();
        }
    }
}

export default hot(SearchableReferenceSelector);
