import { _ as __nuxt_component_0 } from './nuxt-link-f57cd0d9.mjs';
import { _ as __nuxt_component_1 } from './client-only-7e9de0b5.mjs';
import { f as useRouter, u as useRuntimeConfig } from '../server.mjs';
import { defineComponent, ref, reactive, resolveComponent, resolveDirective, unref, withCtx, createTextVNode, mergeProps, createVNode, withKeys, useSSRContext } from 'vue';
import { u as useHead } from './composables-583e67d3.mjs';
import { u as useCookie } from './cookie-73492d56.mjs';
import { u as useCounter, b as get_message, c as c_message } from './counter-d2eb9e2d.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { ElMessage } from 'element-plus';
import hljs from 'highlight.js';
import markdownIt from 'markdown-it';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'h3';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'unstorage/drivers/overlay';
import 'unstorage/drivers/memory';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'unified';
import 'mdast-util-to-string';
import 'micromark/lib/preprocess.js';
import 'micromark/lib/postprocess.js';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'remark-emoji';
import 'rehype-slug';
import 'remark-squeeze-paragraphs';
import 'rehype-external-links';
import 'remark-gfm';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'remark-mdc';
import 'remark-parse';
import 'remark-rehype';
import 'mdast-util-to-hast';
import 'detab';
import 'unist-builder';
import 'mdurl';
import 'slugify';
import 'unist-util-position';
import 'unist-util-visit';
import 'shiki-es';
import 'unenv/runtime/npm/consola';
import 'cookie-es';
import './asyncData-b7b62de5.mjs';

