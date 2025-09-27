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
}, { threshold: 1 });


function highlightMostCentered() {
    let center = window.innerHeight / 2;
    let closest = null;
    let closestDistance = Infinity;
    let projectBrightness = style.getPropertyValue('--project-brightness')

    visibles.forEach(card => {
        let rect = card.getBoundingClientRect();
        let cardCenter = rect.top + rect.height / 2;
        let distance = Math.abs(center - cardCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closest = card;
        }
    });

    document.querySelectorAll(".portfolio-project").forEach(c => {
        c.querySelectorAll(".project-text").forEach(v => {
            v.classList.replace("opaque", "transparent");
        });
        c.style.filter = `brightness(${projectBrightness})`
    });

    if (closest) {
        closest.style.filter = "brightness(1)";
        closest.querySelectorAll(".project-text").forEach(v => {
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





let sections = [];
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


function loadFonts(...fonts) {
    const display = 'swap';

    const families = fonts.map(font => {
        if (typeof font === 'object' && font.name) {
            const name = font.name.replace(/ /g, '+');
            return font.weights
                ? `${name}:wght@${font.weights}`
                : name;
        }
        return font.replace(/ /g, '+');
    }).join('&family=');

    const url = `https://fonts.googleapis.com/css2?family=${families}&display=${display}`;
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = url;
    document.head.appendChild(link);
}


function slugify(text) {
    return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function hasNonEmptyString(obj) {
    return Object.values(obj).some(value => {
        if (typeof value === "string") return value.trim() !== "";
        if (typeof value === "object" && value !== null) return hasNonEmptyString(value);
        return false;
    });
}

function fillHeader()
{
    let portfolioLogo = document.getElementById("portfolio-logo");
    if("info" in portfolioTemplate) {
        portfolioLogo.src = portfolioTemplate.info.logo;
        portfolioLogo.alt = portfolioTemplate.info.logoAlt;
        if (portfolioTemplate.info.logoCircle) {
            portfolioLogo.style.borderRadius = "50%";
        }
    }
}

function fillAbout()
{
    if("info" in portfolioTemplate) {
        let portfolioName = document.getElementById("portfolio-name");
        let portfolioDescription = document.getElementById("portfolio-description");

        portfolioName.innerText = portfolioTemplate.info.fullName
        portfolioDescription.innerText = portfolioTemplate.info.personalDescription
    }
    if("socials" in portfolioTemplate) {
        let portfolioSocials = document.getElementById("portfolio-socials");
        portfolioTemplate.socials.forEach(social => {
            const socialTemplate = document.getElementById("portfolio-social-template");
            let socialClone = socialTemplate.content.cloneNode(true);
            let socialIcon = socialClone.querySelector(".portfolio-social-icon")
            let socialLink = socialClone.querySelector(".portfolio-social-link")
            socialLink.href = social.url
            socialIcon.src = social.icon
            portfolioSocials.appendChild(socialClone)
        })
    }
}

function fillProjects ()
{
    if("projects" in portfolioTemplate) {
        let projectsNode = document.getElementById("projects");
        portfolioTemplate.projects.forEach(project => {
            const projectTemplate = document.getElementById("portfolio-project-template");
            let projectClone = projectTemplate.content.cloneNode(true);
            let projectElement = projectClone.querySelector(".portfolio-project")
            let projectLink = projectClone.querySelector(".portfolio-project-link")
            let projectThumbnail = projectClone.querySelector(".portfolio-project-thumbnail")
            let projectTitle = projectClone.querySelector(".project-title")
            let projectTag = projectClone.querySelector(".project-tag")

            projectLink.href = `/project.html#${slugify(project.name)}`
            projectThumbnail.src = project.videoThumbnail
            projectThumbnail.type = `video${project.videoThumbnailExt}`
            projectTitle.innerText = project.name
            projectTag.innerText = project.types?.[0]
            observer.observe(projectElement);
            sections.push(projectElement);
            projectsNode.appendChild(projectClone)
            requestAnimationFrame(() => {
                projectElement.style.opacity = "1";
            });
        })
    }
}

function fillFooterSection(sectionID, templateObj){
    let footerSectionContact = document.getElementById(sectionID)
    if (hasNonEmptyString(templateObj))
    {
        templateObj.forEach(obj => {
            if (hasNonEmptyString(obj)) {
                let footerItemTemplate
                let footerItemClone
                if(obj.url !== "") {
                    footerItemTemplate = document.getElementById("footer-section-item-link-template");
                    footerItemClone = footerItemTemplate.content.cloneNode(true);
                    let footerItemLink = footerItemClone.querySelector(".footer-section-item-link")
                    footerItemLink.href = obj.url
                }
                else {
                    footerItemTemplate = document.getElementById("footer-section-item-template");
                    footerItemClone = footerItemTemplate.content.cloneNode(true);
                }
                let footerItemIcon = footerItemClone.querySelector(".footer-section-item-icon")
                let footerItemText = footerItemClone.querySelector(".footer-section-item-text")
                footerItemIcon.src = obj.icon
                footerItemText.innerText = obj.text
                footerSectionContact.querySelector(".footer-section-list").appendChild(footerItemClone)
            }
        })
    }
    else {
        footerSectionContact.style.display = "none";
    }
}

function fillFooter() {

    if("footer" in portfolioTemplate) {
        let footerName = document.getElementById("footer-portfolio-name");
        let footerCopyName = document.getElementById("portfolio-copy-footer-name");
        let footerCopyYear = document.getElementById("portfolio-copy-year-footer");
        footerName.innerText = portfolioTemplate.info.fullName
        footerCopyName.innerText = ` ${portfolioTemplate.info.fullName}`
        footerCopyYear.textContent = new Date().getFullYear().toString()

        fillFooterSection("footer-section-contact", portfolioTemplate.footer.contact)
        fillFooterSection("footer-section-socials", portfolioTemplate.socials)
    }
}


function fillPortfolioInfo() {
    fillHeader()
    fillAbout()
    fillProjects()
    fillFooter()
}

function applyConfigFonts()
{
    loadFonts(styleConfig.portfolioFont, styleConfig.fullNameFont);
    document.querySelectorAll(".full-name").forEach(el => {
        el.style.fontFamily = styleConfig.fullNameFont.name;
        el.style.fontWeight = styleConfig.fullNameFont?.useWeight ?? 'normal';
    })
    document.body.style.fontFamily = styleConfig.portfolioFont.name;
    document.body.style.fontWeight = styleConfig.portfolioFont?.useWeight ?? 'normal';
}

function applyConfigStyle()
{
    applyConfigFonts()
}

fillPortfolioInfo()
applyConfigStyle()