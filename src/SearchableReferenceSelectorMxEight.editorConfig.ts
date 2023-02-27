import { SearchableReferenceSelectorMxEightPreviewProps } from "../typings/SearchableReferenceSelectorMxEightProps";
import { hidePropertiesIn, hidePropertyIn } from "./utils/PageEditorUtils";

export type Properties = PropertyGroup[];

export type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

export type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export function getProperties(
    _values: SearchableReferenceSelectorMxEightPreviewProps,
    defaultProperties: Properties
): Properties {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    if (_values.selectionType === "reference") {
        hidePropertiesIn(defaultProperties, _values, ["enumAttribute", "onChange"]);
    } else {
        hidePropertiesIn(defaultProperties, _values, [
            "displayAttribute",
            "moreResultsText",
            "onSelectAssociation",
            "onSelectMoreResults",
            "onSelectEmpty",
            "selectableCondition",
            "selectableObjects",
            "currentValue",
            "filterType"
        ]);
        hidePropertiesIn(defaultProperties, _values, [
            "searchText",
            "hasMoreResultsManual",
            "moreResultsText",
            "refreshAction"
        ]);
    }

    if (_values.filterType === "auto") {
        hidePropertiesIn(defaultProperties, _values, [
            "searchText",
            "hasMoreResultsManual",
            "moreResultsText",
            "refreshAction",
            "onSelectMoreResults"
        ]);
    } else {
        hidePropertiesIn(defaultProperties, _values, ["filterFunction"]);
    }

    if (_values.optionTextType !== "custom") {
        hidePropertiesIn(defaultProperties, _values, ["optionCustomContent"]);
    }

    if (_values.isClearable === false) {
        hidePropertiesIn(defaultProperties, _values, ["onSelectEmpty"]);
    }

    if (_values.selectStyle === "list") {
        hidePropertiesIn(defaultProperties, _values, ["maxMenuHeight"]);
    }

    if (_values.isSearchable === false) {
        hidePropertiesIn(defaultProperties, _values, ["filterDelay"]);
    }

    if (_values.isSearchable === false && _values.selectStyle === "list") {
        hidePropertiesIn(defaultProperties, _values, ["placeholder"]);
    }

    if(!_values.showLabel){
        hidePropertiesIn(defaultProperties, _values, ["label", "labelOrientation", "labelWidth"]);
    }else if(_values.labelOrientation === "vertical"){
        hidePropertyIn(defaultProperties,_values, "labelWidth");
    }

    return defaultProperties;
}

export function check(_values: SearchableReferenceSelectorMxEightPreviewProps): Problem[] {
    const errors: Problem[] = [];
    // Add errors to the above array to throw errors in Studio and Studio Pro.
    /* Example
    if (values.myProperty !== "custom") {
        errors.push({
            property: `myProperty`,
            message: `The value of 'myProperty' is different of 'custom'.`,
            url: "https://github.com/myrepo/mywidget"
        });
    }
    */

    if (_values.optionTextType === "custom" && _values.optionCustomContent.widgetCount === 0) {
        errors.push({
            property: `optionTextType`,
            message: `Option Custom content is required when Option Text Type is 'Custom'.`,
            url: "https://github.com/bsgriggs/mendix8-searchable-reference-selector"
        });
    }

    if (_values.filterDelay === null || _values.filterDelay < 0) {
        errors.push({
            property: `filterDelay`,
            message: `Filter Delay must be greater than or equal to 0`,
            url: "https://github.com/bsgriggs/mendix8-searchable-reference-selector"
        });
    }

    if (_values.selectionType === "reference" && _values.onSelectAssociation === null) {
        errors.push({
            property: `onSelectAssociation`,
            message: `On Select Association is required`,
            url: "https://github.com/bsgriggs/mendix8-searchable-reference-selector"
        });
    }

    if (_values.selectionType === "reference" && _values.isClearable && _values.onSelectEmpty === null) {
        errors.push({
            property: `onSelectEmpty`,
            message: `On Select Empty is required`,
            url: "https://github.com/bsgriggs/mendix8-searchable-reference-selector"
        });
    }

    return errors;
}
