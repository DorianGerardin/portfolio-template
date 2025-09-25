const style = getComputedStyle(document.documentElement);

let visibles = new Set();
let ticking = false;

let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            visibles.add(entry.target);
        } else {
            visibles.delete(entry.target);
        }
    });
}, { threshold: 0.3 });


function highlightMostCentered() {
    let center = window.innerHeight / 2;
    let closest = null;
    let closestDistance = Infinity;
    let workBrightness = style.getPropertyValue('--work-brightness')

    visibles.forEach(card => {
        let rect = card.getBoundingClientRect();
        let cardCenter = rect.top + rect.height / 2;
        let distance = Math.abs(center - cardCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closest = card;
        }
    });

    document.querySelectorAll(".work").forEach(c => {
        c.querySelectorAll(".work-text").forEach(v => {
            v.classList.replace("opaque", "transparent");
        });
        c.style.filter = `brightness(${workBrightness})`
    });

    if (closest) {
        closest.style.filter = "brightness(1)";
        closest.querySelectorAll(".work-text").forEach(v => {
            v.classList.replace("transparent", "opaque");
        });
    }

    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(highlightMostCentered);
        ticking = true;
    }
});

document.querySelectorAll(".work").forEach(div => {
    observer.observe(div);
});

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".work").forEach(v => {
        v.classList.add("visible");
    });
});




const sections = document.querySelectorAll(".work");
let index = 0;
let isScrolling = false;

function disableWheel(e) {
    e.preventDefault();
}

function lockScroll() {
    window.addEventListener("wheel", disableWheel, { passive: false });
}

function unlockScroll() {
    window.removeEventListener("wheel", disableWheel, { passive: false });
}

window.addEventListener("wheel", (e) => {
    if (index === sections.length - 1 && e.deltaY > 0) {
        return;
    }
    if (index === 0 && e.deltaY < 0) {
        return;
    }

    if (isScrolling) return;
    isScrolling = true;
    lockScroll()

    const currentTop = window.scrollY;
    const targetTop = sections[index].offsetTop;
    const distance = Math.abs(currentTop - targetTop);

    if (distance > 5) {
        sections[index].scrollIntoView({ behavior: "smooth" });
    } else {
        if (e.deltaY > 0 && index < sections.length - 1) {
            index++;
        } else if (e.deltaY < 0 && index > 0) {
            index--;
        }
        sections[index].scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
        isScrolling = false;
        unlockScroll()
    }, 300);
});
