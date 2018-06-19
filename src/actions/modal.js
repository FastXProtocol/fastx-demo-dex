export const close = () => {
  return {
    type: "CLOSE",
    open: false
  };
}

export const open = () => {
  return {
    type: "OPEN",
    open: true
  };
}