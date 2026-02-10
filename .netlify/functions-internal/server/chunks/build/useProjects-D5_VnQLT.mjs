import { readonly, toRef, isRef } from 'vue';
import { a as useNuxtApp } from './server.mjs';

const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useProjects = () => {
  const projects = useState("projects", () => []);
  const loading = useState("projects-loading", () => false);
  const error = useState("projects-error", () => null);
  const fetchProjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { sanityClient, queries } = await import('./sanity-DmfqrQO0.mjs');
      const data = await sanityClient.fetch(queries.allProjects);
      projects.value = data;
    } catch (e) {
      error.value = e;
      console.error("Error fetching projects:", e);
    } finally {
      loading.value = false;
    }
  };
  const fetchProjectBySlug = async (slug) => {
    try {
      const { sanityClient, queries } = await import('./sanity-DmfqrQO0.mjs');
      const data = await sanityClient.fetch(queries.projectBySlug(slug));
      return data;
    } catch (e) {
      console.error("Error fetching project:", e);
      return null;
    }
  };
  const getImageUrl = (imageRef, width = 1600) => {
    try {
      if (!imageRef) return "";
      if (imageRef.asset && imageRef.asset._ref) {
        const projectId = "b5uobbbz";
        const dataset = "production";
        const imageId = imageRef.asset._ref;
        const parts = imageId.split("-");
        if (parts.length >= 4) {
          const assetId = parts.slice(1, -2).join("-");
          const dimensions = parts[parts.length - 2];
          const format = parts[parts.length - 1];
          return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}?w=${width}&q=90&auto=format`;
        }
      }
      return "";
    } catch (error2) {
      console.error("Error generating image URL:", error2);
      return "";
    }
  };
  return {
    projects: readonly(projects),
    loading: readonly(loading),
    error: readonly(error),
    fetchProjects,
    fetchProjectBySlug,
    getImageUrl
  };
};

export { useProjects as u };
//# sourceMappingURL=useProjects-D5_VnQLT.mjs.map
