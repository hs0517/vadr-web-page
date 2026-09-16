// 日本語ページ(/〜)と英語ページ(/en/〜)の切り替え
// - 保存された言語設定、なければブラウザの言語設定に合わせて、もう一方の言語のページへリダイレクトする
// - ヘッダーの言語切り替えリンク(.js-lang-switch)で選んだ言語を保存する
// 本文の表示前にリダイレクトするため、<head> で defer を付けずに最初に読み込む
(function () {
    const STORAGE_KEY = 'vadr-lang';

    const path = location.pathname;
    const current = path === '/en' || path.indexOf('/en/') === 0 ? 'en' : 'ja';

    // 同じページのもう一方の言語のURL
    function counterpartUrl() {
        let target;
        if (current === 'en') {
            target = path.replace(/^\/en(\/|$)/, '/');
        } else {
            target = '/en' + path;
        }
        return target + location.search + location.hash;
    }

    function getSaved() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function save(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            // 保存できない環境（プライベートブラウズなど）では毎回ブラウザの設定に従う
        }
    }

    function browserLang() {
        const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
        return String(langs[0]).toLowerCase().indexOf('ja') === 0 ? 'ja' : 'en';
    }

    // 検索エンジンのクローラーはリダイレクトしない（日本語ページが検索結果に載らなくなるため）
    const isBot = /bot|crawl|spider|slurp|facebookexternalhit/i.test(navigator.userAgent);

    const preferred = getSaved() || browserLang();
    if (!isBot && preferred !== current) {
        location.replace(counterpartUrl());
        return;
    }

    // ヘッダーは include.js で後から挿入されるため、document でクリックを受ける
    document.addEventListener('click', function (e) {
        const link = e.target.closest('.js-lang-switch');
        if (!link) {
            return;
        }
        e.preventDefault();
        save(current === 'ja' ? 'en' : 'ja');
        location.href = counterpartUrl();
    });

    window.VadrLang = {
        current: current,
        counterpartUrl: counterpartUrl,
    };
})();
