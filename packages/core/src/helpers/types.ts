export interface OrbaOneConfig {
    target: string | Element | HTMLElement;
    apiKey: string;
    disableStyle?: boolean;
    onSuccess: (result: any) => void;
    onError: (result: any) => void;
    steps: string[];
}
