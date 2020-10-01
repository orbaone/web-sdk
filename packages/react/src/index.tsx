import { useEffect, useRef, useState } from "react";
import { renderButton, OrbaOneConfig } from "@orbaone/core";

export function useOrbaOne(config: Pick<OrbaOneConfig, "apiKey" | "steps">) {
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
            console.log("useOrbaOne -> errorData", errorData);
            onErrorHandlerRef.current(errorData);
        }
    }, [errorData]);

    useEffect(() => {
        if (changeData && onChangeHandlerRef.current) {
            onChangeHandlerRef.current(changeData);
        }
    }, [changeData]);

    function target(e: any) {
        if (e) {
            renderButton({
                apiKey,
                target: e,
                steps,
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
