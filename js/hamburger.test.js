$(function () {
    var $btnGNav = $('.btn-gNav');
    var $gNav = $('.gNav');
    var $researchToggle = $('.js-research-toggle');
    var $researchPanel = $('.research-panel');
    var $researchClose = $('.js-research-close');
    var pcQuery = window.matchMedia('(min-width: 769px)');

    function closeResearch() {
        $researchPanel.removeClass('open');
        $researchToggle.attr('aria-expanded', 'false');
        $('body').removeClass('no-scroll');
    }

    function closeGNav() {
        $gNav.removeClass('open');
        $btnGNav.attr('aria-expanded', 'false');
        closeResearch();
    }

    // ハンバーガーボタン：メニュー全体の開閉
    $btnGNav.on('click', function () {
        var isOpen = $gNav.toggleClass('open').hasClass('open');
        $(this).attr('aria-expanded', String(isOpen));
        if (!isOpen) {
            closeResearch();
        }
    });

    // Research：PCではフルスクリーンオーバーレイ、モバイルではプルダウン（アコーディオン）
    $researchToggle.on('click', function () {
        var isOpen = $researchPanel.toggleClass('open').hasClass('open');
        $(this).attr('aria-expanded', String(isOpen));
        // PC表示でオーバーレイを開いている間は背面のスクロールを止める
        $('body').toggleClass('no-scroll', isOpen && pcQuery.matches);
    });

    // オーバーレイの閉じるボタン（PCのみ表示）
    $researchClose.on('click', closeResearch);

    // オーバーレイの背景（カード以外の余白）をクリックしたら閉じる
    $researchPanel.on('click', function (e) {
        if (e.target === this) {
            closeResearch();
        }
    });

    // Escキーで閉じる
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            closeResearch();
        }
    });

    // 画面幅がPC⇔モバイルで切り替わったら開閉状態をリセット
    pcQuery.addEventListener('change', closeGNav);
});
