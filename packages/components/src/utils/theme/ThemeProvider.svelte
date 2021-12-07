<script>
  import { setContext, onMount, onDestroy } from "svelte";

  import createCurrentThemeStore from "./currentThemeStore";
  import createThemesStore from "./themesStore";
  import common from "../../brands/common";

  // Base variables that each theme references
  import "../../brands/base";

  // List of theme objects that this application supports
  export let initialThemes = [];

  // Name of theme to use
  export let themeName = "";

  // Overridable key for locating the theme svelte context
  // We recommend using `{}` instead so that the key is ensured to be unique
  export let contextKey = "theme";

  const currentTheme = createCurrentThemeStore();
  const themes = createThemesStore(initialThemes);

  // Set theme CSS variables for use across application
  // ex: var(--t-primary)
  const setCustomProperties = (theme) => {
    document.documentElement.style.cssText = "";

    if (theme) {
      document.documentElement.style.setProperty("--theme-name", theme.name);
      Object.entries({ ...common.variables, ...theme.variables }).forEach(
        (entry) => {
          document.documentElement.style.setProperty(
            `--t-${entry[0]}`,
            entry[1]
          );
        }
      );
    }
  };

  let unsubscribe;
  onMount(() => {
    unsubscribe = currentTheme.subscribe((name) => {
      // update internal state
      const theme = themes.get(name);

      setCustomProperties(theme);
    });
  });

  onDestroy(() => {
    unsubscribe();
  });

  // Set the theme with default or if ThemeProvider property changes
  const setTheme = (name) => {
    if (name) {
      currentTheme.set(name);
    }
  };
  $: setTheme(themeName);

  // Providing theme stores through context via contextKey
  setContext(contextKey, {
    currentTheme,
    themes,
  });
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"
    rel="stylesheet"
  />
</svelte:head>
<slot />

<style global>
  html.gbs {
    font-size: 62.5%;
  }

  body.gbs {
    color: var(--t-color-text-primary);
    font-size: var(--t-font-body-size-primary);
    font-family: var(--t-font-family-primary);
    line-height: var(--t-font-body-line-height-primary);
  }

  .gbs p,
  .gbs h1,
  .gbs h2,
  .gbs h3,
  .gbs h4 {
    font-weight: var(--t-font-weight-primary);
    word-break: break-word; /* Prevent text overflow */
    hyphens: auto;
  }

  .gbs h1,
  .gbs h2,
  .gbs h3,
  .gbs h4 {
    margin-bottom: 0.65em;

    font-weight: var(--t-font-weight-header);
    font-family: var(--t-font-family-tertiary);
  }

  .gbs-body-primary {
    font-size: var(--t-font-body-size-primary);
    line-height: var(--t-font-body-line-height-primary);
  }

  .gbs-body-secondary {
    font-size: var(--t-font-body-size-secondary);
    line-height: var(--t-font-body-line-height-secondary);
  }

  .gbs-caption,
  .gbs-body-tertiary {
    font-size: var(--t-font-body-size-tertiary);
    line-height: var(--t-font-body-line-height-tertiary);
  }

  .gbs-heading-900 {
    font-size: var(--t-font-heading-900-size);
    line-height: var(--t-font-heading-900-line-height);
  }

  .gbs-heading-800 {
    font-size: var(--t-font-heading-800-size);
    line-height: var(--t-font-heading-800-line-height);
  }

  .gbs-heading-700 {
    font-size: var(--t-font-heading-700-size);
    line-height: var(--t-font-heading-700-line-height);
  }

  .gbs-heading-600 {
    font-size: var(--t-font-heading-600-size);
    line-height: var(--t-font-heading-600-line-height);
  }

  .gbs-heading-500,
  .gbs h1 {
    font-size: var(--t-font-heading-500-size);
    line-height: var(--t-font-heading-500-line-height);
  }

  .gbs-heading-400,
  .gbs h2 {
    font-size: var(--t-font-heading-400-size);
    line-height: var(--t-font-heading-400-line-height);
  }

  .gbs-heading-300,
  .gbs h3 {
    font-size: var(--t-font-heading-300-size);
    line-height: var(--t-font-heading-300-line-height);
  }

  .gbs-heading-200,
  .gbs h4 {
    font-size: var(--t-font-heading-200-size);
    line-height: var(--t-font-heading-200-line-height);
  }

  .gbs-heading-100 {
    font-weight: var(--t-font-weight-header);
    font-size: var(--t-font-heading-100-size);
    line-height: var(--t-font-heading-100-line-height);
  }

  .gbs-heading-75 {
    font-weight: var(--t-font-weight-header);
    font-size: var(--t-font-heading-75-size);
    line-height: var(--t-font-heading-75-line-height);
  }
</style>
