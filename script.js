/* =========================================================
   DRIVEHAUS — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   PRELOADER
   ========================================================= */

const preloader = document.getElementById("preloader");
const loadingProgress = document.getElementById("loadingProgress");
const loadingPercent = document.getElementById("loadingPercent");

let progress = 0;

const loadingInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 8) + 2;

    if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);

        loadingProgress.style.width = "100%";
        loadingPercent.textContent = "100%";

        setTimeout(() => {
            preloader.classList.add("hidden");
        }, 500);
    }

    loadingProgress.style.width = `${progress}%`;
    loadingPercent.textContent = `${progress}%`;

}, 100);


/* =========================================================
   NAVBAR SCROLL EFFECT
   ========================================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileNavigation =
    document.getElementById("mobileNavigation");

const mobileClose =
    document.getElementById("mobileClose");

function openMobileMenu() {

    mobileNavigation.classList.add("active");

    document.body.classList.add("no-scroll");

}

function closeMobileMenu() {

    mobileNavigation.classList.remove("active");

    document.body.classList.remove("no-scroll");

}

mobileMenuButton.addEventListener(
    "click",
    openMobileMenu
);

mobileClose.addEventListener(
    "click",
    closeMobileMenu
);


/* Close menu when navigation link is clicked */

document
    .querySelectorAll(".mobile-navigation a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


/* =========================================================
   SEARCH OVERLAY
   ========================================================= */

const searchButton =
    document.getElementById("searchButton");

const searchOverlay =
    document.getElementById("searchOverlay");

const searchClose =
    document.getElementById("searchClose");

const carSearch =
    document.getElementById("carSearch");

const searchResults =
    document.getElementById("searchResults");


function openSearch() {

    searchOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

    setTimeout(() => {
        carSearch.focus();
    }, 300);

}


function closeSearch() {

    searchOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

    carSearch.value = "";

    searchResults.innerHTML = "";

}


searchButton.addEventListener(
    "click",
    openSearch
);


searchClose.addEventListener(
    "click",
    closeSearch
);


/* Close search with Escape */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeSearch();
        closeCarModal();
        closeMobileMenu();

    }

});


/* =========================================================
   SEARCH CARS
   ========================================================= */

const allCars = [

    {
        name: "Mercedes AMG GT 63 S",
        category: "Performance",
        price: "₹2.71 Cr"
    },

    {
        name: "Porsche 911 Carrera",
        category: "Performance",
        price: "₹2.00 Cr"
    },

    {
        name: "BMW 7 Series",
        category: "Luxury",
        price: "₹1.81 Cr"
    },

    {
        name: "Range Rover Sport",
        category: "SUV",
        price: "₹2.60 Cr"
    },

    {
        name: "Audi A8 L",
        category: "Luxury",
        price: "₹1.34 Cr"
    }

];


carSearch.addEventListener(
    "input",
    () => {

        const searchTerm =
            carSearch.value
                .toLowerCase()
                .trim();


        if (!searchTerm) {

            searchResults.innerHTML = "";

            return;

        }


        const matchingCars =
            allCars.filter(car =>
                car.name
                    .toLowerCase()
                    .includes(searchTerm)
            );


        if (matchingCars.length === 0) {

            searchResults.innerHTML = `
                <div class="search-result">
                    <span>No vehicle found</span>
                </div>
            `;

            return;

        }


        searchResults.innerHTML =
            matchingCars
                .map(car => `

                    <div
                        class="search-result"
                        data-search-car="${car.name}"
                    >

                        <div>

                            <strong>
                                ${car.name}
                            </strong>

                            <small>
                                ${car.category}
                            </small>

                        </div>

                        <strong>
                            ${car.price}
                        </strong>

                    </div>

                `)
                .join("");


        document
            .querySelectorAll("[data-search-car]")
            .forEach(result => {

                result.addEventListener(
                    "click",
                    () => {

                        const carName =
                            result.dataset.searchCar;

                        closeSearch();

                        openCarModal(carName);

                    }
                );

            });

    }
);


/* =========================================================
   CAR FILTERS
   ========================================================= */

const filterButtons =
    document.querySelectorAll(".filter-button");

