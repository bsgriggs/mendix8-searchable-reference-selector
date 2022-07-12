import { createElement, useState, useEffect } from "react";
import { SearchableReferenceSelectorMxEightContainerProps } from "../typings/SearchableReferenceSelectorMxEightProps";
import { ObjectItem, ValueStatus } from "mendix";
import { Alert } from "./components/Alert";
import ReferenceSelector from "./components/ReferenceSelector";
import LoadingSelector from "./components/LoadingSelector";

import "./ui/ReferenceSelector.css";

const SearchableReferenceSelector = (props: SearchableReferenceSelectorMxEightContainerProps): JSX.Element => {
    const [mxFilter, setMxFilter] = useState<string>("");
    const [selectableObjectList, setSelectableObjectList] = useState<ObjectItem[]>([]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // filter the selectable objects when the search text changes
            if (mxFilter !== undefined && mxFilter.trim().length > 0 && props.selectableObjects.items) {
                const searchTextTrimmed = mxFilter.trim();
                setSelectableObjectList(
                    props.selectableObjects.items.filter(obj => {
                        const text = props.displayAttribute(obj).value;
                        return text !== undefined && text.toLowerCase().includes(searchTextTrimmed.toLowerCase());
                    })
                );
            } else {
                setSelectableObjectList(props.selectableObjects.items || []);
            }
        }, props.filterDelay);

        return () => clearTimeout(delayDebounceFn);
    }, [mxFilter, props.selectableObjects]);

    const currentValueObj =
        props.currentValue.value !== undefined
            ? selectableObjectList.find(obj => props.displayAttribute(obj).value === props.currentValue.value)
            : undefined;

    if (
        props.selectableObjects.status === ValueStatus.Available &&
        props.placeholder.status === ValueStatus.Available &&
        props.maxMenuHeight.status === ValueStatus.Available &&
        props.currentValue.status !== ValueStatus.Loading
    ) {
        const onSelectReferenceHandler = (selectedObj: ObjectItem | undefined): void => {
            if (selectedObj !== undefined && props.onSelectAssociation !== undefined) {
                const mxaction = props.onSelectAssociation(selectedObj);
                mxaction.execute();
            } else if (props.onSelectEmpty !== undefined && props.allowEmptySelection) {
                props.onSelectEmpty.execute();
            }
        };

        return (
            <div className="srs">
                <ReferenceSelector
                    name={props.name}
                    tabIndex={props.tabIndex}
                    currentValue={currentValueObj}
                    isClearable={props.isClearable}
                    onSelectAssociation={(newAssociation: ObjectItem | undefined) =>
                        onSelectReferenceHandler(newAssociation as ObjectItem & ObjectItem[])
                    }
                    selectableObjects={selectableObjectList || []}
                    placeholder={props.placeholder.value}
                    maxHeight={props.maxMenuHeight.value}
                    noResultsText={props.noResultsText.value}
                    displayAttribute={props.displayAttribute}
                    optionTextType={props.optionTextType}
                    selectableAttribute={props.selectableAttribute}
                    optionCustomContent={props.optionCustomContent}
                    mxFilter={mxFilter}
                    setMxFilter={(newFilter: string) => setMxFilter(newFilter)}
                    optionsStyle={props.optionsStyle}
                />
                {props.currentValue.validation && <Alert>{props.currentValue.validation}</Alert>}
            </div>
        );
    } else {
        return (
            <LoadingSelector
                name={props.name}
                tabIndex={props.tabIndex}
                placeholder={props.placeholder.value}
                isClearable={props.isClearable}
            />
        );
    }
};

export default SearchableReferenceSelector;