const _imports_0 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwQDAwQEBAQFBQQFBwsHBwYGBw4KCggLEA4RERAOEA8SFBoWEhMYEw8QFh8XGBsbHR0dERYgIh8cIhocHRz/2wBDAQUFBQcGBw0HBw0cEhASHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wgARCAAtAC0DAREAAhEBAxEB/8QAHAAAAQUBAQEAAAAAAAAAAAAABwACBQYIAQME/8QAGwEAAgIDAQAAAAAAAAAAAAAAAAMEBgIFBwH/2gAMAwEAAhADEAAAANiuU0BROwmle3+NkgQCKesRzSAbjtevOcHApUjGawk1VvhCip9A4FflpBkWXKGBxYr71Z1PYxQx0KqyPC70yyatvQtFofnVroe71wpvNaQIPNTdLcwuP//EADIQAAIBAwIEBAMHBQAAAAAAAAECAwQFEQAGBxIhMRMUQXEIImEQIFFSgYKhNUJysbP/2gAIAQEAAT8AJOdF8BiTgDqSdbh+IjZ+2r/U2ap8/NLTPySTwQo0Qb3Lgn9Bqy8bNkX+soqGgvfi1tZIIYoDBIrFz7jWToE6PfXxJVNVS8L6sUzlUmqYYpinrGSf4JA1P8Ke6Z7Jaay01tDU19TSpPVW6WQRTQFhkAeml4abl4Sbq2ZeLrHRyx1NyRF8tMJgjq6gqxA7kH7Bo99cUqKOr2ZcXqYPNW+kQVVTTZ5TJHE6yHBx3wh6dPfScQ6e5TUd5slFd7nRzxq7CleMQeGBLysOZl+dmHL+wA49d7Xuz399r7VaGse8zXcV8MVc4WaHwTK7liAQAuDGO4I1CHWFBI/NIAAzcuMn1ONDR76uu69v0ompK6tgfIKSwoDKQD0Ksqg49jrbvBGqr7lXvsze9z25QzqJ4oJS6NJH6sGRxkD6jIB1w22lYeHO4ay6Xm71dyu9UHSC4SQkxyJzAM4ALNzH8zatt4oLvG0lBWRVAXHN4bglM+hHdf10NcQrrPa9uv5Z2SaplWASIcFAQSSD+OARn00iBAAgwB2A0l+khtEFAkJaeB+jPkJ4QPRcj8QShH5c574N2uovNaJ0R1hjQIiyLg5PVjj3wP25HTVquctkuMFwhLBoSC4H98efmQ/Qj+euhrit/RLf9a1f+cn3KrpTTf4n/WlAxr//xAAtEQACAQIEAwUJAAAAAAAAAAACAwQAAQUGERIQICIHEyFRgTEzNEFSYXGiwf/aAAgBAgEBPwDguA5g7qOE5Y7iHkw6w9/Q4qvcQlVpK5C2CPlyRb7WD50KCHoLS1IAhsTflppyIhyXdS13qHmeFONqbdRqLaXp/KiY0rG2tiQPG6tN2n3piWJLa0dOGExxfJES9lWtpUns0mNzJLlx2d0lgle17fUdr209C6q7Mcovy/EcUwdGmX6j4WrEIoyEEBcMv/F+l+Rvuy/HD//EACgRAAIBAgQGAQUAAAAAAAAAAAIDAQASBBAgMgUGESExQTMTYXGRof/aAAgBAwEBPwDKTGrx0Htr6JVYQ6JpwCu20ruseqYuBASu7z60Mete4qZgWpESLwVYhBYMRY/td4oDEtuWMaSUkQ1M0nmVC+HqWwbjiYjp9o9/quZuKhj2gKdox/ZrBOJLRy4n8GhXyD+cv//Z";
const _imports_1 = "data:image/jpeg;base64,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";
const _imports_2 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwQDAwQEBAQFBQQFBwsHBwYGBw4KCggLEA4RERAOEA8SFBoWEhMYEw8QFh8XGBsbHR0dERYgIh8cIhocHRz/2wBDAQUFBQcGBw0HBw0cEhASHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wgARCAAtAC0DAREAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAABgcBCAADBQT/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBQQG/9oADAMBAAIQAxAAAAC4u2XlEoqVrMowwqwqMpIanTaWIQV9RYDO+wAtKnhAFVnpxJjUJa175Ah1dPl6XT18ro1x2EFDVXJ899wk+jw7GdDiu8//xAA2EAABAwMCBgACBQ0AAAAAAAABAgMEAAUGERIHCBMhIjEUcRUWQYGzIyQ2N1FTcnWRoaKjsv/aAAgBAQABPwAk61OuEa1w5E2bJajRGEFbjzqwlCEjuSVHsBV15tcAt0wsMC73FH7+JGAR/sUk/wBqw3jzgubvsxIF4+HuD3ZESagsrJ/YCfAq+RJrU0CaPuubzJbg+7jeGW7qqM4mS8w17fUVhDSP6hVY7yU5zdGmHrrcrRaUOgFbRWt55v7kjZ/nXHPlug8PeD9tmWJb82XZpZfuEpY83UPBCSoAegkoR2rgfkMzKuFONXSe6XZa2VsrcX3UstuLb3E/aSEUKPusltRuHN7gHVZ6sZFtL/8AAWxJV/1tr4m5tfWZf0bcIi2HPzN1yV8QmZoneChAJ6aSfDTQVBtq707lEC8WiU1bHyqKEypnXanNKT5LSncemk7inboK4O2JOL4BAsyCVIgyZjAUfZAlPAE0KPun75ZMNv8AGyW/9KOv8tbnZskLHRbcdBa2Hbs2aIGuite/fuK4s8V8SwXHrVcb2xNulsuT2yMu1gOJJ2HUlW9KdpSSPfkKuWVxLfbG5QQ4uVIZDzELYrrL1Go1QAVJA17nTtWNxlQ2lMJ39BLTZWVhYSZBKy6pO9IVofFXrbqo6UKPuuaa3sXLDrai4X6NabYzKL6wtouvyFhBCUNIBGvZSq4ExcCu2CQ27kWIUGP4xlXVbaHJSkuOFT3kNo7+kAkopzjfiGC5e5i81gxIT5Lse7NIBZeQpawCoaBQA9BehB9jxpl1t9pDrS0uNOAKStBBBBGoII9g0KI71zV3qbP4ryoD7pMS2sMtR2vsRuQFqPzJVXAL9Vlk+b/4y65nP0/h/wAub/EcrlUvU288J2UTXS6IE1yGyT7DQSlYH3FZpIGlf//EACIRAAIBAwIHAAAAAAAAAAAAAAECAAMSIDIzBAUQETBBgf/aAAgBAgEBPwDwXxTgdORiidouFULUbUQRKJW21fWPH77Tlez96//EACcRAAECAwUJAAAAAAAAAAAAAAEAAgMRIAQQEhM0BQYhMlFygbHR/9oACAEDAQE/ALp0lYERQ3mqaiVOgqzRIlnh4ssEO6iatAiZmKK2U+NBWxtE3z7W8Gpb2/b/AP/Z";
const _imports_3 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwQDAwQEBAQFBQQFBwsHBwYGBw4KCggLEA4RERAOEA8SFBoWEhMYEw8QFh8XGBsbHR0dERYgIh8cIhocHRz/2wBDAQUFBQcGBw0HBw0cEhASHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wgARCAAtAC0DAREAAhEBAxEB/8QAHAAAAgEFAQAAAAAAAAAAAAAABQYHAAECAwQI/8QAHAEAAQUBAQEAAAAAAAAAAAAAAAIDBAUGCAcB/9oADAMBAAIQAxAAAAD2K81iEB2bTiwqTYa6CggOzahqf8FrT7pzkjtSWBHkpbRxYWN8NOwLBqDhdORSTrCsgE1khL5526D0NhD/AJrfM1dLkP27JLeNtAPPu3DaCuM5+x5LGPJvUfnn/8QAMRAAAgEDAwIEBAQHAAAAAAAAAQIDBAURAAYSITEHEyJBCBQyYRAzUXEjNXN0grLD/9oACAEBAAE/ACTnROBknAHc63T8U9ntF0morPZ5btFC5U1JnEKP909LEjXhp422PxInegiiloLsqFxSzkMJF9yjDv8AtgHWToE6PfXxWVNbBs60pDK60U1bxnCHAchSV1a/h23/AHuwW29Wy2QVUFfCJ0hFWiSohJwSHK9+4wTqbYO/PDa9WW41NslttY9WsdHMZUZTLn6SVJ1a3rnt1K9zjghuBjBnjp3Lxh8dcMQDjQ0e+vFLaUe9dtG1TnhTGVJnnADNFwYHOCwwCOQJ64/T3FHFItXEtolSClVPlsxwZccVcZznJTrAAOPox3663jt+n3DbbXRyyp81b7tBcEWGnGJWVnZAF8zB/hkKW5+rv01CXMSGVVEhA5AHIB98HQ0e+pxE0Eon4+SUIfn9PHHXOfbW1d00u5Jq+0rSQ3hLYV4zuULSg5HIBujYI4lwep9vc0O7aPc95q4TLBFLbZWhipUcENjI81W6cgQCAQBgZ/XJ0NbguMluoGeHj8zM4hiyMgMepbH2ALf46NFDLJ5s6fMT9zLN63z+57fsOg1frnWbCuT1VF5pFXFUiNklEZAaKQuCxOPR9YHc4AGWGtq2ZPkmqqiJWFWq8InToiDJGQfc5z9ug1RVbWOZJoGKUYI8+Afl8CcFgvYEfV079tDW7/ybd/df8pPw3Nt2DcdEtJPPPAiOW5QcMnkjRkepWHVXb2z+Fz/llX/Qf/U6UDGv/8QAMBEAAAQDBgMGBwAAAAAAAAAAAQIDBAAFEQYQEiExQRMicSA1QpGh8AdhcoGxsvH/2gAIAQIBAT8AuTlZjFxGNSHDJRHm1DsSsC8Q3SDzBuUxiGNHHRWKYuKsGw4uXS9qtwVMUcQlOfP5e/v1hNbCJt8ve387Kzc6ZCqaAaFWx25SibxBW+dTEJYxVdm8IeugesP5/MnyhjLrGz2rQPLSLA2qQncnKyd04rfCHUoaD5BQY+JVrxm00BFkaibeoAIbj4hiyFrHiT0jR0cTpnGmeYgI6Z9brfdyK9S/sF1np84kbk7psUomwiXmrTUB2EB2uk/eCH1l/IXf/8QAKxEAAQIEAwUJAAAAAAAAAAAAAgEDAAQFEhARIBMhMkGBBhQxMzRRcZHB/9oACAEDAQE/AMFcgTu0ORsii0h0Kl0PSrrS2luWFljFsXSHIV0g8LhEPNIF4XLhHljKS+3dFv3hmTYaG0RSKtSXJScJ9jhPP7js5Se5y1z3Ee9fyKlTWiaJxsciTCi+rHrhNywTTQgfhny64THkn8Lh/9k=";
const _imports_4 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwQDAwQEBAQFBQQFBwsHBwYGBw4KCggLEA4RERAOEA8SFBoWEhMYEw8QFh8XGBsbHR0dERYgIh8cIhocHRz/2wBDAQUFBQcGBw0HBw0cEhASHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wgARCAAtAC0DAREAAhEBAxEB/8QAHQAAAQQDAQEAAAAAAAAAAAAABwACBQgBBAYDCf/EABkBAAMBAQEAAAAAAAAAAAAAAAACBAMBBf/aAAwDAQACEAMQAAAAuLtkg5jRRLQtgY9ECAQ0rSn1c+nz79DPF1cGAB9eZVlqFlKGuVPQMBBNx5bpvL0uSuDX6BL0VJEbwunHgRJSB1WObolvXYw7C2pZvw9f/8QAMBAAAQQCAQMCBAMJAAAAAAAAAQIDBAUGEQAHEiEiMQgTFDJBgYIQIyRCUVJiosP/2gAIAQEAAT8AJO+bPHupGHxZ5gPZVSNTAe0srnNhQV/aQVeDx34sKBjOHqF2qkpqmpJim0Dw9we0rLevs/VzZ4CeH358SmSysZ6VWKoLy2ZM91uEHUHSglRJV/qkjlP06ya/x169rqmXKr25KYiCw0txb7pH2ISkEq0PJPsORenM/AM/wWJmtQAxbLYfXDcJBQ2p5SO1ej7jXeU/0IB/YOH358VUJ6Z0ofWholESUy+s/q7P+nOlNIMNxPG6yElCoTUJhh8N/NWtMkpUt5ZSD2gFXb5A9ydnnxIY4ieenktbzbtzFyRuGflFxzTTyypP3EnwGk8ZKlsoU4jsUQCpHdvR/EbHBw+/Mwx5rLcVuKR4gInxnGAo/wAiinwr8jo8qoMPJqViqs6lNoK8NEyIjqEkufiFHuT6vHnRIV78v4LWV3VSlbUaIijnh/6FBQXNobcQhS9e2iU6A8Afid+ODkkvEtsxxuRIcDbexvROyVa350AVa357eXdTnPUjEsnErB36oQm0v1br7qzPefStOwQSAQUd/pCAnlL1NfoMYYm5FXPN371abKXTtI1LQGtNKWlsgDtIQFduwU8ypm/zm56bmPXRhR2Uxm8nh51AW2AhJSz2q9R9HvoepXLzL2unE+JByd5hixspy/pWKtl1UX6MrCUFRV4QtPknt/MeQQOZTQTsiRWQq+8l0skzB/GRQC4P3Lp0N8wnozc4baX1ic/tbGTaxFspMlrYadP2vEFZCinmS5LkOMdT58qTZosbjHsOUtqctgN/NWoghakAkbBd5WWdVKyjpJllxRtWWU5YQH5xfW2hpbXhDiWk+nu5mcbJujuUWzVTlsuZXWZcceiTWu9JStRBBJV93+Q1xIGuf//EACcRAAEDAgUDBQEAAAAAAAAAAAIAAQMREgQQEyFRICNBFCIxUnGR/9oACAECAQE/AMtGT6r0Rad3RhAukTzCJWEtYZIy0ujBP3FKeoRE6wpUu4p0AdpXI2sK66iHtj+5sgOKGQe5XnhFhb5LYy2rSvhRuEIyctsgi1hui+GbzzlETDc7tXbysRjQNgDTZt0EQFCQU2uUxlGBwi/tZBGE8IkTfzL/xAAkEQABAwQBAwUAAAAAAAAAAAACAAEDERIgIhAEEyExMkFRsf/aAAgBAwEBPwDiqvwNUVtuBo4JIbQIaKWCQYxlIfD4Oum66eEu6JeaU+/1ERFr8NhQiH2pjT7Wp9eQZXPcg22dXOPpx//Z";
const _imports_5 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwQDAwQEBAQFBQQFBwsHBwYGBw4KCggLEA4RERAOEA8SFBoWEhMYEw8QFh8XGBsbHR0dERYgIh8cIhocHRz/2wBDAQUFBQcGBw0HBw0cEhASHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wgARCAAtAC0DAREAAhEBAxEB/8QAGwAAAQQDAAAAAAAAAAAAAAAABgADBwgBBAX/xAAbAQADAAMBAQAAAAAAAAAAAAAAAgMEBQcGAf/aAAwDAQACEAMQAAAAuLaSCFstTGIcSZAghLLnHlWj66Xr1FXwwAhUOIZIlVSBIOhgNBm0H+8pgugjwCr7OvS9tBNvzfrYnqjzFWzCcfjpvUQovYECBtsO2i8D/8QAMRAAAQMDAgQDBQkAAAAAAAAAAQIDBAAFEQYSBxMhMQhBYRQiMlFxFSAlUoGxsrPB/9oACAEBAAE/ACTmsmtTeKLQ2mbzJtf4pPdjOFp12EyhTYWO4ytaa0Bxb0txJQ6LHcSZbQ3OQ3xy3kJ+h7j1BIrJoE0e9eKW7XG0cLibfJdjmROZYeW0SlWwhZ/cJoeC26X3Stiu9ov7DFzmwmXpUK4oIShxSAThxAP8a1DwR1/wRutgvTk63svvz0RYsqG8tYQ8ckBQKQdpFRef7Mz7Vy/adg5nKzs3467c9cZ7ZoUe9cRdKwdZadXa7qHfssuIefVHCC4jYtKgfeIG3AIPnjtQnsou4nR3ghl0iO4wptptWEBRUsKVgkdWwRnoE9BWtNO2bUVmtlsluvyHIV3aujC4rDSA6sb1tjyTtCDtJ7kCmeZyUc3bzcDfs7Zx1xnyoUe9XC6223DZPmxI4UPhkOpRkduxNaB4iQ9VT7tYrPKh3MWjYMSXFNObTnt7qt6UnCd2Aat/FOwanvlzaevcMSbXIXFS2F7WAPzoWejhPbd6dAB1UxIalModZdbdaV1StshST9CKFa/v72ndNSH4p2y3lJYaXjOxRySrr5gAketLWp1xbri1uOrOVLUSpSyfMk9SauVqu9ivsi62B99pcxl9DhaJCgFIUFJ+ivL1rR+njYreounMp/CnB5Jx2T+ma0pqKRpi8sSGXSiMtxIktD4XEE4Jx8wOoP8AmaFcZOmm4PrOT/W59x0kNuH5A0kDFf/EACURAAECBQQBBQAAAAAAAAAAAAIAAwEEEBIiESAxMhMVIUFCYf/aAAgBAgEBPwCgSjhDcnGHG+2ySgJOZL1ARIhIUEy28JDsZO0seVyNqaIhK782DAvqnmCbEXC9tUUuTYjjzUFGNylplsm/E78aKcmPMePEEEbsaD1LYHYaf//EAC8RAAECAgYIBgMAAAAAAAAAAAIBAwAEBhAREiBhBRMVITEyQXEUIiM0NbFRcqH/2gAIAQMBAT8AqvwK4DjUwoEOF5kmiG91g2CFoXC4LgBsnOUbYUSbImyHekC2bgkQiqolehpDaE6EsXBePZIl5VqVb1bIoKRSOi7/AIspmU3od5VyWy3+9M4oxoTZkt6nOdirllFJdDsTcqb13ziltvb81UO+UHsv1gn/AGjv6r9Vf//Z";
const _imports_6 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwQDAwQEBAQFBQQFBwsHBwYGBw4KCggLEA4RERAOEA8SFBoWEhMYEw8QFh8XGBsbHR0dERYgIh8cIhocHRz/2wBDAQUFBQcGBw0HBw0cEhASHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wgARCAAtAC0DAREAAhEBAxEB/8QAHAAAAQQDAQAAAAAAAAAAAAAABwECBAYDBQgA/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAMCBAUGAf/aAAwDAQACEAMQAAAA7FcpoV6pp0m3nFci4PBRcnpI9HXDe/xNnajoAkgC7A7Ij63L5AEz65glFAF+N1Bx0ue1AU5qbRLxAGeN1VHu4059M6NU8EDRx9lotzW1cDIzA//EADEQAAICAQIDBQcDBQAAAAAAAAECAwQFABEGEjEHFCFBUQgTIkJScXIVYWIkMjOSs//aAAgBAQABPwAk76aRYkaSR1VVBLMTsAB1JOrHGVZCe7VblxB0eAIFP252Xf79NUPaN4GtZ2XC3bdvE30lMBGQh5EEgOxBcEqNBwQCDuD4gjQJ0eus9kTlcnNVU/0NJwpTyllABJPqF3AA+rf0GqNa1lp3rYyu1mZTsxXwiiP836L9vFtugOu2T2SM/avW+IuFrqZOayPfW6Mu0cpl+YxeRB9Dr2UOLbub4Iv4XISu8+BsiFOfqkTDdUP2IfQ0eusLAc/3GCGfk/VbLNLNGf8AGHZpJApHRh8Sj0Oqsj4nPW8NVp5CljIasfursnJ3TmbmAWNfqUrzHcfMd9YHKZDK5ydJqmUrxilDOtsle6SM++6IOvMvL4/l+OuybAHE9o3a1aSMJUuZOBkCdOcxtM//AHGho9dUMhj+FLkV+ykNXDUL1jvCxgIkURaVNwB4AKXDHb08NVUq2q8dmpOs8Use8UwlMilSPBgdyCD66kixHBXDCPkr7RY3G1lSSzZmI3VQF3boCx28h8R1w7PDPkLc9WeCX9RkmtWooJUlEDlkESsyj4X938JXdv7PDQ0euuIKEKXMjirkbNUv87L6PHJvz7n82I/bmT117O3ZpxVhctxVi72VyEOBgKdzeC86qTzH5FYdV1xl2b35+2rFXOJcrck4Mx0Mc9Zblp5UnsA+YJIVQxBJPoB82lRRzFAo3O528z66GiPHWfrR3y9Kcc9fuskhX1fmRAT+POWH8gD5a4Y4YqRZu9PBYvQyYy20YRJhySoyh1RgQSVUSAbFj4qDrjYCeSCqoCSx1LNxZvMFFHKv+7Rv94hqlAlS3kqUI5a1WYCFPoUxo/KP2Bc7eg2GlA21/8QAIxEAAQMDBAIDAAAAAAAAAAAAAgADEgEEEBETFCAicQUzQf/aAAgBAgEBPwDB3zQlGSCokMh6fIXBfUKYtnHvSai2Ij003rkpLSMUNCIZSTdZCJZCo8shL9VAEVt0JDm8YcF3cH2p8hsSEtEyMR8i16VQsA35Dgcf/8QAKBEAAgAEBAUFAQAAAAAAAAAAAgMAAQQSBRARMRQgIUGRExUyUYHx/9oACAEDAQE/AMk4RUsG63zDAJZEJby5MEoRIeJZ+RV4gql+XWf1DzJzCYXeBzmfC4eNu+n9jX1Lrhg5isrbYaFrCHNoF7YBD26xNs5jbEnTGJ54XVqYgadm+3mJhwTyW4LpQ4xYdwjpLkGGVjXL0ZPXTz55P//Z";
const _imports_7 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwQDAwQEBAQFBQQFBwsHBwYGBw4KCggLEA4RERAOEA8SFBoWEhMYEw8QFh8XGBsbHR0dERYgIh8cIhocHRz/2wBDAQUFBQcGBw0HBw0cEhASHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wgARCAAtAC0DAREAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAABwgFBgECBAP/xAAaAQACAwEBAAAAAAAAAAAAAAAAAgEEBQMG/9oADAMBAAIQAxAAAABxe3KORhVlXu1WINytMXq3Ksrx5faFfqsONgYzC1TZvZfgCd0rDbWuNaAcPzYEbAUFZMiNoAwdba0YBWxd+NuHlCp14GYnAD0m7UtGOmOe5nWYP//EAC8QAAIBAwIFAgUDBQAAAAAAAAECAwQFEQAGBxITITEIQRRRYXGSFiKhI1JicpH/2gAIAQEAAT8AJOdXm90lhoWq6yXpx5CIuRl3PhRk4z9+3ue2txcebdYawU1TX2+jmft0JUeRoz/nhlYfhj5E62nxoo9zTmlpbjYK+qJ/ZFBUyQOQB7I6Etq2bgStm+FmhkpaoglVLBkkx55WHnHyIB+mgTq4Vi26iq6uQMyU8Tyso8kKCSBrjzv2q2bt6GdJQ25LmXhpph4o0wDIYx+C58nOTr018EZ+Ke5Dfrx1Rtu2TBpX962YYIjB/lteoPgzVcHd2R1lrMv6cr5DJQTgnNPIDkxE/NfI1wO3PWcQdtWG6VILVNud0rJyMK8qqyAD5sQwc6GqumirKeammHNDMjI69xlSMEZH016jNr3W/cUNn7SpJvi6msgVaYumCDJKykv+GSQBrZFttew56PYdrlqUittsWow9JiBwX5S5m95WkyxXPg639aIeMG27ttGZpxcp7RDc6YNSEU8Ux7xlZiPPMCCP7Dr0iJNBw7vVJUoYp6W9TI8bjBQiKEEaGj51W7Yom4m23ftS8mduxmjkjHLyxwyI+ahsnIUGUjIHhHOquD4ymaNJ5IebBWWLlLDBByMgj/o1CsVrt6rLPiCli/fNKVXCqO7EgADsM9gBrbdsgtF1ulVSQ9Gm3LWVF36TgBgf6SBxhs4kADkEAhidDR869ZdS8Fs2pEjkGaWp5/8AUBNelC7cQ76bjbJL1dILDSUqPSvPEJI1PPgIpdW16sLxv+13eGzT3a6Tbalo0ZyiCOGVy7EglFXIGF869L9WKzhDanKDrwyzQPJ7viRiM/YMBoaI764mbJs27ZbVW3Sm672OCsuMMb90kKx5COvuCwQ64VW6noNtP0E5eeokQ/ZCY1/hAfuTrjRSQS2CinkhSSSOd1HOoYFei74IPYgtEhIOtmbWtezaa62azwfD2+nrpGjjznl51WQj7AvgfTSgY1//xAApEQAABQEGBQUAAAAAAAAAAAAAAQIDBBIFECAiMTMRMkFRgROhsdHw/9oACAECAQE/AA44llNStAmfJezMM5f3j3DlqvR01PsqEK0WJm3r2uWdKahEcctaTU7tp6fAM6RzJzCFZao81x1PJ08/VxlUIUFuHV6fW4sB3pwPcVbeoZqpza4DEXaJXcSMpEou9/8A/8QAJBEAAQQCAQMFAQAAAAAAAAAAAgABAwQQEiIRITIFEyMxQYH/2gAIAQMBAT8AQAUhainqwx8ZZO6CjHMXxSMrFSSv5YFti1VgB9Ph4+b/AKhbZPxVi8M1YRLyzatSWNdvzDocjl8uq+gl84v0Vj2yLaAXYUOYxYi7r1LjZKNvpujMqIsRlG/04l1/nfP/2Q==";
const _imports_8 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwQDAwQEBAQFBQQFBwsHBwYGBw4KCggLEA4RERAOEA8SFBoWEhMYEw8QFh8XGBsbHR0dERYgIh8cIhocHRz/2wBDAQUFBQcGBw0HBw0cEhASHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/wgARCAAtAC0DAREAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAQYCBwAEBQMI/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAMCBAUBBv/aAAwDAQACEAMQAAAA+xXKW1MGfb9XpYL1bAwEjx/oYef1ehrUdr1OCw6NUAm4Op2dah2uijWc3aFQAmJc5rfOMlC5ntp0Brgu1rgdWapwkACqgsVcqx7y0Z83g//EADEQAAEDAwMDAwEGBwAAAAAAAAECAwQABREGEiEiMUEHExRREBUkMkJiI1JhcXKBov/aAAgBAQABPwAk5rV2sI+lIaFrAenPAmPGWtSPdwpAVhQBAI3jjHNL1glavwlsnPteHiENJP8Apagv/mmNYQ/dDUxt+ApX5FSAnYfH50qKU8n9RGayaBNHvU4i6Xt593luC4WIyfAO0b1/1JPTz/Lx3NGbHEhTHup91IBUn6Z7ZP1P0qXZZrVr+bJY2xFqDS2XR17VcBRSewyQnaRnnPGK0o+v4b0Fa1KMJz2kKWcktFIKc/2zsz52ZoUe9M20zdbv2svraivfjnthCVBoI2qwSOAXNvI56jzVhmMWyNqZcCBPhptzuGHpSGi1OG3fuZcA3LCh0EqJOf3Zq13D75uOpLTPYujDKXDGbM8NoRKSUElbG0ZUgA7cn6VoFciVbZc6WGw+7IcY6O2GVqbOR9dyV0KPemZ1qY1bvukvY/PjSIToztEVtDwLRxjgEdRJJznOAgGrl6eW+6WmLbvn3eGzHUtaV2+cuMslQIOSgjIrUES1WdTF7nPOhyGgIbSVgqdUASlOTyT3ySceTxmtEuKXHdLc4SojraHwENBIaeWpZdRuwCerrwoZG/zQo96mSY8KK6/KcbaYSOtbhwOePNaOYia6hrutguE+Hp44birYddZafUlaw4pDYUMJyAM4Geaj3S1WbVC9PXJ90ah9tTzLk0qcW/HU4QkodUTxnAKM9/H2CiOa9eJr0H0z1vMbP8aHAjts/s+S97Tqv8tmQK9FZ7U70n0c8xFRFZ+7I4DKTkDCEivXu+CB6u+jsQRG1rlT1xnXV/rYfUhlxojyCFVa8/HeaUtaxGffjpUs5UpLbqkAk+TgDJpIGK//xAAoEQABAwEGBQUAAAAAAAAAAAACAAMEEgEFECAxMhEUIUFhBhMiI3H/2gAIAQIBAT8ATrwsjUSdvuI2VNXH8UW8o0r4tF1yeoJhE7yw6WIW3C2ijuh5uMT5brO3hXVKKVGEi10xkwG3p9To9KU0ACP16I6dpd1dsTlWSHzi42LlSaa9saRJFHEnBcQ5HwItpcE3ZSOW1WY//8QAJxEAAgECBAUFAQAAAAAAAAAAAgMAAQQFEhMxEBEgMkEUISIjQmH/2gAIAQMBAT8Ai1kwssXhr2fmPsnJ7h6MItxFer5rKmI90HEVsbpDtL5Gi0hHbii6NdtlHfnGVZm+W8pQu4fEvLj1DM384oeSTEh8R90TnapDSLvmLQSPblWV6LV4LH7F5o2okWYR5dNJXj//2Q==";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const counter = useCounter();
    const renderMarkdown = (markdown) => {
      return markdownIt({
        highlight: (str, lang) => {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return `<pre class="hljs"><span class="pre_copy">Copy</span><code>${hljs.highlight(str, {
                language: lang,
                ignoreIllegals: true
              }).value}</code></pre>`;
            } catch (__) {
            }
          }
          return `<pre class="hljs"><span class="pre_copy">Copy</span><code>${markdownIt().utils.escapeHtml(str)}</code></pre>`;
        },
        breaks: true
        // 添加breaks插件
      }).render(markdown);
    };
    useHead({
      title: counter.setting.title,
      meta: [{
        name: "description",
        content: counter.setting.description
      }, {
        name: "keywords",
        content: counter.setting.keywords
      }]
    });
    const token = useCookie("token");
    const router = useRouter();
    const messages = ref([]);
    const ms_active = ref(0);
    const me_message = ref([]);
    const loadins = ref(false);
    const send_loading = ref(false);
    const data_load = ref(true);
    const scene_model = ref([]);
    const m_last = ref({});
    const page = ref(1);
    const limit = ref(8);
    const ms_count = ref(0);
    const left_loding = ref(false);
    const all_message = () => {
      data_load.value = true;
      get_message({
        page,
        limit
      }).then((res) => {
        messages.value = res._rawValue.data;
        scene_model.value = res._rawValue.scene;
        m_last.value = res._rawValue.m_last;
        ms_count.value = res._rawValue.count;
        left_loding.value = false;
        data_load.value = false;
      }).catch((err) => {
        data_load.value = false;
        left_loding.value = false;
        console.log(err);
      });
    };
    all_message();
    const handleCurrentChange = (val) => {
      console.log(val);
      left_loding.value = true;
      get_message({
        page: val,
        limit
      }).then((res) => {
        page.value = val;
        messages.value = res._rawValue.data;
        ms_count.value = res._rawValue.count;
        left_loding.value = false;
      }).catch((err) => {
        left_loding.value = false;
        console.log(err);
      });
    };
    const check_message = (id) => {
      ms_active.value = id;
      loadins.value = true;
      c_message({
        session_id: id
      }).then((res) => {
        me_message.value = res._rawValue.data;
        loadins.value = false;
        down_message();
      }).catch((err) => {
        loadins.value = false;
      });
    };
    const down_message = () => {
      setTimeout(() => {
        let chat = document.getElementsByClassName("chat-content")[0];
        chat.style.transition = "500ms";
        chat.scrollTo({
          top: chat.scrollHeight,
          behavior: "smooth"
        });
      }, 100);
    };
    const ruleFormRef = ref();
    const ruleForm = reactive({
      message_input: ""
    });
    const rules = reactive({
      message_input: [{
        required: true,
        message: "\u8BF7\u8F93\u5165\u5185\u5BB9",
        trigger: "blur"
      }]
    });
    const {
      public: {
        baseUrl
      }
    } = useRuntimeConfig();
    const headers = {
      "Authorization": `Bearer ${token.value}`,
      "Accept": "text/event-stream"
    };
    const is_done = ref(true);
    const streams = ref();
    const submitForm = async (formEl) => {
      if (!formEl)
        return;
      await formEl.validate(async (valid, fields) => {
        var _a;
        if (valid) {
          if (!token.value) {
            ElMessage.warning("\u8BF7\u5148\u767B\u5F55");
            router.push({
              path: "/login"
            });
            return false;
          }
          send_loading.value = true;
          me_message.value.push({
            "session_id": ms_active.value,
            "question": ruleForm.message_input,
            "message": ""
          });
          down_message();
          const res = await fetch(`${baseUrl}api/send_bot`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              info: ruleForm.message_input,
              session_id: ms_active.value
            })
          });
          console.log(res);
          if (res.status == 500) {
            send_loading.value = false;
            ElMessage.error("\u670D\u52A1\u5668\u9519\u8BEF");
            return false;
          }
          if (res.status == 401) {
            send_loading.value = false;
            ElMessage.error("\u7981\u6B62\u53D1\u9001\u8FDD\u7981\u8BCD");
            return false;
          }
          if (res.status == 402) {
            send_loading.value = false;
            ElMessage.error("\u53D1\u9001\u6B21\u6570\u4E0A\u7EBF\u6216\u4F59\u989D\u4E0D\u8DB3");
            return false;
          }
          const stream = (_a = res.body) == null ? void 0 : _a.getReader();
          const onData = ({
            value
          }) => {
            let result = new TextDecoder().decode(value);
            let arr = result.split("\n\n").map((str) => str.replace(/\n/g, ""));
            let new_arr = [];
            for (let i = 0; i < arr.length; i++) {
              is_done.value = false;
              if (arr[i].slice(-2) == "]}" && arr[i].startsWith("data:")) {
                new_arr.push(JSON.parse(arr[i].replace("data:", "")));
              } else if (arr[i].startsWith("data:") && arr[i].slice(-2) != "]}") {
                streams.value = arr[i].replace("data:", "");
              } else if (arr[i].slice(-2) == "]}" && arr[i].startsWith("data:") == false) {
                let str = streams.value += arr[i];
                new_arr.push(JSON.parse(str.replace("data:", "")));
                streams.value = "";
              } else {
                if (arr[i].includes('"error"')) {
                  me_message.value[me_message.value.length - 1].message = JSON.parse(arr[i]).error.message;
                }
                streams.value = "";
              }
            }
            for (let i = 0; i < new_arr.length; i++) {
              setTimeout(() => {
                if (new_arr[i].choices[0].delta.content) {
                  me_message.value[me_message.value.length - 1].message += new_arr[i].choices[0].delta.content;
                }
                down_message();
              }, 100);
            }
          };
          const read = async () => {
            const result = await (stream == null ? void 0 : stream.read());
            if (result == null ? void 0 : result.done) {
              console.log("done");
              is_done.value = true;
              send_loading.value = false;
              ruleForm.message_input = "";
              if (ms_active.value == 0) {
                all_message();
                setTimeout(() => {
                  if (ms_active.value == 0) {
                    ms_active.value = m_last.value.session_id;
                  }
                  check_message(ms_active.value);
                }, 2e3);
              }
            } else {
              send_loading.value = true;
              is_done.value = false;
              onData(result);
              await read();
            }
          };
          await read();
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    const qs_input = ref("");
    const handleClick = (command) => {
      const input = document.createElement("input");
      input.setAttribute("readonly", "readonly");
      input.setAttribute("value", command.replace(/&nbsp;/g, " "));
      document.body.appendChild(input);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        ElMessage.success("\u590D\u5236\u6210\u529F");
      }
      document.body.removeChild(input);
    };
    ref();
    ref();
    ref(false);
    ref("ltr");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_skeleton = resolveComponent("el-skeleton");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _component_client_only = __nuxt_component_1;
      const _component_el_dropdown = resolveComponent("el-dropdown");
      const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
      const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_button = resolveComponent("el-button");
      const _directive_loading = resolveDirective("loading");
      _push(`<!--[--><div class="sidebar border-end py-xl-4 py-3 px-xl-4 px-3"><div class="tab-content"><div class="tab-pane fade show active" id="nav-tab-chat" role="tabpanel"><div class="d-flex justify-content-between align-items-center mb-4"><h3 class="mb-0 text-primary">Chat</h3><div>`);
      if (!unref(token)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "btn btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u2728 \u767B\u5F55!`);
            } else {
              return [createTextVNode("\u2728 \u767B\u5F55!")];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/users/setting",
          class: "btn btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u2728 \u4E2A\u4EBA\u4E2D\u5FC3`);
            } else {
              return [createTextVNode("\u2728 \u4E2A\u4EBA\u4E2D\u5FC3")];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div><div class="form-group input-group-lg search mb-3"><i class="zmdi zmdi-search"></i><i class="zmdi zmdi-dialpad"></i><input type="text" class="form-control"${ssrRenderAttr("value", qs_input.value)} placeholder="Search..."></div><ul class="chat-list"><li class="header d-flex justify-content-between ps-3 pe-3 mb-1"><span>RECENT CHATS</span><div class="dropdown"><a class="btn btn-link px-1 py-0 border-0 text-muted dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="zmdi zmdi-refresh"></i></a></div></li><li><div class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><div class="avatar rounded-circle no-image bg-primary text-light"><span><i class="zmdi zmdi-comment-text"></i></span></div></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">ChatGPT</h6></div><div class="text-truncate"><i class="zmdi zmdi-circle text-success"></i> Online </div></div></div></div></div></li>`);
      if (data_load.value) {
        _push(ssrRenderComponent(_component_el_skeleton, {
          rows: 5,
          animated: ""
        }, null, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "bot_info"
        }, ssrGetDirectiveProps(_ctx, _directive_loading, left_loding.value)))}><!--[-->`);
        ssrRenderList(unref(messages), (item, index) => {
          _push(`<li class="${ssrRenderClass([ms_active.value == item[item.length - 1].session_id ? "active" : "", "online"])}"><div class="hover_action"><button type="button" class="btn btn-link text-danger"><i class="zmdi zmdi-delete"></i></button></div><div class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><span class="status rounded-circle"></span><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_0)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">${ssrInterpolate(item[item.length - 1].question)}</h6><p class="small text-muted text-nowrap ms-4 mb-0">${ssrInterpolate(item[item.length - 1].created_at)}</p></div><div class="text-truncate h-20">${item[item.length - 1].message.replace(/\n/g, "<br />")}</div></div></div></div></div></li>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</ul>`);
      _push(ssrRenderComponent(_component_el_pagination, {
        "current-page": page.value,
        "page-size": limit.value,
        "pager-count": 4,
        background: "",
        layout: "prev, pager, next",
        total: ms_count.value,
        onCurrentChange: handleCurrentChange
      }, null, _parent));
      _push(`</div></div></div><div class="main px-3"><div${ssrRenderAttrs(mergeProps({
        class: "chat-body",
        id: "chatbody"
      }, ssrGetDirectiveProps(_ctx, _directive_loading, loadins.value)))}><div class="chat-header border-bottom py-xl-4 py-md-3 py-2"><div class="container-xxl"><div class="row align-items-center"><div class="col-6 col-xl-4 d-sm-flex"><button class="btn sidebar-toggle-btn"><i class="zmdi zmdi-menu"></i></button><div class="media">`);
      if (ms_active.value == 0) {
        _push(`<div class="avatar me-3"><div class="avatar rounded-circle no-image bg-primary text-light"><span><i class="zmdi zmdi-comment-text"></i></span></div></div>`);
      } else {
        _push(`<div class="me-3 show-user-detail"><span class="status rounded-circle"></span><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_0)} alt="avatar"></div>`);
      }
      _push(`<div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1">`);
      if (ms_active.value == 0) {
        _push(`<h6 class="text-truncate mb-0 me-auto">ChatGPT</h6>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(me_message).length > 0) {
        _push(`<h6 class="text-truncate mb-0 me-auto">${ssrInterpolate(unref(me_message)[0].question)}</h6>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="text-truncate"><i class="zmdi zmdi-circle text-success"></i> Online </div></div></div></div><div class="col-6 col-xl-8 text-end"><ul class="nav justify-content-end align-items-center"><li class="nav-item list-inline-item d-none d-md-block me-2">`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</li><li class="nav-item list-inline-item d-md-block me-2">`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</li><li class="nav-item list-inline-item d-md-block">`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</li></ul></div></div></div></div><div class="collapse" id="chat-search-div"><div class="container-xxl py-2"><div class="input-group"><input type="text" class="form-control" placeholder="Find messages in current conversation"><div class="input-group-append"><span class="input-group-text text-muted">0 / 0</span></div><div class="input-group-append"><button type="button" class="btn btn-secondary">Search</button><button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="sr-only">Toggle Dropdown</span></button><div class="dropdown-menu dropdown-menu-right shadow border-0"><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a><a class="dropdown-item" href="#">Something else here</a><div role="separator" class="dropdown-divider"></div><a class="dropdown-item" href="#">Separated link</a></div></div></div></div></div><div class="chat-content"><div class="container-xxl"><ul class="list-unstyled py-4">`);
      if (ms_active.value == 0) {
        _push(`<div class="bot_message_s"><li class="d-flex message"><div class="mr-lg-3 me-2"><div class="avatar sm rounded-circle bg-primary d-flex align-items-center justify-content-center"><span><i class="zmdi zmdi-comment-text text-light"></i></span></div></div><div class="message-body"><div class="message-row d-flex align-items-center"><div class="message-content p-3"> \u{1F64C} \u6B22\u8FCE\u56DE\u6765!<br> \u6709\u4EC0\u4E48\u53EF\u4EE5\u5E2E\u52A9\u60A8? </div></div><div class="message-row d-flex align-items-center"><div class="message-content p-3"> \u{1F44B} \u60A8\u597D\uFF0C\u6211\u662F\u60A8\u7684\u4E13\u5C5E\u673A\u5668\u4EBA.<br>\u5F53\u524D\u4F7F\u7528\u7684\u662FGPT3.5\u6A21\u578B. <br>\u5982\u679C\u4F60\u5BF9\u6211\u4EEC\u7684\u5DE5\u5177\u6709\u4EFB\u4F55\u7591\u95EE\uFF0C\u8BF7\u544A\u8BC9\u6211\u4EEC </div></div></div></li></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(me_message), (item, index) => {
        _push(`<div class="message_s"><li class="d-flex message right"><div class="message-body"><span class="date-time text-muted">${ssrInterpolate(item.created_at)}<i class="zmdi zmdi-check-all text-primary"></i></span><div class="message-row d-flex align-items-center justify-content-end"><div class="message-content border p-3">${ssrInterpolate(item.question)}</div></div></div></li><li class="d-flex message"><div class="mr-lg-3 me-2"><img class="avatar sm rounded-circle"${ssrRenderAttr("src", _imports_0)} alt="avatar"></div><div class="message-body"><span class="date-time text-muted">${ssrInterpolate(item.created_at)}</span><div class="message-row d-flex align-items-center"><div class="${ssrRenderClass([index == unref(me_message).length - 1 && !is_done.value ? "ms-up" : "", "message-content p-3"])}">${renderMarkdown(item.message).replace(/\\n/g, "\n")}</div>`);
        _push(ssrRenderComponent(_component_el_dropdown, null, {
          dropdown: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_el_dropdown_menu, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_dropdown_item, {
                      command: "copy",
                      onClick: ($event) => handleClick(item.message.replace(/\n/g, "<br />"))
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u590D\u5236\u7B54\u6848`);
                        } else {
                          return [createTextVNode("\u590D\u5236\u7B54\u6848")];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [createVNode(_component_el_dropdown_item, {
                      command: "copy",
                      onClick: ($event) => handleClick(item.message.replace(/\n/g, "<br />"))
                    }, {
                      default: withCtx(() => [createTextVNode("\u590D\u5236\u7B54\u6848")]),
                      _: 2
                    }, 1032, ["onClick"])];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [createVNode(_component_el_dropdown_menu, null, {
                default: withCtx(() => [createVNode(_component_el_dropdown_item, {
                  command: "copy",
                  onClick: ($event) => handleClick(item.message.replace(/\n/g, "<br />"))
                }, {
                  default: withCtx(() => [createTextVNode("\u590D\u5236\u7B54\u6848")]),
                  _: 2
                }, 1032, ["onClick"])]),
                _: 2
              }, 1024)];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="dropdown"${_scopeId}><a class="text-muted ms-1 p-2 text-muted" href="javascript:;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"${_scopeId}><i class="zmdi zmdi-more-vert"${_scopeId}></i></a></div>`);
            } else {
              return [createVNode("div", {
                class: "dropdown"
              }, [createVNode("a", {
                class: "text-muted ms-1 p-2 text-muted",
                href: "javascript:;",
                "data-toggle": "dropdown",
                "aria-haspopup": "true",
                "aria-expanded": "false"
              }, [createVNode("i", {
                class: "zmdi zmdi-more-vert"
              })])])];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div></li></div>`);
      });
      _push(`<!--]--></ul></div></div><div class="chat-footer border-top py-xl-4 py-lg-2 py-2"><div class="container-xxl"><div class="row"><div class="col-12">`);
      _push(ssrRenderComponent(_component_el_form, {
        ref_key: "ruleFormRef",
        ref: ruleFormRef,
        model: unref(ruleForm),
        rules: unref(rules),
        class: "demo-ruleForm",
        "status-icon": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="col-9 d-inline-block"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_form_item, {
              prop: "message_input"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, {
                    size: "large",
                    disabled: send_loading.value,
                    class: "form-control border-0 pl-0",
                    modelValue: unref(ruleForm).message_input,
                    "onUpdate:modelValue": ($event) => unref(ruleForm).message_input = $event,
                    autocomplete: "off",
                    placeholder: "\u8BF7\u8F93\u5165\u63D0\u95EE\u5185\u5BB9",
                    onKeydown: ($event) => submitForm(ruleFormRef.value)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [createVNode(_component_el_input, {
                    size: "large",
                    disabled: send_loading.value,
                    class: "form-control border-0 pl-0",
                    modelValue: unref(ruleForm).message_input,
                    "onUpdate:modelValue": ($event) => unref(ruleForm).message_input = $event,
                    autocomplete: "off",
                    placeholder: "\u8BF7\u8F93\u5165\u63D0\u95EE\u5185\u5BB9",
                    onKeydown: withKeys(($event) => submitForm(ruleFormRef.value), ["enter", "native"])
                  }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "onKeydown"])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_form_item, {
              style: {
                "margin-bottom": "0",
                "display": "none"
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_input, null, null, _parent3, _scopeId2));
                } else {
                  return [createVNode(_component_el_input)];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="col-3 d-inline-block div-pad"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_form_item, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_button, {
                    size: "large",
                    type: "primary",
                    onClick: ($event) => submitForm(ruleFormRef.value),
                    loading: send_loading.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="me-2"${_scopeId3}> \u53D1\u9001 </span><i class="zmdi zmdi-mail-send"${_scopeId3}></i>`);
                      } else {
                        return [createVNode("span", {
                          class: "me-2"
                        }, " \u53D1\u9001 "), createVNode("i", {
                          class: "zmdi zmdi-mail-send"
                        })];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [createVNode(_component_el_button, {
                    size: "large",
                    type: "primary",
                    onClick: ($event) => submitForm(ruleFormRef.value),
                    loading: send_loading.value
                  }, {
                    default: withCtx(() => [createVNode("span", {
                      class: "me-2"
                    }, " \u53D1\u9001 "), createVNode("i", {
                      class: "zmdi zmdi-mail-send"
                    })]),
                    _: 1
                  }, 8, ["onClick", "loading"])];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [createVNode("div", {
              class: "col-9 d-inline-block"
            }, [createVNode(_component_el_form_item, {
              prop: "message_input"
            }, {
              default: withCtx(() => [createVNode(_component_el_input, {
                size: "large",
                disabled: send_loading.value,
                class: "form-control border-0 pl-0",
                modelValue: unref(ruleForm).message_input,
                "onUpdate:modelValue": ($event) => unref(ruleForm).message_input = $event,
                autocomplete: "off",
                placeholder: "\u8BF7\u8F93\u5165\u63D0\u95EE\u5185\u5BB9",
                onKeydown: withKeys(($event) => submitForm(ruleFormRef.value), ["enter", "native"])
              }, null, 8, ["disabled", "modelValue", "onUpdate:modelValue", "onKeydown"])]),
              _: 1
            }), createVNode(_component_el_form_item, {
              style: {
                "margin-bottom": "0",
                "display": "none"
              }
            }, {
              default: withCtx(() => [createVNode(_component_el_input)]),
              _: 1
            })]), createVNode("div", {
              class: "col-3 d-inline-block div-pad"
            }, [createVNode(_component_el_form_item, null, {
              default: withCtx(() => [createVNode(_component_el_button, {
                size: "large",
                type: "primary",
                onClick: ($event) => submitForm(ruleFormRef.value),
                loading: send_loading.value
              }, {
                default: withCtx(() => [createVNode("span", {
                  class: "me-2"
                }, " \u53D1\u9001 "), createVNode("i", {
                  class: "zmdi zmdi-mail-send"
                })]),
                _: 1
              }, 8, ["onClick", "loading"])]),
              _: 1
            })])];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div><div class="user-detail-sidebar py-xl-4 py-3 px-xl-4 px-3"><div class="d-flex flex-column"><div class="header border-bottom pb-4 d-flex justify-content-between"><div><h6 class="mb-0 font-weight-bold">User Details</h6><span class="text-muted">Update your profile details</span></div><div><button class="btn btn-link text-muted close-chat-sidebar" type="button"><i class="zmdi zmdi-close"></i></button></div></div><div class="body mt-4"><div class="d-flex justify-content-center"><div class="avatar xxl"><img class="avatar xxl rounded-circle"${ssrRenderAttr("src", _imports_1)} alt="avatar"></div></div><div class="text-center mt-3 mb-5"><h4>Jason Porter</h4><span class="text-muted"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="0f62666c676a63636a21687d6a6a614f68626e6663216c6062">[email\xA0protected]</a></span><p>+14 123 456 789 - New york (USA)</p></div><ul class="chat-list"><li class="header d-flex justify-content-between ps-3 pe-3 mb-1"><span>mutual friend</span></li><li><a href="#" class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_2)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">Michelle Green</h6></div><div class="text-truncate">+14 123 456 258</div></div></div></div></a></li><li><a href="#" class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_3)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">Jason Porter</h6></div><div class="text-truncate">+14 123 456 963</div></div></div></div></a></li><li><a href="#" class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_4)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">Elizabeth Martin</h6></div><div class="text-truncate">+14 123 456 753</div></div></div></div></a></li></ul></div></div></div><div class="addnew-user-sidebar py-xl-4 py-3 px-xl-4 px-3"><div class="d-flex flex-column"><div class="header border-bottom pb-4 d-flex justify-content-between"><div><h6 class="mb-0 font-weight-bold">Add new member</h6><span class="text-muted">Update your profile details</span></div><div><button class="btn btn-link text-muted close-chat-sidebar" type="button"><i class="zmdi zmdi-close"></i></button></div></div><div class="body mt-4"><div class="form-group input-group-lg search mb-3"><i class="zmdi zmdi-search"></i><input type="text" class="form-control" placeholder="Search..."></div><ul class="chat-list"><li class="header d-flex justify-content-between ps-3 pe-3 mb-1"><span>A</span><div class="dropdown"><a class="btn btn-link px-1 py-0 border-0 text-muted dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a><a class="dropdown-item" href="#">Something else here</a></div></div></li><li><div class="hover_action"><button type="button" class="btn btn-link text-info"><i class="zmdi zmdi-plus-circle"></i></button></div><a href="#" class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_2)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">Amelia Green</h6></div><div class="text-truncate"> last seen 2 hours ago </div></div></div></div></a></li><li><div class="hover_action"><button type="button" class="btn btn-link text-info"><i class="zmdi zmdi-plus-circle"></i></button></div><a href="#" class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_4)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">Ava Green</h6></div><div class="text-truncate"> last seen 1 hours ago </div></div></div></div></a></li><li class="header d-flex justify-content-between ps-3 pe-3 mb-1"><span>C</span></li><li><div class="hover_action"><button type="button" class="btn btn-link text-info"><i class="zmdi zmdi-plus-circle"></i></button></div><a href="#" class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_5)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">Charlotte Green</h6></div><div class="text-truncate"> last seen 6 hours ago </div></div></div></div></a></li><li><div class="hover_action"><button type="button" class="btn btn-link text-info"><i class="zmdi zmdi-plus-circle"></i></button></div><a href="#" class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_0)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">Chloe Green</h6></div><div class="text-truncate"> last seen 3 hours ago </div></div></div></div></a></li><li><div class="hover_action"><button type="button" class="btn btn-link text-info"><i class="zmdi zmdi-plus-circle"></i></button></div><a href="#" class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_6)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">Charles Green</h6></div><div class="text-truncate"> last seen 2 hours ago </div></div></div></div></a></li><li class="header d-flex justify-content-between ps-3 pe-3 mb-1"><span>D</span></li><li><div class="hover_action"><button type="button" class="btn btn-link text-info"><i class="zmdi zmdi-plus-circle"></i></button></div><a href="#" class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_5)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">David Green</h6></div><div class="text-truncate"> last seen 6 hours ago </div></div></div></div></a></li><li class="header d-flex justify-content-between ps-3 pe-3 mb-1"><span>M</span></li><li><div class="hover_action"><button type="button" class="btn btn-link text-info"><i class="zmdi zmdi-plus-circle"></i></button></div><a href="#" class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_7)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">Michael Green</h6></div><div class="text-truncate"> last seen 6 hours ago </div></div></div></div></a></li><li><div class="hover_action"><button type="button" class="btn btn-link text-info"><i class="zmdi zmdi-plus-circle"></i></button></div><a href="#" class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_7)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">Mohammad</h6></div><div class="text-truncate"> last seen 6 hours ago </div></div></div></div></a></li><li class="header d-flex justify-content-between ps-3 pe-3 mb-1"><span>T</span></li><li><div class="hover_action"><button type="button" class="btn btn-link text-info"><i class="zmdi zmdi-plus-circle"></i></button></div><a href="#" class="card"><div class="card-body"><div class="media"><div class="avatar me-3"><img class="avatar rounded-circle"${ssrRenderAttr("src", _imports_8)} alt="avatar"></div><div class="media-body overflow-hidden"><div class="d-flex align-items-center mb-1"><h6 class="text-truncate mb-0 me-auto">Tommy Green</h6></div><div class="text-truncate"> last seen 6 hours ago </div></div></div></div></a></li></ul></div></div></div></div>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-f206e9bb.mjs.map
