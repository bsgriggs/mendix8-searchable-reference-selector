import React, { createElement } from "react";
import {
    SearchableReferenceSelectorMxEightContainerProps,
    OptionTextTypeEnum
} from "../typings/SearchableReferenceSelectorMxEightProps";
import {
    ObjectItem,
    ValueStatus,
    ActionValue,
    EditableValue,
    ListAttributeValue,
    ListWidgetValue,
    ListExpressionValue,
    ListActionValue
} from "mendix";
import { Alert } from "./components/Alert";
import Label from "./components/Label";
import Selector from "./components/Selector";
import { displayContent } from "./utils/displayContent";
import { IOption } from "../typings/option";

import "./ui/ReferenceSelector.css";

const callMxAction = (action: ActionValue | undefined): void => {
    if (action !== undefined && action.canExecute) {
        action.execute();
    }
};

const handleSelectEnum = (
    isReadOnly: boolean,
    selectedOption: IOption | undefined,
    onChange: ActionValue | undefined,
    onSelectEmpty: ActionValue | undefined,
    attribute: EditableValue<string> | undefined
): void => {
    if (!isReadOnly && attribute) {
        if (selectedOption && selectedOption.isSelectable) {
            attribute.setValue(selectedOption.id as string);
        } else {
            attribute.setValue(undefined);
            callMxAction(onSelectEmpty);
        }
        callMxAction(onChange);
    }
};

const handleSelectRef = (
    isReadOnly: boolean,
    selectedOption: IOption | undefined,
    onChange: ActionValue | undefined,
    onSelectEmpty: ActionValue | undefined,
    onSelectAssociation: ListActionValue | undefined
): void => {
    if (!isReadOnly && onSelectAssociation) {
        if (selectedOption && selectedOption.isSelectable) {
            callMxAction(onSelectAssociation(selectedOption.id as ObjectItem));
        } else {
            callMxAction(onSelectEmpty);
        }
        callMxAction(onChange);
    }
};

const mapEnum = (enumArray: string[], enumAttribute: EditableValue<string>): IOption[] =>
    enumArray.map(value => {
        return {
            content: displayContent("text", enumAttribute.formatter.format(value)),
            isSelectable: true,
            isSelected: value === (enumAttribute.value as string),
            selectionType: "enumeration",
            id: value
        };
    });

const mapObjectItems = (
    objectItems: ObjectItem[] | undefined,
    optionTextType: OptionTextTypeEnum,
    displayAttribute: ListAttributeValue<string>,
    optionCustomContent: ListWidgetValue | undefined,
    selectableCondition: ListExpressionValue<boolean>,
    currentValue: EditableValue<string>
): IOption[] =>
    objectItems
        ? objectItems.map(objItem => {
              return {
                  content: displayContent(
                      optionTextType,
                      displayAttribute(objItem).displayValue,
                      optionCustomContent ? optionCustomContent(objItem) : undefined
                  ),
                  isSelectable: selectableCondition(objItem).value as boolean,
                  isSelected: displayAttribute(objItem).value === currentValue.value,
                  selectionType: "reference",
                  id: objItem
              };
          })
        : [];

