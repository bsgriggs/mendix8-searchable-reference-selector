import React, { createElement } from "react";
import useHover from "../custom hooks/useHover";
import { IOption } from "../../typings/option";
import { OptionsStyleEnum } from "../../typings/SearchableReferenceSelectorMxEightProps";
import { focusModeEnum } from "../../typings/general";

interface OptionProps {
    index: number;
    onSelect: (selectedOption: IOption) => void;
    option: IOption;
    isFocused: boolean;
    focusMode: focusModeEnum;
    optionsStyle: OptionsStyleEnum;
}

const Option = ({
    onSelect,
    option,
    index,
    focusMode,
    isFocused,
    optionsStyle
}: React.PropsWithChildren<OptionProps>): React.ReactElement => {
    const [hoverRef, isHovered] = useHover<HTMLDivElement>();
    const determineClassName = (): string => {
        let className = "srs-option";
        if (optionsStyle === "cell" ? option.isSelected : false) {
            className = className + " selected";
        }
        if (!option.isSelectable) {
            className = className + " disabled";
        }
        if (focusMode === focusModeEnum.arrow ? isFocused : optionsStyle === "cell" ? isHovered : false) {
            className = className + " focused";
        }
        return className;
    };

    return (
        <div
            role="option"
            aria-selected={option.isSelected ? "true" : "false"}
            aria-disabled={!option.isSelectable}
            tabIndex={index}
            className={determineClassName()}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                event.stopPropagation();
                if (option.isSelectable) {
                    onSelect(option);
                }
            }}
            ref={hoverRef}
        >
            {optionsStyle === "checkbox" && (
                <input type={"checkbox"} checked={option.isSelected} disabled={!option.isSelectable}></input>
            )}
            {option.content}
        </div>
    );
};

export default Option;
