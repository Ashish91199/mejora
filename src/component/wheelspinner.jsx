// src/components/WheelSpinner.jsx
import React, { useRef, useState, useEffect } from "react";

const prizes = [
    { label: "Prize 1", color: "#ff595e" },
    { label: "Prize 2", color: "#ffca3a" },
    { label: "Prize 3", color: "#8ac926" },
    { label: "Prize 4", color: "#1982c4" },
    { label: "Prize 5", color: "#6a4c93" },
    { label: "Prize 6", color: "#ff9f1c" },
    // { label: "Prize 7", color: "#2ec4b6" },
    // { label: "Prize 8", color: "#d7263d" },
    // { label: "Prize 9", color: "#3a86ff" },
    // { label: "Prize 10", color: "#8338ec" },
    // { label: "Prize 11", color: "#ff006e" },
    // { label: "Prize 12", color: "#06d6a0" },
];

function WheelSpinner() {
    const wheelRef = useRef(null);
    const [result, setResult] = useState("");
    const [spinning, setSpinning] = useState(false);

    const slices = prizes.length;
    const sliceDeg = 360 / slices;

    const buildWheelGradient = () => {
        let gradientParts = [];
        for (let i = 0; i < slices; i++) {
            const start = i * sliceDeg;
            const end = start + sliceDeg;
            gradientParts.push(`${prizes[i].color} ${start}deg ${end}deg`);
        }
        return `conic-gradient(${gradientParts.join(", ")})`;
    };

    const buildLabelsSVG = () => {
        const size = 360;
        const radius = size / 2 - 30;
        let svgParts = [
            `<svg viewBox="0 0 ${size} ${size}" xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' style='position:absolute;top:0;left:0;pointer-events:none'>`,
        ];
        for (let i = 0; i < slices; i++) {
            const angle = (i + 0.5) * sliceDeg;
            const rad = (angle - 90) * (Math.PI / 180);
            const x = size / 2 + Math.cos(rad) * (radius * 0.75);
            const y = size / 2 + Math.sin(rad) * (radius * 0.75);
            svgParts.push(
                `<text x='${x}' y='${y}' text-anchor='middle' alignment-baseline='middle' font-size='14' font-family='Arial' font-weight='700' fill='#fff' transform='rotate(${angle}, ${x}, ${y})'>${prizes[i].label}</text>`
            );
        }
        svgParts.push("</svg>");
        return svgParts.join("");
    };

    const initWheel = () => {
        if (!wheelRef.current) return;
        wheelRef.current.style.background = buildWheelGradient();
        const old = wheelRef.current.querySelector("svg");
        if (old) old.remove();
        wheelRef.current.insertAdjacentHTML("beforeend", buildLabelsSVG());
        wheelRef.current.style.transition = "none";
        wheelRef.current.style.transform = "rotate(0deg)";
        setResult("");
    };

    useEffect(() => {
        initWheel();
    }, []);

    const spinWheel = () => {
        if (spinning) return;
        setSpinning(true);

        const chosenIndex = Math.floor(Math.random() * slices);
        const randomOffset = (Math.random() - 0.5) * (sliceDeg - 8);
        const sliceCenter = chosenIndex * sliceDeg + sliceDeg / 2;
        const targetDeg = 360 - sliceCenter + randomOffset;
        const fullSpins = Math.floor(Math.random() * 3) + 4;
        const totalDeg = fullSpins * 360 + targetDeg;

        requestAnimationFrame(() => {
            wheelRef.current.style.transition =
                "transform 5s cubic-bezier(.15,.9,.1,1)";
            wheelRef.current.style.transform = `rotate(${totalDeg}deg)`;
        });

        const onEnd = () => {
            wheelRef.current.removeEventListener("transitionend", onEnd);
            setSpinning(false);

            const normalized = ((totalDeg % 360) + 360) % 360;
            const landedCenter = (360 - normalized + 360) % 360;
            const landedIndex = Math.floor(landedCenter / sliceDeg) % slices;
            const prize = prizes[landedIndex];
            setResult(`🎉 You won: ${prize.label}!`);
        };

        wheelRef.current.addEventListener("transitionend", onEnd);
    };

    return (
        <div className="wheel-container">
            <div className="wheel-card">

                <div className="wheel-wrap">
                    <div className="wheel-pointer"></div>
                    <div ref={wheelRef} className="wheel-body">
                        <div
                            className="wheel-center-btn"
                            onClick={spinWheel}
                            style={{ cursor: spinning ? "not-allowed" : "pointer" }}
                        >
                            {spinning ? "..." : "SPIN"}
                        </div>
                    </div>
                </div>
                <div className="wheel-controls">
                    <button className="wheel-btn" onClick={initWheel} disabled={spinning}>
                        Reset
                    </button>
                </div>
                <div className="wheel-result">{result}</div>
            </div>
        </div>
    );
}

export default WheelSpinner;
