// グローバルナビ（ハンバーガーメニュー / Researchパネル）の開閉
(function () {
    const pcQuery = window.matchMedia('(min-width: 769px)');

    function setResearchOpen(isOpen) {
        const panel = document.querySelector('.js-research-panel');
        const toggle = document.querySelector('.js-research-toggle');
        if (!panel || !toggle) {
            return;
        }
        panel.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        // PC表示でオーバーレイを開いている間は背面のスクロールを止める
        document.body.classList.toggle('is-scroll-locked', isOpen && pcQuery.matches);
    }

    function setNavOpen(isOpen) {
        const nav = document.querySelector('.js-nav');
        const toggle = document.querySelector('.js-nav-toggle');
        if (!nav || !toggle) {
            return;
        }
        nav.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        if (!isOpen) {
            setResearchOpen(false);
        }
    }

    function isOpen(selector) {
        const el = document.querySelector(selector);
        return el !== null && el.classList.contains('is-open');
    }

    // ヘッダーは include.js で後から挿入されるため、document でまとめてクリックを受ける
    document.addEventListener('click', function (e) {
        const target = e.target;
        if (target.closest('.js-nav-toggle')) {
            // ハンバーガーボタン：メニュー全体の開閉
            setNavOpen(!isOpen('.js-nav'));
        } else if (target.closest('.js-research-toggle')) {
            // Research：PCではフルスクリーンオーバーレイ、モバイルではプルダウン（アコーディオン）
            setResearchOpen(!isOpen('.js-research-panel'));
        } else if (target.closest('.js-research-close') || target.classList.contains('js-research-panel')) {
            // 閉じるボタン、またはオーバーレイの背景（カード以外の余白）をクリックしたら閉じる
            setResearchOpen(false);
        }
    });

    // Escキーで閉じる
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            setResearchOpen(false);
        }
    });

    // 画面幅がPC⇔モバイルで切り替わったら開閉状態をリセット
    pcQuery.addEventListener('change', function () {
        setNavOpen(false);
    });
})();
