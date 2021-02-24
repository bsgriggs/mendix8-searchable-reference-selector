import { createElement, CSSProperties, Fragment, useState } from "react";
import { ListValue, ListAttributeValue } from "mendix";
import classNames from "classnames";

export interface ReferenceSelectorProps {
    classProp: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    value: string;
    onLeave: (value: string, isChanged: boolean) => void;
    datasource: ListValue;
    dropdownValue: ListAttributeValue<string>;
    hasError?: boolean;
    required?: boolean;
    noneSelectedText: string;
}

export const ReferenceSelector = (props: ReferenceSelectorProps) => {
    const {
        classProp,
        style,
        tabIndex,
        id,
        value,
        onLeave,
        datasource,
        dropdownValue,
        hasError,
        required,
        noneSelectedText
    } = props;
    const [showPopup, setShowPopup] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [valueState, setValueState] = useState(value);

    const className = classNames("form-control", classProp);
    const labelledby = `${id}-label` + (hasError ? ` ${id}-error` : "");

    function toggleDropdown(): void {
        // show the dropdown popup and trigger the search
        setShowPopup(!showPopup);
    }

    function onSelect(text: string): void {
        if (datasource.items !== undefined) {
            console.log("Selected: " + text);
            setValueState(text);
            toggleDropdown();
            // Hand the selected value back up
            onLeave(text, true);
        }
    }

    return (
        <div className="widget-reference-selector">
            <button
                id={id}
                className={className}
                style={style}
                tabIndex={tabIndex}
                onClick={toggleDropdown}
                aria-labelledby={labelledby}
                aria-invalid={hasError}
                aria-required={required}
            >
                {valueState}
            </button>
            {showPopup && (
                <div id="dropdown">
                    <div className="searchBar">
                        <input
                            type="text"
                            placeholder="Search"
                            className={className}
                            onChange={event => {
                                setSearchText(event.target.value);
                            }}
                            value={searchText}
                        />
                        <button
                            className="btn mx-button btn-danger"
                            onClick={() => {
                                setSearchText("");
                            }}
                        >
                            Reset
                        </button>
                    </div>
                    <hr />
                    {datasource.items !== undefined && (
                        <ul>
                            <li
                                onClick={() => {
                                    onSelect(noneSelectedText);
                                }}
                            >
                                {noneSelectedText ? noneSelectedText : <Fragment>&nbsp;</Fragment>}
                            </li>
                            {searchText.trim().length > 0 &&
                                datasource.items
                                    .filter(text =>
                                        dropdownValue(text)
                                            .value?.toString()
                                            .toLowerCase()
                                            .includes(searchText.toLowerCase())
                                    )
                                    .map((obj, key) => {
                                        const value = dropdownValue(obj).value;
                                        if (value !== undefined) {
                                            return (
                                                <li
                                                    className={value === valueState ? ".selected" : ""}
                                                    key={key}
                                                    onClick={() => {
                                                        onSelect(value);
                                                    }}
                                                >
                                                    {value}
                                                </li>
                                            );
                                        } else {
                                            return <li></li>;
                                        }
                                    })}
                            {searchText.trim().length === 0 &&
                                datasource.items.map((obj, key) => {
                                    const value = dropdownValue(obj).value;
                                    if (value !== undefined) {
                                        return (
                                            <li
                                                className={value === valueState ? "selected" : ""}
                                                key={key}
                                                onClick={() => {
                                                    onSelect(value);
                                                }}
                                            >
                                                {value}
                                            </li>
                                        );
                                    } else {
                                        return <li></li>;
                                    }
                                })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};
