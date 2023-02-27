import React, { createElement, useEffect } from "react";
import { WebIcon } from "mendix";
import OptionsMenu from "./OptionMenu";
import useOnClickOutside from "../custom hooks/useOnClickOutside";
import { usePositionObserver } from "../custom hooks/usePositionObserver";
import SearchInput from "./SearchInput";
import MxIcon from "./MxIcon";
import { IOption } from "../../typings/option";
import { OptionsStyleEnum, SelectStyleEnum } from "../../typings/SearchableReferenceSelectorMxEightProps";
import { CurrentValueDisplay } from "./CurrentValueDisplay";

const onLeaveHandler = (
    showMenu: boolean,
    setShowMenu: (newShowMenu: boolean) => void,
    searchFilter: string,
    setSearchFilter: (newSearchFilter: string) => void,
    focusedObjIndex: number,
    setFocusedObjIndex: (newIndex: number) => void,
    onLeave: () => void
): void => {
    if (showMenu) {
        setShowMenu(false);
        if (searchFilter.trim() !== "") {
            setSearchFilter("");
        }
        if (focusedObjIndex !== -1) {
            setFocusedObjIndex(-1);
        }
        onLeave();
    }
};

const handleClearAll = (
    event: React.MouseEvent<HTMLDivElement | HTMLSpanElement>,
    searchFilter: string,
    setSearchFilter: (newFilter: string) => void,
    focusedObjIndex: number,
    setFocusedObjIndex: (newIndex: number) => void,
    onSelectHandler: (selectedOption: IOption | undefined) => void,
    searchInput: HTMLInputElement | null,
    showMenu: boolean,
    setShowMenu: (newShowMenu: boolean) => void
): void => {
    event.stopPropagation();
    if (showMenu) {
        setShowMenu(false);
    }
    if (focusedObjIndex !== -1) {
        setFocusedObjIndex(-1);
    }
    if (searchFilter.trim() !== "") {
        setSearchFilter("");
    } else {
        onSelectHandler(undefined);
    }
    focusSearchInput(searchInput, 300);
};

const focusSearchInput = (input: HTMLInputElement | null, delay: number): void => {
    if (input !== null) {
        if (delay !== undefined) {
            setTimeout(() => input?.focus(), delay);
        } else {
            input.focus();
        }
    }
};

const handleKeyNavigation = (
    event: React.KeyboardEvent<HTMLDivElement>,
    focusedObjIndex: number,
    setFocusedObjIndex: (newIndex: number) => void,
    options: IOption[],
    onSelect: (selectedObj: IOption) => void,
    setShowMenu: (newShowMenu: boolean) => void,
    // updatePosition: () => void,
    onLeave: () => void
): void => {
    const keyPressed = event.key;
    if (keyPressed === "ArrowUp" || keyPressed === "ArrowLeft") {
        if (focusedObjIndex === -1) {
            setFocusedObjIndex(0);
        } else if (focusedObjIndex > 0) {
            setFocusedObjIndex(focusedObjIndex - 1);
        } else {
            setFocusedObjIndex(options.length - 1);
        }
        // if (updatePosition !== undefined) {
        //     updatePosition();
        // }
        setShowMenu(true);
    } else if (keyPressed === "ArrowDown" || keyPressed === "ArrowRight") {
        if (focusedObjIndex === -1) {
            setFocusedObjIndex(0);
        } else if (focusedObjIndex < options.length - 1) {
            setFocusedObjIndex(focusedObjIndex + 1);
        } else {
            setFocusedObjIndex(0);
        }
        // if (updatePosition !== undefined) {
        //     updatePosition();
        // }
        setShowMenu(true);
    } else if (keyPressed === "Enter") {
        if (focusedObjIndex > -1) {
            const currentFocusedOption = options[focusedObjIndex];
            if (currentFocusedOption.isSelectable) {
                onSelect(currentFocusedOption);
            }
            onLeave();
        }
    } else if (keyPressed === "Escape" || keyPressed === "Tab") {
        onLeave();
    }
};

interface SelectorProps {
    name: string;
    tabIndex?: number;
    placeholder: string | undefined;
    noResultsText: string;
    options: IOption[];
    currentValue: IOption | undefined;
    onSelect: (selectedOption: IOption | undefined) => void;
    // searchFilter: string;
    setMxFilter: (newFilter: string) => void;
    isClearable: boolean;
    clearIcon: WebIcon | undefined;
    isSearchable: boolean;
    isReadOnly: boolean;
    selectStyle: SelectStyleEnum;
    dropdownIcon: WebIcon | undefined; // selectStyle = Dropdown
    maxMenuHeight: string; // selectStyle = Dropdown
    hasMoreOptions: boolean; // selectionType = Reference or ReferenceSet
    moreResultsText: string | undefined; // selectionType = Reference or ReferenceSet
    onSelectMoreOptions: (() => void) | undefined; // selectionType = Reference or ReferenceSet
    optionsStyle: OptionsStyleEnum;
    // srsRef: React.RefObject<HTMLDivElement>;
    onLeave: () => void;
}

