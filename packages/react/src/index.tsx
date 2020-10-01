import { Fragment, useEffect, useRef, useState } from "react";
import { renderButton, OrbaOneConfig } from "@orbaone/core";
import React from "react";

export function useOrbaOne(config: Pick<OrbaOneConfig, "apiKey" | "steps" | "disableStyle">) {
    const onErrorHandlerRef = useRef<Function | null>(null);
    const onChangeHandlerRef = useRef<Function | null>(null);
    const onSuccessHandlerRef = useRef<Function | null>(null);

    const [errorData, onErrorData] = useState<any>();
    const [changeData, onChangesData] = useState<any>();
    const [successData, onSuccessData] = useState<any>();

    const { apiKey, steps } = config;

    useEffect(() => {
        if (successData && onSuccessHandlerRef.current) {
            onSuccessHandlerRef.current(successData);
        }
    }, [successData]);

    useEffect(() => {
        if (errorData && onErrorHandlerRef.current) {
            onErrorHandlerRef.current(errorData);
        }
    }, [errorData]);

    useEffect(() => {
        if (changeData && onChangeHandlerRef.current) {
            onChangeHandlerRef.current(changeData);
        }
    }, [changeData]);

    function target(el: any) {
        if (el) {
            renderButton({
                apiKey,
                target: el,
                steps,
                disableStyle: config.disableStyle,
                onSuccess: (data: any) => onSuccessData(data),
                onError: (data: any) => onErrorData(data),
                onChange: (state) => {
                    onChangesData(state);
                },
            });
        }
    }

    return {
        target,
        onSuccess: (handler: Function) => {
            onSuccessHandlerRef.current = handler;
        },
        onError: (handler: Function) => {
            onSuccessHandlerRef.current = handler;
        },
        onChange: (handler: Function) => {
            onChangeHandlerRef.current = handler;
        },
    };
}

export const OrbaOne: React.FC<{ children: React.ReactElement } & Omit<OrbaOneConfig, "target">> = ({
    children,
    apiKey,
    steps,
    disableStyle,
    onSuccess,
    onError,
    onChange,
}) => {
    const buttonRef = useRef<HTMLElement | null>(null);
    //! ensures that children has only one child
    const child = React.Children.only(children);
    //! use to overwrite the ref prop of the child
    const button = React.cloneElement(child, { ref: (e) => (buttonRef.current = e) });

    useEffect(() => {
        if (buttonRef.current) {
            renderButton({
                apiKey,
                target: buttonRef.current,
                steps,
                disableStyle,
                onSuccess,
                onError,
                onChange,
            });
        }
    }, []);

    return <Fragment>{button}</Fragment>;
};

export { OrbaOneConfig };
