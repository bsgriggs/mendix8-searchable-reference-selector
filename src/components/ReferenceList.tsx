import React, { createElement, useState, useRef } from "react";
import { ObjectItem, ListAttributeValue, ListWidgetValue } from "mendix";
import CancelIcon from "./icons/CancelIcon";
import OptionsMenu from "./OptionsMenu";
import { OptionsStyleEnum, OptionTextTypeEnum } from "../../typings/SearchableReferenceSelectorMxEightProps";

interface ReferenceListProps {
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
    isSearchable: boolean;
    maxHeight?: string;
    moreResultsText?: string;
    optionsStyle: OptionsStyleEnum;
}

const ReferenceList = (props: ReferenceListProps): JSX.Element => {
    const [focusedObjIndex, setFocusedObjIndex] = useState<number>(-1);
    const searchInput = useRef<HTMLInputElement>(null);
    const srsRef = useRef<HTMLDivElement>(null);

    const focusSearchInput = (): void => {
        if (props.currentValue === undefined && searchInput.current !== null) {
            searchInput.current.focus();
        }
    };

    const onSelectHandler = (selectedObj: ObjectItem | undefined): void => {
        if (props.currentValue?.id === selectedObj?.id && props.isClearable) {
            props.onSelectAssociation(undefined);
        } else {
            props.onSelectAssociation(selectedObj);
        }
        props.setMxFilter("");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        props.setMxFilter(value);
        setFocusedObjIndex(0);
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
        } else if (keyPressed === "ArrowDown" || keyPressed === "ArrowRight") {
            if (focusedObjIndex === -1) {
                setFocusedObjIndex(0);
            } else if (focusedObjIndex < props.selectableObjects.length - 1) {
                setFocusedObjIndex(focusedObjIndex + 1);
            } else {
                setFocusedObjIndex(0);
            }
        } else if (keyPressed === "Enter") {
            if (focusedObjIndex > -1) {
                const currentSelectedObj = props.selectableObjects[focusedObjIndex];
                if (props.selectableAttribute === undefined || props.selectableAttribute(currentSelectedObj).value) {
                    onSelectHandler(props.selectableObjects[focusedObjIndex]);
                }
            }
        } else if (keyPressed === "Escape" || keyPressed === "Tab") {
            setFocusedObjIndex(-1);
        }
    };

    const handleClear = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation();
        props.setMxFilter("");
        setFocusedObjIndex(-1);
        if (props.mxFilter.trim() === "") {
            onSelectHandler(undefined);
        }
        setTimeout(() => focusSearchInput(), 300);
    };

    return (
        <React.Fragment>
            {props.isSearchable && (
                <div
                    className={"form-control"}
                    tabIndex={props.tabIndex || 0}
                    onKeyDown={handleInputKeyDown}
                    ref={srsRef}
                >
                    <input
                        className=""
                        name={props.name}
                        placeholder={props.placeholder}
                        type="text"
                        onChange={handleInputChange}
                        value={props.mxFilter}
                        ref={searchInput}
                    ></input>

                    {props.isClearable && <CancelIcon onClick={handleClear} title={"Clear"} />}
                </div>
            )}
            <div className="form-control srs-selectable-list">
                <OptionsMenu
                    selectableObjects={props.selectableObjects}
                    displayAttribute={props.displayAttribute}
                    onSelectOption={(newObject: ObjectItem | undefined) => {
                        const newObjSelectable =
                            newObject !== undefined && props.selectableAttribute !== undefined
                                ? props.selectableAttribute(newObject).value === true
                                : true;
                        if (newObjSelectable) {
                            onSelectHandler(newObject);
                        }
                    }}
                    currentValue={props.currentValue}
                    currentFocus={props.selectableObjects[focusedObjIndex]}
                    searchText={props.mxFilter}
                    selectableAttribute={props.selectableAttribute}
                    noResultsText={props.noResultsText}
                    optionTextType={props.optionTextType}
                    optionCustomContent={props.optionCustomContent}
                    optionsStyle={props.optionsStyle}
                    selectStyle={"list"}
                />
                {props.isSearchable === false && props.isClearable && (
                    <CancelIcon onClick={handleClear} title={"Clear"} />
                )}
            </div>
        </React.Fragment>
    );
};

export default ReferenceList;
