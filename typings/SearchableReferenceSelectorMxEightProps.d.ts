/**
 * This file was generated from SearchableReferenceSelectorMxEight.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties } from "react";
import {
    ActionValue,
    DynamicValue,
    EditableValue,
    ListValue,
    ListActionValue,
    ListAttributeValue,
    ListExpressionValue,
    ListWidgetValue,
    WebIcon
} from "mendix";

export type LabelOrientationEnum = "horizontal" | "vertical";

export type SelectStyleEnum = "dropdown" | "list";

export type OptionTextTypeEnum = "text" | "html" | "custom";

export type OptionsStyleEnum = "cell" | "checkbox";

export type SelectionTypeEnum = "enumeration" | "reference";

export type FilterTypeEnum = "auto" | "manual";

export type FilterFunctionEnum = "contains" | "startsWith";

export interface SearchableReferenceSelectorMxEightContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    showLabel: boolean;
    label?: DynamicValue<string>;
    labelOrientation: LabelOrientationEnum;
    labelWidth: number;
    placeholder: DynamicValue<string>;
    editabilty: DynamicValue<boolean>;
    isSearchable: boolean;
    isClearable: boolean;
    onSelectEmpty?: ActionValue;
    selectStyle: SelectStyleEnum;
    optionTextType: OptionTextTypeEnum;
    optionsStyle: OptionsStyleEnum;
    optionCustomContent?: ListWidgetValue;
    maxMenuHeight: DynamicValue<string>;
    noResultsText: DynamicValue<string>;
    clearIcon?: DynamicValue<WebIcon>;
    dropdownIcon?: DynamicValue<WebIcon>;
    selectionType: SelectionTypeEnum;
    selectableObjects?: ListValue;
    displayAttribute?: ListAttributeValue<string>;
    currentValue?: EditableValue<string>;
    selectableCondition?: ListExpressionValue<boolean>;
    enumAttribute?: EditableValue<string>;
    filterDelay: number;
    filterType: FilterTypeEnum;
    filterFunction: FilterFunctionEnum;
    searchText?: EditableValue<string>;
    hasMoreResultsManual?: DynamicValue<boolean>;
    onSelectMoreResults?: ActionValue;
    moreResultsText: DynamicValue<string>;
    refreshAction?: ActionValue;
    onSelectAssociation?: ListActionValue;
    onChange?: ActionValue;
    onLeave?: ActionValue;
}

export interface SearchableReferenceSelectorMxEightPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    showLabel: boolean;
    label: string;
    labelOrientation: LabelOrientationEnum;
    labelWidth: number | null;
    placeholder: string;
    editabilty: string;
    isSearchable: boolean;
    isClearable: boolean;
    onSelectEmpty: {} | null;
    selectStyle: SelectStyleEnum;
    optionTextType: OptionTextTypeEnum;
    optionsStyle: OptionsStyleEnum;
    optionCustomContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    maxMenuHeight: string;
    noResultsText: string;
    clearIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    dropdownIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    selectionType: SelectionTypeEnum;
    selectableObjects: {} | { type: string } | null;
    displayAttribute: string;
    currentValue: string;
    selectableCondition: string;
    enumAttribute: string;
    filterDelay: number | null;
    filterType: FilterTypeEnum;
    filterFunction: FilterFunctionEnum;
    searchText: string;
    hasMoreResultsManual: string;
    onSelectMoreResults: {} | null;
    moreResultsText: string;
    refreshAction: {} | null;
    onSelectAssociation: {} | null;
    onChange: {} | null;
    onLeave: {} | null;
}
