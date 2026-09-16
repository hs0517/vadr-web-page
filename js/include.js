// data-include 属性で指定した共通パーツ（ヘッダー・フッター・サイドメニュー）を読み込んで挿入する
(function () {
    // "/beam.html" と "/beam"、"/index.html" と "/" を同じページとして扱う
    function normalizePath(pathname) {
        return pathname.replace(/\.html$/, '').replace(/\/index$/, '/');
    }

    // 挿入したパーツ内の、現在のページへのリンクに印を付ける
    function markCurrentLinks(root) {
        const current = normalizePath(location.pathname);
        root.querySelectorAll('a[href]').forEach(function (link) {
            if (normalizePath(link.pathname) === current) {
                link.classList.add('is-current');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    document.querySelectorAll('[data-include]').forEach(function (el) {
        fetch(el.dataset.include)
            .then(function (res) {
                if (!res.ok) {
                    throw new Error(res.status + ' ' + res.url);
                }
                return res.text();
            })
            .then(function (html) {
                el.innerHTML = html;
                markCurrentLinks(el);
                // 言語切り替えリンクの遷移先を、今のページのもう一方の言語版にする（lang.js）
                if (window.VadrLang) {
                    el.querySelectorAll('.js-lang-switch').forEach(function (link) {
                        link.href = window.VadrLang.counterpartUrl();
                    });
                }
            })
            .catch(function (err) {
                console.error('共通パーツの読み込みに失敗しました:', err);
            });
    });
})();
