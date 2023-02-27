import React, { createElement } from "react";
export interface AlertProps {
    alertStyle?: "default" | "primary" | "success" | "info" | "warning" | "danger";
    className?: string;
}
export const Alert: React.FunctionComponent<AlertProps> = ({ alertStyle, children }): React.ReactElement | null =>
    children ? <div className={`alert alert-${alertStyle} mx-validation-message`}>{children}</div> : null;
Alert.displayName = "Alert";
Alert.defaultProps = { alertStyle: "danger" };
