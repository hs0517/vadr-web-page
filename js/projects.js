// トップページの研究プロジェクト一覧を、projects-data.js のデータからカードとして生成する
(function () {
    const template = document.getElementById('js-project-card-template');
    const list = document.getElementById('js-project-list');

    projects.forEach(function (project) {
        const card = template.content.cloneNode(true);
        card.querySelector('.js-card-img').src = project.image;
        card.querySelector('.js-card-title').textContent = project.name;
        card.querySelector('.js-card-text').textContent = project.summary;

        const link = card.querySelector('.js-card-link');
        link.href = project.url;
        link.setAttribute('aria-label', project.name);

        list.appendChild(card);
    });
})();
