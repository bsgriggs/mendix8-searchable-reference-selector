import { createElement, ReactElement } from "react";

interface LabelProps {
    showLabel: boolean;
    showHorizontal: boolean;
    labelValue: string | undefined;
    labelWidth: number | undefined;
}

export default function Label({
    showLabel,
    showHorizontal,
    labelValue,
    labelWidth
}: LabelProps): ReactElement | null {
    return showLabel && labelValue ? (
        <label
            className={"control-label" + (showHorizontal ? " col-sm-" + labelWidth : "")}
        >
            {labelValue}
        </label>
    ) : null;
}
