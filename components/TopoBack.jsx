"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import p5 from "p5";
import TOPOLOGY from "vanta/dist/vanta.topology.min";
import { cn } from "@/lib/utils";

const TopoBack = ({ children }) => {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                TOPOLOGY({
                    el: vantaRef.current,
                    p5: p5,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0xb63586,
                    backgroundColor: 0xc7cfcf,
                })
            );
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <div
            ref={vantaRef}
            className={cn("w-full h-screen relative overflow-hidden z-0")}
        >
            <div className={cn("relative z-20")}>{children}</div>
        </div>
    );
};

export default TopoBack;
