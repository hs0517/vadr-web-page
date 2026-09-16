//ヘッダーのインクルード
const includeHeader = new XMLHttpRequest();
includeHeader.open("GET", "/include/header.html", true);
includeHeader.onreadystatechange = function () {
    if (includeHeader.readyState === 4 && includeHeader.status === 200) {
        const headerHTML = includeHeader.responseText;
        const header = document.querySelector("#header");
        header.insertAdjacentHTML("afterbegin", headerHTML);
    }
};
includeHeader.send();

//フッターのインクルード
const includeFooter = new XMLHttpRequest();
includeFooter.open("GET", "/include/footer.html", true);
includeFooter.onreadystatechange = function () {
    if (includeFooter.readyState === 4 && includeFooter.status === 200) {
        const footerHTML = includeFooter.responseText;
        const footer = document.querySelector("#footer");
        footer.insertAdjacentHTML("afterbegin", footerHTML);
    }
};
includeFooter.send();

//サイドメニューのインクルード
const includeSideMenu = new XMLHttpRequest();
includeSideMenu.open("GET", "/include/sidebar.html", true);
includeSideMenu.onreadystatechange = function () {
    if (includeSideMenu.readyState === 4 && includeSideMenu.status === 200) {
        const sideMenuHTML = includeSideMenu.responseText;
        const sideMenu = document.querySelector("#sidemenu");
        sideMenu.insertAdjacentHTML("afterbegin", sideMenuHTML);
    }
};
includeSideMenu.send();

//サイドメニュー中の該当ページ名を強調、リンクの無効化
const elm = document.getElementById("sidemenu");
var pathname = window.location.pathname.split("/").pop();
elm.classList.add("sidemenu-" + pathname.substring(0, pathname.indexOf(".")));
