export const close = () => {
  return {
    type: "CLOSE",
    open: false
  };
}

export const open = (desc) => {
  return {
    type: "OPEN",
    open: true,
    desc
  };
}