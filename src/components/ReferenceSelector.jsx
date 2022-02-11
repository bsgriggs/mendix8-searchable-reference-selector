import { createElement, useEffect, useRef, useState } from "react";
import classNames from "classnames";

export default function ReferenceSelector({
    tabIndex,
    className,
    style,
    selectableObjects,
    displayAttribute,
    currentValue,
    onSelectAssociation,
    onSelectEmpty,
    noneSelectedText,
    allowEmptySelection
}) {
    const [showPopup, setShowPopup] = useState(false);
    const [searchText, setSearchText] = useState("");
    const ref = useRef(null);

    useEffect(() => {
        if (showPopup) {
            const handleClickOutside = event => {
                if (ref.current && !ref.current.contains(event.target)) {
                    toggleDropdown();
                }
            };
            document.addEventListener("click", handleClickOutside, true);
            return () => {
                document.removeEventListener("click", handleClickOutside, true);
            };
        }
    }, [!showPopup]);

    function toggleDropdown() {
        // show the dropdown popup and trigger the search
        setShowPopup(!showPopup);
    }

    function onSelectHandler(selectedObj) {
        if (selectedObj !== undefined && onSelectAssociation !== undefined) {
            const mxaction = onSelectAssociation(selectedObj);
            mxaction.execute();
            toggleDropdown();
        } else if (onSelectEmpty !== undefined && allowEmptySelection) {
            onSelectEmpty.execute();
            toggleDropdown();
        } else {
            toggleDropdown();
        }
    }

    return (
        <div ref={ref} className={classNames("widget-reference-selector", className)} style={style}>
            <button tabIndex={tabIndex} className="form-control" onClick={toggleDropdown}>
                {currentValue}
            </button>
            {showPopup && (
                <div className="dropdown">
                    <div className="searchBar">
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control"
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
                    {selectableObjects.items !== undefined && (
                        <ul>
                            {allowEmptySelection && (
                                <li
                                    onClick={() => {
                                        onSelectHandler(undefined);
                                    }}
                                >
                                    {noneSelectedText ? noneSelectedText : <div>&nbsp;</div>}
                                </li>
                            )}
                            {searchText.trim().length > 0 &&
                                selectableObjects.items
                                    .filter(obj => {
                                        const text = displayAttribute(obj).value;
                                        return (
                                            text !== undefined && text.toLowerCase().includes(searchText.toLowerCase())
                                        );
                                    })
                                    .map((obj, key) => {
                                        const text = displayAttribute(obj).value;
                                        if (text !== undefined) {
                                            return (
                                                <li
                                                    className={text === currentValue ? ".selected" : ""}
                                                    key={key}
                                                    onClick={() => {
                                                        onSelectHandler(obj);
                                                    }}
                                                >
                                                    {text}
                                                </li>
                                            );
                                        } else {
                                            return <li>&nbsp;</li>;
                                        }
                                    })}
                            {searchText.trim().length === 0 &&
                                selectableObjects.items.map((obj, key) => {
                                    const text = displayAttribute(obj).value;
                                    if (text !== undefined) {
                                        return (
                                            <li
                                                className={text === currentValue ? "selected" : ""}
                                                key={key}
                                                onClick={() => {
                                                    onSelectHandler(obj);
                                                }}
                                            >
                                                {text}
                                            </li>
                                        );
                                    } else {
                                        return <li>&nbsp;</li>;
                                    }
                                })}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
