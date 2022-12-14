(() => {
  "use strict";
  let e = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        e.Android() || e.BlackBerry() || e.iOS() || e.Opera() || e.Windows()
      );
    },
  };
  let t = !0,
    n = (e = 500) => {
      let n = document.querySelector("body");
      if (t) {
        let r = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < r.length; e++) {
            r[e].style.paddingRight = "0px";
          }
          (n.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    },
    r = (e = 500) => {
      let n = document.querySelector("body");
      if (t) {
        let r = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < r.length; e++) {
          r[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (n.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    };
  let o = !1;
  function a(e) {
    this.type = e;
  }
  setTimeout(() => {
    if (o) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (a.prototype.init = function () {
      const e = this;
      (this.??bjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          n = t.dataset.da.trim().split(","),
          r = {};
        (r.element = t),
          (r.parent = t.parentNode),
          (r.destination = document.querySelector(n[0].trim())),
          (r.breakpoint = n[1] ? n[1].trim() : "767"),
          (r.place = n[2] ? n[2].trim() : "last"),
          (r.index = this.indexInParent(r.parent, r.element)),
          this.??bjects.push(r);
      }
      this.arraySort(this.??bjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.??bjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, n) {
            return Array.prototype.indexOf.call(n, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const n = this.mediaQueries[t],
          r = String.prototype.split.call(n, ","),
          o = window.matchMedia(r[0]),
          a = r[1],
          i = Array.prototype.filter.call(this.??bjects, function (e) {
            return e.breakpoint === a;
          });
        o.addListener(function () {
          e.mediaHandler(o, i);
        }),
          this.mediaHandler(o, i);
      }
    }),
    (a.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const n = t[e];
          (n.index = this.indexInParent(n.parent, n.element)),
            this.moveTo(n.place, n.element, n.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const n = t[e];
          n.element.classList.contains(this.daClassname) &&
            this.moveBack(n.parent, n.element, n.index);
        }
    }),
    (a.prototype.moveTo = function (e, t, n) {
      t.classList.add(this.daClassname),
        "last" === e || e >= n.children.length
          ? n.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? n.children[e].insertAdjacentElement("beforebegin", t)
          : n.insertAdjacentElement("afterbegin", t);
    }),
    (a.prototype.moveBack = function (e, t, n) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[n]
          ? e.children[n].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (a.prototype.indexInParent = function (e, t) {
      const n = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(n, t);
    }),
    (a.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new a("max").init();
  [...document.querySelectorAll(".menu-bottom__link_arrow")].forEach((e) => {
    e.onclick = () => {
      const t = e.closest(".menu-bottom__item");
      if (t) {
        if (t.classList.contains("_active")) t.classList.remove("_active");
        else {
          const n = e
            .closest(".menu-bottom__list")
            .querySelectorAll("._active");
          n.length > 0 && [...n].forEach((e) => e.classList.remove("_active")),
            t.classList.toggle("_active");
        }
        return !1;
      }
    };
  });
  !(function () {
    const e = document.getElementById("range"),
      t = document.querySelector(".range__value");
    e.addEventListener("input", function () {
      const e = this.value;
      t.innerHTML = e;
    });
  })();
  for (let e of document.querySelectorAll('input[type="range"]'))
    e.style.setProperty("--value", e.value),
      e.style.setProperty("--min", "" == e.min ? "22" : e.min),
      e.style.setProperty("--max", "" == e.max ? "80" : e.max),
      e.addEventListener("input", () =>
        e.style.setProperty("--value", e.value)
      );
  const i = document.querySelectorAll("input"),
    l = document.querySelector("#range"),
    c = document.querySelectorAll('[name ="type"]'),
    s = document.querySelectorAll('[name ="typeProperty"]'),
    u = document.querySelectorAll('[name ="rooms"]'),
    d = document.querySelector("#price-value"),
    p = document.querySelector("#period-value");
  function m() {
    let e = 2450 * parseInt(l.value),
      t = 30 * parseFloat(l.value);
    c.forEach((n) => {
      n.checked && ((e *= parseFloat(n.value)), (t *= parseFloat(n.value)));
    }),
      s.forEach((n) => {
        n.checked && ((e *= parseFloat(n.value)), (t *= parseFloat(n.value)));
      }),
      u.forEach((n) => {
        n.checked && ((e *= parseFloat(n.value)), (t *= parseFloat(n.value)));
      });
    const n = new Intl.NumberFormat("ru");
    (d.innerText = n.format(Math.round(e))),
      (p.innerText = Math.round(0.01 * t));
  }
  l.addEventListener("input", function () {
    l.value, l.value;
  }),
    m();
  for (const e of i)
    e.addEventListener("input", function () {
      m();
    });
  window.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll(".tel"), function (e) {
      var t;
      function n(e) {
        e.keyCode && (t = e.keyCode),
          this.selectionStart < 3 && e.preventDefault();
        var n = "+7 (___) ___ ____",
          r = 0,
          o = n.replace(/\D/g, ""),
          a = this.value.replace(/\D/g, ""),
          i = n.replace(/[_\d]/g, function (e) {
            return r < a.length ? a.charAt(r++) || o.charAt(r) : e;
          });
        -1 != (r = i.indexOf("_")) && (r < 5 && (r = 3), (i = i.slice(0, r)));
        var l = n
          .substr(0, this.value.length)
          .replace(/_+/g, function (e) {
            return "\\d{1," + e.length + "}";
          })
          .replace(/[+()]/g, "\\$&");
        (!(l = new RegExp("^" + l + "$")).test(this.value) ||
          this.value.length < 5 ||
          (t > 47 && t < 58)) &&
          (this.value = i),
          "blur" == e.type && this.value.length < 5 && (this.value = "");
      }
      e.addEventListener("input", n, !1),
        e.addEventListener("focus", n, !1),
        e.addEventListener("blur", n, !1),
        e.addEventListener("keydown", n, !1);
    });
  }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    e.any() && document.documentElement.classList.add("touch"),
    document.querySelector(".icon-menu") &&
      document.addEventListener("click", function (e) {
        t &&
          e.target.closest(".icon-menu") &&
          (((e = 500) => {
            document.documentElement.classList.contains("lock") ? n(e) : r(e);
          })(),
          document.documentElement.classList.toggle("menu-open"));
      });
})();
