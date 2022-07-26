import { useEffect, RefObject } from "react";

type TClickEvent = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement>(ref: RefObject<T>, handler: (event: TClickEvent) => void) => {
    useEffect(() => {
        const listener = (event: TClickEvent) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};
