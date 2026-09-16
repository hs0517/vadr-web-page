const project = document.getElementById("js-project");

for (let i = 0; i < projectsList.length; i++) {
    // 定義したproject要素を複製する
    const project_content = project.content.cloneNode(true);

    // 複製したproject要素にデータを挿入
    project_content.querySelector(".js-project-img").src = projectsList[i].project_img;
    project_content.querySelector(".js-project-name").textContent = projectsList[i].project_name;
    project_content.querySelector(".js-project-summary").textContent =
        projectsList[i].project_summary;
    project_content.querySelector(".link").href =
        projectsList[i].page_link;

    // #js-contentに追加
    document.getElementById("js-projects").appendChild(project_content);
}