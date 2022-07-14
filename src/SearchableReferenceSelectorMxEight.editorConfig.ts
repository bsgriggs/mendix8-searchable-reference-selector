import { SearchableReferenceSelectorMxEightPreviewProps } from "../typings/SearchableReferenceSelectorMxEightProps";
import { hidePropertiesIn } from "./utils/PageEditorUtils";

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
    /* Example
    if (values.myProperty === "custom") {
        delete defaultProperties.properties.myOtherProperty;
    }
    */

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

    if (_values.onSelectAssociation === null) {
        errors.push({
            property: `onSelectAssociation`,
            message: `On Select Association is required`,
            url: "https://github.com/bsgriggs/mendix8-searchable-reference-selector"
        });
    }

    if (_values.isClearable && _values.onSelectEmpty === null) {
        errors.push({
            property: `onSelectEmpty`,
            message: `On Select Empty is required`,
            url: "https://github.com/bsgriggs/mendix8-searchable-reference-selector"
        });
    }

    return errors;
}
