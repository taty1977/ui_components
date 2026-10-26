import { jsx as i, jsxs as w, Fragment as Sa } from "react/jsx-runtime";
import { useState as Z, useId as pe, Children as oa, useRef as te, useEffect as me, isValidElement as la, useMemo as _e, useCallback as Ue } from "react";
import { ChevronUpIcon as na, ChevronDownIcon as We, XMarkIcon as Na, ChevronLeftIcon as qe, ChevronRightIcon as He, HeartIcon as La, CheckIcon as Oa } from "@heroicons/react/24/solid";
import { ResponsiveContainer as za, LineChart as Da, Line as Ga, AreaChart as Ia, Area as Ba, BarChart as Aa, Bar as Ea, PieChart as Ma, Tooltip as Xe, Legend as Je, Pie as Ra, CartesianGrid as Wa, XAxis as ja, YAxis as Fa } from "recharts";
function sa(e) {
  var a, r, t = "";
  if (typeof e == "string" || typeof e == "number") t += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (a = 0; a < o; a++) e[a] && (r = sa(e[a])) && (t && (t += " "), t += r);
  } else for (r in e) e[r] && (t && (t += " "), t += r);
  return t;
}
function da() {
  for (var e, a, r = 0, t = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (a = sa(e)) && (t && (t += " "), t += a);
  return t;
}
const je = "-", Va = (e) => {
  const a = _a(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: t
  } = e;
  return {
    getClassGroupId: (s) => {
      const n = s.split(je);
      return n[0] === "" && n.length !== 1 && n.shift(), ca(n, a) || Ka(s);
    },
    getConflictingClassGroupIds: (s, n) => {
      const u = r[s] || [];
      return n && t[s] ? [...u, ...t[s]] : u;
    }
  };
}, ca = (e, a) => {
  if (e.length === 0)
    return a.classGroupId;
  const r = e[0], t = a.nextPart.get(r), o = t ? ca(e.slice(1), t) : void 0;
  if (o)
    return o;
  if (a.validators.length === 0)
    return;
  const l = e.join(je);
  return a.validators.find(({
    validator: s
  }) => s(l))?.classGroupId;
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
  } = e, t = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return qa(Object.entries(e.classGroups), r).forEach(([l, s]) => {
    Re(s, t, l, a);
  }), t;
}, Re = (e, a, r, t) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const l = o === "" ? a : Ze(a, o);
      l.classGroupId = r;
      return;
    }
    if (typeof o == "function") {
      if (Ua(o)) {
        Re(o(t), a, r, t);
        return;
      }
      a.validators.push({
        validator: o,
        classGroupId: r
      });
      return;
    }
    Object.entries(o).forEach(([l, s]) => {
      Re(s, Ze(a, l), r, t);
    });
  });
}, Ze = (e, a) => {
  let r = e;
  return a.split(je).forEach((t) => {
    r.nextPart.has(t) || r.nextPart.set(t, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(t);
  }), r;
}, Ua = (e) => e.isThemeGetter, qa = (e, a) => a ? e.map(([r, t]) => {
  const o = t.map((l) => typeof l == "string" ? a + l : typeof l == "object" ? Object.fromEntries(Object.entries(l).map(([s, n]) => [a + s, n])) : l);
  return [r, o];
}) : e, Ha = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let a = 0, r = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  const o = (l, s) => {
    r.set(l, s), a++, a > e && (a = 0, t = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(l) {
      let s = r.get(l);
      if (s !== void 0)
        return s;
      if ((s = t.get(l)) !== void 0)
        return o(l, s), s;
    },
    set(l, s) {
      r.has(l) ? r.set(l, s) : o(l, s);
    }
  };
}, ua = "!", Xa = (e) => {
  const {
    separator: a,
    experimentalParseClassName: r
  } = e, t = a.length === 1, o = a[0], l = a.length, s = (n) => {
    const u = [];
    let c = 0, f = 0, b;
    for (let y = 0; y < n.length; y++) {
      let P = n[y];
      if (c === 0) {
        if (P === o && (t || n.slice(y, y + l) === a)) {
          u.push(n.slice(f, y)), f = y + l;
          continue;
        }
        if (P === "/") {
          b = y;
          continue;
        }
      }
      P === "[" ? c++ : P === "]" && c--;
    }
    const k = u.length === 0 ? n : n.substring(f), E = k.startsWith(ua), R = E ? k.substring(1) : k, I = b && b > f ? b - f : void 0;
    return {
      modifiers: u,
      hasImportantModifier: E,
      baseClassName: R,
      maybePostfixModifierPosition: I
    };
  };
  return r ? (n) => r({
    className: n,
    parseClassName: s
  }) : s;
}, Ja = (e) => {
  if (e.length <= 1)
    return e;
  const a = [];
  let r = [];
  return e.forEach((t) => {
    t[0] === "[" ? (a.push(...r.sort(), t), r = []) : r.push(t);
  }), a.push(...r.sort()), a;
}, Ya = (e) => ({
  cache: Ha(e.cacheSize),
  parseClassName: Xa(e),
  ...Va(e)
}), Za = /\s+/, Qa = (e, a) => {
  const {
    parseClassName: r,
    getClassGroupId: t,
    getConflictingClassGroupIds: o
  } = a, l = [], s = e.trim().split(Za);
  let n = "";
  for (let u = s.length - 1; u >= 0; u -= 1) {
    const c = s[u], {
      modifiers: f,
      hasImportantModifier: b,
      baseClassName: k,
      maybePostfixModifierPosition: E
    } = r(c);
    let R = !!E, I = t(R ? k.substring(0, E) : k);
    if (!I) {
      if (!R) {
        n = c + (n.length > 0 ? " " + n : n);
        continue;
      }
      if (I = t(k), !I) {
        n = c + (n.length > 0 ? " " + n : n);
        continue;
      }
      R = !1;
    }
    const y = Ja(f).join(":"), P = b ? y + ua : y, C = P + I;
    if (l.includes(C))
      continue;
    l.push(C);
    const T = o(I, R);
    for (let S = 0; S < T.length; ++S) {
      const L = T[S];
      l.push(P + L);
    }
    n = c + (n.length > 0 ? " " + n : n);
  }
  return n;
};
function er() {
  let e = 0, a, r, t = "";
  for (; e < arguments.length; )
    (a = arguments[e++]) && (r = pa(a)) && (t && (t += " "), t += r);
  return t;
}
const pa = (e) => {
  if (typeof e == "string")
    return e;
  let a, r = "";
  for (let t = 0; t < e.length; t++)
    e[t] && (a = pa(e[t])) && (r && (r += " "), r += a);
  return r;
};
function Qe(e, ...a) {
  let r, t, o, l = s;
  function s(u) {
    const c = a.reduce((f, b) => b(f), e());
    return r = Ya(c), t = r.cache.get, o = r.cache.set, l = n, n(u);
  }
  function n(u) {
    const c = t(u);
    if (c)
      return c;
    const f = Qa(u, r);
    return o(u, f), f;
  }
  return function() {
    return l(er.apply(null, arguments));
  };
}
const U = (e) => {
  const a = (r) => r[e] || [];
  return a.isThemeGetter = !0, a;
}, va = /^\[(?:([a-z-]+):)?(.+)\]$/i, ar = /^\d+\/\d+$/, rr = /* @__PURE__ */ new Set(["px", "full", "screen"]), tr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ir = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, or = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, lr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, nr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ie = (e) => ge(e) || rr.has(e) || ar.test(e), oe = (e) => fe(e, "length", mr), ge = (e) => !!e && !Number.isNaN(Number(e)), Ae = (e) => fe(e, "number", ge), he = (e) => !!e && Number.isInteger(Number(e)), sr = (e) => e.endsWith("%") && ge(e.slice(0, -1)), O = (e) => va.test(e), le = (e) => tr.test(e), dr = /* @__PURE__ */ new Set(["length", "size", "percentage"]), cr = (e) => fe(e, dr, ga), ur = (e) => fe(e, "position", ga), pr = /* @__PURE__ */ new Set(["image", "url"]), vr = (e) => fe(e, pr, br), gr = (e) => fe(e, "", fr), xe = () => !0, fe = (e, a, r) => {
  const t = va.exec(e);
  return t ? t[1] ? typeof a == "string" ? t[1] === a : a.has(t[1]) : r(t[2]) : !1;
}, mr = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  ir.test(e) && !or.test(e)
), ga = () => !1, fr = (e) => lr.test(e), br = (e) => nr.test(e), ea = () => {
  const e = U("colors"), a = U("spacing"), r = U("blur"), t = U("brightness"), o = U("borderColor"), l = U("borderRadius"), s = U("borderSpacing"), n = U("borderWidth"), u = U("contrast"), c = U("grayscale"), f = U("hueRotate"), b = U("invert"), k = U("gap"), E = U("gradientColorStops"), R = U("gradientColorStopPositions"), I = U("inset"), y = U("margin"), P = U("opacity"), C = U("padding"), T = U("saturate"), S = U("scale"), L = U("sepia"), A = U("skew"), B = U("space"), W = U("translate"), z = () => ["auto", "contain", "none"], G = () => ["auto", "hidden", "clip", "visible", "scroll"], N = () => ["auto", O, a], p = () => [O, a], _ = () => ["", ie, oe], j = () => ["auto", ge, O], Q = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], K = () => ["solid", "dashed", "dotted", "double", "none"], F = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], X = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], g = () => ["", "0", O], x = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], M = () => [ge, O];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [xe],
      spacing: [ie, oe],
      blur: ["none", "", le, O],
      brightness: M(),
      borderColor: [e],
      borderRadius: ["none", "", "full", le, O],
      borderSpacing: p(),
      borderWidth: _(),
      contrast: M(),
      grayscale: g(),
      hueRotate: M(),
      invert: g(),
      gap: p(),
      gradientColorStops: [e],
      gradientColorStopPositions: [sr, oe],
      inset: N(),
      margin: N(),
      opacity: M(),
      padding: p(),
      saturate: M(),
      scale: M(),
      sepia: g(),
      skew: M(),
      space: p(),
      translate: p()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", O]
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
        columns: [le]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": x()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": x()
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
        object: [...Q(), O]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: G()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": G()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": G()
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
        inset: [I]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [I]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [I]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [I]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [I]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [I]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [I]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [I]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [I]
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
        z: ["auto", he, O]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: N()
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
        flex: ["1", "auto", "initial", "none", O]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: g()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: g()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", he, O]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [xe]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", he, O]
        }, O]
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
        "grid-rows": [xe]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [he, O]
        }, O]
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
        "auto-cols": ["auto", "min", "max", "fr", O]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", O]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [k]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [k]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [k]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...X()]
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
        content: ["normal", ...X(), "baseline"]
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
        "place-content": [...X(), "baseline"]
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
        p: [C]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [C]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [C]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [C]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [C]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [C]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [C]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [C]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [C]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [y]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [y]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [y]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [y]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [y]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [y]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [y]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [y]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [y]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [B]
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
        "space-y": [B]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", O, a]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [O, a, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [O, a, "none", "full", "min", "max", "fit", "prose", {
          screen: [le]
        }, le]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [O, a, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [O, a, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [O, a, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [O, a, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", le, oe]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Ae]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [xe]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", O]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", ge, Ae]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ie, O]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", O]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", O]
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
        "placeholder-opacity": [P]
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
        "text-opacity": [P]
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
        decoration: ["auto", "from-font", ie, oe]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", ie, O]
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
        indent: p()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", O]
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
        content: ["none", O]
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
        "bg-opacity": [P]
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
        bg: [...Q(), ur]
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
        bg: ["auto", "cover", "contain", cr]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, vr]
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
        from: [R]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [R]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [R]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [E]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [E]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [E]
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
        "border-opacity": [P]
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
        "divide-opacity": [P]
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
        "outline-offset": [ie, O]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [ie, oe]
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
        ring: _()
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
        "ring-opacity": [P]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [ie, oe]
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
        shadow: ["", "inner", "none", le, gr]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [xe]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [P]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...F(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": F()
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
        brightness: [t]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [u]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", le, O]
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
        invert: [b]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [T]
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
        "backdrop-brightness": [t]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [u]
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
        "backdrop-invert": [b]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [P]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [T]
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
        "border-spacing": [s]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [s]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [s]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", O]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: M()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", O]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: M()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", O]
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
        scale: [S]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [S]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [S]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [he, O]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [W]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [W]
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
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", O]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", O]
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
        "scroll-m": p()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": p()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": p()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": p()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": p()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": p()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": p()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": p()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": p()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": p()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": p()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": p()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": p()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": p()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": p()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": p()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": p()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": p()
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
        "will-change": ["auto", "scroll", "contents", "transform", O]
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
        stroke: [ie, oe, Ae]
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
}, yr = (e, {
  cacheSize: a,
  prefix: r,
  separator: t,
  experimentalParseClassName: o,
  extend: l = {},
  override: s = {}
}) => {
  Pe(e, "cacheSize", a), Pe(e, "prefix", r), Pe(e, "separator", t), Pe(e, "experimentalParseClassName", o);
  for (const n in s)
    $r(e[n], s[n]);
  for (const n in l)
    hr(e[n], l[n]);
  return e;
}, Pe = (e, a, r) => {
  r !== void 0 && (e[a] = r);
}, $r = (e, a) => {
  if (a)
    for (const r in a)
      Pe(e, r, a[r]);
}, hr = (e, a) => {
  if (a)
    for (const r in a) {
      const t = a[r];
      t !== void 0 && (e[r] = (e[r] || []).concat(t));
    }
}, xr = (e, ...a) => typeof e == "function" ? Qe(ea, e, ...a) : Qe(() => yr(ea(), e), ...a), kr = xr({
  extend: {
    classGroups: {
      "font-size": [{ text: ["12", "13", "15", "18", "24", "28", "38", "46"] }],
      "font-weight": [{ font: ["regular"] }]
    }
  }
}), d = (...e) => kr(da(e)), Ne = {
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
function we(e, a) {
  return e === "primary" || e === "secondary" ? e : a;
}
const aa = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ra = da, ma = (e, a) => (r) => {
  var t;
  if (a?.variants == null) return ra(e, r?.class, r?.className);
  const { variants: o, defaultVariants: l } = a, s = Object.keys(o).map((c) => {
    const f = r?.[c], b = l?.[c];
    if (f === null) return null;
    const k = aa(f) || aa(b);
    return o[c][k];
  }), n = r && Object.entries(r).reduce((c, f) => {
    let [b, k] = f;
    return k === void 0 || (c[b] = k), c;
  }, {}), u = a == null || (t = a.compoundVariants) === null || t === void 0 ? void 0 : t.reduce((c, f) => {
    let { class: b, className: k, ...E } = f;
    return Object.entries(E).every((R) => {
      let [I, y] = R;
      return Array.isArray(y) ? y.includes({
        ...l,
        ...n
      }[I]) : {
        ...l,
        ...n
      }[I] === y;
    }) ? [
      ...c,
      b,
      k
    ] : c;
  }, []);
  return ra(e, s, u, r?.class, r?.className);
}, fa = [
  "primary",
  "secondary",
  "error",
  "warning",
  "info",
  "success"
], Pr = {
  primary: {
    default: "bg-palette-primary-main",
    defaultState: "enabled:hover:bg-palette-primary-dark enabled:active:bg-palette-primary-dark enabled:focus:bg-palette-primary-dark",
    defaultText: "text-misc-bg-white",
    label: "bg-palette-primary-opacity-light",
    labelState: "enabled:hover:bg-palette-primary-opacity-main enabled:active:bg-palette-primary-opacity-main enabled:focus:bg-palette-primary-opacity-main",
    outline: "border-palette-primary-main",
    text: "text-palette-primary-main",
    subtleState: "enabled:hover:bg-palette-primary-opacity-lighter enabled:active:bg-palette-primary-opacity-lighter enabled:focus:bg-palette-primary-opacity-lighter",
    fieldBorder: "border-palette-primary-main hover:border-palette-primary-dark focus-within:border-palette-primary-main",
    notchBorder: "border-palette-primary-main group-hover:border-palette-primary-dark"
  },
  secondary: {
    default: "bg-palette-secondary-main",
    defaultState: "enabled:hover:bg-palette-secondary-dark enabled:active:bg-palette-secondary-dark enabled:focus:bg-palette-secondary-dark",
    defaultText: "text-misc-bg-white",
    label: "bg-palette-secondary-opacity-light",
    labelState: "enabled:hover:bg-palette-secondary-opacity-main enabled:active:bg-palette-secondary-opacity-main enabled:focus:bg-palette-secondary-opacity-main",
    outline: "border-palette-secondary-main",
    text: "text-palette-secondary-main",
    subtleState: "enabled:hover:bg-palette-secondary-opacity-lighter enabled:active:bg-palette-secondary-opacity-lighter enabled:focus:bg-palette-secondary-opacity-lighter",
    fieldBorder: "border-palette-secondary-main hover:border-palette-secondary-dark focus-within:border-palette-secondary-main",
    notchBorder: "border-palette-secondary-main group-hover:border-palette-secondary-dark"
  },
  error: {
    default: "bg-palette-error-main",
    defaultState: "enabled:hover:bg-palette-error-dark enabled:active:bg-palette-error-dark enabled:focus:bg-palette-error-dark",
    defaultText: "text-misc-bg-white",
    label: "bg-palette-error-opacity-light",
    labelState: "enabled:hover:bg-palette-error-opacity-main enabled:active:bg-palette-error-opacity-main enabled:focus:bg-palette-error-opacity-main",
    outline: "border-palette-error-main",
    text: "text-palette-error-main",
    subtleState: "enabled:hover:bg-palette-error-opacity-lighter enabled:active:bg-palette-error-opacity-lighter enabled:focus:bg-palette-error-opacity-lighter",
    fieldBorder: "border-palette-error-main hover:border-palette-error-dark focus-within:border-palette-error-main",
    notchBorder: "border-palette-error-main group-hover:border-palette-error-dark"
  },
  warning: {
    default: "bg-palette-warning-main",
    defaultState: "enabled:hover:bg-palette-warning-dark enabled:active:bg-palette-warning-dark enabled:focus:bg-palette-warning-dark",
    defaultText: "text-misc-bg-white",
    label: "bg-palette-warning-opacity-light",
    labelState: "enabled:hover:bg-palette-warning-opacity-main enabled:active:bg-palette-warning-opacity-main enabled:focus:bg-palette-warning-opacity-main",
    outline: "border-palette-warning-main",
    text: "text-palette-warning-main",
    subtleState: "enabled:hover:bg-palette-warning-opacity-lighter enabled:active:bg-palette-warning-opacity-lighter enabled:focus:bg-palette-warning-opacity-lighter",
    fieldBorder: "border-palette-warning-main hover:border-palette-warning-dark focus-within:border-palette-warning-main",
    notchBorder: "border-palette-warning-main group-hover:border-palette-warning-dark"
  },
  info: {
    default: "bg-palette-info-main",
    defaultState: "enabled:hover:bg-palette-info-dark enabled:active:bg-palette-info-dark enabled:focus:bg-palette-info-dark",
    defaultText: "text-misc-bg-white",
    label: "bg-palette-info-opacity-light",
    labelState: "enabled:hover:bg-palette-info-opacity-main enabled:active:bg-palette-info-opacity-main enabled:focus:bg-palette-info-opacity-main",
    outline: "border-palette-info-main",
    text: "text-palette-info-main",
    subtleState: "enabled:hover:bg-palette-info-opacity-lighter enabled:active:bg-palette-info-opacity-lighter enabled:focus:bg-palette-info-opacity-lighter",
    fieldBorder: "border-palette-info-main hover:border-palette-info-dark focus-within:border-palette-info-main",
    notchBorder: "border-palette-info-main group-hover:border-palette-info-dark"
  },
  success: {
    default: "bg-palette-success-main",
    defaultState: "enabled:hover:bg-palette-success-dark enabled:active:bg-palette-success-dark enabled:focus:bg-palette-success-dark",
    defaultText: "text-misc-bg-white",
    label: "bg-palette-success-opacity-light",
    labelState: "enabled:hover:bg-palette-success-opacity-main enabled:active:bg-palette-success-opacity-main enabled:focus:bg-palette-success-opacity-main",
    outline: "border-palette-success-main",
    text: "text-palette-success-main",
    subtleState: "enabled:hover:bg-palette-success-opacity-lighter enabled:active:bg-palette-success-opacity-lighter enabled:focus:bg-palette-success-opacity-lighter",
    fieldBorder: "border-palette-success-main hover:border-palette-success-dark focus-within:border-palette-success-main",
    notchBorder: "border-palette-success-main group-hover:border-palette-success-dark"
  }
}, be = (e) => Object.fromEntries(fa.map((a) => [a, e(Pr[a])])), Te = (e, a = "main") => `var(--palette-${e}-${a})`, wr = ma(
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
), ne = be((e) => ({
  solid: `${e.default} ${e.defaultText} ${e.defaultState}`,
  label: `${e.label} ${e.text} ${e.labelState}`,
  outline: `border bg-transparent ${e.outline} ${e.text} ${e.subtleState}`,
  text: `bg-transparent ${e.text} ${e.subtleState}`
}));
function jr({
  items: e,
  className: a,
  allowMultiple: r = !1,
  collapsedIcon: t,
  expandedIcon: o,
  iconPosition: l = "right",
  variant: s = "default",
  tone: n = "primary",
  size: u = "normal",
  children: c
}) {
  const [f, b] = Z(/* @__PURE__ */ new Set()), k = pe(), E = we(s, n), R = Ne[s], I = ne[E][R], y = oa.toArray(c);
  return /* @__PURE__ */ i("div", { className: d("grid gap-2 font-sans", a), "data-variant": s, "data-tone": E, children: e.map((P, C) => {
    const T = f.has(P.id), S = T ? na : We, L = y[C] ?? P.content, A = `${k}-button-${P.id}`, B = `${k}-panel-${P.id}`, W = /* @__PURE__ */ i("span", { "aria-hidden": "true", className: "inline-flex size-4 shrink-0 items-center justify-center", children: (T ? o : t) ?? /* @__PURE__ */ i(S, { className: "size-4" }) });
    return /* @__PURE__ */ w(
      "div",
      {
        className: d(
          "overflow-hidden bg-background-surface transition-colors",
          R === "text" ? "rounded-none" : "rounded-md"
        ),
        children: [
          /* @__PURE__ */ w(
            "button",
            {
              type: "button",
              id: A,
              "aria-expanded": T,
              "aria-controls": B,
              className: d(
                "flex w-full items-center text-left font-medium text-text-primary outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-current",
                u === "small" ? "min-h-11 gap-2 px-4 text-15" : "min-h-12 gap-2.5 px-4 text-18",
                I,
                R === "outline" && (T && L != null ? "rounded-t-md" : "rounded-md")
              ),
              onClick: () => b((z) => {
                const G = r ? new Set(z) : /* @__PURE__ */ new Set();
                return z.has(P.id) ? G.delete(P.id) : G.add(P.id), G;
              }),
              children: [
                l === "left" && W,
                /* @__PURE__ */ i("span", { className: "flex-1", children: P.title }),
                l === "right" && W
              ]
            }
          ),
          /* @__PURE__ */ i(
            "div",
            {
              id: B,
              role: "region",
              "aria-labelledby": A,
              hidden: !T || L == null,
              className: d(
                "border-t border-border-subtle bg-background-surface px-4 text-text-secondary",
                u === "small" ? "py-3 text-13" : "py-4 text-15"
              ),
              children: T ? L : null
            }
          )
        ]
      },
      P.id
    );
  }) });
}
function Le({
  appearance: e,
  floating: a,
  visible: r,
  iconLeft: t = !1,
  size: o = "normal",
  multiline: l = !1
}) {
  let s;
  return r ? a && e === "outlined" ? s = "left-3 -top-2 px-1 text-13 bg-background-surface" : a && e === "filled" ? s = "left-4 top-1 text-13 leading-14" : l ? s = "left-4 top-2" : s = d("top-1/2 -translate-y-1/2 text-inherit", t ? o === "small" ? "left-9" : "left-[42px]" : "left-4") : s = "sr-only", d(
    "pointer-events-none absolute z-10 mb-0 transition-all",
    s,
    !l && !a && e !== "outlined" && "mt-[0.5px] group-focus-within:mt-px"
  );
}
function Oe(e, a, r) {
  const t = e === "primary" || e === "secondary" ? "outlined" : e, o = r ? "error" : we(e, a);
  return { appearance: t, accent: o };
}
const ze = be((e) => e.fieldBorder), ue = be((e) => e.text);
function De({
  disabled: e,
  error: a,
  active: r,
  accent: t
}) {
  return e ? "text-text-disabled" : a ? ue.error : r ? ue[t] : "text-text-secondary";
}
const Cr = be((e) => e.notchBorder), Ge = ma(
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
), Fe = "w-full min-w-0 flex-1 border-0 bg-transparent py-2 font-sans text-inherit leading-5 outline-none placeholder:text-text-secondary disabled:cursor-not-allowed disabled:text-text-disabled", re = {
  outlined: "",
  filled: "relative top-[0.5px] group-focus-within:top-px",
  standard: "relative top-[0.5px] group-focus-within:top-px"
}, Tr = "mb-1 block font-sans text-13 font-medium text-text-secondary", Ie = "mt-1 font-sans text-13 text-palette-error-main", ba = "absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-md border border-border-subtle bg-background-surface py-2 font-sans text-15 text-text-primary shadow-lg", ya = (e, a) => ({
  "aria-hidden": e || void 0,
  role: e ? void 0 : "img",
  "aria-label": a
});
function se({ required: e, className: a, children: r, ref: t, ...o }) {
  return /* @__PURE__ */ w("label", { ref: t, className: d(Tr, a), ...o, children: [
    r,
    e && /* @__PURE__ */ i("span", { className: "ml-1 text-palette-error-main", ...ya(!0), children: "*" })
  ] });
}
function Be({ width: e, accent: a, disabled: r }) {
  const t = r ? "border-text-disabled" : Cr[a];
  return /* @__PURE__ */ w(Sa, { children: [
    /* @__PURE__ */ i(
      "span",
      {
        "aria-hidden": "true",
        className: d(
          "absolute bottom-0 left-0 top-0 w-3 rounded-l-md border-b border-l border-t group-focus-within:border-b-2 group-focus-within:border-l-2 group-focus-within:border-t-2",
          t
        )
      }
    ),
    /* @__PURE__ */ i(
      "span",
      {
        "aria-hidden": "true",
        className: d("absolute bottom-0 left-3 right-3 border-b group-focus-within:border-b-2", t)
      }
    ),
    /* @__PURE__ */ i(
      "span",
      {
        "aria-hidden": "true",
        className: d(
          "absolute bottom-0 right-0 top-0 rounded-r-md border-b border-r border-t group-focus-within:border-b-2 group-focus-within:border-r-2 group-focus-within:border-t-2",
          t
        ),
        style: { left: 12 + e }
      }
    )
  ] });
}
function Fr({
  className: e,
  error: a,
  helperText: r,
  iconLeft: t,
  iconRight: o,
  label: l,
  variant: s = "outlined",
  tone: n = "primary",
  size: u = "normal",
  onChange: c,
  onSelect: f,
  options: b,
  value: k,
  defaultValue: E,
  id: R,
  "aria-describedby": I,
  onFocus: y,
  onBlur: P,
  onKeyDown: C,
  ...T
}) {
  const S = pe(), L = te(null), A = te(null), [B, W] = Z(), { appearance: z, accent: G } = Oe(s, n, a), N = R ?? S, p = `${N}-options`, _ = a ?? r, j = `${N}-${a ? "error" : "helper"}`, [Q, K] = Z(String(k ?? E ?? "")), [F, X] = Z(!1), [g, x] = Z(!1), [M, J] = Z(0), V = k ?? Q, q = V.length > 0, $ = q || !T.placeholder, v = !!(l && q && z === "outlined"), H = !!(v && B !== void 0), h = De({ disabled: T.disabled, error: a, active: F, accent: G }), m = g && V.trim() ? b.filter((D) => D.toLowerCase().includes(V.toLowerCase())) : [];
  me(() => {
    if (!l || !q || z !== "outlined") return;
    const D = A.current?.offsetWidth;
    D && W(D);
  }, [z, q, l, T.required]);
  const Y = (D) => {
    K(D), x(!1), f(D);
  };
  return /* @__PURE__ */ w(
    "div",
    {
      className: d("relative w-full max-w-sm font-sans", e),
      onBlur: (D) => {
        D.currentTarget.contains(D.relatedTarget) || X(!1);
      },
      children: [
        l && z === "standard" && q && $ && /* @__PURE__ */ i(
          se,
          {
            ref: A,
            htmlFor: N,
            required: T.required,
            className: d("absolute left-0 top-0 z-10 mb-0 pl-4", h),
            children: l
          }
        ),
        /* @__PURE__ */ w(
          "div",
          {
            className: d(
              Ge({
                variant: z,
                size: typeof u == "number" ? "normal" : u,
                disabled: T.disabled,
                iconLeft: !!t,
                iconRight: !!(o || F && V.trim()),
                notched: H
              }),
              "group",
              v && "mt-2 bg-background-surface",
              l && q && z === "standard" && "mt-2",
              !T.disabled && ze[G]
            ),
            children: [
              H && B !== void 0 && /* @__PURE__ */ i(Be, { width: B, accent: G, disabled: T.disabled }),
              l && !(z === "standard" && q && $) && /* @__PURE__ */ i(
                se,
                {
                  ref: A,
                  htmlFor: N,
                  required: T.required,
                  className: d(
                    Le({ appearance: z, floating: q, visible: $, iconLeft: !!t, size: u }),
                    h
                  ),
                  children: l
                }
              ),
              t && /* @__PURE__ */ i(
                "span",
                {
                  "aria-hidden": "true",
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    re[z]
                  ),
                  children: t
                }
              ),
              /* @__PURE__ */ i(
                "input",
                {
                  ...T,
                  ref: L,
                  size: typeof u == "number" ? u : void 0,
                  id: N,
                  type: "text",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": m.length > 0,
                  "aria-controls": p,
                  "aria-activedescendant": m[M] ? `${p}-${M}` : void 0,
                  "aria-describedby": [I, _ && j].filter(Boolean).join(" ") || void 0,
                  "aria-invalid": a ? !0 : T["aria-invalid"],
                  value: V,
                  className: d(
                    Fe,
                    !q && re[z],
                    z === "filled" && q && l && "self-stretch py-0 pt-[18px]"
                  ),
                  onChange: (D) => {
                    K(D.target.value), x(!0), J(0), c?.(D);
                  },
                  onFocus: (D) => {
                    X(!0), x(!0), y?.(D);
                  },
                  onBlur: (D) => {
                    x(!1), P?.(D);
                  },
                  onKeyDown: (D) => {
                    C?.(D), !D.defaultPrevented && (D.key === "Enter" && m.length && (D.preventDefault(), Y(m[M] ?? m[0])), D.key === "Escape" && x(!1), (D.key === "ArrowDown" || D.key === "ArrowUp") && (D.preventDefault(), x(!0), J(
                      (ae) => Math.max(0, Math.min(m.length - 1, ae + (D.key === "ArrowDown" ? 1 : -1)))
                    )));
                  }
                }
              ),
              F && V.trim() ? /* @__PURE__ */ i(
                "button",
                {
                  type: "button",
                  disabled: T.disabled,
                  "aria-label": "Clear input",
                  className: d(
                    "inline-flex size-5 items-center justify-center text-text-secondary [&_svg]:size-4",
                    re[z]
                  ),
                  onMouseDown: (D) => D.preventDefault(),
                  onClick: () => {
                    K(""), x(!1), f(""), L.current?.focus();
                  },
                  children: /* @__PURE__ */ i(Na, { className: "size-4", "aria-hidden": "true" })
                }
              ) : o ? /* @__PURE__ */ i(
                "span",
                {
                  "aria-hidden": "true",
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    re[z]
                  ),
                  children: o
                }
              ) : null
            ]
          }
        ),
        m.length > 0 && /* @__PURE__ */ i("ul", { id: p, role: "listbox", className: ba, children: m.map((D, ae) => /* @__PURE__ */ i(
          "li",
          {
            id: `${p}-${ae}`,
            role: "option",
            "aria-selected": M === ae,
            className: d(
              "cursor-pointer px-4 py-2 hover:bg-action-hover",
              M === ae && "bg-action-selected"
            ),
            onMouseDown: (ee) => ee.preventDefault(),
            onClick: () => Y(D),
            children: D
          },
          D
        )) }),
        _ && /* @__PURE__ */ i(
          "p",
          {
            id: j,
            role: a ? "alert" : void 0,
            "aria-live": "polite",
            className: a ? Ie : "mt-1 text-13 text-text-secondary",
            children: _
          }
        )
      ]
    }
  );
}
function Vr({
  className: e,
  label: a,
  iconLeft: r,
  iconRight: t,
  size: o = "md",
  width: l = "default",
  variant: s = "default",
  tone: n = "primary",
  outline: u = !1,
  shape: c = "rectangle",
  children: f,
  ...b
}) {
  const k = we(s, n), E = u ? "outline" : Ne[s];
  return /* @__PURE__ */ w(
    "button",
    {
      className: d(wr({ size: o, width: l, shape: c }), ne[k][E], e),
      "data-size": o,
      "data-variant": s,
      "data-tone": k,
      "data-width": l,
      "data-shape": c,
      "data-outline": u,
      ...b,
      children: [
        r && /* @__PURE__ */ i("span", { className: "inline-flex size-5 shrink-0 items-center justify-center", "aria-hidden": "true", children: r }),
        f ?? a,
        t && /* @__PURE__ */ i("span", { className: "inline-flex size-5 shrink-0 items-center justify-center", "aria-hidden": "true", children: t })
      ]
    }
  );
}
const $a = {
  default: "text-text-primary",
  muted: "text-text-secondary",
  ...be((e) => e.text),
  inverse: "text-misc-bg-white"
}, Sr = {
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold"
}, Nr = {
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
function ka(e) {
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
function Pa({
  level: e,
  variant: a = "h4",
  weight: r = "bold",
  family: t,
  color: o,
  tone: l = "default",
  textTransform: s = "none",
  className: n,
  children: u,
  ...c
}) {
  const f = e ?? a;
  return /* @__PURE__ */ i(
    f,
    {
      className: d(
        "m-0 font-sans",
        Nr[f],
        ha[r],
        $a[o ? ka(o) : l],
        xa[s],
        n
      ),
      ...c,
      children: u
    }
  );
}
const de = (e) => e.id || e.src, Ee = (e, a) => e.alt.trim() || `Product image ${a + 1}`, ve = "inline-flex size-8 shrink-0 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-45";
function Lr(e, a) {
  if (!Number.isInteger(e))
    throw new RangeError("Carousel initialIndex must be a finite integer.");
  return Math.min(Math.max(e, 0), Math.max(a - 1, 0));
}
function Kr({
  images: e,
  className: a,
  likeButton: r = !0,
  variant: t = "outline",
  tone: o = "primary",
  initialIndex: l = 0,
  onImageChange: s,
  showThumbnails: n = !0,
  thumbnailsPosition: u = "bottom",
  showIndicators: c = !0,
  ariaLabel: f = "Product image gallery",
  ofText: b = "of",
  breakpoint: k = "desktop",
  openOnClick: E = !0
}) {
  const R = pe(), [I, y] = Z(() => Lr(l, e.length)), [P, C] = Z(!1), [T, S] = Z(0), [L, A] = Z({}), B = te(null), W = te(null), z = te(null), G = Math.min(I, Math.max(0, e.length - 1)), N = e[G], p = u === "bottom" ? 8 : 5, _ = k === "mobile", j = _ ? "10rem" : k === "tablet" ? "15rem" : "25rem", Q = t === "primary" || t === "secondary", K = we(t, o), F = Ne[t], X = d(ue[K], "focus-visible:outline-current"), g = Q ? d("bg-background-surface hover:bg-action-hover", X) : ne[K][F], x = Q ? "border border-border-subtle bg-background-surface text-text-primary" : ne[K][F];
  if (me(() => {
    y((h) => Math.min(h, Math.max(e.length - 1, 0))), S((h) => Math.min(h, Math.max(e.length - p, 0))), e.length || C(!1);
  }, [e.length, p]), me(() => {
    if (!P) return;
    const h = W.current;
    B.current?.focus();
    const m = (Y) => {
      if (Y.key === "Escape" && C(!1), Y.key === "Tab" && z.current) {
        const D = z.current.querySelectorAll('button:not(:disabled), [tabindex="0"]'), ae = D[0], ee = D[D.length - 1];
        Y.shiftKey && document.activeElement === ae ? (Y.preventDefault(), ee?.focus()) : !Y.shiftKey && document.activeElement === ee && (Y.preventDefault(), ae?.focus());
      }
    };
    return document.addEventListener("keydown", m), () => {
      document.removeEventListener("keydown", m), h?.focus();
    };
  }, [P]), !N)
    return /* @__PURE__ */ i(
      "div",
      {
        className: d("rounded-md px-4 py-6 text-center font-sans text-13", x, a),
        "data-variant": t,
        "data-tone": K,
        children: "No product images available."
      }
    );
  const M = (h) => S((m) => h < m ? h : h >= m + p ? h - p + 1 : m), J = (h) => {
    const m = (h + e.length) % e.length;
    y(m), M(m), s?.(m, e[m]);
  }, V = (h) => {
    W.current = h, M(G), C(!0);
  }, q = d(
    "min-w-0",
    n && u !== "bottom" && !_ && (u === "left" ? "grid grid-cols-[var(--carousel-thumb-size)_minmax(0,1fr)] gap-4" : "grid grid-cols-[minmax(0,1fr)_var(--carousel-thumb-size)] gap-4")
  ), $ = u === "bottom" ? { gridTemplateColumns: `repeat(${Math.min(p, e.length)}, var(--carousel-thumb-size))` } : { gridTemplateRows: `repeat(${Math.min(p, e.length)}, var(--carousel-thumb-size))` }, v = (h, m = !1) => {
    if (!n || _ || u !== h) return null;
    const Y = m ? T : 0, D = e.length - p + 1, ae = /* @__PURE__ */ i(
      "div",
      {
        className: d("grid gap-2.5 overflow-hidden p-1", h === "bottom" ? "justify-center" : "content-start"),
        style: $,
        children: e.slice(Y, Y + p).map((ee, Ke) => {
          const ye = Y + Ke, $e = !m && E && e.length > p && Ke === p - 1;
          return /* @__PURE__ */ w(
            "button",
            {
              type: "button",
              className: d(
                "relative aspect-square w-full overflow-hidden rounded-md border border-border-subtle bg-background-surface p-0 leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                X,
                !$e && G === ye && "border-current ring-2 ring-current ring-offset-2 ring-offset-background-surface"
              ),
              "aria-label": $e ? `Open image gallery (${D} more)` : `Select ${Ee(ee, ye)}`,
              "aria-current": !$e && G === ye ? "true" : void 0,
              onClick: (Ta) => {
                $e ? V(Ta.currentTarget) : J(ye);
              },
              children: [
                /* @__PURE__ */ i(
                  "img",
                  {
                    src: ee.thumbnailSrc || ee.src,
                    alt: "",
                    "aria-hidden": "true",
                    className: "block size-full object-cover"
                  }
                ),
                $e && /* @__PURE__ */ w("span", { className: "absolute inset-0 flex items-center justify-center bg-backdrop-overlay text-13 font-semibold text-misc-bg-white", children: [
                  "+",
                  D
                ] })
              ]
            },
            `${de(ee)}-${ye}`
          );
        })
      }
    );
    return m ? /* @__PURE__ */ w(
      "div",
      {
        className: d(
          "grid items-center gap-2.5",
          h === "bottom" ? "grid-cols-[auto_minmax(0,1fr)_auto]" : "content-start"
        ),
        children: [
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: d(ve, g, "justify-self-center"),
              "aria-label": "Previous thumbnails",
              disabled: T <= 0,
              onClick: () => S((ee) => Math.max(0, ee - 1)),
              children: h === "bottom" ? /* @__PURE__ */ i(qe, { className: "size-4" }) : /* @__PURE__ */ i(na, { className: "size-4" })
            }
          ),
          ae,
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: d(ve, g, "justify-self-center"),
              "aria-label": "Next thumbnails",
              disabled: T + p >= e.length,
              onClick: () => S((ee) => Math.min(e.length - p, ee + 1)),
              children: h === "bottom" ? /* @__PURE__ */ i(He, { className: "size-4" }) : /* @__PURE__ */ i(We, { className: "size-4" })
            }
          )
        ]
      }
    ) : ae;
  }, H = (h = !1) => /* @__PURE__ */ w(
    "div",
    {
      className: "relative flex w-full min-w-0 items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-background-surface",
      style: { height: j },
      children: [
        N.badge && /* @__PURE__ */ i(
          "span",
          {
            className: d(
              "absolute left-4 top-4 z-10 rounded-md px-2 py-1 text-12 font-semibold text-misc-bg-white",
              ne[K].solid
            ),
            children: N.badge
          }
        ),
        r && N.likeButton !== !1 && /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: d(
              ve,
              L[de(N)] ? ne.error.label : g,
              "absolute right-4 top-4 z-10 rounded-full"
            ),
            "aria-label": L[de(N)] ? "Remove from favorites" : "Add to favorites",
            "aria-pressed": !!L[de(N)],
            onClick: () => A((m) => ({ ...m, [de(N)]: !m[de(N)] })),
            children: /* @__PURE__ */ i(La, { className: "size-6", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ i(
          "img",
          {
            src: N.src,
            alt: Ee(N, G),
            className: d("block size-full object-cover", !h && E && "cursor-zoom-in"),
            ...!h && E ? {
              role: "button",
              "aria-label": `Open image gallery: ${Ee(N, G)}`,
              tabIndex: 0,
              onClick: (m) => V(m.currentTarget),
              onKeyDown: (m) => {
                (m.key === "Enter" || m.key === " ") && (m.preventDefault(), V(m.currentTarget));
              }
            } : {}
          }
        ),
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            "aria-label": "Previous image",
            className: d(ve, g, "absolute left-4 top-1/2 -translate-y-1/2"),
            onClick: () => J(G - 1),
            children: /* @__PURE__ */ i(qe, { className: "size-4", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            "aria-label": "Next image",
            className: d(ve, g, "absolute right-4 top-1/2 -translate-y-1/2"),
            onClick: () => J(G + 1),
            children: /* @__PURE__ */ i(He, { className: "size-4", "aria-hidden": "true" })
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ w(
    "section",
    {
      "aria-label": f,
      className: d("grid w-full min-w-0 gap-4 rounded-md p-6 font-sans", x, a),
      "data-variant": t,
      "data-tone": K,
      style: {
        "--carousel-thumb-size": _ ? "3.25rem" : k === "tablet" ? "3.75rem" : "4.5rem"
      },
      children: [
        /* @__PURE__ */ w("div", { className: q, children: [
          v("left"),
          H(),
          v("right")
        ] }),
        !_ && (c || n && u === "bottom") && /* @__PURE__ */ w("div", { className: "grid gap-2 rounded-md border border-border-subtle p-4", children: [
          c && /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-2", children: e.map((h, m) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              "aria-label": `Go to image ${m + 1}`,
              "aria-current": G === m ? "true" : void 0,
              className: d(
                "size-2.5 rounded-full border border-border-subtle p-0",
                G === m ? ne[K].solid : "bg-background-surface"
              ),
              onClick: () => J(m)
            },
            `${de(h)}-${m}`
          )) }),
          v("bottom")
        ] }),
        P && /* @__PURE__ */ i(
          "div",
          {
            role: "presentation",
            className: "fixed inset-0 z-[1000] grid place-items-center bg-backdrop-overlay p-4",
            onClick: () => C(!1),
            children: /* @__PURE__ */ w(
              "div",
              {
                ref: z,
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": R,
                tabIndex: -1,
                onClick: (h) => h.stopPropagation(),
                className: d(
                  "grid max-h-[90dvh] w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-md border border-border-subtle bg-background-surface",
                  k === "tablet" ? "max-w-3xl" : _ ? "max-h-dvh" : "max-w-5xl"
                ),
                children: [
                  /* @__PURE__ */ w("div", { className: "flex items-center justify-between gap-4 border-b border-border-subtle p-4", children: [
                    /* @__PURE__ */ i(
                      Pa,
                      {
                        id: R,
                        level: "h4",
                        weight: "medium",
                        children: `Image gallery: ${G + 1} ${b} ${e.length}`
                      }
                    ),
                    /* @__PURE__ */ i(
                      "button",
                      {
                        ref: B,
                        type: "button",
                        "aria-label": "Close image gallery",
                        className: d(ve, g),
                        onClick: () => C(!1),
                        children: /* @__PURE__ */ i("span", { "aria-hidden": "true", children: "✕" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ w("div", { className: d("grid gap-4 overflow-auto p-4", _ && "gap-2 p-2"), children: [
                    /* @__PURE__ */ w("div", { className: q, children: [
                      v("left", !0),
                      H(!0),
                      v("right", !0)
                    ] }),
                    v("bottom", !0)
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
function _r({
  className: e,
  inputClassName: a,
  label: r,
  helperText: t,
  error: o,
  variant: l = "outlined",
  tone: s = "primary",
  size: n = "normal",
  iconLeft: u,
  iconRight: c,
  outsideIconLeft: f,
  outsideIconRight: b,
  handleActions: k,
  id: E,
  type: R = "text",
  "aria-describedby": I,
  onFocus: y,
  onBlur: P,
  onChange: C,
  value: T,
  defaultValue: S,
  disabled: L,
  required: A,
  ...B
}) {
  const W = pe(), z = E ?? W, [G, N] = Z(!1), [p, _] = Z(S ?? ""), j = te(null), [Q, K] = Z(), F = String(T ?? p).length > 0, X = F || !B.placeholder, { appearance: g, accent: x } = Oe(l, s, o), M = !!(r && F && g === "outlined"), J = !!(r && F && g === "outlined" && Q !== void 0), V = De({ disabled: L, error: o, active: G, accent: x }), q = o ?? t, $ = `${z}-${o ? "error" : "helper"}`, v = [I, q ? $ : void 0].filter(Boolean).join(" ") || void 0;
  me(() => {
    if (!r || !F || g !== "outlined") return;
    const h = j.current?.offsetWidth;
    h && K(h);
  }, [g, F, r, A]);
  const H = (h) => k ? /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      disabled: L,
      onClick: k,
      className: d(
        "inline-flex min-w-[26px] items-center justify-center self-stretch disabled:opacity-45 [&_svg]:size-[26px]",
        ue[x]
      ),
      "aria-label": `${r ?? "Input"} action`,
      children: h
    }
  ) : /* @__PURE__ */ i(
    "span",
    {
      "aria-hidden": "true",
      className: d(
        "inline-flex min-w-[26px] items-center justify-center self-stretch [&_svg]:size-[26px]",
        ue[x]
      ),
      children: h
    }
  );
  return /* @__PURE__ */ w("div", { className: d("w-full max-w-sm font-sans", e), children: [
    /* @__PURE__ */ w("div", { className: "flex items-stretch gap-2", children: [
      f && H(f),
      /* @__PURE__ */ w("div", { className: "relative min-w-0 flex-1", children: [
        r && g === "standard" && F && X && /* @__PURE__ */ i(
          se,
          {
            ref: j,
            htmlFor: z,
            required: A,
            className: d("absolute left-0 top-0 z-10 mb-0 pl-4", V),
            children: r
          }
        ),
        /* @__PURE__ */ w(
          "div",
          {
            className: d(
              Ge({
                variant: g,
                size: n,
                disabled: L,
                iconLeft: !!u,
                iconRight: !!c,
                notched: J
              }),
              "group",
              M && "mt-2 bg-background-surface",
              r && F && g === "standard" && "mt-2",
              !L && ze[x]
            ),
            children: [
              J && Q !== void 0 && /* @__PURE__ */ i(Be, { width: Q, accent: x, disabled: L }),
              r && !(g === "standard" && F && X) && /* @__PURE__ */ i(
                se,
                {
                  ref: j,
                  htmlFor: z,
                  required: A,
                  className: d(
                    Le({ appearance: g, floating: F, visible: X, iconLeft: !!u, size: n }),
                    V
                  ),
                  children: r
                }
              ),
              u && /* @__PURE__ */ i(
                "span",
                {
                  "aria-hidden": "true",
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    re[g]
                  ),
                  children: u
                }
              ),
              /* @__PURE__ */ i(
                "input",
                {
                  ...B,
                  id: z,
                  type: R,
                  disabled: L,
                  required: A,
                  value: T,
                  defaultValue: S,
                  "aria-describedby": v,
                  "aria-invalid": o ? !0 : B["aria-invalid"],
                  className: d(
                    Fe,
                    !F && re[g],
                    g === "filled" && F && r && "self-stretch py-0 pt-[18px]",
                    a
                  ),
                  onFocus: (h) => {
                    N(!0), y?.(h);
                  },
                  onBlur: (h) => {
                    N(!1), P?.(h);
                  },
                  onChange: (h) => {
                    _(h.target.value), C?.(h);
                  }
                }
              ),
              c && /* @__PURE__ */ i(
                "span",
                {
                  "aria-hidden": "true",
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    re[g]
                  ),
                  children: c
                }
              )
            ]
          }
        )
      ] }),
      b && H(b)
    ] }),
    q && /* @__PURE__ */ i(
      "p",
      {
        id: $,
        role: o ? "alert" : void 0,
        "aria-live": "polite",
        className: d(o ? Ie : "mt-1 text-13 text-text-secondary"),
        children: q
      }
    )
  ] });
}
function Ur({
  className: e,
  label: a,
  helperText: r,
  error: t,
  variant: o = "outlined",
  tone: l = "primary",
  size: s = "normal",
  id: n,
  "aria-describedby": u,
  ...c
}) {
  const f = pe(), { appearance: b, accent: k } = Oe(o, l, t), E = n ?? f, R = t ?? r, I = `${E}-${t ? "error" : "helper"}`, y = te(null), [P, C] = Z(), [T, S] = Z(!1), [L, A] = Z(String(c.defaultValue ?? "")), B = String(c.value ?? L).length > 0, W = B || !c.placeholder, z = !!(a && B && b === "outlined"), G = !!(z && P !== void 0), N = De({ disabled: c.disabled, error: t, active: T, accent: k });
  return me(() => {
    if (!a || !B || b !== "outlined") return;
    const p = y.current?.offsetWidth;
    p && C(p);
  }, [b, B, a, c.required]), /* @__PURE__ */ w("div", { className: d("relative w-full max-w-sm font-sans", e), children: [
    a && b === "standard" && B && W && /* @__PURE__ */ i(
      se,
      {
        ref: y,
        htmlFor: E,
        required: c.required,
        className: d("absolute left-0 top-0 z-10 mb-0 pl-4", N),
        children: a
      }
    ),
    /* @__PURE__ */ w(
      "div",
      {
        className: d(
          Ge({ variant: b, size: s, disabled: c.disabled, notched: G }),
          "items-start",
          z && "group mt-2 bg-background-surface",
          a && B && b === "standard" && "mt-2",
          !c.disabled && ze[k]
        ),
        children: [
          G && P !== void 0 && /* @__PURE__ */ i(Be, { width: P, accent: k, disabled: c.disabled }),
          a && !(b === "standard" && B && W) && /* @__PURE__ */ i(
            se,
            {
              ref: y,
              htmlFor: E,
              required: c.required,
              className: d(
                Le({ appearance: b, floating: B, visible: W, multiline: !0 }),
                N
              ),
              children: a
            }
          ),
          /* @__PURE__ */ i(
            "textarea",
            {
              ...c,
              id: E,
              value: c.value,
              defaultValue: c.defaultValue,
              "aria-invalid": t ? !0 : c["aria-invalid"],
              "aria-describedby": [u, R && I].filter(Boolean).join(" ") || void 0,
              className: d(
                Fe,
                "min-h-12 resize-y",
                B && b === "filled" && a && "pt-5 pb-[3px] focus:pb-[2px]",
                B && b !== "filled" && a && "pt-4",
                B && b === "standard" && a && "pb-[7px] focus:pb-[6px]"
              ),
              onFocus: (p) => {
                S(!0), c.onFocus?.(p);
              },
              onBlur: (p) => {
                S(!1), c.onBlur?.(p);
              },
              onChange: (p) => {
                A(p.target.value), c.onChange?.(p);
              }
            }
          )
        ]
      }
    ),
    R && /* @__PURE__ */ i(
      "p",
      {
        id: I,
        role: t ? "alert" : void 0,
        "aria-live": "polite",
        className: t ? Ie : "mt-1 text-13 text-text-secondary",
        children: R
      }
    )
  ] });
}
function qr({
  className: e,
  label: a,
  placeholder: r,
  helperText: t,
  error: o,
  variant: l = "outlined",
  tone: s = "primary",
  size: n = "normal",
  iconLeft: u,
  showSelectionCheck: c = !1,
  id: f,
  children: b,
  defaultValue: k,
  value: E,
  onChange: R,
  "aria-describedby": I,
  ...y
}) {
  const P = pe(), { appearance: C, accent: T } = Oe(l, s, o), S = f ?? P, L = te(null), A = te(null), B = oa.toArray(b).filter(la), [W, z] = Z(String(k ?? B[0]?.props.value ?? "")), [G, N] = Z(!1), p = String(E ?? W), _ = B.find((v) => String(v.props.value ?? "") === p), j = p.length > 0 || !r && !!_?.props.children, Q = j || !r, K = !!(a && j && C === "outlined"), F = !!K, X = o ?? t, g = `${S}-${o ? "error" : "helper"}`, x = [I, X && g].filter(Boolean).join(" ") || void 0, [M, J] = Z(), V = te(null), q = De({ disabled: y.disabled, error: o, active: G, accent: T });
  me(() => {
    if (!a || !j || C !== "outlined") return;
    const v = V.current?.offsetWidth;
    v && J(v);
  }, [C, j, a, y.required]);
  const $ = (v) => {
    z(v), N(!1), L.current && (L.current.value = v, L.current.dispatchEvent(new Event("change", { bubbles: !0 }))), A.current?.focus();
  };
  return /* @__PURE__ */ w(
    "div",
    {
      className: d("relative w-full max-w-sm font-sans", e),
      onBlur: (v) => {
        v.currentTarget.contains(v.relatedTarget) || N(!1);
      },
      children: [
        a && C === "standard" && j && Q && /* @__PURE__ */ i(
          se,
          {
            ref: V,
            id: `${S}-label`,
            htmlFor: S,
            required: y.required,
            className: d("absolute left-0 top-0 z-10 mb-0 pl-4", q),
            children: a
          }
        ),
        /* @__PURE__ */ i(
          "select",
          {
            ...y,
            size: typeof n == "number" ? n : void 0,
            id: S,
            ref: L,
            className: "sr-only",
            tabIndex: -1,
            value: p,
            "aria-describedby": x,
            "aria-invalid": o ? !0 : y["aria-invalid"],
            onChange: (v) => {
              z(v.target.value), R?.(v);
            },
            children: b
          }
        ),
        /* @__PURE__ */ w(
          "button",
          {
            ref: A,
            type: "button",
            disabled: y.disabled,
            "aria-labelledby": a ? `${S}-label` : void 0,
            "aria-label": a ? void 0 : y["aria-label"] ?? r ?? "Select an option",
            "aria-describedby": x,
            "aria-haspopup": "listbox",
            "aria-expanded": G,
            "aria-controls": `${S}-options`,
            "aria-invalid": o ? !0 : void 0,
            className: d(
              Ge({
                variant: C,
                size: typeof n == "number" ? "normal" : n,
                disabled: y.disabled,
                iconLeft: !!u,
                iconRight: !0,
                notched: F
              }),
              "group text-left",
              K && "group mt-2 bg-background-surface",
              a && j && C === "standard" && "mt-2",
              !y.disabled && ze[T]
            ),
            onClick: () => N((v) => !v),
            onKeyDown: (v) => {
              v.key === "Escape" && N(!1), v.key === "ArrowDown" && (v.preventDefault(), N(!0));
            },
            onBlur: (v) => {
              v.currentTarget.parentElement?.contains(v.relatedTarget) || N(!1);
            },
            children: [
              F && M !== void 0 && /* @__PURE__ */ i(Be, { width: M, accent: T, disabled: y.disabled }),
              a && !(C === "standard" && j && Q) && /* @__PURE__ */ i(
                se,
                {
                  ref: V,
                  id: `${S}-label`,
                  htmlFor: S,
                  required: y.required,
                  className: d(
                    Le({ appearance: C, floating: j, visible: Q, iconLeft: !!u, size: n }),
                    q
                  ),
                  children: a
                }
              ),
              u && /* @__PURE__ */ i(
                "span",
                {
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center [&_svg]:size-5",
                    re[C]
                  ),
                  "aria-hidden": "true",
                  children: u
                }
              ),
              /* @__PURE__ */ i(
                "span",
                {
                  className: d(
                    "flex flex-1 items-center py-2 leading-5",
                    !j && re[C],
                    C === "filled" && j && a && "self-stretch py-0 pt-[18px]"
                  ),
                  children: _?.props.children ?? r ?? "Select an option"
                }
              ),
              /* @__PURE__ */ i(
                "span",
                {
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center",
                    re[C]
                  ),
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ i(We, { className: "size-4" })
                }
              )
            ]
          }
        ),
        G && /* @__PURE__ */ i("ul", { id: `${S}-options`, role: "listbox", "aria-label": a ?? "Options", className: ba, children: B.map((v) => {
          const H = String(v.props.value ?? ""), h = H !== "" && H === p;
          return /* @__PURE__ */ w(
            "li",
            {
              role: "option",
              "aria-selected": h,
              "aria-disabled": v.props.disabled,
              tabIndex: v.props.disabled ? void 0 : 0,
              className: d(
                "flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-action-hover focus:bg-action-hover focus:outline-none",
                h && "bg-action-selected",
                v.props.disabled && "cursor-not-allowed text-text-disabled"
              ),
              onMouseDown: (m) => m.preventDefault(),
              onClick: () => {
                v.props.disabled || $(H);
              },
              onKeyDown: (m) => {
                !v.props.disabled && (m.key === "Enter" || m.key === " ") && (m.preventDefault(), $(H)), m.key === "Escape" && (N(!1), A.current?.focus());
              },
              children: [
                v.props.children,
                c && h && /* @__PURE__ */ i(Oa, { className: d("size-4", ue[T]), "aria-hidden": "true" })
              ]
            },
            H
          );
        }) }),
        X && /* @__PURE__ */ i(
          "p",
          {
            id: g,
            role: o ? "alert" : void 0,
            "aria-live": "polite",
            className: o ? Ie : "mt-1 text-13 text-text-secondary",
            children: X
          }
        )
      ]
    }
  );
}
const Or = (e) => [e, ...fa.filter((a) => a !== e)].map((a) => Te(a)), Hr = ({
  type: e = "line",
  tone: a = "primary",
  data: r,
  series: t,
  colors: o,
  gridColor: l,
  textColor: s,
  tooltipBgColor: n,
  tooltipBorderColor: u,
  xAxisKey: c = "name",
  title: f,
  description: b,
  ariaLabel: k,
  height: E = 300,
  strokeWidth: R = 2,
  dot: I = { r: 4 },
  activeDot: y = { r: 6 },
  fillOpacity: P = 0.2,
  barRadius: C = [4, 4, 0, 0],
  outerRadius: T = 80,
  innerRadius: S,
  showGrid: L = !0,
  showTooltip: A = !0,
  showLegend: B = !0,
  isAnimationActive: W = !0,
  className: z
}) => {
  const G = pe(), N = `${G}-title`, p = `${G}-desc`, _ = _e(() => o && o.length > 0 ? o : Or(a), [o, a]), j = Ue(
    ($, v) => $.color || _[v % _.length],
    [_]
  ), { gridColor: Q, textColor: K, customTooltipStyle: F, tooltipItemStyle: X, tooltipLabelStyle: g, axisTickStyle: x, legendStyle: M } = _e(() => {
    const $ = l || "var(--border-subtle)", v = s || "var(--text-primary)", H = n || "var(--background-surface)", h = u || "var(--border-subtle)", m = "var(--font-family)", Y = "var(--font-size-13)";
    return {
      gridColor: $,
      textColor: v,
      customTooltipStyle: {
        backgroundColor: H,
        borderColor: h,
        borderRadius: "var(--radius-md)",
        color: v,
        fontSize: Y,
        fontFamily: m
      },
      tooltipItemStyle: {
        color: v,
        fontSize: Y,
        fontFamily: m
      },
      tooltipLabelStyle: {
        color: Te(a),
        fontSize: Y,
        fontFamily: m,
        fontWeight: 600
      },
      axisTickStyle: {
        fill: v,
        fontSize: Y,
        fontFamily: m
      },
      legendStyle: {
        color: v,
        fontSize: Y,
        fontFamily: m
      }
    };
  }, [l, s, n, u, a]), J = Ue(
    ($) => /* @__PURE__ */ i("span", { style: { color: K }, children: $ }),
    [K]
  ), V = () => [
    L ? /* @__PURE__ */ i(Wa, { strokeDasharray: "3 3", stroke: Q }, "grid") : null,
    /* @__PURE__ */ i(ja, { dataKey: c, stroke: K, tick: x }, "xaxis"),
    /* @__PURE__ */ i(Fa, { stroke: K, tick: x }, "yaxis"),
    A ? /* @__PURE__ */ i(
      Xe,
      {
        isAnimationActive: W,
        contentStyle: F,
        itemStyle: X,
        labelStyle: g
      },
      "tooltip"
    ) : null,
    B ? /* @__PURE__ */ i(Je, { wrapperStyle: M, formatter: J }, "legend") : null
  ], q = () => {
    switch (e) {
      case "pie": {
        const v = t[0]?.dataKey || "value", H = c || "name", h = r.map((m, Y) => ({
          ...m,
          fill: m.fill || m.color || t[Y]?.color || _[Y % _.length]
        }));
        return /* @__PURE__ */ w(Ma, { children: [
          A && /* @__PURE__ */ i(
            Xe,
            {
              isAnimationActive: W,
              contentStyle: F,
              itemStyle: X,
              labelStyle: g
            }
          ),
          B && /* @__PURE__ */ i(Je, { wrapperStyle: M, formatter: J }),
          /* @__PURE__ */ i(
            Ra,
            {
              isAnimationActive: W,
              data: h,
              dataKey: v,
              nameKey: H,
              cx: "50%",
              cy: "50%",
              innerRadius: S,
              outerRadius: T,
              label: !0
            }
          )
        ] });
      }
      case "bar":
        return /* @__PURE__ */ w(Aa, { data: r, children: [
          V(),
          t.map(($, v) => /* @__PURE__ */ i(
            Ea,
            {
              isAnimationActive: W,
              dataKey: $.dataKey,
              name: $.name || $.dataKey,
              fill: j($, v),
              radius: $.radius ?? C
            },
            $.dataKey
          ))
        ] });
      case "area":
        return /* @__PURE__ */ w(Ia, { data: r, children: [
          V(),
          t.map(($, v) => {
            const H = j($, v);
            return /* @__PURE__ */ i(
              Ba,
              {
                isAnimationActive: W,
                type: "monotone",
                dataKey: $.dataKey,
                name: $.name || $.dataKey,
                stroke: H,
                strokeWidth: $.strokeWidth ?? R,
                fill: H,
                fillOpacity: $.fillOpacity ?? P
              },
              $.dataKey
            );
          })
        ] });
      default:
        return /* @__PURE__ */ w(Da, { data: r, children: [
          V(),
          t.map(($, v) => /* @__PURE__ */ i(
            Ga,
            {
              isAnimationActive: W,
              type: "monotone",
              dataKey: $.dataKey,
              name: $.name || $.dataKey,
              stroke: j($, v),
              strokeWidth: $.strokeWidth ?? R,
              dot: $.dot ?? I,
              activeDot: $.activeDot ?? y
            },
            $.dataKey
          ))
        ] });
    }
  };
  return /* @__PURE__ */ w(
    "div",
    {
      className: d(
        "w-full rounded-md border border-border-subtle bg-background-surface p-6 font-sans text-text-primary",
        z
      ),
      "data-tone": a,
      role: "region",
      "aria-label": f ? void 0 : k || "Chart",
      "aria-labelledby": f ? N : void 0,
      "aria-describedby": b ? p : void 0,
      children: [
        (f || b) && /* @__PURE__ */ w("div", { className: "mb-4", children: [
          f && /* @__PURE__ */ i(Pa, { id: N, level: "h3", weight: "semiBold", children: f }),
          b && /* @__PURE__ */ i("p", { className: "mt-1 text-13 text-text-secondary", id: p, children: b })
        ] }),
        /* @__PURE__ */ i("div", { className: "sr-only", children: /* @__PURE__ */ w("table", { "aria-label": f ? `${f} data` : k || "Chart data", children: [
          /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ w("tr", { children: [
            /* @__PURE__ */ i("th", { scope: "col", children: c }),
            t.map(($) => /* @__PURE__ */ i("th", { scope: "col", children: $.name || $.dataKey }, $.dataKey))
          ] }) }),
          /* @__PURE__ */ i("tbody", { children: r.map(($, v) => /* @__PURE__ */ w("tr", { children: [
            /* @__PURE__ */ i("td", { children: String($[c] ?? "") }),
            t.map((H) => /* @__PURE__ */ i("td", { children: String($[H.dataKey] ?? "") }, H.dataKey))
          ] }, v)) })
        ] }) }),
        /* @__PURE__ */ i(
          "div",
          {
            className: "min-h-48 w-full rounded-md bg-background-surface text-text-primary",
            style: { height: E },
            ...ya(!1, `${f || k || "Chart"} visualization`),
            children: /* @__PURE__ */ i(za, { width: "100%", height: "100%", children: q() })
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
function Xr({
  size: e,
  variant: a = "body1",
  weight: r,
  family: t,
  color: o,
  tone: l = "default",
  textTransform: s = "none",
  className: n,
  children: u,
  ...c
}) {
  const f = o ? ka(o === "text" ? "default" : o) : l;
  return /* @__PURE__ */ i(
    "p",
    {
      className: d(
        "m-0 font-sans",
        zr[e ?? ta[a].size],
        ha[r ?? ta[a].weight],
        $a[f],
        xa[s],
        a === "overline" && "uppercase tracking-wider",
        n
      ),
      ...c,
      children: u
    }
  );
}
function Dr({ pagination: e, size: a, tone: r }) {
  const { onPageChange: t, previousIcon: o, nextIcon: l, pageStatus: s } = e, n = Math.max(1, Math.ceil(Math.max(0, e.total) / Math.max(1, e.pageSize))), u = Math.min(Math.max(e.page, 1), n), c = d(
    "inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-13 font-semibold disabled:cursor-not-allowed disabled:opacity-45",
    ue[r],
    "hover:enabled:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
  );
  return /* @__PURE__ */ w(
    "nav",
    {
      "aria-label": "Table pagination",
      className: d(
        "flex items-center justify-end gap-2 border-t border-divider",
        a === "small" ? "px-4 py-3" : "px-4 py-4"
      ),
      children: [
        /* @__PURE__ */ w("button", { type: "button", onClick: () => t(u - 1), disabled: u <= 1, className: c, children: [
          o && /* @__PURE__ */ i("span", { className: "inline-flex size-4", "aria-hidden": "true", children: o }),
          /* @__PURE__ */ i("span", { children: "Previous" })
        ] }),
        s != null && /* @__PURE__ */ i("span", { "aria-live": "polite", className: "text-13 text-text-secondary", children: s }),
        /* @__PURE__ */ w(
          "button",
          {
            type: "button",
            onClick: () => t(u + 1),
            disabled: u >= n,
            className: c,
            children: [
              /* @__PURE__ */ i("span", { children: "Next" }),
              l && /* @__PURE__ */ i("span", { className: "inline-flex size-4", "aria-hidden": "true", children: l })
            ]
          }
        )
      ]
    }
  );
}
const Gr = { left: "text-left", center: "text-center", right: "text-right" }, Ir = {
  solid: "rounded-md",
  label: "rounded-md",
  outline: "rounded-md border",
  text: "rounded-none"
}, ia = be((e) => e.outline);
function Me(e) {
  const a = `var(--table-cell-overlay, ${e})`;
  return {
    backgroundColor: "var(--background-surface)",
    backgroundImage: `linear-gradient(${a}, ${a})`
  };
}
function Br(e) {
  return e ? la(e) && typeof e.props.onClick == "function" ? e : /* @__PURE__ */ i("span", { className: "inline-flex size-4 shrink-0 items-center justify-center", "aria-hidden": "true", children: e }) : null;
}
function Jr({
  className: e,
  columns: a,
  data: r,
  getRowKey: t,
  pagination: o,
  emptyMessage: l = "No results found.",
  variant: s = "outline",
  tone: n = "primary",
  size: u = "normal",
  stickyFirstColumn: c = !1,
  stickyLastColumn: f = !1,
  stickyHeader: b = !1,
  showColumnBorders: k = !1,
  striped: E = !1,
  breakpoint: R,
  ...I
}) {
  const [y, P] = Z(!1), [C, T] = Z(!1), S = we(s, n), L = a.some((g) => g.header != null && g.header !== ""), A = L ? Ne[s] : "label", B = ne[S][A], W = R !== "mobile", z = "bg-background-surface", G = (g) => W && c && g === 0, N = (g) => W && f && g === a.length - 1, p = (g) => G(g) || N(g), _ = {
    label: Te(S, "opacity-light"),
    solid: Te(S),
    outline: "transparent",
    text: "transparent"
  }, j = Me(_[A]), Q = Me("transparent"), K = Me("var(--action-hover)"), F = (g, x, M = 0) => {
    if (!(!p(g) && !(x && b)))
      return x ? j : E && M % 2 === 1 ? K : Q;
  }, X = (g, x) => d(
    "border-divider",
    u === "small" ? "px-4 py-3 text-13" : "px-4 py-4 text-[0.875rem] leading-[1.43]",
    Gr[g.align ?? "left"],
    k && x > 0 && !(W && c && x === 1) && !(W && f && x === a.length - 1) && "border-l",
    G(x) && "sticky left-0 z-10 after:pointer-events-none after:absolute after:inset-y-0 after:-right-1.5 after:w-1.5 after:bg-gradient-to-r after:from-action-focus after:to-transparent after:content-['']",
    !L && G(x) && !C && "border-r border-divider after:hidden",
    N(x) && "sticky right-0 z-10 before:pointer-events-none before:absolute before:inset-y-0 before:-left-1.5 before:w-1.5 before:bg-gradient-to-l before:from-action-focus before:to-transparent before:content-['']"
  );
  return /* @__PURE__ */ w(
    "div",
    {
      className: d(
        "w-full rounded-lg border border-border-subtle bg-background-surface p-4 font-sans shadow-sm",
        e
      ),
      "data-variant": L ? s : "label",
      "data-tone": S,
      "data-size": u,
      children: [
        /* @__PURE__ */ w("div", { className: "relative isolate", children: [
          /* @__PURE__ */ i(
            "div",
            {
              tabIndex: 0,
              role: "region",
              "aria-label": "Scrollable table",
              onScroll: (g) => {
                P(g.currentTarget.scrollTop > 0), T(g.currentTarget.scrollLeft > 0);
              },
              className: d(
                "overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-current",
                b && "max-h-80 overflow-auto",
                Ir[A],
                ia[S]
              ),
              children: /* @__PURE__ */ w(
                "table",
                {
                  ...I,
                  "aria-label": I["aria-label"] ?? "Data table",
                  className: d("w-max min-w-full border-separate border-spacing-0 text-text-primary", z),
                  children: [
                    L && /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ i("tr", { children: a.map((g, x) => /* @__PURE__ */ w(
                      "th",
                      {
                        scope: "col",
                        style: F(x, !0),
                        className: d(
                          X(g, x),
                          "z-10 border-b border-divider font-medium text-text-primary",
                          B,
                          A === "outline" && "border-x-0 border-t-0 border-b",
                          p(x) && "z-20",
                          b && "sticky top-0 z-20",
                          b && A !== "label" && "border-b-0",
                          b && p(x) && "z-30",
                          A !== "text" && "first:rounded-tl-md last:rounded-tr-md"
                        ),
                        children: [
                          /* @__PURE__ */ w("span", { className: "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-1", children: [
                            g.header,
                            Br(g.sortIcon)
                          ] }),
                          b && /* @__PURE__ */ i(
                            "span",
                            {
                              "aria-hidden": "true",
                              className: d(
                                "pointer-events-none absolute inset-x-0 -bottom-1.5 h-1.5 bg-gradient-to-b from-action-focus to-transparent",
                                A === "label" && !y && "hidden"
                              )
                            }
                          )
                        ]
                      },
                      g.key
                    )) }) }),
                    /* @__PURE__ */ i("tbody", { children: r.length ? r.map((g, x) => /* @__PURE__ */ i("tr", { className: "group", children: a.map((M, J) => {
                      const V = !L && J === 0, q = V ? "th" : "td", $ = M.fontWeight ?? ((!L || W && c) && J === 0 ? "semiBold" : "normal"), v = V ? B : d(z, E && x % 2 === 1 && "bg-action-hover");
                      return /* @__PURE__ */ i(
                        q,
                        {
                          scope: V ? "row" : void 0,
                          style: F(J, V, x),
                          className: d(
                            X(M, J),
                            "border-b border-divider align-middle",
                            v,
                            !V && "group-hover:bg-action-hover",
                            !V && p(J) && "group-hover:[--table-cell-overlay:var(--action-hover)]",
                            $ === "semiBold" ? "font-semibold" : "font-regular",
                            x === r.length - 1 && "border-b-0",
                            A !== "text" && !L && x === 0 && J === 0 && "rounded-tl-md",
                            A !== "text" && !L && x === 0 && J === a.length - 1 && "rounded-tr-md",
                            A !== "text" && V && x === r.length - 1 && "rounded-bl-md"
                          ),
                          children: M.render ? M.render(g, x) : String(g[M.key] ?? "")
                        },
                        M.key
                      );
                    }) }, t?.(g, x) ?? x)) : /* @__PURE__ */ i("tr", { children: /* @__PURE__ */ i(
                      "td",
                      {
                        colSpan: Math.max(a.length, 1),
                        className: d(
                          "text-center",
                          u === "small" ? "px-4 py-6 text-13" : "px-4 py-8 text-[0.875rem] leading-[1.43]"
                        ),
                        children: l
                      }
                    ) }) })
                  ]
                }
              )
            }
          ),
          L && A === "outline" && /* @__PURE__ */ i(
            "span",
            {
              "aria-hidden": "true",
              className: d("pointer-events-none absolute inset-0 z-40 rounded-md border", ia[S])
            }
          )
        ] }),
        o && /* @__PURE__ */ i(Dr, { pagination: o, size: u, tone: S })
      ]
    }
  );
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
}, wa = { Dark: "dark", Light: "light", Teal: "teal" };
function Ca(e) {
  const a = e.match(/^\{(.+)\}$/);
  if (!a) return e;
  let r = Se;
  for (const t of a[1].split(".")) {
    if (!r || typeof r != "object" || !(t in r))
      throw new Error(`Unknown token reference: ${e}`);
    r = r[t];
  }
  if (!r || typeof r != "object" || !("$value" in r) || typeof r.$value != "string")
    throw new Error(`Invalid token reference: ${e}`);
  return Ca(r.$value);
}
const Ve = (e) => Object.fromEntries(
  Object.entries(e).flatMap(([a, r]) => typeof r == "string" ? [] : [[a, Ca(r.$value)]])
), ce = (e, a = "") => Object.fromEntries(Object.entries(Ve(e)).map(([r, t]) => [r.replace(a, ""), t])), ke = (e, a = "") => Object.fromEntries(
  Object.entries(Ve(e)).map(([r, t]) => [r.replace(a, ""), Number.parseFloat(t)])
);
function Ar(e) {
  const a = Se.Variables[e], r = Se.Primitives[e], t = Ve(a["Color-Palette"]);
  return {
    core: {
      color: {
        primary: ce(r.Color.Primary, "primary-"),
        secondary: ce(r.Color.Secondary, "secondary-"),
        info: ce(r.Color.Info, "info-"),
        error: ce(r.Color.Error, "error-"),
        warning: ce(r.Color.Warning, "warning-"),
        success: ce(r.Color.Success, "success-"),
        gray: ce(r.Color.Gray, "gray-"),
        palette: t
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
const Ce = Object.fromEntries(
  Object.keys(Se.Variables).map((e) => [wa[e], Ar(e)])
), Yr = Object.values(wa), Zr = { core: Ce.light.core, semantic: Ce.light.semantic, themes: Ce }, Qr = (e) => Ce[e], et = { mobile: "640px", tablet: "900px", desktop: "1280px" };
export {
  jr as Accordion,
  Fr as Autocomplete,
  Xr as BodyText,
  Vr as Button,
  Kr as Carousel,
  Hr as Chart,
  Pa as Heading,
  _r as Input,
  se as LabelText,
  Xr as Paragraph,
  qr as Select,
  Jr as Table,
  Ur as Textarea,
  et as breakpoints,
  Ne as componentVariantAppearances,
  Qr as getThemeTokens,
  be as mapPaletteTones,
  Pr as paletteToneStyles,
  fa as paletteTones,
  we as resolveVariantTone,
  Yr as themeModes,
  Zr as themeTokens,
  Te as toneVar
};
