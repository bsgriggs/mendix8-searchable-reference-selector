import { createElement } from "react";
import { IconProps } from "typings/IconProps";

const DropdownIcon = (props: IconProps): JSX.Element => (
    <span className="glyphicon glyphicon-menu-down" aria-hidden="true" onClick={props.onClick} title={props.title} />
);

export default DropdownIcon;
