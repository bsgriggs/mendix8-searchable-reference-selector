## SearchableReferenceSelector
[A Reference Selector with a search bar at the top]

## Features
[feature highlights]

## Usage
1) Add a non-persistent entity with one string attribute and full read-write Access rules (note: this entity can be reused on all pages using this widget)
2) Add a JSON structure with: { 'attribute': 'string' }
3) Add an Import mapping using the JSON structure to map 'attribute' to the string attribute in step 1

4) On the entity that will be the page parameter, add an unlimited string attribute: JSON
5) Create an On Change Microflow that will:
    - take the page parameter
    - create a string variable with the page parameter’s JSON attribute
    - use the string variable on the Import mapping, check "Store in variable"
    - use the variable from the Import mapping to retrieve the selected object from the database (i.e. [Attribute = $NonPersistentEntity/Attribute])
    - change the page parameter object and set the association to the object retrieved from database
    - give the On Change Microflow appropriate permissions

6) Add the widget to your page
7) Set the Data source to your appropriate object (The objects to be selectable)
8) Set the Attribute to Display as the attribute to be displayed in the dropdown
9) Set the Return JSON to the Page Parameter’s JSON attribute
10) Set Current Value to the same attribute in step 8 but across the appropriate association
11) In the events tab, set the On Change event to use the microflow created in step 5

## Demo project
zip file in directory

## Issues, suggestions and feature requests
[link to GitHub issues]

## Development and contribution
[specify contribute]
