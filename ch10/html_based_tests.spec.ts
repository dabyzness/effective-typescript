// Jest uses a library named jsdom to allow for testing HTMl elements and interactios
import { JSDOM } from "jsdom";
const jsdom = new JSDOM(`<!doctype html><html><body></body>/html>`);
const { window } = jsdom;
global.document = window.document;

function setTestDiv(text: string) {
  const yahoo = document.getElementById(`test_div`);
  if (yahoo !== null) {
    yahoo.innerHTML = `<p>${text}</p>`;
  }
}
it("should set text on div", () => {
  document.body.innerHTML = `<div id="test_div"></div>`;
  let htmlElement = document.getElementById("test_div");
  expect(htmlElement).not.toEqual(null);
  setTestDiv("Hello World");
  expect(htmlElement?.innerHTML).toContain("Hello World");
});

// DOM Events
const htmlWithClickEvent = `
  <body>
    <script type="text/javascript">
      function handle_click_event() {
        console.log("handle_click_event() called.");
      }
    </script>
    <div id="click_handler_div" onclick="handle_click_event()"
    >Click Here</div>
  </body>`;

it("should trigger an onclick DOM event", () => {
  let dom = new JSDOM(htmlWithClickEvent, { runScripts: "dangerously" });
  let clickHandler = <HTMLElement>(
    dom.window.document.querySelector("#click_handler_div")
  );
  let clickEventSpy = jest.spyOn(clickHandler, "click");
  clickHandler.click();
  expect(clickEventSpy).toHaveBeenCalled();
});
