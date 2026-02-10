import { _ as __nuxt_component_0 } from './nuxt-link-CO04yGHi.mjs';
import { defineComponent, ref, mergeProps, withCtx, openBlock, createBlock, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useRoute } from './server.mjs';
import { u as useProjects } from './useProjects-D5_VnQLT.mjs';
import { u as useHead } from './composables-CSkMxVx9.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const { getImageUrl } = useProjects();
    const project = ref(null);
    useHead(() => ({
      title: project.value ? `${project.value.title} - Portfolio` : "Project - Portfolio",
      meta: [
        {
          name: "description",
          content: project.value?.description || "View project details"
        }
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-cyber-dark cyber-grid" }, _attrs))}><nav class="fixed top-0 left-0 right-0 z-50 px-6 py-6 backdrop-blur-md bg-cyber-dark/80 border-b border-cyber-grid">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/work",
        class: "inline-flex items-center gap-2 text-cyber-accent hover:text-white transition-colors group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId}></path></svg><span class="font-space-mono text-sm uppercase"${_scopeId}>Back to Projects</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 transform group-hover:-translate-x-1 transition-transform",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 19l-7-7 7-7"
                })
              ])),
              createVNode("span", { class: "font-space-mono text-sm uppercase" }, "Back to Projects")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav>`);
      if (!unref(project)) {
        _push(`<div class="pt-32 px-6"><div class="max-w-6xl mx-auto"><div class="animate-pulse space-y-8"><div class="h-12 bg-cyber-grid rounded w-1/2"></div><div class="aspect-video bg-cyber-grid rounded-lg"></div><div class="space-y-3"><div class="h-4 bg-cyber-grid rounded w-3/4"></div><div class="h-4 bg-cyber-grid rounded w-full"></div><div class="h-4 bg-cyber-grid rounded w-5/6"></div></div></div></div></div>`);
      } else {
        _push(`<div class="pt-32 px-6 pb-20"><article class="max-w-6xl mx-auto space-y-12"><header class="space-y-6"><h1 id="project-title" class="text-white font-exo text-5xl md:text-7xl font-bold glow-text opacity-0" style="${ssrRenderStyle({ "transform": "translateY(30px)" })}">${ssrInterpolate(unref(project).title)}</h1><div id="project-meta" class="flex flex-wrap gap-4 items-center opacity-0" style="${ssrRenderStyle({ "transform": "translateY(20px)" })}">`);
        if (unref(project).techStack && unref(project).techStack.length) {
          _push(`<div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(unref(project).techStack, (tech) => {
            _push(`<span class="px-3 py-1.5 text-sm font-space-mono bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30 rounded hover:bg-cyber-accent/20 transition-colors">${ssrInterpolate(tech)}</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(project).projectUrl) {
          _push(`<a${ssrRenderAttr("href", unref(project).projectUrl)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-cyber-accent text-cyber-dark font-space-mono text-sm font-bold rounded hover:bg-white transition-colors group"><span>Visit Project</span><svg class="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></header><div id="main-image" class="opacity-0" style="${ssrRenderStyle({ "transform": "translateY(40px)" })}"><div class="glass-card overflow-hidden rounded-2xl shadow-glow-md">`);
        if (unref(project).mainImage) {
          _push(`<img${ssrRenderAttr("src", unref(getImageUrl)(unref(project).mainImage, 1600))}${ssrRenderAttr("alt", unref(project).mainImage.alt || unref(project).title)} class="w-full h-auto">`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (unref(project).description) {
          _push(`<div id="description" class="prose prose-invert max-w-none opacity-0" style="${ssrRenderStyle({ "transform": "translateY(30px)" })}"><p class="text-gray-300 font-space-mono text-lg leading-relaxed">${ssrInterpolate(unref(project).description)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(project).gallery && unref(project).gallery.length) {
          _push(`<div id="gallery" class="opacity-0" style="${ssrRenderStyle({ "transform": "translateY(40px)" })}"><h2 class="text-white font-exo text-3xl font-bold mb-8">Project Gallery</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
          ssrRenderList(unref(project).gallery, (image, index) => {
            _push(`<div class="glass-card overflow-hidden rounded-lg hover:shadow-glow-md transition-shadow"><img${ssrRenderAttr("src", unref(getImageUrl)(image, 800))}${ssrRenderAttr("alt", image.alt || `${unref(project).title} - Image ${index + 1}`)} class="w-full h-auto"></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/work/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-B001qTEn.mjs.map
