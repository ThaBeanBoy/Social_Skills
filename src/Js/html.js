const strCompress = (markup, compress = true) => {
  // replace(/\s/g, '')
  return compress
    ? markup
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/\s+/g, ' ')
        .trim()
    : markup;
};

const html = (parameters) => {
  const { tag, attributes, markup, eventListeners } = parameters;
  const htmlTag = document.createElement(tag);

  // Setting the attributes
  for (const property in attributes) {
    htmlTag.setAttribute(property, attributes[property]);
  }

  for (const property in eventListeners) {
    htmlTag.addEventListener(`${property}`, eventListeners[property]);
  }

  htmlTag.innerHTML = strCompress(markup);

  return htmlTag;
};

export default html;