const carCards =
    document.querySelectorAll(".car-card");


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            /* Remove active class */

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );


            button.classList.add("active");


            const filter =
                button.dataset.filter;


            carCards.forEach(card => {

                const category =
                    card.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.classList.remove("hide");

                    setTimeout(() => {

                        card.style.opacity = "1";
                        card.style.transform =
                            "translateY(0)";

                    }, 50);

                } else {

                    card.classList.add("hide");

                }

            });

        }
    );

});


/* =========================================================
   FAVOURITE / HEART BUTTON
   ========================================================= */

const heartButtons =
    document.querySelectorAll(".heart-button");


const toast =
    document.getElementById("toast");


let toastTimeout;


heartButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            const icon =
                button.querySelector("i");


            const liked =
                button.classList.toggle("liked");


            if (liked) {

                icon.classList.remove(
                    "fa-regular"
                );

                icon.classList.add(
                    "fa-solid"
                );

                showToast(
                    "Added to favourites"
                );

            } else {

                icon.classList.remove(
                    "fa-solid"
                );

                icon.classList.add(
                    "fa-regular"
                );

                showToast(
                    "Removed from favourites"
                );

            }

        }
    );

});


function showToast(message) {

    const toastText =
        toast.querySelector("span");

    toastText.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

}


/* =========================================================
   CAR MODAL
   ========================================================= */

const carModal =
    document.getElementById("carModal");

const modalClose =
    document.getElementById("modalClose");

const modalCarName =
    document.getElementById("modalCarName");

const modalCarImage =
    document.getElementById("modalCarImage");

const modalCarDescription =
    document.getElementById(
        "modalCarDescription"
    );

const modalPrice =
    document.getElementById("modalPrice");

const modalDrive =
    document.getElementById("modalDrive");


const carDetails = {

    "Mercedes AMG GT 63 S": {

        image:
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=90",

        description:
            "A breathtaking grand tourer combining handcrafted luxury with uncompromising AMG performance.",

        price:
            "₹2.71 Cr"

    },


    "Porsche 911 Carrera": {

        image:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90",

        description:
            "An iconic sports car engineered around precision, balance and pure driving emotion.",

        price:
            "₹2.00 Cr"

    },


    "BMW 7 Series": {

        image:
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=90",

        description:
            "A sophisticated luxury sedan combining executive comfort with effortless performance.",

        price:
            "₹1.81 Cr"

    },


    "Range Rover Sport": {

        image:
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=90",

        description:
            "A commanding performance SUV built for luxury, adventure and everyday versatility.",

        price:
            "₹2.60 Cr"

    },


    "Audi A8 L": {

        image:
            "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1600&q=90",

        description:
            "Elegant design, advanced technology and exceptional comfort come together in Audi's flagship sedan.",

        price:
            "₹1.34 Cr"

    }

};


function openCarModal(carName) {

    const car =
        carDetails[carName];


    if (!car) {

        console.warn(
            "Car details not found:",
            carName
        );

        return;

    }


    modalCarName.textContent =
        carName;

    modalCarImage.src =
        car.image;

    modalCarImage.alt =
        carName;

    modalCarDescription.textContent =
        car.description;

    modalPrice.textContent =
        car.price;


    carModal.classList.add("active");

    document.body.classList.add(
        "no-scroll"
    );


    /*
        Store selected vehicle
        for the test drive button.
    */

    modalDrive.dataset.vehicle =
        carName;

}


function closeCarModal() {

    carModal.classList.remove("active");

    document.body.classList.remove(
        "no-scroll"
    );

}


modalClose.addEventListener(
    "click",
    closeCarModal
);


/* Close modal by clicking outside */

carModal.addEventListener(
    "click",
    event => {

        if (
            event.target === carModal
        ) {

            closeCarModal();

        }

    }
);


/* =========================================================
   VIEW VEHICLE BUTTONS
   ========================================================= */

const vehicleButtons =
    document.querySelectorAll(
        "[data-car]"
    );


vehicleButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            const carName =
                button.dataset.car;

            openCarModal(carName);

        }
    );

});


/* =========================================================
   MODAL → TEST DRIVE
   ========================================================= */

