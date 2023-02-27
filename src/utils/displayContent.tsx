import React, { createElement } from "react";
import { OptionTextTypeEnum } from "../../typings/SearchableReferenceSelectorMxEightProps";

// export const displayTextContent = (text: string, classOverride?: string): React.ReactNode => {
//     return <span className={classOverride}>{text}</span>;
// };

export const displayContent = (
    optionTextType: OptionTextTypeEnum,
    text?: string,
    optionCustomContent?: React.ReactNode,
    classOverride?: string
): React.ReactNode => {
    if (text !== undefined) {
        if (optionTextType === "text") {
            return <span className={classOverride}>{text}</span>;
        } else if (optionTextType === "html") {
            return (
                <span
                    className={classOverride}
                    dangerouslySetInnerHTML={{
                        __html: `${text}`
                    }}
                ></span>
            );
        }
    }
    if (optionTextType === "custom" && optionCustomContent) {
        return optionCustomContent;
    }
    return <span className={classOverride}>No Content</span>;
};
