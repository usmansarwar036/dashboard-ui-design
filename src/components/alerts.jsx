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
        success: "https://lottie.host/444c1917-e454-4232-a2d9-d2fe3596b17a/6AyfRcu0Y0.lottie",
        error: "https://lottie.host/c892536b-d59d-4907-a721-1c6ebd218869/HvLhEaMafZ.lottie",
        warning: "https://lottie.host/f147b49a-1a5e-4db4-b899-13406c7d5f2f/TdNDZ9zvFe.json",
        info: "https://lottie.host/b08ebf53-7b25-4cf7-b435-b2c1b30ed3a4/pRJO8L7ZZ4.json",
        question: "https://lottie.host/5d702013-479a-46b7-ae82-5425398c36f6/LUAMYum0Hs.json",
        confirm: "https://lottie.host/c5f28595-f71d-4b0c-b02a-cfc58a16e1f4/ebglGoJt5e.json",
        alert: "https://lottie.host/2cbfc9b3-7ed7-45d1-a457-4433892e365f/HZlQdoMI48.json",
    };

    const selectedLottie = lottieMap[type] || lottieMap["alert"];

    const lottieHTML = `
        <dotlottie-wc
            src="${selectedLottie}"
            style="width: 300px;height: 300px;margin:auto;"
            speed="1"
            autoplay
            loop
        ></dotlottie-wc>
    `;

    const combinedHTML = `
        ${html || lottieHTML}
        ${desc ? `<p class="mt-4 text-sm text-gray-700 dark:text-white">${desc}</p>` : ""}
    `;

    MySwal.fire({
        title,
        html: combinedHTML,
        showConfirmButton,
        showCancelButton,
        confirmButtonText,
        cancelButtonText,
        customClass: {
            confirmButton: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",
            cancelButton: "bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500",
            popup: "dark:bg-black   dark:text-white dark:border dark:border-gray-800",
        },
    }).then((result) => {
        if (result.isConfirmed && returnUrl) {
            window.location.href = returnUrl;
        }
    });
}
