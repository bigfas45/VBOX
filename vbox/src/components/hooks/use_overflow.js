import { useEffect } from "react";

export default function useOverflow() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    }, [])
}