'use strict';

(function () {
  // Wait for required libraries
  if (typeof showdown === 'undefined') {
    console.warn('Showdown library not loaded, markdown rendering disabled');
    return;
  }

  if (typeof DOMPurify === 'undefined') {
    console.warn('DOMPurify library not loaded, markdown rendering disabled for security');
    return;
  }

  const converter = new showdown.Converter({ tables: true });

  /**
   * Returns the <a> element in #list tbody matching the given filename,
   * or null if not found.
   */
  function findListingLink(name) {
    const links = document.querySelectorAll('#list tbody tr td a');
    return Array.from(links).find((link) => link.textContent.trim() === name) ?? null;
  }

  /** Removes an element from the DOM if it exists. */
  function removeElement(element) {
    element?.remove();
  }

  /**
   * Fetches `source`, converts it from Markdown to sanitized HTML,
   * and injects the result into the element with id `targetId`.
   * If the source file is not listed in the directory or the fetch fails,
   * the target element is removed instead.
   */
  function renderMarkdown(targetId, source) {
    const target = document.getElementById(targetId);

    if (!target || !findListingLink(source)) {
      removeElement(target);
      return;
    }

    target.innerHTML = '<p class="markdown-loading">Loading…</p>';

    fetch(source)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((text) => {
        const normalized = text.replace(/\n[ ]*/g, '\n');
        const html = converter.makeHtml(normalized);

        const clean = DOMPurify.sanitize(html, {
          ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'strong', 'em', 'u',
            'code', 'pre',
            'a', 'ul', 'ol', 'li',
            'table', 'thead', 'tbody', 'tr', 'th', 'td',
            'blockquote', 'hr', 'img',
          ],
          ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id', 'width', 'height', 'loading'],
        });

        target.innerHTML = clean;
      })
      .catch(() => {
        removeElement(target);
      });
  }

  renderMarkdown('raw_include_HEADER_md', 'HEADER.md');
  renderMarkdown('raw_include_README_md', 'README.md');
}());
