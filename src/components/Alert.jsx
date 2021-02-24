import classNames from "classnames";
import { createElement } from "react";

export const Alert = ({ alertStyle, className, children, id }) =>
    children ? (
        <div id={id} className={classNames(`alert alert-${alertStyle} mx-validation-message`, className)}>
            {children}
        </div>
    ) : null;
Alert.displayName = "Alert";
Alert.defaultProps = { alertStyle: "danger" };
