import React from 'react';
export default ({ lang, charSet, stylesheets, title, children, scripts }) =>
<html lang={lang}>
    <head>
        <meta charSet={charSet} />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {stylesheets.map(
           (href, key) => <link href={href} key={key} rel="stylesheet" />
        )}
        <title>{title}</title>
    </head>
    <body>
        {children}
        {scripts.map(
            (src, key) => <script src={src} key={key}></script>
        )}
    </body>
</html>;
