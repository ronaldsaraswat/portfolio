/* =========================
   MOBILE NAVIGATION
========================= */

const menuButton =
    document.querySelector(".menu-toggle");

const navigation =
    document.querySelector(".site-nav");

const navigationLinks =
    document.querySelectorAll(".site-nav a");


if (menuButton && navigation) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                navigation.classList.toggle("open");

            menuButton.classList.toggle(
                "active",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );


    navigationLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

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

                    document.body.classList.remove(
                        "menu-open"
                    );

                }
            );

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
