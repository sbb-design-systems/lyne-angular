# Getting started @sbb-esta/lyne-angular-experimental

1. Follow the getting started guide for the `@sbb-esta/angular` package to set up your Angular application and install the base package.
2. Install the `@sbb-esta/lyne-angular-experimental` package:

   ```sh
   npm install --save @sbb-esta/lyne-angular-experimental
   ```

3. Including the global styles to apply all SBB styles to your application.
   Importing stylesheets is done by editing the `styles.(s)css`:

   ```css
   /* From previous getting started guide */
   @import 'node_modules/@sbb-esta/lyne-elements/standard-theme.css';
   @import 'node_modules/@sbb-esta/lyne-elements-experimental/standard-theme.css';
   ```

   or editing your `angular.json`:

   ```json
     ...
     "styles": [
       "src/styles.scss",
       "node_modules/@sbb-esta/lyne-elements/standard-theme.css",
       "node_modules/@sbb-esta/lyne-elements-experimental/standard-theme.css"
     ],
     ...
   ```
