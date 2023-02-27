import React, { createElement } from "react";
import { IOption } from "../../typings/option";

type CurrentValueDisplayProps = {
    currentValue: IOption | undefined;
};

export const CurrentValueDisplay = ({ currentValue }: CurrentValueDisplayProps): React.ReactElement =>
    currentValue ? <div className="srs-current-value">{currentValue.content}</div> : <React.Fragment />;
