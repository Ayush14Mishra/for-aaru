
document.addEventListener("DOMContentLoaded", function () {
    // Get Aaru's name from the URL, if provided
    const params = new URLSearchParams(window.location.search);
    const personName = params.get("name") || "Aaru";

    const nameElement = document.getElementById("name");
    const naeElement = document.getElementById("nae");

    if (nameElement) nameElement.textContent = personName;
    if (naeElement) naeElement.textContent = personName;

    // Hide the main content until the button is clicked
    if (window.jQuery) {
        $(".main").hide();
    }

    // Typing messages
    const typedElement = document.querySelector("#typed");

    if (typedElement && typeof Typed !== "undefined") {
        new Typed("#typed", {
            strings: [
                "YOU DID IT, AARU! ♡",
                "All that hard work paid off!",
                "So proud of you for passing your CS exam.",
                "You deserve all the happiness today. 🎀",
                "Keep shining, pretty girl. ✨"
            ],
            typeSpeed: 40,
            backSpeed: 20,
            backDelay: 1500,
            loop: true
        });
    }

    // Confetti setup
    const canvas = document.getElementById("confetti");
    const ctx = canvas ? canvas.getContext("2d") : null;

    let particles = [];
    let animationFrame;
    let confettiActive = false;

    const colors = [
        "#ff9eb5",
        "#ffc6d5",
        "#d9c2ff",
        "#b8dcff",
        "#ffe5a3"
    ];

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createConfetti() {
        if (!canvas || !ctx) return;

        resizeCanvas();
        particles = [];

        for (let i = 0; i < 130; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -Math.random() * canvas.height,
                size: Math.random() * 7 + 3,
                speed: Math.random() * 3 + 2,
                drift: Math.random() * 2 - 1,
                rotation: Math.random() * 360,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        confettiActive = true;
        animateConfetti();

        // Stop after a few seconds
        setTimeout(() => {
            confettiActive = false;
            cancelAnimationFrame(animationFrame);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 6000);
    }

    function animateConfetti() {
        if (!confettiActive || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.y += p.speed;
            p.x += p.drift;
            p.rotation += 2;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();

            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });

        animationFrame = requestAnimationFrame(animateConfetti);
    }

    // Start button
    const playButton = document.getElementById("play");

    if (playButton) {
        playButton.addEventListener("click", function () {
            if (window.jQuery) {
                $(".loader").fadeOut(1000);
                $(".main").fadeIn(1200);

                $(".balloon-border").animate({
                    top: "-500px"
                }, 8000);
            } else {
                document.querySelector(".loader")?.classList.add("hidden");
                document.querySelector(".main")?.classList.remove("hidden");
            }

            // Play background music
            const audio = document.querySelector(".song");

            if (audio) {
                audio.play().catch(() => {
                    console.log("Music requires user interaction.");
                });
            }

            // Celebration!
            createConfetti();
        });
    }

    window.addEventListener("resize", resizeCanvas);
});
