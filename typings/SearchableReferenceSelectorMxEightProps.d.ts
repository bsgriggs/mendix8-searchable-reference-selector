/**
 * This file was generated from SearchableReferenceSelectorMxEight.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListActionValue, ListAttributeValue, ListWidgetValue } from "mendix";

export type OptionTextTypeEnum = "text" | "html" | "custom";

export type OptionsStyleEnum = "cell" | "checkbox";

export interface SearchableReferenceSelectorMxEightContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    placeholder: DynamicValue<string>;
    isClearable: boolean;
    filterDelay: number;
    optionTextType: OptionTextTypeEnum;
    optionsStyle: OptionsStyleEnum;
    optionCustomContent?: ListWidgetValue;
    maxMenuHeight: DynamicValue<string>;
    noResultsText: DynamicValue<string>;
    selectableObjects: ListValue;
    displayAttribute: ListAttributeValue<string | BigJs.Big>;
    currentValue: EditableValue<string | BigJs.Big>;
    selectableAttribute?: ListAttributeValue<boolean>;
    onSelectAssociation?: ListActionValue;
    allowEmptySelection: boolean;
    onSelectEmpty?: ActionValue;
}

export interface SearchableReferenceSelectorMxEightPreviewProps {
    class: string;
    style: string;
    placeholder: string;
    isClearable: boolean;
    filterDelay: number | null;
    optionTextType: OptionTextTypeEnum;
    optionsStyle: OptionsStyleEnum;
    optionCustomContent: { widgetCount: number; renderer: ComponentType };
    maxMenuHeight: string;
    noResultsText: string;
    selectableObjects: {} | null;
    displayAttribute: string;
    currentValue: string;
    selectableAttribute: string;
    onSelectAssociation: {} | null;
    allowEmptySelection: boolean;
    onSelectEmpty: {} | null;
}
