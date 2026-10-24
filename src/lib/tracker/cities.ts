/** Compact reference list used to label storm cells ("near Houston, TX"). name|region|lat|lon */
const RAW = `New York|NY|40.71|-74.01
Los Angeles|CA|34.05|-118.24
Chicago|IL|41.88|-87.63
Houston|TX|29.76|-95.37
Phoenix|AZ|33.45|-112.07
Philadelphia|PA|39.95|-75.17
San Antonio|TX|29.42|-98.49
San Diego|CA|32.72|-117.16
Dallas|TX|32.78|-96.8
Austin|TX|30.27|-97.74
Jacksonville|FL|30.33|-81.66
Fort Worth|TX|32.75|-97.33
Columbus|OH|39.96|-83
Charlotte|NC|35.23|-80.84
San Francisco|CA|37.77|-122.42
Indianapolis|IN|39.77|-86.16
Seattle|WA|47.61|-122.33
Denver|CO|39.74|-104.99
Washington|DC|38.91|-77.04
Boston|MA|42.36|-71.06
El Paso|TX|31.76|-106.49
Nashville|TN|36.16|-86.78
Detroit|MI|42.33|-83.05
Oklahoma City|OK|35.47|-97.52
Portland|OR|45.52|-122.68
Las Vegas|NV|36.17|-115.14
Memphis|TN|35.15|-90.05
Louisville|KY|38.25|-85.76
Baltimore|MD|39.29|-76.61
Milwaukee|WI|43.04|-87.91
Albuquerque|NM|35.08|-106.65
Tucson|AZ|32.22|-110.97
Fresno|CA|36.74|-119.79
Sacramento|CA|38.58|-121.49
Kansas City|MO|39.1|-94.58
Atlanta|GA|33.75|-84.39
Omaha|NE|41.26|-95.93
Raleigh|NC|35.78|-78.64
Miami|FL|25.76|-80.19
Tampa|FL|27.95|-82.46
Orlando|FL|28.54|-81.38
Cleveland|OH|41.5|-81.69
Minneapolis|MN|44.98|-93.27
New Orleans|LA|29.95|-90.07
Wichita|KS|37.69|-97.34
Tulsa|OK|36.15|-95.99
Little Rock|AR|34.75|-92.29
Birmingham|AL|33.52|-86.8
Jackson|MS|32.3|-90.18
Salt Lake City|UT|40.76|-111.89
Boise|ID|43.62|-116.2
Billings|MT|45.78|-108.5
Cheyenne|WY|41.14|-104.82
Des Moines|IA|41.59|-93.62
St. Louis|MO|38.63|-90.2
Pittsburgh|PA|40.44|-80
Cincinnati|OH|39.1|-84.51
Buffalo|NY|42.89|-78.88
Richmond|VA|37.54|-77.44
Charleston|SC|32.78|-79.93
Savannah|GA|32.08|-81.09
Mobile|AL|30.69|-88.04
Baton Rouge|LA|30.45|-91.15
Shreveport|LA|32.53|-93.75
Lubbock|TX|33.58|-101.86
Amarillo|TX|35.22|-101.83
Corpus Christi|TX|27.8|-97.4
McAllen|TX|26.2|-98.23
Fargo|ND|46.88|-96.79
Sioux Falls|SD|43.55|-96.73
Anchorage|AK|61.22|-149.9
Honolulu|HI|21.31|-157.86
Toronto|ON|43.65|-79.38
Montréal|QC|45.5|-73.57
Vancouver|BC|49.28|-123.12
Calgary|AB|51.05|-114.07
Winnipeg|MB|49.9|-97.14
Mexico City|MX|19.43|-99.13
Guadalajara|MX|20.67|-103.35
Monterrey|MX|25.69|-100.32
Mérida|MX|20.97|-89.62
Chihuahua|MX|28.63|-106.09
Culiacán|MX|24.8|-107.39
Havana|CU|23.11|-82.37
Kingston|JM|17.97|-76.79
Santo Domingo|DO|18.49|-69.93
San Juan|PR|18.47|-66.11
Guatemala City|GT|14.63|-90.51
San José|CR|9.93|-84.08
Panama City|PA|8.98|-79.52
Bogotá|CO|4.71|-74.07
Medellín|CO|6.24|-75.58
Caracas|VE|10.48|-66.9
Quito|EC|-0.18|-78.47
Guayaquil|EC|-2.17|-79.92
Lima|PE|-12.05|-77.04
La Paz|BO|-16.5|-68.15
Santa Cruz|BO|-17.78|-63.18
Manaus|BR|-3.12|-60.02
Belém|BR|-1.46|-48.5
Fortaleza|BR|-3.73|-38.52
Recife|BR|-8.05|-34.88
Salvador|BR|-12.97|-38.5
Brasília|BR|-15.78|-47.93
Belo Horizonte|BR|-19.92|-43.94
Rio de Janeiro|BR|-22.91|-43.17
São Paulo|BR|-23.55|-46.63
Curitiba|BR|-25.43|-49.27
Porto Alegre|BR|-30.03|-51.23
Cuiabá|BR|-15.6|-56.1
Goiânia|BR|-16.68|-49.25
Asunción|PY|-25.26|-57.58
Montevideo|UY|-34.9|-56.16
Buenos Aires|AR|-34.6|-58.38
Córdoba|AR|-31.42|-64.18
Rosario|AR|-32.95|-60.64
Mendoza|AR|-32.89|-68.83
Santiago|CL|-33.45|-70.67
Antofagasta|CL|-23.65|-70.4
Cusco|PE|-13.53|-71.97
Tegucigalpa|HN|14.07|-87.19
Managua|NI|12.13|-86.25
San Salvador|SV|13.69|-89.19`;

export type City = { name: string; region: string; lat: number; lon: number };

export const CITIES: City[] = RAW.split("\n").map((line) => {
  const [name, region, lat, lon] = line.split("|");
  return { name, region, lat: +lat, lon: +lon };
});
