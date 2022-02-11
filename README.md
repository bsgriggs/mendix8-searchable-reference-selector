## SearchableReferenceSelector

Mendix reference selector with a search bar and a clear button by Benjamin Griggs.  
This is the Mendix 8 version of https://github.com/bsgriggs/mendix9-searchable-reference-selector. If you are using
Mendix 9, please use the widget there.

## Features

-   Dropdown selection with any objects you want
-   Selecting an option triggers any Mendix Action you'd like
-   Option to allow the user to select empty or not

## Limitation

-   Validation must be handled by the save action of your form or in the "On Select Association"

## Usage

1. Add the widget inside a data view
2. Configure the "Selectable Objects" as the list object you want to appear in the dropdown
3. Set the "Attribute to Display" as the attribute on the Selectable Objects you want to display in the dropdown
4. Select the "Current Value" as the association from the data view to the same attribute as the Attribute to Display
5. On the Actions tab, set "On Select association" as a Microflow or Nanoflow that takes a parameter from the data view
   **AND** a parameter from the Selectable Objects. This Microflow or Nanoflow should set the association using a Change
   Object action.

Optional:

-   If you want the user to have the ability to select nothing, then configure the "On Select Empty" as a Microflow or
    Nanoflow that changes the data view's association to empty. Decide on a "No Selection Text".
-   If you do not want the user to be able to select nothing, then set "Allow Empty Selection" as No.

## Demo project

https://searchablereferenceselectortest-sandbox.mxapps.io

## Issues, suggestions and feature requests

https://github.com/bsgriggs/mendix-SearchableReferenceSelector/issues

## Development and contribution

Benjamin Griggs
