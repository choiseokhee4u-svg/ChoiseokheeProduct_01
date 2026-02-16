function setPageMetadata(page) {
    const metadata = {
        '': { // for index.html
            title: '용한점집 달의 신당 - 애기동자 신점으로 보는 운명',
            description: '애기동자 몸주신을 모시는 용한점집, 달의 신당. 신의 공수로 당신의 운명, 조상 문제, 살(煞)을 꿰뚫어 봅니다. 굿, 비방을 통해 운명을 개척하세요.'
        },
        'index': {
            title: '용한점집 달의 신당 - 애기동자 신점으로 보는 운명',
            description: '애기동자 몸주신을 모시는 용한점집, 달의 신당. 신의 공수로 당신의 운명, 조상 문제, 살(煞)을 꿰뚫어 봅니다. 굿, 비방을 통해 운명을 개척하세요.'
        },
        'about': {
            title: '서비스 소개 - 점술가 The Moon',
            description: '점술가 The Moon 서비스의 미션, 철학, 제공 서비스를 소개합니다.'
        },
        'blog': {
            title: '사주와 MBTI 블로그 - 점술가 The Moon',
            description: '사주와 MBTI를 통해 자신을 이해하고 미래를 준비하는 다양한 글들을 만나보세요.'
        },
        'contact': {
            title: '문의하기 - 점술가 The Moon',
            description: '점술가 The Moon 서비스에 대한 문의사항이나 의견을 남겨주세요.'
        }
    };

    const pageMeta = metadata[page];
    if (pageMeta) {
        document.title = pageMeta.title;
        const descriptionTag = document.querySelector('meta[name="description"]');
        if (descriptionTag) {
            descriptionTag.setAttribute('content', pageMeta.description);
        } else {
            const newDescriptionTag = document.createElement('meta');
            newDescriptionTag.setAttribute('name', 'description');
            newDescriptionTag.setAttribute('content', pageMeta.description);
            document.head.appendChild(newDescriptionTag);
        }
    }
}

function includeHeader() {
    const head = document.head;
    
    // Add placeholders for title and description
    const titleElement = document.createElement('title');
    const descriptionElement = document.createElement('meta');
    descriptionElement.setAttribute('name', 'description');
    head.appendChild(titleElement);
    head.appendChild(descriptionElement);

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
            if(pageName ==='ChoiseokheeProduct_01') pageName = 'index';
            setPageMetadata(pageName);
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
