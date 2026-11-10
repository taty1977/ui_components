import { jsx as t, jsxs as P, Fragment as pa } from "react/jsx-runtime";
import { useState as X, useId as oe, Children as va, useRef as ie, useEffect as te, isValidElement as ga, useMemo as Ye, useCallback as Me, useLayoutEffect as Ea } from "react";
import { ChevronUpIcon as fa, ChevronDownIcon as Ke, XMarkIcon as Ra, ChevronLeftIcon as Ze, ChevronRightIcon as Qe, HeartIcon as Fa, CheckIcon as Wa } from "@heroicons/react/24/solid";
import { ResponsiveContainer as ja, LineChart as Ma, Line as Va, AreaChart as Ka, Area as Ua, BarChart as _a, Bar as qa, PieChart as Xa, Tooltip as ea, Legend as aa, Pie as Ha, CartesianGrid as Ja, XAxis as Ya, YAxis as Za } from "recharts";
import { createPortal as Qa } from "react-dom";
import { XMarkIcon as ma, Bars3Icon as er, LinkIcon as ar, MagnifyingGlassPlusIcon as rr, ChevronLeftIcon as ir, ChevronRightIcon as tr } from "@heroicons/react/24/outline";
function $a(e) {
  var a, r, i = "";
  if (typeof e == "string" || typeof e == "number") i += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (a = 0; a < o; a++) e[a] && (r = $a(e[a])) && (i && (i += " "), i += r);
  } else for (r in e) e[r] && (i && (i += " "), i += r);
  return i;
}
function ya() {
  for (var e, a, r = 0, i = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (a = $a(e)) && (i && (i += " "), i += a);
  return i;
}
const Ue = "-", or = (e) => {
  const a = nr(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: i
  } = e;
  return {
    getClassGroupId: (d) => {
      const n = d.split(Ue);
      return n[0] === "" && n.length !== 1 && n.shift(), ba(n, a) || lr(d);
    },
    getConflictingClassGroupIds: (d, n) => {
      const v = r[d] || [];
      return n && i[d] ? [...v, ...i[d]] : v;
    }
  };
}, ba = (e, a) => {
  if (e.length === 0)
    return a.classGroupId;
  const r = e[0], i = a.nextPart.get(r), o = i ? ba(e.slice(1), i) : void 0;
  if (o)
    return o;
  if (a.validators.length === 0)
    return;
  const l = e.join(Ue);
  return a.validators.find(({
    validator: d
  }) => d(l))?.classGroupId;
}, ra = /^\[(.+)\]$/, lr = (e) => {
  if (ra.test(e)) {
    const a = ra.exec(e)[1], r = a?.substring(0, a.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, nr = (e) => {
  const {
    theme: a,
    prefix: r
  } = e, i = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return dr(Object.entries(e.classGroups), r).forEach(([l, d]) => {
    Ve(d, i, l, a);
  }), i;
}, Ve = (e, a, r, i) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const l = o === "" ? a : ia(a, o);
      l.classGroupId = r;
      return;
    }
    if (typeof o == "function") {
      if (sr(o)) {
        Ve(o(i), a, r, i);
        return;
      }
      a.validators.push({
        validator: o,
        classGroupId: r
      });
      return;
    }
    Object.entries(o).forEach(([l, d]) => {
      Ve(d, ia(a, l), r, i);
    });
  });
}, ia = (e, a) => {
  let r = e;
  return a.split(Ue).forEach((i) => {
    r.nextPart.has(i) || r.nextPart.set(i, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(i);
  }), r;
}, sr = (e) => e.isThemeGetter, dr = (e, a) => a ? e.map(([r, i]) => {
  const o = i.map((l) => typeof l == "string" ? a + l : typeof l == "object" ? Object.fromEntries(Object.entries(l).map(([d, n]) => [a + d, n])) : l);
  return [r, o];
}) : e, cr = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let a = 0, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  const o = (l, d) => {
    r.set(l, d), a++, a > e && (a = 0, i = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(l) {
      let d = r.get(l);
      if (d !== void 0)
        return d;
      if ((d = i.get(l)) !== void 0)
        return o(l, d), d;
    },
    set(l, d) {
      r.has(l) ? r.set(l, d) : o(l, d);
    }
  };
}, ha = "!", ur = (e) => {
  const {
    separator: a,
    experimentalParseClassName: r
  } = e, i = a.length === 1, o = a[0], l = a.length, d = (n) => {
    const v = [];
    let c = 0, f = 0, u;
    for (let $ = 0; $ < n.length; $++) {
      let D = n[$];
      if (c === 0) {
        if (D === o && (i || n.slice($, $ + l) === a)) {
          v.push(n.slice(f, $)), f = $ + l;
          continue;
        }
        if (D === "/") {
          u = $;
          continue;
        }
      }
      D === "[" ? c++ : D === "]" && c--;
    }
    const b = v.length === 0 ? n : n.substring(f), S = b.startsWith(ha), C = S ? b.substring(1) : b, N = u && u > f ? u - f : void 0;
    return {
      modifiers: v,
      hasImportantModifier: S,
      baseClassName: C,
      maybePostfixModifierPosition: N
    };
  };
  return r ? (n) => r({
    className: n,
    parseClassName: d
  }) : d;
}, pr = (e) => {
  if (e.length <= 1)
    return e;
  const a = [];
  let r = [];
  return e.forEach((i) => {
    i[0] === "[" ? (a.push(...r.sort(), i), r = []) : r.push(i);
  }), a.push(...r.sort()), a;
}, vr = (e) => ({
  cache: cr(e.cacheSize),
  parseClassName: ur(e),
  ...or(e)
}), gr = /\s+/, fr = (e, a) => {
  const {
    parseClassName: r,
    getClassGroupId: i,
    getConflictingClassGroupIds: o
  } = a, l = [], d = e.trim().split(gr);
  let n = "";
  for (let v = d.length - 1; v >= 0; v -= 1) {
    const c = d[v], {
      modifiers: f,
      hasImportantModifier: u,
      baseClassName: b,
      maybePostfixModifierPosition: S
    } = r(c);
    let C = !!S, N = i(C ? b.substring(0, S) : b);
    if (!N) {
      if (!C) {
        n = c + (n.length > 0 ? " " + n : n);
        continue;
      }
      if (N = i(b), !N) {
        n = c + (n.length > 0 ? " " + n : n);
        continue;
      }
      C = !1;
    }
    const $ = pr(f).join(":"), D = u ? $ + ha : $, m = D + N;
    if (l.includes(m))
      continue;
    l.push(m);
    const x = o(N, C);
    for (let O = 0; O < x.length; ++O) {
      const I = x[O];
      l.push(D + I);
    }
    n = c + (n.length > 0 ? " " + n : n);
  }
  return n;
};
function mr() {
  let e = 0, a, r, i = "";
  for (; e < arguments.length; )
    (a = arguments[e++]) && (r = xa(a)) && (i && (i += " "), i += r);
  return i;
}
const xa = (e) => {
  if (typeof e == "string")
    return e;
  let a, r = "";
  for (let i = 0; i < e.length; i++)
    e[i] && (a = xa(e[i])) && (r && (r += " "), r += a);
  return r;
};
function ta(e, ...a) {
  let r, i, o, l = d;
  function d(v) {
    const c = a.reduce((f, u) => u(f), e());
    return r = vr(c), i = r.cache.get, o = r.cache.set, l = n, n(v);
  }
  function n(v) {
    const c = i(v);
    if (c)
      return c;
    const f = fr(v, r);
    return o(v, f), f;
  }
  return function() {
    return l(mr.apply(null, arguments));
  };
}
const H = (e) => {
  const a = (r) => r[e] || [];
  return a.isThemeGetter = !0, a;
}, Pa = /^\[(?:([a-z-]+):)?(.+)\]$/i, $r = /^\d+\/\d+$/, yr = /* @__PURE__ */ new Set(["px", "full", "screen"]), br = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, hr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, xr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Pr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, kr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, se = (e) => be(e) || yr.has(e) || $r.test(e), de = (e) => he(e, "length", Gr), be = (e) => !!e && !Number.isNaN(Number(e)), Fe = (e) => he(e, "number", be), ke = (e) => !!e && Number.isInteger(Number(e)), wr = (e) => e.endsWith("%") && be(e.slice(0, -1)), B = (e) => Pa.test(e), ce = (e) => br.test(e), Cr = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Tr = (e) => he(e, Cr, ka), Dr = (e) => he(e, "position", ka), Sr = /* @__PURE__ */ new Set(["image", "url"]), Or = (e) => he(e, Sr, zr), Nr = (e) => he(e, "", Lr), we = () => !0, he = (e, a, r) => {
  const i = Pa.exec(e);
  return i ? i[1] ? typeof a == "string" ? i[1] === a : a.has(i[1]) : r(i[2]) : !1;
}, Gr = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  hr.test(e) && !xr.test(e)
), ka = () => !1, Lr = (e) => Pr.test(e), zr = (e) => kr.test(e), oa = () => {
  const e = H("colors"), a = H("spacing"), r = H("blur"), i = H("brightness"), o = H("borderColor"), l = H("borderRadius"), d = H("borderSpacing"), n = H("borderWidth"), v = H("contrast"), c = H("grayscale"), f = H("hueRotate"), u = H("invert"), b = H("gap"), S = H("gradientColorStops"), C = H("gradientColorStopPositions"), N = H("inset"), $ = H("margin"), D = H("opacity"), m = H("padding"), x = H("saturate"), O = H("scale"), I = H("sepia"), A = H("skew"), w = H("space"), R = H("translate"), z = () => ["auto", "contain", "none"], g = () => ["auto", "hidden", "clip", "visible", "scroll"], k = () => ["auto", B, a], y = () => [B, a], M = () => ["", se, de], j = () => ["auto", be, B], ee = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], V = () => ["solid", "dashed", "dotted", "double", "none"], K = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Y = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], F = () => ["", "0", B], q = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], T = () => [be, B];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [we],
      spacing: [se, de],
      blur: ["none", "", ce, B],
      brightness: T(),
      borderColor: [e],
      borderRadius: ["none", "", "full", ce, B],
      borderSpacing: y(),
      borderWidth: M(),
      contrast: T(),
      grayscale: F(),
      hueRotate: T(),
      invert: F(),
      gap: y(),
      gradientColorStops: [e],
      gradientColorStopPositions: [wr, de],
      inset: k(),
      margin: k(),
      opacity: T(),
      padding: y(),
      saturate: T(),
      scale: T(),
      sepia: F(),
      skew: T(),
      space: y(),
      translate: y()
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
        columns: [ce]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": q()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": q()
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
        object: [...ee(), B]
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
        inset: [N]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [N]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [N]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [N]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [N]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [N]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [N]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [N]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [N]
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
        z: ["auto", ke, B]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: k()
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
        grow: F()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: F()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", ke, B]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [we]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", ke, B]
        }, B]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": j()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": j()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [we]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [ke, B]
        }, B]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": j()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": j()
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
        gap: [b]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [b]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [b]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...Y()]
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
        content: ["normal", ...Y(), "baseline"]
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
        "place-content": [...Y(), "baseline"]
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
        "space-x": [w]
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
        "space-y": [w]
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
          screen: [ce]
        }, ce]
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
        text: ["base", ce, de]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Fe]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [we]
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
        "line-clamp": ["none", be, Fe]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", se, B]
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
        "placeholder-opacity": [D]
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
        "text-opacity": [D]
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
        decoration: [...V(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", se, de]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", se, B]
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
        indent: y()
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
        "bg-opacity": [D]
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
        bg: [...ee(), Dr]
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
        bg: ["auto", "cover", "contain", Tr]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Or]
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
        from: [C]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [C]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [C]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [S]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [S]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [S]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [l]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [l]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [l]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [l]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [l]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [l]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [l]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [l]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [l]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [l]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [l]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [l]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [l]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [l]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [l]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [n]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [n]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [n]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [n]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [n]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [n]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [n]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [n]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [n]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [D]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...V(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [n]
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
        "divide-y": [n]
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
        "divide-opacity": [D]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: V()
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
        outline: ["", ...V()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [se, B]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [se, de]
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
        ring: M()
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
        "ring-opacity": [D]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [se, de]
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
        shadow: ["", "inner", "none", ce, Nr]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [we]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [D]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...K(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": K()
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
        "drop-shadow": ["", "none", ce, B]
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
        invert: [u]
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
        sepia: [I]
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
        "backdrop-invert": [u]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [D]
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
        "backdrop-sepia": [I]
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
        "border-spacing": [d]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [d]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [d]
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
        duration: T()
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
        delay: T()
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
        scale: [O]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [O]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [O]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [ke, B]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [R]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [R]
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
        "scroll-m": y()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": y()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": y()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": y()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": y()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": y()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": y()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": y()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": y()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": y()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": y()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": y()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": y()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": y()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": y()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": y()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": y()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": y()
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
        stroke: [se, de, Fe]
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
}, Ir = (e, {
  cacheSize: a,
  prefix: r,
  separator: i,
  experimentalParseClassName: o,
  extend: l = {},
  override: d = {}
}) => {
  Te(e, "cacheSize", a), Te(e, "prefix", r), Te(e, "separator", i), Te(e, "experimentalParseClassName", o);
  for (const n in d)
    Br(e[n], d[n]);
  for (const n in l)
    Ar(e[n], l[n]);
  return e;
}, Te = (e, a, r) => {
  r !== void 0 && (e[a] = r);
}, Br = (e, a) => {
  if (a)
    for (const r in a)
      Te(e, r, a[r]);
}, Ar = (e, a) => {
  if (a)
    for (const r in a) {
      const i = a[r];
      i !== void 0 && (e[r] = (e[r] || []).concat(i));
    }
}, Er = (e, ...a) => typeof e == "function" ? ta(oa, e, ...a) : ta(() => Ir(oa(), e), ...a), Rr = Er({
  extend: {
    classGroups: {
      // Register the project's custom text-size and font-weight utilities.
      "font-size": [{ text: ["12", "13", "15", "18", "24", "28", "38", "46"] }],
      "font-weight": [{ font: ["regular"] }]
    }
  }
}), s = (...e) => Rr(ya(e)), me = {
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
function pe(e, a) {
  return e === "primary" || e === "secondary" ? e : a;
}
const la = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, na = ya, wa = (e, a) => (r) => {
  var i;
  if (a?.variants == null) return na(e, r?.class, r?.className);
  const { variants: o, defaultVariants: l } = a, d = Object.keys(o).map((c) => {
    const f = r?.[c], u = l?.[c];
    if (f === null) return null;
    const b = la(f) || la(u);
    return o[c][b];
  }), n = r && Object.entries(r).reduce((c, f) => {
    let [u, b] = f;
    return b === void 0 || (c[u] = b), c;
  }, {}), v = a == null || (i = a.compoundVariants) === null || i === void 0 ? void 0 : i.reduce((c, f) => {
    let { class: u, className: b, ...S } = f;
    return Object.entries(S).every((C) => {
      let [N, $] = C;
      return Array.isArray($) ? $.includes({
        ...l,
        ...n
      }[N]) : {
        ...l,
        ...n
      }[N] === $;
    }) ? [
      ...c,
      u,
      b
    ] : c;
  }, []);
  return na(e, d, v, r?.class, r?.className);
}, Ca = ["primary", "secondary", "error", "warning", "info", "success"], Se = {
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
}, $e = (e) => Object.fromEntries(Ca.map((a) => [a, e(Se[a])])), De = (e, a = "main") => `var(--palette-${e}-${a})`, Fr = wa(
  "inline-flex box-border items-center justify-center rounded-md font-sans font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
  {
    variants: {
      size: {
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
), re = $e((e) => ({
  solid: `${e.default} ${e.defaultText} ${e.defaultState}`,
  label: `${e.label} ${e.text} ${e.labelState}`,
  outline: `border ${e.mainBorder} bg-transparent ${e.outlineText} ${e.subtleState}`,
  text: `bg-transparent ${e.buttonText} ${e.subtleState}`
}));
function yi({
  items: e,
  className: a,
  allowMultiple: r = !1,
  collapsedIcon: i,
  expandedIcon: o,
  iconPosition: l = "right",
  variant: d = "default",
  tone: n = "primary",
  size: v = "normal",
  children: c
}) {
  const [f, u] = X(/* @__PURE__ */ new Set()), b = oe(), S = pe(d, n), C = me[d], N = re[S][C], $ = va.toArray(c);
  return /* @__PURE__ */ t("div", { className: s("grid gap-2 font-sans", a), "data-variant": d, "data-tone": S, children: e.map((D, m) => {
    const x = f.has(D.id), O = x ? fa : Ke, I = $[m] ?? D.content, A = `${b}-button-${D.id}`, w = `${b}-panel-${D.id}`, R = /* @__PURE__ */ t("span", { "aria-hidden": "true", className: "inline-flex size-4 shrink-0 items-center justify-center", children: (x ? o : i) ?? /* @__PURE__ */ t(O, { className: "size-4" }) });
    return /* @__PURE__ */ P("div", { className: "overflow-hidden rounded-md bg-background-surface transition-colors", children: [
      /* @__PURE__ */ P(
        "button",
        {
          type: "button",
          id: A,
          "aria-expanded": x,
          "aria-controls": w,
          className: s(
            "flex w-full items-center text-left text-text-primary outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-current",
            v === "small" ? "min-h-11 gap-2 px-4 text-15" : "min-h-12 gap-2.5 px-4 text-18",
            N,
            "font-medium",
            C === "solid" && "focus-visible:outline-current",
            C === "outline" && (x && I != null ? "rounded-t-md" : "rounded-md")
          ),
          onClick: () => u((z) => {
            const g = r ? new Set(z) : /* @__PURE__ */ new Set();
            return z.has(D.id) ? g.delete(D.id) : g.add(D.id), g;
          }),
          children: [
            l === "left" && R,
            /* @__PURE__ */ t("span", { className: "flex-1", children: D.title }),
            l === "right" && R
          ]
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          id: w,
          role: "region",
          "aria-labelledby": A,
          hidden: !x || I == null,
          className: s(
            "border-t border-border-subtle bg-background-surface px-4 text-text-secondary",
            v === "small" ? "py-3 text-13" : "py-4 text-15"
          ),
          children: x ? I : null
        }
      )
    ] }, D.id);
  }) });
}
const Ta = {
  default: "text-text-primary",
  muted: "text-text-secondary",
  ...$e((e) => e.text),
  inverse: "text-misc-bg-white"
}, Wr = {
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold"
}, Da = {
  ...Wr,
  normal: "font-regular",
  semiBold: "font-semibold",
  light: "font-light",
  extraBold: "font-extrabold"
}, Sa = {
  none: "normal-case",
  capitalize: "capitalize",
  uppercase: "uppercase",
  lowercase: "lowercase"
};
function Oa(e) {
  switch (e) {
    case "title":
      return "default";
    case "Primary":
      return "primary";
    case "Secondary":
      return "secondary";
    case "danger":
      return "error";
    default:
      return e;
  }
}
const jr = {
  xs: "text-12 leading-14",
  sm: "text-13 leading-18",
  md: "text-15 leading-20",
  lg: "text-18 leading-22",
  xl: "text-24 leading-28"
}, sa = {
  subtitle1: { size: "lg", weight: "medium" },
  subtitle2: { size: "md", weight: "medium" },
  body1: { size: "md", weight: "regular" },
  body2: { size: "sm", weight: "regular" },
  caption: { size: "xs", weight: "regular" },
  overline: { size: "xs", weight: "medium" }
};
function Ge({
  size: e,
  variant: a = "body1",
  weight: r,
  color: i,
  tone: o = "default",
  textTransform: l = "none"
} = {}) {
  const d = i ? Oa(i === "text" ? "default" : i) : o;
  return s(
    "font-sans",
    jr[e ?? sa[a].size],
    Da[r ?? sa[a].weight],
    Ta[d],
    Sa[l],
    a === "overline" && "uppercase tracking-wider"
  );
}
const Mr = {
  h1: "text-46 leading-56",
  h2: "text-38 leading-42",
  h3: "text-28 leading-38",
  h4: "text-24 leading-28",
  h5: "text-18 leading-22",
  h6: "text-15 leading-20"
};
function Na({ level: e, variant: a = "default" } = {}) {
  return e ?? (a === "default" ? "h4" : a);
}
function Vr({
  level: e,
  variant: a,
  weight: r = "bold",
  color: i,
  tone: o = "default",
  textTransform: l = "none"
} = {}) {
  return s(
    "font-sans",
    Mr[Na({ level: e, variant: a })],
    Da[r],
    Ta[i ? Oa(i) : o],
    Sa[l]
  );
}
const Kr = {
  always: "underline",
  hover: "no-underline hover:underline focus-visible:underline",
  none: "no-underline"
};
function Ur({ underline: e = "always", ...a } = {}) {
  return s(
    Ge(a),
    "rounded-sm underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
    Kr[e]
  );
}
function le({
  size: e,
  variant: a,
  weight: r,
  family: i,
  color: o,
  tone: l,
  textTransform: d,
  className: n,
  children: v,
  ...c
}) {
  return /* @__PURE__ */ t(
    "p",
    {
      className: s("m-0", Ge({ size: e, variant: a, weight: r, color: o, tone: l, textTransform: d }), n),
      ...c,
      children: v
    }
  );
}
function ze({
  appearance: e,
  floating: a,
  visible: r,
  iconLeft: i = !1,
  size: o = "normal",
  multiline: l = !1
}) {
  let d;
  return r ? a && e === "outlined" ? d = "left-3 -top-2 px-1 text-13 bg-background-surface" : a && e === "filled" ? d = "left-4 top-1 text-13 leading-14" : l ? d = "left-4 top-2" : d = s("top-1/2 -translate-y-1/2 text-inherit", i ? o === "small" ? "left-9" : "left-[42px]" : "left-4") : d = "sr-only", s(
    "pointer-events-none absolute z-10 mb-0 transition-all",
    d,
    !l && !a && e !== "outlined" && "mt-[0.5px] group-focus-within:mt-px"
  );
}
function Ie(e, a, r) {
  const i = e === "primary" || e === "secondary" ? "outlined" : e, o = r ? "error" : pe(e, a);
  return { appearance: i, accent: o };
}
const _e = $e((e) => e.fieldBorder), fe = $e((e) => e.text);
function Be({
  disabled: e,
  error: a,
  active: r,
  accent: i
}) {
  return e ? "text-text-disabled" : a ? fe.error : r ? fe[i] : "text-text-secondary";
}
const _r = $e((e) => e.notchBorder), Ae = wa(
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
), qe = "w-full min-w-0 flex-1 border-0 bg-transparent py-2 font-sans text-inherit leading-5 outline-none placeholder:text-text-secondary disabled:cursor-not-allowed disabled:text-text-disabled", ne = {
  outlined: "",
  filled: "relative top-[0.5px] group-focus-within:top-px",
  standard: "relative top-[0.5px] group-focus-within:top-px"
}, qr = "mb-1 block font-sans text-13 font-medium text-text-secondary", Xe = s("mt-1 font-sans text-13", Se.error.text), Ga = "absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-md border border-border-subtle bg-background-surface py-2 font-sans text-15 text-text-primary shadow-lg", La = (e, a) => ({
  "aria-hidden": e || void 0,
  role: e ? void 0 : "img",
  "aria-label": a
});
function ue({ required: e, className: a, children: r, ref: i, ...o }) {
  return /* @__PURE__ */ P("label", { ref: i, className: s(qr, a), ...o, children: [
    r,
    e && /* @__PURE__ */ t("span", { className: s("ml-1", Se.error.text), ...La(!0), children: "*" })
  ] });
}
function Ee({ width: e, accent: a, disabled: r, borderClass: i }) {
  const o = r ? "border-text-disabled" : i ?? _r[a];
  return /* @__PURE__ */ P(pa, { children: [
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: s(
          "absolute bottom-0 left-0 top-0 w-3 rounded-l-md border-b border-l border-t group-focus-within:border-b-2 group-focus-within:border-l-2 group-focus-within:border-t-2",
          o
        )
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: s("absolute bottom-0 left-3 right-3 border-b group-focus-within:border-b-2", o)
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: s(
          "absolute bottom-0 right-0 top-0 rounded-r-md border-b border-r border-t group-focus-within:border-b-2 group-focus-within:border-r-2 group-focus-within:border-t-2",
          o
        ),
        style: { left: 12 + e }
      }
    )
  ] });
}
function bi({
  className: e,
  error: a,
  helperText: r,
  iconLeft: i,
  iconRight: o,
  label: l,
  variant: d = "default",
  tone: n = "primary",
  size: v = "normal",
  onChange: c,
  onSelect: f,
  options: u,
  value: b,
  defaultValue: S,
  id: C,
  "aria-describedby": N,
  onFocus: $,
  onBlur: D,
  onKeyDown: m,
  ...x
}) {
  const O = oe(), I = ie(null), A = ie(null), [w, R] = X(), { appearance: z, accent: g } = Ie(d === "default" ? "outlined" : d, n, a), k = C ?? O, y = `${k}-options`, M = a ?? r, j = `${k}-${a ? "error" : "helper"}`, [ee, V] = X(String(b ?? S ?? "")), [K, Y] = X(!1), [F, q] = X(!1), [T, E] = X(0), U = b ?? ee, W = U.length > 0, Q = W || !x.placeholder, L = !!(l && W && z === "outlined"), ae = !!(L && w !== void 0), p = Be({ disabled: x.disabled, error: a, active: K, accent: g }), h = F && U.trim() ? u.filter((G) => G.toLowerCase().includes(U.toLowerCase())) : [];
  te(() => {
    if (!l || !W || z !== "outlined") return;
    const G = A.current?.offsetWidth;
    G && R(G);
  }, [z, W, l, x.required]);
  const _ = (G) => {
    V(G), q(!1), f(G);
  };
  return /* @__PURE__ */ P(
    "div",
    {
      className: s("relative w-full max-w-sm font-sans", e),
      onBlur: (G) => {
        G.currentTarget.contains(G.relatedTarget) || Y(!1);
      },
      children: [
        l && z === "standard" && W && Q && /* @__PURE__ */ t(
          ue,
          {
            ref: A,
            htmlFor: k,
            required: x.required,
            className: s("absolute left-0 top-0 z-10 mb-0 pl-4", p),
            children: l
          }
        ),
        /* @__PURE__ */ P(
          "div",
          {
            className: s(
              Ae({
                variant: z,
                size: typeof v == "number" ? "normal" : v,
                disabled: x.disabled,
                iconLeft: !!i,
                iconRight: !!(o || K && U.trim()),
                notched: ae
              }),
              "group",
              L && "mt-2 bg-background-surface",
              l && W && z === "standard" && "mt-2",
              !x.disabled && _e[g]
            ),
            children: [
              ae && w !== void 0 && /* @__PURE__ */ t(Ee, { width: w, accent: g, disabled: x.disabled }),
              l && !(z === "standard" && W && Q) && /* @__PURE__ */ t(
                ue,
                {
                  ref: A,
                  htmlFor: k,
                  required: x.required,
                  className: s(
                    ze({ appearance: z, floating: W, visible: Q, iconLeft: !!i, size: v }),
                    p
                  ),
                  children: l
                }
              ),
              i && /* @__PURE__ */ t(
                "span",
                {
                  "aria-hidden": "true",
                  className: s(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    ne[z]
                  ),
                  children: i
                }
              ),
              /* @__PURE__ */ t(
                "input",
                {
                  ...x,
                  ref: I,
                  size: typeof v == "number" ? v : void 0,
                  id: k,
                  type: "text",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": h.length > 0,
                  "aria-controls": y,
                  "aria-activedescendant": h[T] ? `${y}-${T}` : void 0,
                  "aria-describedby": [N, M && j].filter(Boolean).join(" ") || void 0,
                  "aria-invalid": a ? !0 : x["aria-invalid"],
                  value: U,
                  className: s(
                    qe,
                    !W && ne[z],
                    z === "filled" && W && l && "self-stretch py-0 pt-[18px]",
                    L && "relative z-20"
                  ),
                  onChange: (G) => {
                    V(G.target.value), q(!0), E(0), c?.(G);
                  },
                  onFocus: (G) => {
                    Y(!0), q(!0), $?.(G);
                  },
                  onBlur: (G) => {
                    q(!1), D?.(G);
                  },
                  onKeyDown: (G) => {
                    m?.(G), !G.defaultPrevented && (G.key === "Enter" && h.length && (G.preventDefault(), _(h[T] ?? h[0])), G.key === "Escape" && q(!1), (G.key === "ArrowDown" || G.key === "ArrowUp") && (G.preventDefault(), q(!0), E(
                      (J) => Math.max(0, Math.min(h.length - 1, J + (G.key === "ArrowDown" ? 1 : -1)))
                    )));
                  }
                }
              ),
              K && U.trim() ? /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  disabled: x.disabled,
                  "aria-label": "Clear input",
                  className: s(
                    "inline-flex size-5 items-center justify-center text-text-secondary [&_svg]:size-4",
                    ne[z]
                  ),
                  onMouseDown: (G) => G.preventDefault(),
                  onClick: () => {
                    V(""), q(!1), f(""), I.current?.focus();
                  },
                  children: /* @__PURE__ */ t(Ra, { className: "size-4", "aria-hidden": "true" })
                }
              ) : o ? /* @__PURE__ */ t(
                "span",
                {
                  "aria-hidden": "true",
                  className: s(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    ne[z]
                  ),
                  children: o
                }
              ) : null
            ]
          }
        ),
        h.length > 0 && /* @__PURE__ */ t("ul", { id: y, role: "listbox", className: s(Ga, "relative"), children: h.map((G, J) => /* @__PURE__ */ t(
          "li",
          {
            id: `${y}-${J}`,
            role: "option",
            "aria-selected": T === J,
            className: s(
              "cursor-pointer px-4 py-2 hover:bg-action-hover",
              T === J && "bg-action-selected"
            ),
            onMouseDown: (Z) => Z.preventDefault(),
            onClick: () => _(G),
            children: G
          },
          G
        )) }),
        M && /* @__PURE__ */ t(
          le,
          {
            variant: "body2",
            tone: a ? "error" : "muted",
            id: j,
            role: a ? "alert" : void 0,
            "aria-live": "polite",
            className: s("leading-[inherit]", a ? Xe : "mt-1"),
            children: M
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
  width: l = "default",
  variant: d = "default",
  tone: n = "primary",
  outline: v = !1,
  shape: c = "rectangle",
  children: f,
  ...u
}) {
  const b = pe(d, n), S = v ? "outline" : me[d];
  return /* @__PURE__ */ P(
    "button",
    {
      className: s(Fr({ size: o, width: l, shape: c }), re[b][S], e),
      "data-size": o,
      "data-variant": d,
      "data-tone": b,
      "data-width": l,
      "data-shape": c,
      "data-outline": v,
      ...u,
      children: [
        r && /* @__PURE__ */ t("span", { className: "inline-flex size-5 shrink-0 items-center justify-center", "aria-hidden": "true", children: r }),
        f ?? a,
        i && /* @__PURE__ */ t("span", { className: "inline-flex size-5 shrink-0 items-center justify-center", "aria-hidden": "true", children: i })
      ]
    }
  );
}
function Re({
  level: e,
  variant: a = "default",
  weight: r = "bold",
  family: i,
  color: o,
  tone: l = "default",
  textTransform: d = "none",
  className: n,
  children: v,
  ...c
}) {
  const f = Na({ level: e, variant: a });
  return /* @__PURE__ */ t(
    f,
    {
      className: s(
        "m-0",
        Vr({ level: e, variant: a, weight: r, color: o, tone: l, textTransform: d }),
        n
      ),
      ...c,
      children: v
    }
  );
}
const ve = (e) => e.id || e.src, We = (e, a) => e.alt.trim() || `Product image ${a + 1}`, ye = "inline-flex size-8 shrink-0 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-45";
function Hr(e, a) {
  if (!Number.isInteger(e))
    throw new RangeError("Carousel initialIndex must be a finite integer.");
  return Math.min(Math.max(e, 0), Math.max(a - 1, 0));
}
function hi({
  images: e,
  className: a,
  likeButton: r = !0,
  variant: i = "outline",
  tone: o = "primary",
  initialIndex: l = 0,
  onImageChange: d,
  showThumbnails: n = !0,
  thumbnailsPosition: v = "bottom",
  showIndicators: c = !0,
  ariaLabel: f = "Product image gallery",
  ofText: u = "of",
  breakpoint: b = "desktop",
  openOnClick: S = !0
}) {
  const C = oe(), [N, $] = X(() => Hr(l, e.length)), [D, m] = X(!1), [x, O] = X(0), [I, A] = X({}), w = ie(null), R = ie(null), z = ie(null), g = Math.min(N, Math.max(0, e.length - 1)), k = e[g], y = v === "bottom" ? 8 : 5, M = b === "mobile", j = M ? "10rem" : b === "tablet" ? "15rem" : "25rem", ee = i === "primary" || i === "secondary", V = pe(i, o), K = me[i], Y = s(fe[V], "focus-visible:outline-current"), F = ee ? s("bg-background-surface hover:bg-action-hover", Y) : re[V][K], q = ee ? "border border-border-subtle bg-background-surface text-text-primary" : re[V][K];
  if (te(() => {
    $((p) => Math.min(p, Math.max(e.length - 1, 0))), O((p) => Math.min(p, Math.max(e.length - y, 0))), e.length || m(!1);
  }, [e.length, y]), te(() => {
    if (!D) return;
    const p = R.current;
    w.current?.focus();
    const h = (_) => {
      if (_.key === "Escape" && m(!1), _.key === "Tab" && z.current) {
        const G = z.current.querySelectorAll('button:not(:disabled), [tabindex="0"]'), J = G[0], Z = G[G.length - 1];
        _.shiftKey && document.activeElement === J ? (_.preventDefault(), Z?.focus()) : !_.shiftKey && document.activeElement === Z && (_.preventDefault(), J?.focus());
      }
    };
    return document.addEventListener("keydown", h), () => {
      document.removeEventListener("keydown", h), p?.focus();
    };
  }, [D]), !k)
    return /* @__PURE__ */ t(
      "div",
      {
        className: s("rounded-md px-4 py-6 text-center font-sans text-13", q, a),
        "data-variant": i,
        "data-tone": V,
        children: "No product images available."
      }
    );
  const T = (p) => O((h) => p < h ? p : p >= h + y ? p - y + 1 : h), E = (p) => {
    const h = (p + e.length) % e.length;
    $(h), T(h), d?.(h, e[h]);
  }, U = (p) => {
    R.current = p, T(g), m(!0);
  }, W = s(
    "min-w-0",
    n && v !== "bottom" && !M && (v === "left" ? "grid grid-cols-[var(--carousel-thumb-size)_minmax(0,1fr)] gap-4" : "grid grid-cols-[minmax(0,1fr)_var(--carousel-thumb-size)] gap-4")
  ), Q = v === "bottom" ? { gridTemplateColumns: `repeat(${Math.min(y, e.length)}, var(--carousel-thumb-size))` } : { gridTemplateRows: `repeat(${Math.min(y, e.length)}, var(--carousel-thumb-size))` }, L = (p, h = !1) => {
    if (!n || M || v !== p) return null;
    const _ = h ? x : 0, G = e.length - y + 1, J = /* @__PURE__ */ t(
      "div",
      {
        className: s("grid gap-2.5 overflow-hidden p-1", p === "bottom" ? "justify-center" : "content-start"),
        style: Q,
        children: e.slice(_, _ + y).map((Z, Je) => {
          const xe = _ + Je, Pe = !h && S && e.length > y && Je === y - 1;
          return /* @__PURE__ */ P(
            "button",
            {
              type: "button",
              className: s(
                "relative aspect-square w-full overflow-hidden rounded-md border border-border-subtle bg-background-surface p-0 leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                Y,
                !Pe && g === xe && "border-current ring-2 ring-current ring-offset-2 ring-offset-background-surface"
              ),
              "aria-label": Pe ? `Open image gallery (${G} more)` : `Select ${We(Z, xe)}`,
              "aria-current": !Pe && g === xe ? "true" : void 0,
              onClick: (Aa) => {
                Pe ? U(Aa.currentTarget) : E(xe);
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
                Pe && /* @__PURE__ */ t("span", { className: "absolute inset-0 flex items-center justify-center bg-backdrop-overlay", children: /* @__PURE__ */ P("span", { className: "rounded-md bg-background-surface px-2 py-1 text-13 font-semibold text-text-primary", children: [
                  "+",
                  G
                ] }) })
              ]
            },
            `${ve(Z)}-${xe}`
          );
        })
      }
    );
    return h ? /* @__PURE__ */ P(
      "div",
      {
        className: s(
          "grid items-center gap-2.5",
          p === "bottom" ? "grid-cols-[auto_minmax(0,1fr)_auto]" : "content-start"
        ),
        children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: s(ye, F, "justify-self-center"),
              "aria-label": "Previous thumbnails",
              disabled: x <= 0,
              onClick: () => O((Z) => Math.max(0, Z - 1)),
              children: p === "bottom" ? /* @__PURE__ */ t(Ze, { className: "size-4" }) : /* @__PURE__ */ t(fa, { className: "size-4" })
            }
          ),
          J,
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: s(ye, F, "justify-self-center"),
              "aria-label": "Next thumbnails",
              disabled: x + y >= e.length,
              onClick: () => O((Z) => Math.min(e.length - y, Z + 1)),
              children: p === "bottom" ? /* @__PURE__ */ t(Qe, { className: "size-4" }) : /* @__PURE__ */ t(Ke, { className: "size-4" })
            }
          )
        ]
      }
    ) : J;
  }, ae = (p = !1) => /* @__PURE__ */ P(
    "div",
    {
      className: "relative flex w-full min-w-0 items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-background-surface",
      style: { height: j },
      children: [
        k.badge && /* @__PURE__ */ t(
          "span",
          {
            className: s(
              "absolute left-4 top-4 z-10 rounded-md px-2 py-1 text-12 font-semibold text-misc-bg-white",
              re[V].solid
            ),
            children: k.badge
          }
        ),
        r && k.likeButton !== !1 && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: s(
              ye,
              I[ve(k)] ? re.error.label : F,
              "absolute right-4 top-4 z-10 rounded-full"
            ),
            "aria-label": I[ve(k)] ? "Remove from favorites" : "Add to favorites",
            "aria-pressed": !!I[ve(k)],
            onClick: () => A((h) => ({ ...h, [ve(k)]: !h[ve(k)] })),
            children: /* @__PURE__ */ t(Fa, { className: "size-6", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ t(
          "img",
          {
            src: k.src,
            alt: We(k, g),
            className: s("block size-full object-cover", !p && S && "cursor-zoom-in"),
            ...!p && S ? {
              role: "button",
              "aria-label": `Open image gallery: ${We(k, g)}`,
              tabIndex: 0,
              onClick: (h) => U(h.currentTarget),
              onKeyDown: (h) => {
                (h.key === "Enter" || h.key === " ") && (h.preventDefault(), U(h.currentTarget));
              }
            } : {}
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "aria-label": "Previous image",
            className: s(ye, F, "absolute left-4 top-1/2 -translate-y-1/2"),
            onClick: () => E(g - 1),
            children: /* @__PURE__ */ t(Ze, { className: "size-4", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "aria-label": "Next image",
            className: s(ye, F, "absolute right-4 top-1/2 -translate-y-1/2"),
            onClick: () => E(g + 1),
            children: /* @__PURE__ */ t(Qe, { className: "size-4", "aria-hidden": "true" })
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ P(
    "section",
    {
      "aria-label": f,
      className: s("grid w-full min-w-0 gap-4 rounded-md p-6 font-sans", q, a),
      "data-variant": i,
      "data-tone": V,
      style: {
        "--carousel-thumb-size": M ? "3.25rem" : b === "tablet" ? "3.75rem" : "4.5rem"
      },
      children: [
        /* @__PURE__ */ P("div", { className: W, children: [
          L("left"),
          ae(),
          L("right")
        ] }),
        !M && (c || n && v === "bottom") && /* @__PURE__ */ P("div", { className: "grid gap-2 rounded-md border border-border-subtle p-4", children: [
          c && /* @__PURE__ */ t("div", { className: "flex items-center justify-center gap-2", children: e.map((p, h) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "aria-label": `Go to image ${h + 1}`,
              "aria-current": g === h ? "true" : void 0,
              className: s(
                "size-2.5 rounded-full border border-border-subtle p-0",
                g === h ? re[V].solid : "bg-background-surface"
              ),
              onClick: () => E(h)
            },
            `${ve(p)}-${h}`
          )) }),
          L("bottom")
        ] }),
        D && /* @__PURE__ */ t(
          "div",
          {
            role: "presentation",
            className: "fixed inset-0 z-[1000] grid place-items-center bg-backdrop-overlay p-4",
            onClick: () => m(!1),
            children: /* @__PURE__ */ P(
              "div",
              {
                ref: z,
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": C,
                tabIndex: -1,
                onClick: (p) => p.stopPropagation(),
                className: s(
                  "grid max-h-[90dvh] w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-md border border-border-subtle bg-background-surface",
                  b === "tablet" ? "max-w-3xl" : M ? "max-h-dvh" : "max-w-5xl"
                ),
                children: [
                  /* @__PURE__ */ P("div", { className: "flex items-center justify-between gap-4 border-b border-border-subtle p-4", children: [
                    /* @__PURE__ */ t(
                      Re,
                      {
                        id: C,
                        level: "h4",
                        weight: "medium",
                        children: `Image gallery: ${g + 1} ${u} ${e.length}`
                      }
                    ),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        ref: w,
                        type: "button",
                        "aria-label": "Close image gallery",
                        className: s(ye, F),
                        onClick: () => m(!1),
                        children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "✕" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ P("div", { className: s("grid gap-4 overflow-auto p-4", M && "gap-2 p-2"), children: [
                    /* @__PURE__ */ P("div", { className: W, children: [
                      L("left", !0),
                      ae(!0),
                      L("right", !0)
                    ] }),
                    L("bottom", !0)
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function xi({
  className: e,
  inputClassName: a,
  label: r,
  helperText: i,
  error: o,
  variant: l = "outlined",
  tone: d = "primary",
  size: n = "normal",
  iconLeft: v,
  iconRight: c,
  outsideIconLeft: f,
  outsideIconRight: u,
  handleActions: b,
  id: S,
  type: C = "text",
  "aria-describedby": N,
  onFocus: $,
  onBlur: D,
  onChange: m,
  value: x,
  defaultValue: O,
  disabled: I,
  required: A,
  ...w
}) {
  const R = oe(), z = S ?? R, [g, k] = X(!1), [y, M] = X(O ?? ""), j = ie(null), [ee, V] = X(), K = String(x ?? y).length > 0, Y = K || !w.placeholder, { appearance: F, accent: q } = Ie(l, d, o), T = !!(r && K && F === "outlined"), E = !!(r && K && F === "outlined" && ee !== void 0), U = Be({ disabled: I, error: o, active: g, accent: q }), W = o ?? i, Q = `${z}-${o ? "error" : "helper"}`, L = [N, W ? Q : void 0].filter(Boolean).join(" ") || void 0;
  te(() => {
    if (!r || !K || F !== "outlined") return;
    const p = j.current?.offsetWidth;
    p && V(p);
  }, [F, K, r, A]);
  const ae = (p) => b ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      disabled: I,
      onClick: b,
      className: s(
        "inline-flex min-w-[26px] items-center justify-center self-stretch disabled:opacity-45 [&_svg]:size-[26px]",
        fe[q]
      ),
      "aria-label": `${r ?? "Input"} action`,
      children: p
    }
  ) : /* @__PURE__ */ t(
    "span",
    {
      "aria-hidden": "true",
      className: s(
        "inline-flex min-w-[26px] items-center justify-center self-stretch [&_svg]:size-[26px]",
        fe[q]
      ),
      children: p
    }
  );
  return /* @__PURE__ */ P("div", { className: s("w-full max-w-sm font-sans", e), children: [
    /* @__PURE__ */ P("div", { className: "flex items-stretch gap-2", children: [
      f && ae(f),
      /* @__PURE__ */ P("div", { className: "relative min-w-0 flex-1", children: [
        r && F === "standard" && K && Y && /* @__PURE__ */ t(
          ue,
          {
            ref: j,
            htmlFor: z,
            required: A,
            className: s("absolute left-0 top-0 z-10 mb-0 pl-4", U),
            children: r
          }
        ),
        /* @__PURE__ */ P(
          "div",
          {
            className: s(
              Ae({
                variant: F,
                size: n,
                disabled: I,
                iconLeft: !!v,
                iconRight: !!c,
                notched: E
              }),
              "group",
              T && "mt-2 bg-background-surface",
              r && K && F === "standard" && "mt-2",
              !I && _e[q]
            ),
            children: [
              E && ee !== void 0 && /* @__PURE__ */ t(Ee, { width: ee, accent: q, disabled: I }),
              r && !(F === "standard" && K && Y) && /* @__PURE__ */ t(
                ue,
                {
                  ref: j,
                  htmlFor: z,
                  required: A,
                  className: s(
                    ze({ appearance: F, floating: K, visible: Y, iconLeft: !!v, size: n }),
                    U
                  ),
                  children: r
                }
              ),
              v && /* @__PURE__ */ t(
                "span",
                {
                  "aria-hidden": "true",
                  className: s(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    ne[F]
                  ),
                  children: v
                }
              ),
              /* @__PURE__ */ t(
                "input",
                {
                  ...w,
                  id: z,
                  type: C,
                  disabled: I,
                  required: A,
                  value: x,
                  defaultValue: O,
                  "aria-describedby": L,
                  "aria-invalid": o ? !0 : w["aria-invalid"],
                  className: s(
                    qe,
                    !K && ne[F],
                    F === "filled" && K && r && "self-stretch py-0 pt-[18px]",
                    T && "relative z-20",
                    a
                  ),
                  onFocus: (p) => {
                    k(!0), $?.(p);
                  },
                  onBlur: (p) => {
                    k(!1), D?.(p);
                  },
                  onChange: (p) => {
                    M(p.target.value), m?.(p);
                  }
                }
              ),
              c && /* @__PURE__ */ t(
                "span",
                {
                  "aria-hidden": "true",
                  className: s(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    ne[F]
                  ),
                  children: c
                }
              )
            ]
          }
        )
      ] }),
      u && ae(u)
    ] }),
    W && /* @__PURE__ */ t(
      le,
      {
        variant: "body2",
        tone: o ? "error" : "muted",
        id: Q,
        role: o ? "alert" : void 0,
        "aria-live": "polite",
        className: s("leading-[inherit]", o ? Xe : "mt-1"),
        children: W
      }
    )
  ] });
}
function Pi({
  className: e,
  label: a,
  helperText: r,
  error: i,
  variant: o = "outlined",
  tone: l = "primary",
  size: d = "normal",
  id: n,
  "aria-describedby": v,
  ...c
}) {
  const f = oe(), { appearance: u, accent: b } = Ie(o, l, i), S = n ?? f, C = i ?? r, N = `${S}-${i ? "error" : "helper"}`, $ = ie(null), [D, m] = X(), [x, O] = X(!1), [I, A] = X(String(c.defaultValue ?? "")), w = String(c.value ?? I).length > 0, R = w || !c.placeholder, z = !!(a && w && u === "outlined"), g = !!(z && D !== void 0), k = Be({ disabled: c.disabled, error: i, active: x, accent: b });
  return te(() => {
    if (!a || !w || u !== "outlined") return;
    const y = $.current?.offsetWidth;
    y && m(y);
  }, [u, w, a, c.required]), /* @__PURE__ */ P("div", { className: s("relative w-full max-w-sm font-sans", e), children: [
    a && u === "standard" && w && R && /* @__PURE__ */ t(
      ue,
      {
        ref: $,
        htmlFor: S,
        required: c.required,
        className: s("absolute left-0 top-0 z-10 mb-0 pl-4", k),
        children: a
      }
    ),
    /* @__PURE__ */ P(
      "div",
      {
        className: s(
          Ae({ variant: u, size: d, disabled: c.disabled, notched: g }),
          "items-start",
          z && "group mt-2 bg-background-surface",
          a && w && u === "standard" && "mt-2",
          !c.disabled && _e[b]
        ),
        children: [
          g && D !== void 0 && /* @__PURE__ */ t(Ee, { width: D, accent: b, disabled: c.disabled }),
          a && !(u === "standard" && w && R) && /* @__PURE__ */ t(
            ue,
            {
              ref: $,
              htmlFor: S,
              required: c.required,
              className: s(
                ze({ appearance: u, floating: w, visible: R, multiline: !0 }),
                k
              ),
              children: a
            }
          ),
          /* @__PURE__ */ t(
            "textarea",
            {
              ...c,
              id: S,
              value: c.value,
              defaultValue: c.defaultValue,
              "aria-invalid": i ? !0 : c["aria-invalid"],
              "aria-describedby": [v, C && N].filter(Boolean).join(" ") || void 0,
              className: s(
                qe,
                "min-h-12 resize-y",
                w && u === "filled" && a && "pt-5 pb-[3px] focus:pb-[2px]",
                w && u !== "filled" && a && "pt-4",
                w && u === "standard" && a && "pb-[7px] focus:pb-[6px]",
                z && "relative z-20 mt-3 pt-1"
              ),
              onFocus: (y) => {
                O(!0), c.onFocus?.(y);
              },
              onBlur: (y) => {
                O(!1), c.onBlur?.(y);
              },
              onChange: (y) => {
                A(y.target.value), c.onChange?.(y);
              }
            }
          )
        ]
      }
    ),
    C && /* @__PURE__ */ t(
      le,
      {
        variant: "body2",
        tone: i ? "error" : "muted",
        id: N,
        role: i ? "alert" : void 0,
        "aria-live": "polite",
        className: s("leading-[inherit]", i ? Xe : "mt-1"),
        children: C
      }
    )
  ] });
}
const da = $e((e) => e.outline);
function ki({
  className: e,
  label: a,
  placeholder: r,
  helperText: i,
  error: o,
  variant: l = "default",
  tone: d = "primary",
  size: n = "normal",
  iconLeft: v,
  showSelectionCheck: c = !1,
  id: f,
  children: u,
  defaultValue: b,
  value: S,
  onChange: C,
  "aria-describedby": N,
  ...$
}) {
  const D = oe(), { appearance: m, accent: x } = Ie(l === "default" ? "outlined" : l, d, o), O = f ?? D, I = ie(null), A = ie(null), w = va.toArray(u).filter(ga), [R, z] = X(String(b ?? w[0]?.props.value ?? "")), [g, k] = X(!1), y = String(S ?? R), M = w.find((L) => String(L.props.value ?? "") === y), j = y.length > 0 || !r && !!M?.props.children, ee = j || !r, V = !!(a && j && m === "outlined"), K = !!V, Y = o ?? i, F = `${O}-${o ? "error" : "helper"}`, q = [N, Y && F].filter(Boolean).join(" ") || void 0, [T, E] = X(), U = ie(null), W = Be({ disabled: $.disabled, error: o, active: g, accent: x });
  te(() => {
    if (!a || !j || m !== "outlined") return;
    const L = U.current?.offsetWidth;
    L && E(L);
  }, [m, j, a, $.required]);
  const Q = (L) => {
    z(L), k(!1), I.current && (I.current.value = L, I.current.dispatchEvent(new Event("change", { bubbles: !0 }))), A.current?.focus();
  };
  return /* @__PURE__ */ P(
    "div",
    {
      className: s("relative w-full max-w-sm font-sans", e),
      onBlur: (L) => {
        L.currentTarget.contains(L.relatedTarget) || k(!1);
      },
      children: [
        a && m === "standard" && j && ee && /* @__PURE__ */ t(
          ue,
          {
            ref: U,
            id: `${O}-label`,
            htmlFor: O,
            required: $.required,
            className: s("absolute left-0 top-0 z-10 mb-0 pl-4", W),
            children: a
          }
        ),
        /* @__PURE__ */ t(
          "select",
          {
            ...$,
            size: typeof n == "number" ? n : void 0,
            id: O,
            ref: I,
            className: "sr-only",
            tabIndex: -1,
            value: y,
            "aria-describedby": q,
            "aria-invalid": o ? !0 : $["aria-invalid"],
            onChange: (L) => {
              z(L.target.value), C?.(L);
            },
            children: u
          }
        ),
        /* @__PURE__ */ P(
          "button",
          {
            ref: A,
            type: "button",
            disabled: $.disabled,
            "aria-labelledby": a ? `${O}-label` : void 0,
            "aria-label": a ? void 0 : $["aria-label"] ?? r ?? "Select an option",
            "aria-describedby": q,
            "aria-haspopup": "listbox",
            "aria-expanded": g,
            "aria-controls": g ? `${O}-options` : void 0,
            "aria-invalid": o ? !0 : void 0,
            className: s(
              Ae({
                variant: m,
                size: typeof n == "number" ? "normal" : n,
                disabled: $.disabled,
                iconLeft: !!v,
                iconRight: !0,
                notched: K
              }),
              "group text-left",
              V && "group mt-2 bg-background-surface",
              a && j && m === "standard" && "mt-2",
              !$.disabled && da[x]
            ),
            onClick: () => k((L) => !L),
            onKeyDown: (L) => {
              L.key === "Escape" && k(!1), L.key === "ArrowDown" && (L.preventDefault(), k(!0));
            },
            onBlur: (L) => {
              L.currentTarget.parentElement?.contains(L.relatedTarget) || k(!1);
            },
            children: [
              K && T !== void 0 && /* @__PURE__ */ t(
                Ee,
                {
                  width: T,
                  accent: x,
                  disabled: $.disabled,
                  borderClass: da[x]
                }
              ),
              a && !(m === "standard" && j && ee) && /* @__PURE__ */ t(
                ue,
                {
                  ref: U,
                  id: `${O}-label`,
                  htmlFor: O,
                  required: $.required,
                  className: s(
                    ze({ appearance: m, floating: j, visible: ee, iconLeft: !!v, size: n }),
                    W
                  ),
                  children: a
                }
              ),
              v && /* @__PURE__ */ t(
                "span",
                {
                  className: s(
                    "inline-flex size-5 shrink-0 items-center justify-center [&_svg]:size-5",
                    ne[m]
                  ),
                  "aria-hidden": "true",
                  children: v
                }
              ),
              /* @__PURE__ */ t(
                "span",
                {
                  className: s(
                    "flex flex-1 items-center py-2 leading-5",
                    !j && ne[m],
                    m === "filled" && j && a && "self-stretch py-0 pt-[18px]",
                    V && "relative z-20"
                  ),
                  children: M?.props.children ?? r ?? "Select an option"
                }
              ),
              /* @__PURE__ */ t(
                "span",
                {
                  className: s(
                    "inline-flex size-5 shrink-0 items-center justify-center",
                    ne[m]
                  ),
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ t(Ke, { className: "size-4" })
                }
              )
            ]
          }
        ),
        g && /* @__PURE__ */ t("ul", { id: `${O}-options`, role: "listbox", "aria-label": a ?? "Options", className: Ga, children: w.map((L) => {
          const ae = String(L.props.value ?? ""), p = ae !== "" && ae === y;
          return /* @__PURE__ */ P(
            "li",
            {
              role: "option",
              "aria-selected": p,
              "aria-disabled": L.props.disabled,
              tabIndex: L.props.disabled ? void 0 : 0,
              className: s(
                "flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-action-hover focus:bg-action-hover focus:outline-none",
                p && "bg-action-selected",
                L.props.disabled && "cursor-not-allowed text-text-secondary"
              ),
              onMouseDown: (h) => h.preventDefault(),
              onClick: () => {
                L.props.disabled || Q(ae);
              },
              onKeyDown: (h) => {
                !L.props.disabled && (h.key === "Enter" || h.key === " ") && (h.preventDefault(), Q(ae)), h.key === "Escape" && (k(!1), A.current?.focus());
              },
              children: [
                L.props.children,
                c && p && /* @__PURE__ */ t(Wa, { className: s("size-4", fe[x]), "aria-hidden": "true" })
              ]
            },
            ae
          );
        }) }),
        Y && /* @__PURE__ */ t(
          le,
          {
            variant: "body2",
            tone: o ? "error" : "muted",
            id: F,
            role: o ? "alert" : void 0,
            "aria-live": "polite",
            className: "mt-1 leading-[inherit]",
            children: Y
          }
        )
      ]
    }
  );
}
const Jr = (e) => [e, ...Ca.filter((a) => a !== e)].map((a) => De(a, "graphic"));
function Yr({
  x: e,
  y: a,
  children: r,
  horizontalOffset: i,
  verticalOffset: o,
  style: l
}) {
  const d = ie(null), [n, v] = X({ width: 1, height: 1 });
  return Ea(() => {
    const c = d.current;
    if (!c) return;
    const f = (b, S) => {
      b = Math.ceil(b), S = Math.ceil(S), v((C) => C.width === b && C.height === S ? C : { width: b, height: S });
    };
    f(c.offsetWidth, c.offsetHeight);
    const u = new ResizeObserver(([b]) => {
      f(b.contentRect.width + 2, b.contentRect.height + 2);
    });
    return u.observe(c), () => u.disconnect();
  }, []), /* @__PURE__ */ t(
    "foreignObject",
    {
      x: Number(e) - n.width * i,
      y: Number(a) - n.height * o,
      width: n.width,
      height: n.height,
      overflow: "visible",
      children: /* @__PURE__ */ t("div", { ref: d, style: l, children: r })
    }
  );
}
const wi = ({
  type: e = "line",
  tone: a = "primary",
  data: r,
  series: i,
  colors: o,
  gridColor: l,
  textColor: d,
  tooltipBgColor: n,
  tooltipBorderColor: v,
  xAxisKey: c = "name",
  title: f,
  description: u,
  ariaLabel: b,
  height: S = 300,
  strokeWidth: C = 2,
  dot: N = { r: 4 },
  activeDot: $ = { r: 6 },
  fillOpacity: D = 0.2,
  barRadius: m = [4, 4, 0, 0],
  outerRadius: x = 80,
  innerRadius: O,
  showGrid: I = !0,
  showTooltip: A = !0,
  showLegend: w = !0,
  isAnimationActive: R = !0,
  className: z
}) => {
  const g = oe(), k = `${g}-title`, y = `${g}-desc`, M = Ye(() => o && o.length > 0 ? o : Jr(a), [o, a]), j = Me(
    (p, h) => p.color || M[h % M.length],
    [M]
  ), { gridColor: ee, textColor: V, customTooltipStyle: K, tooltipItemStyle: Y, tooltipLabelStyle: F, axisTickStyle: q, legendStyle: T } = Ye(() => {
    const p = l || "var(--border-subtle)", h = d || "var(--text-primary)", _ = n || "var(--background-surface)", G = v || "var(--border-subtle)", J = "var(--font-family)", Z = "var(--font-size-13)";
    return {
      gridColor: p,
      textColor: h,
      customTooltipStyle: {
        backgroundColor: _,
        borderColor: G,
        borderRadius: "var(--radius-md)",
        color: h,
        fontSize: Z,
        fontFamily: J
      },
      tooltipItemStyle: {
        color: h,
        fontSize: Z,
        fontFamily: J
      },
      tooltipLabelStyle: {
        color: De(a, "text"),
        fontSize: Z,
        fontFamily: J,
        fontWeight: 600
      },
      axisTickStyle: {
        fill: h,
        fontSize: Z,
        fontFamily: J
      },
      legendStyle: {
        color: h,
        fontSize: Z,
        fontFamily: J
      }
    };
  }, [l, d, n, v, a]), E = Me(
    (p) => /* @__PURE__ */ t("span", { style: { color: V, backgroundColor: "var(--background-surface)" }, children: p }),
    [V]
  ), U = (p, h, _, G, J) => /* @__PURE__ */ t(
    Yr,
    {
      x: p,
      y: h,
      horizontalOffset: G,
      verticalOffset: J,
      style: {
        color: V,
        backgroundColor: "var(--background-surface)",
        fontSize: q.fontSize,
        fontFamily: q.fontFamily,
        lineHeight: "20px",
        padding: "1px",
        width: "max-content",
        whiteSpace: "nowrap"
      },
      children: _
    }
  ), W = ({ x: p, y: h, payload: _ }, G) => U(p, h, _.value, G === "x" ? 0.5 : 1, G === "x" ? 0 : 0.5), Q = ({ x: p, y: h, value: _, textAnchor: G }) => U(p, h, _, G === "start" ? 0 : 1, 0.5), L = () => [
    I ? /* @__PURE__ */ t(Ja, { strokeDasharray: "3 3", stroke: ee }, "grid") : null,
    /* @__PURE__ */ t(Ya, { dataKey: c, stroke: V, tick: (p) => W(p, "x") }, "xaxis"),
    /* @__PURE__ */ t(Za, { stroke: V, tick: (p) => W(p, "y") }, "yaxis"),
    A ? /* @__PURE__ */ t(
      ea,
      {
        isAnimationActive: R,
        contentStyle: K,
        itemStyle: Y,
        labelStyle: F
      },
      "tooltip"
    ) : null,
    w ? /* @__PURE__ */ t(aa, { wrapperStyle: T, formatter: E }, "legend") : null
  ], ae = () => {
    switch (e) {
      case "pie": {
        const h = i[0]?.dataKey || "value", _ = c || "name", G = r.map((J, Z) => ({
          ...J,
          fill: J.fill || J.color || i[Z]?.color || M[Z % M.length]
        }));
        return /* @__PURE__ */ P(Xa, { children: [
          A && /* @__PURE__ */ t(
            ea,
            {
              isAnimationActive: R,
              contentStyle: K,
              itemStyle: Y,
              labelStyle: F
            }
          ),
          w && /* @__PURE__ */ t(aa, { wrapperStyle: T, formatter: E }),
          /* @__PURE__ */ t(
            Ha,
            {
              isAnimationActive: R,
              data: G,
              dataKey: h,
              nameKey: _,
              cx: "50%",
              cy: "50%",
              innerRadius: O,
              outerRadius: x,
              label: Q
            }
          )
        ] });
      }
      case "bar":
        return /* @__PURE__ */ P(_a, { data: r, children: [
          L(),
          i.map((p, h) => /* @__PURE__ */ t(
            qa,
            {
              isAnimationActive: R,
              dataKey: p.dataKey,
              name: p.name || p.dataKey,
              fill: j(p, h),
              radius: p.radius ?? m
            },
            p.dataKey
          ))
        ] });
      case "area":
        return /* @__PURE__ */ P(Ka, { data: r, children: [
          L(),
          i.map((p, h) => {
            const _ = j(p, h);
            return /* @__PURE__ */ t(
              Ua,
              {
                isAnimationActive: R,
                type: "monotone",
                dataKey: p.dataKey,
                name: p.name || p.dataKey,
                stroke: _,
                strokeWidth: p.strokeWidth ?? C,
                fill: _,
                fillOpacity: p.fillOpacity ?? D
              },
              p.dataKey
            );
          })
        ] });
      default:
        return /* @__PURE__ */ P(Ma, { data: r, children: [
          L(),
          i.map((p, h) => /* @__PURE__ */ t(
            Va,
            {
              isAnimationActive: R,
              type: "monotone",
              dataKey: p.dataKey,
              name: p.name || p.dataKey,
              stroke: j(p, h),
              strokeWidth: p.strokeWidth ?? C,
              dot: p.dot ?? N,
              activeDot: p.activeDot ?? $
            },
            p.dataKey
          ))
        ] });
    }
  };
  return /* @__PURE__ */ P(
    "div",
    {
      className: s(
        "w-full rounded-md border border-border-subtle bg-background-surface p-6 font-sans text-text-primary",
        z
      ),
      "data-tone": a,
      role: "region",
      "aria-label": f ? void 0 : b || "Chart",
      "aria-labelledby": f ? k : void 0,
      "aria-describedby": u ? y : void 0,
      children: [
        (f || u) && /* @__PURE__ */ P("div", { className: "mb-4", children: [
          f && /* @__PURE__ */ t(Re, { id: k, level: "h3", weight: "semiBold", children: f }),
          u && /* @__PURE__ */ t(le, { variant: "body2", tone: "muted", className: "mt-1 leading-[inherit]", id: y, children: u })
        ] }),
        /* @__PURE__ */ t("div", { className: "sr-only", children: /* @__PURE__ */ P("table", { "aria-label": f ? `${f} data` : b || "Chart data", children: [
          /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ P("tr", { children: [
            /* @__PURE__ */ t("th", { scope: "col", children: c }),
            i.map((p) => /* @__PURE__ */ t("th", { scope: "col", children: p.name || p.dataKey }, p.dataKey))
          ] }) }),
          /* @__PURE__ */ t("tbody", { children: r.map((p, h) => /* @__PURE__ */ P("tr", { children: [
            /* @__PURE__ */ t("td", { children: String(p[c] ?? "") }),
            i.map((_) => /* @__PURE__ */ t("td", { children: String(p[_.dataKey] ?? "") }, _.dataKey))
          ] }, h)) })
        ] }) }),
        /* @__PURE__ */ t(
          "div",
          {
            className: "min-h-48 w-full rounded-md bg-background-surface text-text-primary",
            style: { height: S },
            ...La(!1, `${f || b || "Chart"} visualization`),
            children: /* @__PURE__ */ t(ja, { width: "100%", height: "100%", children: ae() })
          }
        )
      ]
    }
  );
};
function Oe({
  variant: e,
  size: a,
  weight: r,
  family: i,
  color: o,
  tone: l,
  textTransform: d,
  underline: n = "always",
  className: v,
  children: c,
  target: f,
  rel: u,
  ...b
}) {
  return /* @__PURE__ */ t(
    "a",
    {
      ...b,
      target: f,
      rel: f === "_blank" ? [.../* @__PURE__ */ new Set([...u?.split(/\s+/).filter(Boolean) ?? [], "noopener", "noreferrer"])].join(" ") : u,
      className: s(
        Ur({ variant: e, size: a, weight: r, color: o, tone: l, textTransform: d, underline: n }),
        v
      ),
      children: c
    }
  );
}
function Zr({ pagination: e, size: a, tone: r, ariaLabel: i }) {
  const { onPageChange: o, previousIcon: l, nextIcon: d, pageStatus: n } = e, v = Math.max(1, Math.ceil(Math.max(0, e.total) / Math.max(1, e.pageSize))), c = Math.min(Math.max(e.page, 1), v), f = s(
    "inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-13 font-semibold disabled:cursor-not-allowed disabled:opacity-45",
    fe[r],
    "hover:enabled:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
  );
  return /* @__PURE__ */ P(
    "nav",
    {
      "aria-label": i,
      className: s(
        "flex items-center justify-end gap-2 border-t border-table-divider",
        a === "small" ? "px-4 py-3" : "px-4 py-4"
      ),
      children: [
        /* @__PURE__ */ P("button", { type: "button", onClick: () => o(c - 1), disabled: c <= 1, className: f, children: [
          l && /* @__PURE__ */ t("span", { className: "inline-flex size-4", "aria-hidden": "true", children: l }),
          /* @__PURE__ */ t("span", { children: "Previous" })
        ] }),
        n != null && /* @__PURE__ */ t("span", { "aria-live": "polite", className: "text-13 text-text-secondary", children: n }),
        /* @__PURE__ */ P(
          "button",
          {
            type: "button",
            onClick: () => o(c + 1),
            disabled: c >= v,
            className: f,
            children: [
              /* @__PURE__ */ t("span", { children: "Next" }),
              d && /* @__PURE__ */ t("span", { className: "inline-flex size-4", "aria-hidden": "true", children: d })
            ]
          }
        )
      ]
    }
  );
}
const Qr = { left: "text-left", center: "text-center", right: "text-right" }, ei = {
  solid: "rounded-md",
  label: "rounded-md",
  outline: "rounded-md border",
  text: "rounded-md"
}, ai = $e((e) => e.outline);
function je(e) {
  return {
    backgroundColor: `var(--table-cell-overlay, ${e})`
  };
}
function ri(e) {
  return e ? ga(e) && typeof e.props.onClick == "function" ? e : /* @__PURE__ */ t("span", { className: "inline-flex size-4 shrink-0 items-center justify-center", "aria-hidden": "true", children: e }) : null;
}
function Ci({
  className: e,
  columns: a,
  data: r,
  getRowKey: i,
  pagination: o,
  emptyMessage: l = "No results found.",
  variant: d = "outline",
  tone: n = "primary",
  size: v = "default",
  stickyFirstColumn: c = !1,
  stickyLastColumn: f = !1,
  stickyHeader: u = !1,
  showColumnBorders: b = !1,
  striped: S = !1,
  breakpoint: C,
  ...N
}) {
  const $ = oe().replace(/:/g, ""), [D, m] = X(!1), [x, O] = X(!1), I = N["aria-label"] ?? "Data table", A = pe(d, n), w = a.some((T) => T.header != null && T.header !== ""), R = w ? me[d] : "label", z = re[A][R], g = C !== "mobile", k = "bg-background-surface", y = (T) => g && c && T === 0, M = (T) => g && f && T === a.length - 1, j = (T) => y(T) || M(T), ee = {
    label: De(A, "surface"),
    solid: De(A),
    outline: "var(--background-surface)",
    text: "var(--background-surface)"
  }, V = je(ee[R]), K = je("var(--background-surface)"), Y = je("var(--action-hover-surface)"), F = (T, E, U = 0) => {
    if (!j(T) && !(E && u)) return;
    const W = [
      y(T) && (w || x) && "6px 0 6px -6px var(--action-focus)",
      M(T) && "-6px 0 6px -6px var(--action-focus)"
    ].filter(Boolean);
    return {
      ...E ? V : S && U % 2 === 1 ? Y : K,
      boxShadow: W.length ? W.join(", ") : void 0
    };
  }, q = (T, E) => s(
    "border-table-divider",
    v === "small" ? "px-4 py-3 text-13" : "px-4 py-4 text-[0.875rem] leading-[1.43]",
    Qr[T.align ?? "left"],
    b && E > 0 && !(g && c && E === 1) && !(g && f && E === a.length - 1) && "border-l",
    y(E) && "sticky left-0 z-10",
    !w && y(E) && !x && "border-r border-table-divider",
    M(E) && "sticky right-0 z-10"
  );
  return /* @__PURE__ */ P(
    "div",
    {
      className: s(
        "w-full rounded-lg border border-table-divider bg-background-surface p-4 font-sans shadow-sm",
        e
      ),
      "data-variant": w ? d : "label",
      "data-tone": A,
      "data-size": v,
      children: [
        /* @__PURE__ */ t("div", { className: "relative isolate", children: /* @__PURE__ */ t(
          "div",
          {
            tabIndex: 0,
            role: "region",
            "aria-label": `Scrollable ${I} ${$}`,
            onScroll: (T) => {
              m(T.currentTarget.scrollTop > 0), O(T.currentTarget.scrollLeft > 0);
            },
            className: s(
              "overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-current",
              u && "max-h-80 overflow-auto",
              ei[R],
              ai[A]
            ),
            children: /* @__PURE__ */ P(
              "table",
              {
                ...N,
                "aria-label": I,
                className: s("w-max min-w-full border-separate border-spacing-0 text-text-primary", k),
                children: [
                  w && /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { children: a.map((T, E) => /* @__PURE__ */ P(
                    "th",
                    {
                      scope: "col",
                      style: {
                        ...F(E, !0),
                        borderColor: R === "solid" ? De(A, "contrast") : void 0
                      },
                      className: s(
                        q(T, E),
                        "z-10 border-b border-table-divider font-medium text-text-primary",
                        z,
                        R === "outline" && "border-x-0 border-t-0 border-b",
                        j(E) && "z-20",
                        u && "sticky top-0 z-20",
                        u && R !== "label" && "border-b-0",
                        u && j(E) && "z-30",
                        "first:rounded-tl-md last:rounded-tr-md"
                      ),
                      children: [
                        /* @__PURE__ */ P("span", { className: "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-1", children: [
                          T.header,
                          ri(T.sortIcon)
                        ] }),
                        u && /* @__PURE__ */ t(
                          "span",
                          {
                            "aria-hidden": "true",
                            className: s(
                              "pointer-events-none absolute inset-x-0 -bottom-1.5 h-1.5 bg-gradient-to-b from-action-focus to-transparent",
                              R === "label" && !D && "hidden"
                            )
                          }
                        )
                      ]
                    },
                    T.key
                  )) }) }),
                  /* @__PURE__ */ t("tbody", { children: r.length ? r.map((T, E) => /* @__PURE__ */ t("tr", { className: "group", children: a.map((U, W) => {
                    const Q = !w && W === 0, L = Q ? "th" : "td", ae = U.fontWeight ?? ((!w || g && c) && W === 0 ? "semiBold" : "normal"), p = Q ? z : s(k, S && E % 2 === 1 && "bg-action-hover");
                    return /* @__PURE__ */ t(
                      L,
                      {
                        scope: Q ? "row" : void 0,
                        style: F(W, Q, E),
                        className: s(
                          q(U, W),
                          "border-b border-table-divider align-middle",
                          p,
                          !Q && "group-hover:bg-action-hover",
                          !Q && j(W) && "group-hover:[--table-cell-overlay:var(--action-hover-surface)]",
                          ae === "semiBold" ? "font-semibold" : "font-regular",
                          E === r.length - 1 && "border-b-0",
                          !w && E === 0 && W === 0 && "rounded-tl-md",
                          !w && E === 0 && W === a.length - 1 && "rounded-tr-md",
                          Q && E === r.length - 1 && "rounded-bl-md"
                        ),
                        children: U.render ? U.render(T, E) : String(T[U.key] ?? "")
                      },
                      U.key
                    );
                  }) }, i?.(T, E) ?? E)) : /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t(
                    "td",
                    {
                      colSpan: Math.max(a.length, 1),
                      className: s(
                        "text-center",
                        v === "small" ? "px-4 py-6 text-13" : "px-4 py-8 text-[0.875rem] leading-[1.43]"
                      ),
                      children: l
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
            ariaLabel: `Pagination for ${I} ${$}`
          }
        )
      ]
    }
  );
}
const ii = {
  default: "border border-border-subtle bg-background-surface shadow-sm",
  primary: "",
  secondary: "",
  label: "",
  outline: "border bg-background-surface",
  text: "border-0 bg-transparent shadow-none"
};
function Ti({
  title: e,
  description: a,
  actions: r,
  variant: i = "default",
  tone: o,
  className: l,
  headerClassName: d,
  contentClassName: n,
  children: v,
  ...c
}) {
  const f = me[i], u = pe(i, o ?? "primary"), b = i === "default" && o !== void 0;
  return /* @__PURE__ */ P(
    "section",
    {
      ...c,
      className: s(
        "overflow-hidden rounded-md font-sans text-text-primary transition-colors",
        ii[i],
        f === "solid" && i !== "default" && re[u].solid,
        b && re[u].label,
        f === "label" && re[u].label,
        f === "outline" && `${re[u].outline} border bg-background-surface`,
        b && "text-text-primary",
        l
      ),
      "data-variant": i,
      "data-tone": o !== void 0 || i === "primary" || i === "secondary" ? u : void 0,
      children: [
        (e != null || a != null || r != null) && /* @__PURE__ */ P(
          "header",
          {
            className: s(
              "flex min-h-12 items-start justify-between gap-2.5 px-4 py-4",
              v != null && "border-b border-border-subtle",
              d
            ),
            children: [
              /* @__PURE__ */ P("div", { className: "min-w-0", children: [
                e != null && /* @__PURE__ */ t("div", { className: s(Ge({ variant: "subtitle1" }), "text-inherit leading-[inherit]"), children: e }),
                a != null && /* @__PURE__ */ t("div", { className: s(Ge({ tone: "muted" }), "mt-1 leading-[inherit]"), children: a })
              ] }),
              r != null && /* @__PURE__ */ t("div", { className: "flex shrink-0 items-center gap-2", children: r })
            ]
          }
        ),
        v != null && /* @__PURE__ */ t("div", { className: s("px-4 py-4 text-15", n), children: v })
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
  tone: l,
  type: d = "button",
  ...n
}) {
  const v = me[o], c = pe(o, l ?? "primary"), u = l !== void 0 || o === "primary" || o === "secondary" ? re[c][v] : oi[o];
  return /* @__PURE__ */ t(
    "button",
    {
      ...n,
      type: d,
      className: s(
        "inline-flex shrink-0 items-center justify-center p-0 transition-colors disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
        ti[r],
        i === "circular" ? "rounded-full" : "rounded-md",
        u,
        a
      ),
      "data-size": r,
      "data-shape": i,
      "data-variant": o,
      "data-tone": l ?? (o === "primary" || o === "secondary" ? c : void 0),
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
function Di({
  label: e,
  items: a,
  triggerIcon: r,
  triggerAriaLabel: i,
  variant: o = "default",
  tone: l = "primary",
  disabled: d = !1,
  className: n,
  menuClassName: v,
  ...c
}) {
  const [f, u] = X(!1), b = ie(null), S = ie(null), C = ie(null), N = me[o], $ = pe(o, l);
  te(() => {
    if (!f) return;
    C.current?.querySelector('[role="menuitem"]:not(:disabled)')?.focus();
    const m = (O) => {
      b.current?.contains(O.target) || u(!1);
    }, x = (O) => {
      O.key === "Escape" && (u(!1), S.current?.focus());
    };
    return document.addEventListener("pointerdown", m), document.addEventListener("keydown", x), () => {
      document.removeEventListener("pointerdown", m), document.removeEventListener("keydown", x);
    };
  }, [f]);
  const D = (m) => {
    const x = Array.from(
      C.current?.querySelectorAll('[role="menuitem"]:not(:disabled)') ?? []
    );
    if (x.length === 0) return;
    const O = x.indexOf(document.activeElement);
    let I;
    m.key === "ArrowDown" ? I = (O + 1) % x.length : m.key === "ArrowUp" ? I = (O - 1 + x.length) % x.length : m.key === "Home" ? I = 0 : m.key === "End" && (I = x.length - 1), I !== void 0 && (m.preventDefault(), x[I]?.focus());
  };
  return /* @__PURE__ */ P("div", { ...c, ref: b, className: s("relative inline-flex font-sans", n), children: [
    /* @__PURE__ */ P(
      "button",
      {
        ref: S,
        type: "button",
        disabled: d,
        "aria-label": e ? void 0 : i || "Open menu",
        "aria-haspopup": "menu",
        "aria-expanded": f,
        onClick: () => u((m) => !m),
        className: s(
          "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-15 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-45",
          re[$][N]
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
        ref: C,
        role: "menu",
        "aria-label": e || i || "Menu options",
        onKeyDown: D,
        className: s(
          "absolute right-0 top-full z-50 mt-2 min-w-48 overflow-hidden rounded-md py-1",
          ni[o],
          N === "solid" && o !== "default" && re[$].solid,
          N === "label" && re[$].label,
          N === "outline" && `${re[$].outline} border bg-background-surface`,
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
                m.onSelect?.(), u(!1), S.current?.focus();
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
  small: "max-w-sm",
  medium: "max-w-xl",
  large: "max-w-3xl",
  full: "max-w-none"
}, ca = 'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';
function za({
  open: e,
  onClose: a,
  title: r,
  ariaLabel: i,
  description: o,
  children: l,
  size: d = "medium",
  closeOnBackdrop: n = !0,
  showCloseButton: v = !0,
  closeButtonLabel: c = "Close dialog",
  className: f,
  panelClassName: u,
  titleClassName: b,
  ...S
}) {
  const C = oe(), N = oe(), $ = ie(null), D = ie(a);
  return D.current = a, te(() => {
    if (!e) return;
    const m = document.activeElement, x = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const O = $.current;
    (O?.querySelectorAll(ca)?.[0] ?? O)?.focus();
    const A = (w) => {
      if (w.key === "Escape") {
        w.preventDefault(), D.current();
        return;
      }
      if (w.key !== "Tab" || !O) return;
      const R = Array.from(O.querySelectorAll(ca)).filter(
        (k) => !k.hasAttribute("hidden") && k.getAttribute("aria-hidden") !== "true"
      ), z = R[0], g = R[R.length - 1];
      z ? w.shiftKey && (document.activeElement === z || document.activeElement === O) ? (w.preventDefault(), g?.focus()) : !w.shiftKey && document.activeElement === g && (w.preventDefault(), z.focus()) : (w.preventDefault(), O.focus());
    };
    return document.addEventListener("keydown", A), () => {
      document.removeEventListener("keydown", A), document.body.style.overflow = x, m instanceof HTMLElement && m.isConnected && m.focus();
    };
  }, [e]), !e || typeof document > "u" ? null : Qa(
    /* @__PURE__ */ t(
      "div",
      {
        className: s(
          "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-backdrop-overlay p-4 sm:p-6",
          f
        ),
        onMouseDown: (m) => {
          n && m.target === m.currentTarget && a();
        },
        children: /* @__PURE__ */ P(
          "div",
          {
            ...S,
            ref: $,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": r !== void 0 ? C : void 0,
            "aria-label": r === void 0 ? i : void 0,
            "aria-describedby": o != null ? N : void 0,
            tabIndex: -1,
            className: s(
              "relative my-auto w-full rounded-md border border-border-subtle bg-background-surface p-5 text-text-primary shadow-xl outline-none sm:p-6",
              si[d],
              u
            ),
            children: [
              (r !== void 0 || v) && /* @__PURE__ */ P("div", { className: "mb-4 flex items-start justify-between gap-4", children: [
                r !== void 0 && /* @__PURE__ */ t(
                  Re,
                  {
                    level: "h2",
                    weight: "semibold",
                    id: C,
                    className: s("min-w-0 text-20 leading-[inherit]", b),
                    children: r
                  }
                ),
                v && /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: a,
                    "aria-label": c,
                    className: "ml-auto inline-flex size-9 shrink-0 items-center justify-center rounded-full text-text-primary hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
                    children: /* @__PURE__ */ t(ma, { "aria-hidden": "true", className: "size-5" })
                  }
                )
              ] }),
              o != null && /* @__PURE__ */ t(le, { tone: "muted", id: N, className: "mb-4 leading-[inherit]", children: o }),
              /* @__PURE__ */ t("div", { children: l })
            ]
          }
        )
      }
    ),
    document.body
  );
}
const di = {
  left: "items-stretch justify-start",
  right: "items-stretch justify-end",
  top: "items-start justify-center",
  bottom: "items-end justify-center"
};
function Si({
  anchor: e = "left",
  width: a = 320,
  height: r = "auto",
  className: i,
  panelClassName: o,
  titleClassName: l,
  style: d,
  open: n,
  closeButtonLabel: v = "Close drawer",
  ...c
}) {
  const f = ie(null), [u, b] = X({}), S = e === "left" || e === "right";
  return te(() => {
    if (!n || !f.current) return;
    const C = getComputedStyle(f.current), N = {};
    for (const $ of C)
      $.startsWith("--") && (N[$] = C.getPropertyValue($));
    b(N);
  }, [n]), /* @__PURE__ */ P(pa, { children: [
    /* @__PURE__ */ t("span", { ref: f, hidden: !0 }),
    /* @__PURE__ */ t(
      za,
      {
        ...c,
        open: n,
        size: "full",
        closeButtonLabel: v,
        titleClassName: s("self-center text-[19px] leading-22", l),
        className: s("overflow-hidden p-0 sm:p-0", di[e], i),
        panelClassName: s(
          "m-0 max-h-full max-w-full shrink-0 overflow-y-auto overscroll-contain rounded-none font-sans",
          S && "h-full",
          o
        ),
        style: {
          ...u,
          width: S ? a : "100%",
          height: S ? "100%" : r,
          // Explicit styles take precedence over inherited tokens and dimensions.
          ...d
        },
        "data-anchor": e
      }
    )
  ] });
}
function Oi({
  brand: e,
  links: a,
  brandHref: r = "#top",
  activeHref: i,
  ariaLabel: o = "Main navigation",
  className: l,
  ...d
}) {
  const [n, v] = X(!1), c = oe();
  te(() => {
    if (!n) return;
    const u = (b) => {
      b.key === "Escape" && v(!1);
    };
    return document.addEventListener("keydown", u), () => document.removeEventListener("keydown", u);
  }, [n]);
  const f = () => a.map((u) => /* @__PURE__ */ t(
    Oe,
    {
      underline: "none",
      weight: "medium",
      href: u.href,
      "aria-current": i === u.href ? "page" : void 0,
      onClick: () => v(!1),
      className: s(
        "rounded-sm leading-[inherit] transition-colors hover:text-palette-primary-main focus-visible:outline-offset-4",
        i === u.href ? "text-palette-primary-main" : "text-text-primary"
      ),
      children: u.label
    },
    u.href
  ));
  return /* @__PURE__ */ P(
    "header",
    {
      ...d,
      className: s(
        "sticky top-0 z-40 w-full min-w-0 border-b border-border-subtle bg-background-surface [container-type:inline-size]",
        l
      ),
      children: [
        /* @__PURE__ */ P("div", { className: "mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ t(
            Oe,
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
              "aria-label": n ? "Close navigation menu" : "Open navigation menu",
              "aria-expanded": n,
              "aria-controls": c,
              onClick: () => v((u) => !u),
              children: n ? /* @__PURE__ */ t(ma, { "aria-hidden": "true", className: "size-6" }) : /* @__PURE__ */ t(er, { "aria-hidden": "true", className: "size-6" })
            }
          )
        ] }),
        n && /* @__PURE__ */ t(
          "nav",
          {
            id: c,
            "aria-label": o,
            className: "flex flex-col gap-1 border-t border-border-subtle px-4 py-3 [@container(min-width:768px)]:hidden",
            children: a.map((u) => /* @__PURE__ */ t(
              Oe,
              {
                underline: "none",
                weight: "medium",
                href: u.href,
                "aria-current": i === u.href ? "page" : void 0,
                onClick: () => v(!1),
                className: s(
                  "flex min-h-11 items-center rounded-md px-3 py-2.5 leading-[inherit] transition-colors hover:bg-action-hover",
                  i === u.href ? "text-palette-primary-main" : "text-text-primary"
                ),
                children: u.label
              },
              u.href
            ))
          }
        )
      ]
    }
  );
}
const ua = "pointer-events-auto [@media(hover:hover)]:pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto", ci = [
  { label: "Previous project", direction: -1, position: "left-3", Icon: ir },
  { label: "Next project", direction: 1, position: "right-3", Icon: tr }
];
function Ni({
  items: e,
  heading: a = "Portfolio",
  allLabel: r = "All",
  ariaLabel: i = "Portfolio projects",
  className: o,
  gridClassName: l,
  showHoverActions: d = !1,
  filterStyle: n = "default",
  onFilterChange: v,
  onProjectClick: c,
  onPreviewOpen: f,
  onPreviewClose: u,
  onPreviewChange: b,
  ...S
}) {
  const [C, N] = X(null), [$, D] = X(null), m = C === null ? e : e.filter((g) => g.category === C), x = $ === null ? void 0 : m[$], O = x !== void 0, I = Array.from(new Set(e.map((g) => g.category))), A = n === "default" || n === "underline", w = Me(
    (g) => {
      if ($ === null || !m.length) return;
      const k = ($ + g + m.length) % m.length;
      D(k), b?.(m[k]);
    },
    [$, m, b]
  );
  te(() => {
    if (!O) return;
    const g = (k) => {
      k.key === "ArrowLeft" ? (k.preventDefault(), w(-1)) : k.key === "ArrowRight" && (k.preventDefault(), w(1));
    };
    return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
  }, [O, w]), te(() => {
    D(null);
  }, [C]);
  const R = () => {
    D(null), x && u?.(x);
  }, z = (g, k) => {
    k.focus(), D(g), f?.(m[g]);
  };
  return /* @__PURE__ */ P(
    "section",
    {
      ...S,
      "aria-label": i,
      className: s("mx-auto w-full max-w-7xl px-4 py-12 font-sans sm:px-6 lg:px-8", o),
      children: [
        /* @__PURE__ */ t(Re, { level: "h2", className: "mb-6 text-center text-28 leading-[inherit]", children: a }),
        /* @__PURE__ */ t("div", { className: "mb-8 flex flex-wrap justify-center gap-2", role: "group", "aria-label": "Filter projects", children: [null, ...I].map((g) => /* @__PURE__ */ t(
          Xr,
          {
            type: "button",
            size: "sm",
            shape: n === "pill" ? "pill" : "rectangle",
            variant: A ? "text" : C === g ? "default" : "label",
            className: s(
              A && "rounded-none border-b-2 border-transparent text-text-primary",
              A && C === g && "border-palette-primary-text"
            ),
            "aria-pressed": C === g,
            onClick: () => {
              N(g), v?.(g);
            },
            children: g ?? r
          },
          g ?? r
        )) }),
        m.length > 0 ? /* @__PURE__ */ t("ul", { className: s("grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3", l), children: m.map((g, k) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ P("div", { className: "group relative", children: [
          /* @__PURE__ */ P(
            "button",
            {
              type: "button",
              onClick: (y) => z(k, y.currentTarget),
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
                /* @__PURE__ */ P("span", { className: s("block p-4", d && "sr-only"), children: [
                  /* @__PURE__ */ t("span", { className: "block text-18 font-semibold text-text-primary", children: g.title }),
                  /* @__PURE__ */ t("span", { className: "mt-1 block text-13 text-text-secondary", children: g.category })
                ] })
              ]
            }
          ),
          d && /* @__PURE__ */ P("div", { className: "pointer-events-none absolute inset-1.5 flex flex-col items-center justify-center gap-4 rounded-sm bg-background-surface text-text-primary transition-opacity duration-300 motion-reduce:transition-none [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100", children: [
            /* @__PURE__ */ t(
              le,
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
                Oe,
                {
                  href: g.href,
                  onClick: () => c?.(g),
                  underline: "none",
                  "aria-label": `Visit ${g.title}`,
                  title: "Visit project",
                  className: s(
                    ua,
                    "inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-palette-primary-dark focus:bg-palette-primary-dark focus-visible:outline-palette-primary-graphic",
                    Se.primary.default,
                    Se.primary.defaultText
                  ),
                  children: /* @__PURE__ */ t(ar, { "aria-hidden": "true", className: "size-4" })
                }
              ),
              /* @__PURE__ */ t(
                li,
                {
                  type: "button",
                  variant: "default",
                  tone: "primary",
                  title: "Preview project",
                  className: ua,
                  "aria-label": `Preview ${g.title}`,
                  onClick: (y) => z(k, y.currentTarget),
                  children: /* @__PURE__ */ t(rr, { "aria-hidden": "true", className: "size-4" })
                }
              )
            ] })
          ] })
        ] }) }, g.id ?? `${g.image}-${g.title}`)) }) : /* @__PURE__ */ t(le, { tone: "muted", className: "py-8 text-center", children: "No projects in this category." }),
        x && /* @__PURE__ */ P(
          za,
          {
            open: !0,
            onClose: R,
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
                m.length > 1 && ci.map(({ label: g, direction: k, position: y, Icon: M }) => /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    "aria-label": g,
                    onClick: () => w(k),
                    className: s(
                      "absolute top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background-surface/90 text-text-primary shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
                      y
                    ),
                    children: /* @__PURE__ */ t(M, { "aria-hidden": "true", className: "size-6" })
                  },
                  k
                ))
              ] }),
              x.description && /* @__PURE__ */ t(le, { tone: "muted", className: "mt-4", children: x.description }),
              /* @__PURE__ */ P(le, { variant: "body2", tone: "muted", className: "mt-3 text-right", "aria-live": "polite", children: [
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
}, Ia = { Dark: "dark", Light: "light", "Pulse-Dark": "pulse-dark", Pulse: "pulse", "Teal-Dark": "teal-dark", Teal: "teal" };
function Ba(e) {
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
  return Ba(r.$value);
}
const He = (e) => Object.fromEntries(
  Object.entries(e).flatMap(([a, r]) => typeof r == "string" ? [] : [[a, Ba(r.$value)]])
), ge = (e, a = "") => Object.fromEntries(Object.entries(He(e)).map(([r, i]) => [r.replace(a, ""), i])), Ce = (e, a = "") => Object.fromEntries(
  Object.entries(He(e)).map(([r, i]) => [r.replace(a, ""), Number.parseFloat(i)])
);
function ui(e) {
  const a = Le.Variables[e], r = Le.Primitives[e], i = He(a["Color-Palette"]);
  return {
    core: {
      color: {
        primary: ge(r.Color.Primary, "primary-"),
        secondary: ge(r.Color.Secondary, "secondary-"),
        info: ge(r.Color.Info, "info-"),
        error: ge(r.Color.Error, "error-"),
        warning: ge(r.Color.Warning, "warning-"),
        success: ge(r.Color.Success, "success-"),
        gray: ge(r.Color.Gray, "gray-"),
        palette: i
      },
      space: Ce(r.Gap, "gap-"),
      radius: Ce(r["Border-Radius"], /^(border-radius-|border-)/),
      fontFamily: r.Typography["font-family"].$value,
      fontSize: Ce(r.Typography["font-size"]),
      fontWeight: Ce(r.Typography["font-weight"]),
      lineHeight: Ce(r.Typography["line-height"])
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
const Ne = Object.fromEntries(
  Object.keys(Le.Variables).map((e) => [Ia[e], ui(e)])
), Gi = Object.values(Ia).sort((e, a) => e.localeCompare(a)), Li = { core: Ne.pulse.core, semantic: Ne.pulse.semantic, themes: Ne }, zi = (e) => Ne[e], Ii = { mobile: "640px", tablet: "900px", desktop: "1280px" };
export {
  yi as Accordion,
  bi as Autocomplete,
  le as BodyText,
  Xr as Button,
  Ti as Card,
  hi as Carousel,
  wi as Chart,
  Si as Drawer,
  Ni as Gallery,
  Re as Heading,
  li as IconButton,
  xi as Input,
  ue as LabelText,
  Oe as Link,
  Di as Menu,
  za as Modal,
  Oi as Navbar,
  le as Paragraph,
  ki as Select,
  Ci as Table,
  Pi as Textarea,
  Ii as breakpoints,
  me as componentVariantAppearances,
  zi as getThemeTokens,
  $e as mapPaletteTones,
  Se as paletteToneStyles,
  Ca as paletteTones,
  pe as resolveVariantTone,
  Gi as themeModes,
  Li as themeTokens,
  De as toneVar
};
