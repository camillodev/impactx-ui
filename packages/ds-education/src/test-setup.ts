// jsdom does not implement ResizeObserver — polyfill for cmdk and other components that use it
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// jsdom does not implement scrollIntoView — polyfill for cmdk's keyboard navigation
if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function () {}
}
