import React from "react";

export type clickSpanEvent = React.MouseEvent<HTMLSpanElement>;
export type keyboardEvent = React.KeyboardEvent<HTMLInputElement>
export type formEvent = React.FormEvent<HTMLFormElement>

export interface LoadedProps{
    size: number
}
