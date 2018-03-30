
/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
const html = (body, props) => `
  <div id="highlights">${body}</div>
  <script>window.__HIGHLIGHTS_INITIAL_STATE__ = ${props};</script>
`;

export default html;