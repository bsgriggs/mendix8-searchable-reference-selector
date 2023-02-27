import React, { createElement } from "react";
import Option from "./Option";
import { focusModeEnum } from "../../typings/general";
import { OptionsStyleEnum, SelectStyleEnum } from "../../typings/SearchableReferenceSelectorMxEightProps";
import { IOption } from "../../typings/option";

interface OptionMenuProps {
    options: IOption[];
    currentFocus: IOption | undefined;
    onSelect: (selectedOption: IOption) => void;
    onSelectMoreOptions: (() => void) | undefined;
    noResultsText: string;
    maxMenuHeight: string | undefined;
    moreResultsText: string | undefined;
    optionsStyle: OptionsStyleEnum;
    selectStyle: SelectStyleEnum;
    position?: ClientRect;
    hasMoreOptions: boolean;
}

const OptionMenuStyle = (
    selectStyle: SelectStyleEnum,
    position: ClientRect | undefined,
    maxMenuHeight: string | undefined
): React.CSSProperties => {
    if (selectStyle === "dropdown" && position !== undefined) {
        const contentCloseToBottom = position.top > window.innerHeight * 0.7;
        return {
            maxHeight: maxMenuHeight ? maxMenuHeight : "15em",
            top: contentCloseToBottom ? "unset" : position.height + position.top,
            bottom: contentCloseToBottom ? window.innerHeight - position.top : "unset",
            width: position.width,
            left: position.left
        };
    } else {
        return {};
    }
};

const OptionsMenu = ({
    options,
    onSelect,
    optionsStyle,
    selectStyle,
    currentFocus,
    maxMenuHeight,
    moreResultsText,
    noResultsText,
    position,
    onSelectMoreOptions,
    hasMoreOptions
}: OptionMenuProps): React.ReactElement => {
    const selectedObjRef = React.useRef<HTMLDivElement>(null);
    const [focusMode, setFocusMode] = React.useState<focusModeEnum>(
        currentFocus !== undefined ? focusModeEnum.arrow : focusModeEnum.hover
    );

    // keep the selected item in view when using arrow keys
    React.useEffect(() => {
        if (selectedObjRef.current) {
            selectedObjRef.current.scrollIntoView({ block: "center" });
        }
        setFocusMode(focusModeEnum.arrow);
    }, [currentFocus]);

    return (
        <div
            className={`srs-${selectStyle} srs-menu`}
            style={OptionMenuStyle(selectStyle, position, maxMenuHeight)}
            onMouseEnter={() => setFocusMode(focusModeEnum.hover)}
        >
            {options.length > 0 && (
                <React.Fragment>
                    {options.map((option, key) => {
                        const isFocused = option.id === currentFocus?.id;
                        return (
                            <div key={key} ref={isFocused ? selectedObjRef : undefined}>
                                <Option
                                    index={key}
                                    isFocused={focusMode === focusModeEnum.arrow ? isFocused : false}
                                    onSelect={selectedOption => onSelect(selectedOption)}
                                    focusMode={focusMode}
                                    optionsStyle={optionsStyle}
                                    option={option}
                                />
                            </div>
                        );
                    })}
                    {hasMoreOptions && (
                        <div
                            className={
                                onSelectMoreOptions !== undefined
                                    ? "mx-text srs-infooption"
                                    : "mx-text srs-infooption disabled"
                            }
                            style={{ cursor: onSelectMoreOptions ? "pointer" : "default" }}
                            role="option"
                            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                if (onSelectMoreOptions !== undefined) {
                                    event.stopPropagation();
                                    onSelectMoreOptions();
                                }
                            }}
                        >
                            {moreResultsText}
                        </div>
                    )}
                </React.Fragment>
            )}
            {options === undefined ||
                (options !== undefined && options.length === 0 && (
                    <div className="mx-text srs-infooption disabled" role="option">
                        {noResultsText ? noResultsText : "No results found"}
                    </div>
                ))}
        </div>
    );
};

export default OptionsMenu;
