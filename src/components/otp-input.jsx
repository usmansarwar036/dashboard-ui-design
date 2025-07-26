import { useEffect, useRef, useState } from "react";

const OTPInput = ({ length = 6, onChange }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputsRef = useRef([]);

    const handleChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onChange?.(newOtp.join(""));

        if (value && index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData("Text").slice(0, length);
        if (!/^\d+$/.test(data)) return;
        const newOtp = [...otp];
        for (let i = 0; i < length; i++) {
            newOtp[i] = data[i] || "";
        }
        setOtp(newOtp);
        onChange?.(newOtp.join(""));
        const nextEmpty = newOtp.findIndex((d) => d === "");
        if (nextEmpty === -1) inputsRef.current[length - 1].focus();
        else inputsRef.current[nextEmpty].focus();
    };

    useEffect(() => {
        inputsRef.current[0].focus();
    }, []);

    return (
        <div
            onPaste={handlePaste}
            className="flex justify-center gap-2"
        >
            {otp.map((digit, i) => (
                <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="h-8 w-8 rounded border border-gray-300 text-center text-lg focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 sm:h-12 sm:w-12"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                />
            ))}
        </div>
    );
};

export default OTPInput;
