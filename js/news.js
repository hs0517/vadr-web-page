// data/news.json のニュースを表示する
// - #js-news-list   : 新しい順の一覧。data-limit があればその件数だけ表示（トップページ）
// - #js-news-detail : URL の ?id= に対応する1件を表示（news-detail.html）
(function () {
    const DATA_URL = '/data/news.json';

    // 要素を作って class とテキストを設定する（テキストは textContent で入れる）
    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) {
            node.className = className;
        }
        if (text !== undefined) {
            node.textContent = text;
        }
        return node;
    }

    // "2023-04-06" -> "2023/04/06"
    function formatDate(date) {
        return date.replace(/-/g, '/');
    }

    function detailUrl(news) {
        return '/news-detail.html?id=' + encodeURIComponent(news.id);
    }

    function loadNews() {
        return fetch(DATA_URL)
            .then(function (res) {
                if (!res.ok) {
                    throw new Error(res.status + ' ' + res.url);
                }
                return res.json();
            })
            .then(function (list) {
                // 日付の新しい順。同じ日付ならファイル内の順番を保つ
                return list.slice().sort(function (a, b) {
                    return b.date.localeCompare(a.date);
                });
            });
    }

    function renderList(container, list) {
        const limit = Number(container.dataset.limit) || list.length;
        list.slice(0, limit).forEach(function (news) {
            const item = el('li', 'c-news-list__item');
            const link = el('a', 'c-news-list__link');
            link.href = detailUrl(news);

            const date = el('time', 'c-news-list__date', formatDate(news.date));
            date.dateTime = news.date;
            const category = el('p', 'c-news-list__category');
            category.appendChild(el('span', 'c-news-list__category-label', news.category));

            link.append(date, category, el('p', 'c-news-list__title', news.title));
            item.appendChild(link);
            container.appendChild(item);
        });
    }

    function renderDetail(container, list) {
        const id = new URLSearchParams(location.search).get('id');
        const news = list.find(function (n) {
            return n.id === id;
        });

        if (!news) {
            container.appendChild(el('p', 'p-news-detail__message', '記事が見つかりませんでした。'));
            return;
        }

        document.title = news.title + ' | News';

        const article = el('article', 'p-news-detail__article');

        const header = el('div', 'p-news-detail__header');
        const title = el('h2', 'p-news-detail__title');
        const date = el('time', 'p-news-detail__date', formatDate(news.date));
        date.dateTime = news.date;
        title.append(date, news.title);
        header.append(el('p', 'p-news-detail__category', news.category), title);

        const body = el('div', 'p-news-detail__body');
        if (news.image) {
            const figure = el('div', 'p-news-detail__image');
            const img = el('img', 'p-news-detail__img');
            img.src = news.image;
            img.alt = news.imageAlt || '';
            figure.appendChild(img);
            body.appendChild(figure);
        } else {
            body.classList.add('p-news-detail__body--no-image');
        }

        const text = el('div', 'p-news-detail__text');
        (news.body || []).forEach(function (paragraph) {
            text.appendChild(el('p', '', paragraph));
        });
        (news.links || []).forEach(function (item) {
            const link = el('a', 'c-button', item.label);
            link.href = item.url;
            link.target = '_blank';
            link.rel = 'noopener';
            text.appendChild(link);
        });
        body.appendChild(text);

        article.append(header, body);
        container.appendChild(article);
    }

    const listContainer = document.getElementById('js-news-list');
    const detailContainer = document.getElementById('js-news-detail');
    if (!listContainer && !detailContainer) {
        return;
    }

    loadNews()
        .then(function (list) {
            if (listContainer) {
                renderList(listContainer, list);
            }
            if (detailContainer) {
                renderDetail(detailContainer, list);
            }
        })
        .catch(function (err) {
            console.error('ニュースの読み込みに失敗しました:', err);
        });
})();
