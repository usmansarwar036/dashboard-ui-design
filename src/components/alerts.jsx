import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/**
 * Customizable alert using SweetAlert2 and Lottie
 *
 * @param {{
 *  type?: "success" | "error" | "info" | "warning" | "question" | "confirm" | "alert",
 *  title?: string,
 *  html?: string,
 *  showConfirmButton?: boolean,
 *  showCancelButton?: boolean,
 *  confirmButtonText?: string,
 *  cancelButtonText?: string,
 *  returnUrl?: string
 * }} options
 */
export function USAlert({
    type = "info",
    title = "Alert",
    html = "",
    showConfirmButton = true,
    showCancelButton = false,
    confirmButtonText = "OK",
    cancelButtonText = "Cancel",
    returnUrl = "",
} = {}) {
    const MySwal = withReactContent(Swal);

    if (!document.querySelector('script[src*="lottie-player"]')) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
        script.async = true;
        document.body.appendChild(script);
    }

    const lottieMap = {
        success: "https://assets7.lottiefiles.com/packages/lf20_jbrw3hcz.json",
        error: "https://lottie.host/9f1c1ba4-8a91-407e-b7b4-26201a1faac0/Ib8nOaKbH6.json",
        warning: "https://lottie.host/f147b49a-1a5e-4db4-b899-13406c7d5f2f/TdNDZ9zvFe.json",
        info: "https://lottie.host/b08ebf53-7b25-4cf7-b435-b2c1b30ed3a4/pRJO8L7ZZ4.json",
        question: "https://lottie.host/5d702013-479a-46b7-ae82-5425398c36f6/LUAMYum0Hs.json",
        confirm: "https://lottie.host/c5f28595-f71d-4b0c-b02a-cfc58a16e1f4/ebglGoJt5e.json",
        alert: "https://lottie.host/2cbfc9b3-7ed7-45d1-a457-4433892e365f/HZlQdoMI48.json",
    };

    const selectedLottie = lottieMap[type] || lottieMap["alert"];

    function Lottie() {
        return (
            <div>
                <DotLottieReact
                    src={`/src/assets/lottie/${type}.json`}
                    loop
                    autoplay
                />
            </div>
        );
    }

    MySwal.fire({
        title,
        html: html || Lottie(),
        showConfirmButton,
        showCancelButton,
        confirmButtonText,
        cancelButtonText,
        customClass: {
            confirmButton: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",
            cancelButton: "bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500",
            popup: "dark:bg-black dark:text-white dark:border dark:border-gray-800",
        },
    }).then((result) => {
        if (result.isConfirmed && returnUrl) {
            window.location.href = returnUrl;
        }
    });
}