const SearchableReferenceSelector = ({
    currentValue,
    clearIcon,
    dropdownIcon,
    moreResultsText,
    onSelectMoreResults,
    displayAttribute,
    enumAttribute,
    filterDelay,
    isClearable,
    isSearchable,
    maxMenuHeight,
    name,
    noResultsText,
    optionTextType,
    optionsStyle,
    placeholder,
    selectStyle,
    selectableObjects,
    selectionType,
    onSelectAssociation,
    onChange,
    onSelectEmpty,
    optionCustomContent,
    selectableCondition,
    onLeave,
    tabIndex,
    filterFunction,
    editabilty,
    filterType,
    hasMoreResultsManual,
    searchText,
    refreshAction,
    class: className,
    labelOrientation,
    showLabel,
    label,
    style,
    labelWidth
}: SearchableReferenceSelectorMxEightContainerProps): JSX.Element => {
    const [mxFilter, setMxFilter] = React.useState<string>("");
    const [options, setOptions] = React.useState<IOption[]>([]);
    const [currentOption, setCurrentOption] = React.useState<IOption | undefined>();
    // const srsRef = React.useRef<HTMLDivElement>(null);

    const isReadOnly: boolean =
        selectionType === "reference"
            ? editabilty.value === false
            : editabilty.value === false || ((enumAttribute && enumAttribute.readOnly) as boolean);

    // set current value
    switch (selectionType) {
        case "enumeration":
            // eslint-disable-next-line react-hooks/rules-of-hooks
            React.useEffect(() => {
                if (
                    enumAttribute &&
                    enumAttribute.status === ValueStatus.Available &&
                    enumAttribute.status === ValueStatus.Available
                ) {
                    if (enumAttribute.value !== undefined) {
                        setCurrentOption({
                            content: displayContent("text", enumAttribute.displayValue),
                            isSelectable: true,
                            isSelected: true,
                            selectionType: "enumeration",
                            id: enumAttribute.value
                        });
                    } else {
                        setCurrentOption(undefined);
                    }
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [enumAttribute]);
            break;
        case "reference":
            // eslint-disable-next-line react-hooks/rules-of-hooks
            React.useEffect(() => {
                if (currentValue && currentValue.value !== undefined && currentValue.status === ValueStatus.Available) {
                    setCurrentOption({
                        content: displayContent(optionTextType, currentValue.displayValue),
                        isSelectable: false,
                        isSelected: true,
                        selectionType: "reference",
                        id: "aRealFakeID" as any
                    });
                } else {
                    setCurrentOption(undefined);
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [currentValue]);
            break;
    }

    // load Options
    if (selectionType === "enumeration") {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
            // enumAttribute.universe should never change, so this should only run on first load
            if (
                enumAttribute &&
                enumAttribute.status === ValueStatus.Available &&
                enumAttribute.universe !== undefined
            ) {
                setOptions(mapEnum(enumAttribute.universe, enumAttribute));
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [enumAttribute]);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
            // selectableObjects.items will automatically change when the Mendix data source is re-ran.
            if (
                selectableObjects &&
                selectableObjects.status === ValueStatus.Available &&
                currentValue &&
                currentValue.status !== ValueStatus.Loading &&
                displayAttribute
            ) {
                setOptions(
                    mapObjectItems(
                        selectableObjects.items,
                        optionTextType,
                        displayAttribute,
                        optionCustomContent,
                        selectableCondition,
                        currentValue
                    )
                );
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [selectableObjects, currentValue]);
    }

    // Determine the Filtering handling useEffect
    if (filterType === "auto") {
        if (selectionType === "enumeration") {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            React.useEffect(() => {
                if (
                    enumAttribute &&
                    enumAttribute.status === ValueStatus.Available &&
                    placeholder.status === ValueStatus.Available
                ) {
                    const delayDebounceFn = setTimeout(() => {
                        if (isSearchable && enumAttribute.universe !== undefined) {
                            if (mxFilter !== undefined && mxFilter.trim().length > 0) {
                                const searchTextTrimmed = mxFilter.trim();
                                if (filterFunction === "contains") {
                                    setOptions(
                                        mapEnum(
                                            enumAttribute.universe.filter(option =>
                                                option.toLowerCase().includes(searchTextTrimmed.toLowerCase())
                                            ),
                                            enumAttribute
                                        )
                                    );
                                } else {
                                    setOptions(
                                        mapEnum(
                                            enumAttribute.universe.filter(option =>
                                                option.toLowerCase().startsWith(searchTextTrimmed.toLowerCase())
                                            ),
                                            enumAttribute
                                        )
                                    );
                                }
                            } else {
                                setOptions(mapEnum(enumAttribute.universe, enumAttribute));
                            }
                        }
                    }, filterDelay);

                    return () => clearTimeout(delayDebounceFn);
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [mxFilter]);
        } else {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            React.useEffect(() => {
                if (
                    selectableObjects &&
                    selectableObjects.status === ValueStatus.Available &&
                    displayAttribute &&
                    currentValue
                ) {
                    const delayDebounceFn = setTimeout(() => {
                        if (isSearchable) {
                            if (mxFilter.trim().length > 0 && selectableObjects.items) {
                                setOptions(
                                    mapObjectItems(
                                        selectableObjects.items.filter(obj => {
                                            const text = displayAttribute(obj).displayValue as string;
                                            return filterFunction === "contains"
                                                ? text !== undefined &&
                                                      text.toLowerCase().includes(mxFilter.trim().toLowerCase())
                                                : text !== undefined &&
                                                      text.toLowerCase().startsWith(mxFilter.trim().toLowerCase());
                                        }),
                                        optionTextType,
                                        displayAttribute,
                                        optionCustomContent,
                                        selectableCondition,
                                        currentValue
                                    )
                                );
                            } else {
                                setOptions(
                                    mapObjectItems(
                                        selectableObjects.items,
                                        optionTextType,
                                        displayAttribute,
                                        optionCustomContent,
                                        selectableCondition,
                                        currentValue
                                    )
                                );
                            }
                        }
                    }, filterDelay);

                    return () => clearTimeout(delayDebounceFn);
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [mxFilter]);
        }
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
            if (searchText && searchText.status === ValueStatus.Available && searchText.displayValue !== mxFilter) {
                setMxFilter(searchText.displayValue);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [searchText]);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
            if (searchText && searchText.status === ValueStatus.Available) {
                const delayDebounceFn = setTimeout(() => {
                    if (isSearchable) {
                        searchText.setValue(mxFilter);
                        callMxAction(refreshAction);
                    }
                }, filterDelay);

                return () => clearTimeout(delayDebounceFn);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [mxFilter]);
    }

    return (
        <div className={ "form-group " +(!showLabel || labelOrientation === "vertical" ? "no-columns " : "") +className} style={style} >
            <Label
                labelValue={label?.value as string}
                // name={name}
                showLabel={showLabel}
                showHorizontal={labelOrientation === "horizontal"}
                labelWidth={labelWidth}
            />
            <div className={"srs" + (showLabel && labelOrientation === "horizontal" ? " col-sm-" + (12 - labelWidth) : "")}>
                <Selector
                    clearIcon={clearIcon?.value}
                    dropdownIcon={dropdownIcon?.value}
                    isClearable={isClearable}
                    selectStyle={selectStyle}
                    name={name}
                    tabIndex={tabIndex}
                    placeholder={placeholder.value as string}
                    isSearchable={isSearchable}
                    maxMenuHeight={maxMenuHeight.value || "15em"}
                    noResultsText={noResultsText.value as string}
                    hasMoreOptions={
                        selectionType === "enumeration"
                            ? false
                            : filterType === "auto"
                            ? false
                            : hasMoreResultsManual
                            ? (hasMoreResultsManual.value as boolean)
                            : false
                    }
                    moreResultsText={
                        selectionType !== "enumeration" && hasMoreResultsManual && hasMoreResultsManual.value
                            ? moreResultsText.value
                            : undefined
                    }
                    onSelectMoreOptions={() => callMxAction(onSelectMoreResults)}
                    currentValue={currentOption}
                    isReadOnly={isReadOnly}
                    options={options}
                    optionsStyle={optionsStyle}
                    setMxFilter={setMxFilter}
                    onSelect={(selectedOption: IOption) => {
                        selectionType === "enumeration"
                            ? handleSelectEnum(isReadOnly, selectedOption, onChange, onSelectEmpty, enumAttribute)
                            : handleSelectRef(isReadOnly, selectedOption, onChange, onSelectEmpty, onSelectAssociation);
                    }}
                    onLeave={() => {
                        if (onLeave) {
                            callMxAction(onLeave);
                        }
                    }}
                />
            </div>

            {enumAttribute && enumAttribute.validation && <Alert>{enumAttribute.validation}</Alert>}
            {currentValue && currentValue.validation && <Alert>{currentValue.validation}</Alert>}
        </div>
    );
};

export default SearchableReferenceSelector;
