import * as React from "react";

export type ToastProps = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
} & Record<string, unknown>;

export type ToastActionElement = React.ReactNode;
