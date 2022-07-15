/**
 * This file was generated from SearchableReferenceSelectorMxEight.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListActionValue, ListAttributeValue, ListWidgetValue, WebIcon } from "mendix";

export type SelectStyleEnum = "dropdown" | "list";

export type OptionTextTypeEnum = "text" | "html" | "custom";

export type OptionsStyleEnum = "cell" | "checkbox" | "radio";

export interface SearchableReferenceSelectorMxEightContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    placeholder: DynamicValue<string>;
    isSearchable: boolean;
    filterDelay: number;
    selectStyle: SelectStyleEnum;
    optionTextType: OptionTextTypeEnum;
    optionsStyle: OptionsStyleEnum;
    optionCustomContent?: ListWidgetValue;
    maxMenuHeight: DynamicValue<string>;
    noResultsText: DynamicValue<string>;
    clearIcon?: DynamicValue<WebIcon>;
    dropdownIcon?: DynamicValue<WebIcon>;
    selectableObjects: ListValue;
    displayAttribute: ListAttributeValue<string | BigJs.Big>;
    currentValue: EditableValue<string | BigJs.Big>;
    selectableAttribute?: ListAttributeValue<boolean>;
    onSelectAssociation?: ListActionValue;
    isClearable: boolean;
    onSelectEmpty?: ActionValue;
}

export interface SearchableReferenceSelectorMxEightPreviewProps {
    class: string;
    style: string;
    placeholder: string;
    isSearchable: boolean;
    filterDelay: number | null;
    selectStyle: SelectStyleEnum;
    optionTextType: OptionTextTypeEnum;
    optionsStyle: OptionsStyleEnum;
    optionCustomContent: { widgetCount: number; renderer: ComponentType };
    maxMenuHeight: string;
    noResultsText: string;
    clearIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    dropdownIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    selectableObjects: {} | null;
    displayAttribute: string;
    currentValue: string;
    selectableAttribute: string;
    onSelectAssociation: {} | null;
    isClearable: boolean;
    onSelectEmpty: {} | null;
}
