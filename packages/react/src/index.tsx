import React from "react";
import { Fragment, useEffect, useRef, useState } from "react";
import { renderButton, OrbaOneConfig } from "@orbaone/core";

export function useOrbaOne(config: Pick<OrbaOneConfig, "apiKey" | "steps" | "disableStyle" | "applicantId">) {
    const onCancelHandlerRef = useRef<Function | null>(null);
    const onErrorHandlerRef = useRef<Function | null>(null);
    const onChangeHandlerRef = useRef<Function | null>(null);
    const onSuccessHandlerRef = useRef<Function | null>(null);

    const [errorData, onErrorData] = useState<any>();
    const [changeData, onChangesData] = useState<any>();
    const [successData, onSuccessData] = useState<any>();
    const [cancelData, onCancelData] = useState<any>();

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

    useEffect(() => {
        if (cancelData && onChangeHandlerRef.current) {
            onChangeHandlerRef.current(cancelData);
        }
    }, [cancelData]);

    function target(el: any) {
        if (el) {
            renderButton({
                apiKey,
                target: el,
                applicantId: config.applicantId,
                steps,
                disableStyle: config.disableStyle,
                onSuccess: (data: any) => onSuccessData(data),
                onError: (data: any) => onErrorData(data),
                onChange: (state) => {
                    onChangesData(state);
                },
                onCancelled: (data) => onCancelData(data),
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
        onCancelled: (handler: Function) => {
            onCancelHandlerRef.current = handler;
        },
    };
}

export const OrbaOne: React.FC<{ children: React.ReactElement } & Omit<OrbaOneConfig, "target">> = ({
    children,
    apiKey,
    applicantId,
    steps,
    disableStyle,
    onSuccess,
    onError,
    onChange,
    onCancelled,
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
                applicantId,
                onSuccess,
                onError,
                onChange,
                onCancelled,
            });
        }
    }, []);

    return <Fragment>{button}</Fragment>;
};

export { OrbaOneConfig };
