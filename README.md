## SearchableReferenceSelector

Mendix reference selector with a search bar and a clear button by Benjamin Griggs.  

This is the Mendix 8 version. **If you are using Mendix 9.13 OR ABOVE**, please use the following widget.  
https://github.com/bsgriggs/mendix9-searchable-reference-selector

## Features

-   Dropdown or list selection with any objects you want
-   Selecting an option triggers a Mendix Action
-   Option to allow the user to select empty or not
-   Option to render options as checkboxes
-   Option to render attribute text, HTML content, or Mendix widget 
-   Ability to marked specific options as un-selectable

## Limitation

-   Validation must be handled by the save action of your form or in the "On Select Association"
-   Objects are filtered by the browser. If you encounter performance issues, you must limit the selectable objects inside Mendix.

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

https://srsmx8-sandbox.mxapps.io/index.html?profile=Responsive

## Issues, suggestions and feature requests

https://github.com/bsgriggs/mendix8-searchable-reference-selector/issues

## Development and contribution

Benjamin Griggs
