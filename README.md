## Searchable Reference Selector for Mendix 8.17 - 9.12

Mendix reference and enumeration selector with a search bar and a clear button. 

**If you are using Mendix 9.13 OR ABOVE**, please use the following widget.  
https://github.com/bsgriggs/mendix9-searchable-reference-selector

| Dropdown  | List On Page |
| ------------- | ------------- |
| ![Dropdown](https://github.com/bsgriggs/mendix8-searchable-reference-selector/blob/media/dropdown.png)   | ![List](https://github.com/bsgriggs/mendix8-searchable-reference-selector/blob/media/listOnPage.png)   |  
*Note: checkboxes or background color selection are independent of Dropdown / List On Page. Both settings can use either*

## Features

-   Dropdown or list selection with any objects you want
-   Widget can select an enumeration or an object reference
-   Selecting an option triggers a Mendix Action
-   Option to allow the user to clear the selection or not
-   Option to render options as checkboxes
-   Option to render attribute text, HTML content, or Mendix widget 
-   Ability to marked specific options as un-selectable
-   Support for arrow keys and enter key press
-   Searching auto-highlights the first record for easy selecting with the enter key
-   Can define your own filtering logic with Manual filtering mode
-   Paginate the result list with Manual filtering mode

## Limitation

-   Validation must be handled by the save action of your form or in the "On Select Association"
-   Objects are filtered by the browser. If you encounter performance issues, you must limit the selectable objects inside Mendix.

## Configuration

![Domain](https://github.com/bsgriggs/mendix8-searchable-reference-selector/blob/media/Domain.png)  

The following is an example for using the widget on a page with a Transaction to set its association to Category  

![general](https://github.com/bsgriggs/mendix8-searchable-reference-selector/blob/media/general.png)  

![style](https://github.com/bsgriggs/mendix8-searchable-reference-selector/blob/media/style.png)  

![Data Source](https://github.com/bsgriggs/mendix8-searchable-reference-selector/blob/media/dataSourceRef.png)   
*Note: On Select Association is required. Microflow must have the 2 parameters: the page object and the selectable object. See an example below. It can also be used as an On Change microflow.*  

*Auto filtering*  
![filtering](https://github.com/bsgriggs/mendix8-searchable-reference-selector/blob/media/filteringAuto.png)   
*Manual filtering*  
![filtering](https://github.com/bsgriggs/mendix8-searchable-reference-selector/blob/media/filteringManual.png)  

**ACT_Transaction_SelectCategory**  
![Select Category](https://github.com/bsgriggs/mendix8-searchable-reference-selector/blob/media/ACT_Transaction_SelectCategory.png)   

**ACT_Transaction_SelectEmptyCategory**  
![Select Empty](https://github.com/bsgriggs/mendix8-searchable-reference-selector/blob/media/ACT_Transaction_SelectEmpty.png)   

## Usage

1. Add the widget inside a data view
2. Configure the "Selectable Objects" as the list object you want to appear in the dropdown
3. Set the "Attribute to Display" as the attribute on the Selectable Objects you want to display in the dropdown
4. Select the "Current Value" as the same attribute in "Attribute to Display", but across the appropriate association
5. On the Actions tab, set "On Select association" as a Microflow or Nanoflow that takes a parameter from the data view
   **AND** a parameter from the Selectable Objects. This Microflow or Nanoflow should set the association using a Change
   Object action.
6. Run the project and play with the remaining setting to see what you need!

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
