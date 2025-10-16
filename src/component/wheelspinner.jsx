import React, { useRef, useState, useEffect } from "react";
import { Spinerrun } from "../helper/apifunction";
import spinningSound from "../component/spinning.mp3";
import resultSound from "../component/result.mp3";

const prizes = [
    { label: "5$", color: "#ff595e" },
    { label: "10$", color: "#ffca3a" },
    { label: "20$", color: "#8ac926" },
    { label: "50$", color: "#1982c4" },
    { label: "100$", color: "#6a4c93" },
    { label: "200$", color: "#ff9f1c" },
    { label: "500$", color: "#8ac926" },
];

function WheelSpinner() {
    const wheelRef = useRef(null);
    const [result, setResult] = useState("");
    const [spinning, setSpinning] = useState(false);
    const [user, setUser] = useState(null);

    const spinningAudioRef = useRef(new Audio(spinningSound));
    const resultAudioRef = useRef(new Audio(resultSound));

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
                `<text x='${x}' y='${y}' text-anchor='middle' alignment-baseline='middle' font-size='18' font-family='Arial' font-weight='700' fill='#fff' transform='rotate(${angle}, ${x}, ${y})'>${prizes[i].label}</text>`
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

    const spinWheel = async () => {
        if (spinning || !user) return;
        setSpinning(true);

        // Play spinning sound
        const spinningAudio = spinningAudioRef.current;
        spinningAudio.currentTime = 0;
        spinningAudio.loop = true;
        spinningAudio.play().catch(() => console.log("Autoplay blocked"));

        try {
            const response = await Spinerrun(user.id);
            if (!response.success) {
                setResult(`❌ ${response.message}`);
                setSpinning(false);
                spinningAudio.pause();
                return;
            }

            const { spinAmount } = response;
            const prizeIndex = prizes.findIndex((prize) => prize.label === `${spinAmount}$`);
            if (prizeIndex === -1) {
                setResult(`❌ Invalid prize amount: ${spinAmount}`);
                setSpinning(false);
                spinningAudio.pause();
                return;
            }

            const randomOffset = (Math.random() - 0.5) * (sliceDeg - 8);
            const sliceCenter = prizeIndex * sliceDeg + sliceDeg / 2;
            const targetDeg = 360 - sliceCenter + randomOffset;
            const fullSpins = Math.floor(Math.random() * 3) + 4;
            const totalDeg = fullSpins * 360 + targetDeg;

            requestAnimationFrame(() => {
                wheelRef.current.style.transition = "transform 20s cubic-bezier(.20,.12,.10,5)";
                wheelRef.current.style.transform = `rotate(${totalDeg}deg)`;
            });

            setTimeout(() => {
                setSpinning(false);
                setResult(`🎉 You won: ${spinAmount}$`);

                // Stop spinning sound
                spinningAudio.pause();
                spinningAudio.currentTime = 0;

                // Play result sound once
                const resultAudio = resultAudioRef.current;
                resultAudio.currentTime = 0;
                resultAudio.play().catch(() => console.log("Autoplay blocked"));
            }, 20000);
        } catch (error) {
            console.error("Spin error:", error);
            setResult("❌ Spin Not Available");
            setSpinning(false);
            spinningAudioRef.current.pause();
        }
    };

    useEffect(() => {
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
            setUser(window.Telegram.WebApp.initDataUnsafe.user);
        }
    }, []);

    return (
        <div className="wheel-container">
            <div className="wheel-card">
                <div className="wheel-wrap">
                    <div className="wheel-pointer"></div>
                    <div ref={wheelRef} className="wheel-body">
                        <div
                            className="wheel-center-btn"
                            onClick={spinWheel}
                            style={{ cursor: spinning || !user ? "not-allowed" : "pointer" }}
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
