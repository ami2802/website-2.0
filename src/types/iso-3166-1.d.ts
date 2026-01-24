declare module 'iso-3166-1' {
  interface CountryInfo {
    alpha2: string;
    alpha3: string;
    numeric: string;
    country: string;
  }
  
  export function whereCountry(name: string): CountryInfo | undefined;
  export function whereAlpha2(code: string): CountryInfo | undefined;
  export function whereAlpha3(code: string): CountryInfo | undefined;
  export function whereNumeric(code: string): CountryInfo | undefined;
}