const Selector = ({
    clearIcon,
    currentValue,
    dropdownIcon,
    hasMoreOptions,
    isClearable,
    isReadOnly,
    isSearchable,
    maxMenuHeight,
    moreResultsText,
    name,
    noResultsText,
    onSelect,
    onSelectMoreOptions,
    options,
    optionsStyle,
    placeholder,
    // searchFilter,
    setMxFilter,
    tabIndex,
    selectStyle,
    // srsRef,
    onLeave
}: SelectorProps): React.ReactElement => {
    const [showMenu, setShowMenu] = React.useState(false);
    const [searchFilter, setSearchFilter] = React.useState("");
    const [focusedObjIndex, setFocusedObjIndex] = React.useState<number>(-1);
    const [searchInput, setSearchInput] = React.useState<HTMLInputElement | null>(null);
    const srsRef = React.useRef<HTMLDivElement>(null);
    // const [position, setPosition] = useState<Position>({ x: 0, y: 0, w: 0, h: 0 });

    useEffect(() => {
        setMxFilter(searchFilter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchFilter]);

    const position = usePositionObserver(srsRef.current, selectStyle === "dropdown" && showMenu);

    const hasCurrentValue = currentValue !== undefined;

    useOnClickOutside(srsRef, () => {
        onLeaveHandler(
            showMenu,
            setShowMenu,
            searchFilter,
            setSearchFilter,
            focusedObjIndex,
            setFocusedObjIndex,
            onLeave
        );
    });

    const onSelectHandler = (selectedOption: IOption | undefined): void => {
        if (selectedOption) {
            onSelect(selectedOption);
        } else {
            // clear the selection
            onSelect(undefined);
        }
        setShowMenu(false);
        onLeaveHandler(
            showMenu,
            setShowMenu,
            searchFilter,
            setSearchFilter,
            focusedObjIndex,
            setFocusedObjIndex,
            onLeave
        );
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setSearchFilter(value);
        setFocusedObjIndex(0);
        // make sure the dropdown is open if the user is typing
        if (value.trim() !== "" && !showMenu) {
            setShowMenu(true);
        }
    };

    return (
            <div ref={srsRef} style={{width: "100%"}}>
            <div
                className={`form-control ${showMenu ? "active" : ""} ${isReadOnly ? "read-only" : ""}`}
                onClick={() => {
                    if (!isReadOnly) {
                        setShowMenu(!showMenu);
                        // updatePositionManually(selectStyle, setPosition, srsRef);
                        if (showMenu === false) {
                            focusSearchInput(searchInput, 300);
                        }
                    }
                }}
                onKeyDown={event => {
                    if (!isReadOnly) {
                        handleKeyNavigation(
                            event,
                            focusedObjIndex,
                            setFocusedObjIndex,
                            options,
                            onSelectHandler,
                            setShowMenu,
                            // () => updatePositionManually(selectStyle, setPosition, srsRef),
                            () =>
                                onLeaveHandler(
                                    showMenu,
                                    setShowMenu,
                                    searchFilter,
                                    setSearchFilter,
                                    focusedObjIndex,
                                    setFocusedObjIndex,
                                    onLeave
                                )
                        );
                    }
                }}
                
            >
                <div className="srs-search-input">
                    {/* Hide Search Input if read only and there is already a value */}
                    {!(isReadOnly && hasCurrentValue) && (
                        <SearchInput
                            isReadOnly={isReadOnly}
                            isSearchable={isSearchable}
                            name={name}
                            onChange={handleInputChange}
                            placeholder={placeholder}
                            setRef={newRef => setSearchInput(newRef)}
                            hasCurrentValue={hasCurrentValue}
                            searchFilter={searchFilter}
                            showMenu={showMenu}
                            tabIndex={tabIndex}
                        />
                    )}
                    {/* CurrentValueDisplay should be hidden if the user is typing*/}
                    {searchFilter === "" && <CurrentValueDisplay currentValue={currentValue} />}
                    {!isReadOnly && (
                        <div className="srs-icon-row" style={{ gridRow: 1 }}>
                            {isClearable && (
                                <MxIcon
                                    onClick={event => {
                                        // updatePositionManually(selectStyle, setPosition, srsRef);
                                        handleClearAll(
                                            event,
                                            searchFilter,
                                            setSearchFilter,
                                            focusedObjIndex,
                                            setFocusedObjIndex,
                                            onSelectHandler,
                                            searchInput,
                                            showMenu,
                                            setShowMenu
                                        );
                                    }}
                                    title={"Clear"}
                                    mxIconOverride={clearIcon}
                                    defaultClassName="remove"
                                />
                            )}
                            {selectStyle === "dropdown" && (
                                <MxIcon mxIconOverride={dropdownIcon} defaultClassName="menu-down" />
                            )}
                        </div>
                    )}
                </div>
            </div>
            {(showMenu || selectStyle === "list") && !isReadOnly && (
                <OptionsMenu
                    onSelect={onSelectHandler}
                    currentFocus={options[focusedObjIndex]}
                    maxMenuHeight={maxMenuHeight}
                    noResultsText={noResultsText}
                    moreResultsText={moreResultsText}
                    optionsStyle={optionsStyle}
                    selectStyle={selectStyle}
                    position={position}
                    onSelectMoreOptions={() => {
                        if (onSelectMoreOptions) {
                            onSelectMoreOptions();
                            if (selectStyle === "dropdown") {
                                focusSearchInput(searchInput, 300);
                            }
                        }
                    }}
                    options={options}
                    hasMoreOptions={hasMoreOptions}
                />
            )}
       </div>
    );
};

export default Selector;
