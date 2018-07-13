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

export const flashMsgClose = () => {
  return {
    type: "FLASH_MSG_CLOSE",
    isOpen: false
  };
}

export const flashMsgOpen = (msgDesc) => {
  return {
    type: "FLASH_MSG_OPEN",
    isOpen: true,
    msgDesc
  };
}
