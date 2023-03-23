class DomHelper {
  static createNode(tag, classNames = [], attributes = {}, textContent = '') {
    const node = document.createElement(tag);

    if (classNames.length) {
      node.classList.add(...classNames);
    }

    if (attributes.length) {
      Object.keys(attributes).forEach((key) => this.node.setAttribute(key, attributes[key]));
    }

    if (textContent) {
      node.textContent = textContent;
    }

    return node;
  }

  // static insertChilds(element: HTMLElement, childs: HTMLElement[]): void {
  //   childs.forEach((item) => element.appendChild(item));
  // }
}
