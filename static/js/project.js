function goToHome() {
    window.location.href = "index.html";
}

// =====================================================================
// =====================================================================

function getProjectByHash() {
    const hash = window.location.hash;
    if (hash === "") {
        goToHome()
    }
    else {
        const projectCode = window.location.hash.substring(1);
        const foundProject = portfolioTemplate.projects.find(
            project => slugify(project.name) === projectCode
        );

        return foundProject || goToHome();
    }
}

// =====================================================================
// =====================================================================

function createProjectBoardRow(rowTitle, rowValue)
{
    if(rowValue)
    {
        let projectBoard = document.getElementById("project-board");
        const projectRowTemplate = document.getElementById("project-board-row-template");
        let projectRowClone = projectRowTemplate.content.cloneNode(true);
        let projectTitleNode = projectRowClone.querySelector(".project-board-row-title")
        let projectTitleValue = projectRowClone.querySelector(".project-board-row-value")
        projectTitleNode.innerText = rowTitle
        projectTitleValue.innerHTML = rowValue
        projectBoard.appendChild(projectRowClone)
    }
}

// =====================================================================
// =====================================================================

function createProjectLinksContainerHTML(project) {

    let projectLinksContainer = document.createElement("div");
    projectLinksContainer.classList.add("project-links-container");
    project.links.forEach(link => {
        let projectLink = document.createElement("a")
        projectLink.href = link.url;
        projectLink.innerText = `${link.text} ↗`;
        projectLink.classList.add("project-link");
        projectLinksContainer.append(projectLink);
    })

    return project.links.length === 0 ? "" : projectLinksContainer.outerHTML
}

// =====================================================================
// =====================================================================

function fillProjectInfo() {
    let project = getProjectByHash()

    if("projects" in portfolioTemplate) {
        let projectTitleNode = document.getElementById("project-title");
        let projectThumbnailNode = document.getElementById("project-thumbnail");
        projectTitleNode.innerHTML = project.name;
        projectThumbnailNode.src = project.videoThumbnail;
        if (project.client) {
            createProjectBoardRow("Client", project.client)
        }
        else {
            createProjectBoardRow("Client", "Personnal project")
        }
        createProjectBoardRow("Tags", project.tags.join(", "))
        createProjectBoardRow("Year", project.year)
        createProjectBoardRow("About", project.description)
        createProjectBoardRow("Links", createProjectLinksContainerHTML(project))

        let projectMedias = document.getElementById("project-medias");
        if(project.medias.length !== 0)
        {   
            project.medias.forEach(media => {
                let projectMediaTemplateID = media.type === "video" ? "project-video-media-template" : "project-img-media-template";
                let projectMediaClone = document.getElementById(projectMediaTemplateID).content.cloneNode(true);
                let projectMedia = projectMediaClone.querySelector(".project-media")
                projectMedia.src = media.src
                showOrHide(media, "text", projectMediaClone.querySelector(".project-media-text"))

                if (media.type === "video")
                {
                    projectMedia.controls = media.controls ?? false
                }
                projectMedias.appendChild(projectMediaClone)
            })
        }
        else 
        {
            projectMedias.style.display = "none"
        }

        
    }
}

// =====================================================================
// =====================================================================

function main() {
    fillHeader()
    fillProjectInfo()
    fillFooter()
    applyConfigStyles()
}

main()