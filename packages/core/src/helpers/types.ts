export interface OrbaOneConfig {
    target: string | Element | HTMLElement;
    apiKey: string;
    disableStyle?: boolean;
    onSuccess: (result: any) => void;
    onError: (result: any) => void;
    onChange?: (result: string) => void;
    steps: string[];
}

export type ButtonState = "loading" | "idle" | "success" | "error";