modalDrive.addEventListener(
    "click",
    () => {

        const selectedVehicle =
            modalDrive.dataset.vehicle;


        closeCarModal();


        setTimeout(() => {

            const vehicleSelect =
                document.querySelector(
                    ".input-group select"
                );


            if (vehicleSelect) {

                const options =
                    Array.from(
                        vehicleSelect.options
                    );


                const matchingOption =
                    options.find(
                        option =>
                            option.text
                                .toLowerCase()
                                .includes(
                                    selectedVehicle
                                        .split(" ")[0]
                                        .toLowerCase()
                                )
                    );


                if (matchingOption) {

                    vehicleSelect.value =
                        matchingOption.value;

                }

            }

        }, 500);

    }
);


/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   COUNTER ANIMATION
   ========================================================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );


let countersStarted = false;


function animateCounter(counter) {

    const target =
        Number(
            counter.dataset.target
        );


    const duration = 1800;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
            Ease-out effect
        */

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );


        const current =
            Math.floor(
                eased * target
            );


        counter.textContent =
            current.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                target.toLocaleString();

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


const statsSection =
    document.querySelector(".stats");


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !countersStarted
                ) {

                    countersStarted = true;


                    counters.forEach(
                        counter =>
                            animateCounter(
                                counter
                            )
                    );


                    counterObserver.disconnect();

                }

            });

        },
        {
            threshold: 0.3
        }
    );


if (statsSection) {

    counterObserver.observe(
        statsSection
    );

}


/* =========================================================
   TEST DRIVE FORM
   ========================================================= */

const testDriveForm =
    document.getElementById(
        "testDriveForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


testDriveForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const inputs =
            testDriveForm.querySelectorAll(
                "input, select"
            );


        let valid = true;


        inputs.forEach(input => {

            if (!input.value.trim()) {

                valid = false;

                input.style.borderColor =
                    "#ff5555";

            } else {

                input.style.borderColor =
                    "";

            }

        });


        if (!valid) {

            formMessage.textContent =
                "Please complete all fields.";

            formMessage.style.color =
                "#ff6666";

            return;

        }


        /*
            Demo submission.

            Later we can connect this
            to a real backend/database.
        */

        formMessage.textContent =
            "✓ Request received! Our team will contact you shortly.";

        formMessage.style.color =
            "#d7ff3f";


        showToast(
            "Test drive request submitted"
        );


        testDriveForm.reset();

    }
);


/* =========================================================
   DATE INPUT — PREVENT PAST DATES
   ========================================================= */

const dateInput =
    document.querySelector(
        'input[type="date"]'
    );


if (dateInput) {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    dateInput.min = today;

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
   ========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const targetId =
                    anchor
                        .getAttribute("href");


                if (
                    targetId === "#" ||
                    !targetId
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


/* =========================================================
   HERO PARALLAX EFFECT
   ========================================================= */

const heroBackground =
    document.querySelector(
        ".hero-background"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!heroBackground) return;


        const scroll =
            window.scrollY;


        if (scroll < window.innerHeight) {

            heroBackground.style.transform =
                `translateY(${scroll * 0.12}px) scale(1.02)`;

        }

    }
);


/* =========================================================
   MOUSE MOVE EFFECT ON CAR CARDS
   ========================================================= */

if (
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    document
        .querySelectorAll(".car-card")
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        (y - centerY) /
                        35;


                    const rotateY =
                        (centerX - x) /
                        35;


                    card.style.transform =
                        `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

}


/* =========================================================
   BUTTON RIPPLE EFFECT
   ========================================================= */

document
    .querySelectorAll(
        ".primary-button, .secondary-button, .card-button, .outline-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.classList.add(
                    "button-ripple"
                );


                const rect =
                    button.getBoundingClientRect();


                ripple.style.left =
                    `${event.clientX - rect.left}px`;

                ripple.style.top =
                    `${event.clientY - rect.top}px`;


                this.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.background =
                    "#171a1e";

                image.alt =
                    "Vehicle image unavailable";

            }
        );

    });


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%cDRIVEHAUS",
    "font-size:30px;font-weight:bold;color:#d7ff3f;"
);

console.log(
    "%cBeyond the drive.",
    "font-size:14px;color:#888;"
);
