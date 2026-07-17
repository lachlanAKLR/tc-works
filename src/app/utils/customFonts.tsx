import localFont from "next/font/local";

const monumentBold = localFont({
  src: "../fonts/ABCMonumentGrotesk-Bold-Trial.woff",
  variable: "--font-monument-bold",
  weight: "400",
  style: "normal",
});

const garnierReg = localFont({
  src: "../fonts/PoWGarnierDemo-Regular.woff",
  variable: "--font-garnier-reg",
  weight: "400",
  style: "normal",
});

const garnierIta = localFont({
  src: "../fonts/PoWGarnierDemo-Italic.woff",
  variable: "--font-garnier-italic",
  weight: "400",
  style: "normal",
});

const primeReg = localFont({
  src: "../fonts/CourierPrime-Regular.ttf",
  variable: "--font-prime-reg",
  weight: "400",
  style: "normal",
});

const primeIta = localFont({
  src: "../fonts/CourierPrime-Italic.ttf",
  variable: "--font-prime-italic",
  weight: "400",
  style: "normal",
});

export { garnierReg, garnierIta, primeReg, primeIta, monumentBold };
