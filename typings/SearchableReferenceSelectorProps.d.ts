/**
 * This file was generated from SearchableReferenceSelector.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue } from "mendix";

export interface SearchableReferenceSelectorContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    id: string;
    Datasource: ListValue;
    dropdownValue: ListAttributeValue<string>;
    returnJSON: EditableValue<string>;
    current: EditableValue<string>;
    requiredMessage?: DynamicValue<string>;
    onChangeAction?: ActionValue;
}

export interface SearchableReferenceSelectorPreviewProps {
    class: string;
    style: string;
    Datasource: {} | null;
    dropdownValue: string;
    returnJSON: string;
    current: string;
    requiredMessage: string;
    onChangeAction: {} | null;
}
