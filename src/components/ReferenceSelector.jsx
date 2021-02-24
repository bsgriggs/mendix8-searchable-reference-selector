import classNames from "classnames";
import { Fragment, createElement, useState } from "react";

export const ReferenceSelector = props => {
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

    function toggleDropdown() {
        // show the dropdown popup and trigger the search
        setShowPopup(!showPopup);
    }

    function onSelect(text) {
        if (datasource.items !== undefined) {
            toggleDropdown();
            // Hand the selected value back up
            onLeave(text, text !== valueState);
            setValueState(text);
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
                                        const text = dropdownValue(obj).value;
                                        if (text !== undefined) {
                                            return (
                                                <li
                                                    className={text === valueState ? ".selected" : ""}
                                                    key={key}
                                                    onClick={() => {
                                                        onSelect(text);
                                                    }}
                                                >
                                                    {text}
                                                </li>
                                            );
                                        } else {
                                            return <li></li>;
                                        }
                                    })}
                            {searchText.trim().length === 0 &&
                                datasource.items.map((obj, key) => {
                                    const text = dropdownValue(obj).value;
                                    if (text !== undefined) {
                                        return (
                                            <li
                                                className={text === valueState ? "selected" : ""}
                                                key={key}
                                                onClick={() => {
                                                    onSelect(text);
                                                }}
                                            >
                                                {text}
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
