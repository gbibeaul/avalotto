# Application Branding

## Branding Variables

Components can be branded by using one of many themes usable in the different games and applications of the Gamblefi platform.

### Base

The Base variable set is intended for use within the theme definitions.  It is not intended that applications or components use Base variables directly. It is intended that the theme definitions use the Base variables to define the theme.

Base variables are namespaced with `--base-*`.

### Themes

Themes use the Base variables and assign them to variables that are meant to be consumed by components and applications.  These variable names are the interface into styling components and applications.  If you are adding a new theme, you should probably fill in values for all the existing theme variables.

Theme variables are namespaced with `--t-*`.
### Applications

Finally, application will most likely have their own variables to use for themselves.  These should be namespaced to that application as well. Somethign like: `--<app-short-name>-*`

## Consumming

To comsume a theme install the workspace package.

