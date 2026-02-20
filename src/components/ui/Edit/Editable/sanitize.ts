const UNWRAP_TAGS = new Set(["DIV", "SPAN", "P"]);
const ALLOWED_TAGS = new Set(["B", "I", "U", "A", "BR"]);
const ALLOWED_A_ATTRS = new Set(["href", "target", "rel"]);

function unwrap(el: Element) {
  const parent = el.parentNode;
  if (!parent) return;
  while (el.firstChild) parent.insertBefore(el.firstChild, el);
  parent.removeChild(el);
}

function removeAllAttributes(el: Element) {
  for (let i = el.attributes.length - 1; i >= 0; i--) {
    el.removeAttribute(el.attributes[i].name);
  }
}

function sanitizeAnchor(a: HTMLAnchorElement) {
  for (let i = a.attributes.length - 1; i >= 0; i--) {
    const name = a.attributes[i].name.toLowerCase();
    if (!ALLOWED_A_ATTRS.has(name)) a.removeAttribute(a.attributes[i].name);
  }

  if (a.getAttribute("target") === "_blank") {
    const rel = a.getAttribute("rel") ?? "";
    if (!/\bnoopener\b/i.test(rel) || !/\bnoreferrer\b/i.test(rel)) {
      a.setAttribute("rel", "noopener noreferrer");
    }
  }
}

function removeHtmlComments(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
  const toRemove: Comment[] = [];
  let n = walker.nextNode();
  while (n) {
    toRemove.push(n as Comment);
    n = walker.nextNode();
  }
  for (const c of toRemove) c.parentNode?.removeChild(c);
}

export default function sanitizeRichHtml(root: HTMLElement) {
  removeHtmlComments(root);

  const all = Array.from(root.querySelectorAll("*"));

  for (const el of all) {
    const tag = el.tagName;

    if (UNWRAP_TAGS.has(tag)) {
      unwrap(el);
      continue;
    }

    if (!ALLOWED_TAGS.has(tag)) {
      unwrap(el);
      continue;
    }

    if (tag === "A") {
      sanitizeAnchor(el as HTMLAnchorElement);
    } else {
      removeAllAttributes(el);
    }
  }
}
