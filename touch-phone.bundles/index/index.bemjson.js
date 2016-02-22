({
    block: 'page',
    title: 'Hello, World!',
    styles: [
        { elem: 'css', url: 'index.min.css' },
        '<!--[if IE]>',
            { elem: 'css', url: 'index.min.ie.css' },
        '<![endif]-->',
        '<!--[if IE 8]>',
            { elem: 'css', url: 'index.min.ie8.css' },
        '<![endif]-->',
        '<!--[if IE 9]>',
            { elem: 'css', url: 'index.min.ie9.css' },
        '<![endif]-->'
    ],
    scripts: [
        { elem: 'js', url: 'index.min.js' }
    ],
    content: [
        'Hello, World!'
    ]
});
