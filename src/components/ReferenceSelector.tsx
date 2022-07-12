import React, { createElement, ReactNode, useState, useRef, useEffect } from "react";
import { ObjectItem, ListAttributeValue, ListWidgetValue } from "mendix";
import CancelIcon from "./CancelIcon";
import DropdownIcon from "./DropdownIcon";
import OptionsMenu from "./OptionsMenu";
import { OptionsStyleEnum, OptionTextTypeEnum } from "typings/SearchableReferenceSelectorMxEightProps";
import useOnClickOutside from "../custom hooks/useOnClickOutside";

interface ReferenceSelectorProps {
    name: string;
    tabIndex?: number;
    placeholder?: string;
    noResultsText?: string;
    selectableObjects: ObjectItem[];
    currentValue?: ObjectItem;
    displayAttribute: ListAttributeValue<string>;
    optionTextType: OptionTextTypeEnum;
    optionCustomContent?: ListWidgetValue;
    selectableAttribute?: ListAttributeValue<boolean>;
    onSelectAssociation: (newObject: ObjectItem | undefined) => void;
    mxFilter: string;
    setMxFilter: (newFilter: string) => void;
    isClearable: boolean;
    maxHeight?: string;
    moreResultsText?: string;
    optionsStyle: OptionsStyleEnum;
}

const ReferenceSelector = (props: ReferenceSelectorProps): JSX.Element => {
    const [showMenu, setShowMenu] = useState(false);
    const [focusedObjIndex, setFocusedObjIndex] = useState<number>(-1);
    const searchInput = useRef<HTMLInputElement>(null);
    const srsRef = useRef(null);

    const focusSearchInput = (): void => {
        if (props.currentValue === undefined && searchInput.current !== null) {
            searchInput.current.focus();
        }
    };

    useEffect(() => {
        // Auto focus the input if the popup is open
        if (showMenu) {
            focusSearchInput();
        } else {
            // clear search text if the menu is closed
            props.setMxFilter("");
        }
    }, [showMenu]);

    useOnClickOutside(srsRef, () => {
        // handle click outside
        setShowMenu(false);
        setFocusedObjIndex(-1);
    });

    const onSelectHandler = (selectedObj: ObjectItem | undefined, closeMenu: boolean): void => {
        if (props.currentValue?.id === selectedObj?.id && props.isClearable) {
            props.onSelectAssociation(undefined);
        } else {
            props.onSelectAssociation(selectedObj);
        }
        props.setMxFilter("");
        if (closeMenu) {
            setShowMenu(false);
        }
    };

    const displayCurrentValue = (): ReactNode => {
        if (props.currentValue !== undefined) {
            switch (props.optionTextType) {
                case "text":
                    return <span className="srs-text">{props.displayAttribute(props.currentValue).value}</span>;
                case "html":
                    return (
                        <span
                            className="srs-text"
                            dangerouslySetInnerHTML={{
                                __html: `${props.displayAttribute(props.currentValue).value}`
                            }}
                        ></span>
                    );
                case "custom":
                    if (props.optionCustomContent !== undefined) {
                        return <span className="srs-text">{props.optionCustomContent(props.currentValue)}</span>;
                    } else {
                        return <span className="srs-text">{"no content provided"}</span>;
                    }
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        props.setMxFilter(value);
        setFocusedObjIndex(0);
        // make sure the dropdown is open if the user is typing
        if (value.trim() !== "" && showMenu === false) {
            setShowMenu(true);
        }
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const keyPressed = event.key;
        if (keyPressed === "ArrowUp" || keyPressed === "ArrowLeft") {
            if (focusedObjIndex === -1) {
                setFocusedObjIndex(0);
            } else if (focusedObjIndex > 0) {
                setFocusedObjIndex(focusedObjIndex - 1);
            } else {
                setFocusedObjIndex(props.selectableObjects.length - 1);
            }
            setShowMenu(true);
        } else if (keyPressed === "ArrowDown" || keyPressed === "ArrowRight") {
            if (focusedObjIndex === -1) {
                setFocusedObjIndex(0);
            } else if (focusedObjIndex < props.selectableObjects.length - 1) {
                setFocusedObjIndex(focusedObjIndex + 1);
            } else {
                setFocusedObjIndex(0);
            }
            setShowMenu(true);
        } else if (keyPressed === "Enter") {
            if (focusedObjIndex > -1) {
                const currentSelectedObj = props.selectableObjects[focusedObjIndex];
                if (props.selectableAttribute === undefined || props.selectableAttribute(currentSelectedObj).value) {
                    onSelectHandler(props.selectableObjects[focusedObjIndex], true);
                }
            }
        } else if (keyPressed === "Escape" || keyPressed === "Tab") {
            setFocusedObjIndex(-1);
            setShowMenu(false);
        }
    };

    const handleClear = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation();
        setShowMenu(true);
        props.setMxFilter("");
        setFocusedObjIndex(-1);
        if (props.mxFilter.trim() === "") {
            onSelectHandler(undefined, false);
        }
        setTimeout(() => focusSearchInput(), 300);
    };

    return (
        <div
            className={showMenu ? "form-control active" : "form-control"}
            tabIndex={props.tabIndex || 0}
            onClick={() => {
                setShowMenu(!showMenu);
                if (showMenu === false) {
                    setTimeout(() => focusSearchInput(), 300);
                }
            }}
            onKeyDown={handleInputKeyDown}
            ref={srsRef}
        >
            {props.currentValue === undefined && (
                <input
                    className=""
                    name={props.name}
                    placeholder={props.placeholder}
                    type="text"
                    onChange={handleInputChange}
                    value={props.mxFilter}
                    ref={searchInput}
                    onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                        if (showMenu) {
                            event.stopPropagation();
                        }
                    }}
                ></input>
            )}
            {props.currentValue !== undefined && displayCurrentValue()}
            {props.isClearable && (
                <div className="srs-icon" onClick={handleClear}>
                    <CancelIcon />
                </div>
            )}
            <div className="srs-icon">
                <DropdownIcon />
            </div>
            {showMenu && (
                <OptionsMenu
                    selectableObjects={props.selectableObjects}
                    displayAttribute={props.displayAttribute}
                    onSelectOption={(newObject: ObjectItem | undefined) => {
                        const newObjSelectable =
                            newObject !== undefined && props.selectableAttribute !== undefined
                                ? props.selectableAttribute(newObject).value === true
                                : true;
                        onSelectHandler(newObject, newObjSelectable);
                    }}
                    currentValue={props.currentValue}
                    currentFocus={props.selectableObjects[focusedObjIndex]}
                    maxHeight={props.maxHeight}
                    searchText={props.mxFilter}
                    selectableAttribute={props.selectableAttribute}
                    noResultsText={props.noResultsText}
                    optionTextType={props.optionTextType}
                    optionCustomContent={props.optionCustomContent}
                    optionsStyle={props.optionsStyle}
                />
            )}
        </div>
    );
};

export default ReferenceSelector;
