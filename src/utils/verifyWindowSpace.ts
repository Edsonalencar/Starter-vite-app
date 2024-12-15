export function verifyWindowSpace(ref: any) {
  let dropUp = false;

  if (ref.current) {
    const parent = ref.current.offsetParent;

    if (parent) {
      const element = ref.current;
      const menuHeight = ref.current.scrollHeight;
      const spaceBelow =
        parent.offsetHeight - (element.offsetTop + element.offsetHeight);
      const spaceAbove = element.offsetTop;

      if (spaceBelow < menuHeight) {
        if (spaceAbove > spaceBelow) dropUp = true;
        else dropUp = false;
      } else dropUp = false;
    }
  }

  return dropUp;
}
