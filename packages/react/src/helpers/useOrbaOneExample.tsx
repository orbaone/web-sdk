import React, { useState } from "react";
import { useOrbaOne } from "..";

export function UseOrbaOneExample() {
    const [errorMessage, setError] = useState<any>();
    const [successMessage, setSuccess] = useState<any>();
    const [state, setState] = useState<any>();

    const { target, onError, onSuccess, onChange } = useOrbaOne({
        apiKey: "test",
        steps: [],
    });

    onError((d: any) => setError(d));
    onSuccess((d: any) => {
        setSuccess(d);
    });

    onChange((s) => {
        setState(s);
    });

    return (
        <div className="hello">
            <button ref={target} type="button">
                insert here
            </button>
            <span>{state}</span>
            {errorMessage ? <span>Error</span> : null}
            {successMessage ? <span>Success</span> : null}
        </div>
    );
}
