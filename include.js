function setPageMetadata(page, translations) {
    const metadata = {
        '': { // for index.html
            title_key: 'site_title',
            description_key: 'site_description'
        },
        'index': {
            title_key: 'site_title',
            description_key: 'site_description'
        },
        'about': {
            title_key: 'about_title',
            description_key: 'about_p1'
        },
        'blog': {
            title_key: 'blog_title',
            description_key: 'blog_article1_p'
        },
        'contact': {
            title_key: 'contact_title',
            description_key: 'contact_p1'
        },
        'zodiac': {
            title_key: 'zodiac_title',
            description_key: 'zodiac_description'
        },
        'privacy': {
            title_key: 'privacy_title',
            description_key: 'privacy_description'
        }
    };

    const pageMeta = metadata[page];
    if (pageMeta && translations) {
        document.title = translations[pageMeta.title_key] || pageMeta.title_key;
        const descriptionTag = document.querySelector('meta[name="description"]');
        if (descriptionTag) {
            descriptionTag.setAttribute('content', translations[pageMeta.description_key] || pageMeta.description_key);
        } else {
            const newDescriptionTag = document.createElement('meta');
            newDescriptionTag.setAttribute('name', 'description');
            newDescriptionTag.setAttribute('content', translations[pageMeta.description_key] || pageMeta.description_key);
            document.head.appendChild(newDescriptionTag);
        }
    }
}


async function includeHeader() {
    const head = document.head;

    // Add placeholders for title and description
    const titleElement = document.createElement('title');
    const descriptionElement = document.createElement('meta');
    descriptionElement.setAttribute('name', 'description');
    head.appendChild(titleElement);
    head.appendChild(descriptionElement);

    const lang = localStorage.getItem('lang') || 'ko';
    // Use global translations or empty object if not ready
    const translations = window.translations || {};

    fetch('_header.html')
        .then(response => response.text())
        .then(data => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            const fragment = document.createDocumentFragment();
            Array.from(tempDiv.children).forEach(child => {
                fragment.appendChild(child);
            });
            head.prepend(fragment);

            // Set metadata based on the current page
            let pageName = window.location.pathname.split('/').pop().replace('.html', '');
            if (pageName === 'ChoiseokheeProduct_01' || pageName === '') pageName = 'index'; // Handle root and index.html
            setPageMetadata(pageName, translations);
        });
}

function includeFooter() {
    document.addEventListener('DOMContentLoaded', () => {
        fetch('_footer.html')
            .then(response => response.text())
            .then(data => {
                const footerPlaceholder = document.querySelector('#footer-placeholder');
                if (footerPlaceholder) {
                    footerPlaceholder.innerHTML = data;
                }
            });
    });
}

includeHeader();
includeFooter();
