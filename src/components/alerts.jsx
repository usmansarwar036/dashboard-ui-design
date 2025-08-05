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
    title = "",
    html = "",
    showConfirmButton = false,
    showCancelButton = false,
    confirmButtonText = "OK",
    cancelButtonText = "Cancel",
    desc = "",
    returnUrl = "",
} = {}) {
    const MySwal = withReactContent(Swal);

    if (!document.querySelector('script[src*="lottie-player"]')) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js";
        script.type = "module";
        script.async = true;
        document.body.appendChild(script);
    }

    const lottieMap = {
        success: "https://lottie.host/2bb32b41-35de-4130-8c6a-4508e8f98239/zG237i9eeM.lottie",
        error: "https://lottie.host/60d1dd74-1c4b-47c7-8b8e-9218cba436b7/csaUBtgZ2Z.lottie",
        warning: "https://lottie.host/89e9b6f0-a7f3-4b1b-97bc-e21c58696697/EVstSVhkJq.lottie",
        info: "https://lottie.host/35da3c0c-0908-48c9-8b33-17ec88cc00b1/QopqSOYasT.lottie",
        question: "https://lottie.host/b303f3e7-baef-48d2-ac92-7745ed87012f/G4HzGOuTBg.lottie",
        confirm: "https://lottie.host/7a200db5-82d6-4aad-85a7-03e92c5c4185/zUrKdgpsIq.lottie",
        alert: "https://lottie.host/7a200db5-82d6-4aad-85a7-03e92c5c4185/zUrKdgpsIq.lottie",
    };

    const selectedLottie = lottieMap[type] || lottieMap["alert"];

    const lottieHTML = `
        <dotlottie-wc
            src="${selectedLottie}"
            class='max-w-sm w-full m-auto'
            speed="1"
            autoplay
            loop
            ></dotlottie-wc>
            `;

    const combinedHTML = `
        ${html || lottieHTML}
        ${desc ? `<p class="mt-4 text-baae text-gray-700  dark:text-white">${desc}</p>` : ""}
    `;

    MySwal.fire({
        title: `<h1 class='text-xl'>${title}</h1>`,
        html: combinedHTML,
        showConfirmButton,
        showCancelButton,
        confirmButtonText,
        cancelButtonText,
        customClass: {
            confirmButton: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",
            cancelButton: "bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500",
            popup: "us-popup",
        },
        didOpen: () => {
            const popup = document.querySelector(".us-popup");
            if (popup) {
                popup.classList.add(
                    "shadow-lg",
                    "rounded-2xl",
                    "p-4",
                    "bg-white",
                    "dark:bg-white/[0.03]",
                    "dark:border",
                    "dark:border-gray-800",
                    "dark:text-white",
                );
            }
        },
    }).then((result) => {
        if (result.isConfirmed && returnUrl) {
            window.location.href = returnUrl;
        }
    });
}
