/* eslint-disable sort-imports */
import { Alert } from "./components/Alert";
import { Component, Fragment, createElement } from "react";
import { hot } from "react-hot-loader/root";
import { ReferenceSelector } from "./components/ReferenceSelector";
import "./ui/ReferenceSelector.css";

class SearchableReferenceSelector extends Component {
    onLeaveHandle = this.onLeave.bind(this);

    componentDidMount() {
        this.props.returnJSON.setValidator(this.validator.bind(this));
    }

    render() {
        const value = this.props.current.value ? this.props.current.value : this.props.noneSelectedText;
        const validationFeedback = this.props.returnJSON.validation;
        const required = !!(this.props.requiredMessage && this.props.requiredMessage.value);

        return (
            <Fragment>
                {(this.props.current.status === "available" || this.props.current.status === "unavailable") && (
                    <Fragment>
                        <ReferenceSelector
                            id={this.props.id}
                            value={value}
                            style={this.props.style}
                            classProp={this.props.class}
                            tabIndex={this.props.tabIndex}
                            onLeave={this.onLeaveHandle}
                            required={required}
                            hasError={!!validationFeedback}
                            datasource={this.props.Datasource}
                            dropdownValue={this.props.dropdownValue}
                            noneSelectedText={this.props.noneSelectedText}
                        />
                        <Alert id={this.props.id + "-error"}>{validationFeedback}</Alert>
                    </Fragment>
                )}
            </Fragment>
        );
    }

    validator(value) {
        const { requiredMessage } = this.props;

        if (requiredMessage && requiredMessage.value && !value) {
            return requiredMessage.value;
        }
        return null;
    }

    onLeave(value, isChanged) {
        if (!isChanged) {
            return;
        }
        console.log(this.props.requiredMessage);
        if (value !== "" || this.props.requiredMessage.value === "") {
            const returnJSON = { attribute: value };
            this.props.returnJSON.setValue(JSON.stringify(returnJSON));
        } else {
            this.props.returnJSON.setValue();
        }
        if (this.props.onChangeAction !== undefined && this.props.onChangeAction.canExecute) {
            this.props.onChangeAction.execute();
        }
    }
}

export default hot(SearchableReferenceSelector);
