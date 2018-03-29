
/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
const Html = (body, props, title) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body style="margin:0">
      <div id="highlights">${body}</div>
      <script>console.log('test here in index')</script>
      <script src="/bundle.js" type="text/html"></script>
      <script>console.log('test AGAIN here in index')</script>
    </body>
  </html>
`;

export default Html;