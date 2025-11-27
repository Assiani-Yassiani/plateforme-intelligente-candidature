chiffres = document.querySelectorAll(".chiffres");
let started = false;
window.addEventListener("scroll", () => {
    if (window.scrollY > 800) {
        if (!started) {
            console.log("ca marche");
            chiffres.forEach(chiffre => {
                let v = 0;
                let b = parseInt(chiffre.dataset.value) / 50;
                let counter = setInterval(() => {
                    v += b; chiffre.textContent = "+" + v;
                    if (v == chiffre.dataset.value) {
                        clearInterval(counter);
                    }
                }, 40)
            });
        }
        started = true;
    }
});