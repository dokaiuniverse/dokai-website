export function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function getClosestLinkInSelection(
  editor: HTMLElement,
): HTMLAnchorElement | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;

  const node = sel.anchorNode;
  if (!node) return null;

  let el: HTMLElement | null =
    node.nodeType === Node.ELEMENT_NODE
      ? (node as HTMLElement)
      : node.parentElement;

  while (el && el !== editor) {
    if (el.tagName === "A") return el as HTMLAnchorElement;
    el = el.parentElement;
  }
  return null;
}
