
/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
const Html = (body, props) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Yelp Highlights</title>
    </head>
    <body>
      <div id="highlights">${body}</div>
      <script>window.initState = ${props};</script>
      <script src="/bundle.js" type="application/javascript"></script>
    </body>
  </html>
`;

export default Html;