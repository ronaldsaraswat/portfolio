/* =========================
   MOBILE NAVIGATION
========================= */

const menuButton =
    document.querySelector(".menu-toggle");

const navigation =
    document.querySelector(".site-nav");

const navigationLinks =
    document.querySelectorAll(".site-nav a");


const closeNavigation = () => {

    if (!menuButton || !navigation) {
        return;
    }

    navigation.classList.remove(
        "open"
    );

    menuButton.classList.remove(
        "active"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    document.body.classList.remove(
        "menu-open"
    );

};


const openNavigation = () => {

    if (!menuButton || !navigation) {
        return;
    }

    navigation.classList.add(
        "open"
    );

    menuButton.classList.add(
        "active"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    menuButton.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    document.body.classList.add(
        "menu-open"
    );

};


if (menuButton && navigation) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                navigation.classList.contains(
                    "open"
                );

            if (isOpen) {
                closeNavigation();
            } else {
                openNavigation();
            }

        }
    );


    navigationLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                closeNavigation
            );

        }
    );


    /* Escape closes menu */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {
                closeNavigation();
            }

        }
    );


    /*
       If device orientation changes or browser
       becomes desktop-sized while menu is open,
       restore normal page state.
    */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >
                1100
            ) {
                closeNavigation();
            }

        }
    );

}


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.querySelector(".contact-form");

const formStatus =
    document.querySelector(".form-status");

const submitButton =
    document.querySelector(".form-submit");


if (
    contactForm &&
    formStatus &&
    submitButton
) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            /* PREVENT DOUBLE SUBMISSION */

            submitButton.disabled = true;

            submitButton.classList.add(
                "is-sending"
            );

            submitButton.innerHTML =
                "Sending…";


            formStatus.textContent = "";

            formStatus.className =
                "form-status";


            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method:
                                contactForm.method,

                            body:
                                new FormData(
                                    contactForm
                                ),

                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    contactForm.reset();

                    formStatus.textContent =
                        "Message sent successfully. Thank you for getting in touch.";

                    formStatus.classList.add(
                        "success"
                    );

                } else {

                    formStatus.textContent =
                        "Your message could not be sent. Please check the form and try again.";

                    formStatus.classList.add(
                        "error"
                    );

                }

            } catch (error) {

                formStatus.textContent =
                    "A connection error occurred. Please try again in a moment.";

                formStatus.classList.add(
                    "error"
                );

            } finally {

                submitButton.disabled = false;

                submitButton.classList.remove(
                    "is-sending"
                );

                submitButton.innerHTML =
                    'Send message <span aria-hidden="true">→</span>';

            }

        }
    );

}


/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

const normalizePortfolioPath = (path) => {
    const cleanedPath = path
        .replace(/index\.html$/, "")
        .replace(/\/+$/, "");

    return cleanedPath || "/";
};

const currentPortfolioPath = normalizePortfolioPath(
    window.location.pathname
);

document.querySelectorAll(".site-nav a[href^='/']").forEach((link) => {

    const linkPath = normalizePortfolioPath(
        new URL(link.href, window.location.origin).pathname
    );

    if (linkPath === currentPortfolioPath) {
        link.setAttribute("aria-current", "page");
    } else {
        link.removeAttribute("aria-current");
    }

});
