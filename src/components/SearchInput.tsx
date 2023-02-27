import React, { createElement } from "react";

interface SearchInputProps {
    name: string | undefined;
    placeholder: string | undefined;
    searchFilter: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isReadOnly: boolean;
    isSearchable: boolean;
    setRef: (newRef: HTMLInputElement) => void;
    showMenu: boolean;
    hasCurrentValue: boolean;
    tabIndex?: number;
}

export default function SearchInput({
    name,
    placeholder,
    onChange,
    isReadOnly,
    isSearchable,
    setRef,
    searchFilter,
    showMenu,
    hasCurrentValue,
    tabIndex
}: SearchInputProps): React.ReactElement {
    const searchInput = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (searchInput !== null && searchInput.current !== null) {
            setRef(searchInput.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);

    return (
        <React.Fragment>
            <input
                style={{
                    caretColor: hasCurrentValue && searchFilter === "" ? "transparent" : "",
                    gridRow: 1
                }}
                tabIndex={!isReadOnly ? tabIndex || 0 : undefined}
                name={name}
                placeholder={!hasCurrentValue ? placeholder : ""}
                type="text"
                onChange={event => onChange(event)}
                readOnly={isReadOnly || !isSearchable}
                disabled={isReadOnly}
                value={searchFilter}
                ref={searchInput}
                autoComplete="off"
                onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                    if (showMenu) {
                        event.stopPropagation();
                    }
                }}
            ></input>
        </React.Fragment>
    );
}
