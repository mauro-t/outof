export default function consolelog() {
  console.log("HELLO");
  return () => {
    console.log("CLEANUP");
  };
}
