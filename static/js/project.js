function goToHome() {
    window.location.href = "index.html";
}

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

function createProjectBoardRow(rowTitle, rowValue)
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

function fillProjectInfo() {
    let project = getProjectByHash()

    if("projects" in portfolioTemplate) {
        let projectTitleNode = document.getElementById("project-title");
        let projectThumbnailNode = document.getElementById("project-thumbnail");
        projectTitleNode.innerHTML = project.name;
        projectThumbnailNode.src = project.videoThumbnail;
        createProjectBoardRow("Client", project.client)
        createProjectBoardRow("Tags", project.types.join(", "))
        createProjectBoardRow("Year", project.year)
        createProjectBoardRow("About", project.description)

        let projectLinks = ""
        let projectLinksContainer = document.createElement("div");
        projectLinksContainer.classList.add("project-links-container");
        project.additionalLinks.forEach(link => {
            let projectLink = document.createElement("a")
            projectLink.href = link.url;
            projectLink.innerText = `${link.text} ↗`;
            projectLink.classList.add("project-link");
            projectLinksContainer.append(projectLink);
        })
        createProjectBoardRow("Additional links", projectLinksContainer.outerHTML)
    }


}


function main() {
    fillHeader()
    fillProjectInfo()
    fillFooter()
    applyConfigStyles()
}

main()