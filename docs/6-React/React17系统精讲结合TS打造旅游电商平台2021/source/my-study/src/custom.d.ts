declare module "*.css" {
  interface ICss {
    [key: string]: string;
  }
  const css: ICss;
  export default css;
}
