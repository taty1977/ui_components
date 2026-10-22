import { jsx as i, jsxs as k, Fragment as we } from "react/jsx-runtime";
import { useState as J, useId as ce, Children as Ye, useRef as re, useEffect as ge, isValidElement as Ze, useMemo as Ae, useCallback as Be } from "react";
import { ChevronUpIcon as Qe, ChevronDownIcon as Oe, XMarkIcon as fa, ChevronLeftIcon as Ee, ChevronRightIcon as Me, HeartIcon as ya, CheckIcon as $a } from "@heroicons/react/24/solid";
import { ResponsiveContainer as ha, LineChart as xa, Line as wa, AreaChart as ka, Area as Pa, BarChart as Ca, Bar as Ta, PieChart as Sa, Tooltip as Re, Legend as We, Pie as Na, CartesianGrid as La, XAxis as Oa, YAxis as za } from "recharts";
function ea(e) {
  var a, r, t = "";
  if (typeof e == "string" || typeof e == "number") t += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (a = 0; a < o; a++) e[a] && (r = ea(e[a])) && (t && (t += " "), t += r);
  } else for (r in e) e[r] && (t && (t += " "), t += r);
  return t;
}
function aa() {
  for (var e, a, r = 0, t = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (a = ea(e)) && (t && (t += " "), t += a);
  return t;
}
const ze = "-", Da = (e) => {
  const a = Ia(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: t
  } = e;
  return {
    getClassGroupId: (s) => {
      const n = s.split(ze);
      return n[0] === "" && n.length !== 1 && n.shift(), ra(n, a) || Ga(s);
    },
    getConflictingClassGroupIds: (s, n) => {
      const b = r[s] || [];
      return n && t[s] ? [...b, ...t[s]] : b;
    }
  };
}, ra = (e, a) => {
  if (e.length === 0)
    return a.classGroupId;
  const r = e[0], t = a.nextPart.get(r), o = t ? ra(e.slice(1), t) : void 0;
  if (o)
    return o;
  if (a.validators.length === 0)
    return;
  const l = e.join(ze);
  return a.validators.find(({
    validator: s
  }) => s(l))?.classGroupId;
}, je = /^\[(.+)\]$/, Ga = (e) => {
  if (je.test(e)) {
    const a = je.exec(e)[1], r = a?.substring(0, a.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, Ia = (e) => {
  const {
    theme: a,
    prefix: r
  } = e, t = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Ba(Object.entries(e.classGroups), r).forEach(([l, s]) => {
    Le(s, t, l, a);
  }), t;
}, Le = (e, a, r, t) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const l = o === "" ? a : Fe(a, o);
      l.classGroupId = r;
      return;
    }
    if (typeof o == "function") {
      if (Aa(o)) {
        Le(o(t), a, r, t);
        return;
      }
      a.validators.push({
        validator: o,
        classGroupId: r
      });
      return;
    }
    Object.entries(o).forEach(([l, s]) => {
      Le(s, Fe(a, l), r, t);
    });
  });
}, Fe = (e, a) => {
  let r = e;
  return a.split(ze).forEach((t) => {
    r.nextPart.has(t) || r.nextPart.set(t, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(t);
  }), r;
}, Aa = (e) => e.isThemeGetter, Ba = (e, a) => a ? e.map(([r, t]) => {
  const o = t.map((l) => typeof l == "string" ? a + l : typeof l == "object" ? Object.fromEntries(Object.entries(l).map(([s, n]) => [a + s, n])) : l);
  return [r, o];
}) : e, Ea = (e) => {
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
}, ta = "!", Ma = (e) => {
  const {
    separator: a,
    experimentalParseClassName: r
  } = e, t = a.length === 1, o = a[0], l = a.length, s = (n) => {
    const b = [];
    let c = 0, h = 0, y;
    for (let p = 0; p < n.length; p++) {
      let S = n[p];
      if (c === 0) {
        if (S === o && (t || n.slice(p, p + l) === a)) {
          b.push(n.slice(h, p)), h = p + l;
          continue;
        }
        if (S === "/") {
          y = p;
          continue;
        }
      }
      S === "[" ? c++ : S === "]" && c--;
    }
    const v = b.length === 0 ? n : n.substring(h), I = v.startsWith(ta), z = I ? v.substring(1) : v, T = y && y > h ? y - h : void 0;
    return {
      modifiers: b,
      hasImportantModifier: I,
      baseClassName: z,
      maybePostfixModifierPosition: T
    };
  };
  return r ? (n) => r({
    className: n,
    parseClassName: s
  }) : s;
}, Ra = (e) => {
  if (e.length <= 1)
    return e;
  const a = [];
  let r = [];
  return e.forEach((t) => {
    t[0] === "[" ? (a.push(...r.sort(), t), r = []) : r.push(t);
  }), a.push(...r.sort()), a;
}, Wa = (e) => ({
  cache: Ea(e.cacheSize),
  parseClassName: Ma(e),
  ...Da(e)
}), ja = /\s+/, Fa = (e, a) => {
  const {
    parseClassName: r,
    getClassGroupId: t,
    getConflictingClassGroupIds: o
  } = a, l = [], s = e.trim().split(ja);
  let n = "";
  for (let b = s.length - 1; b >= 0; b -= 1) {
    const c = s[b], {
      modifiers: h,
      hasImportantModifier: y,
      baseClassName: v,
      maybePostfixModifierPosition: I
    } = r(c);
    let z = !!I, T = t(z ? v.substring(0, I) : v);
    if (!T) {
      if (!z) {
        n = c + (n.length > 0 ? " " + n : n);
        continue;
      }
      if (T = t(v), !T) {
        n = c + (n.length > 0 ? " " + n : n);
        continue;
      }
      z = !1;
    }
    const p = Ra(h).join(":"), S = y ? p + ta : p, m = S + T;
    if (l.includes(m))
      continue;
    l.push(m);
    const $ = o(T, z);
    for (let P = 0; P < $.length; ++P) {
      const D = $[P];
      l.push(S + D);
    }
    n = c + (n.length > 0 ? " " + n : n);
  }
  return n;
};
function Va() {
  let e = 0, a, r, t = "";
  for (; e < arguments.length; )
    (a = arguments[e++]) && (r = ia(a)) && (t && (t += " "), t += r);
  return t;
}
const ia = (e) => {
  if (typeof e == "string")
    return e;
  let a, r = "";
  for (let t = 0; t < e.length; t++)
    e[t] && (a = ia(e[t])) && (r && (r += " "), r += a);
  return r;
};
function Ve(e, ...a) {
  let r, t, o, l = s;
  function s(b) {
    const c = a.reduce((h, y) => y(h), e());
    return r = Wa(c), t = r.cache.get, o = r.cache.set, l = n, n(b);
  }
  function n(b) {
    const c = t(b);
    if (c)
      return c;
    const h = Fa(b, r);
    return o(b, h), h;
  }
  return function() {
    return l(Va.apply(null, arguments));
  };
}
const _ = (e) => {
  const a = (r) => r[e] || [];
  return a.isThemeGetter = !0, a;
}, oa = /^\[(?:([a-z-]+):)?(.+)\]$/i, Ka = /^\d+\/\d+$/, _a = /* @__PURE__ */ new Set(["px", "full", "screen"]), Ua = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, qa = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ha = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Xa = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ja = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, te = (e) => pe(e) || _a.has(e) || Ka.test(e), ie = (e) => ve(e, "length", ir), pe = (e) => !!e && !Number.isNaN(Number(e)), Se = (e) => ve(e, "number", pe), be = (e) => !!e && Number.isInteger(Number(e)), Ya = (e) => e.endsWith("%") && pe(e.slice(0, -1)), C = (e) => oa.test(e), oe = (e) => Ua.test(e), Za = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Qa = (e) => ve(e, Za, la), er = (e) => ve(e, "position", la), ar = /* @__PURE__ */ new Set(["image", "url"]), rr = (e) => ve(e, ar, lr), tr = (e) => ve(e, "", or), fe = () => !0, ve = (e, a, r) => {
  const t = oa.exec(e);
  return t ? t[1] ? typeof a == "string" ? t[1] === a : a.has(t[1]) : r(t[2]) : !1;
}, ir = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  qa.test(e) && !Ha.test(e)
), la = () => !1, or = (e) => Xa.test(e), lr = (e) => Ja.test(e), Ke = () => {
  const e = _("colors"), a = _("spacing"), r = _("blur"), t = _("brightness"), o = _("borderColor"), l = _("borderRadius"), s = _("borderSpacing"), n = _("borderWidth"), b = _("contrast"), c = _("grayscale"), h = _("hueRotate"), y = _("invert"), v = _("gap"), I = _("gradientColorStops"), z = _("gradientColorStopPositions"), T = _("inset"), p = _("margin"), S = _("opacity"), m = _("padding"), $ = _("saturate"), P = _("scale"), D = _("sepia"), F = _("skew"), G = _("space"), q = _("translate"), w = () => ["auto", "contain", "none"], A = () => ["auto", "hidden", "clip", "visible", "scroll"], L = () => ["auto", C, a], g = () => [C, a], Z = () => ["", te, ie], R = () => ["auto", pe, C], U = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], H = () => ["solid", "dashed", "dotted", "double", "none"], W = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], X = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], O = () => ["", "0", C], V = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], x = () => [pe, C];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [fe],
      spacing: [te, ie],
      blur: ["none", "", oe, C],
      brightness: x(),
      borderColor: [e],
      borderRadius: ["none", "", "full", oe, C],
      borderSpacing: g(),
      borderWidth: Z(),
      contrast: x(),
      grayscale: O(),
      hueRotate: x(),
      invert: O(),
      gap: g(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Ya, ie],
      inset: L(),
      margin: L(),
      opacity: x(),
      padding: g(),
      saturate: x(),
      scale: x(),
      sepia: O(),
      skew: x(),
      space: g(),
      translate: g()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", C]
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
        columns: [oe]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": V()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": V()
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
        object: [...U(), C]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: A()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": A()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": A()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: w()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": w()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": w()
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
        inset: [T]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [T]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [T]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [T]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [T]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [T]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [T]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [T]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [T]
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
        z: ["auto", be, C]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: L()
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
        flex: ["1", "auto", "initial", "none", C]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: O()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: O()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", be, C]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [fe]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", be, C]
        }, C]
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
        "grid-rows": [fe]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [be, C]
        }, C]
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
        "auto-cols": ["auto", "min", "max", "fr", C]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", C]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [v]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [v]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [v]
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
        m: [p]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [p]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [p]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [p]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [p]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [p]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [p]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [p]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [p]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [G]
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
        "space-y": [G]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", C, a]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [C, a, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [C, a, "none", "full", "min", "max", "fit", "prose", {
          screen: [oe]
        }, oe]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [C, a, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [C, a, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [C, a, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [C, a, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", oe, ie]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Se]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [fe]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", C]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", pe, Se]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", te, C]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", C]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", C]
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
        "placeholder-opacity": [S]
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
        "text-opacity": [S]
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
        decoration: [...H(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", te, ie]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", te, C]
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
        indent: g()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", C]
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
        content: ["none", C]
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
        "bg-opacity": [S]
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
        bg: [...U(), er]
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
        bg: ["auto", "cover", "contain", Qa]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, rr]
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
        from: [z]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [z]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [z]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [I]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [I]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [I]
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
        "border-opacity": [S]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...H(), "hidden"]
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
        "divide-opacity": [S]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: H()
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
        outline: ["", ...H()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [te, C]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [te, ie]
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
        ring: Z()
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
        "ring-opacity": [S]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [te, ie]
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
        shadow: ["", "inner", "none", oe, tr]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [fe]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [S]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...W(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": W()
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
        contrast: [b]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", oe, C]
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
        "hue-rotate": [h]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [y]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [$]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [D]
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
        "backdrop-contrast": [b]
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
        "backdrop-hue-rotate": [h]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [y]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [S]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [$]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [D]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", C]
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
        ease: ["linear", "in", "out", "in-out", C]
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
        animate: ["none", "spin", "ping", "pulse", "bounce", C]
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
        scale: [P]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [P]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [P]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [be, C]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [q]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [q]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [F]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [F]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", C]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", C]
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
        "scroll-m": g()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": g()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": g()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": g()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": g()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": g()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": g()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": g()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": g()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": g()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": g()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": g()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": g()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": g()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": g()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": g()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": g()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": g()
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
        "will-change": ["auto", "scroll", "contents", "transform", C]
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
        stroke: [te, ie, Se]
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
}, nr = (e, {
  cacheSize: a,
  prefix: r,
  separator: t,
  experimentalParseClassName: o,
  extend: l = {},
  override: s = {}
}) => {
  $e(e, "cacheSize", a), $e(e, "prefix", r), $e(e, "separator", t), $e(e, "experimentalParseClassName", o);
  for (const n in s)
    sr(e[n], s[n]);
  for (const n in l)
    dr(e[n], l[n]);
  return e;
}, $e = (e, a, r) => {
  r !== void 0 && (e[a] = r);
}, sr = (e, a) => {
  if (a)
    for (const r in a)
      $e(e, r, a[r]);
}, dr = (e, a) => {
  if (a)
    for (const r in a) {
      const t = a[r];
      t !== void 0 && (e[r] = (e[r] || []).concat(t));
    }
}, cr = (e, ...a) => typeof e == "function" ? Ve(Ke, e, ...a) : Ve(() => nr(Ke(), e), ...a), ur = cr({
  extend: {
    classGroups: {
      "font-size": [{ text: ["12", "13", "15", "18", "24", "28", "38", "46"] }],
      "font-weight": [{ font: ["regular"] }]
    }
  }
}), d = (...e) => ur(aa(e)), pr = {
  default: "bg-background-surface text-text-primary hover:bg-action-hover",
  primary: "bg-palette-primary-main text-misc-bg-white hover:bg-palette-primary-dark",
  secondary: "bg-palette-secondary-main text-misc-bg-white hover:bg-palette-secondary-dark"
};
function Nr({
  items: e,
  className: a,
  allowMultiple: r = !1,
  collapsedIcon: t,
  expandedIcon: o,
  iconPosition: l = "right",
  variant: s = "default",
  children: n
}) {
  const [b, c] = J(/* @__PURE__ */ new Set()), h = ce(), y = Ye.toArray(n);
  return /* @__PURE__ */ i("div", { className: d("grid gap-2 font-sans", a), "data-variant": s, children: e.map((v, I) => {
    const z = b.has(v.id), T = z ? Qe : Oe, p = y[I] ?? v.content, S = `${h}-button-${v.id}`, m = `${h}-panel-${v.id}`, $ = /* @__PURE__ */ i("span", { "aria-hidden": "true", className: "inline-flex size-4 shrink-0 items-center justify-center", children: (z ? o : t) ?? /* @__PURE__ */ i(T, { className: "size-4" }) });
    return /* @__PURE__ */ k("div", { className: "overflow-hidden rounded-md border border-border-subtle", children: [
      /* @__PURE__ */ k(
        "button",
        {
          type: "button",
          id: S,
          "aria-expanded": z,
          "aria-controls": m,
          className: d(
            "flex w-full items-center justify-between gap-3 px-6 py-4 text-left text-15 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-current",
            pr[s]
          ),
          onClick: () => c((P) => {
            const D = r ? new Set(P) : /* @__PURE__ */ new Set();
            return P.has(v.id) ? D.delete(v.id) : D.add(v.id), D;
          }),
          children: [
            l === "left" && $,
            /* @__PURE__ */ i("span", { className: "flex-1", children: v.title }),
            l === "right" && $
          ]
        }
      ),
      z && p != null && /* @__PURE__ */ i(
        "div",
        {
          id: m,
          role: "region",
          "aria-labelledby": S,
          className: "border-t border-border-subtle bg-background-surface px-6 py-4 text-13 text-text-secondary",
          children: p
        }
      )
    ] }, v.id);
  }) });
}
const _e = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ue = aa, na = (e, a) => (r) => {
  var t;
  if (a?.variants == null) return Ue(e, r?.class, r?.className);
  const { variants: o, defaultVariants: l } = a, s = Object.keys(o).map((c) => {
    const h = r?.[c], y = l?.[c];
    if (h === null) return null;
    const v = _e(h) || _e(y);
    return o[c][v];
  }), n = r && Object.entries(r).reduce((c, h) => {
    let [y, v] = h;
    return v === void 0 || (c[y] = v), c;
  }, {}), b = a == null || (t = a.compoundVariants) === null || t === void 0 ? void 0 : t.reduce((c, h) => {
    let { class: y, className: v, ...I } = h;
    return Object.entries(I).every((z) => {
      let [T, p] = z;
      return Array.isArray(p) ? p.includes({
        ...l,
        ...n
      }[T]) : {
        ...l,
        ...n
      }[T] === p;
    }) ? [
      ...c,
      y,
      v
    ] : c;
  }, []);
  return Ue(e, s, b, r?.class, r?.className);
};
function ke(e, a, r) {
  return e === "primary" || e === "secondary" ? { appearance: "outlined", accent: r ? "error" : e } : { appearance: e, accent: r ? "error" : a };
}
const Pe = {
  primary: "border-palette-primary-main hover:border-palette-primary-dark focus-within:border-palette-primary-main",
  secondary: "border-palette-secondary-main hover:border-palette-secondary-dark focus-within:border-palette-secondary-main",
  error: "border-palette-error-main hover:border-palette-error-dark focus-within:border-palette-error-main",
  warning: "border-palette-warning-main hover:border-palette-warning-dark focus-within:border-palette-warning-main",
  info: "border-palette-info-main hover:border-palette-info-dark focus-within:border-palette-info-main",
  success: "border-palette-success-main hover:border-palette-success-dark focus-within:border-palette-success-main"
}, ee = {
  primary: "text-palette-primary-main",
  secondary: "text-palette-secondary-main",
  error: "text-palette-error-main",
  warning: "text-palette-warning-main",
  info: "text-palette-info-main",
  success: "text-palette-success-main"
}, Q = {
  primary: "border-palette-primary-main group-hover:border-palette-primary-dark",
  secondary: "border-palette-secondary-main group-hover:border-palette-secondary-dark",
  error: "border-palette-error-main group-hover:border-palette-error-dark",
  warning: "border-palette-warning-main group-hover:border-palette-warning-dark",
  info: "border-palette-info-main group-hover:border-palette-info-dark",
  success: "border-palette-success-main group-hover:border-palette-success-dark"
}, Ce = na(
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
), De = "w-full min-w-0 flex-1 border-0 bg-transparent py-2 font-sans text-inherit leading-5 outline-none placeholder:text-text-secondary disabled:cursor-not-allowed disabled:text-text-disabled", ae = {
  outlined: "",
  filled: "relative top-[0.5px] group-focus-within:top-px",
  standard: "relative top-[0.5px] group-focus-within:top-px"
}, gr = "mb-1 block font-sans text-13 font-medium text-text-secondary", Te = "mt-1 font-sans text-13 text-palette-error-main", sa = "absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-md border border-border-subtle bg-background-surface py-2 font-sans text-15 text-text-primary shadow-lg";
function le({ required: e, className: a, children: r, ref: t, ...o }) {
  return /* @__PURE__ */ k("label", { ref: t, className: d(gr, a), ...o, children: [
    r,
    e && /* @__PURE__ */ i("span", { className: "ml-1 text-palette-error-main", "aria-hidden": "true", children: "*" })
  ] });
}
function Lr({
  className: e,
  error: a,
  helperText: r,
  iconLeft: t,
  iconRight: o,
  label: l,
  variant: s = "outlined",
  tone: n = "primary",
  size: b = "normal",
  onChange: c,
  onSelect: h,
  options: y,
  value: v,
  defaultValue: I,
  id: z,
  "aria-describedby": T,
  onFocus: p,
  onBlur: S,
  onKeyDown: m,
  ...$
}) {
  const P = ce(), D = re(null), F = re(null), [G, q] = J(), { appearance: w, accent: A } = ke(s, n, a), L = z ?? P, g = `${L}-options`, Z = a ?? r, R = `${L}-${a ? "error" : "helper"}`, [U, H] = J(String(v ?? I ?? "")), [W, X] = J(!1), [O, V] = J(!1), [x, N] = J(0), K = v ?? U, u = K.length > 0, E = u || !$.placeholder, f = !!(l && u && w === "outlined"), Y = !!(f && G !== void 0), B = $.disabled ? "text-text-disabled" : a ? ee.error : W ? ee[A] : "text-text-secondary", j = O && K.trim() ? y.filter((M) => M.toLowerCase().includes(K.toLowerCase())) : [];
  ge(() => {
    if (!l || !u || w !== "outlined") return;
    const M = F.current?.offsetWidth;
    M && q(M);
  }, [w, u, l, $.required]);
  const Ie = (M) => {
    H(M), V(!1), h(M);
  };
  return /* @__PURE__ */ k(
    "div",
    {
      className: d("relative w-full max-w-sm font-sans", e),
      onBlur: (M) => {
        M.currentTarget.contains(M.relatedTarget) || X(!1);
      },
      children: [
        l && w === "standard" && u && E && /* @__PURE__ */ i(
          le,
          {
            ref: F,
            htmlFor: L,
            required: $.required,
            className: d("absolute left-0 top-0 z-10 mb-0 pl-4", B),
            children: l
          }
        ),
        /* @__PURE__ */ k(
          "div",
          {
            className: d(
              Ce({
                variant: w,
                size: typeof b == "number" ? "normal" : b,
                disabled: $.disabled,
                iconLeft: !!t,
                iconRight: !!(o || W && K.trim()),
                notched: Y
              }),
              "group",
              f && "mt-2 bg-background-surface",
              l && u && w === "standard" && "mt-2",
              !$.disabled && Pe[A]
            ),
            children: [
              Y && /* @__PURE__ */ k(we, { children: [
                /* @__PURE__ */ i(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: d(
                      "absolute bottom-0 left-0 top-0 w-3 rounded-l-md border-b border-l border-t group-focus-within:border-b-2 group-focus-within:border-l-2 group-focus-within:border-t-2",
                      $.disabled ? "border-text-disabled" : Q[A]
                    )
                  }
                ),
                /* @__PURE__ */ i(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: d(
                      "absolute bottom-0 left-3 right-3 border-b group-focus-within:border-b-2",
                      $.disabled ? "border-text-disabled" : Q[A]
                    )
                  }
                ),
                /* @__PURE__ */ i(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: d(
                      "absolute bottom-0 right-0 top-0 rounded-r-md border-b border-r border-t group-focus-within:border-b-2 group-focus-within:border-r-2 group-focus-within:border-t-2",
                      $.disabled ? "border-text-disabled" : Q[A]
                    ),
                    style: { left: 12 + (G ?? 0) }
                  }
                )
              ] }),
              l && !(w === "standard" && u && E) && /* @__PURE__ */ i(
                le,
                {
                  ref: F,
                  htmlFor: L,
                  required: $.required,
                  className: d(
                    "pointer-events-none absolute z-10 mb-0 transition-all",
                    E ? u && w === "outlined" ? "left-3 -top-2 px-1 text-13" : u && w === "filled" ? "left-4 top-1 text-13" : d(
                      "top-1/2 -translate-y-1/2 text-inherit",
                      t ? b === "small" ? "left-9" : "left-[42px]" : "left-4"
                    ) : "sr-only",
                    !u && w !== "outlined" && "mt-[0.5px] group-focus-within:mt-px",
                    u && w === "outlined" && "bg-background-surface",
                    u && w === "filled" && "leading-14",
                    B
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
                    ae[w]
                  ),
                  children: t
                }
              ),
              /* @__PURE__ */ i(
                "input",
                {
                  ...$,
                  ref: D,
                  size: typeof b == "number" ? b : void 0,
                  id: L,
                  type: "text",
                  role: "combobox",
                  "aria-autocomplete": "list",
                  "aria-expanded": j.length > 0,
                  "aria-controls": g,
                  "aria-activedescendant": j[x] ? `${g}-${x}` : void 0,
                  "aria-describedby": [T, Z && R].filter(Boolean).join(" ") || void 0,
                  "aria-invalid": a ? !0 : $["aria-invalid"],
                  value: K,
                  className: d(
                    De,
                    !u && ae[w],
                    w === "filled" && u && l && "self-stretch py-0 pt-[18px]"
                  ),
                  onChange: (M) => {
                    H(M.target.value), V(!0), N(0), c?.(M);
                  },
                  onFocus: (M) => {
                    X(!0), V(!0), p?.(M);
                  },
                  onBlur: (M) => {
                    V(!1), S?.(M);
                  },
                  onKeyDown: (M) => {
                    m?.(M), !M.defaultPrevented && (M.key === "Enter" && j.length && (M.preventDefault(), Ie(j[x] ?? j[0])), M.key === "Escape" && V(!1), (M.key === "ArrowDown" || M.key === "ArrowUp") && (M.preventDefault(), V(!0), N(
                      (me) => Math.max(0, Math.min(j.length - 1, me + (M.key === "ArrowDown" ? 1 : -1)))
                    )));
                  }
                }
              ),
              W && K.trim() ? /* @__PURE__ */ i(
                "button",
                {
                  type: "button",
                  disabled: $.disabled,
                  "aria-label": "Clear input",
                  className: d(
                    "inline-flex size-5 items-center justify-center text-text-secondary [&_svg]:size-4",
                    ae[w]
                  ),
                  onMouseDown: (M) => M.preventDefault(),
                  onClick: () => {
                    H(""), V(!1), h(""), D.current?.focus();
                  },
                  children: /* @__PURE__ */ i(fa, { className: "size-4", "aria-hidden": "true" })
                }
              ) : o ? /* @__PURE__ */ i(
                "span",
                {
                  "aria-hidden": "true",
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    ae[w]
                  ),
                  children: o
                }
              ) : null
            ]
          }
        ),
        j.length > 0 && /* @__PURE__ */ i("ul", { id: g, role: "listbox", className: sa, children: j.map((M, me) => /* @__PURE__ */ i(
          "li",
          {
            id: `${g}-${me}`,
            role: "option",
            "aria-selected": x === me,
            className: d(
              "cursor-pointer px-4 py-2 hover:bg-action-hover",
              x === me && "bg-action-selected"
            ),
            onMouseDown: (ba) => ba.preventDefault(),
            onClick: () => Ie(M),
            children: M
          },
          M
        )) }),
        Z && /* @__PURE__ */ i(
          "p",
          {
            id: R,
            role: a ? "alert" : void 0,
            "aria-live": "polite",
            className: a ? Te : "mt-1 text-13 text-text-secondary",
            children: Z
          }
        )
      ]
    }
  );
}
const vr = na(
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
), mr = {
  primary: {
    solid: "bg-palette-primary-main text-misc-bg-white enabled:hover:bg-palette-primary-dark enabled:active:bg-palette-primary-dark enabled:focus:bg-palette-primary-dark",
    label: "bg-palette-primary-opacity-light text-palette-primary-main enabled:hover:bg-palette-primary-opacity-main enabled:active:bg-palette-primary-opacity-main enabled:focus:bg-palette-primary-opacity-main",
    outline: "border bg-transparent border-palette-primary-main text-palette-primary-main enabled:hover:bg-palette-primary-opacity-lighter enabled:active:bg-palette-primary-opacity-lighter enabled:focus:bg-palette-primary-opacity-lighter",
    text: "bg-transparent text-palette-primary-main enabled:hover:bg-palette-primary-opacity-lighter enabled:active:bg-palette-primary-opacity-lighter enabled:focus:bg-palette-primary-opacity-lighter"
  },
  secondary: {
    solid: "bg-palette-secondary-main text-misc-bg-white enabled:hover:bg-palette-secondary-dark enabled:active:bg-palette-secondary-dark enabled:focus:bg-palette-secondary-dark",
    label: "bg-palette-secondary-opacity-light text-palette-secondary-main enabled:hover:bg-palette-secondary-opacity-main enabled:active:bg-palette-secondary-opacity-main enabled:focus:bg-palette-secondary-opacity-main",
    outline: "border bg-transparent border-palette-secondary-main text-palette-secondary-main enabled:hover:bg-palette-secondary-opacity-lighter enabled:active:bg-palette-secondary-opacity-lighter enabled:focus:bg-palette-secondary-opacity-lighter",
    text: "bg-transparent text-palette-secondary-main enabled:hover:bg-palette-secondary-opacity-lighter enabled:active:bg-palette-secondary-opacity-lighter enabled:focus:bg-palette-secondary-opacity-lighter"
  },
  error: {
    solid: "bg-palette-error-main text-misc-bg-white enabled:hover:bg-palette-error-dark enabled:active:bg-palette-error-dark enabled:focus:bg-palette-error-dark",
    label: "bg-palette-error-opacity-light text-palette-error-main enabled:hover:bg-palette-error-opacity-main enabled:active:bg-palette-error-opacity-main enabled:focus:bg-palette-error-opacity-main",
    outline: "border bg-transparent border-palette-error-main text-palette-error-main enabled:hover:bg-palette-error-opacity-lighter enabled:active:bg-palette-error-opacity-lighter enabled:focus:bg-palette-error-opacity-lighter",
    text: "bg-transparent text-palette-error-main enabled:hover:bg-palette-error-opacity-lighter enabled:active:bg-palette-error-opacity-lighter enabled:focus:bg-palette-error-opacity-lighter"
  },
  warning: {
    solid: "bg-palette-warning-main text-misc-bg-white enabled:hover:bg-palette-warning-dark enabled:active:bg-palette-warning-dark enabled:focus:bg-palette-warning-dark",
    label: "bg-palette-warning-opacity-light text-palette-warning-main enabled:hover:bg-palette-warning-opacity-main enabled:active:bg-palette-warning-opacity-main enabled:focus:bg-palette-warning-opacity-main",
    outline: "border bg-transparent border-palette-warning-main text-palette-warning-main enabled:hover:bg-palette-warning-opacity-lighter enabled:active:bg-palette-warning-opacity-lighter enabled:focus:bg-palette-warning-opacity-lighter",
    text: "bg-transparent text-palette-warning-main enabled:hover:bg-palette-warning-opacity-lighter enabled:active:bg-palette-warning-opacity-lighter enabled:focus:bg-palette-warning-opacity-lighter"
  },
  info: {
    solid: "bg-palette-info-main text-misc-bg-white enabled:hover:bg-palette-info-dark enabled:active:bg-palette-info-dark enabled:focus:bg-palette-info-dark",
    label: "bg-palette-info-opacity-light text-palette-info-main enabled:hover:bg-palette-info-opacity-main enabled:active:bg-palette-info-opacity-main enabled:focus:bg-palette-info-opacity-main",
    outline: "border bg-transparent border-palette-info-main text-palette-info-main enabled:hover:bg-palette-info-opacity-lighter enabled:active:bg-palette-info-opacity-lighter enabled:focus:bg-palette-info-opacity-lighter",
    text: "bg-transparent text-palette-info-main enabled:hover:bg-palette-info-opacity-lighter enabled:active:bg-palette-info-opacity-lighter enabled:focus:bg-palette-info-opacity-lighter"
  },
  success: {
    solid: "bg-palette-success-main text-misc-bg-white enabled:hover:bg-palette-success-dark enabled:active:bg-palette-success-dark enabled:focus:bg-palette-success-dark",
    label: "bg-palette-success-opacity-light text-palette-success-main enabled:hover:bg-palette-success-opacity-main enabled:active:bg-palette-success-opacity-main enabled:focus:bg-palette-success-opacity-main",
    outline: "border bg-transparent border-palette-success-main text-palette-success-main enabled:hover:bg-palette-success-opacity-lighter enabled:active:bg-palette-success-opacity-lighter enabled:focus:bg-palette-success-opacity-lighter",
    text: "bg-transparent text-palette-success-main enabled:hover:bg-palette-success-opacity-lighter enabled:active:bg-palette-success-opacity-lighter enabled:focus:bg-palette-success-opacity-lighter"
  }
};
function Or({
  className: e,
  label: a,
  iconLeft: r,
  iconRight: t,
  size: o = "md",
  width: l = "default",
  variant: s = "default",
  tone: n = "primary",
  outline: b = !1,
  shape: c = "rectangle",
  children: h,
  ...y
}) {
  const v = s === "primary" || s === "secondary" ? s : n, I = b ? "outline" : s === "label" || s === "text" || s === "outline" ? s : "solid";
  return /* @__PURE__ */ k(
    "button",
    {
      className: d(vr({ size: o, width: l, shape: c }), mr[v][I], e),
      "data-size": o,
      "data-variant": s,
      "data-tone": v,
      "data-width": l,
      "data-shape": c,
      "data-outline": b,
      ...y,
      children: [
        r && /* @__PURE__ */ i("span", { className: "inline-flex size-5 shrink-0 items-center justify-center", "aria-hidden": "true", children: r }),
        h ?? a,
        t && /* @__PURE__ */ i("span", { className: "inline-flex size-5 shrink-0 items-center justify-center", "aria-hidden": "true", children: t })
      ]
    }
  );
}
const da = {
  default: "text-text-primary",
  muted: "text-text-secondary",
  primary: "text-palette-primary-main",
  secondary: "text-palette-secondary-main",
  error: "text-palette-error-main",
  warning: "text-palette-warning-main",
  info: "text-palette-info-main",
  success: "text-palette-success-main",
  inverse: "text-misc-bg-white"
}, br = {
  regular: "font-regular",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold"
}, fr = {
  h1: "text-46 leading-56",
  h2: "text-38 leading-42",
  h3: "text-28 leading-38",
  h4: "text-24 leading-28",
  h5: "text-18 leading-22",
  h6: "text-15 leading-20"
}, ca = {
  ...br,
  normal: "font-regular",
  semiBold: "font-semibold",
  light: "font-light",
  extraBold: "font-extrabold"
}, ua = {
  none: "normal-case",
  capitalize: "capitalize",
  uppercase: "uppercase",
  lowercase: "lowercase"
}, pa = (e) => e === "title" ? "default" : e === "Primary" ? "primary" : e === "Secondary" ? "secondary" : e === "danger" ? "error" : e;
function ga({
  level: e,
  variant: a = "h4",
  weight: r = "bold",
  family: t,
  color: o,
  tone: l = "default",
  textTransform: s = "none",
  className: n,
  children: b,
  ...c
}) {
  const h = e ?? a;
  return /* @__PURE__ */ i(
    h,
    {
      className: d(
        "m-0 font-sans",
        fr[h],
        ca[r],
        da[o ? pa(o) : l],
        ua[s],
        n
      ),
      ...c,
      children: b
    }
  );
}
const ne = (e) => e.id || e.src, Ne = (e, a) => e.alt.trim() || `Product image ${a + 1}`, se = {
  primary: "text-palette-primary-main focus-visible:outline-palette-primary-main",
  secondary: "text-palette-secondary-main focus-visible:outline-palette-secondary-main"
}, qe = { primary: "bg-palette-primary-main", secondary: "bg-palette-secondary-main" }, yr = {
  primary: "border-palette-primary-main ring-2 ring-palette-primary-main ring-offset-2 ring-offset-background-surface",
  secondary: "border-palette-secondary-main ring-2 ring-palette-secondary-main ring-offset-2 ring-offset-background-surface"
}, ue = "inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-background-surface hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-45";
function zr({
  images: e,
  className: a,
  likeButton: r = !0,
  variant: t = "primary",
  initialIndex: o = 0,
  onImageChange: l,
  showThumbnails: s = !0,
  thumbnailsPosition: n = "bottom",
  showIndicators: b = !0,
  ariaLabel: c = "Product image gallery",
  ofText: h = "of",
  breakpoint: y = "desktop",
  openOnClick: v = !0
}) {
  const I = ce(), [z, T] = J(Math.min(Math.max(o, 0), Math.max(e.length - 1, 0))), [p, S] = J(!1), [m, $] = J(0), [P, D] = J({}), F = re(null), G = re(null), q = re(null), w = Math.min(z, Math.max(0, e.length - 1)), A = e[w], L = n === "bottom" ? 8 : 5, g = y === "mobile", Z = g ? "10rem" : y === "tablet" ? "15rem" : "25rem";
  if (ge(() => {
    T((x) => Math.min(x, Math.max(e.length - 1, 0))), $((x) => Math.min(x, Math.max(e.length - L, 0))), e.length || S(!1);
  }, [e.length, L]), ge(() => {
    if (!p) return;
    const x = G.current;
    F.current?.focus();
    const N = (K) => {
      if (K.key === "Escape" && S(!1), K.key === "Tab" && q.current) {
        const u = q.current.querySelectorAll('button:not(:disabled), [tabindex="0"]'), E = u[0], f = u[u.length - 1];
        K.shiftKey && document.activeElement === E ? (K.preventDefault(), f?.focus()) : !K.shiftKey && document.activeElement === f && (K.preventDefault(), E?.focus());
      }
    };
    return document.addEventListener("keydown", N), () => {
      document.removeEventListener("keydown", N), x?.focus();
    };
  }, [p]), !A)
    return /* @__PURE__ */ i(
      "div",
      {
        className: d(
          "rounded-md border border-dashed border-border-subtle px-4 py-6 text-center font-sans text-13 text-text-secondary",
          a
        ),
        children: "No product images available."
      }
    );
  const R = (x) => $((N) => x < N ? x : x >= N + L ? x - L + 1 : N), U = (x) => {
    const N = (x + e.length) % e.length;
    T(N), R(N), l?.(N, e[N]);
  }, H = () => {
    R(w), S(!0);
  }, W = d(
    "min-w-0",
    s && n !== "bottom" && !g && (n === "left" ? "grid grid-cols-[var(--carousel-thumb-size)_minmax(0,1fr)] gap-4" : "grid grid-cols-[minmax(0,1fr)_var(--carousel-thumb-size)] gap-4")
  ), X = n === "bottom" ? { gridTemplateColumns: `repeat(${Math.min(L, e.length)}, var(--carousel-thumb-size))` } : { gridTemplateRows: `repeat(${Math.min(L, e.length)}, var(--carousel-thumb-size))` }, O = (x, N = !1) => {
    if (!s || g || n !== x) return null;
    const K = N ? m : 0, u = e.length - L, E = /* @__PURE__ */ i(
      "div",
      {
        className: d("grid gap-2.5 overflow-hidden p-1", x === "bottom" ? "justify-center" : "content-start"),
        style: X,
        children: e.slice(K, K + L).map((f, Y) => {
          const B = K + Y, j = !N && u > 0 && Y === L - 1;
          return /* @__PURE__ */ k(
            "button",
            {
              type: "button",
              className: d(
                "relative aspect-square w-full overflow-hidden rounded-md border border-border-subtle bg-background-surface p-0 leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                se[t],
                !j && w === B && yr[t]
              ),
              "aria-label": j ? v ? `Open image gallery (${u} more)` : `${u} additional images` : `Select ${Ne(f, B)}`,
              onClick: () => {
                j ? v && H() : U(B);
              },
              children: [
                /* @__PURE__ */ i(
                  "img",
                  {
                    src: f.thumbnailSrc || f.src,
                    alt: "",
                    "aria-hidden": "true",
                    className: "block size-full object-cover"
                  }
                ),
                j && /* @__PURE__ */ k("span", { className: "absolute inset-0 flex items-center justify-center bg-backdrop-overlay text-13 font-semibold text-misc-bg-white", children: [
                  "+",
                  u
                ] })
              ]
            },
            `${ne(f)}-${B}`
          );
        })
      }
    );
    return N ? /* @__PURE__ */ k(
      "div",
      {
        className: d(
          "grid items-center gap-2.5",
          x === "bottom" ? "grid-cols-[auto_minmax(0,1fr)_auto]" : "content-start"
        ),
        children: [
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: d(ue, se[t], "justify-self-center"),
              "aria-label": "Previous thumbnails",
              disabled: m <= 0,
              onClick: () => $((f) => Math.max(0, f - 1)),
              children: x === "bottom" ? /* @__PURE__ */ i(Ee, { className: "size-4" }) : /* @__PURE__ */ i(Qe, { className: "size-4" })
            }
          ),
          E,
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: d(ue, se[t], "justify-self-center"),
              "aria-label": "Next thumbnails",
              disabled: m + L >= e.length,
              onClick: () => $((f) => Math.min(e.length - L, f + 1)),
              children: x === "bottom" ? /* @__PURE__ */ i(Me, { className: "size-4" }) : /* @__PURE__ */ i(Oe, { className: "size-4" })
            }
          )
        ]
      }
    ) : E;
  }, V = (x = !1) => /* @__PURE__ */ k(
    "div",
    {
      className: "relative flex w-full min-w-0 items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-background-surface",
      style: { height: Z },
      children: [
        A.badge && /* @__PURE__ */ i(
          "span",
          {
            className: d(
              "absolute left-4 top-4 z-10 rounded-md px-2 py-1 text-12 font-semibold text-misc-bg-white",
              qe[t]
            ),
            children: A.badge
          }
        ),
        r && A.likeButton !== !1 && /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: d(
              ue,
              "absolute right-4 top-4 z-10 rounded-full",
              P[ne(A)] ? "text-palette-error-main" : se[t]
            ),
            "aria-label": P[ne(A)] ? "Remove from favorites" : "Add to favorites",
            "aria-pressed": !!P[ne(A)],
            onClick: () => D((N) => ({ ...N, [ne(A)]: !N[ne(A)] })),
            children: /* @__PURE__ */ i(ya, { className: "size-6", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ i(
          "img",
          {
            ref: !x && v ? G : void 0,
            src: A.src,
            alt: Ne(A, w),
            className: d("block size-full object-cover", !x && v && "cursor-zoom-in"),
            ...!x && v ? {
              role: "button",
              "aria-label": `Open image gallery: ${Ne(A, w)}`,
              tabIndex: 0,
              onClick: H,
              onKeyDown: (N) => {
                (N.key === "Enter" || N.key === " ") && (N.preventDefault(), H());
              }
            } : {}
          }
        ),
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            "aria-label": "Previous image",
            className: d(ue, se[t], "absolute left-4 top-1/2 -translate-y-1/2"),
            onClick: () => U(w - 1),
            children: /* @__PURE__ */ i(Ee, { className: "size-4", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            "aria-label": "Next image",
            className: d(ue, se[t], "absolute right-4 top-1/2 -translate-y-1/2"),
            onClick: () => U(w + 1),
            children: /* @__PURE__ */ i(Me, { className: "size-4", "aria-hidden": "true" })
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ k(
    "section",
    {
      "aria-label": c,
      className: d(
        "grid w-full min-w-0 gap-4 rounded-md border border-border-subtle bg-background-surface p-6 font-sans text-text-primary",
        a
      ),
      style: {
        "--carousel-thumb-size": g ? "3.25rem" : y === "tablet" ? "3.75rem" : "4.5rem"
      },
      children: [
        /* @__PURE__ */ k("div", { className: W, children: [
          O("left"),
          V(),
          O("right")
        ] }),
        !g && (b || s && n === "bottom") && /* @__PURE__ */ k("div", { className: "grid gap-2 rounded-md border border-border-subtle p-4", children: [
          b && /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-2", children: e.map((x, N) => /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              "aria-label": `Go to image ${N + 1}`,
              className: d(
                "size-2.5 rounded-full border border-border-subtle p-0",
                w === N ? qe[t] : "bg-background-surface"
              ),
              onClick: () => U(N)
            },
            `${ne(x)}-${N}`
          )) }),
          O("bottom")
        ] }),
        p && /* @__PURE__ */ i(
          "div",
          {
            role: "presentation",
            className: "fixed inset-0 z-[1000] grid place-items-center bg-backdrop-overlay p-4",
            onClick: () => S(!1),
            children: /* @__PURE__ */ k(
              "div",
              {
                ref: q,
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": I,
                tabIndex: -1,
                onClick: (x) => x.stopPropagation(),
                className: d(
                  "grid max-h-[90dvh] w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-md border border-border-subtle bg-background-surface",
                  y === "tablet" ? "max-w-3xl" : g ? "max-h-dvh" : "max-w-5xl"
                ),
                children: [
                  /* @__PURE__ */ k("div", { className: "flex items-center justify-between gap-4 border-b border-border-subtle p-4", children: [
                    /* @__PURE__ */ i(
                      ga,
                      {
                        id: I,
                        level: "h4",
                        weight: "medium",
                        children: `Image gallery: ${w + 1} ${h} ${e.length}`
                      }
                    ),
                    /* @__PURE__ */ i(
                      "button",
                      {
                        ref: F,
                        type: "button",
                        "aria-label": "Close image gallery",
                        className: d(ue, se[t]),
                        onClick: () => S(!1),
                        children: /* @__PURE__ */ i("span", { "aria-hidden": "true", children: "✕" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ k("div", { className: d("grid gap-4 overflow-auto p-4", g && "gap-2 p-2"), children: [
                    /* @__PURE__ */ k("div", { className: W, children: [
                      O("left", !0),
                      V(!0),
                      O("right", !0)
                    ] }),
                    O("bottom", !0)
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
function Dr({
  className: e,
  inputClassName: a,
  label: r,
  helperText: t,
  error: o,
  variant: l = "outlined",
  tone: s = "primary",
  size: n = "normal",
  iconLeft: b,
  iconRight: c,
  outsideIconLeft: h,
  outsideIconRight: y,
  handleActions: v,
  id: I,
  type: z = "text",
  "aria-describedby": T,
  onFocus: p,
  onBlur: S,
  onChange: m,
  value: $,
  defaultValue: P,
  disabled: D,
  required: F,
  ...G
}) {
  const q = ce(), w = I ?? q, [A, L] = J(!1), [g, Z] = J(P ?? ""), R = re(null), [U, H] = J(), W = String($ ?? g).length > 0, X = W || !G.placeholder, { appearance: O, accent: V } = ke(l, s, o), x = !!(r && W && O === "outlined"), N = !!(r && W && O === "outlined" && U !== void 0), K = D ? "text-text-disabled" : o ? ee.error : A ? ee[V] : "text-text-secondary", u = o ?? t, E = `${w}-${o ? "error" : "helper"}`, f = [T, u ? E : void 0].filter(Boolean).join(" ") || void 0;
  ge(() => {
    if (!r || !W || O !== "outlined") return;
    const B = R.current?.offsetWidth;
    B && H(B);
  }, [O, W, r, F]);
  const Y = (B) => v ? /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      disabled: D,
      onClick: v,
      className: d(
        "inline-flex min-w-[26px] items-center justify-center self-stretch disabled:opacity-45 [&_svg]:size-[26px]",
        ee[V]
      ),
      "aria-label": `${r ?? "Input"} action`,
      children: B
    }
  ) : /* @__PURE__ */ i(
    "span",
    {
      "aria-hidden": "true",
      className: d(
        "inline-flex min-w-[26px] items-center justify-center self-stretch [&_svg]:size-[26px]",
        ee[V]
      ),
      children: B
    }
  );
  return /* @__PURE__ */ k("div", { className: d("w-full max-w-sm font-sans", e), children: [
    /* @__PURE__ */ k("div", { className: "flex items-stretch gap-2", children: [
      h && Y(h),
      /* @__PURE__ */ k("div", { className: "relative min-w-0 flex-1", children: [
        r && O === "standard" && W && X && /* @__PURE__ */ i(
          le,
          {
            ref: R,
            htmlFor: w,
            required: F,
            className: d("absolute left-0 top-0 z-10 mb-0 pl-4", K),
            children: r
          }
        ),
        /* @__PURE__ */ k(
          "div",
          {
            className: d(
              Ce({
                variant: O,
                size: n,
                disabled: D,
                iconLeft: !!b,
                iconRight: !!c,
                notched: N
              }),
              "group",
              x && "mt-2 bg-background-surface",
              r && W && O === "standard" && "mt-2",
              !D && Pe[V]
            ),
            children: [
              N && /* @__PURE__ */ k(we, { children: [
                /* @__PURE__ */ i(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: d(
                      "absolute bottom-0 left-0 top-0 w-3 rounded-l-md border-b border-l border-t group-focus-within:border-b-2 group-focus-within:border-l-2 group-focus-within:border-t-2",
                      D ? "border-text-disabled" : Q[V]
                    )
                  }
                ),
                /* @__PURE__ */ i(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: d(
                      "absolute bottom-0 left-3 right-3 border-b group-focus-within:border-b-2",
                      D ? "border-text-disabled" : Q[V]
                    )
                  }
                ),
                /* @__PURE__ */ i(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: d(
                      "absolute bottom-0 right-0 top-0 rounded-r-md border-b border-r border-t group-focus-within:border-b-2 group-focus-within:border-r-2 group-focus-within:border-t-2",
                      D ? "border-text-disabled" : Q[V]
                    ),
                    style: { left: 12 + (U ?? 0) }
                  }
                )
              ] }),
              r && !(O === "standard" && W && X) && /* @__PURE__ */ i(
                le,
                {
                  ref: R,
                  htmlFor: w,
                  required: F,
                  className: d(
                    "pointer-events-none absolute z-10 mb-0 transition-all",
                    X ? W && O === "outlined" ? "left-3 -top-2 px-1 text-13" : W && O === "filled" ? "left-4 top-1 text-13" : d(
                      "top-1/2 -translate-y-1/2 text-inherit",
                      b ? n === "small" ? "left-9" : "left-[42px]" : "left-4"
                    ) : "sr-only",
                    !W && O !== "outlined" && "mt-[0.5px] group-focus-within:mt-px",
                    W && O === "outlined" && "bg-background-surface",
                    W && O === "filled" && "leading-14",
                    K
                  ),
                  children: r
                }
              ),
              b && /* @__PURE__ */ i(
                "span",
                {
                  "aria-hidden": "true",
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    ae[O]
                  ),
                  children: b
                }
              ),
              /* @__PURE__ */ i(
                "input",
                {
                  ...G,
                  id: w,
                  type: z,
                  disabled: D,
                  required: F,
                  value: $,
                  defaultValue: P,
                  "aria-describedby": f,
                  "aria-invalid": o ? !0 : G["aria-invalid"],
                  className: d(
                    De,
                    !W && ae[O],
                    O === "filled" && W && r && "self-stretch py-0 pt-[18px]",
                    a
                  ),
                  onFocus: (B) => {
                    L(!0), p?.(B);
                  },
                  onBlur: (B) => {
                    L(!1), S?.(B);
                  },
                  onChange: (B) => {
                    Z(B.target.value), m?.(B);
                  }
                }
              ),
              c && /* @__PURE__ */ i(
                "span",
                {
                  "aria-hidden": "true",
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5",
                    ae[O]
                  ),
                  children: c
                }
              )
            ]
          }
        )
      ] }),
      y && Y(y)
    ] }),
    u && /* @__PURE__ */ i(
      "p",
      {
        id: E,
        role: o ? "alert" : void 0,
        "aria-live": "polite",
        className: d(o ? Te : "mt-1 text-13 text-text-secondary"),
        children: u
      }
    )
  ] });
}
function Gr({
  className: e,
  label: a,
  helperText: r,
  error: t,
  variant: o = "outlined",
  tone: l = "primary",
  size: s = "normal",
  id: n,
  "aria-describedby": b,
  ...c
}) {
  const h = ce(), { appearance: y, accent: v } = ke(o, l, t), I = n ?? h, z = t ?? r, T = `${I}-${t ? "error" : "helper"}`, p = re(null), [S, m] = J(), [$, P] = J(!1), [D, F] = J(String(c.defaultValue ?? "")), G = String(c.value ?? D).length > 0, q = G || !c.placeholder, w = !!(a && G && y === "outlined"), A = !!(w && S !== void 0), L = c.disabled ? "text-text-disabled" : t ? ee.error : $ ? ee[v] : "text-text-secondary";
  return ge(() => {
    if (!a || !G || y !== "outlined") return;
    const g = p.current?.offsetWidth;
    g && m(g);
  }, [y, G, a, c.required]), /* @__PURE__ */ k("div", { className: d("relative w-full max-w-sm font-sans", e), children: [
    a && y === "standard" && G && q && /* @__PURE__ */ i(
      le,
      {
        ref: p,
        htmlFor: I,
        required: c.required,
        className: d("absolute left-0 top-0 z-10 mb-0 pl-4", L),
        children: a
      }
    ),
    /* @__PURE__ */ k(
      "div",
      {
        className: d(
          Ce({ variant: y, size: s, disabled: c.disabled, notched: A }),
          "items-start",
          w && "group mt-2 bg-background-surface",
          a && G && y === "standard" && "mt-2",
          !c.disabled && Pe[v]
        ),
        children: [
          A && /* @__PURE__ */ k(we, { children: [
            /* @__PURE__ */ i(
              "span",
              {
                "aria-hidden": "true",
                className: d(
                  "absolute bottom-0 left-0 top-0 w-3 rounded-l-md border-b border-l border-t group-focus-within:border-b-2 group-focus-within:border-l-2 group-focus-within:border-t-2",
                  c.disabled ? "border-text-disabled" : Q[v]
                )
              }
            ),
            /* @__PURE__ */ i(
              "span",
              {
                "aria-hidden": "true",
                className: d(
                  "absolute bottom-0 left-3 right-3 border-b group-focus-within:border-b-2",
                  c.disabled ? "border-text-disabled" : Q[v]
                )
              }
            ),
            /* @__PURE__ */ i(
              "span",
              {
                "aria-hidden": "true",
                className: d(
                  "absolute bottom-0 right-0 top-0 rounded-r-md border-b border-r border-t group-focus-within:border-b-2 group-focus-within:border-r-2 group-focus-within:border-t-2",
                  c.disabled ? "border-text-disabled" : Q[v]
                ),
                style: { left: 12 + (S ?? 0) }
              }
            )
          ] }),
          a && !(y === "standard" && G && q) && /* @__PURE__ */ i(
            le,
            {
              ref: p,
              htmlFor: I,
              required: c.required,
              className: d(
                "pointer-events-none absolute z-10 mb-0 transition-all",
                q ? G && y === "outlined" ? "left-3 -top-2 px-1 text-13" : G && y === "filled" ? "left-4 top-1 text-13" : "left-4 top-2" : "sr-only",
                G && y === "outlined" && "bg-background-surface",
                G && y === "filled" && "leading-14",
                L
              ),
              children: a
            }
          ),
          /* @__PURE__ */ i(
            "textarea",
            {
              ...c,
              id: I,
              value: c.value,
              defaultValue: c.defaultValue,
              "aria-invalid": t ? !0 : c["aria-invalid"],
              "aria-describedby": [b, z && T].filter(Boolean).join(" ") || void 0,
              className: d(
                De,
                "min-h-12 resize-y",
                G && y === "filled" && a && "pt-5 pb-[3px] focus:pb-[2px]",
                G && y !== "filled" && a && "pt-4",
                G && y === "standard" && a && "pb-[7px] focus:pb-[6px]"
              ),
              onFocus: (g) => {
                P(!0), c.onFocus?.(g);
              },
              onBlur: (g) => {
                P(!1), c.onBlur?.(g);
              },
              onChange: (g) => {
                F(g.target.value), c.onChange?.(g);
              }
            }
          )
        ]
      }
    ),
    z && /* @__PURE__ */ i(
      "p",
      {
        id: T,
        role: t ? "alert" : void 0,
        "aria-live": "polite",
        className: t ? Te : "mt-1 text-13 text-text-secondary",
        children: z
      }
    )
  ] });
}
function Ir({
  className: e,
  label: a,
  placeholder: r,
  helperText: t,
  error: o,
  variant: l = "outlined",
  tone: s = "primary",
  size: n = "normal",
  iconLeft: b,
  showSelectionCheck: c = !1,
  id: h,
  children: y,
  defaultValue: v,
  value: I,
  onChange: z,
  "aria-describedby": T,
  ...p
}) {
  const S = ce(), { appearance: m, accent: $ } = ke(l, s, o), P = h ?? S, D = re(null), F = re(null), G = Ye.toArray(y).filter(Ze), [q, w] = J(String(v ?? G[0]?.props.value ?? "")), [A, L] = J(!1), g = String(I ?? q), Z = G.find((f) => String(f.props.value ?? "") === g), R = g.length > 0 || !r && !!Z?.props.children, U = R || !r, H = !!(a && R && m === "outlined"), W = !!H, X = o ?? t, O = `${P}-${o ? "error" : "helper"}`, V = [T, X && O].filter(Boolean).join(" ") || void 0, [x, N] = J(), K = re(null), u = p.disabled ? "text-text-disabled" : o ? ee.error : A ? ee[$] : "text-text-secondary";
  ge(() => {
    if (!a || !R || m !== "outlined") return;
    const f = K.current?.offsetWidth;
    f && N(f);
  }, [m, R, a, p.required]);
  const E = (f) => {
    w(f), L(!1), D.current && (D.current.value = f, D.current.dispatchEvent(new Event("change", { bubbles: !0 }))), F.current?.focus();
  };
  return /* @__PURE__ */ k(
    "div",
    {
      className: d("relative w-full max-w-sm font-sans", e),
      onBlur: (f) => {
        f.currentTarget.contains(f.relatedTarget) || L(!1);
      },
      children: [
        a && m === "standard" && R && U && /* @__PURE__ */ i(
          le,
          {
            ref: K,
            id: `${P}-label`,
            htmlFor: P,
            required: p.required,
            className: d("absolute left-0 top-0 z-10 mb-0 pl-4", u),
            children: a
          }
        ),
        /* @__PURE__ */ i(
          "select",
          {
            ...p,
            size: typeof n == "number" ? n : void 0,
            id: P,
            ref: D,
            className: "sr-only",
            tabIndex: -1,
            value: g,
            "aria-describedby": V,
            "aria-invalid": o ? !0 : p["aria-invalid"],
            onChange: (f) => {
              w(f.target.value), z?.(f);
            },
            children: y
          }
        ),
        /* @__PURE__ */ k(
          "button",
          {
            ref: F,
            type: "button",
            disabled: p.disabled,
            "aria-labelledby": a ? `${P}-label` : void 0,
            "aria-label": a ? void 0 : p["aria-label"] ?? r ?? "Select an option",
            "aria-describedby": V,
            "aria-haspopup": "listbox",
            "aria-expanded": A,
            "aria-controls": `${P}-options`,
            "aria-invalid": o ? !0 : void 0,
            className: d(
              Ce({
                variant: m,
                size: typeof n == "number" ? "normal" : n,
                disabled: p.disabled,
                iconLeft: !!b,
                iconRight: !0,
                notched: W
              }),
              "group text-left",
              H && "group mt-2 bg-background-surface",
              a && R && m === "standard" && "mt-2",
              !p.disabled && Pe[$]
            ),
            onClick: () => L((f) => !f),
            onKeyDown: (f) => {
              f.key === "Escape" && L(!1), f.key === "ArrowDown" && (f.preventDefault(), L(!0));
            },
            onBlur: (f) => {
              f.currentTarget.parentElement?.contains(f.relatedTarget) || L(!1);
            },
            children: [
              W && /* @__PURE__ */ k(we, { children: [
                /* @__PURE__ */ i(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: d(
                      "absolute bottom-0 left-0 top-0 w-3 rounded-l-md border-b border-l border-t group-focus-within:border-b-2 group-focus-within:border-l-2 group-focus-within:border-t-2",
                      p.disabled ? "border-text-disabled" : Q[$]
                    )
                  }
                ),
                /* @__PURE__ */ i(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: d(
                      "absolute bottom-0 left-3 right-3 border-b group-focus-within:border-b-2",
                      p.disabled ? "border-text-disabled" : Q[$]
                    )
                  }
                ),
                /* @__PURE__ */ i(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: d(
                      "absolute bottom-0 right-0 top-0 rounded-r-md border-b border-r border-t group-focus-within:border-b-2 group-focus-within:border-r-2 group-focus-within:border-t-2",
                      p.disabled ? "border-text-disabled" : Q[$]
                    ),
                    style: { left: 12 + (x ?? 0) }
                  }
                )
              ] }),
              a && !(m === "standard" && R && U) && /* @__PURE__ */ i(
                le,
                {
                  ref: K,
                  id: `${P}-label`,
                  htmlFor: P,
                  required: p.required,
                  className: d(
                    "pointer-events-none absolute z-10 mb-0 transition-all",
                    U ? R && m === "outlined" ? "left-3 -top-2 px-1 text-13" : R && m === "filled" ? "left-4 top-1 text-13" : d(
                      "top-1/2 -translate-y-1/2 text-inherit",
                      b ? n === "small" ? "left-9" : "left-[42px]" : "left-4"
                    ) : "sr-only",
                    !R && m !== "outlined" && "mt-[0.5px] group-focus-within:mt-px",
                    R && m === "outlined" && "bg-background-surface",
                    R && m === "filled" && "leading-14",
                    u
                  ),
                  children: a
                }
              ),
              b && /* @__PURE__ */ i(
                "span",
                {
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center [&_svg]:size-5",
                    ae[m]
                  ),
                  "aria-hidden": "true",
                  children: b
                }
              ),
              /* @__PURE__ */ i(
                "span",
                {
                  className: d(
                    "flex flex-1 items-center py-2 leading-5",
                    !R && ae[m],
                    m === "filled" && R && a && "self-stretch py-0 pt-[18px]"
                  ),
                  children: Z?.props.children ?? r ?? "Select an option"
                }
              ),
              /* @__PURE__ */ i(
                "span",
                {
                  className: d(
                    "inline-flex size-5 shrink-0 items-center justify-center",
                    ae[m]
                  ),
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ i(Oe, { className: "size-4" })
                }
              )
            ]
          }
        ),
        A && /* @__PURE__ */ i("ul", { id: `${P}-options`, role: "listbox", "aria-label": a ?? "Options", className: sa, children: G.map((f) => {
          const Y = String(f.props.value ?? ""), B = Y !== "" && Y === g;
          return /* @__PURE__ */ k(
            "li",
            {
              role: "option",
              "aria-selected": B,
              "aria-disabled": f.props.disabled,
              tabIndex: f.props.disabled ? void 0 : 0,
              className: d(
                "flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-action-hover focus:bg-action-hover focus:outline-none",
                B && "bg-action-selected",
                f.props.disabled && "cursor-not-allowed text-text-disabled"
              ),
              onMouseDown: (j) => j.preventDefault(),
              onClick: () => {
                f.props.disabled || E(Y);
              },
              onKeyDown: (j) => {
                !f.props.disabled && (j.key === "Enter" || j.key === " ") && (j.preventDefault(), E(Y)), j.key === "Escape" && (L(!1), F.current?.focus());
              },
              children: [
                f.props.children,
                c && B && /* @__PURE__ */ i($a, { className: d("size-4", ee[$]), "aria-hidden": "true" })
              ]
            },
            Y
          );
        }) }),
        X && /* @__PURE__ */ i(
          "p",
          {
            id: O,
            role: o ? "alert" : void 0,
            "aria-live": "polite",
            className: o ? Te : "mt-1 text-13 text-text-secondary",
            children: X
          }
        )
      ]
    }
  );
}
const $r = (e) => [
  `var(--palette-${e}-main)`,
  `var(--palette-${e === "primary" ? "secondary" : "primary"}-main)`,
  "var(--palette-success-main)",
  "var(--palette-info-main)",
  "var(--palette-warning-main)",
  "var(--palette-error-main)"
], Ar = ({
  type: e = "line",
  variant: a = "primary",
  data: r,
  series: t,
  colors: o,
  gridColor: l,
  textColor: s,
  tooltipBgColor: n,
  tooltipBorderColor: b,
  xAxisKey: c = "name",
  title: h,
  description: y,
  ariaLabel: v,
  height: I = 300,
  strokeWidth: z = 2,
  dot: T = { r: 4 },
  activeDot: p = { r: 6 },
  fillOpacity: S = 0.2,
  barRadius: m = [4, 4, 0, 0],
  outerRadius: $ = 80,
  innerRadius: P,
  showGrid: D = !0,
  showTooltip: F = !0,
  showLegend: G = !0,
  className: q
}) => {
  const w = ce(), A = `${w}-title`, L = `${w}-desc`, g = Ae(() => o && o.length > 0 ? o : $r(a), [o, a]), Z = Be(
    (u, E) => u.color || g[E % g.length],
    [g]
  ), { gridColor: R, textColor: U, customTooltipStyle: H, tooltipItemStyle: W, tooltipLabelStyle: X, axisTickStyle: O, legendStyle: V } = Ae(() => {
    const u = l || "var(--border-subtle)", E = s || "var(--text-primary)", f = n || "var(--background-surface)", Y = b || "var(--border-subtle)", B = "var(--font-family)", j = "var(--font-size-13)";
    return {
      gridColor: u,
      textColor: E,
      customTooltipStyle: {
        backgroundColor: f,
        borderColor: Y,
        borderRadius: "var(--radius-md)",
        color: E,
        fontSize: j,
        fontFamily: B
      },
      tooltipItemStyle: {
        color: E,
        fontSize: j,
        fontFamily: B
      },
      tooltipLabelStyle: {
        color: `var(--palette-${a}-main)`,
        fontSize: j,
        fontFamily: B,
        fontWeight: 600
      },
      axisTickStyle: {
        fill: E,
        fontSize: j,
        fontFamily: B
      },
      legendStyle: {
        color: E,
        fontSize: j,
        fontFamily: B
      }
    };
  }, [l, s, n, b, a]), x = Be(
    (u) => /* @__PURE__ */ i("span", { style: { color: U }, children: u }),
    [U]
  ), N = () => [
    D ? /* @__PURE__ */ i(La, { strokeDasharray: "3 3", stroke: R }, "grid") : null,
    /* @__PURE__ */ i(Oa, { dataKey: c, stroke: U, tick: O }, "xaxis"),
    /* @__PURE__ */ i(za, { stroke: U, tick: O }, "yaxis"),
    F ? /* @__PURE__ */ i(
      Re,
      {
        contentStyle: H,
        itemStyle: W,
        labelStyle: X
      },
      "tooltip"
    ) : null,
    G ? /* @__PURE__ */ i(We, { wrapperStyle: V, formatter: x }, "legend") : null
  ], K = () => {
    switch (e) {
      case "pie": {
        const E = t[0]?.dataKey || "value", f = c || "name", Y = r.map((B, j) => ({
          ...B,
          fill: B.fill || B.color || t[j]?.color || g[j % g.length]
        }));
        return /* @__PURE__ */ k(Sa, { children: [
          F && /* @__PURE__ */ i(Re, { contentStyle: H, itemStyle: W, labelStyle: X }),
          G && /* @__PURE__ */ i(We, { wrapperStyle: V, formatter: x }),
          /* @__PURE__ */ i(
            Na,
            {
              data: Y,
              dataKey: E,
              nameKey: f,
              cx: "50%",
              cy: "50%",
              innerRadius: P,
              outerRadius: $,
              label: !0
            }
          )
        ] });
      }
      case "bar":
        return /* @__PURE__ */ k(Ca, { data: r, children: [
          N(),
          t.map((u, E) => /* @__PURE__ */ i(
            Ta,
            {
              dataKey: u.dataKey,
              name: u.name || u.dataKey,
              fill: Z(u, E),
              radius: u.radius ?? m
            },
            u.dataKey
          ))
        ] });
      case "area":
        return /* @__PURE__ */ k(ka, { data: r, children: [
          N(),
          t.map((u, E) => {
            const f = Z(u, E);
            return /* @__PURE__ */ i(
              Pa,
              {
                type: "monotone",
                dataKey: u.dataKey,
                name: u.name || u.dataKey,
                stroke: f,
                strokeWidth: u.strokeWidth ?? z,
                fill: f,
                fillOpacity: u.fillOpacity ?? S
              },
              u.dataKey
            );
          })
        ] });
      default:
        return /* @__PURE__ */ k(xa, { data: r, children: [
          N(),
          t.map((u, E) => /* @__PURE__ */ i(
            wa,
            {
              type: "monotone",
              dataKey: u.dataKey,
              name: u.name || u.dataKey,
              stroke: Z(u, E),
              strokeWidth: u.strokeWidth ?? z,
              dot: u.dot ?? T,
              activeDot: u.activeDot ?? p
            },
            u.dataKey
          ))
        ] });
    }
  };
  return /* @__PURE__ */ k(
    "div",
    {
      className: d(
        "w-full rounded-md border border-border-subtle bg-background-surface p-6 font-sans text-text-primary",
        q
      ),
      role: "region",
      "aria-label": h ? void 0 : v || "Chart",
      "aria-labelledby": h ? A : void 0,
      "aria-describedby": y ? L : void 0,
      children: [
        (h || y) && /* @__PURE__ */ k("div", { className: "mb-4", children: [
          h && /* @__PURE__ */ i(ga, { id: A, level: "h3", weight: "semiBold", children: h }),
          y && /* @__PURE__ */ i("p", { className: "mt-1 text-13 text-text-secondary", id: L, children: y })
        ] }),
        /* @__PURE__ */ i("div", { className: "sr-only", children: /* @__PURE__ */ k("table", { "aria-label": h ? `${h} data` : v || "Chart data", children: [
          /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ k("tr", { children: [
            /* @__PURE__ */ i("th", { scope: "col", children: c }),
            t.map((u) => /* @__PURE__ */ i("th", { scope: "col", children: u.name || u.dataKey }, u.dataKey))
          ] }) }),
          /* @__PURE__ */ i("tbody", { children: r.map((u, E) => /* @__PURE__ */ k("tr", { children: [
            /* @__PURE__ */ i("td", { children: String(u[c] ?? "") }),
            t.map((f) => /* @__PURE__ */ i("td", { children: String(u[f.dataKey] ?? "") }, f.dataKey))
          ] }, E)) })
        ] }) }),
        /* @__PURE__ */ i(
          "div",
          {
            className: "min-h-48 w-full",
            style: { height: I },
            role: "img",
            "aria-label": `${h || v || "Chart"} visualization`,
            children: /* @__PURE__ */ i(ha, { width: "100%", height: "100%", children: K() })
          }
        )
      ]
    }
  );
}, hr = {
  xs: "text-12 leading-14",
  sm: "text-13 leading-18",
  md: "text-15 leading-20",
  lg: "text-18 leading-22",
  xl: "text-24 leading-28"
}, He = {
  subtitle1: { size: "lg", weight: "medium" },
  subtitle2: { size: "md", weight: "medium" },
  body1: { size: "md", weight: "regular" },
  body2: { size: "sm", weight: "regular" },
  caption: { size: "xs", weight: "regular" },
  overline: { size: "xs", weight: "medium" }
};
function Br({
  size: e,
  variant: a = "body1",
  weight: r,
  family: t,
  color: o,
  tone: l = "default",
  textTransform: s = "none",
  className: n,
  children: b,
  ...c
}) {
  const h = o ? pa(o === "text" ? "default" : o) : l;
  return /* @__PURE__ */ i(
    "p",
    {
      className: d(
        "m-0 font-sans",
        hr[e ?? He[a].size],
        ca[r ?? He[a].weight],
        da[h],
        ua[s],
        a === "overline" && "uppercase tracking-wider",
        n
      ),
      ...c,
      children: b
    }
  );
}
const xr = { left: "text-left", center: "text-center", right: "text-right" }, Xe = {
  primary: "bg-palette-primary-main text-misc-bg-white",
  secondary: "bg-palette-secondary-main text-misc-bg-white"
}, Je = {
  primary: "text-palette-primary-main hover:enabled:bg-palette-primary-opacity-lighter",
  secondary: "text-palette-secondary-main hover:enabled:bg-palette-secondary-opacity-lighter"
};
function wr(e) {
  return e ? Ze(e) && typeof e.props.onClick == "function" ? e : /* @__PURE__ */ i("span", { className: "inline-flex size-4 shrink-0 items-center justify-center", "aria-hidden": "true", children: e }) : null;
}
function Er({
  className: e,
  columns: a,
  data: r,
  getRowKey: t,
  pagination: o,
  emptyMessage: l = "No results found.",
  variant: s = "primary",
  stickyFirstColumn: n = !1,
  stickyLastColumn: b = !1,
  showColumnBorders: c = !1,
  striped: h = !1,
  breakpoint: y,
  ...v
}) {
  const I = o ? Math.max(1, Math.ceil(Math.max(0, o.total) / Math.max(1, o.pageSize))) : 0, z = o ? Math.min(Math.max(o.page, 1), I) : 0, T = y !== "mobile", p = a.some((m) => m.header != null && m.header !== ""), S = (m, $) => d(
    "border-border-subtle px-6 py-4 text-13",
    xr[m.align ?? "left"],
    c && $ > 0 && "border-l",
    T && n && $ === 0 && "sticky left-0",
    T && b && $ === a.length - 1 && "sticky right-0"
  );
  return /* @__PURE__ */ k("div", { className: d("w-full rounded-md border border-border-subtle bg-background-surface font-sans", e), children: [
    /* @__PURE__ */ i(
      "div",
      {
        tabIndex: 0,
        role: "region",
        "aria-label": "Scrollable table",
        className: "overflow-x-auto rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-palette-primary-main",
        children: /* @__PURE__ */ k(
          "table",
          {
            ...v,
            "aria-label": v["aria-label"] ?? "Data table",
            className: "w-max min-w-full border-separate border-spacing-0 text-text-primary",
            children: [
              p && /* @__PURE__ */ i("thead", { children: /* @__PURE__ */ i("tr", { children: a.map((m, $) => /* @__PURE__ */ i(
                "th",
                {
                  scope: "col",
                  className: d(
                    S(m, $),
                    Xe[s],
                    "z-10 border-b font-semibold first:rounded-tl-md last:rounded-tr-md"
                  ),
                  children: /* @__PURE__ */ k("span", { className: "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-1", children: [
                    m.header,
                    wr(m.sortIcon)
                  ] })
                },
                m.key
              )) }) }),
              /* @__PURE__ */ i("tbody", { children: r.length ? r.map((m, $) => /* @__PURE__ */ i("tr", { children: a.map((P, D) => {
                const F = !p && D === 0, G = F ? "th" : "td", q = P.fontWeight ?? ((!p || T && n) && D === 0 ? "semiBold" : "normal");
                return /* @__PURE__ */ i(
                  G,
                  {
                    scope: F ? "row" : void 0,
                    className: d(
                      S(P, D),
                      "border-b align-middle",
                      F ? Xe[s] : h && $ % 2 === 1 ? "bg-action-hover" : "bg-background-surface",
                      q === "semiBold" ? "font-semibold" : "font-regular",
                      $ === r.length - 1 && "border-b-0",
                      !p && $ === 0 && D === 0 && "rounded-tl-md",
                      !p && $ === 0 && D === a.length - 1 && "rounded-tr-md",
                      F && $ === r.length - 1 && "rounded-bl-md"
                    ),
                    children: P.render ? P.render(m, $) : String(m[P.key] ?? "")
                  },
                  P.key
                );
              }) }, t?.(m, $) ?? $)) : /* @__PURE__ */ i("tr", { children: /* @__PURE__ */ i("td", { colSpan: Math.max(a.length, 1), className: "px-6 py-8 text-center", children: l }) }) })
            ]
          }
        )
      }
    ),
    o && /* @__PURE__ */ k(
      "nav",
      {
        "aria-label": "Table pagination",
        className: "flex items-center justify-end gap-2 border-t border-border-subtle px-6 py-4",
        children: [
          /* @__PURE__ */ k(
            "button",
            {
              type: "button",
              onClick: () => o.onPageChange(z - 1),
              disabled: z <= 1,
              className: d(
                "inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-13 font-semibold disabled:cursor-not-allowed disabled:opacity-45",
                Je[s]
              ),
              children: [
                o.previousIcon && /* @__PURE__ */ i("span", { className: "inline-flex size-4", "aria-hidden": "true", children: o.previousIcon }),
                /* @__PURE__ */ i("span", { children: "Previous" })
              ]
            }
          ),
          o.pageStatus && /* @__PURE__ */ i("span", { "aria-live": "polite", className: "text-13 text-text-secondary", children: o.pageStatus }),
          /* @__PURE__ */ k(
            "button",
            {
              type: "button",
              onClick: () => o.onPageChange(z + 1),
              disabled: z >= I,
              className: d(
                "inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-13 font-semibold disabled:cursor-not-allowed disabled:opacity-45",
                Je[s]
              ),
              children: [
                /* @__PURE__ */ i("span", { children: "Next" }),
                o.nextIcon && /* @__PURE__ */ i("span", { className: "inline-flex size-4", "aria-hidden": "true", children: o.nextIcon })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const xe = {
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
}, va = { Dark: "dark", Light: "light", Teal: "teal" };
function ma(e) {
  const a = e.match(/^\{(.+)\}$/);
  if (!a) return e;
  let r = xe;
  for (const t of a[1].split(".")) {
    if (!r || typeof r != "object" || !(t in r))
      throw new Error(`Unknown token reference: ${e}`);
    r = r[t];
  }
  if (!r || typeof r != "object" || !("$value" in r) || typeof r.$value != "string")
    throw new Error(`Invalid token reference: ${e}`);
  return ma(r.$value);
}
const Ge = (e) => Object.fromEntries(
  Object.entries(e).flatMap(([a, r]) => typeof r == "string" ? [] : [[a, ma(r.$value)]])
), de = (e, a = "") => Object.fromEntries(Object.entries(Ge(e)).map(([r, t]) => [r.replace(a, ""), t])), ye = (e, a = "") => Object.fromEntries(
  Object.entries(Ge(e)).map(([r, t]) => [r.replace(a, ""), Number.parseFloat(t)])
);
function kr(e) {
  const a = xe.Variables[e], r = xe.Primitives[e], t = Ge(a["Color-Palette"]);
  return {
    core: {
      color: {
        primary: de(r.Color.Primary, "primary-"),
        secondary: de(r.Color.Secondary, "secondary-"),
        info: de(r.Color.Info, "info-"),
        error: de(r.Color.Error, "error-"),
        warning: de(r.Color.Warning, "warning-"),
        success: de(r.Color.Success, "success-"),
        gray: de(r.Color.Gray, "gray-"),
        palette: t
      },
      space: ye(r.Gap, "gap-"),
      radius: ye(r["Border-Radius"], /^(border-radius-|border-)/),
      fontFamily: r.Typography["font-family"].$value,
      fontSize: ye(r.Typography["font-size"]),
      fontWeight: ye(r.Typography["font-weight"]),
      lineHeight: ye(r.Typography["line-height"])
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
const he = Object.fromEntries(
  Object.keys(xe.Variables).map((e) => [va[e], kr(e)])
), Mr = Object.values(va), Rr = { core: he.light.core, semantic: he.light.semantic, themes: he }, Wr = (e) => he[e], jr = { mobile: "640px", tablet: "900px", desktop: "1280px" };
export {
  Nr as Accordion,
  Lr as Autocomplete,
  Br as BodyText,
  Or as Button,
  zr as Carousel,
  Ar as Chart,
  ga as Heading,
  Dr as Input,
  le as LabelText,
  Br as Paragraph,
  Ir as Select,
  Er as Table,
  Gr as Textarea,
  jr as breakpoints,
  Wr as getThemeTokens,
  Mr as themeModes,
  Rr as themeTokens
};
