import { Component, ReactNode, createElement, CSSProperties } from "react";
import { ListValue, ListAttributeValue, DynamicValue } from "mendix";
import classNames from "classnames";

export interface ReferenceSelectorProps {
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    value: string;
    onLeave: (value: string, isChanged: boolean) => void;
    datasource: ListValue;
    dropdownValue: ListAttributeValue<string>;
    requiredMessage?: DynamicValue<string>;
    hasError?: boolean;
    required?: boolean;
}

interface InputState {
    searchText: string;
    editedValue: string;
    showPopup: boolean;
    selectableItems: string[];
}
enum defaultSearch {
    NoSearch = "- None -"
}

export class ReferenceSelector extends Component<ReferenceSelectorProps> {
    onSearchHandle: () => void;
    onSelectHandle: (text: string) => void;
    readonly state: InputState = {
        searchText: "",
        showPopup: false,
        editedValue: this.props.value,
        selectableItems: []
    };

    constructor(props: ReferenceSelectorProps) {
        super(props);
        this.onSearchHandle = this.onSearch.bind(this);
        this.onSelectHandle = this.onSelect.bind(this);
    }

    render(): ReactNode {
        // Handle the Mendix input Class and Label
        const className = classNames("form-control", this.props.class);
        const labelledby = `${this.props.id}-label` + (this.props.hasError ? ` ${this.props.id}-error` : "");

        return (
            <div className="widget-reference-selector">
                <button
                    id={this.props.id}
                    className={className}
                    tabIndex={this.props.tabIndex}
                    onClick={() => this.toggleDropdown()}
                    aria-labelledby={labelledby}
                    aria-invalid={this.props.hasError}
                    aria-required={this.props.required}
                >
                    {this.state.editedValue}
                </button>
                {this.state.showPopup && (
                    <div id="dropdown">
                        <div className="searchBar">
                            <input
                                type="text"
                                placeholder="Search"
                                className={className}
                                onChange={event => {
                                    this.setState({ searchText: event.target.value }, () => this.onSearch());
                                }}
                                value={this.state.searchText}
                            />
                            <button
                                className="btn mx-button btn-danger"
                                onClick={() => {
                                    this.setState({ searchText: "" }, () => this.onSearch());
                                }}
                            >
                                Reset
                            </button>
                        </div>
                        <hr />
                        {this.props.datasource.items !== undefined && (
                            <ul>
                                <li
                                    onClick={() => {
                                        this.onSelect(defaultSearch.NoSearch);
                                    }}
                                >
                                    {defaultSearch.NoSearch}
                                </li>
                                {this.state.selectableItems.map((text, key) => {
                                    return (
                                        <li
                                            key={key}
                                            onClick={() => {
                                                this.onSelect(text);
                                            }}
                                        >
                                            {text}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        );
    }

    private toggleDropdown(): void {
        // show the dropdown popup and trigger the search
        const current = this.state.showPopup;
        this.setState({ showPopup: !current, searchText: "" }, () => this.onSearch());
    }

    private onSearch(): void {
        console.log("Searching: " + this.state.searchText);
        // The text in the search bar
        const search = this.state.searchText;
        // property to get the Attribute values from the list
        const template = this.props.dropdownValue;
        // array to override the state
        const selectable: string[] = [];
        // The datasource
        if (this.props.datasource.items && template) {
            if (search.trim().length > 0) {
                this.props.datasource.items
                    .filter(text =>
                        template(text)
                            .value?.toString()
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    )
                    .map(obj => {
                        const value = template(obj).value;
                        if (value !== undefined) {
                            selectable.push(value);
                        }
                        return value;
                    });
            } else {
                this.props.datasource.items.map(obj => {
                    const value = template(obj).value;
                    if (value !== undefined) {
                        selectable.push(value);
                    }
                    return value;
                });
            }
        }
        this.setState({ selectableItems: selectable });
    }

    private onSelect(text: string): void {
        if (this.props.datasource.items !== undefined) {
            console.log("Selected: " + text);
            this.setState({ editedValue: text });
            this.toggleDropdown();
            // Hand the selected value back up
            this.props.onLeave(text, true);
        }
    }
}
