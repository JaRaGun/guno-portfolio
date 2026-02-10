import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const isMounted = ref(false);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full bg-black overflow-hidden" }, _attrs))}><div class="absolute inset-0 z-0"></div><main class="relative z-10 flex items-center justify-center w-full h-full p-6 pointer-events-none">`);
      if (isMounted.value) {
        _push(`<div id="container" class="text-white text-center font-space-mono w-full max-w-2xl pointer-events-auto"><h1 id="name" class="text-sm opacity-0" style="${ssrRenderStyle({ "transform": "translateY(30px)" })}">Jan Rafael C. Guno</h1><p id="intro" class="font-exo uppercase text-4xl opacity-0 mt-4" style="${ssrRenderStyle({ "transform": "translateY(30px)" })}"> Welcome! Explore my work as a Full Stack Web Developer, where design meets functionality. </p><a style="${ssrRenderStyle({ "transform": "translateY(30px)" })}" id="view-btn" target="_blank" href="" class="opacity-0 border px-4 py-2 uppercase mt-8 hover:bg-white hover:text-gray-800 inline-block">View work</a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-tPOnTDbR.mjs.map
