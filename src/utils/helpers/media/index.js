export const breakpoints = {
  xs: 0, // Extra small screen / phone
  sm: 576, // Small screen / phone
  md: 768, // Medium screen / tablet
  lg: 992, // Large screen / desktop
  xl: 1200, // Extra large screen / wide desktop
  lgLandscape: 1024, // Landscape tablet,
  lgLaptop: 1440, // Medium Laptop
  hd: 1680 // HD screen / wide desktop
};

export const minWidth = Object.keys(breakpoints)
  .map(key => {
    return { key: key, val: breakpoints[key] };
  })
  .reduce((media, m) => {
    media[m.key] = `@media (min-width: ${m.val}px)`;
    return media;
  }, {});

export const maxWidth = Object.keys(breakpoints)
  .map(key => {
    return { key: key, val: breakpoints[key] };
  })
  .reduce((media, m) => {
    media[m.key] = `@media (max-width: ${m.val}px)`;
    return media;
  }, {});
