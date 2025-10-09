export function sectionBg(
  bg: "dark" | "light" | "mask" | "ellipses" | "mask-not-inverted",
) {
  const classes = {
    dark: "bg-black text-white dark:bg-accent dark:text-black",
    light: "bg-white dark:bg-black",
    mask: "bg-white dark:bg-black",
    "mask-not-inverted": "bg-black text-white dark:bg-accent dark:text-black",
    ellipses: "bg-black text-white dark:bg-accent dark:text-black ",
  } as const;

  return classes[bg];
}
