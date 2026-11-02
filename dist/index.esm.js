import { jsx as t, jsxs as k, Fragment as Da } from "react/jsx-runtime";
import { useState as J, useId as ce, Children as oa, useRef as ie, useEffect as ge, isValidElement as la, useMemo as Ke, useCallback as _e, useLayoutEffect as Sa } from "react";
import { ChevronUpIcon as na, ChevronDownIcon as Fe, XMarkIcon as Oa, ChevronLeftIcon as qe, ChevronRightIcon as He, HeartIcon as Ga, CheckIcon as La } from "@heroicons/react/24/solid";
import { ResponsiveContainer as Na, LineChart as za, Line as Ba, AreaChart as Ia, Area as Aa, BarChart as Ea, Bar as Fa, PieChart as Wa, Tooltip as Xe, Legend as Je, Pie as Ra, CartesianGrid as Ma, XAxis as ja, YAxis as Va } from "recharts";
function sa(e) {
  var a, r, i = "";
  if (typeof e == "string" || typeof e == "number") i += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (a = 0; a < o; a++) e[a] && (r = sa(e[a])) && (i && (i += " "), i += r);
  } else for (r in e) e[r] && (i && (i += " "), i += r);
  return i;
}
function da() {
  for (var e, a, r = 0, i = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (a = sa(e)) && (i && (i += " "), i += a);
  return i;
}
const We = "-", Ua = (e) => {
  const a = _a(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: i
  } = e;
  return {
    getClassGroupId: (d) => {
      const n = d.split(We);
      return n[0] === "" && n.length !== 1 && n.shift(), ca(n, a) || Ka(d);
    },
    getConflictingClassGroupIds: (d, n) => {
      const p = r[d] || [];
      return n && i[d] ? [...p, ...i[d]] : p;
    }
  };
}, ca = (e, a) => {
  if (e.length === 0)
    return a.classGroupId;
  const r = e[0], i = a.nextPart.get(r), o = i ? ca(e.slice(1), i) : void 0;
  if (o)
    return o;
  if (a.validators.length === 0)
    return;
  const l = e.join(We);
  return a.validators.find(({
    validator: d
  }) => d(l))?.classGroupId;
}, Ye = /^\[(.+)\]$/, Ka = (e) => {
  if (Ye.test(e)) {
    const a = Ye.exec(e)[1], r = a?.substring(0, a.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, _a = (e) => {
  const {
    theme: a,
    prefix: r
  } = e, i = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Ha(Object.entries(e.classGroups), r).forEach(([l, d]) => {
    Ee(d, i, l, a);
  }), i;
}, Ee = (e, a, r, i) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const l = o === "" ? a : Ze(a, o);
      l.classGroupId = r;
      return;
    }
    if (typeof o == "function") {
      if (qa(o)) {
        Ee(o(i), a, r, i);
        return;
      }
      a.validators.push({
        validator: o,
        classGroupId: r
      });
      return;
    }
    Object.entries(o).forEach(([l, d]) => {
      Ee(d, Ze(a, l), r, i);
    });
  });
}, Ze = (e, a) => {
  let r = e;
  return a.split(We).forEach((i) => {
    r.nextPart.has(i) || r.nextPart.set(i, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(i);
  }), r;
}, qa = (e) => e.isThemeGetter, Ha = (e, a) => a ? e.map(([r, i]) => {
  const o = i.map((l) => typeof l == "string" ? a + l : typeof l == "object" ? Object.fromEntries(Object.entries(l).map(([d, n]) => [a + d, n])) : l);
  return [r, o];
}) : e, Xa = (e) => {
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
}, ua = "!", Ja = (e) => {
  const {
    separator: a,
    experimentalParseClassName: r
  } = e, i = a.length === 1, o = a[0], l = a.length, d = (n) => {
    const p = [];
    let c = 0, v = 0, g;
    for (let m = 0; m < n.length; m++) {
      let C = n[m];
      if (c === 0) {
        if (C === o && (i || n.slice(m, m + l) === a)) {
          p.push(n.slice(v, m)), v = m + l;
          continue;
        }
        if (C === "/") {
          g = m;
          continue;
        }
      }
      C === "[" ? c++ : C === "]" && c--;
    }
    const y = p.length === 0 ? n : n.substring(v), T = y.startsWith(ua), G = T ? y.substring(1) : y, S = g && g > v ? g - v : void 0;
    return {
      modifiers: p,
      hasImportantModifier: T,
      baseClassName: G,
      maybePostfixModifierPosition: S
    };
  };
  return r ? (n) => r({
    className: n,
    parseClassName: d
  }) : d;
}, Ya = (e) => {
  if (e.length <= 1)
    return e;
  const a = [];
  let r = [];
  return e.forEach((i) => {
    i[0] === "[" ? (a.push(...r.sort(), i), r = []) : r.push(i);
  }), a.push(...r.sort()), a;
}, Za = (e) => ({
  cache: Xa(e.cacheSize),
  parseClassName: Ja(e),
  ...Ua(e)
}), Qa = /\s+/, er = (e, a) => {
  const {
    parseClassName: r,
    getClassGroupId: i,
    getConflictingClassGroupIds: o
  } = a, l = [], d = e.trim().split(Qa);
  let n = "";
  for (let p = d.length - 1; p >= 0; p -= 1) {
    const c = d[p], {
      modifiers: v,
      hasImportantModifier: g,
      baseClassName: y,
      maybePostfixModifierPosition: T
    } = r(c);
    let G = !!T, S = i(G ? y.substring(0, T) : y);
    if (!S) {
      if (!G) {
        n = c + (n.length > 0 ? " " + n : n);
        continue;
      }
      if (S = i(y), !S) {
        n = c + (n.length > 0 ? " " + n : n);
        continue;
      }
      G = !1;
    }
    const m = Ya(v).join(":"), C = g ? m + ua : m, b = C + S;
    if (l.includes(b))
      continue;
    l.push(b);
    const h = o(S, G);
    for (let O = 0; O < h.length; ++O) {
      const L = h[O];
      l.push(C + L);
    }
    n = c + (n.length > 0 ? " " + n : n);
  }
  return n;
};
function ar() {
  let e = 0, a, r, i = "";
  for (; e < arguments.length; )
    (a = arguments[e++]) && (r = pa(a)) && (i && (i += " "), i += r);
  return i;
}
const pa = (e) => {
  if (typeof e == "string")
    return e;
  let a, r = "";
  for (let i = 0; i < e.length; i++)
    e[i] && (a = pa(e[i])) && (r && (r += " "), r += a);
  return r;
};
function Qe(e, ...a) {
  let r, i, o, l = d;
  function d(p) {
    const c = a.reduce((v, g) => g(v), e());
    return r = Za(c), i = r.cache.get, o = r.cache.set, l = n, n(p);
  }
  function n(p) {
    const c = i(p);
    if (c)
      return c;
    const v = er(p, r);
    return o(p, v), v;
  }
  return function() {
    return l(ar.apply(null, arguments));
  };
}
const H = (e) => {
  const a = (r) => r[e] || [];
  return a.isThemeGetter = !0, a;
}, va = /^\[(?:([a-z-]+):)?(.+)\]$/i, rr = /^\d+\/\d+$/, ir = /* @__PURE__ */ new Set(["px", "full", "screen"]), tr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, or = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, lr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, nr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, sr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, oe = (e) => ye(e) || ir.has(e) || rr.test(e), le = (e) => be(e, "length", fr), ye = (e) => !!e && !Number.isNaN(Number(e)), Be = (e) => be(e, "number", ye), Pe = (e) => !!e && Number.isInteger(Number(e)), dr = (e) => e.endsWith("%") && ye(e.slice(0, -1)), I = (e) => va.test(e), ne = (e) => tr.test(e), cr = /* @__PURE__ */ new Set(["length", "size", "percentage"]), ur = (e) => be(e, cr, ga), pr = (e) => be(e, "position", ga), vr = /* @__PURE__ */ new Set(["image", "url"]), gr = (e) => be(e, vr, yr), $r = (e) => be(e, "", mr), ke = () => !0, be = (e, a, r) => {
  const i = va.exec(e);
  return i ? i[1] ? typeof a == "string" ? i[1] === a : a.has(i[1]) : r(i[2]) : !1;
}, fr = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  or.test(e) && !lr.test(e)
), ga = () => !1, mr = (e) => nr.test(e), yr = (e) => sr.test(e), ea = () => {
  const e = H("colors"), a = H("spacing"), r = H("blur"), i = H("brightness"), o = H("borderColor"), l = H("borderRadius"), d = H("borderSpacing"), n = H("borderWidth"), p = H("contrast"), c = H("grayscale"), v = H("hueRotate"), g = H("invert"), y = H("gap"), T = H("gradientColorStops"), G = H("gradientColorStopPositions"), S = H("inset"), m = H("margin"), C = H("opacity"), b = H("padding"), h = H("saturate"), O = H("scale"), L = H("sepia"), W = H("skew"), D = H("space"), R = H("translate"), B = () => ["auto", "contain", "none"], N = () => ["auto", "hidden", "clip", "visible", "scroll"], z = () => ["auto", I, a], f = () => [I, a], V = () => ["", oe, le], M = () => ["auto", ye, I], ee = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], j = () => ["solid", "dashed", "dotted", "double", "none"], U = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Y = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], E = () => ["", "0", I], q = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], x = () => [ye, I];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [ke],
      spacing: [oe, le],
      blur: ["none", "", ne, I],
      brightness: x(),
      borderColor: [e],
      borderRadius: ["none", "", "full", ne, I],
      borderSpacing: f(),
      borderWidth: V(),
      contrast: x(),
      grayscale: E(),
      hueRotate: x(),
      invert: E(),
      gap: f(),
      gradientColorStops: [e],
      gradientColorStopPositions: [dr, le],
      inset: z(),
      margin: z(),
      opacity: x(),
      padding: f(),
      saturate: x(),
      scale: x(),
      sepia: E(),
      skew: x(),
      space: f(),
      translate: f()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", I]
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
        columns: [ne]
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
        object: [...ee(), I]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: N()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": N()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": N()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: B()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": B()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": B()
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
        inset: [S]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [S]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [S]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [S]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [S]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [S]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [S]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [S]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [S]
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
        z: ["auto", Pe, I]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: z()
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
        flex: ["1", "auto", "initial", "none", I]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: E()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: E()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Pe, I]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [ke]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Pe, I]
        }, I]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": M()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": M()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [ke]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Pe, I]
        }, I]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": M()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": M()
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
        "auto-cols": ["auto", "min", "max", "fr", I]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", I]
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
        p: [b]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [b]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [b]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [b]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [b]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [b]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [b]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [b]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [b]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [m]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [m]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [m]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [m]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [m]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [m]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [m]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [m]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [m]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", I, a]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [I, a, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [I, a, "none", "full", "min", "max", "fit", "prose", {
          screen: [ne]
        }, ne]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [I, a, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [I, a, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [I, a, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [I, a, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", ne, le]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Be]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ke]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", I]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", ye, Be]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", oe, I]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", I]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", I]
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
        "placeholder-opacity": [C]
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
        "text-opacity": [C]
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
        decoration: [...j(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", oe, le]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", oe, I]
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
        indent: f()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", I]
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
        content: ["none", I]
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
        "bg-opacity": [C]
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
        bg: [...ee(), pr]
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
        bg: ["auto", "cover", "contain", ur]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, gr]
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
        from: [G]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [G]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [G]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [T]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [T]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [T]
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
        "border-opacity": [C]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...j(), "hidden"]
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
        "divide-opacity": [C]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: j()
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
        outline: ["", ...j()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [oe, I]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [oe, le]
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
        ring: V()
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
        "ring-opacity": [C]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [oe, le]
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
        shadow: ["", "inner", "none", ne, $r]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [ke]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [C]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...U(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": U()
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
        contrast: [p]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", ne, I]
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
        "hue-rotate": [v]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [g]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [h]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [L]
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
        "backdrop-contrast": [p]
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
        "backdrop-hue-rotate": [v]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [g]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [C]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [h]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [L]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", I]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: x()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", I]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: x()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", I]
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
        rotate: [Pe, I]
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
        "skew-x": [W]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [W]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", I]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", I]
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
        "scroll-m": f()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": f()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": f()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": f()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": f()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": f()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": f()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": f()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": f()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": f()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": f()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": f()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": f()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": f()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": f()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": f()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": f()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": f()
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
        "will-change": ["auto", "scroll", "contents", "transform", I]
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
        stroke: [oe, le, Be]
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
}, br = (e, {
  cacheSize: a,
  prefix: r,
  separator: i,
  experimentalParseClassName: o,
  extend: l = {},
  override: d = {}
}) => {
  Ce(e, "cacheSize", a), Ce(e, "prefix", r), Ce(e, "separator", i), Ce(e, "experimentalParseClassName", o);
  for (const n in d)
    hr(e[n], d[n]);
  for (const n in l)
    xr(e[n], l[n]);
  return e;
}, Ce = (e, a, r) => {
  r !== void 0 && (e[a] = r);
}, hr = (e, a) => {
  if (a)
    for (const r in a)
      Ce(e, r, a[r]);
}, xr = (e, a) => {
  if (a)
    for (const r in a) {
      const i = a[r];
      i !== void 0 && (e[r] = (e[r] || []).concat(i));
    }
}, Pr = (e, ...a) => typeof e == "function" ? Qe(ea, e, ...a) : Qe(() => br(ea(), e), ...a), kr = Pr({
  extend: {
    classGroups: {
      // Register the project's custom text-size and font-weight utilities.
      "font-size": [{ text: ["12", "13", "15", "18", "24", "28", "38", "46"] }],
      "font-weight": [{ font: ["regular"] }]
    }
  }
}), u = (...e) => kr(da(e)), $e = {
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
function ue(e, a) {
  return e === "primary" || e === "secondary" ? e : a;
}
const aa = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ra = da, $a = (e, a) => (r) => {
  var i;
  if (a?.variants == null) return ra(e, r?.class, r?.className);
  const { variants: o, defaultVariants: l } = a, d = Object.keys(o).map((c) => {
    const v = r?.[c], g = l?.[c];
    if (v === null) return null;
    const y = aa(v) || aa(g);
    return o[c][y];
  }), n = r && Object.entries(r).reduce((c, v) => {
    let [g, y] = v;
    return y === void 0 || (c[g] = y), c;
  }, {}), p = a == null || (i = a.compoundVariants) === null || i === void 0 ? void 0 : i.reduce((c, v) => {
    let { class: g, className: y, ...T } = v;
    return Object.entries(T).every((G) => {
      let [S, m] = G;
      return Array.isArray(m) ? m.includes({
        ...l,
        ...n
      }[S]) : {
        ...l,
        ...n
      }[S] === m;
    }) ? [
      ...c,
      g,
      y
    ] : c;
  }, []);
  return ra(e, d, p, r?.class, r?.className);
}, fa = ["primary", "secondary", "error", "warning", "info", "success"], wr = {
  primary: {
    default: "bg-palette-primary-main",
    defaultState: "enabled:hover:bg-palette-primary-dark enabled:active:bg-palette-primary-dark enabled:focus:bg-palette-primary-dark focus-visible:outline-palette-primary-graphic",
    defaultText: "text-palette-primary-contrast",
    label: "bg-palette-primary-opacity-light",
    labelState: "enabled:hover:bg-palette-primary-opacity-main enabled:active:bg-palette-primary-opacity-main enabled:focus:bg-palette-primary-opacity-main",
    outline: "border-palette-primary-graphic",
    text: "text-palette-primary-text",
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
    subtleState: "enabled:hover:bg-palette-success-opacity-lighter enabled:active:bg-palette-success-opacity-lighter enabled:focus:bg-palette-success-opacity-lighter",
    fieldBorder: "border-palette-success-graphic hover:border-palette-success-graphic focus-within:border-palette-success-graphic",
    notchBorder: "border-palette-success-graphic group-hover:border-palette-success-graphic"
  }
}, fe = (e) => Object.fromEntries(fa.map((a) => [a, e(wr[a])])), Te = (e, a = "main") => `var(--palette-${e}-${a})`, Cr = $a(
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
), re = fe((e) => ({
  solid: `${e.default} ${e.defaultText} ${e.defaultState}`,
  label: `${e.label} ${e.text} ${e.labelState}`,
  outline: `border bg-transparent ${e.outline} ${e.text} ${e.subtleState}`,
  text: `bg-transparent ${e.text} ${e.subtleState}`
}));
function Hr({
  items: e,
  className: a,
  allowMultiple: r = !1,
  collapsedIcon: i,
  expandedIcon: o,
  iconPosition: l = "right",
  variant: d = "default",
  tone: n = "primary",
  size: p = "normal",
  children: c
}) {
  const [v, g] = J(/* @__PURE__ */ new Set()), y = ce(), T = ue(d, n), G = $e[d], S = re[T][G], m = oa.toArray(c);
  return /* @__PURE__ */ t("div", { className: u("grid gap-2 font-sans", a), "data-variant": d, "data-tone": T, children: e.map((C, b) => {
    const h = v.has(C.id), O = h ? na : Fe, L = m[b] ?? C.content, W = `${y}-button-${C.id}`, D = `${y}-panel-${C.id}`, R = /* @__PURE__ */ t("span", { "aria-hidden": "true", className: "inline-flex size-4 shrink-0 items-center justify-center", children: (h ? o : i) ?? /* @__PURE__ */ t(O, { className: "size-4" }) });
    return /* @__PURE__ */ k("div", { className: "overflow-hidden rounded-md bg-background-surface transition-colors", children: [
      /* @__PURE__ */ k(
        "button",
        {
          type: "button",
          id: W,
          "aria-expanded": h,
          "aria-controls": D,
          className: u(
            "flex w-full items-center text-left font-medium text-text-primary outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-current",
            p === "small" ? "min-h-11 gap-2 px-4 text-15" : "min-h-12 gap-2.5 px-4 text-18",
            S,
            G === "solid" && "focus-visible:outline-current",
            G === "outline" && (h && L != null ? "rounded-t-md" : "rounded-md")
          ),
          onClick: () => g((B) => {
            const N = r ? new Set(B) : /* @__PURE__ */ new Set();
            return B.has(C.id) ? N.delete(C.id) : N.add(C.id), N;
          }),
          children: [
            l === "left" && R,
            /* @__PURE__ */ t("span", { className: "flex-1", children: C.title }),
            l === "right" && R
          ]
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          id: D,
          role: "region",
          "aria-labelledby": W,
          hidden: !h || L == null,
          className: u(
            "border-t border-border-subtle bg-background-surface px-4 text-text-secondary",
            p === "small" ? "py-3 text-13" : "py-4 text-15"
          ),
          children: h ? L : null
        }
      )
    ] }, C.id);
  }) });
}
function Oe({
  appearance: e,
  floating: a,
  visible: r,
  iconLeft: i = !1,
  size: o = "normal",
  multiline: l = !1
}) {
  let d;
  return r ? a && e === "outlined" ? d = "left-3 -top-2 px-1 text-13 bg-background-surface" : a && e === "filled" ? d = "left-4 top-1 text-13 leading-14" : l ? d = "left-4 top-2" : d = u("top-1/2 -translate-y-1/2 text-inherit", i ? o === "small" ? "left-9" : "left-[42px]" : "left-4") : d = "sr-only", u(
    "pointer-events-none absolute z-10 mb-0 transition-all",
    d,
    !l && !a && e !== "outlined" && "mt-[0.5px] group-focus-within:mt-px"
  );
}
function Ge(e, a, r) {
  const i = e === "primary" || e === "secondary" ? "outlined" : e, o = r ? "error" : ue(e, a);
  return { appearance: i, accent: o };
}
const Re = fe((e) => e.fieldBorder), se = fe((e) => e.text);
function Le({
  disabled: e,
  error: a,
  active: r,
  accent: i
}) {
  return e ? "text-text-disabled" : a ? se.error : r ? se[i] : "text-text-secondary";
}
const Tr = fe((e) => e.notchBorder), Ne = $a(
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
), Me = "w-full min-w-0 flex-1 border-0 bg-transparent py-2 font-sans text-inherit leading-5 outline-none placeholder:text-text-secondary disabled:cursor-not-allowed disabled:text-text-disabled", te = {
  outlined: "",
  filled: "relative top-[0.5px] group-focus-within:top-px",
  standard: "relative top-[0.5px] group-focus-within:top-px"
}, Dr = "mb-1 block font-sans text-13 font-medium text-text-secondary", je = "mt-1 font-sans text-13 text-palette-error-text", ma = "absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-md border border-border-subtle bg-background-surface py-2 font-sans text-15 text-text-primary shadow-lg", ya = (e, a) => ({
  "aria-hidden": e || void 0,
  role: e ? void 0 : "img",
  "aria-label": a
});
function de({ required: e, className: a, children: r, ref: i, ...o }) {
  return /* @__PURE__ */ k("label", { ref: i, className: u(Dr, a), ...o, children: [
    r,
    e && /* @__PURE__ */ t("span", { className: "ml-1 text-palette-error-text", ...ya(!0), children: "*" })
  ] });
}
function ze({ width: e, accent: a, disabled: r, borderClass: i }) {
  const o = r ? "border-text-disabled" : i ?? Tr[a];
  return /* @__PURE__ */ k(Da, { children: [
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: u(
          "absolute bottom-0 left-0 top-0 w-3 rounded-l-md border-b border-l border-t group-focus-within:border-b-2 group-focus-within:border-l-2 group-focus-within:border-t-2",
          o
        )
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: u("absolute bottom-0 left-3 right-3 border-b group-focus-within:border-b-2", o)
      }
    ),
    /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: u(
          "absolute bottom-0 right-0 top-0 rounded-r-md border-b border-r border-t group-focus-within:border-b-2 group-focus-within:border-r-2 group-focus-within:border-t-2",
          o
        ),
        style: { left: 12 + e }
      }
    )
  ] });
}
function Xr({
  className: e,
  error: a,
  helperText: r,
  iconLeft: i,
  iconRight: o,
  label: l,
  variant: d = "default",
  tone: n = "primary",
  size: p = "normal",
  onChange: c,
  onSelect: v,
  options: g,
  value: y,
  defaultValue: T,
  id: G,
  "aria-describedby": S,
  onFocus: m,
  onBlur: C,
  onKeyDown: b,
  ...h
}) {
  const O = ce(), L = ie(null), W = ie(null), [D, R] = J(), { appearance: B, accent: N } = Ge(d === "default" ? "outlined" : d, n, a), z = G ?? O, f = `${z}-options`, V = a ?? r, M = `${z}-${a ? "error" : "helper"}`, [ee, j] = J(String(y ?? T ?? "")), [U, Y] = J(!1), [E, q] = J(!1), [x, A] = J(0), K = y ?? ee, F = K.length > 0, Q = F || !h.placeholder, w = !!(l && F && B === "outlined"), ae = !!(w && D !== void 0), s = Le({ disabled: h.disabled, error: a, active: U, accent: N }), $ = E && K.trim() ? g.filter((P) => P.toLowerCase().includes(K.toLowerCase())) : [];
  ge(() => {
    if (!l || !F || B !== "outlined") return;
    const P = W.current?.offsetWidth;
    P && R(P);
  }, [B, F, l, h.required]);
  const _ = (P) => {
    j(P), q(!1), v(P);
  };
  return /* @__PURE__ */ k(
    "div",
    {
      className: u("relative w-full max-w-sm font-sans", e),
      onBlur: (P) => {
        P.currentTarget.contains(P.relatedTarget) || Y(!1);
      },
      children: [
        l && B === "standard" && F && Q && /* @__PURE__ */ t(
          de,
          {
            ref: W,
            htmlFor: z,
            required: h.required,
            className: u("absolute left-0 top-0 z-10 mb-0 pl-4", s),
            children: l
          }
        ),
        /* @__PURE__ */ k(
          "div",
          {
            className: u(
              Ne({
                variant: B,
                size: typeof p == "number" ? "normal" : p,
                disabled: h.disabled,
                iconLeft: !!i,
                iconRight: !!(o || U && K.trim()),
                notched: ae
              }),
              "group",
              w && "mt-2 bg-background-surface",
              l && F && B === "standard" && "mt-2",
              !h.disabled && Re[N]
            ),
            children: [
              ae && D !== void 0 && /* @__PURE__ */ t(ze, { width: D, accent: N, disabled: h.disabled }),
              l && !(B === "standard" && F && Q) && /* @__PURE__ */ t(
                de,
                {
                  ref: W,
                  htmlFor: z,
                  required: h.required,
                  className: u(
                    Oe({ appearance: B, floating: F, visible: Q, iconLeft: !!i, size: p }),
                    s
                  ),
                  children: l
                }
              ),
              i && /* @__PURE__ */ t(
                "span",
                {
                  "aria-hidden": "true",
                  className: u(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    te[B]
                  ),
                  children: i
                }
              ),
              /* @__PURE__ */ t(
                "input",
                {
                  ...h,
                  ref: L,
                  size: typeof p == "number" ? p : void 0,
                  id: z,
                  type: "text",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": $.length > 0,
                  "aria-controls": f,
                  "aria-activedescendant": $[x] ? `${f}-${x}` : void 0,
                  "aria-describedby": [S, V && M].filter(Boolean).join(" ") || void 0,
                  "aria-invalid": a ? !0 : h["aria-invalid"],
                  value: K,
                  className: u(
                    Me,
                    !F && te[B],
                    B === "filled" && F && l && "self-stretch py-0 pt-[18px]",
                    w && "relative z-20"
                  ),
                  onChange: (P) => {
                    j(P.target.value), q(!0), A(0), c?.(P);
                  },
                  onFocus: (P) => {
                    Y(!0), q(!0), m?.(P);
                  },
                  onBlur: (P) => {
                    q(!1), C?.(P);
                  },
                  onKeyDown: (P) => {
                    b?.(P), !P.defaultPrevented && (P.key === "Enter" && $.length && (P.preventDefault(), _($[x] ?? $[0])), P.key === "Escape" && q(!1), (P.key === "ArrowDown" || P.key === "ArrowUp") && (P.preventDefault(), q(!0), A(
                      (X) => Math.max(0, Math.min($.length - 1, X + (P.key === "ArrowDown" ? 1 : -1)))
                    )));
                  }
                }
              ),
              U && K.trim() ? /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  disabled: h.disabled,
                  "aria-label": "Clear input",
                  className: u(
                    "inline-flex size-5 items-center justify-center text-text-secondary [&_svg]:size-4",
                    te[B]
                  ),
                  onMouseDown: (P) => P.preventDefault(),
                  onClick: () => {
                    j(""), q(!1), v(""), L.current?.focus();
                  },
                  children: /* @__PURE__ */ t(Oa, { className: "size-4", "aria-hidden": "true" })
                }
              ) : o ? /* @__PURE__ */ t(
                "span",
                {
                  "aria-hidden": "true",
                  className: u(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    te[B]
                  ),
                  children: o
                }
              ) : null
            ]
          }
        ),
        $.length > 0 && /* @__PURE__ */ t("ul", { id: f, role: "listbox", className: u(ma, "relative"), children: $.map((P, X) => /* @__PURE__ */ t(
          "li",
          {
            id: `${f}-${X}`,
            role: "option",
            "aria-selected": x === X,
            className: u(
              "cursor-pointer px-4 py-2 hover:bg-action-hover",
              x === X && "bg-action-selected"
            ),
            onMouseDown: (Z) => Z.preventDefault(),
            onClick: () => _(P),
            children: P
          },
          P
        )) }),
        V && /* @__PURE__ */ t(
          "p",
          {
            id: M,
            role: a ? "alert" : void 0,
            "aria-live": "polite",
            className: a ? je : "mt-1 text-13 text-text-secondary",
            children: V
          }
        )
      ]
    }
  );
}
function Jr({
  className: e,
  label: a,
  iconLeft: r,
  iconRight: i,
  size: o = "md",
  width: l = "default",
  variant: d = "default",
  tone: n = "primary",
  outline: p = !1,
  shape: c = "rectangle",
  children: v,
  ...g
}) {
  const y = ue(d, n), T = p ? "outline" : $e[d];
  return /* @__PURE__ */ k(
    "button",
    {
      className: u(Cr({ size: o, width: l, shape: c }), re[y][T], e),
      "data-size": o,
      "data-variant": d,
      "data-tone": y,
      "data-width": l,
      "data-shape": c,
      "data-outline": p,
      ...g,
      children: [
        r && /* @__PURE__ */ t("span", { className: "inline-flex size-5 shrink-0 items-center justify-center", "aria-hidden": "true", children: r }),
        v ?? a,
        i && /* @__PURE__ */ t("span", { className: "inline-flex size-5 shrink-0 items-center justify-center", "aria-hidden": "true", children: i })
      ]
    }
  );
}
const ba = {
  default: "text-text-primary",
  muted: "text-text-secondary",
  ...fe((e) => e.text),
  inverse: "text-misc-bg-white"
}, Sr = {
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold"
}, Or = {
  h1: "text-46 leading-56",
  h2: "text-38 leading-42",
  h3: "text-28 leading-38",
  h4: "text-24 leading-28",
  h5: "text-18 leading-22",
  h6: "text-15 leading-20"
}, ha = {
  ...Sr,
  normal: "font-regular",
  semiBold: "font-semibold",
  light: "font-light",
  extraBold: "font-extrabold"
}, xa = {
  none: "normal-case",
  capitalize: "capitalize",
  uppercase: "uppercase",
  lowercase: "lowercase"
};
function Pa(e) {
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
function ka({
  level: e,
  variant: a = "default",
  weight: r = "bold",
  family: i,
  color: o,
  tone: l = "default",
  textTransform: d = "none",
  className: n,
  children: p,
  ...c
}) {
  const v = e ?? (a === "default" ? "h4" : a);
  return /* @__PURE__ */ t(
    v,
    {
      className: u(
        "m-0 font-sans",
        Or[v],
        ha[r],
        ba[o ? Pa(o) : l],
        xa[d],
        n
      ),
      ...c,
      children: p
    }
  );
}
const pe = (e) => e.id || e.src, Ie = (e, a) => e.alt.trim() || `Product image ${a + 1}`, me = "inline-flex size-8 shrink-0 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-45";
function Gr(e, a) {
  if (!Number.isInteger(e))
    throw new RangeError("Carousel initialIndex must be a finite integer.");
  return Math.min(Math.max(e, 0), Math.max(a - 1, 0));
}
function Yr({
  images: e,
  className: a,
  likeButton: r = !0,
  variant: i = "outline",
  tone: o = "primary",
  initialIndex: l = 0,
  onImageChange: d,
  showThumbnails: n = !0,
  thumbnailsPosition: p = "bottom",
  showIndicators: c = !0,
  ariaLabel: v = "Product image gallery",
  ofText: g = "of",
  breakpoint: y = "desktop",
  openOnClick: T = !0
}) {
  const G = ce(), [S, m] = J(() => Gr(l, e.length)), [C, b] = J(!1), [h, O] = J(0), [L, W] = J({}), D = ie(null), R = ie(null), B = ie(null), N = Math.min(S, Math.max(0, e.length - 1)), z = e[N], f = p === "bottom" ? 8 : 5, V = y === "mobile", M = V ? "10rem" : y === "tablet" ? "15rem" : "25rem", ee = i === "primary" || i === "secondary", j = ue(i, o), U = $e[i], Y = u(se[j], "focus-visible:outline-current"), E = ee ? u("bg-background-surface hover:bg-action-hover", Y) : re[j][U], q = ee ? "border border-border-subtle bg-background-surface text-text-primary" : re[j][U];
  if (ge(() => {
    m((s) => Math.min(s, Math.max(e.length - 1, 0))), O((s) => Math.min(s, Math.max(e.length - f, 0))), e.length || b(!1);
  }, [e.length, f]), ge(() => {
    if (!C) return;
    const s = R.current;
    D.current?.focus();
    const $ = (_) => {
      if (_.key === "Escape" && b(!1), _.key === "Tab" && B.current) {
        const P = B.current.querySelectorAll('button:not(:disabled), [tabindex="0"]'), X = P[0], Z = P[P.length - 1];
        _.shiftKey && document.activeElement === X ? (_.preventDefault(), Z?.focus()) : !_.shiftKey && document.activeElement === Z && (_.preventDefault(), X?.focus());
      }
    };
    return document.addEventListener("keydown", $), () => {
      document.removeEventListener("keydown", $), s?.focus();
    };
  }, [C]), !z)
    return /* @__PURE__ */ t(
      "div",
      {
        className: u("rounded-md px-4 py-6 text-center font-sans text-13", q, a),
        "data-variant": i,
        "data-tone": j,
        children: "No product images available."
      }
    );
  const x = (s) => O(($) => s < $ ? s : s >= $ + f ? s - f + 1 : $), A = (s) => {
    const $ = (s + e.length) % e.length;
    m($), x($), d?.($, e[$]);
  }, K = (s) => {
    R.current = s, x(N), b(!0);
  }, F = u(
    "min-w-0",
    n && p !== "bottom" && !V && (p === "left" ? "grid grid-cols-[var(--carousel-thumb-size)_minmax(0,1fr)] gap-4" : "grid grid-cols-[minmax(0,1fr)_var(--carousel-thumb-size)] gap-4")
  ), Q = p === "bottom" ? { gridTemplateColumns: `repeat(${Math.min(f, e.length)}, var(--carousel-thumb-size))` } : { gridTemplateRows: `repeat(${Math.min(f, e.length)}, var(--carousel-thumb-size))` }, w = (s, $ = !1) => {
    if (!n || V || p !== s) return null;
    const _ = $ ? h : 0, P = e.length - f + 1, X = /* @__PURE__ */ t(
      "div",
      {
        className: u("grid gap-2.5 overflow-hidden p-1", s === "bottom" ? "justify-center" : "content-start"),
        style: Q,
        children: e.slice(_, _ + f).map((Z, Ue) => {
          const he = _ + Ue, xe = !$ && T && e.length > f && Ue === f - 1;
          return /* @__PURE__ */ k(
            "button",
            {
              type: "button",
              className: u(
                "relative aspect-square w-full overflow-hidden rounded-md border border-border-subtle bg-background-surface p-0 leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                Y,
                !xe && N === he && "border-current ring-2 ring-current ring-offset-2 ring-offset-background-surface"
              ),
              "aria-label": xe ? `Open image gallery (${P} more)` : `Select ${Ie(Z, he)}`,
              "aria-current": !xe && N === he ? "true" : void 0,
              onClick: (Ta) => {
                xe ? K(Ta.currentTarget) : A(he);
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
                xe && /* @__PURE__ */ t("span", { className: "absolute inset-0 flex items-center justify-center bg-backdrop-overlay", children: /* @__PURE__ */ k("span", { className: "rounded-md bg-background-surface px-2 py-1 text-13 font-semibold text-text-primary", children: [
                  "+",
                  P
                ] }) })
              ]
            },
            `${pe(Z)}-${he}`
          );
        })
      }
    );
    return $ ? /* @__PURE__ */ k(
      "div",
      {
        className: u(
          "grid items-center gap-2.5",
          s === "bottom" ? "grid-cols-[auto_minmax(0,1fr)_auto]" : "content-start"
        ),
        children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: u(me, E, "justify-self-center"),
              "aria-label": "Previous thumbnails",
              disabled: h <= 0,
              onClick: () => O((Z) => Math.max(0, Z - 1)),
              children: s === "bottom" ? /* @__PURE__ */ t(qe, { className: "size-4" }) : /* @__PURE__ */ t(na, { className: "size-4" })
            }
          ),
          X,
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: u(me, E, "justify-self-center"),
              "aria-label": "Next thumbnails",
              disabled: h + f >= e.length,
              onClick: () => O((Z) => Math.min(e.length - f, Z + 1)),
              children: s === "bottom" ? /* @__PURE__ */ t(He, { className: "size-4" }) : /* @__PURE__ */ t(Fe, { className: "size-4" })
            }
          )
        ]
      }
    ) : X;
  }, ae = (s = !1) => /* @__PURE__ */ k(
    "div",
    {
      className: "relative flex w-full min-w-0 items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-background-surface",
      style: { height: M },
      children: [
        z.badge && /* @__PURE__ */ t(
          "span",
          {
            className: u(
              "absolute left-4 top-4 z-10 rounded-md px-2 py-1 text-12 font-semibold text-misc-bg-white",
              re[j].solid
            ),
            children: z.badge
          }
        ),
        r && z.likeButton !== !1 && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: u(
              me,
              L[pe(z)] ? re.error.label : E,
              "absolute right-4 top-4 z-10 rounded-full"
            ),
            "aria-label": L[pe(z)] ? "Remove from favorites" : "Add to favorites",
            "aria-pressed": !!L[pe(z)],
            onClick: () => W(($) => ({ ...$, [pe(z)]: !$[pe(z)] })),
            children: /* @__PURE__ */ t(Ga, { className: "size-6", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ t(
          "img",
          {
            src: z.src,
            alt: Ie(z, N),
            className: u("block size-full object-cover", !s && T && "cursor-zoom-in"),
            ...!s && T ? {
              role: "button",
              "aria-label": `Open image gallery: ${Ie(z, N)}`,
              tabIndex: 0,
              onClick: ($) => K($.currentTarget),
              onKeyDown: ($) => {
                ($.key === "Enter" || $.key === " ") && ($.preventDefault(), K($.currentTarget));
              }
            } : {}
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "aria-label": "Previous image",
            className: u(me, E, "absolute left-4 top-1/2 -translate-y-1/2"),
            onClick: () => A(N - 1),
            children: /* @__PURE__ */ t(qe, { className: "size-4", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "aria-label": "Next image",
            className: u(me, E, "absolute right-4 top-1/2 -translate-y-1/2"),
            onClick: () => A(N + 1),
            children: /* @__PURE__ */ t(He, { className: "size-4", "aria-hidden": "true" })
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ k(
    "section",
    {
      "aria-label": v,
      className: u("grid w-full min-w-0 gap-4 rounded-md p-6 font-sans", q, a),
      "data-variant": i,
      "data-tone": j,
      style: {
        "--carousel-thumb-size": V ? "3.25rem" : y === "tablet" ? "3.75rem" : "4.5rem"
      },
      children: [
        /* @__PURE__ */ k("div", { className: F, children: [
          w("left"),
          ae(),
          w("right")
        ] }),
        !V && (c || n && p === "bottom") && /* @__PURE__ */ k("div", { className: "grid gap-2 rounded-md border border-border-subtle p-4", children: [
          c && /* @__PURE__ */ t("div", { className: "flex items-center justify-center gap-2", children: e.map((s, $) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "aria-label": `Go to image ${$ + 1}`,
              "aria-current": N === $ ? "true" : void 0,
              className: u(
                "size-2.5 rounded-full border border-border-subtle p-0",
                N === $ ? re[j].solid : "bg-background-surface"
              ),
              onClick: () => A($)
            },
            `${pe(s)}-${$}`
          )) }),
          w("bottom")
        ] }),
        C && /* @__PURE__ */ t(
          "div",
          {
            role: "presentation",
            className: "fixed inset-0 z-[1000] grid place-items-center bg-backdrop-overlay p-4",
            onClick: () => b(!1),
            children: /* @__PURE__ */ k(
              "div",
              {
                ref: B,
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": G,
                tabIndex: -1,
                onClick: (s) => s.stopPropagation(),
                className: u(
                  "grid max-h-[90dvh] w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-md border border-border-subtle bg-background-surface",
                  y === "tablet" ? "max-w-3xl" : V ? "max-h-dvh" : "max-w-5xl"
                ),
                children: [
                  /* @__PURE__ */ k("div", { className: "flex items-center justify-between gap-4 border-b border-border-subtle p-4", children: [
                    /* @__PURE__ */ t(
                      ka,
                      {
                        id: G,
                        level: "h4",
                        weight: "medium",
                        children: `Image gallery: ${N + 1} ${g} ${e.length}`
                      }
                    ),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        ref: D,
                        type: "button",
                        "aria-label": "Close image gallery",
                        className: u(me, E),
                        onClick: () => b(!1),
                        children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "✕" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ k("div", { className: u("grid gap-4 overflow-auto p-4", V && "gap-2 p-2"), children: [
                    /* @__PURE__ */ k("div", { className: F, children: [
                      w("left", !0),
                      ae(!0),
                      w("right", !0)
                    ] }),
                    w("bottom", !0)
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
function Zr({
  className: e,
  inputClassName: a,
  label: r,
  helperText: i,
  error: o,
  variant: l = "outlined",
  tone: d = "primary",
  size: n = "normal",
  iconLeft: p,
  iconRight: c,
  outsideIconLeft: v,
  outsideIconRight: g,
  handleActions: y,
  id: T,
  type: G = "text",
  "aria-describedby": S,
  onFocus: m,
  onBlur: C,
  onChange: b,
  value: h,
  defaultValue: O,
  disabled: L,
  required: W,
  ...D
}) {
  const R = ce(), B = T ?? R, [N, z] = J(!1), [f, V] = J(O ?? ""), M = ie(null), [ee, j] = J(), U = String(h ?? f).length > 0, Y = U || !D.placeholder, { appearance: E, accent: q } = Ge(l, d, o), x = !!(r && U && E === "outlined"), A = !!(r && U && E === "outlined" && ee !== void 0), K = Le({ disabled: L, error: o, active: N, accent: q }), F = o ?? i, Q = `${B}-${o ? "error" : "helper"}`, w = [S, F ? Q : void 0].filter(Boolean).join(" ") || void 0;
  ge(() => {
    if (!r || !U || E !== "outlined") return;
    const s = M.current?.offsetWidth;
    s && j(s);
  }, [E, U, r, W]);
  const ae = (s) => y ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      disabled: L,
      onClick: y,
      className: u(
        "inline-flex min-w-[26px] items-center justify-center self-stretch disabled:opacity-45 [&_svg]:size-[26px]",
        se[q]
      ),
      "aria-label": `${r ?? "Input"} action`,
      children: s
    }
  ) : /* @__PURE__ */ t(
    "span",
    {
      "aria-hidden": "true",
      className: u(
        "inline-flex min-w-[26px] items-center justify-center self-stretch [&_svg]:size-[26px]",
        se[q]
      ),
      children: s
    }
  );
  return /* @__PURE__ */ k("div", { className: u("w-full max-w-sm font-sans", e), children: [
    /* @__PURE__ */ k("div", { className: "flex items-stretch gap-2", children: [
      v && ae(v),
      /* @__PURE__ */ k("div", { className: "relative min-w-0 flex-1", children: [
        r && E === "standard" && U && Y && /* @__PURE__ */ t(
          de,
          {
            ref: M,
            htmlFor: B,
            required: W,
            className: u("absolute left-0 top-0 z-10 mb-0 pl-4", K),
            children: r
          }
        ),
        /* @__PURE__ */ k(
          "div",
          {
            className: u(
              Ne({
                variant: E,
                size: n,
                disabled: L,
                iconLeft: !!p,
                iconRight: !!c,
                notched: A
              }),
              "group",
              x && "mt-2 bg-background-surface",
              r && U && E === "standard" && "mt-2",
              !L && Re[q]
            ),
            children: [
              A && ee !== void 0 && /* @__PURE__ */ t(ze, { width: ee, accent: q, disabled: L }),
              r && !(E === "standard" && U && Y) && /* @__PURE__ */ t(
                de,
                {
                  ref: M,
                  htmlFor: B,
                  required: W,
                  className: u(
                    Oe({ appearance: E, floating: U, visible: Y, iconLeft: !!p, size: n }),
                    K
                  ),
                  children: r
                }
              ),
              p && /* @__PURE__ */ t(
                "span",
                {
                  "aria-hidden": "true",
                  className: u(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    te[E]
                  ),
                  children: p
                }
              ),
              /* @__PURE__ */ t(
                "input",
                {
                  ...D,
                  id: B,
                  type: G,
                  disabled: L,
                  required: W,
                  value: h,
                  defaultValue: O,
                  "aria-describedby": w,
                  "aria-invalid": o ? !0 : D["aria-invalid"],
                  className: u(
                    Me,
                    !U && te[E],
                    E === "filled" && U && r && "self-stretch py-0 pt-[18px]",
                    x && "relative z-20",
                    a
                  ),
                  onFocus: (s) => {
                    z(!0), m?.(s);
                  },
                  onBlur: (s) => {
                    z(!1), C?.(s);
                  },
                  onChange: (s) => {
                    V(s.target.value), b?.(s);
                  }
                }
              ),
              c && /* @__PURE__ */ t(
                "span",
                {
                  "aria-hidden": "true",
                  className: u(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    te[E]
                  ),
                  children: c
                }
              )
            ]
          }
        )
      ] }),
      g && ae(g)
    ] }),
    F && /* @__PURE__ */ t(
      "p",
      {
        id: Q,
        role: o ? "alert" : void 0,
        "aria-live": "polite",
        className: u(o ? je : "mt-1 text-13 text-text-secondary"),
        children: F
      }
    )
  ] });
}
function Qr({
  className: e,
  label: a,
  helperText: r,
  error: i,
  variant: o = "outlined",
  tone: l = "primary",
  size: d = "normal",
  id: n,
  "aria-describedby": p,
  ...c
}) {
  const v = ce(), { appearance: g, accent: y } = Ge(o, l, i), T = n ?? v, G = i ?? r, S = `${T}-${i ? "error" : "helper"}`, m = ie(null), [C, b] = J(), [h, O] = J(!1), [L, W] = J(String(c.defaultValue ?? "")), D = String(c.value ?? L).length > 0, R = D || !c.placeholder, B = !!(a && D && g === "outlined"), N = !!(B && C !== void 0), z = Le({ disabled: c.disabled, error: i, active: h, accent: y });
  return ge(() => {
    if (!a || !D || g !== "outlined") return;
    const f = m.current?.offsetWidth;
    f && b(f);
  }, [g, D, a, c.required]), /* @__PURE__ */ k("div", { className: u("relative w-full max-w-sm font-sans", e), children: [
    a && g === "standard" && D && R && /* @__PURE__ */ t(
      de,
      {
        ref: m,
        htmlFor: T,
        required: c.required,
        className: u("absolute left-0 top-0 z-10 mb-0 pl-4", z),
        children: a
      }
    ),
    /* @__PURE__ */ k(
      "div",
      {
        className: u(
          Ne({ variant: g, size: d, disabled: c.disabled, notched: N }),
          "items-start",
          B && "group mt-2 bg-background-surface",
          a && D && g === "standard" && "mt-2",
          !c.disabled && Re[y]
        ),
        children: [
          N && C !== void 0 && /* @__PURE__ */ t(ze, { width: C, accent: y, disabled: c.disabled }),
          a && !(g === "standard" && D && R) && /* @__PURE__ */ t(
            de,
            {
              ref: m,
              htmlFor: T,
              required: c.required,
              className: u(
                Oe({ appearance: g, floating: D, visible: R, multiline: !0 }),
                z
              ),
              children: a
            }
          ),
          /* @__PURE__ */ t(
            "textarea",
            {
              ...c,
              id: T,
              value: c.value,
              defaultValue: c.defaultValue,
              "aria-invalid": i ? !0 : c["aria-invalid"],
              "aria-describedby": [p, G && S].filter(Boolean).join(" ") || void 0,
              className: u(
                Me,
                "min-h-12 resize-y",
                D && g === "filled" && a && "pt-5 pb-[3px] focus:pb-[2px]",
                D && g !== "filled" && a && "pt-4",
                D && g === "standard" && a && "pb-[7px] focus:pb-[6px]",
                B && "relative z-20 mt-3 pt-1"
              ),
              onFocus: (f) => {
                O(!0), c.onFocus?.(f);
              },
              onBlur: (f) => {
                O(!1), c.onBlur?.(f);
              },
              onChange: (f) => {
                W(f.target.value), c.onChange?.(f);
              }
            }
          )
        ]
      }
    ),
    G && /* @__PURE__ */ t(
      "p",
      {
        id: S,
        role: i ? "alert" : void 0,
        "aria-live": "polite",
        className: i ? je : "mt-1 text-13 text-text-secondary",
        children: G
      }
    )
  ] });
}
const ia = fe((e) => e.outline);
function ei({
  className: e,
  label: a,
  placeholder: r,
  helperText: i,
  error: o,
  variant: l = "default",
  tone: d = "primary",
  size: n = "normal",
  iconLeft: p,
  showSelectionCheck: c = !1,
  id: v,
  children: g,
  defaultValue: y,
  value: T,
  onChange: G,
  "aria-describedby": S,
  ...m
}) {
  const C = ce(), { appearance: b, accent: h } = Ge(l === "default" ? "outlined" : l, d, o), O = v ?? C, L = ie(null), W = ie(null), D = oa.toArray(g).filter(la), [R, B] = J(String(y ?? D[0]?.props.value ?? "")), [N, z] = J(!1), f = String(T ?? R), V = D.find((w) => String(w.props.value ?? "") === f), M = f.length > 0 || !r && !!V?.props.children, ee = M || !r, j = !!(a && M && b === "outlined"), U = !!j, Y = o ?? i, E = `${O}-${o ? "error" : "helper"}`, q = [S, Y && E].filter(Boolean).join(" ") || void 0, [x, A] = J(), K = ie(null), F = Le({ disabled: m.disabled, error: o, active: N, accent: h });
  ge(() => {
    if (!a || !M || b !== "outlined") return;
    const w = K.current?.offsetWidth;
    w && A(w);
  }, [b, M, a, m.required]);
  const Q = (w) => {
    B(w), z(!1), L.current && (L.current.value = w, L.current.dispatchEvent(new Event("change", { bubbles: !0 }))), W.current?.focus();
  };
  return /* @__PURE__ */ k(
    "div",
    {
      className: u("relative w-full max-w-sm font-sans", e),
      onBlur: (w) => {
        w.currentTarget.contains(w.relatedTarget) || z(!1);
      },
      children: [
        a && b === "standard" && M && ee && /* @__PURE__ */ t(
          de,
          {
            ref: K,
            id: `${O}-label`,
            htmlFor: O,
            required: m.required,
            className: u("absolute left-0 top-0 z-10 mb-0 pl-4", F),
            children: a
          }
        ),
        /* @__PURE__ */ t(
          "select",
          {
            ...m,
            size: typeof n == "number" ? n : void 0,
            id: O,
            ref: L,
            className: "sr-only",
            tabIndex: -1,
            value: f,
            "aria-describedby": q,
            "aria-invalid": o ? !0 : m["aria-invalid"],
            onChange: (w) => {
              B(w.target.value), G?.(w);
            },
            children: g
          }
        ),
        /* @__PURE__ */ k(
          "button",
          {
            ref: W,
            type: "button",
            disabled: m.disabled,
            "aria-labelledby": a ? `${O}-label` : void 0,
            "aria-label": a ? void 0 : m["aria-label"] ?? r ?? "Select an option",
            "aria-describedby": q,
            "aria-haspopup": "listbox",
            "aria-expanded": N,
            "aria-controls": N ? `${O}-options` : void 0,
            "aria-invalid": o ? !0 : void 0,
            className: u(
              Ne({
                variant: b,
                size: typeof n == "number" ? "normal" : n,
                disabled: m.disabled,
                iconLeft: !!p,
                iconRight: !0,
                notched: U
              }),
              "group text-left",
              j && "group mt-2 bg-background-surface",
              a && M && b === "standard" && "mt-2",
              !m.disabled && ia[h]
            ),
            onClick: () => z((w) => !w),
            onKeyDown: (w) => {
              w.key === "Escape" && z(!1), w.key === "ArrowDown" && (w.preventDefault(), z(!0));
            },
            onBlur: (w) => {
              w.currentTarget.parentElement?.contains(w.relatedTarget) || z(!1);
            },
            children: [
              U && x !== void 0 && /* @__PURE__ */ t(
                ze,
                {
                  width: x,
                  accent: h,
                  disabled: m.disabled,
                  borderClass: ia[h]
                }
              ),
              a && !(b === "standard" && M && ee) && /* @__PURE__ */ t(
                de,
                {
                  ref: K,
                  id: `${O}-label`,
                  htmlFor: O,
                  required: m.required,
                  className: u(
                    Oe({ appearance: b, floating: M, visible: ee, iconLeft: !!p, size: n }),
                    F
                  ),
                  children: a
                }
              ),
              p && /* @__PURE__ */ t(
                "span",
                {
                  className: u(
                    "inline-flex size-5 shrink-0 items-center justify-center [&_svg]:size-5",
                    te[b]
                  ),
                  "aria-hidden": "true",
                  children: p
                }
              ),
              /* @__PURE__ */ t(
                "span",
                {
                  className: u(
                    "flex flex-1 items-center py-2 leading-5",
                    !M && te[b],
                    b === "filled" && M && a && "self-stretch py-0 pt-[18px]",
                    j && "relative z-20"
                  ),
                  children: V?.props.children ?? r ?? "Select an option"
                }
              ),
              /* @__PURE__ */ t(
                "span",
                {
                  className: u(
                    "inline-flex size-5 shrink-0 items-center justify-center",
                    te[b]
                  ),
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ t(Fe, { className: "size-4" })
                }
              )
            ]
          }
        ),
        N && /* @__PURE__ */ t("ul", { id: `${O}-options`, role: "listbox", "aria-label": a ?? "Options", className: ma, children: D.map((w) => {
          const ae = String(w.props.value ?? ""), s = ae !== "" && ae === f;
          return /* @__PURE__ */ k(
            "li",
            {
              role: "option",
              "aria-selected": s,
              "aria-disabled": w.props.disabled,
              tabIndex: w.props.disabled ? void 0 : 0,
              className: u(
                "flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-action-hover focus:bg-action-hover focus:outline-none",
                s && "bg-action-selected",
                w.props.disabled && "cursor-not-allowed text-text-secondary"
              ),
              onMouseDown: ($) => $.preventDefault(),
              onClick: () => {
                w.props.disabled || Q(ae);
              },
              onKeyDown: ($) => {
                !w.props.disabled && ($.key === "Enter" || $.key === " ") && ($.preventDefault(), Q(ae)), $.key === "Escape" && (z(!1), W.current?.focus());
              },
              children: [
                w.props.children,
                c && s && /* @__PURE__ */ t(La, { className: u("size-4", se[h]), "aria-hidden": "true" })
              ]
            },
            ae
          );
        }) }),
        Y && /* @__PURE__ */ t(
          "p",
          {
            id: E,
            role: o ? "alert" : void 0,
            "aria-live": "polite",
            className: o ? u("mt-1 font-sans text-13", se.error) : "mt-1 text-13 text-text-secondary",
            children: Y
          }
        )
      ]
    }
  );
}
const Lr = (e) => [e, ...fa.filter((a) => a !== e)].map((a) => Te(a, "graphic"));
function Nr({
  x: e,
  y: a,
  children: r,
  horizontalOffset: i,
  verticalOffset: o,
  style: l
}) {
  const d = ie(null), [n, p] = J({ width: 1, height: 1 });
  return Sa(() => {
    const c = d.current;
    if (!c) return;
    const v = (y, T) => {
      y = Math.ceil(y), T = Math.ceil(T), p((G) => G.width === y && G.height === T ? G : { width: y, height: T });
    };
    v(c.offsetWidth, c.offsetHeight);
    const g = new ResizeObserver(([y]) => {
      v(y.contentRect.width + 2, y.contentRect.height + 2);
    });
    return g.observe(c), () => g.disconnect();
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
const ai = ({
  type: e = "line",
  tone: a = "primary",
  data: r,
  series: i,
  colors: o,
  gridColor: l,
  textColor: d,
  tooltipBgColor: n,
  tooltipBorderColor: p,
  xAxisKey: c = "name",
  title: v,
  description: g,
  ariaLabel: y,
  height: T = 300,
  strokeWidth: G = 2,
  dot: S = { r: 4 },
  activeDot: m = { r: 6 },
  fillOpacity: C = 0.2,
  barRadius: b = [4, 4, 0, 0],
  outerRadius: h = 80,
  innerRadius: O,
  showGrid: L = !0,
  showTooltip: W = !0,
  showLegend: D = !0,
  isAnimationActive: R = !0,
  className: B
}) => {
  const N = ce(), z = `${N}-title`, f = `${N}-desc`, V = Ke(() => o && o.length > 0 ? o : Lr(a), [o, a]), M = _e(
    (s, $) => s.color || V[$ % V.length],
    [V]
  ), { gridColor: ee, textColor: j, customTooltipStyle: U, tooltipItemStyle: Y, tooltipLabelStyle: E, axisTickStyle: q, legendStyle: x } = Ke(() => {
    const s = l || "var(--border-subtle)", $ = d || "var(--text-primary)", _ = n || "var(--background-surface)", P = p || "var(--border-subtle)", X = "var(--font-family)", Z = "var(--font-size-13)";
    return {
      gridColor: s,
      textColor: $,
      customTooltipStyle: {
        backgroundColor: _,
        borderColor: P,
        borderRadius: "var(--radius-md)",
        color: $,
        fontSize: Z,
        fontFamily: X
      },
      tooltipItemStyle: {
        color: $,
        fontSize: Z,
        fontFamily: X
      },
      tooltipLabelStyle: {
        color: Te(a, "text"),
        fontSize: Z,
        fontFamily: X,
        fontWeight: 600
      },
      axisTickStyle: {
        fill: $,
        fontSize: Z,
        fontFamily: X
      },
      legendStyle: {
        color: $,
        fontSize: Z,
        fontFamily: X
      }
    };
  }, [l, d, n, p, a]), A = _e(
    (s) => /* @__PURE__ */ t("span", { style: { color: j, backgroundColor: "var(--background-surface)" }, children: s }),
    [j]
  ), K = (s, $, _, P, X) => /* @__PURE__ */ t(
    Nr,
    {
      x: s,
      y: $,
      horizontalOffset: P,
      verticalOffset: X,
      style: {
        color: j,
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
  ), F = ({ x: s, y: $, payload: _ }, P) => K(s, $, _.value, P === "x" ? 0.5 : 1, P === "x" ? 0 : 0.5), Q = ({ x: s, y: $, value: _, textAnchor: P }) => K(s, $, _, P === "start" ? 0 : 1, 0.5), w = () => [
    L ? /* @__PURE__ */ t(Ma, { strokeDasharray: "3 3", stroke: ee }, "grid") : null,
    /* @__PURE__ */ t(ja, { dataKey: c, stroke: j, tick: (s) => F(s, "x") }, "xaxis"),
    /* @__PURE__ */ t(Va, { stroke: j, tick: (s) => F(s, "y") }, "yaxis"),
    W ? /* @__PURE__ */ t(
      Xe,
      {
        isAnimationActive: R,
        contentStyle: U,
        itemStyle: Y,
        labelStyle: E
      },
      "tooltip"
    ) : null,
    D ? /* @__PURE__ */ t(Je, { wrapperStyle: x, formatter: A }, "legend") : null
  ], ae = () => {
    switch (e) {
      case "pie": {
        const $ = i[0]?.dataKey || "value", _ = c || "name", P = r.map((X, Z) => ({
          ...X,
          fill: X.fill || X.color || i[Z]?.color || V[Z % V.length]
        }));
        return /* @__PURE__ */ k(Wa, { children: [
          W && /* @__PURE__ */ t(
            Xe,
            {
              isAnimationActive: R,
              contentStyle: U,
              itemStyle: Y,
              labelStyle: E
            }
          ),
          D && /* @__PURE__ */ t(Je, { wrapperStyle: x, formatter: A }),
          /* @__PURE__ */ t(
            Ra,
            {
              isAnimationActive: R,
              data: P,
              dataKey: $,
              nameKey: _,
              cx: "50%",
              cy: "50%",
              innerRadius: O,
              outerRadius: h,
              label: Q
            }
          )
        ] });
      }
      case "bar":
        return /* @__PURE__ */ k(Ea, { data: r, children: [
          w(),
          i.map((s, $) => /* @__PURE__ */ t(
            Fa,
            {
              isAnimationActive: R,
              dataKey: s.dataKey,
              name: s.name || s.dataKey,
              fill: M(s, $),
              radius: s.radius ?? b
            },
            s.dataKey
          ))
        ] });
      case "area":
        return /* @__PURE__ */ k(Ia, { data: r, children: [
          w(),
          i.map((s, $) => {
            const _ = M(s, $);
            return /* @__PURE__ */ t(
              Aa,
              {
                isAnimationActive: R,
                type: "monotone",
                dataKey: s.dataKey,
                name: s.name || s.dataKey,
                stroke: _,
                strokeWidth: s.strokeWidth ?? G,
                fill: _,
                fillOpacity: s.fillOpacity ?? C
              },
              s.dataKey
            );
          })
        ] });
      default:
        return /* @__PURE__ */ k(za, { data: r, children: [
          w(),
          i.map((s, $) => /* @__PURE__ */ t(
            Ba,
            {
              isAnimationActive: R,
              type: "monotone",
              dataKey: s.dataKey,
              name: s.name || s.dataKey,
              stroke: M(s, $),
              strokeWidth: s.strokeWidth ?? G,
              dot: s.dot ?? S,
              activeDot: s.activeDot ?? m
            },
            s.dataKey
          ))
        ] });
    }
  };
  return /* @__PURE__ */ k(
    "div",
    {
      className: u(
        "w-full rounded-md border border-border-subtle bg-background-surface p-6 font-sans text-text-primary",
        B
      ),
      "data-tone": a,
      role: "region",
      "aria-label": v ? void 0 : y || "Chart",
      "aria-labelledby": v ? z : void 0,
      "aria-describedby": g ? f : void 0,
      children: [
        (v || g) && /* @__PURE__ */ k("div", { className: "mb-4", children: [
          v && /* @__PURE__ */ t(ka, { id: z, level: "h3", weight: "semiBold", children: v }),
          g && /* @__PURE__ */ t("p", { className: "mt-1 text-13 text-text-secondary", id: f, children: g })
        ] }),
        /* @__PURE__ */ t("div", { className: "sr-only", children: /* @__PURE__ */ k("table", { "aria-label": v ? `${v} data` : y || "Chart data", children: [
          /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ k("tr", { children: [
            /* @__PURE__ */ t("th", { scope: "col", children: c }),
            i.map((s) => /* @__PURE__ */ t("th", { scope: "col", children: s.name || s.dataKey }, s.dataKey))
          ] }) }),
          /* @__PURE__ */ t("tbody", { children: r.map((s, $) => /* @__PURE__ */ k("tr", { children: [
            /* @__PURE__ */ t("td", { children: String(s[c] ?? "") }),
            i.map((_) => /* @__PURE__ */ t("td", { children: String(s[_.dataKey] ?? "") }, _.dataKey))
          ] }, $)) })
        ] }) }),
        /* @__PURE__ */ t(
          "div",
          {
            className: "min-h-48 w-full rounded-md bg-background-surface text-text-primary",
            style: { height: T },
            ...ya(!1, `${v || y || "Chart"} visualization`),
            children: /* @__PURE__ */ t(Na, { width: "100%", height: "100%", children: ae() })
          }
        )
      ]
    }
  );
}, zr = {
  xs: "text-12 leading-14",
  sm: "text-13 leading-18",
  md: "text-15 leading-20",
  lg: "text-18 leading-22",
  xl: "text-24 leading-28"
}, ta = {
  subtitle1: { size: "lg", weight: "medium" },
  subtitle2: { size: "md", weight: "medium" },
  body1: { size: "md", weight: "regular" },
  body2: { size: "sm", weight: "regular" },
  caption: { size: "xs", weight: "regular" },
  overline: { size: "xs", weight: "medium" }
};
function ri({
  size: e,
  variant: a = "body1",
  weight: r,
  family: i,
  color: o,
  tone: l = "default",
  textTransform: d = "none",
  className: n,
  children: p,
  ...c
}) {
  const v = o ? Pa(o === "text" ? "default" : o) : l;
  return /* @__PURE__ */ t(
    "p",
    {
      className: u(
        "m-0 font-sans",
        zr[e ?? ta[a].size],
        ha[r ?? ta[a].weight],
        ba[v],
        xa[d],
        a === "overline" && "uppercase tracking-wider",
        n
      ),
      ...c,
      children: p
    }
  );
}
function Br({ pagination: e, size: a, tone: r, ariaLabel: i }) {
  const { onPageChange: o, previousIcon: l, nextIcon: d, pageStatus: n } = e, p = Math.max(1, Math.ceil(Math.max(0, e.total) / Math.max(1, e.pageSize))), c = Math.min(Math.max(e.page, 1), p), v = u(
    "inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-13 font-semibold disabled:cursor-not-allowed disabled:opacity-45",
    se[r],
    "hover:enabled:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
  );
  return /* @__PURE__ */ k(
    "nav",
    {
      "aria-label": i,
      className: u(
        "flex items-center justify-end gap-2 border-t border-table-divider",
        a === "small" ? "px-4 py-3" : "px-4 py-4"
      ),
      children: [
        /* @__PURE__ */ k("button", { type: "button", onClick: () => o(c - 1), disabled: c <= 1, className: v, children: [
          l && /* @__PURE__ */ t("span", { className: "inline-flex size-4", "aria-hidden": "true", children: l }),
          /* @__PURE__ */ t("span", { children: "Previous" })
        ] }),
        n != null && /* @__PURE__ */ t("span", { "aria-live": "polite", className: "text-13 text-text-secondary", children: n }),
        /* @__PURE__ */ k(
          "button",
          {
            type: "button",
            onClick: () => o(c + 1),
            disabled: c >= p,
            className: v,
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
const Ir = { left: "text-left", center: "text-center", right: "text-right" }, Ar = {
  solid: "rounded-md",
  label: "rounded-md",
  outline: "rounded-md border",
  text: "rounded-md"
}, Er = fe((e) => e.outline);
function Ae(e) {
  return {
    backgroundColor: `var(--table-cell-overlay, ${e})`
  };
}
function Fr(e) {
  return e ? la(e) && typeof e.props.onClick == "function" ? e : /* @__PURE__ */ t("span", { className: "inline-flex size-4 shrink-0 items-center justify-center", "aria-hidden": "true", children: e }) : null;
}
function ii({
  className: e,
  columns: a,
  data: r,
  getRowKey: i,
  pagination: o,
  emptyMessage: l = "No results found.",
  variant: d = "outline",
  tone: n = "primary",
  size: p = "default",
  stickyFirstColumn: c = !1,
  stickyLastColumn: v = !1,
  stickyHeader: g = !1,
  showColumnBorders: y = !1,
  striped: T = !1,
  breakpoint: G,
  ...S
}) {
  const m = ce().replace(/:/g, ""), [C, b] = J(!1), [h, O] = J(!1), L = S["aria-label"] ?? "Data table", W = ue(d, n), D = a.some((x) => x.header != null && x.header !== ""), R = D ? $e[d] : "label", B = re[W][R], N = G !== "mobile", z = "bg-background-surface", f = (x) => N && c && x === 0, V = (x) => N && v && x === a.length - 1, M = (x) => f(x) || V(x), ee = {
    label: Te(W, "surface"),
    solid: Te(W),
    outline: "var(--background-surface)",
    text: "var(--background-surface)"
  }, j = Ae(ee[R]), U = Ae("var(--background-surface)"), Y = Ae("var(--action-hover-surface)"), E = (x, A, K = 0) => {
    if (!M(x) && !(A && g)) return;
    const F = [
      f(x) && (D || h) && "6px 0 6px -6px var(--action-focus)",
      V(x) && "-6px 0 6px -6px var(--action-focus)"
    ].filter(Boolean);
    return {
      ...A ? j : T && K % 2 === 1 ? Y : U,
      boxShadow: F.length ? F.join(", ") : void 0
    };
  }, q = (x, A) => u(
    "border-table-divider",
    p === "small" ? "px-4 py-3 text-13" : "px-4 py-4 text-[0.875rem] leading-[1.43]",
    Ir[x.align ?? "left"],
    y && A > 0 && !(N && c && A === 1) && !(N && v && A === a.length - 1) && "border-l",
    f(A) && "sticky left-0 z-10",
    !D && f(A) && !h && "border-r border-table-divider",
    V(A) && "sticky right-0 z-10"
  );
  return /* @__PURE__ */ k(
    "div",
    {
      className: u(
        "w-full rounded-lg border border-table-divider bg-background-surface p-4 font-sans shadow-sm",
        e
      ),
      "data-variant": D ? d : "label",
      "data-tone": W,
      "data-size": p,
      children: [
        /* @__PURE__ */ t("div", { className: "relative isolate", children: /* @__PURE__ */ t(
          "div",
          {
            tabIndex: 0,
            role: "region",
            "aria-label": `Scrollable ${L} ${m}`,
            onScroll: (x) => {
              b(x.currentTarget.scrollTop > 0), O(x.currentTarget.scrollLeft > 0);
            },
            className: u(
              "overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-current",
              g && "max-h-80 overflow-auto",
              Ar[R],
              Er[W]
            ),
            children: /* @__PURE__ */ k(
              "table",
              {
                ...S,
                "aria-label": L,
                className: u("w-max min-w-full border-separate border-spacing-0 text-text-primary", z),
                children: [
                  D && /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { children: a.map((x, A) => /* @__PURE__ */ k(
                    "th",
                    {
                      scope: "col",
                      style: {
                        ...E(A, !0),
                        borderColor: R === "solid" ? Te(W, "contrast") : void 0
                      },
                      className: u(
                        q(x, A),
                        "z-10 border-b border-table-divider font-medium text-text-primary",
                        B,
                        R === "outline" && "border-x-0 border-t-0 border-b",
                        M(A) && "z-20",
                        g && "sticky top-0 z-20",
                        g && R !== "label" && "border-b-0",
                        g && M(A) && "z-30",
                        "first:rounded-tl-md last:rounded-tr-md"
                      ),
                      children: [
                        /* @__PURE__ */ k("span", { className: "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-1", children: [
                          x.header,
                          Fr(x.sortIcon)
                        ] }),
                        g && /* @__PURE__ */ t(
                          "span",
                          {
                            "aria-hidden": "true",
                            className: u(
                              "pointer-events-none absolute inset-x-0 -bottom-1.5 h-1.5 bg-gradient-to-b from-action-focus to-transparent",
                              R === "label" && !C && "hidden"
                            )
                          }
                        )
                      ]
                    },
                    x.key
                  )) }) }),
                  /* @__PURE__ */ t("tbody", { children: r.length ? r.map((x, A) => /* @__PURE__ */ t("tr", { className: "group", children: a.map((K, F) => {
                    const Q = !D && F === 0, w = Q ? "th" : "td", ae = K.fontWeight ?? ((!D || N && c) && F === 0 ? "semiBold" : "normal"), s = Q ? B : u(z, T && A % 2 === 1 && "bg-action-hover");
                    return /* @__PURE__ */ t(
                      w,
                      {
                        scope: Q ? "row" : void 0,
                        style: E(F, Q, A),
                        className: u(
                          q(K, F),
                          "border-b border-table-divider align-middle",
                          s,
                          !Q && "group-hover:bg-action-hover",
                          !Q && M(F) && "group-hover:[--table-cell-overlay:var(--action-hover-surface)]",
                          ae === "semiBold" ? "font-semibold" : "font-regular",
                          A === r.length - 1 && "border-b-0",
                          !D && A === 0 && F === 0 && "rounded-tl-md",
                          !D && A === 0 && F === a.length - 1 && "rounded-tr-md",
                          Q && A === r.length - 1 && "rounded-bl-md"
                        ),
                        children: K.render ? K.render(x, A) : String(x[K.key] ?? "")
                      },
                      K.key
                    );
                  }) }, i?.(x, A) ?? A)) : /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t(
                    "td",
                    {
                      colSpan: Math.max(a.length, 1),
                      className: u(
                        "text-center",
                        p === "small" ? "px-4 py-6 text-13" : "px-4 py-8 text-[0.875rem] leading-[1.43]"
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
          Br,
          {
            pagination: o,
            size: p === "default" ? "normal" : p,
            tone: W,
            ariaLabel: `Pagination for ${L} ${m}`
          }
        )
      ]
    }
  );
}
const Wr = {
  default: "border border-border-subtle bg-background-surface shadow-sm",
  primary: "",
  secondary: "",
  label: "",
  outline: "border bg-background-surface",
  text: "border-0 bg-transparent shadow-none"
};
function ti({
  title: e,
  description: a,
  actions: r,
  variant: i = "default",
  tone: o,
  className: l,
  headerClassName: d,
  contentClassName: n,
  children: p,
  ...c
}) {
  const v = $e[i], g = ue(i, o ?? "primary"), y = i === "default" && o !== void 0;
  return /* @__PURE__ */ k(
    "section",
    {
      ...c,
      className: u(
        "overflow-hidden rounded-md font-sans text-text-primary transition-colors",
        Wr[i],
        v === "solid" && i !== "default" && re[g].solid,
        y && re[g].label,
        v === "label" && re[g].label,
        v === "outline" && `${re[g].outline} border bg-background-surface`,
        y && "text-text-primary",
        l
      ),
      "data-variant": i,
      "data-tone": o !== void 0 || i === "primary" || i === "secondary" ? g : void 0,
      children: [
        (e != null || a != null || r != null) && /* @__PURE__ */ k(
          "header",
          {
            className: u(
              "flex min-h-12 items-start justify-between gap-2.5 px-4 py-4",
              p != null && "border-b border-border-subtle",
              d
            ),
            children: [
              /* @__PURE__ */ k("div", { className: "min-w-0", children: [
                e != null && /* @__PURE__ */ t("div", { className: "text-18 font-medium", children: e }),
                a != null && /* @__PURE__ */ t("div", { className: "mt-1 text-15 text-text-secondary", children: a })
              ] }),
              r != null && /* @__PURE__ */ t("div", { className: "flex shrink-0 items-center gap-2", children: r })
            ]
          }
        ),
        p != null && /* @__PURE__ */ t("div", { className: u("px-4 py-4 text-15", n), children: p })
      ]
    }
  );
}
const Rr = {
  small: "size-8",
  medium: "size-10",
  large: "size-12"
}, Mr = {
  default: "bg-text-primary text-background-surface enabled:hover:opacity-85 focus-visible:outline-text-primary",
  primary: "",
  secondary: "",
  label: "bg-action-hover text-text-primary enabled:hover:opacity-80",
  outline: "border border-border-subtle bg-background-surface text-text-primary enabled:hover:bg-action-hover",
  text: "bg-transparent text-text-primary enabled:hover:bg-action-hover"
};
function oi({
  children: e,
  className: a,
  size: r = "medium",
  shape: i = "circular",
  variant: o = "text",
  tone: l,
  type: d = "button",
  ...n
}) {
  const p = $e[o], c = ue(o, l ?? "primary"), g = l !== void 0 || o === "primary" || o === "secondary" ? re[c][p] : Mr[o];
  return /* @__PURE__ */ t(
    "button",
    {
      ...n,
      type: d,
      className: u(
        "inline-flex shrink-0 items-center justify-center p-0 transition-colors disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
        Rr[r],
        i === "circular" ? "rounded-full" : "rounded-md",
        g,
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
const jr = {
  default: "border border-border-subtle bg-background-surface shadow-lg",
  primary: "",
  secondary: "",
  label: "",
  outline: "border bg-background-surface shadow-md",
  text: "border-0 bg-background-surface shadow-md"
};
function li({
  label: e,
  items: a,
  triggerIcon: r,
  triggerAriaLabel: i,
  variant: o = "default",
  tone: l = "primary",
  disabled: d = !1,
  className: n,
  menuClassName: p,
  ...c
}) {
  const [v, g] = J(!1), y = ie(null), T = ie(null), G = ie(null), S = $e[o], m = ue(o, l);
  ge(() => {
    if (!v) return;
    G.current?.querySelector('[role="menuitem"]:not(:disabled)')?.focus();
    const b = (O) => {
      y.current?.contains(O.target) || g(!1);
    }, h = (O) => {
      O.key === "Escape" && (g(!1), T.current?.focus());
    };
    return document.addEventListener("pointerdown", b), document.addEventListener("keydown", h), () => {
      document.removeEventListener("pointerdown", b), document.removeEventListener("keydown", h);
    };
  }, [v]);
  const C = (b) => {
    const h = Array.from(
      G.current?.querySelectorAll('[role="menuitem"]:not(:disabled)') ?? []
    );
    if (h.length === 0) return;
    const O = h.indexOf(document.activeElement);
    let L;
    b.key === "ArrowDown" ? L = (O + 1) % h.length : b.key === "ArrowUp" ? L = (O - 1 + h.length) % h.length : b.key === "Home" ? L = 0 : b.key === "End" && (L = h.length - 1), L !== void 0 && (b.preventDefault(), h[L]?.focus());
  };
  return /* @__PURE__ */ k("div", { ...c, ref: y, className: u("relative inline-flex font-sans", n), children: [
    /* @__PURE__ */ k(
      "button",
      {
        ref: T,
        type: "button",
        disabled: d,
        "aria-label": e ? void 0 : i || "Open menu",
        "aria-haspopup": "menu",
        "aria-expanded": v,
        onClick: () => g((b) => !b),
        className: u(
          "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-15 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-45",
          re[m][S]
        ),
        "data-variant": o,
        "data-tone": m,
        children: [
          e,
          r && /* @__PURE__ */ t("span", { className: "inline-flex size-4 items-center justify-center", "aria-hidden": "true", children: r })
        ]
      }
    ),
    v && /* @__PURE__ */ t(
      "div",
      {
        ref: G,
        role: "menu",
        "aria-label": e || i || "Menu options",
        onKeyDown: C,
        className: u(
          "absolute right-0 top-full z-50 mt-2 min-w-48 overflow-hidden rounded-md py-1",
          jr[o],
          S === "solid" && o !== "default" && re[m].solid,
          S === "label" && re[m].label,
          S === "outline" && `${re[m].outline} border bg-background-surface`,
          p
        ),
        "data-variant": o,
        "data-tone": m,
        children: a.map((b, h) => /* @__PURE__ */ k("div", { children: [
          b.dividerBefore && /* @__PURE__ */ t("div", { role: "separator", className: "my-1 border-t border-border-subtle" }),
          /* @__PURE__ */ k(
            "button",
            {
              type: "button",
              role: "menuitem",
              disabled: b.disabled,
              onClick: () => {
                b.onSelect?.(), g(!1), T.current?.focus();
              },
              className: "flex min-h-10 w-full items-center gap-3 px-4 text-left text-15 text-text-primary transition-colors hover:bg-action-hover focus-visible:bg-action-hover focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45",
              children: [
                b.icon && /* @__PURE__ */ t("span", { className: "inline-flex size-5 shrink-0 items-center justify-center", "aria-hidden": "true", children: b.icon }),
                /* @__PURE__ */ t("span", { className: "flex-1", children: b.label })
              ]
            }
          )
        ] }, h))
      }
    )
  ] });
}
const Se = {
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
}, wa = { Dark: "dark", Light: "light", "Pulse-Dark": "pulse-dark", Pulse: "pulse", "Teal-Dark": "teal-dark", Teal: "teal" };
function Ca(e) {
  const a = e.match(/^\{(.+)\}$/);
  if (!a) return e;
  let r = Se;
  for (const i of a[1].split(".")) {
    if (!r || typeof r != "object" || !(i in r))
      throw new Error(`Unknown token reference: ${e}`);
    r = r[i];
  }
  if (!r || typeof r != "object" || !("$value" in r) || typeof r.$value != "string")
    throw new Error(`Invalid token reference: ${e}`);
  return Ca(r.$value);
}
const Ve = (e) => Object.fromEntries(
  Object.entries(e).flatMap(([a, r]) => typeof r == "string" ? [] : [[a, Ca(r.$value)]])
), ve = (e, a = "") => Object.fromEntries(Object.entries(Ve(e)).map(([r, i]) => [r.replace(a, ""), i])), we = (e, a = "") => Object.fromEntries(
  Object.entries(Ve(e)).map(([r, i]) => [r.replace(a, ""), Number.parseFloat(i)])
);
function Vr(e) {
  const a = Se.Variables[e], r = Se.Primitives[e], i = Ve(a["Color-Palette"]);
  return {
    core: {
      color: {
        primary: ve(r.Color.Primary, "primary-"),
        secondary: ve(r.Color.Secondary, "secondary-"),
        info: ve(r.Color.Info, "info-"),
        error: ve(r.Color.Error, "error-"),
        warning: ve(r.Color.Warning, "warning-"),
        success: ve(r.Color.Success, "success-"),
        gray: ve(r.Color.Gray, "gray-"),
        palette: i
      },
      space: we(r.Gap, "gap-"),
      radius: we(r["Border-Radius"], /^(border-radius-|border-)/),
      fontFamily: r.Typography["font-family"].$value,
      fontSize: we(r.Typography["font-size"]),
      fontWeight: we(r.Typography["font-weight"]),
      lineHeight: we(r.Typography["line-height"])
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
const De = Object.fromEntries(
  Object.keys(Se.Variables).map((e) => [wa[e], Vr(e)])
), ni = Object.values(wa).sort((e, a) => e.localeCompare(a)), si = { core: De.pulse.core, semantic: De.pulse.semantic, themes: De }, di = (e) => De[e], ci = { mobile: "640px", tablet: "900px", desktop: "1280px" };
export {
  Hr as Accordion,
  Xr as Autocomplete,
  ri as BodyText,
  Jr as Button,
  ti as Card,
  Yr as Carousel,
  ai as Chart,
  ka as Heading,
  oi as IconButton,
  Zr as Input,
  de as LabelText,
  li as Menu,
  ri as Paragraph,
  ei as Select,
  ii as Table,
  Qr as Textarea,
  ci as breakpoints,
  $e as componentVariantAppearances,
  di as getThemeTokens,
  fe as mapPaletteTones,
  wr as paletteToneStyles,
  fa as paletteTones,
  ue as resolveVariantTone,
  ni as themeModes,
  si as themeTokens,
  Te as toneVar
};
