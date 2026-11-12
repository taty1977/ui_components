import { jsx as t, jsxs as P, Fragment as Re } from "react/jsx-runtime";
import { useState as V, useId as te, Children as ca, useRef as re, useEffect as oe, isValidElement as ua, useMemo as Je, useCallback as Ae, useLayoutEffect as Ba } from "react";
import { ChevronUpIcon as pa, ChevronDownIcon as Fe, XMarkIcon as Aa, ChevronLeftIcon as Qe, ChevronRightIcon as Ye, HeartIcon as Ea, CheckIcon as Ra } from "@heroicons/react/24/solid";
import { createPortal as Fa } from "react-dom";
import { XMarkIcon as va, Bars3Icon as Wa, LinkIcon as ja, MagnifyingGlassPlusIcon as Ma, ChevronLeftIcon as Va, ChevronRightIcon as Ua } from "@heroicons/react/24/outline";
import { ResponsiveContainer as Ka, LineChart as _a, Line as qa, AreaChart as Xa, Area as Ha, BarChart as Ja, Bar as Qa, PieChart as Ya, Tooltip as Ze, Legend as ea, Pie as Za, CartesianGrid as er, XAxis as ar, YAxis as rr } from "recharts";
function ga(e) {
  var a, r, i = "";
  if (typeof e == "string" || typeof e == "number") i += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (a = 0; a < o; a++) e[a] && (r = ga(e[a])) && (i && (i += " "), i += r);
  } else for (r in e) e[r] && (i && (i += " "), i += r);
  return i;
}
function ma() {
  for (var e, a, r = 0, i = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (a = ga(e)) && (i && (i += " "), i += a);
  return i;
}
const We = "-", ir = (e) => {
  const a = or(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: i
  } = e;
  return {
    getClassGroupId: (n) => {
      const l = n.split(We);
      return l[0] === "" && l.length !== 1 && l.shift(), fa(l, a) || tr(n);
    },
    getConflictingClassGroupIds: (n, l) => {
      const v = r[n] || [];
      return l && i[n] ? [...v, ...i[n]] : v;
    }
  };
}, fa = (e, a) => {
  if (e.length === 0)
    return a.classGroupId;
  const r = e[0], i = a.nextPart.get(r), o = i ? fa(e.slice(1), i) : void 0;
  if (o)
    return o;
  if (a.validators.length === 0)
    return;
  const s = e.join(We);
  return a.validators.find(({
    validator: n
  }) => n(s))?.classGroupId;
}, aa = /^\[(.+)\]$/, tr = (e) => {
  if (aa.test(e)) {
    const a = aa.exec(e)[1], r = a?.substring(0, a.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, or = (e) => {
  const {
    theme: a,
    prefix: r
  } = e, i = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return nr(Object.entries(e.classGroups), r).forEach(([s, n]) => {
    Ee(n, i, s, a);
  }), i;
}, Ee = (e, a, r, i) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? a : ra(a, o);
      s.classGroupId = r;
      return;
    }
    if (typeof o == "function") {
      if (lr(o)) {
        Ee(o(i), a, r, i);
        return;
      }
      a.validators.push({
        validator: o,
        classGroupId: r
      });
      return;
    }
    Object.entries(o).forEach(([s, n]) => {
      Ee(n, ra(a, s), r, i);
    });
  });
}, ra = (e, a) => {
  let r = e;
  return a.split(We).forEach((i) => {
    r.nextPart.has(i) || r.nextPart.set(i, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(i);
  }), r;
}, lr = (e) => e.isThemeGetter, nr = (e, a) => a ? e.map(([r, i]) => {
  const o = i.map((s) => typeof s == "string" ? a + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([n, l]) => [a + n, l])) : s);
  return [r, o];
}) : e, sr = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let a = 0, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  const o = (s, n) => {
    r.set(s, n), a++, a > e && (a = 0, i = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let n = r.get(s);
      if (n !== void 0)
        return n;
      if ((n = i.get(s)) !== void 0)
        return o(s, n), n;
    },
    set(s, n) {
      r.has(s) ? r.set(s, n) : o(s, n);
    }
  };
}, $a = "!", dr = (e) => {
  const {
    separator: a,
    experimentalParseClassName: r
  } = e, i = a.length === 1, o = a[0], s = a.length, n = (l) => {
    const v = [];
    let c = 0, f = 0, p;
    for (let $ = 0; $ < l.length; $++) {
      let N = l[$];
      if (c === 0) {
        if (N === o && (i || l.slice($, $ + s) === a)) {
          v.push(l.slice(f, $)), f = $ + s;
          continue;
        }
        if (N === "/") {
          p = $;
          continue;
        }
      }
      N === "[" ? c++ : N === "]" && c--;
    }
    const y = v.length === 0 ? l : l.substring(f), w = y.startsWith($a), S = w ? y.substring(1) : y, O = p && p > f ? p - f : void 0;
    return {
      modifiers: v,
      hasImportantModifier: w,
      baseClassName: S,
      maybePostfixModifierPosition: O
    };
  };
  return r ? (l) => r({
    className: l,
    parseClassName: n
  }) : n;
}, cr = (e) => {
  if (e.length <= 1)
    return e;
  const a = [];
  let r = [];
  return e.forEach((i) => {
    i[0] === "[" ? (a.push(...r.sort(), i), r = []) : r.push(i);
  }), a.push(...r.sort()), a;
}, ur = (e) => ({
  cache: sr(e.cacheSize),
  parseClassName: dr(e),
  ...ir(e)
}), pr = /\s+/, vr = (e, a) => {
  const {
    parseClassName: r,
    getClassGroupId: i,
    getConflictingClassGroupIds: o
  } = a, s = [], n = e.trim().split(pr);
  let l = "";
  for (let v = n.length - 1; v >= 0; v -= 1) {
    const c = n[v], {
      modifiers: f,
      hasImportantModifier: p,
      baseClassName: y,
      maybePostfixModifierPosition: w
    } = r(c);
    let S = !!w, O = i(S ? y.substring(0, w) : y);
    if (!O) {
      if (!S) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (O = i(y), !O) {
        l = c + (l.length > 0 ? " " + l : l);
        continue;
      }
      S = !1;
    }
    const $ = cr(f).join(":"), N = p ? $ + $a : $, m = N + O;
    if (s.includes(m))
      continue;
    s.push(m);
    const x = o(O, S);
    for (let T = 0; T < x.length; ++T) {
      const G = x[T];
      s.push(N + G);
    }
    l = c + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function gr() {
  let e = 0, a, r, i = "";
  for (; e < arguments.length; )
    (a = arguments[e++]) && (r = ya(a)) && (i && (i += " "), i += r);
  return i;
}
const ya = (e) => {
  if (typeof e == "string")
    return e;
  let a, r = "";
  for (let i = 0; i < e.length; i++)
    e[i] && (a = ya(e[i])) && (r && (r += " "), r += a);
  return r;
};
function ia(e, ...a) {
  let r, i, o, s = n;
  function n(v) {
    const c = a.reduce((f, p) => p(f), e());
    return r = ur(c), i = r.cache.get, o = r.cache.set, s = l, l(v);
  }
  function l(v) {
    const c = i(v);
    if (c)
      return c;
    const f = vr(v, r);
    return o(v, f), f;
  }
  return function() {
    return s(gr.apply(null, arguments));
  };
}
const U = (e) => {
  const a = (r) => r[e] || [];
  return a.isThemeGetter = !0, a;
}, ba = /^\[(?:([a-z-]+):)?(.+)\]$/i, mr = /^\d+\/\d+$/, fr = /* @__PURE__ */ new Set(["px", "full", "screen"]), $r = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, yr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, br = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, hr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, xr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, le = (e) => me(e) || fr.has(e) || mr.test(e), ne = (e) => $e(e, "length", Or), me = (e) => !!e && !Number.isNaN(Number(e)), ze = (e) => $e(e, "number", me), xe = (e) => !!e && Number.isInteger(Number(e)), Pr = (e) => e.endsWith("%") && me(e.slice(0, -1)), B = (e) => ba.test(e), se = (e) => $r.test(e), kr = /* @__PURE__ */ new Set(["length", "size", "percentage"]), wr = (e) => $e(e, kr, ha), Cr = (e) => $e(e, "position", ha), Tr = /* @__PURE__ */ new Set(["image", "url"]), Dr = (e) => $e(e, Tr, Lr), Sr = (e) => $e(e, "", Nr), Pe = () => !0, $e = (e, a, r) => {
  const i = ba.exec(e);
  return i ? i[1] ? typeof a == "string" ? i[1] === a : a.has(i[1]) : r(i[2]) : !1;
}, Or = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  yr.test(e) && !br.test(e)
), ha = () => !1, Nr = (e) => hr.test(e), Lr = (e) => xr.test(e), ta = () => {
  const e = U("colors"), a = U("spacing"), r = U("blur"), i = U("brightness"), o = U("borderColor"), s = U("borderRadius"), n = U("borderSpacing"), l = U("borderWidth"), v = U("contrast"), c = U("grayscale"), f = U("hueRotate"), p = U("invert"), y = U("gap"), w = U("gradientColorStops"), S = U("gradientColorStopPositions"), O = U("inset"), $ = U("margin"), N = U("opacity"), m = U("padding"), x = U("saturate"), T = U("scale"), G = U("sepia"), A = U("skew"), D = U("space"), L = U("translate"), z = () => ["auto", "contain", "none"], g = () => ["auto", "hidden", "clip", "visible", "scroll"], C = () => ["auto", B, a], h = () => [B, a], W = () => ["", le, ne], R = () => ["auto", me, B], _ = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], K = () => ["solid", "dashed", "dotted", "double", "none"], q = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], j = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], X = () => ["", "0", B], H = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], k = () => [me, B];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Pe],
      spacing: [le, ne],
      blur: ["none", "", se, B],
      brightness: k(),
      borderColor: [e],
      borderRadius: ["none", "", "full", se, B],
      borderSpacing: h(),
      borderWidth: W(),
      contrast: k(),
      grayscale: X(),
      hueRotate: k(),
      invert: X(),
      gap: h(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Pr, ne],
      inset: C(),
      margin: C(),
      opacity: k(),
      padding: h(),
      saturate: k(),
      scale: k(),
      sepia: X(),
      skew: k(),
      space: h(),
      translate: h()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", B]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [se]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": H()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": H()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [..._(), B]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: g()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": g()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": g()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: z()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": z()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": z()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [O]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [O]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [O]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [O]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [O]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [O]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [O]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [O]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [O]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", xe, B]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: C()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", B]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: X()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: X()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", xe, B]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Pe]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", xe, B]
        }, B]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": R()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": R()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Pe]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [xe, B]
        }, B]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": R()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": R()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", B]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", B]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [y]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [y]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [y]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...j()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...j(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...j(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [m]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [m]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [m]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [m]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [m]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [m]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [m]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [m]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [m]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [$]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [$]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [$]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [$]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [$]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [$]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [$]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [$]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [$]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [D]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [D]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", B, a]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [B, a, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [B, a, "none", "full", "min", "max", "fit", "prose", {
          screen: [se]
        }, se]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [B, a, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [B, a, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [B, a, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [B, a, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", se, ne]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", ze]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Pe]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", B]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", me, ze]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", le, B]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", B]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", B]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [N]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [N]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...K(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", le, ne]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", le, B]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: h()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", B]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", B]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [N]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [..._(), Cr]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", wr]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Dr]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [S]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [S]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [S]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [w]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [w]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [w]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [s]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [s]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [s]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [s]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [s]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [s]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [s]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [s]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [s]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [s]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [s]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [s]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [s]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [s]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [s]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [l]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [l]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [l]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [l]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [l]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [l]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [l]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [l]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [l]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [N]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...K(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [l]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [l]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [N]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: K()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [o]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [o]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [o]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [o]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [o]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [o]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [o]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [o]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [o]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [o]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...K()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [le, B]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [le, ne]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: W()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [N]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [le, ne]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", se, Sr]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Pe]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [N]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...q(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": q()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [r]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [i]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [v]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", se, B]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [c]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [f]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [p]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [x]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [G]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [r]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [i]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [v]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [c]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [f]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [p]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [N]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [x]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [G]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [n]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [n]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [n]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", B]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: k()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", B]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: k()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", B]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [T]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [T]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [T]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [xe, B]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [L]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [L]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [A]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [A]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", B]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", B]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": h()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": h()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": h()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": h()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": h()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": h()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": h()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": h()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": h()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": h()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": h()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": h()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": h()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": h()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": h()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": h()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": h()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": h()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", B]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [le, ne, ze]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Gr = (e, {
  cacheSize: a,
  prefix: r,
  separator: i,
  experimentalParseClassName: o,
  extend: s = {},
  override: n = {}
}) => {
  we(e, "cacheSize", a), we(e, "prefix", r), we(e, "separator", i), we(e, "experimentalParseClassName", o);
  for (const l in n)
    zr(e[l], n[l]);
  for (const l in s)
    Ir(e[l], s[l]);
  return e;
}, we = (e, a, r) => {
  r !== void 0 && (e[a] = r);
}, zr = (e, a) => {
  if (a)
    for (const r in a)
      we(e, r, a[r]);
}, Ir = (e, a) => {
  if (a)
    for (const r in a) {
      const i = a[r];
      i !== void 0 && (e[r] = (e[r] || []).concat(i));
    }
}, Br = (e, ...a) => typeof e == "function" ? ia(ta, e, ...a) : ia(() => Gr(ta(), e), ...a), Ar = Br({
  extend: {
    classGroups: {
      // Register the project's custom text-size and font-weight utilities.
      "font-size": [{ text: ["12", "13", "15", "18", "24", "28", "38", "46"] }],
      "font-weight": [{ font: ["regular"] }]
    }
  }
}), d = (...e) => Ar(ma(e)), ye = {
  default: "solid",
  label: "label",
  outline: "outline",
  text: "text",
  primary: "solid",
  secondary: "solid",
  outlined: "outline",
  filled: "solid",
  standard: "text"
};
function de(e, a) {
  return e === "primary" || e === "secondary" ? e : a;
}
const oa = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, la = ma, xa = (e, a) => (r) => {
  var i;
  if (a?.variants == null) return la(e, r?.class, r?.className);
  const { variants: o, defaultVariants: s } = a, n = Object.keys(o).map((c) => {
    const f = r?.[c], p = s?.[c];
    if (f === null) return null;
    const y = oa(f) || oa(p);
    return o[c][y];
  }), l = r && Object.entries(r).reduce((c, f) => {
    let [p, y] = f;
    return y === void 0 || (c[p] = y), c;
  }, {}), v = a == null || (i = a.compoundVariants) === null || i === void 0 ? void 0 : i.reduce((c, f) => {
    let { class: p, className: y, ...w } = f;
    return Object.entries(w).every((S) => {
      let [O, $] = S;
      return Array.isArray($) ? $.includes({
        ...s,
        ...l
      }[O]) : {
        ...s,
        ...l
      }[O] === $;
    }) ? [
      ...c,
      p,
      y
    ] : c;
  }, []);
  return la(e, n, v, r?.class, r?.className);
}, Pa = ["primary", "secondary", "error", "warning", "info", "success"], De = {
  primary: {
    default: "bg-palette-primary-main",
    defaultState: "enabled:hover:bg-palette-primary-dark enabled:active:bg-palette-primary-dark enabled:focus:bg-palette-primary-dark focus-visible:outline-palette-primary-graphic",
    defaultText: "text-palette-primary-contrast",
    label: "bg-palette-primary-opacity-light",
    labelState: "enabled:hover:bg-palette-primary-opacity-main enabled:active:bg-palette-primary-opacity-main enabled:focus:bg-palette-primary-opacity-main",
    outline: "border-palette-primary-graphic",
    text: "text-palette-primary-text",
    outlineText: "text-palette-primary-outline-text",
    buttonText: "text-palette-primary-button-text",
    mainBorder: "border-palette-primary-main",
    subtleState: "enabled:hover:bg-palette-primary-opacity-lighter enabled:active:bg-palette-primary-opacity-lighter enabled:focus:bg-palette-primary-opacity-lighter",
    fieldBorder: "border-palette-primary-graphic hover:border-palette-primary-graphic focus-within:border-palette-primary-graphic",
    notchBorder: "border-palette-primary-graphic group-hover:border-palette-primary-graphic"
  },
  secondary: {
    default: "bg-palette-secondary-main",
    defaultState: "enabled:hover:bg-palette-secondary-dark enabled:active:bg-palette-secondary-dark enabled:focus:bg-palette-secondary-dark focus-visible:outline-palette-secondary-graphic",
    defaultText: "text-palette-secondary-contrast",
    label: "bg-palette-secondary-opacity-light",
    labelState: "enabled:hover:bg-palette-secondary-opacity-main enabled:active:bg-palette-secondary-opacity-main enabled:focus:bg-palette-secondary-opacity-main",
    outline: "border-palette-secondary-graphic",
    text: "text-palette-secondary-text",
    outlineText: "text-palette-secondary-outline-text",
    buttonText: "text-palette-secondary-button-text",
    mainBorder: "border-palette-secondary-main",
    subtleState: "enabled:hover:bg-palette-secondary-opacity-lighter enabled:active:bg-palette-secondary-opacity-lighter enabled:focus:bg-palette-secondary-opacity-lighter",
    fieldBorder: "border-palette-secondary-graphic hover:border-palette-secondary-graphic focus-within:border-palette-secondary-graphic",
    notchBorder: "border-palette-secondary-graphic group-hover:border-palette-secondary-graphic"
  },
  error: {
    default: "bg-palette-error-main",
    defaultState: "enabled:hover:bg-palette-error-dark enabled:active:bg-palette-error-dark enabled:focus:bg-palette-error-dark focus-visible:outline-palette-error-graphic",
    defaultText: "text-palette-error-contrast",
    label: "bg-palette-error-opacity-light",
    labelState: "enabled:hover:bg-palette-error-opacity-main enabled:active:bg-palette-error-opacity-main enabled:focus:bg-palette-error-opacity-main",
    outline: "border-palette-error-graphic",
    text: "text-palette-error-text",
    outlineText: "text-palette-error-outline-text",
    buttonText: "text-palette-error-button-text",
    mainBorder: "border-palette-error-main",
    subtleState: "enabled:hover:bg-palette-error-opacity-lighter enabled:active:bg-palette-error-opacity-lighter enabled:focus:bg-palette-error-opacity-lighter",
    fieldBorder: "border-palette-error-graphic hover:border-palette-error-graphic focus-within:border-palette-error-graphic",
    notchBorder: "border-palette-error-graphic group-hover:border-palette-error-graphic"
  },
  warning: {
    default: "bg-palette-warning-main",
    defaultState: "enabled:hover:bg-palette-warning-dark enabled:active:bg-palette-warning-dark enabled:focus:bg-palette-warning-dark focus-visible:outline-palette-warning-graphic",
    defaultText: "text-palette-warning-contrast",
    label: "bg-palette-warning-opacity-light",
    labelState: "enabled:hover:bg-palette-warning-opacity-main enabled:active:bg-palette-warning-opacity-main enabled:focus:bg-palette-warning-opacity-main",
    outline: "border-palette-warning-graphic",
    text: "text-palette-warning-text",
    outlineText: "text-palette-warning-outline-text",
    buttonText: "text-palette-warning-button-text",
    mainBorder: "border-palette-warning-main",
    subtleState: "enabled:hover:bg-palette-warning-opacity-lighter enabled:active:bg-palette-warning-opacity-lighter enabled:focus:bg-palette-warning-opacity-lighter",
    fieldBorder: "border-palette-warning-graphic hover:border-palette-warning-graphic focus-within:border-palette-warning-graphic",
    notchBorder: "border-palette-warning-graphic group-hover:border-palette-warning-graphic"
  },
  info: {
    default: "bg-palette-info-main",
    defaultState: "enabled:hover:bg-palette-info-dark enabled:active:bg-palette-info-dark enabled:focus:bg-palette-info-dark focus-visible:outline-palette-info-graphic",
    defaultText: "text-palette-info-contrast",
    label: "bg-palette-info-opacity-light",
    labelState: "enabled:hover:bg-palette-info-opacity-main enabled:active:bg-palette-info-opacity-main enabled:focus:bg-palette-info-opacity-main",
    outline: "border-palette-info-graphic",
    text: "text-palette-info-text",
    outlineText: "text-palette-info-outline-text",
    buttonText: "text-palette-info-button-text",
    mainBorder: "border-palette-info-main",
    subtleState: "enabled:hover:bg-palette-info-opacity-lighter enabled:active:bg-palette-info-opacity-lighter enabled:focus:bg-palette-info-opacity-lighter",
    fieldBorder: "border-palette-info-graphic hover:border-palette-info-graphic focus-within:border-palette-info-graphic",
    notchBorder: "border-palette-info-graphic group-hover:border-palette-info-graphic"
  },
  success: {
    default: "bg-palette-success-main",
    defaultState: "enabled:hover:bg-palette-success-dark enabled:active:bg-palette-success-dark enabled:focus:bg-palette-success-dark focus-visible:outline-palette-success-graphic",
    defaultText: "text-palette-success-contrast",
    label: "bg-palette-success-opacity-light",
    labelState: "enabled:hover:bg-palette-success-opacity-main enabled:active:bg-palette-success-opacity-main enabled:focus:bg-palette-success-opacity-main",
    outline: "border-palette-success-graphic",
    text: "text-palette-success-text",
    outlineText: "text-palette-success-outline-text",
    buttonText: "text-palette-success-button-text",
    mainBorder: "border-palette-success-main",
    subtleState: "enabled:hover:bg-palette-success-opacity-lighter enabled:active:bg-palette-success-opacity-lighter enabled:focus:bg-palette-success-opacity-lighter",
    fieldBorder: "border-palette-success-graphic hover:border-palette-success-graphic focus-within:border-palette-success-graphic",
    notchBorder: "border-palette-success-graphic group-hover:border-palette-success-graphic"
  }
}, ve = (e) => Object.fromEntries(Pa.map((a) => [a, e(De[a])])), Ce = (e, a = "main") => `var(--palette-${e}-${a})`, Er = xa(
  "inline-flex box-border items-center justify-center rounded-md font-sans font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
  {
    variants: {
      size: {
        // "default" preserves the medium size.
        default: "min-h-11 gap-2 px-4 text-15",
        sm: "min-h-9 gap-1.5 px-3 text-13",
        md: "min-h-11 gap-2 px-4 text-15",
        lg: "min-h-12 gap-2.5 px-6 text-18"
      },
      shape: { rectangle: "rounded-md", pill: "rounded-full" },
      width: { default: "w-auto", auto: "w-auto", sm: "w-32", md: "w-48", lg: "w-64", full: "w-full" }
    },
    defaultVariants: { size: "md", shape: "rectangle", width: "default" }
  }
), ee = ve((e) => ({
  solid: `${e.default} ${e.defaultText} ${e.defaultState}`,
  label: `${e.label} ${e.text} ${e.labelState}`,
  outline: `border ${e.mainBorder} bg-transparent ${e.outlineText} ${e.subtleState}`,
  text: `bg-transparent ${e.buttonText} ${e.subtleState}`
}));
function $i({
  items: e,
  className: a,
  allowMultiple: r = !1,
  collapsedIcon: i,
  expandedIcon: o,
  iconPosition: s = "right",
  variant: n = "default",
  tone: l = "primary",
  size: v = "normal",
  children: c
}) {
  const [f, p] = V(/* @__PURE__ */ new Set()), y = te(), w = de(n, l), S = ye[n], O = d(
    "flex w-full items-center px-4 text-left text-text-primary outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-current",
    v === "small" ? "min-h-11 gap-2 text-15" : "min-h-12 gap-2.5 text-18",
    ee[w][S],
    "font-medium",
    // Solid focus outlines must match the text, not the tone.
    S === "solid" && "focus-visible:outline-current"
  ), $ = d(
    "border-t border-border-subtle bg-background-surface px-4 text-text-secondary",
    v === "small" ? "py-3 text-13" : "py-4 text-15"
  ), N = ca.toArray(c);
  return /* @__PURE__ */ t("div", { className: d("grid gap-2 font-sans", a), "data-variant": n, "data-tone": w, children: e.map((m, x) => {
    const T = f.has(m.id), G = T ? pa : Fe, A = N[x] ?? m.content, D = `${y}-button-${m.id}`, L = `${y}-panel-${m.id}`, z = /* @__PURE__ */ t("span", { "aria-hidden": "true", className: "inline-flex size-4 shrink-0 items-center justify-center", children: (T ? o : i) ?? /* @__PURE__ */ t(G, { className: "size-4" }) });
    return /* @__PURE__ */ P("div", { className: "overflow-hidden rounded-md bg-background-surface transition-colors", children: [
      /* @__PURE__ */ P(
        "button",
        {
          type: "button",
          id: D,
          "aria-expanded": T,
          "aria-controls": L,
          className: d(
            O,
            S === "outline" && (T && A != null ? "rounded-t-md" : "rounded-md")
          ),
          onClick: () => p((g) => {
            const C = r ? new Set(g) : /* @__PURE__ */ new Set();
            return g.has(m.id) ? C.delete(m.id) : C.add(m.id), C;
          }),
          children: [
            s === "left" && z,
            /* @__PURE__ */ t("span", { className: "flex-1", children: m.title }),
            s === "right" && z
          ]
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          id: L,
          role: "region",
          "aria-labelledby": D,
          hidden: !T || A == null,
          className: $,
          children: T ? A : null
        }
      )
    ] }, m.id);
  }) });
}
function Rr({
  options: e,
  activeIndex: a,
  setActiveIndex: r,
  setOpen: i,
  onSelect: o,
  onKeyDown: s
}) {
  return (n) => {
    if (s?.(n), !n.defaultPrevented)
      switch (n.key) {
        case "Enter":
          e.length && (n.preventDefault(), o(e[a] ?? e[0]));
          break;
        case "Escape":
          i(!1);
          break;
        case "ArrowDown":
        case "ArrowUp": {
          n.preventDefault(), i(!0);
          const l = n.key === "ArrowDown" ? 1 : -1;
          r((v) => Math.max(0, Math.min(e.length - 1, v + l)));
          break;
        }
      }
  };
}
const ka = {
  default: "text-text-primary",
  muted: "text-text-secondary",
  ...ve((e) => e.text),
  inverse: "text-misc-bg-white"
}, Fr = {
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold"
}, wa = {
  ...Fr,
  semiBold: "font-semibold",
  light: "font-light",
  extraBold: "font-extrabold"
}, Ca = {
  none: "normal-case",
  capitalize: "capitalize",
  uppercase: "uppercase",
  lowercase: "lowercase"
}, Wr = {
  xs: "text-12 leading-14",
  sm: "text-13 leading-18",
  md: "text-15 leading-20",
  lg: "text-18 leading-22",
  xl: "text-24 leading-28"
}, jr = {
  subtitle1: { size: "lg", weight: "medium" },
  subtitle2: { size: "md", weight: "medium" },
  body1: { size: "md", weight: "regular" },
  body2: { size: "sm", weight: "regular" },
  caption: { size: "xs", weight: "regular" },
  overline: { size: "xs", weight: "medium" }
}, Mr = {
  h1: "text-46 leading-56",
  h2: "text-38 leading-42",
  h3: "text-28 leading-38",
  h4: "text-24 leading-28",
  h5: "text-18 leading-22",
  h6: "text-15 leading-20"
}, Vr = {
  always: "underline",
  hover: "no-underline hover:underline focus-visible:underline",
  none: "no-underline"
};
function Ta({ level: e, variant: a = "default" } = {}) {
  return e ?? (a === "default" ? "h4" : a);
}
function Ne({
  size: e,
  variant: a = "body1",
  weight: r,
  tone: i = "default",
  textTransform: o = "none"
} = {}) {
  const s = jr[a];
  return d(
    "font-sans",
    Wr[e ?? s.size],
    wa[r ?? s.weight],
    ka[i],
    Ca[o],
    // Overline stays uppercase even when another transform is requested.
    a === "overline" && "uppercase tracking-wider"
  );
}
function Ur({
  level: e,
  variant: a,
  weight: r = "bold",
  tone: i = "default",
  textTransform: o = "none"
} = {}) {
  return d(
    "font-sans",
    Mr[Ta({ level: e, variant: a })],
    wa[r],
    ka[i],
    Ca[o]
  );
}
function Kr({ underline: e = "always", ...a } = {}) {
  return d(
    Ne(a),
    "rounded-sm underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
    Vr[e]
  );
}
function ie({
  size: e,
  variant: a,
  weight: r,
  family: i,
  tone: o,
  textTransform: s,
  className: n,
  children: l,
  ...v
}) {
  return /* @__PURE__ */ t(
    "p",
    {
      className: d("m-0", Ne({ size: e, variant: a, weight: r, tone: o, textTransform: s }), n),
      ...v,
      children: l
    }
  );
}
function je({
  appearance: e,
  floating: a,
  visible: r,
  iconLeft: i = !1,
  size: o = "normal",
  multiline: s = !1
}) {
  let n;
  return r ? a && e === "outlined" ? n = "left-3 -top-2 px-1 text-13 bg-background-surface" : a && e === "filled" ? n = "left-4 top-1 text-13 leading-14" : s ? n = "left-4 top-2" : n = d("top-1/2 -translate-y-1/2 text-inherit", i ? o === "small" ? "left-9" : "left-[42px]" : "left-4") : n = "sr-only", d(
    "pointer-events-none absolute z-10 mb-0 transition-all",
    n,
    !s && !a && e !== "outlined" && "mt-[0.5px] group-focus-within:mt-px"
  );
}
function Ge(e, a, r) {
  const i = e === "primary" || e === "secondary" ? "outlined" : e, o = r ? "error" : de(e, a);
  return { appearance: i, accent: o };
}
const Da = ve((e) => e.fieldBorder), pe = ve((e) => e.text);
function Me({
  disabled: e,
  error: a,
  active: r,
  accent: i
}) {
  return e ? "text-text-disabled" : a ? pe.error : r ? pe[i] : "text-text-secondary";
}
const _r = ve((e) => e.notchBorder), Ve = xa(
  "relative flex w-full items-center font-sans text-text-primary outline-none transition-colors",
  {
    variants: {
      variant: {
        outlined: "rounded-md border bg-background-surface focus-within:border-2",
        filled: "rounded-t-md border-b bg-action-hover focus-within:border-b-2",
        standard: "border-b bg-transparent focus-within:border-b-2"
      },
      size: { small: "min-h-11 gap-2 px-4 text-15", normal: "min-h-12 gap-2.5 px-4 text-18" },
      disabled: { true: "cursor-not-allowed border-text-disabled text-text-disabled", false: "" },
      iconLeft: { true: "", false: "" },
      iconRight: { true: "", false: "" },
      notched: { true: "border-0 focus-within:border-0", false: "" }
    },
    compoundVariants: [
      { size: "small", iconLeft: !0, class: "pl-2" },
      { size: "normal", iconLeft: !0, class: "pl-3" },
      { size: "small", iconRight: !0, class: "pr-2" },
      { size: "normal", iconRight: !0, class: "pr-3" }
    ],
    defaultVariants: { variant: "outlined", size: "normal", disabled: !1, notched: !1 }
  }
), Sa = "w-full min-w-0 flex-1 border-0 bg-transparent py-2 font-sans text-inherit leading-5 outline-none placeholder:text-text-secondary disabled:cursor-not-allowed disabled:text-text-disabled", Te = {
  outlined: "",
  filled: "relative top-[0.5px] group-focus-within:top-px",
  standard: "relative top-[0.5px] group-focus-within:top-px"
}, qr = "mb-1 block font-sans text-13 font-medium text-text-secondary", Ue = d("mt-1 font-sans text-13", De.error.text), Oa = "absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-md border border-border-subtle bg-background-surface py-2 font-sans text-15 text-text-primary shadow-lg";
function Ke({ width: e, accent: a, disabled: r, borderClass: i }) {
  const o = r ? "border-text-disabled" : i ?? _r[a];
  return /* @__PURE__ */ P(Re, { children: [
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: d(
          "absolute bottom-0 left-0 top-0 w-3 rounded-l-md border-b border-l border-t group-focus-within:border-b-2 group-focus-within:border-l-2 group-focus-within:border-t-2",
          o
        )
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: d("absolute bottom-0 left-3 right-3 border-b group-focus-within:border-b-2", o)
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: d(
          "absolute bottom-0 right-0 top-0 rounded-r-md border-b border-r border-t group-focus-within:border-b-2 group-focus-within:border-r-2 group-focus-within:border-t-2",
          o
        ),
        style: { left: 12 + e }
      }
    )
  ] });
}
const Na = (e, a) => ({
  "aria-hidden": e || void 0,
  role: e ? void 0 : "img",
  "aria-label": a
});
function fe({ required: e, className: a, children: r, ref: i, ...o }) {
  return /* @__PURE__ */ P("label", { ref: i, className: d(qr, a), ...o, children: [
    r,
    e && /* @__PURE__ */ t("span", { className: d("ml-1", De.error.text), ...Na(!0), children: "*" })
  ] });
}
function La({
  inputProps: e,
  appearance: a,
  accent: r,
  size: i,
  label: o,
  error: s,
  floating: n,
  focused: l,
  iconLeft: v,
  iconRight: c,
  trailingAction: f
}) {
  const { id: p, disabled: y, required: w, placeholder: S, className: O } = e, $ = re(null), [N, m] = V(), x = n || !S, T = !!(o && a === "standard" && n && x), G = !!(o && n && a === "outlined"), A = G && N !== void 0, D = Me({ disabled: y, error: s, active: l, accent: r }), L = Te[a], z = d(
    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
    L
  );
  return oe(() => {
    if (!o || !n || a !== "outlined") return;
    const g = $.current?.offsetWidth;
    g && m(g);
  }, [a, n, o, w]), /* @__PURE__ */ P(Re, { children: [
    T && /* @__PURE__ */ t(
      fe,
      {
        ref: $,
        htmlFor: p,
        required: w,
        className: d("absolute left-0 top-0 z-10 mb-0 pl-4", D),
        children: o
      }
    ),
    /* @__PURE__ */ P(
      "div",
      {
        className: d(
          Ve({
            variant: a,
            size: typeof i == "number" ? "normal" : i,
            disabled: y,
            iconLeft: !!v,
            iconRight: !!(c || f),
            notched: A
          }),
          "group",
          G && "mt-2 bg-background-surface",
          o && n && a === "standard" && "mt-2",
          !y && Da[r]
        ),
        children: [
          A && N !== void 0 && /* @__PURE__ */ t(Ke, { width: N, accent: r, disabled: y }),
          o && !T && /* @__PURE__ */ t(
            fe,
            {
              ref: $,
              htmlFor: p,
              required: w,
              className: d(
                je({ appearance: a, floating: n, visible: x, iconLeft: !!v, size: i }),
                D
              ),
              children: o
            }
          ),
          v && /* @__PURE__ */ t("span", { "aria-hidden": "true", className: z, children: v }),
          /* @__PURE__ */ t(
            "input",
            {
              ...e,
              className: d(
                Sa,
                !n && L,
                a === "filled" && n && o && "self-stretch py-0 pt-[18px]",
                G && "relative z-20",
                O
              )
            }
          ),
          f || c && /* @__PURE__ */ t("span", { "aria-hidden": "true", className: z, children: c })
        ]
      }
    )
  ] });
}
function yi({
  className: e,
  error: a,
  helperText: r,
  iconLeft: i,
  iconRight: o,
  label: s,
  variant: n = "default",
  tone: l = "primary",
  size: v = "normal",
  onChange: c,
  onSelect: f,
  options: p,
  value: y,
  defaultValue: w,
  id: S,
  "aria-describedby": O,
  onFocus: $,
  onBlur: N,
  onKeyDown: m,
  ...x
}) {
  const T = te(), G = re(null), { appearance: A, accent: D } = Ge(n === "default" ? "outlined" : n, l, a), L = S ?? T, z = `${L}-options`, g = a ?? r, C = `${L}-${a ? "error" : "helper"}`, [h, W] = V(() => String(y ?? w ?? "")), [R, _] = V(!1), [K, q] = V(!1), [j, X] = V(0), H = y ?? h, k = H.length > 0, E = H.trim().length > 0, J = R && E, Q = H.toLowerCase(), M = K && E ? p.filter((u) => u.toLowerCase().includes(Q)) : [], I = (u) => {
    W(u), q(!1), f(u);
  };
  return /* @__PURE__ */ P(
    "div",
    {
      className: d("relative w-full max-w-sm font-sans", e),
      onBlur: (u) => {
        u.currentTarget.contains(u.relatedTarget) || _(!1);
      },
      children: [
        /* @__PURE__ */ t(
          La,
          {
            appearance: A,
            accent: D,
            size: v,
            label: s,
            error: a,
            floating: k,
            focused: R,
            iconLeft: i,
            iconRight: o,
            inputProps: {
              ...x,
              ref: G,
              size: typeof v == "number" ? v : void 0,
              id: L,
              type: "text",
              role: "combobox",
              "aria-autocomplete": "list",
              "aria-expanded": M.length > 0,
              "aria-controls": z,
              "aria-activedescendant": M[j] ? `${z}-${j}` : void 0,
              "aria-describedby": [O, g && C].filter(Boolean).join(" ") || void 0,
              "aria-invalid": a ? !0 : x["aria-invalid"],
              value: H,
              onChange: (u) => {
                W(u.target.value), q(!0), X(0), c?.(u);
              },
              onFocus: (u) => {
                _(!0), q(!0), $?.(u);
              },
              onBlur: (u) => {
                q(!1), N?.(u);
              },
              onKeyDown: Rr({
                options: M,
                activeIndex: j,
                setActiveIndex: X,
                setOpen: q,
                onSelect: I,
                onKeyDown: m
              })
            },
            trailingAction: J && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                disabled: x.disabled,
                "aria-label": "Clear input",
                className: d(
                  "inline-flex size-5 items-center justify-center text-text-secondary [&_svg]:size-4",
                  Te[A]
                ),
                onMouseDown: (u) => u.preventDefault(),
                onClick: () => {
                  I(""), G.current?.focus();
                },
                children: /* @__PURE__ */ t(Aa, { className: "size-4", "aria-hidden": "true" })
              }
            )
          }
        ),
        M.length > 0 && /* @__PURE__ */ t("ul", { id: z, role: "listbox", className: d(Oa, "relative"), children: M.map((u, b) => /* @__PURE__ */ t(
          "li",
          {
            id: `${z}-${b}`,
            role: "option",
            "aria-selected": j === b,
            className: d(
              "cursor-pointer px-4 py-2 hover:bg-action-hover",
              j === b && "bg-action-selected"
            ),
            onMouseDown: (F) => F.preventDefault(),
            onClick: () => I(u),
            children: u
          },
          u
        )) }),
        g && /* @__PURE__ */ t(
          ie,
          {
            variant: "body2",
            tone: a ? "error" : "muted",
            id: C,
            role: a ? "alert" : void 0,
            "aria-live": "polite",
            className: d("leading-[inherit]", a ? Ue : "mt-1"),
            children: g
          }
        )
      ]
    }
  );
}
function Xr({
  className: e,
  label: a,
  iconLeft: r,
  iconRight: i,
  size: o = "md",
  width: s = "default",
  variant: n = "default",
  tone: l = "primary",
  outline: v = !1,
  shape: c = "rectangle",
  children: f,
  ...p
}) {
  const y = de(n, l), w = v ? "outline" : ye[n];
  return /* @__PURE__ */ P(
    "button",
    {
      className: d(Er({ size: o, width: s, shape: c }), ee[y][w], e),
      "data-size": o,
      "data-variant": n,
      "data-tone": y,
      "data-width": s,
      "data-shape": c,
      "data-outline": v,
      ...p,
      children: [
        r && /* @__PURE__ */ t("span", { className: "inline-flex size-5 shrink-0 items-center justify-center", "aria-hidden": "true", children: r }),
        f ?? a,
        i && /* @__PURE__ */ t("span", { className: "inline-flex size-5 shrink-0 items-center justify-center", "aria-hidden": "true", children: i })
      ]
    }
  );
}
function _e({
  level: e,
  variant: a = "default",
  weight: r = "bold",
  family: i,
  tone: o = "default",
  textTransform: s = "none",
  className: n,
  children: l,
  ...v
}) {
  const c = Ta({ level: e, variant: a });
  return /* @__PURE__ */ t(
    c,
    {
      className: d(
        "m-0",
        Ur({ level: e, variant: a, weight: r, tone: o, textTransform: s }),
        n
      ),
      ...v,
      children: l
    }
  );
}
const Hr = {
  small: "max-w-sm",
  medium: "max-w-xl",
  large: "max-w-3xl",
  full: "max-w-none"
}, na = 'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';
function qe({
  open: e,
  onClose: a,
  title: r,
  ariaLabel: i,
  description: o,
  children: s,
  size: n = "medium",
  closeOnBackdrop: l = !0,
  showCloseButton: v = !0,
  closeButtonLabel: c = "Close dialog",
  className: f,
  panelClassName: p,
  titleClassName: y,
  headerClassName: w,
  contentClassName: S,
  closeButtonClassName: O,
  ...$
}) {
  const N = te(), m = te(), x = re(null), T = re(a);
  return T.current = a, oe(() => {
    if (!e) return;
    const G = document.activeElement, A = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const D = x.current;
    (D?.querySelectorAll(na)?.[0] ?? D)?.focus();
    const z = (g) => {
      if (g.key === "Escape") {
        g.preventDefault(), T.current();
        return;
      }
      if (g.key !== "Tab" || !D) return;
      const C = Array.from(D.querySelectorAll(na)).filter(
        (R) => !R.hasAttribute("hidden") && R.getAttribute("aria-hidden") !== "true"
      ), h = C[0], W = C[C.length - 1];
      h ? g.shiftKey && (document.activeElement === h || document.activeElement === D) ? (g.preventDefault(), W?.focus()) : !g.shiftKey && document.activeElement === W && (g.preventDefault(), h.focus()) : (g.preventDefault(), D.focus());
    };
    return document.addEventListener("keydown", z), () => {
      document.removeEventListener("keydown", z), document.body.style.overflow = A, G instanceof HTMLElement && G.isConnected && G.focus();
    };
  }, [e]), !e || typeof document > "u" ? null : Fa(
    /* @__PURE__ */ t(
      "div",
      {
        className: d(
          "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-backdrop-overlay p-4 sm:p-6",
          f
        ),
        onMouseDown: (G) => {
          l && G.target === G.currentTarget && (G.preventDefault(), a());
        },
        children: /* @__PURE__ */ P(
          "div",
          {
            ...$,
            ref: x,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": r !== void 0 ? N : void 0,
            "aria-label": r === void 0 ? i : void 0,
            "aria-describedby": o != null ? m : void 0,
            tabIndex: -1,
            className: d(
              "relative my-auto w-full rounded-md border border-border-subtle bg-background-surface p-5 text-text-primary shadow-xl outline-none sm:p-6",
              Hr[n],
              p
            ),
            children: [
              (r !== void 0 || v) && /* @__PURE__ */ P("div", { className: d("mb-4 flex items-start justify-between gap-4", w), children: [
                r !== void 0 && /* @__PURE__ */ t(
                  _e,
                  {
                    level: "h2",
                    weight: "semibold",
                    id: N,
                    className: d("min-w-0 text-20 leading-[inherit]", y),
                    children: r
                  }
                ),
                v && /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: a,
                    "aria-label": c,
                    className: d(
                      "ml-auto inline-flex size-9 shrink-0 items-center justify-center rounded-full text-text-primary hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
                      O
                    ),
                    children: /* @__PURE__ */ t(va, { "aria-hidden": "true", className: "size-5" })
                  }
                )
              ] }),
              o != null && /* @__PURE__ */ t(ie, { tone: "muted", id: m, className: "mb-4 leading-[inherit]", children: o }),
              /* @__PURE__ */ t("div", { className: S, children: s })
            ]
          }
        )
      }
    ),
    document.body
  );
}
const ce = (e) => e.id || e.src, Ie = (e, a) => e.alt.trim() || `Product image ${a + 1}`, ge = "inline-flex size-8 shrink-0 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-45";
function Jr(e, a) {
  if (!Number.isInteger(e))
    throw new RangeError("Carousel initialIndex must be a finite integer.");
  return Math.min(Math.max(e, 0), Math.max(a - 1, 0));
}
function bi({
  images: e,
  className: a,
  likeButton: r = !0,
  variant: i = "outline",
  tone: o = "primary",
  initialIndex: s = 0,
  onImageChange: n,
  showThumbnails: l = !0,
  thumbnailsPosition: v = "bottom",
  showIndicators: c = !0,
  ariaLabel: f = "Product image gallery",
  ofText: p = "of",
  breakpoint: y = "desktop",
  openOnClick: w = !0
}) {
  const [S, O] = V(() => Jr(s, e.length)), [$, N] = V(!1), [m, x] = V(0), [T, G] = V({}), [A, D] = V({}), L = Math.min(S, Math.max(0, e.length - 1)), z = e[L], g = v === "bottom" ? 8 : 5, C = y === "mobile", h = C ? "10rem" : y === "tablet" ? "15rem" : "25rem", W = {
    "--carousel-thumb-size": C ? "3.25rem" : y === "tablet" ? "3.75rem" : "4.5rem"
  }, R = i === "primary" || i === "secondary", _ = de(i, o), K = ye[i], q = d(pe[_], "focus-visible:outline-current"), j = R ? d("bg-background-surface hover:bg-action-hover", q) : ee[_][K], X = R ? "border border-border-subtle bg-background-surface text-text-primary" : ee[_][K];
  if (oe(() => {
    O((u) => Math.min(u, Math.max(e.length - 1, 0))), x((u) => Math.min(u, Math.max(e.length - g, 0))), e.length || N(!1);
  }, [e.length, g]), !z)
    return /* @__PURE__ */ t(
      "div",
      {
        className: d("rounded-md px-4 py-6 text-center font-sans text-13", X, a),
        "data-variant": i,
        "data-tone": _,
        children: "No product images available."
      }
    );
  const H = (u) => x((b) => u < b ? u : u >= b + g ? u - g + 1 : b), k = (u) => {
    const b = (u + e.length) % e.length;
    O(b), H(b), n?.(b, e[b]);
  }, E = (u) => {
    const b = getComputedStyle(u), F = {};
    for (const Y of b)
      Y.startsWith("--") && (F[Y] = b.getPropertyValue(Y));
    D(F), u.focus(), H(L), N(!0);
  }, J = d(
    "min-w-0",
    l && v !== "bottom" && !C && (v === "left" ? "grid grid-cols-[var(--carousel-thumb-size)_minmax(0,1fr)] gap-4" : "grid grid-cols-[minmax(0,1fr)_var(--carousel-thumb-size)] gap-4")
  ), Q = v === "bottom" ? { gridTemplateColumns: `repeat(${Math.min(g, e.length)}, var(--carousel-thumb-size))` } : { gridTemplateRows: `repeat(${Math.min(g, e.length)}, var(--carousel-thumb-size))` }, M = (u, b = !1) => {
    if (!l || C || v !== u) return null;
    const F = b ? m : 0, Y = e.length - g + 1, ae = /* @__PURE__ */ t(
      "div",
      {
        className: d("grid gap-2.5 overflow-hidden p-1", u === "bottom" ? "justify-center" : "content-start"),
        style: Q,
        children: e.slice(F, F + g).map((Z, He) => {
          const be = F + He, he = !b && w && e.length > g && He === g - 1;
          return /* @__PURE__ */ P(
            "button",
            {
              type: "button",
              className: d(
                "relative aspect-square w-full overflow-hidden rounded-md border border-border-subtle bg-background-surface p-0 leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                q,
                !he && L === be && "border-current ring-2 ring-current ring-offset-2 ring-offset-background-surface"
              ),
              "aria-label": he ? `Open image gallery (${Y} more)` : `Select ${Ie(Z, be)}`,
              "aria-current": !he && L === be ? "true" : void 0,
              onClick: (Ia) => {
                he ? E(Ia.currentTarget) : k(be);
              },
              children: [
                /* @__PURE__ */ t(
                  "img",
                  {
                    src: Z.thumbnailSrc || Z.src,
                    alt: "",
                    "aria-hidden": "true",
                    className: "block size-full object-cover"
                  }
                ),
                he && /* @__PURE__ */ t("span", { className: "absolute inset-0 flex items-center justify-center bg-backdrop-overlay", children: /* @__PURE__ */ P("span", { className: "rounded-md bg-background-surface px-2 py-1 text-13 font-semibold text-text-primary", children: [
                  "+",
                  Y
                ] }) })
              ]
            },
            `${ce(Z)}-${be}`
          );
        })
      }
    );
    return b ? /* @__PURE__ */ P(
      "div",
      {
        className: d(
          "grid items-center gap-2.5",
          u === "bottom" ? "grid-cols-[auto_minmax(0,1fr)_auto]" : "content-start"
        ),
        children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: d(ge, j, "justify-self-center"),
              "aria-label": "Previous thumbnails",
              disabled: m <= 0,
              onClick: () => x((Z) => Math.max(0, Z - 1)),
              children: u === "bottom" ? /* @__PURE__ */ t(Qe, { className: "size-4" }) : /* @__PURE__ */ t(pa, { className: "size-4" })
            }
          ),
          ae,
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: d(ge, j, "justify-self-center"),
              "aria-label": "Next thumbnails",
              disabled: m + g >= e.length,
              onClick: () => x((Z) => Math.min(e.length - g, Z + 1)),
              children: u === "bottom" ? /* @__PURE__ */ t(Ye, { className: "size-4" }) : /* @__PURE__ */ t(Fe, { className: "size-4" })
            }
          )
        ]
      }
    ) : ae;
  }, I = (u = !1) => /* @__PURE__ */ P(
    "div",
    {
      className: "relative flex w-full min-w-0 items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-background-surface",
      style: { height: h },
      children: [
        z.badge && /* @__PURE__ */ t(
          "span",
          {
            className: d(
              "absolute left-4 top-4 z-10 rounded-md px-2 py-1 text-12 font-semibold text-misc-bg-white",
              ee[_].solid
            ),
            children: z.badge
          }
        ),
        r && z.likeButton !== !1 && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: d(
              ge,
              T[ce(z)] ? ee.error.label : j,
              "absolute right-4 top-4 z-10 rounded-full"
            ),
            "aria-label": T[ce(z)] ? "Remove from favorites" : "Add to favorites",
            "aria-pressed": !!T[ce(z)],
            onClick: () => G((b) => ({ ...b, [ce(z)]: !b[ce(z)] })),
            children: /* @__PURE__ */ t(Ea, { className: "size-6", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ t(
          "img",
          {
            src: z.src,
            alt: Ie(z, L),
            className: d("block size-full object-cover", !u && w && "cursor-zoom-in"),
            ...!u && w ? {
              role: "button",
              "aria-label": `Open image gallery: ${Ie(z, L)}`,
              tabIndex: 0,
              onClick: (b) => E(b.currentTarget),
              onKeyDown: (b) => {
                (b.key === "Enter" || b.key === " ") && (b.preventDefault(), E(b.currentTarget));
              }
            } : {}
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "aria-label": "Previous image",
            className: d(ge, j, "absolute left-4 top-1/2 -translate-y-1/2"),
            onClick: () => k(L - 1),
            children: /* @__PURE__ */ t(Qe, { className: "size-4", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "aria-label": "Next image",
            className: d(ge, j, "absolute right-4 top-1/2 -translate-y-1/2"),
            onClick: () => k(L + 1),
            children: /* @__PURE__ */ t(Ye, { className: "size-4", "aria-hidden": "true" })
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ P(
    "section",
    {
      "aria-label": f,
      className: d("grid w-full min-w-0 gap-4 rounded-md p-6 font-sans", X, a),
      "data-variant": i,
      "data-tone": _,
      style: W,
      children: [
        /* @__PURE__ */ P("div", { className: J, children: [
          M("left"),
          I(),
          M("right")
        ] }),
        !C && (c || l && v === "bottom") && /* @__PURE__ */ P("div", { className: "grid gap-2 rounded-md border border-border-subtle p-4", children: [
          c && /* @__PURE__ */ t("div", { className: "flex items-center justify-center gap-2", children: e.map((u, b) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "aria-label": `Go to image ${b + 1}`,
              "aria-current": L === b ? "true" : void 0,
              className: d(
                "size-2.5 rounded-full border border-border-subtle p-0",
                L === b ? ee[_].solid : "bg-background-surface"
              ),
              onClick: () => k(b)
            },
            `${ce(u)}-${b}`
          )) }),
          M("bottom")
        ] }),
        /* @__PURE__ */ P(
          qe,
          {
            open: $,
            onClose: () => N(!1),
            title: `Image gallery: ${L + 1} ${p} ${e.length}`,
            closeButtonLabel: "Close image gallery",
            className: "z-[1000] p-4 sm:p-4",
            panelClassName: d(
              "grid max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)] overflow-hidden p-0 font-sans sm:p-0",
              y === "tablet" ? "max-w-3xl" : C ? "max-h-dvh max-w-none" : "max-w-5xl"
            ),
            headerClassName: "mb-0 items-center border-b border-border-subtle p-4",
            titleClassName: "text-24 font-medium leading-28",
            closeButtonClassName: d(ge, j),
            contentClassName: d("grid gap-4 overflow-auto p-4", C && "gap-2 p-2"),
            style: { ...A, ...W },
            children: [
              /* @__PURE__ */ P("div", { className: J, children: [
                M("left", !0),
                I(!0),
                M("right", !0)
              ] }),
              M("bottom", !0)
            ]
          }
        )
      ]
    }
  );
}
function hi({
  className: e,
  inputClassName: a,
  label: r,
  helperText: i,
  error: o,
  variant: s = "outlined",
  tone: n = "primary",
  size: l = "normal",
  iconLeft: v,
  iconRight: c,
  outsideIconLeft: f,
  outsideIconRight: p,
  handleActions: y,
  id: w,
  type: S = "text",
  "aria-describedby": O,
  onFocus: $,
  onBlur: N,
  onChange: m,
  value: x,
  defaultValue: T,
  disabled: G,
  required: A,
  ...D
}) {
  const L = te(), z = w ?? L, [g, C] = V(!1), [h, W] = V(T ?? ""), R = String(x ?? h).length > 0, { appearance: _, accent: K } = Ge(s, n, o), q = o ?? i, j = `${z}-${o ? "error" : "helper"}`, X = [O, q ? j : void 0].filter(Boolean).join(" ") || void 0, H = (k) => y ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      disabled: G,
      onClick: y,
      className: d(
        "inline-flex min-w-[26px] items-center justify-center self-stretch disabled:opacity-45 [&_svg]:size-[26px]",
        pe[K]
      ),
      "aria-label": `${r ?? "Input"} action`,
      children: k
    }
  ) : /* @__PURE__ */ t(
    "span",
    {
      "aria-hidden": "true",
      className: d(
        "inline-flex min-w-[26px] items-center justify-center self-stretch [&_svg]:size-[26px]",
        pe[K]
      ),
      children: k
    }
  );
  return /* @__PURE__ */ P("div", { className: d("w-full max-w-sm font-sans", e), children: [
    /* @__PURE__ */ P("div", { className: "flex items-stretch gap-2", children: [
      f && H(f),
      /* @__PURE__ */ t("div", { className: "relative min-w-0 flex-1", children: /* @__PURE__ */ t(
        La,
        {
          appearance: _,
          accent: K,
          size: l,
          label: r,
          error: o,
          floating: R,
          focused: g,
          iconLeft: v,
          iconRight: c,
          inputProps: {
            ...D,
            id: z,
            type: S,
            disabled: G,
            required: A,
            value: x,
            defaultValue: T,
            "aria-describedby": X,
            "aria-invalid": o ? !0 : D["aria-invalid"],
            className: a,
            onFocus: (k) => {
              C(!0), $?.(k);
            },
            onBlur: (k) => {
              C(!1), N?.(k);
            },
            onChange: (k) => {
              W(k.target.value), m?.(k);
            }
          }
        }
      ) }),
      p && H(p)
    ] }),
    q && /* @__PURE__ */ t(
      ie,
      {
        variant: "body2",
        tone: o ? "error" : "muted",
        id: j,
        role: o ? "alert" : void 0,
        "aria-live": "polite",
        className: d("leading-[inherit]", o ? Ue : "mt-1"),
        children: q
      }
    )
  ] });
}
function xi({
  className: e,
  label: a,
  helperText: r,
  error: i,
  variant: o = "outlined",
  tone: s = "primary",
  size: n = "normal",
  id: l,
  "aria-describedby": v,
  ...c
}) {
  const f = te(), { appearance: p, accent: y } = Ge(o, s, i), w = l ?? f, S = i ?? r, O = `${w}-${i ? "error" : "helper"}`, $ = re(null), [N, m] = V(), [x, T] = V(!1), [G, A] = V(String(c.defaultValue ?? "")), D = String(c.value ?? G).length > 0, L = D || !c.placeholder, z = !!(a && D && p === "outlined"), g = !!(z && N !== void 0), C = Me({ disabled: c.disabled, error: i, active: x, accent: y });
  return oe(() => {
    if (!a || !D || p !== "outlined") return;
    const h = $.current?.offsetWidth;
    h && m(h);
  }, [p, D, a, c.required]), /* @__PURE__ */ P("div", { className: d("relative w-full max-w-sm font-sans", e), children: [
    a && p === "standard" && D && L && /* @__PURE__ */ t(
      fe,
      {
        ref: $,
        htmlFor: w,
        required: c.required,
        className: d("absolute left-0 top-0 z-10 mb-0 pl-4", C),
        children: a
      }
    ),
    /* @__PURE__ */ P(
      "div",
      {
        className: d(
          Ve({ variant: p, size: n, disabled: c.disabled, notched: g }),
          "items-start",
          z && "group mt-2 bg-background-surface",
          a && D && p === "standard" && "mt-2",
          !c.disabled && Da[y]
        ),
        children: [
          g && N !== void 0 && /* @__PURE__ */ t(Ke, { width: N, accent: y, disabled: c.disabled }),
          a && !(p === "standard" && D && L) && /* @__PURE__ */ t(
            fe,
            {
              ref: $,
              htmlFor: w,
              required: c.required,
              className: d(
                je({ appearance: p, floating: D, visible: L, multiline: !0 }),
                C
              ),
              children: a
            }
          ),
          /* @__PURE__ */ t(
            "textarea",
            {
              ...c,
              id: w,
              value: c.value,
              defaultValue: c.defaultValue,
              "aria-invalid": i ? !0 : c["aria-invalid"],
              "aria-describedby": [v, S && O].filter(Boolean).join(" ") || void 0,
              className: d(
                Sa,
                "min-h-12 resize-y",
                D && p === "filled" && a && "pt-5 pb-[3px] focus:pb-[2px]",
                D && p !== "filled" && a && "pt-4",
                D && p === "standard" && a && "pb-[7px] focus:pb-[6px]",
                z && "relative z-20 mt-3 pt-1"
              ),
              onFocus: (h) => {
                T(!0), c.onFocus?.(h);
              },
              onBlur: (h) => {
                T(!1), c.onBlur?.(h);
              },
              onChange: (h) => {
                A(h.target.value), c.onChange?.(h);
              }
            }
          )
        ]
      }
    ),
    S && /* @__PURE__ */ t(
      ie,
      {
        variant: "body2",
        tone: i ? "error" : "muted",
        id: O,
        role: i ? "alert" : void 0,
        "aria-live": "polite",
        className: d("leading-[inherit]", i ? Ue : "mt-1"),
        children: S
      }
    )
  ] });
}
const sa = ve((e) => e.outline);
function Pi({
  className: e,
  label: a,
  placeholder: r,
  helperText: i,
  error: o,
  variant: s = "default",
  tone: n = "primary",
  size: l = "normal",
  iconLeft: v,
  showSelectionCheck: c = !1,
  id: f,
  children: p,
  defaultValue: y,
  value: w,
  onChange: S,
  "aria-describedby": O,
  ...$
}) {
  const N = te(), { appearance: m, accent: x } = Ge(s === "default" ? "outlined" : s, n, o), T = f ?? N, G = re(null), A = re(null), D = ca.toArray(p).filter(ua), [L, z] = V(String(y ?? D[0]?.props.value ?? "")), [g, C] = V(!1), h = String(w ?? L), W = D.find((I) => String(I.props.value ?? "") === h), R = h.length > 0 || !r && !!W?.props.children, _ = R || !r, K = !!(a && R && m === "outlined"), q = !!K, j = o ?? i, X = `${T}-${o ? "error" : "helper"}`, H = [O, j && X].filter(Boolean).join(" ") || void 0, [k, E] = V(), J = re(null), Q = Me({ disabled: $.disabled, error: o, active: g, accent: x });
  oe(() => {
    if (!a || !R || m !== "outlined") return;
    const I = J.current?.offsetWidth;
    I && E(I);
  }, [m, R, a, $.required]);
  const M = (I) => {
    z(I), C(!1), G.current && (G.current.value = I, G.current.dispatchEvent(new Event("change", { bubbles: !0 }))), A.current?.focus();
  };
  return /* @__PURE__ */ P(
    "div",
    {
      className: d("relative w-full max-w-sm font-sans", e),
      onBlur: (I) => {
        I.currentTarget.contains(I.relatedTarget) || C(!1);
      },
      children: [
        a && m === "standard" && R && _ && /* @__PURE__ */ t(
          fe,
          {
            ref: J,
            id: `${T}-label`,
            htmlFor: T,
            required: $.required,
            className: d("absolute left-0 top-0 z-10 mb-0 pl-4", Q),
            children: a
          }
        ),
        /* @__PURE__ */ t(
          "select",
          {
            ...$,
            size: typeof l == "number" ? l : void 0,
            id: T,
            ref: G,
            className: "sr-only",
            tabIndex: -1,
            value: h,
            "aria-describedby": H,
            "aria-invalid": o ? !0 : $["aria-invalid"],
            onChange: (I) => {
              z(I.target.value), S?.(I);
            },
            children: p
          }
        ),
        /* @__PURE__ */ P(
          "button",
          {
            ref: A,
            type: "button",
            disabled: $.disabled,
            "aria-labelledby": a ? `${T}-label` : void 0,
            "aria-label": a ? void 0 : $["aria-label"] ?? r ?? "Select an option",
            "aria-describedby": H,
            "aria-haspopup": "listbox",
            "aria-expanded": g,
            "aria-controls": g ? `${T}-options` : void 0,
            "aria-invalid": o ? !0 : void 0,
            className: d(
              Ve({
                variant: m,
                size: typeof l == "number" ? "normal" : l,
                disabled: $.disabled,
                iconLeft: !!v,
                iconRight: !0,
                notched: q
              }),
              "group text-left",
              K && "group mt-2 bg-background-surface",
              a && R && m === "standard" && "mt-2",
              !$.disabled && sa[x]
            ),
            onClick: () => C((I) => !I),
            onKeyDown: (I) => {
              I.key === "Escape" && C(!1), I.key === "ArrowDown" && (I.preventDefault(), C(!0));
            },
            onBlur: (I) => {
              I.currentTarget.parentElement?.contains(I.relatedTarget) || C(!1);
            },
            children: [
              q && k !== void 0 && /* @__PURE__ */ t(
                Ke,
                {
                  width: k,
                  accent: x,
                  disabled: $.disabled,
                  borderClass: sa[x]
                }
              ),
              a && !(m === "standard" && R && _) && /* @__PURE__ */ t(
                fe,
                {
                  ref: J,
                  id: `${T}-label`,
                  htmlFor: T,
                  required: $.required,
                  className: d(
                    je({ appearance: m, floating: R, visible: _, iconLeft: !!v, size: l }),
                    Q
                  ),
                  children: a
                }
              ),
              v && /* @__PURE__ */ t(
                "span",
                {
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center [&_svg]:size-5",
                    Te[m]
                  ),
                  "aria-hidden": "true",
                  children: v
                }
              ),
              /* @__PURE__ */ t(
                "span",
                {
                  className: d(
                    "flex flex-1 items-center py-2 leading-5",
                    !R && Te[m],
                    m === "filled" && R && a && "self-stretch py-0 pt-[18px]",
                    K && "relative z-20"
                  ),
                  children: W?.props.children ?? r ?? "Select an option"
                }
              ),
              /* @__PURE__ */ t(
                "span",
                {
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center",
                    Te[m]
                  ),
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ t(Fe, { className: "size-4" })
                }
              )
            ]
          }
        ),
        g && /* @__PURE__ */ t("ul", { id: `${T}-options`, role: "listbox", "aria-label": a ?? "Options", className: Oa, children: D.map((I) => {
          const u = String(I.props.value ?? ""), b = u !== "" && u === h;
          return /* @__PURE__ */ P(
            "li",
            {
              role: "option",
              "aria-selected": b,
              "aria-disabled": I.props.disabled,
              tabIndex: I.props.disabled ? void 0 : 0,
              className: d(
                "flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-action-hover focus:bg-action-hover focus:outline-none",
                b && "bg-action-selected",
                I.props.disabled && "cursor-not-allowed text-text-secondary"
              ),
              onMouseDown: (F) => F.preventDefault(),
              onClick: () => {
                I.props.disabled || M(u);
              },
              onKeyDown: (F) => {
                !I.props.disabled && (F.key === "Enter" || F.key === " ") && (F.preventDefault(), M(u)), F.key === "Escape" && (C(!1), A.current?.focus());
              },
              children: [
                I.props.children,
                c && b && /* @__PURE__ */ t(Ra, { className: d("size-4", pe[x]), "aria-hidden": "true" })
              ]
            },
            u
          );
        }) }),
        j && /* @__PURE__ */ t(
          ie,
          {
            variant: "body2",
            tone: o ? "error" : "muted",
            id: X,
            role: o ? "alert" : void 0,
            "aria-live": "polite",
            className: "mt-1 leading-[inherit]",
            children: j
          }
        )
      ]
    }
  );
}
const Qr = (e) => [e, ...Pa.filter((a) => a !== e)].map((a) => Ce(a, "graphic"));
function Yr({
  x: e,
  y: a,
  children: r,
  horizontalOffset: i,
  verticalOffset: o,
  textColor: s
}) {
  const n = re(null), [l, v] = V({ width: 1, height: 1 });
  return Ba(() => {
    const c = n.current;
    if (!c) return;
    const f = (y, w) => {
      y = Math.ceil(y), w = Math.ceil(w), v((S) => S.width === y && S.height === w ? S : { width: y, height: w });
    };
    f(c.offsetWidth, c.offsetHeight);
    const p = new ResizeObserver(([y]) => {
      f(y.contentRect.width + 2, y.contentRect.height + 2);
    });
    return p.observe(c), () => p.disconnect();
  }, []), /* @__PURE__ */ t(
    "foreignObject",
    {
      x: Number(e) - l.width * i,
      y: Number(a) - l.height * o,
      width: l.width,
      height: l.height,
      overflow: "visible",
      children: /* @__PURE__ */ t(
        "div",
        {
          ref: n,
          className: "w-max whitespace-nowrap bg-background-surface p-px font-sans text-13 leading-20 text-text-primary",
          style: s ? { color: s } : void 0,
          children: r
        }
      )
    }
  );
}
const ki = ({
  type: e = "line",
  tone: a = "primary",
  data: r,
  series: i,
  colors: o,
  gridColor: s,
  textColor: n,
  tooltipBgColor: l,
  tooltipBorderColor: v,
  xAxisKey: c = "name",
  title: f,
  description: p,
  ariaLabel: y,
  height: w = 300,
  strokeWidth: S = 2,
  dot: O = { r: 4 },
  activeDot: $ = { r: 6 },
  fillOpacity: N = 0.2,
  barRadius: m = [4, 4, 0, 0],
  outerRadius: x = 80,
  innerRadius: T,
  showGrid: G = !0,
  showTooltip: A = !0,
  showLegend: D = !0,
  isAnimationActive: L = !0,
  className: z
}) => {
  const g = te(), C = `${g}-title`, h = `${g}-desc`, W = Je(() => o && o.length > 0 ? o : Qr(a), [o, a]), R = Ae(
    (u, b) => u.color || W[b % W.length],
    [W]
  ), { gridColor: _, textColor: K, customTooltipStyle: q, tooltipItemStyle: j, tooltipLabelStyle: X, legendStyle: H } = Je(() => {
    const u = s || "var(--border-subtle)", b = n || "var(--text-primary)", F = l || "var(--background-surface)", Y = v || "var(--border-subtle)", ae = "var(--font-family)", Z = "var(--font-size-13)";
    return {
      gridColor: u,
      textColor: b,
      customTooltipStyle: {
        backgroundColor: F,
        borderColor: Y,
        borderRadius: "var(--radius-md)",
        color: b,
        fontSize: Z,
        fontFamily: ae
      },
      tooltipItemStyle: {
        color: b,
        fontSize: Z,
        fontFamily: ae
      },
      tooltipLabelStyle: {
        color: Ce(a, "text"),
        fontSize: Z,
        fontFamily: ae,
        fontWeight: 600
      },
      legendStyle: {
        color: b,
        fontSize: Z,
        fontFamily: ae
      }
    };
  }, [s, n, l, v, a]), k = Ae(
    (u) => /* @__PURE__ */ t("span", { style: { color: K, backgroundColor: "var(--background-surface)" }, children: u }),
    [K]
  ), E = (u, b, F, Y, ae) => /* @__PURE__ */ t(
    Yr,
    {
      x: u,
      y: b,
      horizontalOffset: Y,
      verticalOffset: ae,
      textColor: n,
      children: F
    }
  ), J = ({ x: u, y: b, payload: F }, Y) => E(u, b, F.value, Y === "x" ? 0.5 : 1, Y === "x" ? 0 : 0.5), Q = ({ x: u, y: b, value: F, textAnchor: Y }) => E(u, b, F, Y === "start" ? 0 : 1, 0.5), M = () => [
    G ? /* @__PURE__ */ t(er, { strokeDasharray: "3 3", stroke: _ }, "grid") : null,
    /* @__PURE__ */ t(ar, { dataKey: c, stroke: K, tick: (u) => J(u, "x") }, "xaxis"),
    /* @__PURE__ */ t(rr, { stroke: K, tick: (u) => J(u, "y") }, "yaxis"),
    A ? /* @__PURE__ */ t(
      Ze,
      {
        isAnimationActive: L,
        contentStyle: q,
        itemStyle: j,
        labelStyle: X
      },
      "tooltip"
    ) : null,
    D ? /* @__PURE__ */ t(ea, { wrapperStyle: H, formatter: k }, "legend") : null
  ], I = () => {
    switch (e) {
      case "pie": {
        const b = i[0]?.dataKey || "value", F = c || "name", Y = r.map((ae, Z) => ({
          ...ae,
          fill: ae.fill || ae.color || i[Z]?.color || W[Z % W.length]
        }));
        return /* @__PURE__ */ P(Ya, { children: [
          A && /* @__PURE__ */ t(
            Ze,
            {
              isAnimationActive: L,
              contentStyle: q,
              itemStyle: j,
              labelStyle: X
            }
          ),
          D && /* @__PURE__ */ t(ea, { wrapperStyle: H, formatter: k }),
          /* @__PURE__ */ t(
            Za,
            {
              isAnimationActive: L,
              data: Y,
              dataKey: b,
              nameKey: F,
              cx: "50%",
              cy: "50%",
              innerRadius: T,
              outerRadius: x,
              label: Q
            }
          )
        ] });
      }
      case "bar":
        return /* @__PURE__ */ P(Ja, { data: r, children: [
          M(),
          i.map((u, b) => /* @__PURE__ */ t(
            Qa,
            {
              isAnimationActive: L,
              dataKey: u.dataKey,
              name: u.name || u.dataKey,
              fill: R(u, b),
              radius: u.radius ?? m
            },
            u.dataKey
          ))
        ] });
      case "area":
        return /* @__PURE__ */ P(Xa, { data: r, children: [
          M(),
          i.map((u, b) => {
            const F = R(u, b);
            return /* @__PURE__ */ t(
              Ha,
              {
                isAnimationActive: L,
                type: "monotone",
                dataKey: u.dataKey,
                name: u.name || u.dataKey,
                stroke: F,
                strokeWidth: u.strokeWidth ?? S,
                fill: F,
                fillOpacity: u.fillOpacity ?? N
              },
              u.dataKey
            );
          })
        ] });
      default:
        return /* @__PURE__ */ P(_a, { data: r, children: [
          M(),
          i.map((u, b) => /* @__PURE__ */ t(
            qa,
            {
              isAnimationActive: L,
              type: "monotone",
              dataKey: u.dataKey,
              name: u.name || u.dataKey,
              stroke: R(u, b),
              strokeWidth: u.strokeWidth ?? S,
              dot: u.dot ?? O,
              activeDot: u.activeDot ?? $
            },
            u.dataKey
          ))
        ] });
    }
  };
  return /* @__PURE__ */ P(
    "div",
    {
      className: d(
        "w-full rounded-md border border-border-subtle bg-background-surface p-6 font-sans text-text-primary",
        z
      ),
      "data-tone": a,
      role: "region",
      "aria-label": f ? void 0 : y || "Chart",
      "aria-labelledby": f ? C : void 0,
      "aria-describedby": p ? h : void 0,
      children: [
        (f || p) && /* @__PURE__ */ P("div", { className: "mb-4", children: [
          f && /* @__PURE__ */ t(_e, { id: C, level: "h3", weight: "semiBold", children: f }),
          p && /* @__PURE__ */ t(ie, { variant: "body2", tone: "muted", className: "mt-1 leading-[inherit]", id: h, children: p })
        ] }),
        /* @__PURE__ */ t("div", { className: "sr-only", children: /* @__PURE__ */ P("table", { "aria-label": f ? `${f} data` : y || "Chart data", children: [
          /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ P("tr", { children: [
            /* @__PURE__ */ t("th", { scope: "col", children: c }),
            i.map((u) => /* @__PURE__ */ t("th", { scope: "col", children: u.name || u.dataKey }, u.dataKey))
          ] }) }),
          /* @__PURE__ */ t("tbody", { children: r.map((u, b) => /* @__PURE__ */ P("tr", { children: [
            /* @__PURE__ */ t("td", { children: String(u[c] ?? "") }),
            i.map((F) => /* @__PURE__ */ t("td", { children: String(u[F.dataKey] ?? "") }, F.dataKey))
          ] }, b)) })
        ] }) }),
        /* @__PURE__ */ t(
          "div",
          {
            className: "min-h-48 w-full rounded-md bg-background-surface text-text-primary",
            style: { height: w },
            ...Na(!1, `${f || y || "Chart"} visualization`),
            children: /* @__PURE__ */ t(Ka, { width: "100%", height: "100%", children: I() })
          }
        )
      ]
    }
  );
};
function Se({
  variant: e,
  size: a,
  weight: r,
  family: i,
  tone: o,
  textTransform: s,
  underline: n = "always",
  className: l,
  children: v,
  target: c,
  rel: f,
  ...p
}) {
  return /* @__PURE__ */ t(
    "a",
    {
      ...p,
      target: c,
      rel: c === "_blank" ? [.../* @__PURE__ */ new Set([...f?.split(/\s+/).filter(Boolean) ?? [], "noopener", "noreferrer"])].join(" ") : f,
      className: d(
        Kr({ variant: e, size: a, weight: r, tone: o, textTransform: s, underline: n }),
        l
      ),
      children: v
    }
  );
}
function Zr({ pagination: e, size: a, tone: r, ariaLabel: i }) {
  const { onPageChange: o, previousIcon: s, nextIcon: n, pageStatus: l } = e, v = Math.max(1, Math.ceil(Math.max(0, e.total) / Math.max(1, e.pageSize))), c = Math.min(Math.max(e.page, 1), v), f = d(
    "inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-13 font-semibold disabled:cursor-not-allowed disabled:opacity-45",
    pe[r],
    "hover:enabled:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
  );
  return /* @__PURE__ */ P(
    "nav",
    {
      "aria-label": i,
      className: d(
        "flex items-center justify-end gap-2 border-t border-table-divider",
        a === "small" ? "px-4 py-3" : "px-4 py-4"
      ),
      children: [
        /* @__PURE__ */ P("button", { type: "button", onClick: () => o(c - 1), disabled: c <= 1, className: f, children: [
          s && /* @__PURE__ */ t("span", { className: "inline-flex size-4", "aria-hidden": "true", children: s }),
          /* @__PURE__ */ t("span", { children: "Previous" })
        ] }),
        l != null && /* @__PURE__ */ t("span", { "aria-live": "polite", className: "text-13 text-text-secondary", children: l }),
        /* @__PURE__ */ P(
          "button",
          {
            type: "button",
            onClick: () => o(c + 1),
            disabled: c >= v,
            className: f,
            children: [
              /* @__PURE__ */ t("span", { children: "Next" }),
              n && /* @__PURE__ */ t("span", { className: "inline-flex size-4", "aria-hidden": "true", children: n })
            ]
          }
        )
      ]
    }
  );
}
const ei = { left: "text-left", center: "text-center", right: "text-right" }, ai = {
  solid: "rounded-md",
  label: "rounded-md",
  outline: "rounded-md border",
  text: "rounded-md"
}, ri = ve((e) => e.outline);
function Be(e) {
  return {
    backgroundColor: `var(--table-cell-overlay, ${e})`
  };
}
function ii(e) {
  return e ? ua(e) && typeof e.props.onClick == "function" ? e : /* @__PURE__ */ t("span", { className: "inline-flex size-4 shrink-0 items-center justify-center", "aria-hidden": "true", children: e }) : null;
}
function wi({
  className: e,
  columns: a,
  data: r,
  getRowKey: i,
  pagination: o,
  emptyMessage: s = "No results found.",
  variant: n = "outline",
  tone: l = "primary",
  size: v = "default",
  stickyFirstColumn: c = !1,
  stickyLastColumn: f = !1,
  stickyHeader: p = !1,
  showColumnBorders: y = !1,
  striped: w = !1,
  breakpoint: S,
  ...O
}) {
  const $ = te().replace(/:/g, ""), [N, m] = V(!1), [x, T] = V(!1), G = O["aria-label"] ?? "Data table", A = de(n, l), D = a.some((k) => k.header != null && k.header !== ""), L = D ? ye[n] : "label", z = ee[A][L], g = S !== "mobile", C = "bg-background-surface", h = (k) => g && c && k === 0, W = (k) => g && f && k === a.length - 1, R = (k) => h(k) || W(k), _ = {
    label: Ce(A, "surface"),
    solid: Ce(A),
    outline: "var(--background-surface)",
    text: "var(--background-surface)"
  }, K = Be(_[L]), q = Be("var(--background-surface)"), j = Be("var(--action-hover-surface)"), X = (k, E, J = 0) => {
    if (!R(k) && !(E && p)) return;
    const Q = [
      h(k) && (D || x) && "6px 0 6px -6px var(--action-focus)",
      W(k) && "-6px 0 6px -6px var(--action-focus)"
    ].filter(Boolean);
    return {
      ...E ? K : w && J % 2 === 1 ? j : q,
      boxShadow: Q.length ? Q.join(", ") : void 0
    };
  }, H = (k, E) => d(
    "border-table-divider",
    v === "small" ? "px-4 py-3 text-13" : "px-4 py-4 text-[0.875rem] leading-[1.43]",
    ei[k.align ?? "left"],
    y && E > 0 && !(g && c && E === 1) && !(g && f && E === a.length - 1) && "border-l",
    h(E) && "sticky left-0 z-10",
    !D && h(E) && !x && "border-r border-table-divider",
    W(E) && "sticky right-0 z-10"
  );
  return /* @__PURE__ */ P(
    "div",
    {
      className: d(
        "w-full rounded-lg border border-table-divider bg-background-surface p-4 font-sans shadow-sm",
        e
      ),
      "data-variant": D ? n : "label",
      "data-tone": A,
      "data-size": v,
      children: [
        /* @__PURE__ */ t("div", { className: "relative isolate", children: /* @__PURE__ */ t(
          "div",
          {
            tabIndex: 0,
            role: "region",
            "aria-label": `Scrollable ${G} ${$}`,
            onScroll: (k) => {
              m(k.currentTarget.scrollTop > 0), T(k.currentTarget.scrollLeft > 0);
            },
            className: d(
              "overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-current",
              p && "max-h-80 overflow-auto",
              ai[L],
              ri[A]
            ),
            children: /* @__PURE__ */ P(
              "table",
              {
                ...O,
                "aria-label": G,
                className: d("w-max min-w-full border-separate border-spacing-0 text-text-primary", C),
                children: [
                  D && /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { children: a.map((k, E) => /* @__PURE__ */ P(
                    "th",
                    {
                      scope: "col",
                      style: {
                        ...X(E, !0),
                        borderColor: L === "solid" ? Ce(A, "contrast") : void 0
                      },
                      className: d(
                        H(k, E),
                        "z-10 border-b border-table-divider font-medium text-text-primary",
                        z,
                        L === "outline" && "border-x-0 border-t-0 border-b",
                        R(E) && "z-20",
                        p && "sticky top-0 z-20",
                        p && L !== "label" && "border-b-0",
                        p && R(E) && "z-30",
                        "first:rounded-tl-md last:rounded-tr-md"
                      ),
                      children: [
                        /* @__PURE__ */ P("span", { className: "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-1", children: [
                          k.header,
                          ii(k.sortIcon)
                        ] }),
                        p && /* @__PURE__ */ t(
                          "span",
                          {
                            "aria-hidden": "true",
                            className: d(
                              "pointer-events-none absolute inset-x-0 -bottom-1.5 h-1.5 bg-gradient-to-b from-action-focus to-transparent",
                              L === "label" && !N && "hidden"
                            )
                          }
                        )
                      ]
                    },
                    k.key
                  )) }) }),
                  /* @__PURE__ */ t("tbody", { children: r.length ? r.map((k, E) => /* @__PURE__ */ t("tr", { className: "group", children: a.map((J, Q) => {
                    const M = !D && Q === 0, I = M ? "th" : "td", u = J.fontWeight ?? ((!D || g && c) && Q === 0 ? "semiBold" : "normal"), b = M ? z : d(C, w && E % 2 === 1 && "bg-action-hover");
                    return /* @__PURE__ */ t(
                      I,
                      {
                        scope: M ? "row" : void 0,
                        style: X(Q, M, E),
                        className: d(
                          H(J, Q),
                          "border-b border-table-divider align-middle",
                          b,
                          !M && "group-hover:bg-action-hover",
                          !M && R(Q) && "group-hover:[--table-cell-overlay:var(--action-hover-surface)]",
                          u === "semiBold" ? "font-semibold" : "font-regular",
                          E === r.length - 1 && "border-b-0",
                          !D && E === 0 && Q === 0 && "rounded-tl-md",
                          !D && E === 0 && Q === a.length - 1 && "rounded-tr-md",
                          M && E === r.length - 1 && "rounded-bl-md"
                        ),
                        children: J.render ? J.render(k, E) : String(k[J.key] ?? "")
                      },
                      J.key
                    );
                  }) }, i?.(k, E) ?? E)) : /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t(
                    "td",
                    {
                      colSpan: Math.max(a.length, 1),
                      className: d(
                        "text-center",
                        v === "small" ? "px-4 py-6 text-13" : "px-4 py-8 text-[0.875rem] leading-[1.43]"
                      ),
                      children: s
                    }
                  ) }) })
                ]
              }
            )
          }
        ) }),
        o && /* @__PURE__ */ t(
          Zr,
          {
            pagination: o,
            size: v === "default" ? "normal" : v,
            tone: A,
            ariaLabel: `Pagination for ${G} ${$}`
          }
        )
      ]
    }
  );
}
function Ci({
  title: e,
  description: a,
  actions: r,
  variant: i = "default",
  tone: o,
  className: s,
  headerClassName: n,
  contentClassName: l,
  children: v,
  ...c
}) {
  const f = de(i, o ?? "primary"), p = ee[f], y = {
    // Default cards stay neutral unless a tone is provided.
    default: d(
      "border border-border-subtle bg-background-surface shadow-sm",
      o !== void 0 && p.label,
      o !== void 0 && "text-text-primary"
    ),
    primary: p.solid,
    secondary: p.solid,
    label: p.label,
    outline: d(p.outline, "bg-background-surface"),
    text: "border-0 bg-transparent shadow-none"
  }, w = d(
    "flex min-h-12 items-start justify-between gap-2.5 px-4 py-4",
    v != null && "border-b border-border-subtle",
    n
  );
  return /* @__PURE__ */ P(
    "section",
    {
      ...c,
      className: d(
        "overflow-hidden rounded-md font-sans text-text-primary transition-colors",
        y[i],
        s
      ),
      "data-variant": i,
      "data-tone": o !== void 0 || i === "primary" || i === "secondary" ? f : void 0,
      children: [
        (e != null || a != null || r != null) && /* @__PURE__ */ P("header", { className: w, children: [
          /* @__PURE__ */ P("div", { className: "min-w-0", children: [
            e != null && /* @__PURE__ */ t("div", { className: d(Ne({ variant: "subtitle1" }), "text-inherit leading-[inherit]"), children: e }),
            a != null && /* @__PURE__ */ t("div", { className: d(Ne({ tone: "muted" }), "mt-1 leading-[inherit]"), children: a })
          ] }),
          r != null && /* @__PURE__ */ t("div", { className: "flex shrink-0 items-center gap-2", children: r })
        ] }),
        v != null && /* @__PURE__ */ t("div", { className: d("px-4 py-4 text-15", l), children: v })
      ]
    }
  );
}
const ti = {
  small: "size-8",
  medium: "size-10",
  large: "size-12"
}, oi = {
  default: "bg-text-primary text-background-surface enabled:hover:opacity-85 focus-visible:outline-text-primary",
  primary: "",
  secondary: "",
  label: "bg-action-hover text-text-primary enabled:hover:opacity-80",
  outline: "border border-border-subtle bg-background-surface text-text-primary enabled:hover:bg-action-hover",
  text: "bg-transparent text-text-primary enabled:hover:bg-action-hover"
};
function li({
  children: e,
  className: a,
  size: r = "medium",
  shape: i = "circular",
  variant: o = "text",
  tone: s,
  type: n = "button",
  ...l
}) {
  const v = ye[o], c = de(o, s ?? "primary"), p = s !== void 0 || o === "primary" || o === "secondary" ? ee[c][v] : oi[o];
  return /* @__PURE__ */ t(
    "button",
    {
      ...l,
      type: n,
      className: d(
        "inline-flex shrink-0 items-center justify-center p-0 transition-colors disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
        ti[r],
        i === "circular" ? "rounded-full" : "rounded-md",
        p,
        a
      ),
      "data-size": r,
      "data-shape": i,
      "data-variant": o,
      "data-tone": s ?? (o === "primary" || o === "secondary" ? c : void 0),
      children: /* @__PURE__ */ t("span", { className: "inline-flex size-5 items-center justify-center", "aria-hidden": "true", children: e })
    }
  );
}
const ni = {
  default: "border border-border-subtle bg-background-surface shadow-lg",
  primary: "",
  secondary: "",
  label: "",
  outline: "border bg-background-surface shadow-md",
  text: "border-0 bg-background-surface shadow-md"
};
function Ti({
  label: e,
  items: a,
  triggerIcon: r,
  triggerAriaLabel: i,
  variant: o = "default",
  tone: s = "primary",
  disabled: n = !1,
  className: l,
  menuClassName: v,
  ...c
}) {
  const [f, p] = V(!1), y = re(null), w = re(null), S = re(null), O = ye[o], $ = de(o, s);
  oe(() => {
    if (!f) return;
    S.current?.querySelector('[role="menuitem"]:not(:disabled)')?.focus();
    const m = (T) => {
      y.current?.contains(T.target) || p(!1);
    }, x = (T) => {
      T.key === "Escape" && (p(!1), w.current?.focus());
    };
    return document.addEventListener("pointerdown", m), document.addEventListener("keydown", x), () => {
      document.removeEventListener("pointerdown", m), document.removeEventListener("keydown", x);
    };
  }, [f]);
  const N = (m) => {
    const x = Array.from(
      S.current?.querySelectorAll('[role="menuitem"]:not(:disabled)') ?? []
    );
    if (x.length === 0) return;
    const T = x.indexOf(document.activeElement);
    let G;
    m.key === "ArrowDown" ? G = (T + 1) % x.length : m.key === "ArrowUp" ? G = (T - 1 + x.length) % x.length : m.key === "Home" ? G = 0 : m.key === "End" && (G = x.length - 1), G !== void 0 && (m.preventDefault(), x[G]?.focus());
  };
  return /* @__PURE__ */ P("div", { ...c, ref: y, className: d("relative inline-flex font-sans", l), children: [
    /* @__PURE__ */ P(
      "button",
      {
        ref: w,
        type: "button",
        disabled: n,
        "aria-label": e ? void 0 : i || "Open menu",
        "aria-haspopup": "menu",
        "aria-expanded": f,
        onClick: () => p((m) => !m),
        className: d(
          "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-15 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-45",
          ee[$][O]
        ),
        "data-variant": o,
        "data-tone": $,
        children: [
          e,
          r && /* @__PURE__ */ t("span", { className: "inline-flex size-4 items-center justify-center", "aria-hidden": "true", children: r })
        ]
      }
    ),
    f && /* @__PURE__ */ t(
      "div",
      {
        ref: S,
        role: "menu",
        "aria-label": e || i || "Menu options",
        onKeyDown: N,
        className: d(
          "absolute right-0 top-full z-50 mt-2 min-w-48 overflow-hidden rounded-md py-1",
          ni[o],
          O === "solid" && o !== "default" && ee[$].solid,
          O === "label" && ee[$].label,
          O === "outline" && `${ee[$].outline} border bg-background-surface`,
          v
        ),
        "data-variant": o,
        "data-tone": $,
        children: a.map((m, x) => /* @__PURE__ */ P("div", { children: [
          m.dividerBefore && /* @__PURE__ */ t("div", { role: "separator", className: "my-1 border-t border-border-subtle" }),
          /* @__PURE__ */ P(
            "button",
            {
              type: "button",
              role: "menuitem",
              disabled: m.disabled,
              onClick: () => {
                m.onSelect?.(), p(!1), w.current?.focus();
              },
              className: "flex min-h-10 w-full items-center gap-3 px-4 text-left text-15 text-text-primary transition-colors hover:bg-action-hover focus-visible:bg-action-hover focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45",
              children: [
                m.icon && /* @__PURE__ */ t("span", { className: "inline-flex size-5 shrink-0 items-center justify-center", "aria-hidden": "true", children: m.icon }),
                /* @__PURE__ */ t("span", { className: "flex-1", children: m.label })
              ]
            }
          )
        ] }, x))
      }
    )
  ] });
}
const si = {
  left: "items-stretch justify-start",
  right: "items-stretch justify-end",
  top: "items-start justify-center",
  bottom: "items-end justify-center"
};
function Di({
  anchor: e = "left",
  width: a = 320,
  height: r = "auto",
  className: i,
  panelClassName: o,
  titleClassName: s,
  style: n,
  open: l,
  closeButtonLabel: v = "Close drawer",
  ...c
}) {
  const f = re(null), [p, y] = V({}), w = e === "left" || e === "right";
  return oe(() => {
    if (!l || !f.current) return;
    const S = getComputedStyle(f.current), O = {};
    for (const $ of S)
      $.startsWith("--") && (O[$] = S.getPropertyValue($));
    y(O);
  }, [l]), /* @__PURE__ */ P(Re, { children: [
    /* @__PURE__ */ t("span", { ref: f, hidden: !0 }),
    /* @__PURE__ */ t(
      qe,
      {
        ...c,
        open: l,
        size: "full",
        closeButtonLabel: v,
        titleClassName: d("self-center text-[19px] leading-22", s),
        className: d("overflow-hidden p-0 sm:p-0", si[e], i),
        panelClassName: d(
          "m-0 max-h-full max-w-full shrink-0 overflow-y-auto overscroll-contain rounded-none font-sans",
          w && "h-full",
          o
        ),
        style: {
          ...p,
          width: w ? a : "100%",
          height: w ? "100%" : r,
          // Explicit styles take precedence over inherited tokens and dimensions.
          ...n
        },
        "data-anchor": e
      }
    )
  ] });
}
function Si({
  brand: e,
  links: a,
  brandHref: r = "#top",
  activeHref: i,
  ariaLabel: o = "Main navigation",
  className: s,
  ...n
}) {
  const [l, v] = V(!1), c = te();
  oe(() => {
    if (!l) return;
    const p = (y) => {
      y.key === "Escape" && v(!1);
    };
    return document.addEventListener("keydown", p), () => document.removeEventListener("keydown", p);
  }, [l]);
  const f = () => a.map((p) => /* @__PURE__ */ t(
    Se,
    {
      underline: "none",
      weight: "medium",
      href: p.href,
      "aria-current": i === p.href ? "page" : void 0,
      onClick: () => v(!1),
      className: d(
        "rounded-sm leading-[inherit] transition-colors hover:text-palette-primary-main focus-visible:outline-offset-4",
        i === p.href ? "text-palette-primary-main" : "text-text-primary"
      ),
      children: p.label
    },
    p.href
  ));
  return /* @__PURE__ */ P(
    "header",
    {
      ...n,
      className: d(
        "sticky top-0 z-40 w-full min-w-0 border-b border-border-subtle bg-background-surface [container-type:inline-size]",
        s
      ),
      children: [
        /* @__PURE__ */ P("div", { className: "mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ t(
            Se,
            {
              underline: "none",
              size: "lg",
              weight: "bold",
              href: r,
              className: "min-w-0 truncate rounded-sm leading-[inherit] focus-visible:outline-offset-4",
              children: e
            }
          ),
          /* @__PURE__ */ t("nav", { "aria-label": o, className: "hidden items-center gap-8 [@container(min-width:768px)]:flex", children: f() }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: "inline-flex size-11 shrink-0 items-center justify-center rounded-md text-text-primary hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current [@container(min-width:768px)]:hidden",
              "aria-label": l ? "Close navigation menu" : "Open navigation menu",
              "aria-expanded": l,
              "aria-controls": c,
              onClick: () => v((p) => !p),
              children: l ? /* @__PURE__ */ t(va, { "aria-hidden": "true", className: "size-6" }) : /* @__PURE__ */ t(Wa, { "aria-hidden": "true", className: "size-6" })
            }
          )
        ] }),
        l && /* @__PURE__ */ t(
          "nav",
          {
            id: c,
            "aria-label": o,
            className: "flex flex-col gap-1 border-t border-border-subtle px-4 py-3 [@container(min-width:768px)]:hidden",
            children: a.map((p) => /* @__PURE__ */ t(
              Se,
              {
                underline: "none",
                weight: "medium",
                href: p.href,
                "aria-current": i === p.href ? "page" : void 0,
                onClick: () => v(!1),
                className: d(
                  "flex min-h-11 items-center rounded-md px-3 py-2.5 leading-[inherit] transition-colors hover:bg-action-hover",
                  i === p.href ? "text-palette-primary-main" : "text-text-primary"
                ),
                children: p.label
              },
              p.href
            ))
          }
        )
      ]
    }
  );
}
const da = "pointer-events-auto [@media(hover:hover)]:pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto", di = [
  { label: "Previous project", direction: -1, position: "left-3", Icon: Va },
  { label: "Next project", direction: 1, position: "right-3", Icon: Ua }
];
function Oi({
  items: e,
  heading: a = "Portfolio",
  allLabel: r = "All",
  ariaLabel: i = "Portfolio projects",
  className: o,
  gridClassName: s,
  showHoverActions: n = !1,
  filterStyle: l = "default",
  onFilterChange: v,
  onProjectClick: c,
  onPreviewOpen: f,
  onPreviewClose: p,
  onPreviewChange: y,
  ...w
}) {
  const [S, O] = V(null), [$, N] = V(null), m = S === null ? e : e.filter((g) => g.category === S), x = $ === null ? void 0 : m[$], T = x !== void 0, G = Array.from(new Set(e.map((g) => g.category))), A = l === "default" || l === "underline", D = Ae(
    (g) => {
      if ($ === null || !m.length) return;
      const C = ($ + g + m.length) % m.length;
      N(C), y?.(m[C]);
    },
    [$, m, y]
  );
  oe(() => {
    if (!T) return;
    const g = (C) => {
      C.key === "ArrowLeft" ? (C.preventDefault(), D(-1)) : C.key === "ArrowRight" && (C.preventDefault(), D(1));
    };
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, [T, D]), oe(() => {
    N(null);
  }, [S]);
  const L = () => {
    N(null), x && p?.(x);
  }, z = (g, C) => {
    C.focus(), N(g), f?.(m[g]);
  };
  return /* @__PURE__ */ P(
    "section",
    {
      ...w,
      "aria-label": i,
      className: d("mx-auto w-full max-w-7xl px-4 py-12 font-sans sm:px-6 lg:px-8", o),
      children: [
        /* @__PURE__ */ t(_e, { level: "h2", className: "mb-6 text-center text-28 leading-[inherit]", children: a }),
        /* @__PURE__ */ t("div", { className: "mb-8 flex flex-wrap justify-center gap-2", role: "group", "aria-label": "Filter projects", children: [null, ...G].map((g) => /* @__PURE__ */ t(
          Xr,
          {
            type: "button",
            size: "sm",
            shape: l === "pill" ? "pill" : "rectangle",
            variant: A ? "text" : S === g ? "default" : "label",
            className: d(
              A && "rounded-none border-b-2 border-transparent text-text-primary",
              A && S === g && "border-palette-primary-text"
            ),
            "aria-pressed": S === g,
            onClick: () => {
              O(g), v?.(g);
            },
            children: g ?? r
          },
          g ?? r
        )) }),
        m.length > 0 ? /* @__PURE__ */ t("ul", { className: d("grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3", s), children: m.map((g, C) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ P("div", { className: "group relative", children: [
          /* @__PURE__ */ P(
            "button",
            {
              type: "button",
              onClick: (h) => z(C, h.currentTarget),
              "aria-label": `View ${g.title}`,
              className: "block w-full overflow-hidden rounded-md border border-border-subtle bg-background-surface text-left shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
              children: [
                /* @__PURE__ */ t("span", { className: "relative block aspect-[4/3] overflow-hidden bg-action-hover", children: /* @__PURE__ */ t(
                  "img",
                  {
                    src: g.image,
                    alt: g.alt,
                    loading: "lazy",
                    className: "size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  }
                ) }),
                /* @__PURE__ */ P("span", { className: d("block p-4", n && "sr-only"), children: [
                  /* @__PURE__ */ t("span", { className: "block text-18 font-semibold text-text-primary", children: g.title }),
                  /* @__PURE__ */ t("span", { className: "mt-1 block text-13 text-text-secondary", children: g.category })
                ] })
              ]
            }
          ),
          n && /* @__PURE__ */ P("div", { className: "pointer-events-none absolute inset-1.5 flex flex-col items-center justify-center gap-4 rounded-sm bg-background-surface text-text-primary transition-opacity duration-300 motion-reduce:transition-none [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100", children: [
            /* @__PURE__ */ t(
              ie,
              {
                size: "sm",
                weight: "semibold",
                textTransform: "uppercase",
                "aria-hidden": "true",
                className: "bg-background-surface text-center tracking-widest transition-transform duration-300 motion-reduce:transition-none [@media(hover:hover)]:invisible [@media(hover:hover)]:group-hover:visible [@media(hover:hover)]:group-focus-within:visible [@media(hover:hover)]:-translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0",
                children: g.title
              }
            ),
            /* @__PURE__ */ P("div", { className: "flex items-center justify-center gap-2 transition-transform duration-300 motion-reduce:transition-none [@media(hover:hover)]:translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0", children: [
              g.href && /* @__PURE__ */ t(
                Se,
                {
                  href: g.href,
                  onClick: () => c?.(g),
                  underline: "none",
                  "aria-label": `Visit ${g.title}`,
                  title: "Visit project",
                  className: d(
                    da,
                    "inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-palette-primary-dark focus:bg-palette-primary-dark focus-visible:outline-palette-primary-graphic",
                    De.primary.default,
                    De.primary.defaultText
                  ),
                  children: /* @__PURE__ */ t(ja, { "aria-hidden": "true", className: "size-4" })
                }
              ),
              /* @__PURE__ */ t(
                li,
                {
                  type: "button",
                  variant: "default",
                  tone: "primary",
                  title: "Preview project",
                  className: da,
                  "aria-label": `Preview ${g.title}`,
                  onClick: (h) => z(C, h.currentTarget),
                  children: /* @__PURE__ */ t(Ma, { "aria-hidden": "true", className: "size-4" })
                }
              )
            ] })
          ] })
        ] }) }, g.id ?? `${g.image}-${g.title}`)) }) : /* @__PURE__ */ t(ie, { tone: "muted", className: "py-8 text-center", children: "No projects in this category." }),
        x && /* @__PURE__ */ P(
          qe,
          {
            open: !0,
            onClose: L,
            title: x.title,
            description: x.category,
            closeButtonLabel: "Close project preview",
            panelClassName: "max-w-5xl p-4 sm:p-6",
            className: "font-sans sm:p-8",
            children: [
              /* @__PURE__ */ P("div", { className: "relative", children: [
                /* @__PURE__ */ t(
                  "img",
                  {
                    src: x.image,
                    alt: x.alt,
                    className: "max-h-[70vh] w-full rounded-md object-contain"
                  }
                ),
                m.length > 1 && di.map(({ label: g, direction: C, position: h, Icon: W }) => /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    "aria-label": g,
                    onClick: () => D(C),
                    className: d(
                      "absolute top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background-surface/90 text-text-primary shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
                      h
                    ),
                    children: /* @__PURE__ */ t(W, { "aria-hidden": "true", className: "size-6" })
                  },
                  C
                ))
              ] }),
              x.description && /* @__PURE__ */ t(ie, { tone: "muted", className: "mt-4", children: x.description }),
              /* @__PURE__ */ P(ie, { variant: "body2", tone: "muted", className: "mt-3 text-right", "aria-live": "polite", children: [
                ($ ?? 0) + 1,
                " of ",
                m.length
              ] })
            ]
          }
        )
      ]
    }
  );
}
const Le = {
  Variables: {
    Dark: {
      Theme: {
        "chip-background": {
          $value: "#e1def514"
        },
        "input-border": {
          $value: "#e1def538",
          $description: "Border style for standard variant Text Field & Select"
        },
        "filled-input-bg": {
          $value: "#e1def50f"
        },
        "backdrop-overlay": {
          $value: "#17192599",
          $description: "Backdrop overlay style"
        },
        "outline-border": {
          $value: "#e1def53d"
        },
        divider: {
          $value: "#e1def51f",
          $description: "Divider fill color"
        },
        "action-focus": {
          $value: "#e1def51a",
          $description: "Fill background for components in focus state (List, Table, etc)"
        },
        "action-disabled-bg": {
          $value: "#e1def529",
          $description: "Fill background for components in disabled state (List, Table, etc)"
        },
        "action-disabled": {
          $value: "#e1def54d",
          $description: "Content color for components in disabled state (Button, List, Table, etc)"
        },
        "action-selected": {
          $value: "#e1def514",
          $description: "Fill background for components in selected state (List, Table, etc)"
        },
        "action-hover": {
          $value: "#e1def50f",
          $description: "Fill background for components in hover state (List, Table, etc)"
        },
        "text-disabled": {
          $value: "#e1def566"
        },
        "text-subtitle": {
          $value: "#e1def58c",
          $description: "Text primary"
        },
        "action-active": {
          $value: "#e1def599",
          $description: "Fill color for components in active state (List, Table, etc)"
        },
        "text-secondary": {
          $value: "#e1def5b2",
          $description: "Text secondary"
        },
        "text-primary": {
          $value: "#e1def5e5",
          $description: "Text primary"
        },
        $type: "color"
      },
      "Color-Palette": {
        "gray-opacity-darker": {
          $value: "{Primitives.Dark.Opacity-Color.Gray.gray-38}"
        },
        "gray-opacity-dark": {
          $value: "{Primitives.Dark.Opacity-Color.Gray.gray-32}"
        },
        "gray-opacity-main": {
          $value: "{Primitives.Dark.Opacity-Color.Gray.gray-24}"
        },
        "gray-opacity-light": {
          $value: "{Primitives.Dark.Opacity-Color.Gray.gray-16}"
        },
        "gray-opacity-lighter": {
          $value: "{Primitives.Dark.Opacity-Color.Gray.gray-8}"
        },
        "success-opacity-darker": {
          $value: "{Primitives.Dark.Opacity-Color.Success.success-38}"
        },
        "success-opacity-dark": {
          $value: "{Primitives.Dark.Opacity-Color.Success.success-32}"
        },
        "success-opacity-main": {
          $value: "{Primitives.Dark.Opacity-Color.Success.success-24}"
        },
        "success-opacity-light": {
          $value: "{Primitives.Dark.Opacity-Color.Success.success-16}"
        },
        "success-opacity-lighter": {
          $value: "{Primitives.Dark.Opacity-Color.Success.success-8}"
        },
        "success-dark": {
          $value: "{Primitives.Dark.Color.Success.success-600}",
          $description: "Alternative dark shade"
        },
        "success-main": {
          $value: "{Primitives.Dark.Color.Success.success-500}",
          $description: "Used for alert component"
        },
        "success-light": {
          $value: "{Primitives.Dark.Color.Success.success-400}",
          $description: "Alternative light shade"
        },
        "info-opacity-darker": {
          $value: "{Primitives.Dark.Opacity-Color.Info.info-38}"
        },
        "info-opacity-dark": {
          $value: "{Primitives.Dark.Opacity-Color.Info.info-32}"
        },
        "info-opacity-main": {
          $value: "{Primitives.Dark.Opacity-Color.Info.info-24}"
        },
        "info-opacity-light": {
          $value: "{Primitives.Dark.Opacity-Color.Info.info-16}"
        },
        "info-opacity-lighter": {
          $value: "{Primitives.Dark.Opacity-Color.Info.info-8}"
        },
        "info-dark": {
          $value: "{Primitives.Dark.Color.Info.info-600}",
          $description: "Alternative dark shade"
        },
        "info-main": {
          $value: "{Primitives.Dark.Color.Info.info-500}",
          $description: "Used for alert component"
        },
        "info-light": {
          $value: "{Primitives.Dark.Color.Info.info-400}",
          $description: "Alternative light shade"
        },
        "warning-opacity-darker": {
          $value: "{Primitives.Dark.Opacity-Color.Warning.warning-38}"
        },
        "warning-opacity-dark": {
          $value: "{Primitives.Dark.Opacity-Color.Warning.warning-32}"
        },
        "warning-opacity-main": {
          $value: "{Primitives.Dark.Opacity-Color.Warning.warning-24}"
        },
        "warning-opacity-light": {
          $value: "{Primitives.Dark.Opacity-Color.Warning.warning-16}"
        },
        "warning-opacity-lighter": {
          $value: "{Primitives.Dark.Opacity-Color.Warning.warning-8}"
        },
        "warning-dark": {
          $value: "{Primitives.Dark.Color.Warning.warning-600}",
          $description: "Alternative dark shade"
        },
        "warning-main": {
          $value: "{Primitives.Dark.Color.Warning.warning-500}",
          $description: "Used for alert component"
        },
        "warning-light": {
          $value: "{Primitives.Dark.Color.Warning.warning-400}",
          $description: "Alternative light shade"
        },
        "error-opacity-darker": {
          $value: "{Primitives.Dark.Opacity-Color.Error.error-38}"
        },
        "error-opacity-dark": {
          $value: "{Primitives.Dark.Opacity-Color.Error.error-32}"
        },
        "error-opacity-main": {
          $value: "{Primitives.Dark.Opacity-Color.Error.error-24}"
        },
        "error-opacity-light": {
          $value: "{Primitives.Dark.Opacity-Color.Error.error-16}"
        },
        "error-opacity-lighter": {
          $value: "{Primitives.Dark.Opacity-Color.Error.error-8}"
        },
        "error-dark": {
          $value: "{Primitives.Dark.Color.Error.error-600}",
          $description: "Alternative dark shade"
        },
        "error-main": {
          $value: "{Primitives.Dark.Color.Error.error-500}",
          $description: "Used for alert component"
        },
        "error-light": {
          $value: "{Primitives.Dark.Color.Error.error-400}",
          $description: "Alternative light shade"
        },
        "secondary-opacity-darker": {
          $value: "{Primitives.Dark.Opacity-Color.Secondary.secondary-38}"
        },
        "secondary-opacity-dark": {
          $value: "{Primitives.Dark.Opacity-Color.Secondary.secondary-32}"
        },
        "secondary-opacity-main": {
          $value: "{Primitives.Dark.Opacity-Color.Secondary.secondary-24}"
        },
        "secondary-opacity-light": {
          $value: "{Primitives.Dark.Opacity-Color.Secondary.secondary-16}"
        },
        "secondary-opacity-lighter": {
          $value: "{Primitives.Dark.Opacity-Color.Secondary.secondary-8}"
        },
        "secondary-dark": {
          $value: "{Primitives.Dark.Color.Secondary.secondary-600}",
          $description: "Alternative dark shade"
        },
        "secondary-main": {
          $value: "{Primitives.Dark.Color.Secondary.secondary-500}",
          $description: "Secondary color used by most components"
        },
        "secondary-light": {
          $value: "{Primitives.Dark.Color.Secondary.secondary-400}",
          $description: "Alternative light shade"
        },
        "primary-opacity-darker": {
          $value: "{Primitives.Dark.Opacity-Color.Primary.primary-38}"
        },
        "primary-opacity-dark": {
          $value: "{Primitives.Dark.Opacity-Color.Primary.primary-32}"
        },
        "primary-opacity-main": {
          $value: "{Primitives.Dark.Opacity-Color.Primary.primary-24}"
        },
        "primary-opacity-light": {
          $value: "{Primitives.Dark.Opacity-Color.Primary.primary-16}"
        },
        "primary-opacity-lighter": {
          $value: "{Primitives.Dark.Opacity-Color.Primary.primary-8}"
        },
        "primary-dark": {
          $value: "{Primitives.Dark.Color.Primary.primary-600}",
          $description: "Alternative dark shade"
        },
        "primary-main": {
          $value: "{Primitives.Dark.Color.Primary.primary-500}",
          $description: "Main color used by most components"
        },
        "primary-light": {
          $value: "{Primitives.Dark.Color.Primary.primary-400}",
          $description: "Alternative light shade"
        },
        $type: "color"
      },
      Padding: {
        "p-1": {
          $value: "{Primitives.Dark.Padding.padding-1}"
        },
        "p-2": {
          $value: "{Primitives.Dark.Padding.padding-2}"
        },
        "p-3": {
          $value: "{Primitives.Dark.Padding.padding-3}"
        },
        "p-4": {
          $value: "{Primitives.Dark.Padding.padding-4}"
        },
        "p-5": {
          $value: "{Primitives.Dark.Padding.padding-5}"
        },
        "p-6": {
          $value: "{Primitives.Dark.Padding.padding-6}"
        },
        "p-7": {
          $value: "{Primitives.Dark.Padding.padding-7}"
        },
        "p-8": {
          $value: "{Primitives.Dark.Padding.padding-8}"
        },
        "p-9": {
          $value: "{Primitives.Dark.Padding.padding-9}"
        },
        "p-10": {
          $value: "{Primitives.Dark.Padding.padding-10}"
        },
        "p-11": {
          $value: "{Primitives.Dark.Padding.padding-11}"
        },
        "p-12": {
          $value: "{Primitives.Dark.Padding.padding-12}"
        },
        "p-13": {
          $value: "{Primitives.Dark.Padding.padding-13}"
        },
        "p-14": {
          $value: "{Primitives.Dark.Padding.padding-14}"
        },
        "p-15": {
          $value: "{Primitives.Dark.Padding.padding-15}"
        },
        "p-16": {
          $value: "{Primitives.Dark.Padding.padding-16}"
        },
        "p-25": {
          $value: "{Primitives.Dark.Padding.padding-25}"
        },
        $type: "dimension"
      },
      Gap: {
        "gap-1": {
          $value: "{Primitives.Dark.Gap.gap-1}"
        },
        "gap-2": {
          $value: "{Primitives.Dark.Gap.gap-2}"
        },
        "gap-3": {
          $value: "{Primitives.Dark.Gap.gap-3}"
        },
        "gap-4": {
          $value: "{Primitives.Dark.Gap.gap-4}"
        },
        "gap-5": {
          $value: "{Primitives.Dark.Gap.gap-5}"
        },
        "gap-6": {
          $value: "{Primitives.Dark.Gap.gap-6}"
        },
        "gap-7": {
          $value: "{Primitives.Dark.Gap.gap-7}"
        },
        "gap-8": {
          $value: "{Primitives.Dark.Gap.gap-8}"
        },
        "gap-9": {
          $value: "{Primitives.Dark.Gap.gap-9}"
        },
        "gap-10": {
          $value: "{Primitives.Dark.Gap.gap-10}"
        },
        "gap-11": {
          $value: "{Primitives.Dark.Gap.gap-11}"
        },
        "gap-12": {
          $value: "{Primitives.Dark.Gap.gap-12}"
        },
        "gap-13": {
          $value: "{Primitives.Dark.Gap.gap-13}"
        },
        "gap-14": {
          $value: "{Primitives.Dark.Gap.gap-14}"
        },
        "gap-15": {
          $value: "{Primitives.Dark.Gap.gap-15}"
        },
        "gap-16": {
          $value: "{Primitives.Dark.Gap.gap-16}"
        },
        $type: "dimension"
      },
      "Border-Radius": {
        "border-radius-xs": {
          $value: "{Primitives.Dark.Border-Radius.border-radius-xs}"
        },
        "border-radius-sm": {
          $value: "{Primitives.Dark.Border-Radius.border-radius-sm}"
        },
        "border-radius-md": {
          $value: "{Primitives.Dark.Border-Radius.border-radius-md}"
        },
        "border-radius-lg": {
          $value: "{Primitives.Dark.Border-Radius.border-radius-lg}"
        },
        "border-radius-xl": {
          $value: "{Primitives.Dark.Border-Radius.border-radius-xl}"
        },
        "border-round": {
          $value: "{Primitives.Dark.Border-Radius.border-round}"
        },
        $type: "dimension"
      },
      Misc: {
        "card-header": {
          $value: "24px",
          $type: "dimension"
        },
        "card-padding": {
          $value: "24px",
          $type: "dimension"
        },
        "card-footer": {
          $value: "24px",
          $type: "dimension"
        },
        "form-gap": {
          $value: "24px",
          $type: "dimension"
        },
        "container-xl": {
          $value: "1140px",
          $type: "dimension"
        },
        paper: {
          $value: "#2f3349",
          $type: "color"
        },
        "body-bg": {
          $value: "#25293c",
          $type: "color"
        },
        "grey-light": {
          $value: "#353a52",
          $type: "color"
        },
        "bg-white": {
          $value: "#ffffff",
          $type: "color"
        },
        "bg-black": {
          $value: "#000000",
          $type: "color"
        },
        "chat-bg": {
          $value: "#202534",
          $type: "color"
        },
        "bg-facebook": {
          $value: "#4267b2",
          $type: "color"
        },
        "bg-twitter": {
          $value: "#1da1f2",
          $type: "color"
        },
        "bg-linkedin": {
          $value: "#007bb6",
          $type: "color"
        },
        "track-bg": {
          $value: "#3a3f57",
          $type: "color"
        },
        "table-header": {
          $value: "#2f3349",
          $type: "color"
        },
        "avatar-bg": {
          $value: "#373b50",
          $type: "color"
        },
        snackbar: {
          $value: "#f7f4ff",
          $type: "color",
          $description: "Snackbar background color"
        }
      }
    },
    Light: {
      Theme: {
        "chip-background": {
          $value: "#2f2b3d14"
        },
        "input-border": {
          $value: "#2f2b3d38",
          $description: "Border style for standard variant Text Field & Select"
        },
        "filled-input-bg": {
          $value: "#2f2b3d0f"
        },
        "backdrop-overlay": {
          $value: "#2f2b3d80",
          $description: "Backdrop overlay style"
        },
        "outline-border": {
          $value: "#2f2b3d3d"
        },
        divider: {
          $value: "#2f2b3d1f",
          $description: "Divider fill color"
        },
        "action-focus": {
          $value: "#2f2b3d1a",
          $description: "Fill background for components in focus state (List, Table, etc)"
        },
        "action-disabled-bg": {
          $value: "#2f2b3d29",
          $description: "Fill background for components in disabled state (List, Table, etc)"
        },
        "action-disabled": {
          $value: "#2f2b3d4d",
          $description: "Content color for components in disabled state (Button, List, Table, etc)"
        },
        "action-selected": {
          $value: "#2f2b3d14",
          $description: "Fill background for components in selected state (List, Table, etc)"
        },
        "action-hover": {
          $value: "#2f2b3d0f",
          $description: "Fill background for components in hover state (List, Table, etc)"
        },
        "text-disabled": {
          $value: "#2f2b3d66"
        },
        "text-subtitle": {
          $value: "#2f2b3d8c",
          $description: "Text primary"
        },
        "action-active": {
          $value: "#2f2b3d99",
          $description: "Fill color for components in active state (List, Table, etc)"
        },
        "text-secondary": {
          $value: "#2f2b3db2",
          $description: "Text secondary"
        },
        "text-primary": {
          $value: "#2f2b3de5",
          $description: "Text primary"
        },
        $type: "color"
      },
      "Color-Palette": {
        "gray-opacity-darker": {
          $value: "{Primitives.Light.Opacity-Color.Gray.gray-38}"
        },
        "gray-opacity-dark": {
          $value: "{Primitives.Light.Opacity-Color.Gray.gray-32}"
        },
        "gray-opacity-main": {
          $value: "{Primitives.Light.Opacity-Color.Gray.gray-24}"
        },
        "gray-opacity-light": {
          $value: "{Primitives.Light.Opacity-Color.Gray.gray-16}"
        },
        "gray-opacity-lighter": {
          $value: "{Primitives.Light.Opacity-Color.Gray.gray-8}"
        },
        "success-opacity-darker": {
          $value: "{Primitives.Light.Opacity-Color.Success.success-38}"
        },
        "success-opacity-dark": {
          $value: "{Primitives.Light.Opacity-Color.Success.success-32}"
        },
        "success-opacity-main": {
          $value: "{Primitives.Light.Opacity-Color.Success.success-24}"
        },
        "success-opacity-light": {
          $value: "{Primitives.Light.Opacity-Color.Success.success-16}"
        },
        "success-opacity-lighter": {
          $value: "{Primitives.Light.Opacity-Color.Success.success-8}"
        },
        "success-dark": {
          $value: "{Primitives.Light.Color.Success.success-600}",
          $description: "Alternative dark shade"
        },
        "success-main": {
          $value: "{Primitives.Light.Color.Success.success-500}",
          $description: "Used for alert component"
        },
        "success-light": {
          $value: "{Primitives.Light.Color.Success.success-400}",
          $description: "Alternative light shade"
        },
        "info-opacity-darker": {
          $value: "{Primitives.Light.Opacity-Color.Info.info-38}"
        },
        "info-opacity-dark": {
          $value: "{Primitives.Light.Opacity-Color.Info.info-32}"
        },
        "info-opacity-main": {
          $value: "{Primitives.Light.Opacity-Color.Info.info-24}"
        },
        "info-opacity-light": {
          $value: "{Primitives.Light.Opacity-Color.Info.info-16}"
        },
        "info-opacity-lighter": {
          $value: "{Primitives.Light.Opacity-Color.Info.info-8}"
        },
        "info-dark": {
          $value: "{Primitives.Light.Color.Info.info-600}",
          $description: "Alternative dark shade"
        },
        "info-main": {
          $value: "{Primitives.Light.Color.Info.info-500}",
          $description: "Used for alert component"
        },
        "info-light": {
          $value: "{Primitives.Light.Color.Info.info-400}",
          $description: "Alternative light shade"
        },
        "warning-opacity-darker": {
          $value: "{Primitives.Light.Opacity-Color.Warning.warning-38}"
        },
        "warning-opacity-dark": {
          $value: "{Primitives.Light.Opacity-Color.Warning.warning-32}"
        },
        "warning-opacity-main": {
          $value: "{Primitives.Light.Opacity-Color.Warning.warning-24}"
        },
        "warning-opacity-light": {
          $value: "{Primitives.Light.Opacity-Color.Warning.warning-16}"
        },
        "warning-opacity-lighter": {
          $value: "{Primitives.Light.Opacity-Color.Warning.warning-8}"
        },
        "warning-dark": {
          $value: "{Primitives.Light.Color.Warning.warning-600}",
          $description: "Alternative dark shade"
        },
        "warning-main": {
          $value: "{Primitives.Light.Color.Warning.warning-500}",
          $description: "Used for alert component"
        },
        "warning-light": {
          $value: "{Primitives.Light.Color.Warning.warning-400}",
          $description: "Alternative light shade"
        },
        "error-opacity-darker": {
          $value: "{Primitives.Light.Opacity-Color.Error.error-38}"
        },
        "error-opacity-dark": {
          $value: "{Primitives.Light.Opacity-Color.Error.error-32}"
        },
        "error-opacity-main": {
          $value: "{Primitives.Light.Opacity-Color.Error.error-24}"
        },
        "error-opacity-light": {
          $value: "{Primitives.Light.Opacity-Color.Error.error-16}"
        },
        "error-opacity-lighter": {
          $value: "{Primitives.Light.Opacity-Color.Error.error-8}"
        },
        "error-dark": {
          $value: "{Primitives.Light.Color.Error.error-600}",
          $description: "Alternative dark shade"
        },
        "error-main": {
          $value: "{Primitives.Light.Color.Error.error-500}",
          $description: "Used for alert component"
        },
        "error-light": {
          $value: "{Primitives.Light.Color.Error.error-400}",
          $description: "Alternative light shade"
        },
        "secondary-opacity-darker": {
          $value: "{Primitives.Light.Opacity-Color.Secondary.secondary-38}"
        },
        "secondary-opacity-dark": {
          $value: "{Primitives.Light.Opacity-Color.Secondary.secondary-32}"
        },
        "secondary-opacity-main": {
          $value: "{Primitives.Light.Opacity-Color.Secondary.secondary-24}"
        },
        "secondary-opacity-light": {
          $value: "{Primitives.Light.Opacity-Color.Secondary.secondary-16}"
        },
        "secondary-opacity-lighter": {
          $value: "{Primitives.Light.Opacity-Color.Secondary.secondary-8}"
        },
        "secondary-dark": {
          $value: "{Primitives.Light.Color.Secondary.secondary-600}",
          $description: "Alternative dark shade"
        },
        "secondary-main": {
          $value: "{Primitives.Light.Color.Secondary.secondary-500}",
          $description: "Secondary color used by most components"
        },
        "secondary-light": {
          $value: "{Primitives.Light.Color.Secondary.secondary-400}",
          $description: "Alternative light shade"
        },
        "primary-opacity-darker": {
          $value: "{Primitives.Light.Opacity-Color.Primary.primary-38}"
        },
        "primary-opacity-dark": {
          $value: "{Primitives.Light.Opacity-Color.Primary.primary-32}"
        },
        "primary-opacity-main": {
          $value: "{Primitives.Light.Opacity-Color.Primary.primary-24}"
        },
        "primary-opacity-light": {
          $value: "{Primitives.Light.Opacity-Color.Primary.primary-16}"
        },
        "primary-opacity-lighter": {
          $value: "{Primitives.Light.Opacity-Color.Primary.primary-8}"
        },
        "primary-dark": {
          $value: "{Primitives.Light.Color.Primary.primary-600}",
          $description: "Alternative dark shade"
        },
        "primary-main": {
          $value: "{Primitives.Light.Color.Primary.primary-500}",
          $description: "Main color used by most components"
        },
        "primary-light": {
          $value: "{Primitives.Light.Color.Primary.primary-400}",
          $description: "Alternative light shade"
        },
        $type: "color"
      },
      Padding: {
        "p-1": {
          $value: "{Primitives.Light.Padding.padding-1}"
        },
        "p-2": {
          $value: "{Primitives.Light.Padding.padding-2}"
        },
        "p-3": {
          $value: "{Primitives.Light.Padding.padding-3}"
        },
        "p-4": {
          $value: "{Primitives.Light.Padding.padding-4}"
        },
        "p-5": {
          $value: "{Primitives.Light.Padding.padding-5}"
        },
        "p-6": {
          $value: "{Primitives.Light.Padding.padding-6}"
        },
        "p-7": {
          $value: "{Primitives.Light.Padding.padding-7}"
        },
        "p-8": {
          $value: "{Primitives.Light.Padding.padding-8}"
        },
        "p-9": {
          $value: "{Primitives.Light.Padding.padding-9}"
        },
        "p-10": {
          $value: "{Primitives.Light.Padding.padding-10}"
        },
        "p-11": {
          $value: "{Primitives.Light.Padding.padding-11}"
        },
        "p-12": {
          $value: "{Primitives.Light.Padding.padding-12}"
        },
        "p-13": {
          $value: "{Primitives.Light.Padding.padding-13}"
        },
        "p-14": {
          $value: "{Primitives.Light.Padding.padding-14}"
        },
        "p-15": {
          $value: "{Primitives.Light.Padding.padding-15}"
        },
        "p-16": {
          $value: "{Primitives.Light.Padding.padding-16}"
        },
        "p-25": {
          $value: "{Primitives.Light.Padding.padding-25}"
        },
        $type: "dimension"
      },
      Gap: {
        "gap-1": {
          $value: "{Primitives.Light.Gap.gap-1}"
        },
        "gap-2": {
          $value: "{Primitives.Light.Gap.gap-2}"
        },
        "gap-3": {
          $value: "{Primitives.Light.Gap.gap-3}"
        },
        "gap-4": {
          $value: "{Primitives.Light.Gap.gap-4}"
        },
        "gap-5": {
          $value: "{Primitives.Light.Gap.gap-5}"
        },
        "gap-6": {
          $value: "{Primitives.Light.Gap.gap-6}"
        },
        "gap-7": {
          $value: "{Primitives.Light.Gap.gap-7}"
        },
        "gap-8": {
          $value: "{Primitives.Light.Gap.gap-8}"
        },
        "gap-9": {
          $value: "{Primitives.Light.Gap.gap-9}"
        },
        "gap-10": {
          $value: "{Primitives.Light.Gap.gap-10}"
        },
        "gap-11": {
          $value: "{Primitives.Light.Gap.gap-11}"
        },
        "gap-12": {
          $value: "{Primitives.Light.Gap.gap-12}"
        },
        "gap-13": {
          $value: "{Primitives.Light.Gap.gap-13}"
        },
        "gap-14": {
          $value: "{Primitives.Light.Gap.gap-14}"
        },
        "gap-15": {
          $value: "{Primitives.Light.Gap.gap-15}"
        },
        "gap-16": {
          $value: "{Primitives.Light.Gap.gap-16}"
        },
        $type: "dimension"
      },
      "Border-Radius": {
        "border-radius-xs": {
          $value: "{Primitives.Light.Border-Radius.border-radius-xs}"
        },
        "border-radius-sm": {
          $value: "{Primitives.Light.Border-Radius.border-radius-sm}"
        },
        "border-radius-md": {
          $value: "{Primitives.Light.Border-Radius.border-radius-md}"
        },
        "border-radius-lg": {
          $value: "{Primitives.Light.Border-Radius.border-radius-lg}"
        },
        "border-radius-xl": {
          $value: "{Primitives.Light.Border-Radius.border-radius-xl}"
        },
        "border-round": {
          $value: "{Primitives.Light.Border-Radius.border-round}"
        },
        $type: "dimension"
      },
      Misc: {
        "card-header": {
          $value: "24px",
          $type: "dimension"
        },
        "card-padding": {
          $value: "24px",
          $type: "dimension"
        },
        "card-footer": {
          $value: "24px",
          $type: "dimension"
        },
        "form-gap": {
          $value: "24px",
          $type: "dimension"
        },
        "container-xl": {
          $value: "1140px",
          $type: "dimension"
        },
        paper: {
          $value: "#ffffff",
          $type: "color"
        },
        "body-bg": {
          $value: "#f8f7fa",
          $type: "color"
        },
        "grey-light": {
          $value: "#fafafa",
          $type: "color"
        },
        "bg-white": {
          $value: "#ffffff",
          $type: "color"
        },
        "bg-black": {
          $value: "#000000",
          $type: "color"
        },
        "chat-bg": {
          $value: "#f3f2f5",
          $type: "color"
        },
        "bg-facebook": {
          $value: "#4267b2",
          $type: "color"
        },
        "bg-twitter": {
          $value: "#1da1f2",
          $type: "color"
        },
        "bg-linkedin": {
          $value: "#007bb6",
          $type: "color"
        },
        "track-bg": {
          $value: "#f1f0f2",
          $type: "color"
        },
        "table-header": {
          $value: "#ffffff",
          $type: "color"
        },
        "avatar-bg": {
          $value: "#eeedf0",
          $type: "color"
        },
        snackbar: {
          $value: "#2f2b3d",
          $type: "color",
          $description: "Snackbar background color"
        }
      }
    },
    "Pulse-Dark": {
      Theme: {
        "chip-background": {
          $value: "#f6f7f914"
        },
        "input-border": {
          $value: "#f6f7f938",
          $description: "Border style for standard variant Text Field & Select"
        },
        "filled-input-bg": {
          $value: "#f6f7f90f"
        },
        "backdrop-overlay": {
          $value: "#16181d99",
          $description: "Backdrop overlay style"
        },
        "outline-border": {
          $value: "#f6f7f93d"
        },
        divider: {
          $value: "#f6f7f91f",
          $description: "Divider fill color"
        },
        "action-focus": {
          $value: "#f6f7f91a",
          $description: "Fill background for components in focus state (List, Table, etc)"
        },
        "action-disabled-bg": {
          $value: "#f6f7f929",
          $description: "Fill background for components in disabled state (List, Table, etc)"
        },
        "action-disabled": {
          $value: "#f6f7f94d",
          $description: "Content color for components in disabled state (Button, List, Table, etc)"
        },
        "action-selected": {
          $value: "#f6f7f914",
          $description: "Fill background for components in selected state (List, Table, etc)"
        },
        "action-hover": {
          $value: "#f6f7f90f",
          $description: "Fill background for components in hover state (List, Table, etc)"
        },
        "text-disabled": {
          $value: "#99a1b366"
        },
        "text-subtitle": {
          $value: "#99a1b3",
          $description: "Text primary"
        },
        "action-active": {
          $value: "#f6f7f999",
          $description: "Fill color for components in active state (List, Table, etc)"
        },
        "text-secondary": {
          $value: "#ebecf0",
          $description: "Text secondary"
        },
        "text-primary": {
          $value: "#f6f7f9",
          $description: "Text primary"
        },
        $type: "color"
      },
      "Color-Palette": {
        "gray-opacity-darker": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Gray.gray-38}"
        },
        "gray-opacity-dark": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Gray.gray-32}"
        },
        "gray-opacity-main": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Gray.gray-24}"
        },
        "gray-opacity-light": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Gray.gray-16}"
        },
        "gray-opacity-lighter": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Gray.gray-8}"
        },
        "success-opacity-darker": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Success.success-38}"
        },
        "success-opacity-dark": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Success.success-32}"
        },
        "success-opacity-main": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Success.success-24}"
        },
        "success-opacity-light": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Success.success-16}"
        },
        "success-opacity-lighter": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Success.success-8}"
        },
        "success-dark": {
          $value: "{Primitives.Pulse-Dark.Color.Success.success-600}",
          $description: "Alternative dark shade"
        },
        "success-main": {
          $value: "{Primitives.Pulse-Dark.Color.Success.success-500}",
          $description: "Used for alert component"
        },
        "success-light": {
          $value: "{Primitives.Pulse-Dark.Color.Success.success-400}",
          $description: "Alternative light shade"
        },
        "info-opacity-darker": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Info.info-38}"
        },
        "info-opacity-dark": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Info.info-32}"
        },
        "info-opacity-main": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Info.info-24}"
        },
        "info-opacity-light": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Info.info-16}"
        },
        "info-opacity-lighter": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Info.info-8}"
        },
        "info-dark": {
          $value: "{Primitives.Pulse-Dark.Color.Info.info-600}",
          $description: "Alternative dark shade"
        },
        "info-main": {
          $value: "{Primitives.Pulse-Dark.Color.Info.info-500}",
          $description: "Used for alert component"
        },
        "info-light": {
          $value: "{Primitives.Pulse-Dark.Color.Info.info-400}",
          $description: "Alternative light shade"
        },
        "warning-opacity-darker": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Warning.warning-38}"
        },
        "warning-opacity-dark": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Warning.warning-32}"
        },
        "warning-opacity-main": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Warning.warning-24}"
        },
        "warning-opacity-light": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Warning.warning-16}"
        },
        "warning-opacity-lighter": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Warning.warning-8}"
        },
        "warning-dark": {
          $value: "{Primitives.Pulse-Dark.Color.Warning.warning-600}",
          $description: "Alternative dark shade"
        },
        "warning-main": {
          $value: "{Primitives.Pulse-Dark.Color.Warning.warning-500}",
          $description: "Used for alert component"
        },
        "warning-light": {
          $value: "{Primitives.Pulse-Dark.Color.Warning.warning-400}",
          $description: "Alternative light shade"
        },
        "error-opacity-darker": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Error.error-38}"
        },
        "error-opacity-dark": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Error.error-32}"
        },
        "error-opacity-main": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Error.error-24}"
        },
        "error-opacity-light": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Error.error-16}"
        },
        "error-opacity-lighter": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Error.error-8}"
        },
        "error-dark": {
          $value: "{Primitives.Pulse-Dark.Color.Error.error-600}",
          $description: "Alternative dark shade"
        },
        "error-main": {
          $value: "{Primitives.Pulse-Dark.Color.Error.error-500}",
          $description: "Used for alert component"
        },
        "error-light": {
          $value: "{Primitives.Pulse-Dark.Color.Error.error-400}",
          $description: "Alternative light shade"
        },
        "secondary-opacity-darker": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Secondary.secondary-38}"
        },
        "secondary-opacity-dark": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Secondary.secondary-32}"
        },
        "secondary-opacity-main": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Secondary.secondary-24}"
        },
        "secondary-opacity-light": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Secondary.secondary-16}"
        },
        "secondary-opacity-lighter": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Secondary.secondary-8}"
        },
        "secondary-dark": {
          $value: "{Primitives.Pulse-Dark.Color.Secondary.secondary-600}",
          $description: "Alternative dark shade"
        },
        "secondary-main": {
          $value: "{Primitives.Pulse-Dark.Color.Secondary.secondary-500}",
          $description: "Secondary color used by most components"
        },
        "secondary-light": {
          $value: "{Primitives.Pulse-Dark.Color.Secondary.secondary-400}",
          $description: "Alternative light shade"
        },
        "primary-opacity-darker": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Primary.primary-38}"
        },
        "primary-opacity-dark": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Primary.primary-32}"
        },
        "primary-opacity-main": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Primary.primary-24}"
        },
        "primary-opacity-light": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Primary.primary-16}"
        },
        "primary-opacity-lighter": {
          $value: "{Primitives.Pulse-Dark.Opacity-Color.Primary.primary-8}"
        },
        "primary-dark": {
          $value: "{Primitives.Pulse-Dark.Color.Primary.primary-600}",
          $description: "Alternative dark shade"
        },
        "primary-main": {
          $value: "{Primitives.Pulse-Dark.Color.Primary.primary-500}",
          $description: "Main color used by most components"
        },
        "primary-light": {
          $value: "{Primitives.Pulse-Dark.Color.Primary.primary-400}",
          $description: "Alternative light shade"
        },
        $type: "color"
      },
      Padding: {
        "p-1": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-1}"
        },
        "p-2": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-2}"
        },
        "p-3": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-3}"
        },
        "p-4": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-4}"
        },
        "p-5": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-5}"
        },
        "p-6": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-6}"
        },
        "p-7": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-7}"
        },
        "p-8": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-8}"
        },
        "p-9": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-9}"
        },
        "p-10": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-10}"
        },
        "p-11": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-11}"
        },
        "p-12": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-12}"
        },
        "p-13": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-13}"
        },
        "p-14": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-14}"
        },
        "p-15": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-15}"
        },
        "p-16": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-16}"
        },
        "p-25": {
          $value: "{Primitives.Pulse-Dark.Padding.padding-25}"
        },
        $type: "dimension"
      },
      Gap: {
        "gap-1": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-1}"
        },
        "gap-2": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-2}"
        },
        "gap-3": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-3}"
        },
        "gap-4": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-4}"
        },
        "gap-5": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-5}"
        },
        "gap-6": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-6}"
        },
        "gap-7": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-7}"
        },
        "gap-8": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-8}"
        },
        "gap-9": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-9}"
        },
        "gap-10": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-10}"
        },
        "gap-11": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-11}"
        },
        "gap-12": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-12}"
        },
        "gap-13": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-13}"
        },
        "gap-14": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-14}"
        },
        "gap-15": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-15}"
        },
        "gap-16": {
          $value: "{Primitives.Pulse-Dark.Gap.gap-16}"
        },
        $type: "dimension"
      },
      "Border-Radius": {
        "border-radius-xs": {
          $value: "{Primitives.Pulse-Dark.Border-Radius.border-radius-xs}"
        },
        "border-radius-sm": {
          $value: "{Primitives.Pulse-Dark.Border-Radius.border-radius-sm}"
        },
        "border-radius-md": {
          $value: "{Primitives.Pulse-Dark.Border-Radius.border-radius-md}"
        },
        "border-radius-lg": {
          $value: "{Primitives.Pulse-Dark.Border-Radius.border-radius-lg}"
        },
        "border-radius-xl": {
          $value: "{Primitives.Pulse-Dark.Border-Radius.border-radius-xl}"
        },
        "border-round": {
          $value: "{Primitives.Pulse-Dark.Border-Radius.border-round}"
        },
        $type: "dimension"
      },
      Misc: {
        "card-header": {
          $value: "24px",
          $type: "dimension"
        },
        "card-padding": {
          $value: "24px",
          $type: "dimension"
        },
        "card-footer": {
          $value: "24px",
          $type: "dimension"
        },
        "form-gap": {
          $value: "24px",
          $type: "dimension"
        },
        "container-xl": {
          $value: "1140px",
          $type: "dimension"
        },
        paper: {
          $value: "#343a46",
          $type: "color"
        },
        "body-bg": {
          $value: "#23272f",
          $type: "color"
        },
        "grey-light": {
          $value: "#404756",
          $type: "color"
        },
        "bg-white": {
          $value: "#ffffff",
          $type: "color"
        },
        "bg-black": {
          $value: "#000000",
          $type: "color"
        },
        "chat-bg": {
          $value: "#23272f",
          $type: "color"
        },
        "bg-facebook": {
          $value: "#4267b2",
          $type: "color"
        },
        "bg-twitter": {
          $value: "#1da1f2",
          $type: "color"
        },
        "bg-linkedin": {
          $value: "#007bb6",
          $type: "color"
        },
        "track-bg": {
          $value: "#404756",
          $type: "color"
        },
        "table-header": {
          $value: "#343a46",
          $type: "color"
        },
        "avatar-bg": {
          $value: "#4e5769",
          $type: "color"
        },
        snackbar: {
          $value: "#16181d",
          $type: "color",
          $description: "Snackbar background color"
        }
      }
    },
    Pulse: {
      Theme: {
        "chip-background": {
          $value: "#23272f14"
        },
        "input-border": {
          $value: "#23272f38",
          $description: "Border style for standard variant Text Field & Select"
        },
        "filled-input-bg": {
          $value: "#23272f0f"
        },
        "backdrop-overlay": {
          $value: "#23272f80",
          $description: "Backdrop overlay style"
        },
        "outline-border": {
          $value: "#23272f3d"
        },
        divider: {
          $value: "#23272f1f",
          $description: "Divider fill color"
        },
        "action-focus": {
          $value: "#23272f1a",
          $description: "Fill background for components in focus state (List, Table, etc)"
        },
        "action-disabled-bg": {
          $value: "#23272f29",
          $description: "Fill background for components in disabled state (List, Table, etc)"
        },
        "action-disabled": {
          $value: "#23272f4d",
          $description: "Content color for components in disabled state (Button, List, Table, etc)"
        },
        "action-selected": {
          $value: "#23272f14",
          $description: "Fill background for components in selected state (List, Table, etc)"
        },
        "action-hover": {
          $value: "#23272f0f",
          $description: "Fill background for components in hover state (List, Table, etc)"
        },
        "text-disabled": {
          $value: "#23272f66"
        },
        "text-subtitle": {
          $value: "#23272f8c",
          $description: "Text primary"
        },
        "action-active": {
          $value: "#23272f99",
          $description: "Fill color for components in active state (List, Table, etc)"
        },
        "text-secondary": {
          $value: "#23272fb2",
          $description: "Text secondary"
        },
        "text-primary": {
          $value: "#23272fe5",
          $description: "Text primary"
        },
        $type: "color"
      },
      "Color-Palette": {
        "gray-opacity-darker": {
          $value: "{Primitives.Pulse.Opacity-Color.Gray.gray-38}"
        },
        "gray-opacity-dark": {
          $value: "{Primitives.Pulse.Opacity-Color.Gray.gray-32}"
        },
        "gray-opacity-main": {
          $value: "{Primitives.Pulse.Opacity-Color.Gray.gray-24}"
        },
        "gray-opacity-light": {
          $value: "{Primitives.Pulse.Opacity-Color.Gray.gray-16}"
        },
        "gray-opacity-lighter": {
          $value: "{Primitives.Pulse.Opacity-Color.Gray.gray-8}"
        },
        "success-opacity-darker": {
          $value: "{Primitives.Pulse.Opacity-Color.Success.success-38}"
        },
        "success-opacity-dark": {
          $value: "{Primitives.Pulse.Opacity-Color.Success.success-32}"
        },
        "success-opacity-main": {
          $value: "{Primitives.Pulse.Opacity-Color.Success.success-24}"
        },
        "success-opacity-light": {
          $value: "{Primitives.Pulse.Opacity-Color.Success.success-16}"
        },
        "success-opacity-lighter": {
          $value: "{Primitives.Pulse.Opacity-Color.Success.success-8}"
        },
        "success-dark": {
          $value: "{Primitives.Pulse.Color.Success.success-600}",
          $description: "Alternative dark shade"
        },
        "success-main": {
          $value: "{Primitives.Pulse.Color.Success.success-500}",
          $description: "Used for alert component"
        },
        "success-light": {
          $value: "{Primitives.Pulse.Color.Success.success-400}",
          $description: "Alternative light shade"
        },
        "info-opacity-darker": {
          $value: "{Primitives.Pulse.Opacity-Color.Info.info-38}"
        },
        "info-opacity-dark": {
          $value: "{Primitives.Pulse.Opacity-Color.Info.info-32}"
        },
        "info-opacity-main": {
          $value: "{Primitives.Pulse.Opacity-Color.Info.info-24}"
        },
        "info-opacity-light": {
          $value: "{Primitives.Pulse.Opacity-Color.Info.info-16}"
        },
        "info-opacity-lighter": {
          $value: "{Primitives.Pulse.Opacity-Color.Info.info-8}"
        },
        "info-dark": {
          $value: "{Primitives.Pulse.Color.Info.info-600}",
          $description: "Alternative dark shade"
        },
        "info-main": {
          $value: "{Primitives.Pulse.Color.Info.info-500}",
          $description: "Used for alert component"
        },
        "info-light": {
          $value: "{Primitives.Pulse.Color.Info.info-400}",
          $description: "Alternative light shade"
        },
        "warning-opacity-darker": {
          $value: "{Primitives.Pulse.Opacity-Color.Warning.warning-38}"
        },
        "warning-opacity-dark": {
          $value: "{Primitives.Pulse.Opacity-Color.Warning.warning-32}"
        },
        "warning-opacity-main": {
          $value: "{Primitives.Pulse.Opacity-Color.Warning.warning-24}"
        },
        "warning-opacity-light": {
          $value: "{Primitives.Pulse.Opacity-Color.Warning.warning-16}"
        },
        "warning-opacity-lighter": {
          $value: "{Primitives.Pulse.Opacity-Color.Warning.warning-8}"
        },
        "warning-dark": {
          $value: "{Primitives.Pulse.Color.Warning.warning-600}",
          $description: "Alternative dark shade"
        },
        "warning-main": {
          $value: "{Primitives.Pulse.Color.Warning.warning-500}",
          $description: "Used for alert component"
        },
        "warning-light": {
          $value: "{Primitives.Pulse.Color.Warning.warning-400}",
          $description: "Alternative light shade"
        },
        "error-opacity-darker": {
          $value: "{Primitives.Pulse.Opacity-Color.Error.error-38}"
        },
        "error-opacity-dark": {
          $value: "{Primitives.Pulse.Opacity-Color.Error.error-32}"
        },
        "error-opacity-main": {
          $value: "{Primitives.Pulse.Opacity-Color.Error.error-24}"
        },
        "error-opacity-light": {
          $value: "{Primitives.Pulse.Opacity-Color.Error.error-16}"
        },
        "error-opacity-lighter": {
          $value: "{Primitives.Pulse.Opacity-Color.Error.error-8}"
        },
        "error-dark": {
          $value: "{Primitives.Pulse.Color.Error.error-600}",
          $description: "Alternative dark shade"
        },
        "error-main": {
          $value: "{Primitives.Pulse.Color.Error.error-500}",
          $description: "Used for alert component"
        },
        "error-light": {
          $value: "{Primitives.Pulse.Color.Error.error-400}",
          $description: "Alternative light shade"
        },
        "secondary-opacity-darker": {
          $value: "{Primitives.Pulse.Opacity-Color.Secondary.secondary-38}"
        },
        "secondary-opacity-dark": {
          $value: "{Primitives.Pulse.Opacity-Color.Secondary.secondary-32}"
        },
        "secondary-opacity-main": {
          $value: "{Primitives.Pulse.Opacity-Color.Secondary.secondary-24}"
        },
        "secondary-opacity-light": {
          $value: "{Primitives.Pulse.Opacity-Color.Secondary.secondary-16}"
        },
        "secondary-opacity-lighter": {
          $value: "{Primitives.Pulse.Opacity-Color.Secondary.secondary-8}"
        },
        "secondary-dark": {
          $value: "{Primitives.Pulse.Color.Secondary.secondary-600}",
          $description: "Alternative dark shade"
        },
        "secondary-main": {
          $value: "{Primitives.Pulse.Color.Secondary.secondary-500}",
          $description: "Secondary color used by most components"
        },
        "secondary-light": {
          $value: "{Primitives.Pulse.Color.Secondary.secondary-400}",
          $description: "Alternative light shade"
        },
        "primary-opacity-darker": {
          $value: "{Primitives.Pulse.Opacity-Color.Primary.primary-38}"
        },
        "primary-opacity-dark": {
          $value: "{Primitives.Pulse.Opacity-Color.Primary.primary-32}"
        },
        "primary-opacity-main": {
          $value: "{Primitives.Pulse.Opacity-Color.Primary.primary-24}"
        },
        "primary-opacity-light": {
          $value: "{Primitives.Pulse.Opacity-Color.Primary.primary-16}"
        },
        "primary-opacity-lighter": {
          $value: "{Primitives.Pulse.Opacity-Color.Primary.primary-8}"
        },
        "primary-dark": {
          $value: "{Primitives.Pulse.Color.Primary.primary-600}",
          $description: "Alternative dark shade"
        },
        "primary-main": {
          $value: "{Primitives.Pulse.Color.Primary.primary-500}",
          $description: "Main color used by most components"
        },
        "primary-light": {
          $value: "{Primitives.Pulse.Color.Primary.primary-400}",
          $description: "Alternative light shade"
        },
        $type: "color"
      },
      Padding: {
        "p-1": {
          $value: "{Primitives.Pulse.Padding.padding-1}"
        },
        "p-2": {
          $value: "{Primitives.Pulse.Padding.padding-2}"
        },
        "p-3": {
          $value: "{Primitives.Pulse.Padding.padding-3}"
        },
        "p-4": {
          $value: "{Primitives.Pulse.Padding.padding-4}"
        },
        "p-5": {
          $value: "{Primitives.Pulse.Padding.padding-5}"
        },
        "p-6": {
          $value: "{Primitives.Pulse.Padding.padding-6}"
        },
        "p-7": {
          $value: "{Primitives.Pulse.Padding.padding-7}"
        },
        "p-8": {
          $value: "{Primitives.Pulse.Padding.padding-8}"
        },
        "p-9": {
          $value: "{Primitives.Pulse.Padding.padding-9}"
        },
        "p-10": {
          $value: "{Primitives.Pulse.Padding.padding-10}"
        },
        "p-11": {
          $value: "{Primitives.Pulse.Padding.padding-11}"
        },
        "p-12": {
          $value: "{Primitives.Pulse.Padding.padding-12}"
        },
        "p-13": {
          $value: "{Primitives.Pulse.Padding.padding-13}"
        },
        "p-14": {
          $value: "{Primitives.Pulse.Padding.padding-14}"
        },
        "p-15": {
          $value: "{Primitives.Pulse.Padding.padding-15}"
        },
        "p-16": {
          $value: "{Primitives.Pulse.Padding.padding-16}"
        },
        "p-25": {
          $value: "{Primitives.Pulse.Padding.padding-25}"
        },
        $type: "dimension"
      },
      Gap: {
        "gap-1": {
          $value: "{Primitives.Pulse.Gap.gap-1}"
        },
        "gap-2": {
          $value: "{Primitives.Pulse.Gap.gap-2}"
        },
        "gap-3": {
          $value: "{Primitives.Pulse.Gap.gap-3}"
        },
        "gap-4": {
          $value: "{Primitives.Pulse.Gap.gap-4}"
        },
        "gap-5": {
          $value: "{Primitives.Pulse.Gap.gap-5}"
        },
        "gap-6": {
          $value: "{Primitives.Pulse.Gap.gap-6}"
        },
        "gap-7": {
          $value: "{Primitives.Pulse.Gap.gap-7}"
        },
        "gap-8": {
          $value: "{Primitives.Pulse.Gap.gap-8}"
        },
        "gap-9": {
          $value: "{Primitives.Pulse.Gap.gap-9}"
        },
        "gap-10": {
          $value: "{Primitives.Pulse.Gap.gap-10}"
        },
        "gap-11": {
          $value: "{Primitives.Pulse.Gap.gap-11}"
        },
        "gap-12": {
          $value: "{Primitives.Pulse.Gap.gap-12}"
        },
        "gap-13": {
          $value: "{Primitives.Pulse.Gap.gap-13}"
        },
        "gap-14": {
          $value: "{Primitives.Pulse.Gap.gap-14}"
        },
        "gap-15": {
          $value: "{Primitives.Pulse.Gap.gap-15}"
        },
        "gap-16": {
          $value: "{Primitives.Pulse.Gap.gap-16}"
        },
        $type: "dimension"
      },
      "Border-Radius": {
        "border-radius-xs": {
          $value: "{Primitives.Pulse.Border-Radius.border-radius-xs}"
        },
        "border-radius-sm": {
          $value: "{Primitives.Pulse.Border-Radius.border-radius-sm}"
        },
        "border-radius-md": {
          $value: "{Primitives.Pulse.Border-Radius.border-radius-md}"
        },
        "border-radius-lg": {
          $value: "{Primitives.Pulse.Border-Radius.border-radius-lg}"
        },
        "border-radius-xl": {
          $value: "{Primitives.Pulse.Border-Radius.border-radius-xl}"
        },
        "border-round": {
          $value: "{Primitives.Pulse.Border-Radius.border-round}"
        },
        $type: "dimension"
      },
      Misc: {
        "card-header": {
          $value: "24px",
          $type: "dimension"
        },
        "card-padding": {
          $value: "24px",
          $type: "dimension"
        },
        "card-footer": {
          $value: "24px",
          $type: "dimension"
        },
        "form-gap": {
          $value: "24px",
          $type: "dimension"
        },
        "container-xl": {
          $value: "1140px",
          $type: "dimension"
        },
        paper: {
          $value: "#ffffff",
          $type: "color"
        },
        "body-bg": {
          $value: "#F6F7F9",
          $type: "color"
        },
        "grey-light": {
          $value: "#F6F7F9",
          $type: "color"
        },
        "bg-white": {
          $value: "#ffffff",
          $type: "color"
        },
        "bg-black": {
          $value: "#000000",
          $type: "color"
        },
        "chat-bg": {
          $value: "#F6F7F9",
          $type: "color"
        },
        "bg-facebook": {
          $value: "#4267b2",
          $type: "color"
        },
        "bg-twitter": {
          $value: "#1da1f2",
          $type: "color"
        },
        "bg-linkedin": {
          $value: "#007bb6",
          $type: "color"
        },
        "track-bg": {
          $value: "#EBECF0",
          $type: "color"
        },
        "table-header": {
          $value: "#ffffff",
          $type: "color"
        },
        "avatar-bg": {
          $value: "#D0D3DC",
          $type: "color"
        },
        snackbar: {
          $value: "#23272F",
          $type: "color",
          $description: "Snackbar background color"
        }
      }
    },
    "Teal-Dark": {
      Theme: {
        "chip-background": {
          $value: "#f6f7f914"
        },
        "input-border": {
          $value: "#f6f7f938",
          $description: "Border style for standard variant Text Field & Select"
        },
        "filled-input-bg": {
          $value: "#f6f7f90f"
        },
        "backdrop-overlay": {
          $value: "#16181d99",
          $description: "Backdrop overlay style"
        },
        "outline-border": {
          $value: "#f6f7f93d"
        },
        divider: {
          $value: "#f6f7f91f",
          $description: "Divider fill color"
        },
        "action-focus": {
          $value: "#f6f7f91a",
          $description: "Fill background for components in focus state (List, Table, etc)"
        },
        "action-disabled-bg": {
          $value: "#f6f7f929",
          $description: "Fill background for components in disabled state (List, Table, etc)"
        },
        "action-disabled": {
          $value: "#f6f7f94d",
          $description: "Content color for components in disabled state (Button, List, Table, etc)"
        },
        "action-selected": {
          $value: "#f6f7f914",
          $description: "Fill background for components in selected state (List, Table, etc)"
        },
        "action-hover": {
          $value: "#f6f7f90f",
          $description: "Fill background for components in hover state (List, Table, etc)"
        },
        "text-disabled": {
          $value: "#99a1b366"
        },
        "text-subtitle": {
          $value: "#99c4be",
          $description: "Text primary"
        },
        "action-active": {
          $value: "#f6f7f999",
          $description: "Fill color for components in active state (List, Table, etc)"
        },
        "text-secondary": {
          $value: "#ccfbf1",
          $description: "Text secondary"
        },
        "text-primary": {
          $value: "#f0fdfa",
          $description: "Text primary"
        },
        $type: "color"
      },
      "Color-Palette": {
        "gray-opacity-darker": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Gray.gray-38}"
        },
        "gray-opacity-dark": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Gray.gray-32}"
        },
        "gray-opacity-main": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Gray.gray-24}"
        },
        "gray-opacity-light": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Gray.gray-16}"
        },
        "gray-opacity-lighter": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Gray.gray-8}"
        },
        "success-opacity-darker": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Success.success-38}"
        },
        "success-opacity-dark": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Success.success-32}"
        },
        "success-opacity-main": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Success.success-24}"
        },
        "success-opacity-light": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Success.success-16}"
        },
        "success-opacity-lighter": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Success.success-8}"
        },
        "success-dark": {
          $value: "{Primitives.Teal-Dark.Color.Success.success-500}",
          $description: "Alternative dark shade"
        },
        "success-main": {
          $value: "{Primitives.Teal-Dark.Color.Success.success-400}",
          $description: "Used for alert component"
        },
        "success-light": {
          $value: "{Primitives.Teal-Dark.Color.Success.success-300}",
          $description: "Alternative light shade"
        },
        "info-opacity-darker": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Info.info-38}"
        },
        "info-opacity-dark": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Info.info-32}"
        },
        "info-opacity-main": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Info.info-24}"
        },
        "info-opacity-light": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Info.info-16}"
        },
        "info-opacity-lighter": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Info.info-8}"
        },
        "info-dark": {
          $value: "{Primitives.Teal-Dark.Color.Info.info-500}",
          $description: "Alternative dark shade"
        },
        "info-main": {
          $value: "{Primitives.Teal-Dark.Color.Info.info-400}",
          $description: "Used for alert component"
        },
        "info-light": {
          $value: "{Primitives.Teal-Dark.Color.Info.info-300}",
          $description: "Alternative light shade"
        },
        "warning-opacity-darker": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Warning.warning-38}"
        },
        "warning-opacity-dark": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Warning.warning-32}"
        },
        "warning-opacity-main": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Warning.warning-24}"
        },
        "warning-opacity-light": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Warning.warning-16}"
        },
        "warning-opacity-lighter": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Warning.warning-8}"
        },
        "warning-dark": {
          $value: "{Primitives.Teal-Dark.Color.Warning.warning-500}",
          $description: "Alternative dark shade"
        },
        "warning-main": {
          $value: "{Primitives.Teal-Dark.Color.Warning.warning-400}",
          $description: "Used for alert component"
        },
        "warning-light": {
          $value: "{Primitives.Teal-Dark.Color.Warning.warning-300}",
          $description: "Alternative light shade"
        },
        "error-opacity-darker": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Error.error-38}"
        },
        "error-opacity-dark": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Error.error-32}"
        },
        "error-opacity-main": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Error.error-24}"
        },
        "error-opacity-light": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Error.error-16}"
        },
        "error-opacity-lighter": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Error.error-8}"
        },
        "error-dark": {
          $value: "{Primitives.Teal-Dark.Color.Error.error-500}",
          $description: "Alternative dark shade"
        },
        "error-main": {
          $value: "{Primitives.Teal-Dark.Color.Error.error-400}",
          $description: "Used for alert component"
        },
        "error-light": {
          $value: "{Primitives.Teal-Dark.Color.Error.error-300}",
          $description: "Alternative light shade"
        },
        "secondary-opacity-darker": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Secondary.secondary-38}"
        },
        "secondary-opacity-dark": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Secondary.secondary-32}"
        },
        "secondary-opacity-main": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Secondary.secondary-24}"
        },
        "secondary-opacity-light": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Secondary.secondary-16}"
        },
        "secondary-opacity-lighter": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Secondary.secondary-8}"
        },
        "secondary-dark": {
          $value: "{Primitives.Teal-Dark.Color.Secondary.secondary-500}",
          $description: "Alternative dark shade"
        },
        "secondary-main": {
          $value: "{Primitives.Teal-Dark.Color.Secondary.secondary-400}",
          $description: "Secondary color used by most components"
        },
        "secondary-light": {
          $value: "{Primitives.Teal-Dark.Color.Secondary.secondary-300}",
          $description: "Alternative light shade"
        },
        "primary-opacity-darker": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Primary.primary-38}"
        },
        "primary-opacity-dark": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Primary.primary-32}"
        },
        "primary-opacity-main": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Primary.primary-24}"
        },
        "primary-opacity-light": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Primary.primary-16}"
        },
        "primary-opacity-lighter": {
          $value: "{Primitives.Teal-Dark.Opacity-Color.Primary.primary-8}"
        },
        "primary-dark": {
          $value: "{Primitives.Teal-Dark.Color.Primary.primary-500}",
          $description: "Alternative dark shade"
        },
        "primary-main": {
          $value: "{Primitives.Teal-Dark.Color.Primary.primary-400}",
          $description: "Main color used by most components"
        },
        "primary-light": {
          $value: "{Primitives.Teal-Dark.Color.Primary.primary-300}",
          $description: "Alternative light shade"
        },
        $type: "color"
      },
      Padding: {
        "p-1": {
          $value: "{Primitives.Teal-Dark.Padding.padding-1}"
        },
        "p-2": {
          $value: "{Primitives.Teal-Dark.Padding.padding-2}"
        },
        "p-3": {
          $value: "{Primitives.Teal-Dark.Padding.padding-3}"
        },
        "p-4": {
          $value: "{Primitives.Teal-Dark.Padding.padding-4}"
        },
        "p-5": {
          $value: "{Primitives.Teal-Dark.Padding.padding-5}"
        },
        "p-6": {
          $value: "{Primitives.Teal-Dark.Padding.padding-6}"
        },
        "p-7": {
          $value: "{Primitives.Teal-Dark.Padding.padding-7}"
        },
        "p-8": {
          $value: "{Primitives.Teal-Dark.Padding.padding-8}"
        },
        "p-9": {
          $value: "{Primitives.Teal-Dark.Padding.padding-9}"
        },
        "p-10": {
          $value: "{Primitives.Teal-Dark.Padding.padding-10}"
        },
        "p-11": {
          $value: "{Primitives.Teal-Dark.Padding.padding-11}"
        },
        "p-12": {
          $value: "{Primitives.Teal-Dark.Padding.padding-12}"
        },
        "p-13": {
          $value: "{Primitives.Teal-Dark.Padding.padding-13}"
        },
        "p-14": {
          $value: "{Primitives.Teal-Dark.Padding.padding-14}"
        },
        "p-15": {
          $value: "{Primitives.Teal-Dark.Padding.padding-15}"
        },
        "p-16": {
          $value: "{Primitives.Teal-Dark.Padding.padding-16}"
        },
        "p-25": {
          $value: "{Primitives.Teal-Dark.Padding.padding-25}"
        },
        $type: "dimension"
      },
      Gap: {
        "gap-1": {
          $value: "{Primitives.Teal-Dark.Gap.gap-1}"
        },
        "gap-2": {
          $value: "{Primitives.Teal-Dark.Gap.gap-2}"
        },
        "gap-3": {
          $value: "{Primitives.Teal-Dark.Gap.gap-3}"
        },
        "gap-4": {
          $value: "{Primitives.Teal-Dark.Gap.gap-4}"
        },
        "gap-5": {
          $value: "{Primitives.Teal-Dark.Gap.gap-5}"
        },
        "gap-6": {
          $value: "{Primitives.Teal-Dark.Gap.gap-6}"
        },
        "gap-7": {
          $value: "{Primitives.Teal-Dark.Gap.gap-7}"
        },
        "gap-8": {
          $value: "{Primitives.Teal-Dark.Gap.gap-8}"
        },
        "gap-9": {
          $value: "{Primitives.Teal-Dark.Gap.gap-9}"
        },
        "gap-10": {
          $value: "{Primitives.Teal-Dark.Gap.gap-10}"
        },
        "gap-11": {
          $value: "{Primitives.Teal-Dark.Gap.gap-11}"
        },
        "gap-12": {
          $value: "{Primitives.Teal-Dark.Gap.gap-12}"
        },
        "gap-13": {
          $value: "{Primitives.Teal-Dark.Gap.gap-13}"
        },
        "gap-14": {
          $value: "{Primitives.Teal-Dark.Gap.gap-14}"
        },
        "gap-15": {
          $value: "{Primitives.Teal-Dark.Gap.gap-15}"
        },
        "gap-16": {
          $value: "{Primitives.Teal-Dark.Gap.gap-16}"
        },
        $type: "dimension"
      },
      "Border-Radius": {
        "border-radius-xs": {
          $value: "{Primitives.Teal-Dark.Border-Radius.border-radius-xs}"
        },
        "border-radius-sm": {
          $value: "{Primitives.Teal-Dark.Border-Radius.border-radius-sm}"
        },
        "border-radius-md": {
          $value: "{Primitives.Teal-Dark.Border-Radius.border-radius-md}"
        },
        "border-radius-lg": {
          $value: "{Primitives.Teal-Dark.Border-Radius.border-radius-lg}"
        },
        "border-radius-xl": {
          $value: "{Primitives.Teal-Dark.Border-Radius.border-radius-xl}"
        },
        "border-round": {
          $value: "{Primitives.Teal-Dark.Border-Radius.border-round}"
        },
        $type: "dimension"
      },
      Misc: {
        "card-header": {
          $value: "24px",
          $type: "dimension"
        },
        "card-padding": {
          $value: "24px",
          $type: "dimension"
        },
        "card-footer": {
          $value: "24px",
          $type: "dimension"
        },
        "form-gap": {
          $value: "24px",
          $type: "dimension"
        },
        "container-xl": {
          $value: "1140px",
          $type: "dimension"
        },
        paper: {
          $value: "#152e32",
          $type: "color"
        },
        "body-bg": {
          $value: "#0b2023",
          $type: "color"
        },
        "grey-light": {
          $value: "#203c40",
          $type: "color"
        },
        "bg-white": {
          $value: "#ffffff",
          $type: "color"
        },
        "bg-black": {
          $value: "#000000",
          $type: "color"
        },
        "chat-bg": {
          $value: "#0b2023",
          $type: "color"
        },
        "bg-facebook": {
          $value: "#4267b2",
          $type: "color"
        },
        "bg-twitter": {
          $value: "#1da1f2",
          $type: "color"
        },
        "bg-linkedin": {
          $value: "#007bb6",
          $type: "color"
        },
        "track-bg": {
          $value: "#203c40",
          $type: "color"
        },
        "table-header": {
          $value: "#152e32",
          $type: "color"
        },
        "avatar-bg": {
          $value: "#2d4d52",
          $type: "color"
        },
        snackbar: {
          $value: "#f0fdfa",
          $type: "color",
          $description: "Snackbar background color"
        }
      }
    },
    Teal: {
      Theme: {
        "chip-background": {
          $value: "#1e293b14"
        },
        "input-border": {
          $value: "#1e293b38",
          $description: "Border style for standard variant Text Field & Select"
        },
        "filled-input-bg": {
          $value: "#1e293b0f"
        },
        "backdrop-overlay": {
          $value: "#1e293b80",
          $description: "Backdrop overlay style"
        },
        "outline-border": {
          $value: "#1e293b3d"
        },
        divider: {
          $value: "#1e293b1f",
          $description: "Divider fill color"
        },
        "action-focus": {
          $value: "#1e293b1a",
          $description: "Fill background for components in focus state (List, Table, etc)"
        },
        "action-disabled-bg": {
          $value: "#1e293b29",
          $description: "Fill background for components in disabled state (List, Table, etc)"
        },
        "action-disabled": {
          $value: "#1e293b4d",
          $description: "Content color for components in disabled state (Button, List, Table, etc)"
        },
        "action-selected": {
          $value: "#1e293b14",
          $description: "Fill background for components in selected state (List, Table, etc)"
        },
        "action-hover": {
          $value: "#1e293b0f",
          $description: "Fill background for components in hover state (List, Table, etc)"
        },
        "text-disabled": {
          $value: "#1e293b66"
        },
        "text-subtitle": {
          $value: "#1e293b8c",
          $description: "Text primary"
        },
        "action-active": {
          $value: "#1e293b99",
          $description: "Fill color for components in active state (List, Table, etc)"
        },
        "text-secondary": {
          $value: "#1e293bb2",
          $description: "Text secondary"
        },
        "text-primary": {
          $value: "#1e293be5",
          $description: "Text primary"
        },
        $type: "color"
      },
      "Color-Palette": {
        "gray-opacity-darker": {
          $value: "{Primitives.Teal.Opacity-Color.Gray.gray-38}"
        },
        "gray-opacity-dark": {
          $value: "{Primitives.Teal.Opacity-Color.Gray.gray-32}"
        },
        "gray-opacity-main": {
          $value: "{Primitives.Teal.Opacity-Color.Gray.gray-24}"
        },
        "gray-opacity-light": {
          $value: "{Primitives.Teal.Opacity-Color.Gray.gray-16}"
        },
        "gray-opacity-lighter": {
          $value: "{Primitives.Teal.Opacity-Color.Gray.gray-8}"
        },
        "success-opacity-darker": {
          $value: "{Primitives.Teal.Opacity-Color.Success.success-38}"
        },
        "success-opacity-dark": {
          $value: "{Primitives.Teal.Opacity-Color.Success.success-32}"
        },
        "success-opacity-main": {
          $value: "{Primitives.Teal.Opacity-Color.Success.success-24}"
        },
        "success-opacity-light": {
          $value: "{Primitives.Teal.Opacity-Color.Success.success-16}"
        },
        "success-opacity-lighter": {
          $value: "{Primitives.Teal.Opacity-Color.Success.success-8}"
        },
        "success-dark": {
          $value: "{Primitives.Teal.Color.Success.success-600}",
          $description: "Alternative dark shade"
        },
        "success-main": {
          $value: "{Primitives.Teal.Color.Success.success-500}",
          $description: "Used for alert component"
        },
        "success-light": {
          $value: "{Primitives.Teal.Color.Success.success-400}",
          $description: "Alternative light shade"
        },
        "info-opacity-darker": {
          $value: "{Primitives.Teal.Opacity-Color.Info.info-38}"
        },
        "info-opacity-dark": {
          $value: "{Primitives.Teal.Opacity-Color.Info.info-32}"
        },
        "info-opacity-main": {
          $value: "{Primitives.Teal.Opacity-Color.Info.info-24}"
        },
        "info-opacity-light": {
          $value: "{Primitives.Teal.Opacity-Color.Info.info-16}"
        },
        "info-opacity-lighter": {
          $value: "{Primitives.Teal.Opacity-Color.Info.info-8}"
        },
        "info-dark": {
          $value: "{Primitives.Teal.Color.Info.info-600}",
          $description: "Alternative dark shade"
        },
        "info-main": {
          $value: "{Primitives.Teal.Color.Info.info-500}",
          $description: "Used for alert component"
        },
        "info-light": {
          $value: "{Primitives.Teal.Color.Info.info-400}",
          $description: "Alternative light shade"
        },
        "warning-opacity-darker": {
          $value: "{Primitives.Teal.Opacity-Color.Warning.warning-38}"
        },
        "warning-opacity-dark": {
          $value: "{Primitives.Teal.Opacity-Color.Warning.warning-32}"
        },
        "warning-opacity-main": {
          $value: "{Primitives.Teal.Opacity-Color.Warning.warning-24}"
        },
        "warning-opacity-light": {
          $value: "{Primitives.Teal.Opacity-Color.Warning.warning-16}"
        },
        "warning-opacity-lighter": {
          $value: "{Primitives.Teal.Opacity-Color.Warning.warning-8}"
        },
        "warning-dark": {
          $value: "{Primitives.Teal.Color.Warning.warning-600}",
          $description: "Alternative dark shade"
        },
        "warning-main": {
          $value: "{Primitives.Teal.Color.Warning.warning-500}",
          $description: "Used for alert component"
        },
        "warning-light": {
          $value: "{Primitives.Teal.Color.Warning.warning-400}",
          $description: "Alternative light shade"
        },
        "error-opacity-darker": {
          $value: "{Primitives.Teal.Opacity-Color.Error.error-38}"
        },
        "error-opacity-dark": {
          $value: "{Primitives.Teal.Opacity-Color.Error.error-32}"
        },
        "error-opacity-main": {
          $value: "{Primitives.Teal.Opacity-Color.Error.error-24}"
        },
        "error-opacity-light": {
          $value: "{Primitives.Teal.Opacity-Color.Error.error-16}"
        },
        "error-opacity-lighter": {
          $value: "{Primitives.Teal.Opacity-Color.Error.error-8}"
        },
        "error-dark": {
          $value: "{Primitives.Teal.Color.Error.error-600}",
          $description: "Alternative dark shade"
        },
        "error-main": {
          $value: "{Primitives.Teal.Color.Error.error-500}",
          $description: "Used for alert component"
        },
        "error-light": {
          $value: "{Primitives.Teal.Color.Error.error-400}",
          $description: "Alternative light shade"
        },
        "secondary-opacity-darker": {
          $value: "{Primitives.Teal.Opacity-Color.Secondary.secondary-38}"
        },
        "secondary-opacity-dark": {
          $value: "{Primitives.Teal.Opacity-Color.Secondary.secondary-32}"
        },
        "secondary-opacity-main": {
          $value: "{Primitives.Teal.Opacity-Color.Secondary.secondary-24}"
        },
        "secondary-opacity-light": {
          $value: "{Primitives.Teal.Opacity-Color.Secondary.secondary-16}"
        },
        "secondary-opacity-lighter": {
          $value: "{Primitives.Teal.Opacity-Color.Secondary.secondary-8}"
        },
        "secondary-dark": {
          $value: "{Primitives.Teal.Color.Secondary.secondary-600}",
          $description: "Alternative dark shade"
        },
        "secondary-main": {
          $value: "{Primitives.Teal.Color.Secondary.secondary-500}",
          $description: "Secondary color used by most components"
        },
        "secondary-light": {
          $value: "{Primitives.Teal.Color.Secondary.secondary-400}",
          $description: "Alternative light shade"
        },
        "primary-opacity-darker": {
          $value: "{Primitives.Teal.Opacity-Color.Primary.primary-38}"
        },
        "primary-opacity-dark": {
          $value: "{Primitives.Teal.Opacity-Color.Primary.primary-32}"
        },
        "primary-opacity-main": {
          $value: "{Primitives.Teal.Opacity-Color.Primary.primary-24}"
        },
        "primary-opacity-light": {
          $value: "{Primitives.Teal.Opacity-Color.Primary.primary-16}"
        },
        "primary-opacity-lighter": {
          $value: "{Primitives.Teal.Opacity-Color.Primary.primary-8}"
        },
        "primary-dark": {
          $value: "{Primitives.Teal.Color.Primary.primary-600}",
          $description: "Alternative dark shade"
        },
        "primary-main": {
          $value: "{Primitives.Teal.Color.Primary.primary-500}",
          $description: "Main color used by most components"
        },
        "primary-light": {
          $value: "{Primitives.Teal.Color.Primary.primary-400}",
          $description: "Alternative light shade"
        },
        $type: "color"
      },
      Padding: {
        "p-1": {
          $value: "{Primitives.Teal.Padding.padding-1}"
        },
        "p-2": {
          $value: "{Primitives.Teal.Padding.padding-2}"
        },
        "p-3": {
          $value: "{Primitives.Teal.Padding.padding-3}"
        },
        "p-4": {
          $value: "{Primitives.Teal.Padding.padding-4}"
        },
        "p-5": {
          $value: "{Primitives.Teal.Padding.padding-5}"
        },
        "p-6": {
          $value: "{Primitives.Teal.Padding.padding-6}"
        },
        "p-7": {
          $value: "{Primitives.Teal.Padding.padding-7}"
        },
        "p-8": {
          $value: "{Primitives.Teal.Padding.padding-8}"
        },
        "p-9": {
          $value: "{Primitives.Teal.Padding.padding-9}"
        },
        "p-10": {
          $value: "{Primitives.Teal.Padding.padding-10}"
        },
        "p-11": {
          $value: "{Primitives.Teal.Padding.padding-11}"
        },
        "p-12": {
          $value: "{Primitives.Teal.Padding.padding-12}"
        },
        "p-13": {
          $value: "{Primitives.Teal.Padding.padding-13}"
        },
        "p-14": {
          $value: "{Primitives.Teal.Padding.padding-14}"
        },
        "p-15": {
          $value: "{Primitives.Teal.Padding.padding-15}"
        },
        "p-16": {
          $value: "{Primitives.Teal.Padding.padding-16}"
        },
        "p-25": {
          $value: "{Primitives.Teal.Padding.padding-25}"
        },
        $type: "dimension"
      },
      Gap: {
        "gap-1": {
          $value: "{Primitives.Teal.Gap.gap-1}"
        },
        "gap-2": {
          $value: "{Primitives.Teal.Gap.gap-2}"
        },
        "gap-3": {
          $value: "{Primitives.Teal.Gap.gap-3}"
        },
        "gap-4": {
          $value: "{Primitives.Teal.Gap.gap-4}"
        },
        "gap-5": {
          $value: "{Primitives.Teal.Gap.gap-5}"
        },
        "gap-6": {
          $value: "{Primitives.Teal.Gap.gap-6}"
        },
        "gap-7": {
          $value: "{Primitives.Teal.Gap.gap-7}"
        },
        "gap-8": {
          $value: "{Primitives.Teal.Gap.gap-8}"
        },
        "gap-9": {
          $value: "{Primitives.Teal.Gap.gap-9}"
        },
        "gap-10": {
          $value: "{Primitives.Teal.Gap.gap-10}"
        },
        "gap-11": {
          $value: "{Primitives.Teal.Gap.gap-11}"
        },
        "gap-12": {
          $value: "{Primitives.Teal.Gap.gap-12}"
        },
        "gap-13": {
          $value: "{Primitives.Teal.Gap.gap-13}"
        },
        "gap-14": {
          $value: "{Primitives.Teal.Gap.gap-14}"
        },
        "gap-15": {
          $value: "{Primitives.Teal.Gap.gap-15}"
        },
        "gap-16": {
          $value: "{Primitives.Teal.Gap.gap-16}"
        },
        $type: "dimension"
      },
      "Border-Radius": {
        "border-radius-xs": {
          $value: "{Primitives.Teal.Border-Radius.border-radius-xs}"
        },
        "border-radius-sm": {
          $value: "{Primitives.Teal.Border-Radius.border-radius-sm}"
        },
        "border-radius-md": {
          $value: "{Primitives.Teal.Border-Radius.border-radius-md}"
        },
        "border-radius-lg": {
          $value: "{Primitives.Teal.Border-Radius.border-radius-lg}"
        },
        "border-radius-xl": {
          $value: "{Primitives.Teal.Border-Radius.border-radius-xl}"
        },
        "border-round": {
          $value: "{Primitives.Teal.Border-Radius.border-round}"
        },
        $type: "dimension"
      },
      Misc: {
        "card-header": {
          $value: "24px",
          $type: "dimension"
        },
        "card-padding": {
          $value: "24px",
          $type: "dimension"
        },
        "card-footer": {
          $value: "24px",
          $type: "dimension"
        },
        "form-gap": {
          $value: "24px",
          $type: "dimension"
        },
        "container-xl": {
          $value: "1140px",
          $type: "dimension"
        },
        paper: {
          $value: "#ffffff",
          $type: "color"
        },
        "body-bg": {
          $value: "#f4f9f9",
          $type: "color"
        },
        "grey-light": {
          $value: "#f8fafc",
          $type: "color"
        },
        "bg-white": {
          $value: "#ffffff",
          $type: "color"
        },
        "bg-black": {
          $value: "#000000",
          $type: "color"
        },
        "chat-bg": {
          $value: "#e8f2f1",
          $type: "color"
        },
        "bg-facebook": {
          $value: "#4267b2",
          $type: "color"
        },
        "bg-twitter": {
          $value: "#1da1f2",
          $type: "color"
        },
        "bg-linkedin": {
          $value: "#007bb6",
          $type: "color"
        },
        "track-bg": {
          $value: "#e4efee",
          $type: "color"
        },
        "table-header": {
          $value: "#ffffff",
          $type: "color"
        },
        "avatar-bg": {
          $value: "#e0edec",
          $type: "color"
        },
        snackbar: {
          $value: "#1e293b",
          $type: "color",
          $description: "Snackbar background color"
        }
      }
    }
  },
  Primitives: {
    Dark: {
      Padding: {
        "padding-1": {
          $value: "4px"
        },
        "padding-2": {
          $value: "8px"
        },
        "padding-3": {
          $value: "12px"
        },
        "padding-4": {
          $value: "16px"
        },
        "padding-5": {
          $value: "20px"
        },
        "padding-6": {
          $value: "24px"
        },
        "padding-7": {
          $value: "28px"
        },
        "padding-8": {
          $value: "32px"
        },
        "padding-9": {
          $value: "36px"
        },
        "padding-10": {
          $value: "40px"
        },
        "padding-11": {
          $value: "44px"
        },
        "padding-12": {
          $value: "48px"
        },
        "padding-13": {
          $value: "52px"
        },
        "padding-14": {
          $value: "56px"
        },
        "padding-15": {
          $value: "60px"
        },
        "padding-16": {
          $value: "64px"
        },
        "padding-25": {
          $value: "100px"
        },
        $type: "dimension"
      },
      Gap: {
        "gap-1": {
          $value: "4px"
        },
        "gap-2": {
          $value: "8px"
        },
        "gap-3": {
          $value: "12px"
        },
        "gap-4": {
          $value: "16px"
        },
        "gap-5": {
          $value: "20px"
        },
        "gap-6": {
          $value: "24px"
        },
        "gap-7": {
          $value: "28px"
        },
        "gap-8": {
          $value: "32px"
        },
        "gap-9": {
          $value: "36px"
        },
        "gap-10": {
          $value: "40px"
        },
        "gap-11": {
          $value: "44px"
        },
        "gap-12": {
          $value: "48px"
        },
        "gap-13": {
          $value: "52px"
        },
        "gap-14": {
          $value: "56px"
        },
        "gap-15": {
          $value: "60px"
        },
        "gap-16": {
          $value: "64px"
        },
        "gap-25": {
          $value: "100px"
        },
        $type: "dimension"
      },
      Color: {
        Primary: {
          "primary-100": {
            $value: "#e3e1fc"
          },
          "primary-200": {
            $value: "#c7c2f9"
          },
          "primary-300": {
            $value: "#aba4f6"
          },
          "primary-400": {
            $value: "#8f85f3"
          },
          "primary-500": {
            $value: "#7367f0"
          },
          "primary-600": {
            $value: "#675dd8"
          },
          "primary-700": {
            $value: "#6258cc"
          },
          "primary-800": {
            $value: "#5c52c0"
          },
          "primary-900": {
            $value: "#564db4"
          }
        },
        Secondary: {
          "secondary-100": {
            $value: "#e6e6e9"
          },
          "secondary-200": {
            $value: "#cccdd3"
          },
          "secondary-300": {
            $value: "#b3b5bc"
          },
          "secondary-400": {
            $value: "#999ca6"
          },
          "secondary-500": {
            $value: "#808390"
          },
          "secondary-600": {
            $value: "#737682"
          },
          "secondary-700": {
            $value: "#6d6f7a"
          },
          "secondary-800": {
            $value: "#666973"
          },
          "secondary-900": {
            $value: "#60626c"
          }
        },
        Info: {
          "info-100": {
            $value: "#ccf1f6"
          },
          "info-200": {
            $value: "#99e3ed"
          },
          "info-300": {
            $value: "#66d6e3"
          },
          "info-400": {
            $value: "#33c8da"
          },
          "info-500": {
            $value: "#00bad1"
          },
          "info-600": {
            $value: "#00a7bc"
          },
          "info-700": {
            $value: "#009eb2"
          },
          "info-800": {
            $value: "#0095a7"
          },
          "info-900": {
            $value: "#008c9d"
          }
        },
        Success: {
          "success-100": {
            $value: "#d4f4e2"
          },
          "success-200": {
            $value: "#a9e9c5"
          },
          "success-300": {
            $value: "#7edda9"
          },
          "success-400": {
            $value: "#53d28c"
          },
          "success-500": {
            $value: "#28c76f"
          },
          "success-600": {
            $value: "#24b364"
          },
          "success-700": {
            $value: "#22a95e"
          },
          "success-800": {
            $value: "#209f59"
          },
          "success-900": {
            $value: "#1e9553"
          }
        },
        Warning: {
          "warning-100": {
            $value: "#ffecd9"
          },
          "warning-200": {
            $value: "#ffd9b4"
          },
          "warning-300": {
            $value: "#ffc58e"
          },
          "warning-400": {
            $value: "#ffb269"
          },
          "warning-500": {
            $value: "#ff9f43"
          },
          "warning-600": {
            $value: "#e68f3c"
          },
          "warning-700": {
            $value: "#d98739"
          },
          "warning-800": {
            $value: "#cc7f36"
          },
          "warning-900": {
            $value: "#bf7732"
          }
        },
        Error: {
          "error-100": {
            $value: "#ffdbdc"
          },
          "error-200": {
            $value: "#ffb7b9"
          },
          "error-300": {
            $value: "#ff9497"
          },
          "error-400": {
            $value: "#ff7074"
          },
          "error-500": {
            $value: "#ff4c51"
          },
          "error-600": {
            $value: "#e64449"
          },
          "error-700": {
            $value: "#d94145"
          },
          "error-800": {
            $value: "#cc3d41"
          },
          "error-900": {
            $value: "#bf393d"
          }
        },
        Gray: {
          "gray-100": {
            $value: "#535876"
          },
          "gray-200": {
            $value: "#636784"
          },
          "gray-300": {
            $value: "#727692"
          },
          "gray-400": {
            $value: "#8285a0"
          },
          "gray-500": {
            $value: "#9293ae"
          },
          "gray-600": {
            $value: "#a2a2bd"
          },
          "gray-700": {
            $value: "#b2b1cb"
          },
          "gray-800": {
            $value: "#c1c0d9"
          },
          "gray-900": {
            $value: "#cfcce4"
          }
        },
        $type: "color"
      },
      "Opacity-Color": {
        Primary: {
          "primary-8": {
            $value: "#7367f014"
          },
          "primary-16": {
            $value: "#7367f029"
          },
          "primary-24": {
            $value: "#7367f03d"
          },
          "primary-32": {
            $value: "#7367f052"
          },
          "primary-38": {
            $value: "#655bd361"
          }
        },
        Secondary: {
          "secondary-8": {
            $value: "#80839014"
          },
          "secondary-16": {
            $value: "#80839029"
          },
          "secondary-24": {
            $value: "#8083903d"
          },
          "secondary-32": {
            $value: "#80839052"
          },
          "secondary-38": {
            $value: "#80839061"
          }
        },
        Info: {
          "info-8": {
            $value: "#00bad114"
          },
          "info-16": {
            $value: "#00bad129"
          },
          "info-24": {
            $value: "#00bad13d"
          },
          "info-32": {
            $value: "#00bad152"
          },
          "info-38": {
            $value: "#00bad161"
          }
        },
        Success: {
          "success-8": {
            $value: "#28c76f14"
          },
          "success-16": {
            $value: "#28c76f29"
          },
          "success-24": {
            $value: "#28c76f3d"
          },
          "success-32": {
            $value: "#28c76f52"
          },
          "success-38": {
            $value: "#28c76f61"
          }
        },
        Warning: {
          "warning-8": {
            $value: "#ff9f4314"
          },
          "warning-16": {
            $value: "#ff9f4329"
          },
          "warning-24": {
            $value: "#ff9f433d"
          },
          "warning-32": {
            $value: "#ff9f4352"
          },
          "warning-38": {
            $value: "#ff9f4361"
          }
        },
        Error: {
          "error-8": {
            $value: "#ff4c5114"
          },
          "error-16": {
            $value: "#ff4c5129"
          },
          "error-24": {
            $value: "#ff4c513d"
          },
          "error-32": {
            $value: "#ff4c5152"
          },
          "error-38": {
            $value: "#ff4c5161"
          }
        },
        Gray: {
          "gray-8": {
            $value: "#e7e3fc14"
          },
          "gray-16": {
            $value: "#e7e3fc29"
          },
          "gray-24": {
            $value: "#e7e3fc3d"
          },
          "gray-32": {
            $value: "#e7e3fc52"
          },
          "gray-38": {
            $value: "#e7e3fc61"
          }
        },
        $type: "color"
      },
      "Border-Radius": {
        "border-radius-xs": {
          $value: "2px"
        },
        "border-radius-sm": {
          $value: "4px"
        },
        "border-radius-md": {
          $value: "6px"
        },
        "border-radius-lg": {
          $value: "8px"
        },
        "border-radius-xl": {
          $value: "10px"
        },
        "border-round": {
          $value: "500px"
        },
        $type: "dimension"
      },
      Typography: {
        "font-family": {
          $value: "'Roboto', sans-serif",
          $type: "fontFamily"
        },
        "font-size": {
          12: {
            $value: "12px"
          },
          13: {
            $value: "13px"
          },
          15: {
            $value: "15px"
          },
          18: {
            $value: "18px"
          },
          24: {
            $value: "24px"
          },
          28: {
            $value: "28px"
          },
          38: {
            $value: "38px"
          },
          46: {
            $value: "46px"
          },
          $type: "dimension"
        },
        "font-weight": {
          regular: {
            $value: "400"
          },
          medium: {
            $value: "500"
          },
          semibold: {
            $value: "600"
          },
          bold: {
            $value: "700"
          },
          $type: "fontWeight"
        },
        "line-height": {
          14: {
            $value: "14px"
          },
          18: {
            $value: "18px"
          },
          20: {
            $value: "20px"
          },
          22: {
            $value: "22px"
          },
          28: {
            $value: "28px"
          },
          38: {
            $value: "38px"
          },
          42: {
            $value: "42px"
          },
          56: {
            $value: "56px"
          },
          68: {
            $value: "68px"
          },
          $type: "dimension"
        }
      }
    },
    Light: {
      Padding: {
        "padding-1": {
          $value: "4px"
        },
        "padding-2": {
          $value: "8px"
        },
        "padding-3": {
          $value: "12px"
        },
        "padding-4": {
          $value: "16px"
        },
        "padding-5": {
          $value: "20px"
        },
        "padding-6": {
          $value: "24px"
        },
        "padding-7": {
          $value: "28px"
        },
        "padding-8": {
          $value: "32px"
        },
        "padding-9": {
          $value: "36px"
        },
        "padding-10": {
          $value: "40px"
        },
        "padding-11": {
          $value: "44px"
        },
        "padding-12": {
          $value: "48px"
        },
        "padding-13": {
          $value: "52px"
        },
        "padding-14": {
          $value: "56px"
        },
        "padding-15": {
          $value: "60px"
        },
        "padding-16": {
          $value: "64px"
        },
        "padding-25": {
          $value: "100px"
        },
        $type: "dimension"
      },
      Gap: {
        "gap-1": {
          $value: "4px"
        },
        "gap-2": {
          $value: "8px"
        },
        "gap-3": {
          $value: "12px"
        },
        "gap-4": {
          $value: "16px"
        },
        "gap-5": {
          $value: "20px"
        },
        "gap-6": {
          $value: "24px"
        },
        "gap-7": {
          $value: "28px"
        },
        "gap-8": {
          $value: "32px"
        },
        "gap-9": {
          $value: "36px"
        },
        "gap-10": {
          $value: "40px"
        },
        "gap-11": {
          $value: "44px"
        },
        "gap-12": {
          $value: "48px"
        },
        "gap-13": {
          $value: "52px"
        },
        "gap-14": {
          $value: "56px"
        },
        "gap-15": {
          $value: "60px"
        },
        "gap-16": {
          $value: "64px"
        },
        "gap-25": {
          $value: "100px"
        },
        $type: "dimension"
      },
      Color: {
        Primary: {
          "primary-50": {
            $value: "#f5f3ff"
          },
          "primary-100": {
            $value: "#e3e1fc"
          },
          "primary-200": {
            $value: "#c7c2f9"
          },
          "primary-300": {
            $value: "#aba4f6"
          },
          "primary-400": {
            $value: "#8f85f3"
          },
          "primary-500": {
            $value: "#7367f0"
          },
          "primary-600": {
            $value: "#675dd8"
          },
          "primary-700": {
            $value: "#6258cc"
          },
          "primary-800": {
            $value: "#5c52c0"
          },
          "primary-900": {
            $value: "#564db4"
          }
        },
        Secondary: {
          "secondary-100": {
            $value: "#e6e6e9"
          },
          "secondary-200": {
            $value: "#cccdd3"
          },
          "secondary-300": {
            $value: "#b3b5bc"
          },
          "secondary-400": {
            $value: "#999ca6"
          },
          "secondary-500": {
            $value: "#808390"
          },
          "secondary-600": {
            $value: "#737682"
          },
          "secondary-700": {
            $value: "#6d6f7a"
          },
          "secondary-800": {
            $value: "#666973"
          },
          "secondary-900": {
            $value: "#60626c"
          }
        },
        Info: {
          "info-100": {
            $value: "#ccf1f6"
          },
          "info-200": {
            $value: "#99e3ed"
          },
          "info-300": {
            $value: "#66d6e3"
          },
          "info-400": {
            $value: "#33c8da"
          },
          "info-500": {
            $value: "#00bad1"
          },
          "info-600": {
            $value: "#00a7bc"
          },
          "info-700": {
            $value: "#009eb2"
          },
          "info-800": {
            $value: "#0095a7"
          },
          "info-900": {
            $value: "#008c9d"
          }
        },
        Success: {
          "success-100": {
            $value: "#d4f4e2"
          },
          "success-200": {
            $value: "#a9e9c5"
          },
          "success-300": {
            $value: "#7edda9"
          },
          "success-400": {
            $value: "#53d28c"
          },
          "success-500": {
            $value: "#28c76f"
          },
          "success-600": {
            $value: "#24b364"
          },
          "success-700": {
            $value: "#22a95e"
          },
          "success-800": {
            $value: "#209f59"
          },
          "success-900": {
            $value: "#1e9553"
          }
        },
        Warning: {
          "warning-100": {
            $value: "#ffecd9"
          },
          "warning-200": {
            $value: "#ffd9b4"
          },
          "warning-300": {
            $value: "#ffc58e"
          },
          "warning-400": {
            $value: "#ffb269"
          },
          "warning-500": {
            $value: "#ff9f43"
          },
          "warning-600": {
            $value: "#e68f3c"
          },
          "warning-700": {
            $value: "#d98739"
          },
          "warning-800": {
            $value: "#cc7f36"
          },
          "warning-900": {
            $value: "#bf7732"
          }
        },
        Error: {
          "error-100": {
            $value: "#ffdbdc"
          },
          "error-200": {
            $value: "#ffb7b9"
          },
          "error-300": {
            $value: "#ff9497"
          },
          "error-400": {
            $value: "#ff7074"
          },
          "error-500": {
            $value: "#ff4c51"
          },
          "error-600": {
            $value: "#e64449"
          },
          "error-700": {
            $value: "#d94145"
          },
          "error-800": {
            $value: "#cc3d41"
          },
          "error-900": {
            $value: "#bf393d"
          }
        },
        Gray: {
          "gray-100": {
            $value: "#eaeaec"
          },
          "gray-200": {
            $value: "#d5d4d8"
          },
          "gray-300": {
            $value: "#c0bec5"
          },
          "gray-400": {
            $value: "#aba8b1"
          },
          "gray-500": {
            $value: "#97939e"
          },
          "gray-600": {
            $value: "#827d8b"
          },
          "gray-700": {
            $value: "#6d6777"
          },
          "gray-800": {
            $value: "#585164"
          },
          "gray-900": {
            $value: "#433c50"
          }
        },
        $type: "color"
      },
      "Opacity-Color": {
        Primary: {
          "primary-8": {
            $value: "#7367f014"
          },
          "primary-16": {
            $value: "#7367f029"
          },
          "primary-24": {
            $value: "#7367f03d"
          },
          "primary-32": {
            $value: "#7367f052"
          },
          "primary-38": {
            $value: "#7367f061"
          }
        },
        Secondary: {
          "secondary-8": {
            $value: "#80839014"
          },
          "secondary-16": {
            $value: "#80839029"
          },
          "secondary-24": {
            $value: "#8083903d"
          },
          "secondary-32": {
            $value: "#80839052"
          },
          "secondary-38": {
            $value: "#80839061"
          }
        },
        Info: {
          "info-8": {
            $value: "#00bad114"
          },
          "info-16": {
            $value: "#00bad129"
          },
          "info-24": {
            $value: "#00bad13d"
          },
          "info-32": {
            $value: "#00bad152"
          },
          "info-38": {
            $value: "#00bad161"
          }
        },
        Success: {
          "success-8": {
            $value: "#28c76f14"
          },
          "success-16": {
            $value: "#28c76f29"
          },
          "success-24": {
            $value: "#28c76f3d"
          },
          "success-32": {
            $value: "#28c76f52"
          },
          "success-38": {
            $value: "#28c76f61"
          }
        },
        Warning: {
          "warning-8": {
            $value: "#ff9f4314"
          },
          "warning-16": {
            $value: "#ff9f4329"
          },
          "warning-24": {
            $value: "#ff9f433d"
          },
          "warning-32": {
            $value: "#ff9f4352"
          },
          "warning-38": {
            $value: "#ff9f4361"
          }
        },
        Error: {
          "error-8": {
            $value: "#ff4c5114"
          },
          "error-16": {
            $value: "#ff4c5129"
          },
          "error-24": {
            $value: "#ff4c513d"
          },
          "error-32": {
            $value: "#ff4c5152"
          },
          "error-38": {
            $value: "#ff4c5161"
          }
        },
        Gray: {
          "gray-8": {
            $value: "#2e263d14"
          },
          "gray-16": {
            $value: "#2e263d29"
          },
          "gray-24": {
            $value: "#2e263d3d"
          },
          "gray-32": {
            $value: "#2e263d52"
          },
          "gray-38": {
            $value: "#2e263d61"
          }
        },
        $type: "color"
      },
      "Border-Radius": {
        "border-radius-xs": {
          $value: "2px"
        },
        "border-radius-sm": {
          $value: "4px"
        },
        "border-radius-md": {
          $value: "6px"
        },
        "border-radius-lg": {
          $value: "8px"
        },
        "border-radius-xl": {
          $value: "10px"
        },
        "border-round": {
          $value: "500px"
        },
        $type: "dimension"
      },
      Typography: {
        "font-family": {
          $value: "'Inter', sans-serif",
          $type: "fontFamily"
        },
        "font-size": {
          12: {
            $value: "12px"
          },
          13: {
            $value: "13px"
          },
          15: {
            $value: "15px"
          },
          18: {
            $value: "18px"
          },
          24: {
            $value: "24px"
          },
          28: {
            $value: "28px"
          },
          38: {
            $value: "38px"
          },
          46: {
            $value: "46px"
          },
          $type: "dimension"
        },
        "font-weight": {
          regular: {
            $value: "400"
          },
          medium: {
            $value: "500"
          },
          semibold: {
            $value: "600"
          },
          bold: {
            $value: "700"
          },
          $type: "fontWeight"
        },
        "line-height": {
          14: {
            $value: "14px"
          },
          18: {
            $value: "18px"
          },
          20: {
            $value: "20px"
          },
          22: {
            $value: "22px"
          },
          28: {
            $value: "28px"
          },
          38: {
            $value: "38px"
          },
          42: {
            $value: "42px"
          },
          56: {
            $value: "56px"
          },
          68: {
            $value: "68px"
          },
          $type: "dimension"
        }
      }
    },
    "Pulse-Dark": {
      Padding: {
        "padding-1": {
          $value: "4px"
        },
        "padding-2": {
          $value: "8px"
        },
        "padding-3": {
          $value: "12px"
        },
        "padding-4": {
          $value: "16px"
        },
        "padding-5": {
          $value: "20px"
        },
        "padding-6": {
          $value: "24px"
        },
        "padding-7": {
          $value: "28px"
        },
        "padding-8": {
          $value: "32px"
        },
        "padding-9": {
          $value: "36px"
        },
        "padding-10": {
          $value: "40px"
        },
        "padding-11": {
          $value: "44px"
        },
        "padding-12": {
          $value: "48px"
        },
        "padding-13": {
          $value: "52px"
        },
        "padding-14": {
          $value: "56px"
        },
        "padding-15": {
          $value: "60px"
        },
        "padding-16": {
          $value: "64px"
        },
        "padding-25": {
          $value: "100px"
        },
        $type: "dimension"
      },
      Gap: {
        "gap-1": {
          $value: "4px"
        },
        "gap-2": {
          $value: "8px"
        },
        "gap-3": {
          $value: "12px"
        },
        "gap-4": {
          $value: "16px"
        },
        "gap-5": {
          $value: "20px"
        },
        "gap-6": {
          $value: "24px"
        },
        "gap-7": {
          $value: "28px"
        },
        "gap-8": {
          $value: "32px"
        },
        "gap-9": {
          $value: "36px"
        },
        "gap-10": {
          $value: "40px"
        },
        "gap-11": {
          $value: "44px"
        },
        "gap-12": {
          $value: "48px"
        },
        "gap-13": {
          $value: "52px"
        },
        "gap-14": {
          $value: "56px"
        },
        "gap-15": {
          $value: "60px"
        },
        "gap-16": {
          $value: "64px"
        },
        "gap-25": {
          $value: "100px"
        },
        $type: "dimension"
      },
      Color: {
        Primary: {
          "primary-100": {
            $value: "#e6f6fa"
          },
          "primary-200": {
            $value: "#e6f7ff"
          },
          "primary-300": {
            $value: "#abe2ed"
          },
          "primary-400": {
            $value: "#149eca"
          },
          "primary-500": {
            $value: "#58c4dc"
          },
          "primary-600": {
            $value: "#149eca"
          },
          "primary-700": {
            $value: "#087ea4"
          },
          "primary-800": {
            $value: "#045975"
          },
          "primary-900": {
            $value: "#043849"
          }
        },
        Secondary: {
          "secondary-100": {
            $value: "#f6f7f9"
          },
          "secondary-200": {
            $value: "#ebecf0"
          },
          "secondary-300": {
            $value: "#d0d3dc"
          },
          "secondary-400": {
            $value: "#99a1b3"
          },
          "secondary-500": {
            $value: "#404756"
          },
          "secondary-600": {
            $value: "#343a46"
          },
          "secondary-700": {
            $value: "#23272f"
          },
          "secondary-800": {
            $value: "#16181d"
          },
          "secondary-900": {
            $value: "#0d0f12"
          }
        },
        Info: {
          "info-100": {
            $value: "#ccf1f6"
          },
          "info-200": {
            $value: "#99e3ed"
          },
          "info-300": {
            $value: "#66d6e3"
          },
          "info-400": {
            $value: "#33c8da"
          },
          "info-500": {
            $value: "#00bad1"
          },
          "info-600": {
            $value: "#00a7bc"
          },
          "info-700": {
            $value: "#009eb2"
          },
          "info-800": {
            $value: "#0095a7"
          },
          "info-900": {
            $value: "#008c9d"
          }
        },
        Success: {
          "success-100": {
            $value: "#d4f4e2"
          },
          "success-200": {
            $value: "#a9e9c5"
          },
          "success-300": {
            $value: "#7edda9"
          },
          "success-400": {
            $value: "#53d28c"
          },
          "success-500": {
            $value: "#28c76f"
          },
          "success-600": {
            $value: "#24b364"
          },
          "success-700": {
            $value: "#22a95e"
          },
          "success-800": {
            $value: "#209f59"
          },
          "success-900": {
            $value: "#1e9553"
          }
        },
        Warning: {
          "warning-100": {
            $value: "#ffecd9"
          },
          "warning-200": {
            $value: "#ffd9b4"
          },
          "warning-300": {
            $value: "#ffc58e"
          },
          "warning-400": {
            $value: "#ffb269"
          },
          "warning-500": {
            $value: "#ff9f43"
          },
          "warning-600": {
            $value: "#e68f3c"
          },
          "warning-700": {
            $value: "#d98739"
          },
          "warning-800": {
            $value: "#cc7f36"
          },
          "warning-900": {
            $value: "#bf7732"
          }
        },
        Error: {
          "error-100": {
            $value: "#ffdbdc"
          },
          "error-200": {
            $value: "#ffb7b9"
          },
          "error-300": {
            $value: "#ff9497"
          },
          "error-400": {
            $value: "#ff7074"
          },
          "error-500": {
            $value: "#ff4c51"
          },
          "error-600": {
            $value: "#e64449"
          },
          "error-700": {
            $value: "#d94145"
          },
          "error-800": {
            $value: "#cc3d41"
          },
          "error-900": {
            $value: "#bf393d"
          }
        },
        Gray: {
          "gray-100": {
            $value: "#16181d"
          },
          "gray-200": {
            $value: "#23272f"
          },
          "gray-300": {
            $value: "#343a46"
          },
          "gray-400": {
            $value: "#404756"
          },
          "gray-500": {
            $value: "#4e5769"
          },
          "gray-600": {
            $value: "#5e687e"
          },
          "gray-700": {
            $value: "#78839b"
          },
          "gray-800": {
            $value: "#99a1b3"
          },
          "gray-900": {
            $value: "#bcc1cd"
          }
        },
        $type: "color"
      },
      "Opacity-Color": {
        Primary: {
          "primary-8": {
            $value: "#58c4dc14"
          },
          "primary-16": {
            $value: "#58c4dc29"
          },
          "primary-24": {
            $value: "#58c4dc3d"
          },
          "primary-32": {
            $value: "#58c4dc52"
          },
          "primary-38": {
            $value: "#58c4dc61"
          }
        },
        Secondary: {
          "secondary-8": {
            $value: "#40475614"
          },
          "secondary-16": {
            $value: "#40475629"
          },
          "secondary-24": {
            $value: "#4047563d"
          },
          "secondary-32": {
            $value: "#40475652"
          },
          "secondary-38": {
            $value: "#40475661"
          }
        },
        Info: {
          "info-8": {
            $value: "#00bad114"
          },
          "info-16": {
            $value: "#00bad129"
          },
          "info-24": {
            $value: "#00bad13d"
          },
          "info-32": {
            $value: "#00bad152"
          },
          "info-38": {
            $value: "#00bad161"
          }
        },
        Success: {
          "success-8": {
            $value: "#28c76f14"
          },
          "success-16": {
            $value: "#28c76f29"
          },
          "success-24": {
            $value: "#28c76f3d"
          },
          "success-32": {
            $value: "#28c76f52"
          },
          "success-38": {
            $value: "#28c76f61"
          }
        },
        Warning: {
          "warning-8": {
            $value: "#ff9f4314"
          },
          "warning-16": {
            $value: "#ff9f4329"
          },
          "warning-24": {
            $value: "#ff9f433d"
          },
          "warning-32": {
            $value: "#ff9f4352"
          },
          "warning-38": {
            $value: "#ff9f4361"
          }
        },
        Error: {
          "error-8": {
            $value: "#ff4c5114"
          },
          "error-16": {
            $value: "#ff4c5129"
          },
          "error-24": {
            $value: "#ff4c513d"
          },
          "error-32": {
            $value: "#ff4c5152"
          },
          "error-38": {
            $value: "#ff4c5161"
          }
        },
        Gray: {
          "gray-8": {
            $value: "#f6f7f914"
          },
          "gray-16": {
            $value: "#f6f7f929"
          },
          "gray-24": {
            $value: "#f6f7f93d"
          },
          "gray-32": {
            $value: "#f6f7f952"
          },
          "gray-38": {
            $value: "#f6f7f961"
          }
        },
        $type: "color"
      },
      "Border-Radius": {
        "border-radius-xs": {
          $value: "2px"
        },
        "border-radius-sm": {
          $value: "4px"
        },
        "border-radius-md": {
          $value: "6px"
        },
        "border-radius-lg": {
          $value: "8px"
        },
        "border-radius-xl": {
          $value: "10px"
        },
        "border-round": {
          $value: "500px"
        },
        $type: "dimension"
      },
      Typography: {
        "font-family": {
          $value: "'Roboto', sans-serif",
          $type: "fontFamily"
        },
        "font-size": {
          12: {
            $value: "12px"
          },
          13: {
            $value: "13px"
          },
          15: {
            $value: "15px"
          },
          18: {
            $value: "18px"
          },
          24: {
            $value: "24px"
          },
          28: {
            $value: "28px"
          },
          38: {
            $value: "38px"
          },
          46: {
            $value: "46px"
          },
          $type: "dimension"
        },
        "font-weight": {
          regular: {
            $value: "400"
          },
          medium: {
            $value: "500"
          },
          semibold: {
            $value: "600"
          },
          bold: {
            $value: "700"
          },
          $type: "fontWeight"
        },
        "line-height": {
          14: {
            $value: "14px"
          },
          18: {
            $value: "18px"
          },
          20: {
            $value: "20px"
          },
          22: {
            $value: "22px"
          },
          28: {
            $value: "28px"
          },
          38: {
            $value: "38px"
          },
          42: {
            $value: "42px"
          },
          56: {
            $value: "56px"
          },
          68: {
            $value: "68px"
          },
          $type: "dimension"
        }
      }
    },
    Pulse: {
      Padding: {
        "padding-1": {
          $value: "4px"
        },
        "padding-2": {
          $value: "8px"
        },
        "padding-3": {
          $value: "12px"
        },
        "padding-4": {
          $value: "16px"
        },
        "padding-5": {
          $value: "20px"
        },
        "padding-6": {
          $value: "24px"
        },
        "padding-7": {
          $value: "28px"
        },
        "padding-8": {
          $value: "32px"
        },
        "padding-9": {
          $value: "36px"
        },
        "padding-10": {
          $value: "40px"
        },
        "padding-11": {
          $value: "44px"
        },
        "padding-12": {
          $value: "48px"
        },
        "padding-13": {
          $value: "52px"
        },
        "padding-14": {
          $value: "56px"
        },
        "padding-15": {
          $value: "60px"
        },
        "padding-16": {
          $value: "64px"
        },
        "padding-25": {
          $value: "100px"
        },
        $type: "dimension"
      },
      Gap: {
        "gap-1": {
          $value: "4px"
        },
        "gap-2": {
          $value: "8px"
        },
        "gap-3": {
          $value: "12px"
        },
        "gap-4": {
          $value: "16px"
        },
        "gap-5": {
          $value: "20px"
        },
        "gap-6": {
          $value: "24px"
        },
        "gap-7": {
          $value: "28px"
        },
        "gap-8": {
          $value: "32px"
        },
        "gap-9": {
          $value: "36px"
        },
        "gap-10": {
          $value: "40px"
        },
        "gap-11": {
          $value: "44px"
        },
        "gap-12": {
          $value: "48px"
        },
        "gap-13": {
          $value: "52px"
        },
        "gap-14": {
          $value: "56px"
        },
        "gap-15": {
          $value: "60px"
        },
        "gap-16": {
          $value: "64px"
        },
        "gap-25": {
          $value: "100px"
        },
        $type: "dimension"
      },
      Color: {
        Primary: {
          "primary-50": {
            $value: "#E6F6FA"
          },
          "primary-100": {
            $value: "#E6F7FF"
          },
          "primary-200": {
            $value: "#ABE2ED"
          },
          "primary-300": {
            $value: "#58C4DC"
          },
          "primary-400": {
            $value: "#149ECA"
          },
          "primary-500": {
            $value: "#087EA4"
          },
          "primary-600": {
            $value: "#045975"
          },
          "primary-700": {
            $value: "#044A62"
          },
          "primary-800": {
            $value: "#043849"
          },
          "primary-900": {
            $value: "#032B38"
          }
        },
        Secondary: {
          "secondary-100": {
            $value: "#F6F7F9"
          },
          "secondary-200": {
            $value: "#EBECF0"
          },
          "secondary-300": {
            $value: "#D0D3DC"
          },
          "secondary-400": {
            $value: "#78839B"
          },
          "secondary-500": {
            $value: "#404756"
          },
          "secondary-600": {
            $value: "#343A46"
          },
          "secondary-700": {
            $value: "#23272F"
          },
          "secondary-800": {
            $value: "#16181D"
          },
          "secondary-900": {
            $value: "#0D0F12"
          }
        },
        Info: {
          "info-100": {
            $value: "#ccf1f6"
          },
          "info-200": {
            $value: "#99e3ed"
          },
          "info-300": {
            $value: "#66d6e3"
          },
          "info-400": {
            $value: "#33c8da"
          },
          "info-500": {
            $value: "#00bad1"
          },
          "info-600": {
            $value: "#00a7bc"
          },
          "info-700": {
            $value: "#009eb2"
          },
          "info-800": {
            $value: "#0095a7"
          },
          "info-900": {
            $value: "#008c9d"
          }
        },
        Success: {
          "success-100": {
            $value: "#d4f4e2"
          },
          "success-200": {
            $value: "#a9e9c5"
          },
          "success-300": {
            $value: "#7edda9"
          },
          "success-400": {
            $value: "#53d28c"
          },
          "success-500": {
            $value: "#28c76f"
          },
          "success-600": {
            $value: "#24b364"
          },
          "success-700": {
            $value: "#22a95e"
          },
          "success-800": {
            $value: "#209f59"
          },
          "success-900": {
            $value: "#1e9553"
          }
        },
        Warning: {
          "warning-100": {
            $value: "#ffecd9"
          },
          "warning-200": {
            $value: "#ffd9b4"
          },
          "warning-300": {
            $value: "#ffc58e"
          },
          "warning-400": {
            $value: "#ffb269"
          },
          "warning-500": {
            $value: "#ff9f43"
          },
          "warning-600": {
            $value: "#e68f3c"
          },
          "warning-700": {
            $value: "#d98739"
          },
          "warning-800": {
            $value: "#cc7f36"
          },
          "warning-900": {
            $value: "#bf7732"
          }
        },
        Error: {
          "error-100": {
            $value: "#ffdbdc"
          },
          "error-200": {
            $value: "#ffb7b9"
          },
          "error-300": {
            $value: "#ff9497"
          },
          "error-400": {
            $value: "#ff7074"
          },
          "error-500": {
            $value: "#ff4c51"
          },
          "error-600": {
            $value: "#e64449"
          },
          "error-700": {
            $value: "#d94145"
          },
          "error-800": {
            $value: "#cc3d41"
          },
          "error-900": {
            $value: "#bf393d"
          }
        },
        Gray: {
          "gray-100": {
            $value: "#EBECF0"
          },
          "gray-200": {
            $value: "#BCC1CD"
          },
          "gray-300": {
            $value: "#99A1B3"
          },
          "gray-400": {
            $value: "#78839B"
          },
          "gray-500": {
            $value: "#5E687E"
          },
          "gray-600": {
            $value: "#4E5769"
          },
          "gray-700": {
            $value: "#404756"
          },
          "gray-800": {
            $value: "#343A46"
          },
          "gray-900": {
            $value: "#23272F"
          }
        },
        $type: "color"
      },
      "Opacity-Color": {
        Primary: {
          "primary-8": {
            $value: "#087EA414"
          },
          "primary-16": {
            $value: "#087EA429"
          },
          "primary-24": {
            $value: "#087EA43d"
          },
          "primary-32": {
            $value: "#087EA452"
          },
          "primary-38": {
            $value: "#087EA461"
          }
        },
        Secondary: {
          "secondary-8": {
            $value: "#40475614"
          },
          "secondary-16": {
            $value: "#40475629"
          },
          "secondary-24": {
            $value: "#4047563d"
          },
          "secondary-32": {
            $value: "#40475652"
          },
          "secondary-38": {
            $value: "#40475661"
          }
        },
        Info: {
          "info-8": {
            $value: "#00bad114"
          },
          "info-16": {
            $value: "#00bad129"
          },
          "info-24": {
            $value: "#00bad13d"
          },
          "info-32": {
            $value: "#00bad152"
          },
          "info-38": {
            $value: "#00bad161"
          }
        },
        Success: {
          "success-8": {
            $value: "#28c76f14"
          },
          "success-16": {
            $value: "#28c76f29"
          },
          "success-24": {
            $value: "#28c76f3d"
          },
          "success-32": {
            $value: "#28c76f52"
          },
          "success-38": {
            $value: "#28c76f61"
          }
        },
        Warning: {
          "warning-8": {
            $value: "#ff9f4314"
          },
          "warning-16": {
            $value: "#ff9f4329"
          },
          "warning-24": {
            $value: "#ff9f433d"
          },
          "warning-32": {
            $value: "#ff9f4352"
          },
          "warning-38": {
            $value: "#ff9f4361"
          }
        },
        Error: {
          "error-8": {
            $value: "#ff4c5114"
          },
          "error-16": {
            $value: "#ff4c5129"
          },
          "error-24": {
            $value: "#ff4c513d"
          },
          "error-32": {
            $value: "#ff4c5152"
          },
          "error-38": {
            $value: "#ff4c5161"
          }
        },
        Gray: {
          "gray-8": {
            $value: "#23272f14"
          },
          "gray-16": {
            $value: "#23272f29"
          },
          "gray-24": {
            $value: "#23272f3d"
          },
          "gray-32": {
            $value: "#23272f52"
          },
          "gray-38": {
            $value: "#23272f61"
          }
        },
        $type: "color"
      },
      "Border-Radius": {
        "border-radius-xs": {
          $value: "2px"
        },
        "border-radius-sm": {
          $value: "4px"
        },
        "border-radius-md": {
          $value: "6px"
        },
        "border-radius-lg": {
          $value: "8px"
        },
        "border-radius-xl": {
          $value: "10px"
        },
        "border-round": {
          $value: "500px"
        },
        $type: "dimension"
      },
      Typography: {
        "font-family": {
          $value: "'Inter', sans-serif",
          $type: "fontFamily"
        },
        "font-size": {
          12: {
            $value: "12px"
          },
          13: {
            $value: "13px"
          },
          15: {
            $value: "15px"
          },
          18: {
            $value: "18px"
          },
          24: {
            $value: "24px"
          },
          28: {
            $value: "28px"
          },
          38: {
            $value: "38px"
          },
          46: {
            $value: "46px"
          },
          $type: "dimension"
        },
        "font-weight": {
          regular: {
            $value: "400"
          },
          medium: {
            $value: "500"
          },
          semibold: {
            $value: "600"
          },
          bold: {
            $value: "700"
          },
          $type: "fontWeight"
        },
        "line-height": {
          14: {
            $value: "14px"
          },
          18: {
            $value: "18px"
          },
          20: {
            $value: "20px"
          },
          22: {
            $value: "22px"
          },
          28: {
            $value: "28px"
          },
          38: {
            $value: "38px"
          },
          42: {
            $value: "42px"
          },
          56: {
            $value: "56px"
          },
          68: {
            $value: "68px"
          },
          $type: "dimension"
        }
      }
    },
    "Teal-Dark": {
      Padding: {
        "padding-1": {
          $value: "4px"
        },
        "padding-2": {
          $value: "8px"
        },
        "padding-3": {
          $value: "12px"
        },
        "padding-4": {
          $value: "16px"
        },
        "padding-5": {
          $value: "20px"
        },
        "padding-6": {
          $value: "24px"
        },
        "padding-7": {
          $value: "28px"
        },
        "padding-8": {
          $value: "32px"
        },
        "padding-9": {
          $value: "36px"
        },
        "padding-10": {
          $value: "40px"
        },
        "padding-11": {
          $value: "44px"
        },
        "padding-12": {
          $value: "48px"
        },
        "padding-13": {
          $value: "52px"
        },
        "padding-14": {
          $value: "56px"
        },
        "padding-15": {
          $value: "60px"
        },
        "padding-16": {
          $value: "64px"
        },
        "padding-25": {
          $value: "100px"
        },
        $type: "dimension"
      },
      Gap: {
        "gap-1": {
          $value: "4px"
        },
        "gap-2": {
          $value: "8px"
        },
        "gap-3": {
          $value: "12px"
        },
        "gap-4": {
          $value: "16px"
        },
        "gap-5": {
          $value: "20px"
        },
        "gap-6": {
          $value: "24px"
        },
        "gap-7": {
          $value: "28px"
        },
        "gap-8": {
          $value: "32px"
        },
        "gap-9": {
          $value: "36px"
        },
        "gap-10": {
          $value: "40px"
        },
        "gap-11": {
          $value: "44px"
        },
        "gap-12": {
          $value: "48px"
        },
        "gap-13": {
          $value: "52px"
        },
        "gap-14": {
          $value: "56px"
        },
        "gap-15": {
          $value: "60px"
        },
        "gap-16": {
          $value: "64px"
        },
        "gap-25": {
          $value: "100px"
        },
        $type: "dimension"
      },
      Color: {
        Primary: {
          "primary-50": {
            $value: "#f0fdfa"
          },
          "primary-100": {
            $value: "#ccfbf1"
          },
          "primary-200": {
            $value: "#99f6e4"
          },
          "primary-300": {
            $value: "#5eead4"
          },
          "primary-400": {
            $value: "#2dd4bf"
          },
          "primary-500": {
            $value: "#14b8a6"
          },
          "primary-600": {
            $value: "#0d9488"
          },
          "primary-700": {
            $value: "#0f766e"
          },
          "primary-800": {
            $value: "#115e59"
          },
          "primary-900": {
            $value: "#134e4a"
          }
        },
        Secondary: {
          "secondary-100": {
            $value: "#f1f5f9"
          },
          "secondary-200": {
            $value: "#e2e8f0"
          },
          "secondary-300": {
            $value: "#cbd5e1"
          },
          "secondary-400": {
            $value: "#94a3b8"
          },
          "secondary-500": {
            $value: "#64748b"
          },
          "secondary-600": {
            $value: "#475569"
          },
          "secondary-700": {
            $value: "#334155"
          },
          "secondary-800": {
            $value: "#1e293b"
          },
          "secondary-900": {
            $value: "#0f172a"
          }
        },
        Info: {
          "info-100": {
            $value: "#e0f2fe"
          },
          "info-200": {
            $value: "#bae6fd"
          },
          "info-300": {
            $value: "#7dd3fc"
          },
          "info-400": {
            $value: "#38bdf8"
          },
          "info-500": {
            $value: "#0ea5e9"
          },
          "info-600": {
            $value: "#0284c7"
          },
          "info-700": {
            $value: "#0369a1"
          },
          "info-800": {
            $value: "#075985"
          },
          "info-900": {
            $value: "#0c4a6e"
          }
        },
        Success: {
          "success-100": {
            $value: "#dcfce7"
          },
          "success-200": {
            $value: "#bbf7d0"
          },
          "success-300": {
            $value: "#86efac"
          },
          "success-400": {
            $value: "#4ade80"
          },
          "success-500": {
            $value: "#22c55e"
          },
          "success-600": {
            $value: "#16a34a"
          },
          "success-700": {
            $value: "#15803d"
          },
          "success-800": {
            $value: "#166534"
          },
          "success-900": {
            $value: "#14532d"
          }
        },
        Warning: {
          "warning-100": {
            $value: "#fef3c7"
          },
          "warning-200": {
            $value: "#fde68a"
          },
          "warning-300": {
            $value: "#fcd34d"
          },
          "warning-400": {
            $value: "#fbbf24"
          },
          "warning-500": {
            $value: "#f59e0b"
          },
          "warning-600": {
            $value: "#d97706"
          },
          "warning-700": {
            $value: "#b45309"
          },
          "warning-800": {
            $value: "#92400e"
          },
          "warning-900": {
            $value: "#78350f"
          }
        },
        Error: {
          "error-100": {
            $value: "#fee2e2"
          },
          "error-200": {
            $value: "#fecaca"
          },
          "error-300": {
            $value: "#fca5a5"
          },
          "error-400": {
            $value: "#f87171"
          },
          "error-500": {
            $value: "#ef4444"
          },
          "error-600": {
            $value: "#dc2626"
          },
          "error-700": {
            $value: "#b91c1c"
          },
          "error-800": {
            $value: "#991b1b"
          },
          "error-900": {
            $value: "#7f1d1d"
          }
        },
        Gray: {
          "gray-100": {
            $value: "#f3f4f6"
          },
          "gray-200": {
            $value: "#e5e7eb"
          },
          "gray-300": {
            $value: "#d1d5db"
          },
          "gray-400": {
            $value: "#9ca3af"
          },
          "gray-500": {
            $value: "#6b7280"
          },
          "gray-600": {
            $value: "#4b5563"
          },
          "gray-700": {
            $value: "#374151"
          },
          "gray-800": {
            $value: "#1f2937"
          },
          "gray-900": {
            $value: "#111827"
          }
        },
        $type: "color"
      },
      "Opacity-Color": {
        Primary: {
          "primary-8": {
            $value: "#14b8a614"
          },
          "primary-16": {
            $value: "#14b8a629"
          },
          "primary-24": {
            $value: "#14b8a63d"
          },
          "primary-32": {
            $value: "#14b8a652"
          },
          "primary-38": {
            $value: "#14b8a661"
          }
        },
        Secondary: {
          "secondary-8": {
            $value: "#64748b14"
          },
          "secondary-16": {
            $value: "#64748b29"
          },
          "secondary-24": {
            $value: "#64748b3d"
          },
          "secondary-32": {
            $value: "#64748b52"
          },
          "secondary-38": {
            $value: "#64748b61"
          }
        },
        Info: {
          "info-8": {
            $value: "#0ea5e914"
          },
          "info-16": {
            $value: "#0ea5e929"
          },
          "info-24": {
            $value: "#0ea5e93d"
          },
          "info-32": {
            $value: "#0ea5e952"
          },
          "info-38": {
            $value: "#0ea5e961"
          }
        },
        Success: {
          "success-8": {
            $value: "#22c55e14"
          },
          "success-16": {
            $value: "#22c55e29"
          },
          "success-24": {
            $value: "#22c55e3d"
          },
          "success-32": {
            $value: "#22c55e52"
          },
          "success-38": {
            $value: "#22c55e61"
          }
        },
        Warning: {
          "warning-8": {
            $value: "#f59e0b14"
          },
          "warning-16": {
            $value: "#f59e0b29"
          },
          "warning-24": {
            $value: "#f59e0b3d"
          },
          "warning-32": {
            $value: "#f59e0b52"
          },
          "warning-38": {
            $value: "#f59e0b61"
          }
        },
        Error: {
          "error-8": {
            $value: "#ef444414"
          },
          "error-16": {
            $value: "#ef444429"
          },
          "error-24": {
            $value: "#ef44443d"
          },
          "error-32": {
            $value: "#ef444452"
          },
          "error-38": {
            $value: "#ef444461"
          }
        },
        Gray: {
          "gray-8": {
            $value: "#1e293b14"
          },
          "gray-16": {
            $value: "#1e293b29"
          },
          "gray-24": {
            $value: "#1e293b3d"
          },
          "gray-32": {
            $value: "#1e293b52"
          },
          "gray-38": {
            $value: "#1e293b61"
          }
        },
        $type: "color"
      },
      "Border-Radius": {
        "border-radius-xs": {
          $value: "2px"
        },
        "border-radius-sm": {
          $value: "4px"
        },
        "border-radius-md": {
          $value: "6px"
        },
        "border-radius-lg": {
          $value: "8px"
        },
        "border-radius-xl": {
          $value: "10px"
        },
        "border-round": {
          $value: "500px"
        },
        $type: "dimension"
      },
      Typography: {
        "font-family": {
          $value: "'Inter', sans-serif",
          $type: "fontFamily"
        },
        "font-size": {
          12: {
            $value: "12px"
          },
          13: {
            $value: "13px"
          },
          15: {
            $value: "15px"
          },
          18: {
            $value: "18px"
          },
          24: {
            $value: "24px"
          },
          28: {
            $value: "28px"
          },
          38: {
            $value: "38px"
          },
          46: {
            $value: "46px"
          },
          $type: "dimension"
        },
        "font-weight": {
          regular: {
            $value: "400"
          },
          medium: {
            $value: "500"
          },
          semibold: {
            $value: "600"
          },
          bold: {
            $value: "700"
          },
          $type: "fontWeight"
        },
        "line-height": {
          14: {
            $value: "14px"
          },
          18: {
            $value: "18px"
          },
          20: {
            $value: "20px"
          },
          22: {
            $value: "22px"
          },
          28: {
            $value: "28px"
          },
          38: {
            $value: "38px"
          },
          42: {
            $value: "42px"
          },
          56: {
            $value: "56px"
          },
          68: {
            $value: "68px"
          },
          $type: "dimension"
        }
      }
    },
    Teal: {
      Padding: {
        "padding-1": {
          $value: "4px"
        },
        "padding-2": {
          $value: "8px"
        },
        "padding-3": {
          $value: "12px"
        },
        "padding-4": {
          $value: "16px"
        },
        "padding-5": {
          $value: "20px"
        },
        "padding-6": {
          $value: "24px"
        },
        "padding-7": {
          $value: "28px"
        },
        "padding-8": {
          $value: "32px"
        },
        "padding-9": {
          $value: "36px"
        },
        "padding-10": {
          $value: "40px"
        },
        "padding-11": {
          $value: "44px"
        },
        "padding-12": {
          $value: "48px"
        },
        "padding-13": {
          $value: "52px"
        },
        "padding-14": {
          $value: "56px"
        },
        "padding-15": {
          $value: "60px"
        },
        "padding-16": {
          $value: "64px"
        },
        "padding-25": {
          $value: "100px"
        },
        $type: "dimension"
      },
      Gap: {
        "gap-1": {
          $value: "4px"
        },
        "gap-2": {
          $value: "8px"
        },
        "gap-3": {
          $value: "12px"
        },
        "gap-4": {
          $value: "16px"
        },
        "gap-5": {
          $value: "20px"
        },
        "gap-6": {
          $value: "24px"
        },
        "gap-7": {
          $value: "28px"
        },
        "gap-8": {
          $value: "32px"
        },
        "gap-9": {
          $value: "36px"
        },
        "gap-10": {
          $value: "40px"
        },
        "gap-11": {
          $value: "44px"
        },
        "gap-12": {
          $value: "48px"
        },
        "gap-13": {
          $value: "52px"
        },
        "gap-14": {
          $value: "56px"
        },
        "gap-15": {
          $value: "60px"
        },
        "gap-16": {
          $value: "64px"
        },
        "gap-25": {
          $value: "100px"
        },
        $type: "dimension"
      },
      Color: {
        Primary: {
          "primary-50": {
            $value: "#f0fdfa"
          },
          "primary-100": {
            $value: "#ccfbf1"
          },
          "primary-200": {
            $value: "#99f6e4"
          },
          "primary-300": {
            $value: "#5eead4"
          },
          "primary-400": {
            $value: "#2dd4bf"
          },
          "primary-500": {
            $value: "#14b8a6"
          },
          "primary-600": {
            $value: "#0d9488"
          },
          "primary-700": {
            $value: "#0f766e"
          },
          "primary-800": {
            $value: "#115e59"
          },
          "primary-900": {
            $value: "#134e4a"
          }
        },
        Secondary: {
          "secondary-100": {
            $value: "#f1f5f9"
          },
          "secondary-200": {
            $value: "#e2e8f0"
          },
          "secondary-300": {
            $value: "#cbd5e1"
          },
          "secondary-400": {
            $value: "#94a3b8"
          },
          "secondary-500": {
            $value: "#64748b"
          },
          "secondary-600": {
            $value: "#475569"
          },
          "secondary-700": {
            $value: "#334155"
          },
          "secondary-800": {
            $value: "#1e293b"
          },
          "secondary-900": {
            $value: "#0f172a"
          }
        },
        Info: {
          "info-100": {
            $value: "#e0f2fe"
          },
          "info-200": {
            $value: "#bae6fd"
          },
          "info-300": {
            $value: "#7dd3fc"
          },
          "info-400": {
            $value: "#38bdf8"
          },
          "info-500": {
            $value: "#0ea5e9"
          },
          "info-600": {
            $value: "#0284c7"
          },
          "info-700": {
            $value: "#0369a1"
          },
          "info-800": {
            $value: "#075985"
          },
          "info-900": {
            $value: "#0c4a6e"
          }
        },
        Success: {
          "success-100": {
            $value: "#dcfce7"
          },
          "success-200": {
            $value: "#bbf7d0"
          },
          "success-300": {
            $value: "#86efac"
          },
          "success-400": {
            $value: "#4ade80"
          },
          "success-500": {
            $value: "#22c55e"
          },
          "success-600": {
            $value: "#16a34a"
          },
          "success-700": {
            $value: "#15803d"
          },
          "success-800": {
            $value: "#166534"
          },
          "success-900": {
            $value: "#14532d"
          }
        },
        Warning: {
          "warning-100": {
            $value: "#fef3c7"
          },
          "warning-200": {
            $value: "#fde68a"
          },
          "warning-300": {
            $value: "#fcd34d"
          },
          "warning-400": {
            $value: "#fbbf24"
          },
          "warning-500": {
            $value: "#f59e0b"
          },
          "warning-600": {
            $value: "#d97706"
          },
          "warning-700": {
            $value: "#b45309"
          },
          "warning-800": {
            $value: "#92400e"
          },
          "warning-900": {
            $value: "#78350f"
          }
        },
        Error: {
          "error-100": {
            $value: "#fee2e2"
          },
          "error-200": {
            $value: "#fecaca"
          },
          "error-300": {
            $value: "#fca5a5"
          },
          "error-400": {
            $value: "#f87171"
          },
          "error-500": {
            $value: "#ef4444"
          },
          "error-600": {
            $value: "#dc2626"
          },
          "error-700": {
            $value: "#b91c1c"
          },
          "error-800": {
            $value: "#991b1b"
          },
          "error-900": {
            $value: "#7f1d1d"
          }
        },
        Gray: {
          "gray-100": {
            $value: "#f3f4f6"
          },
          "gray-200": {
            $value: "#e5e7eb"
          },
          "gray-300": {
            $value: "#d1d5db"
          },
          "gray-400": {
            $value: "#9ca3af"
          },
          "gray-500": {
            $value: "#6b7280"
          },
          "gray-600": {
            $value: "#4b5563"
          },
          "gray-700": {
            $value: "#374151"
          },
          "gray-800": {
            $value: "#1f2937"
          },
          "gray-900": {
            $value: "#111827"
          }
        },
        $type: "color"
      },
      "Opacity-Color": {
        Primary: {
          "primary-8": {
            $value: "#14b8a614"
          },
          "primary-16": {
            $value: "#14b8a629"
          },
          "primary-24": {
            $value: "#14b8a63d"
          },
          "primary-32": {
            $value: "#14b8a652"
          },
          "primary-38": {
            $value: "#14b8a661"
          }
        },
        Secondary: {
          "secondary-8": {
            $value: "#64748b14"
          },
          "secondary-16": {
            $value: "#64748b29"
          },
          "secondary-24": {
            $value: "#64748b3d"
          },
          "secondary-32": {
            $value: "#64748b52"
          },
          "secondary-38": {
            $value: "#64748b61"
          }
        },
        Info: {
          "info-8": {
            $value: "#0ea5e914"
          },
          "info-16": {
            $value: "#0ea5e929"
          },
          "info-24": {
            $value: "#0ea5e93d"
          },
          "info-32": {
            $value: "#0ea5e952"
          },
          "info-38": {
            $value: "#0ea5e961"
          }
        },
        Success: {
          "success-8": {
            $value: "#22c55e14"
          },
          "success-16": {
            $value: "#22c55e29"
          },
          "success-24": {
            $value: "#22c55e3d"
          },
          "success-32": {
            $value: "#22c55e52"
          },
          "success-38": {
            $value: "#22c55e61"
          }
        },
        Warning: {
          "warning-8": {
            $value: "#f59e0b14"
          },
          "warning-16": {
            $value: "#f59e0b29"
          },
          "warning-24": {
            $value: "#f59e0b3d"
          },
          "warning-32": {
            $value: "#f59e0b52"
          },
          "warning-38": {
            $value: "#f59e0b61"
          }
        },
        Error: {
          "error-8": {
            $value: "#ef444414"
          },
          "error-16": {
            $value: "#ef444429"
          },
          "error-24": {
            $value: "#ef44443d"
          },
          "error-32": {
            $value: "#ef444452"
          },
          "error-38": {
            $value: "#ef444461"
          }
        },
        Gray: {
          "gray-8": {
            $value: "#1e293b14"
          },
          "gray-16": {
            $value: "#1e293b29"
          },
          "gray-24": {
            $value: "#1e293b3d"
          },
          "gray-32": {
            $value: "#1e293b52"
          },
          "gray-38": {
            $value: "#1e293b61"
          }
        },
        $type: "color"
      },
      "Border-Radius": {
        "border-radius-xs": {
          $value: "2px"
        },
        "border-radius-sm": {
          $value: "4px"
        },
        "border-radius-md": {
          $value: "6px"
        },
        "border-radius-lg": {
          $value: "8px"
        },
        "border-radius-xl": {
          $value: "10px"
        },
        "border-round": {
          $value: "500px"
        },
        $type: "dimension"
      },
      Typography: {
        "font-family": {
          $value: "'Inter', sans-serif",
          $type: "fontFamily"
        },
        "font-size": {
          12: {
            $value: "12px"
          },
          13: {
            $value: "13px"
          },
          15: {
            $value: "15px"
          },
          18: {
            $value: "18px"
          },
          24: {
            $value: "24px"
          },
          28: {
            $value: "28px"
          },
          38: {
            $value: "38px"
          },
          46: {
            $value: "46px"
          },
          $type: "dimension"
        },
        "font-weight": {
          regular: {
            $value: "400"
          },
          medium: {
            $value: "500"
          },
          semibold: {
            $value: "600"
          },
          bold: {
            $value: "700"
          },
          $type: "fontWeight"
        },
        "line-height": {
          14: {
            $value: "14px"
          },
          18: {
            $value: "18px"
          },
          20: {
            $value: "20px"
          },
          22: {
            $value: "22px"
          },
          28: {
            $value: "28px"
          },
          38: {
            $value: "38px"
          },
          42: {
            $value: "42px"
          },
          56: {
            $value: "56px"
          },
          68: {
            $value: "68px"
          },
          $type: "dimension"
        }
      }
    }
  }
}, Ga = { Dark: "dark", Light: "light", "Pulse-Dark": "pulse-dark", Pulse: "pulse", "Teal-Dark": "teal-dark", Teal: "teal" };
function za(e) {
  const a = e.match(/^\{(.+)\}$/);
  if (!a) return e;
  let r = Le;
  for (const i of a[1].split(".")) {
    if (!r || typeof r != "object" || !(i in r))
      throw new Error(`Unknown token reference: ${e}`);
    r = r[i];
  }
  if (!r || typeof r != "object" || !("$value" in r) || typeof r.$value != "string")
    throw new Error(`Invalid token reference: ${e}`);
  return za(r.$value);
}
const Xe = (e) => Object.fromEntries(
  Object.entries(e).flatMap(([a, r]) => typeof r == "string" ? [] : [[a, za(r.$value)]])
), ue = (e, a = "") => Object.fromEntries(Object.entries(Xe(e)).map(([r, i]) => [r.replace(a, ""), i])), ke = (e, a = "") => Object.fromEntries(
  Object.entries(Xe(e)).map(([r, i]) => [r.replace(a, ""), Number.parseFloat(i)])
);
function ci(e) {
  const a = Le.Variables[e], r = Le.Primitives[e], i = Xe(a["Color-Palette"]);
  return {
    core: {
      color: {
        primary: ue(r.Color.Primary, "primary-"),
        secondary: ue(r.Color.Secondary, "secondary-"),
        info: ue(r.Color.Info, "info-"),
        error: ue(r.Color.Error, "error-"),
        warning: ue(r.Color.Warning, "warning-"),
        success: ue(r.Color.Success, "success-"),
        gray: ue(r.Color.Gray, "gray-"),
        palette: i
      },
      space: ke(r.Gap, "gap-"),
      radius: ke(r["Border-Radius"], /^(border-radius-|border-)/),
      fontFamily: r.Typography["font-family"].$value,
      fontSize: ke(r.Typography["font-size"]),
      fontWeight: ke(r.Typography["font-weight"]),
      lineHeight: ke(r.Typography["line-height"])
    },
    semantic: {
      color: {
        background: { canvas: a.Misc["body-bg"].$value, surface: a.Misc.paper.$value },
        text: {
          primary: a.Theme["text-primary"].$value,
          secondary: a.Theme["text-secondary"].$value,
          muted: a.Theme["text-subtitle"].$value,
          disabled: a.Theme["text-disabled"].$value
        },
        border: { subtle: a.Theme["outline-border"].$value, strong: a.Theme["input-border"].$value }
      }
    }
  };
}
const Oe = Object.fromEntries(
  Object.keys(Le.Variables).map((e) => [Ga[e], ci(e)])
), Ni = Object.values(Ga).sort((e, a) => e.localeCompare(a)), Li = { core: Oe.pulse.core, semantic: Oe.pulse.semantic, themes: Oe }, Gi = (e) => Oe[e], zi = { mobile: "640px", tablet: "900px", desktop: "1280px" };
export {
  $i as Accordion,
  yi as Autocomplete,
  ie as BodyText,
  Xr as Button,
  Ci as Card,
  bi as Carousel,
  ki as Chart,
  Di as Drawer,
  Oi as Gallery,
  _e as Heading,
  li as IconButton,
  hi as Input,
  fe as LabelText,
  Se as Link,
  Ti as Menu,
  qe as Modal,
  Si as Navbar,
  ie as Paragraph,
  Pi as Select,
  wi as Table,
  xi as Textarea,
  zi as breakpoints,
  ye as componentVariantAppearances,
  Gi as getThemeTokens,
  ve as mapPaletteTones,
  De as paletteToneStyles,
  Pa as paletteTones,
  de as resolveVariantTone,
  Ni as themeModes,
  Li as themeTokens,
  Ce as toneVar
};
