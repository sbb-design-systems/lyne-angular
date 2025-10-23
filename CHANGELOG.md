# Changelog

## [20.0.0-rc.8](https://github.com/sbb-design-systems/lyne-angular/compare/v20.0.0-rc.7...v20.0.0-rc.8) (2025-10-13)


### Features

* **sbb-dialog, sbb-overlay, sbb-toast:** provide services to create components programmatically ([#155](https://github.com/sbb-design-systems/lyne-angular/issues/155)) ([917fdc2](https://github.com/sbb-design-systems/lyne-angular/commit/917fdc2f8590d89246e82c005a442cd42bec8df3))


### Bug Fixes

* **deps:** update angular ([01ab267](https://github.com/sbb-design-systems/lyne-angular/commit/01ab267352fdd53099eaae316648dda7c9c7b66a))
* **deps:** update esta to v3.11.0 ([#202](https://github.com/sbb-design-systems/lyne-angular/issues/202)) ([c8f2d6a](https://github.com/sbb-design-systems/lyne-angular/commit/c8f2d6a056329ca6c2acab5cf2408a6d84114bea))


### Documentation

* add readme for tabcontent directive ([#200](https://github.com/sbb-design-systems/lyne-angular/issues/200)) ([e0b1b8f](https://github.com/sbb-design-systems/lyne-angular/commit/e0b1b8f466bca054cc049f0590c294d3dbad89f5))

## [20.0.0-rc.7](https://github.com/sbb-design-systems/lyne-angular/compare/v20.0.0-rc.6...v20.0.0-rc.7) (2025-10-07)


### Features

* add tooltip directives ([#193](https://github.com/sbb-design-systems/lyne-angular/issues/193)) ([70640ce](https://github.com/sbb-design-systems/lyne-angular/commit/70640ce1380c456f66e49088c2fbda7c9f8fdadb))
* **sbb-tab-module:** add tabContent directive ([#194](https://github.com/sbb-design-systems/lyne-angular/issues/194)) ([1acde12](https://github.com/sbb-design-systems/lyne-angular/commit/1acde122a55be77d4deb40afdb5f3db3ef99b5fb))


### Bug Fixes

* **deps:** update angular ([e5cb63a](https://github.com/sbb-design-systems/lyne-angular/commit/e5cb63a4e68865e41ea316f1c7296a953fc12a5e))
* **deps:** update angular ([6bd937c](https://github.com/sbb-design-systems/lyne-angular/commit/6bd937ccfe022c5b3d7ff99ae2be49dd4f35d1f1))
* **deps:** update angular to v20.3.1 ([f22e463](https://github.com/sbb-design-systems/lyne-angular/commit/f22e4639b46e2812d5b9396addaa82f35ab3eddd))
* **deps:** update angular to v20.3.3 ([4f06c15](https://github.com/sbb-design-systems/lyne-angular/commit/4f06c15f1b2359d56c72864cb0a27c86e737ced0))
* **deps:** update dependency @angular/cdk to v20.2.7 ([865ff94](https://github.com/sbb-design-systems/lyne-angular/commit/865ff943cf10f3d6a6229ed936e144bf5a6849da))
* **deps:** update esta to v3.10.0 ([#198](https://github.com/sbb-design-systems/lyne-angular/issues/198)) ([2456e5d](https://github.com/sbb-design-systems/lyne-angular/commit/2456e5d066607fe032731b74a5db20d1936ed67f))
* **deps:** update esta to v3.8.0 ([#186](https://github.com/sbb-design-systems/lyne-angular/issues/186)) ([e7d47f8](https://github.com/sbb-design-systems/lyne-angular/commit/e7d47f8439e3f4da8d912bb0d4ccba77eafe499e))
* **deps:** update esta to v3.9.0 ([#196](https://github.com/sbb-design-systems/lyne-angular/issues/196)) ([1d42e98](https://github.com/sbb-design-systems/lyne-angular/commit/1d42e9851e062f7b87c2d4f65dee9edcee8f7764))
* exclude root's index.ts from hasCommonModule logic ([#191](https://github.com/sbb-design-systems/lyne-angular/issues/191)) ([3605ddb](https://github.com/sbb-design-systems/lyne-angular/commit/3605ddb6c43a9bacfc2075529e4912b24b2b2c68))


### Code Refactoring

* adapt to dark mode color changes ([#189](https://github.com/sbb-design-systems/lyne-angular/issues/189)) ([c803503](https://github.com/sbb-design-systems/lyne-angular/commit/c803503c39992fc55f493ee8d0d007fa57c97e64))

## [20.0.0-rc.6](https://github.com/sbb-design-systems/lyne-angular/compare/v20.0.0-rc.5...v20.0.0-rc.6) (2025-09-16)


### Bug Fixes

* **deps:** update angular ([1022431](https://github.com/sbb-design-systems/lyne-angular/commit/10224310cfecb1d90485160d9cd13085d2cbdb13))
* **deps:** update angular to v20.3.0 ([ee16b4d](https://github.com/sbb-design-systems/lyne-angular/commit/ee16b4d7c9af232e583350f0c5b8a5ec520d1c4f))
* **deps:** update esta to v3.7.0 ([#185](https://github.com/sbb-design-systems/lyne-angular/issues/185)) ([1458753](https://github.com/sbb-design-systems/lyne-angular/commit/14587531fd271fdfc1247169207e642ea14e34ee))
* revert modules to @NgModule instances ([#183](https://github.com/sbb-design-systems/lyne-angular/issues/183)) ([3e292a7](https://github.com/sbb-design-systems/lyne-angular/commit/3e292a74aa545e625e7d47d0aae4d7a39055ef47))

## [20.0.0-rc.5](https://github.com/sbb-design-systems/lyne-angular/compare/v20.0.0-rc.4...v20.0.0-rc.5) (2025-09-08)


### ⚠ BREAKING CHANGES

* Previously we had a mix of types for outputs. With this change we align all outputs to OutputRefs. With this also the names changed. E.g. an `openSignal` becomes `openOutput`.

### Features

* **sbb-form-field:** provide support for custom controls ([#178](https://github.com/sbb-design-systems/lyne-angular/issues/178)) ([19c91f7](https://github.com/sbb-design-systems/lyne-angular/commit/19c91f73681ca19a8fcd80a707462dde84bc1713)), closes [#55](https://github.com/sbb-design-systems/lyne-angular/issues/55)


### Bug Fixes

* align output types by using OutputRef ([#180](https://github.com/sbb-design-systems/lyne-angular/issues/180)) ([c4d643f](https://github.com/sbb-design-systems/lyne-angular/commit/c4d643fe55c79fb0dced544bd9f58e800e86a90f))
* **deps:** update angular ([e9662ff](https://github.com/sbb-design-systems/lyne-angular/commit/e9662ff0d7ec952bd47e8924642c32973f3f9be4))
* **deps:** update angular ([caeb4a6](https://github.com/sbb-design-systems/lyne-angular/commit/caeb4a692b61e79191b10b9b2733084861887cf5))
* **deps:** update angular to v20.2.3 ([7ce40c0](https://github.com/sbb-design-systems/lyne-angular/commit/7ce40c0c7322dd6634d59648984bf8129e2fad86))
* **deps:** update dependency @angular/cdk to v20.2.2 ([4724030](https://github.com/sbb-design-systems/lyne-angular/commit/472403084b52e97efed3af58c1b76f829dc123f6))
* **deps:** update esta to v3.5.0 ([#179](https://github.com/sbb-design-systems/lyne-angular/issues/179)) ([0b835f1](https://github.com/sbb-design-systems/lyne-angular/commit/0b835f15ad07cc910ac41c83f2043d0c972a8f09))
* **deps:** update esta to v3.6.0 ([#181](https://github.com/sbb-design-systems/lyne-angular/issues/181)) ([b0a1583](https://github.com/sbb-design-systems/lyne-angular/commit/b0a1583484e33818002808c3221ecb97e986b47d))

## [20.0.0-rc.4](https://github.com/sbb-design-systems/lyne-angular/compare/v20.0.0-rc.3...v20.0.0-rc.4) (2025-08-26)


### Bug Fixes

* declare modules as const ([#175](https://github.com/sbb-design-systems/lyne-angular/issues/175)) ([c37173b](https://github.com/sbb-design-systems/lyne-angular/commit/c37173b975263ce149a3aa1167dd882fb99c4ad2))

## [20.0.0-rc.3](https://github.com/sbb-design-systems/lyne-angular/compare/v20.0.0-rc.2...v20.0.0-rc.3) (2025-08-26)


### ⚠ BREAKING CHANGES

* The components of the following modules have received a group export while the individual exports were removed. Additionally, there is a module symbol (e.g. SbbAutocompleteModule) which can be imported in order to import all components at once. Migrated modules: 'alert', 'autocomplete-grid', 'breadcrumb', 'card', 'chip', 'datepicker', 'dialog', 'expansion-panel', 'flip-card', 'form-field', 'header', 'menu', 'navigation', 'option', 'popover', 'stepper', 'sidebar', 'tabs', 'tag', 'toggle', 'train', 'seat-reservation'.

### Features

* **sbb-autocomplete-grid:** enable complex values ([f3fdffa](https://github.com/sbb-design-systems/lyne-angular/commit/f3fdffa32996d59ee0c21f85588921803f6362ce))
* **sbb-autocomplete-grid:** re-export SbbAutocompleteTrigger directive ([#172](https://github.com/sbb-design-systems/lyne-angular/issues/172)) ([c490268](https://github.com/sbb-design-systems/lyne-angular/commit/c49026868a3745760160f4d60ecd187cbf310e0a))


### Bug Fixes

* avoid animations during component initialization ([#166](https://github.com/sbb-design-systems/lyne-angular/issues/166)) ([bc08c88](https://github.com/sbb-design-systems/lyne-angular/commit/bc08c88e3fb7b1fb278118c344165b973be18814)), closes [#163](https://github.com/sbb-design-systems/lyne-angular/issues/163)
* **deps:** update angular ([c393010](https://github.com/sbb-design-systems/lyne-angular/commit/c3930107f1e83b3e3bd71467f260bafce8042b33))
* **deps:** update angular to v20.1.7 ([55de218](https://github.com/sbb-design-systems/lyne-angular/commit/55de218249ffe13054dfe6c101b3e58622f8090e))
* **deps:** update angular to v20.2.0 ([36319f7](https://github.com/sbb-design-systems/lyne-angular/commit/36319f7573ce2c9c83ffc9940383f9c713c07f00))
* **deps:** update angular to v20.2.1 ([119d747](https://github.com/sbb-design-systems/lyne-angular/commit/119d747a555d2ed991cfe6dfab6b5c9dd2b2bed3))
* **deps:** update dependency @angular/cdk to v20.1.6 ([69b5b79](https://github.com/sbb-design-systems/lyne-angular/commit/69b5b79d7cf4c4a6e7be3978a8d1b3f9758bc167))
* **deps:** update dependency @sbb-esta/lyne-design-tokens to v1.6.1 ([#164](https://github.com/sbb-design-systems/lyne-angular/issues/164)) ([60277ea](https://github.com/sbb-design-systems/lyne-angular/commit/60277ea3d665602f92f122f9e34cf344712ae30d))
* **deps:** update esta to v3.3.2 ([#170](https://github.com/sbb-design-systems/lyne-angular/issues/170)) ([e65e73d](https://github.com/sbb-design-systems/lyne-angular/commit/e65e73d2495df4d36ade63162d21789a0f2a4bef))
* **deps:** update esta to v3.4.0 ([#174](https://github.com/sbb-design-systems/lyne-angular/issues/174)) ([eab34a3](https://github.com/sbb-design-systems/lyne-angular/commit/eab34a35fd3f69553d0b0f605c61b34a7a05491f))


### Documentation

* **sbb-autocomplete:** enhance displayWith documentation ([#169](https://github.com/sbb-design-systems/lyne-angular/issues/169)) ([fe2657f](https://github.com/sbb-design-systems/lyne-angular/commit/fe2657f99ce030f6d803cb6dfeb2a5a4be9021d4)), closes [#168](https://github.com/sbb-design-systems/lyne-angular/issues/168)


### Code Refactoring

* group exports for multi component modules ([#173](https://github.com/sbb-design-systems/lyne-angular/issues/173)) ([2d2a575](https://github.com/sbb-design-systems/lyne-angular/commit/2d2a575001cb1632d8f68fdefa575928abb8d075))

## [20.0.0-rc.2](https://github.com/sbb-design-systems/lyne-angular/compare/v20.0.0-rc.1...v20.0.0-rc.2) (2025-08-04)


### Bug Fixes

* **deps:** update angular ([bc7e5e6](https://github.com/sbb-design-systems/lyne-angular/commit/bc7e5e6b5ffbc10ca2525d1ed484547d6e9c75ee))
* **deps:** update angular ([d5e2595](https://github.com/sbb-design-systems/lyne-angular/commit/d5e25953767c19c3695485f0329f9e5429d6089b))
* **deps:** update angular to v20.1.0 ([#146](https://github.com/sbb-design-systems/lyne-angular/issues/146)) ([693531a](https://github.com/sbb-design-systems/lyne-angular/commit/693531a34b1f17a5b7d66e8e8766b37dff41e846))
* **deps:** update angular to v20.1.2 ([37702fc](https://github.com/sbb-design-systems/lyne-angular/commit/37702fcb72f6a59e505a09bbd3f117e9cffe0d50))
* **deps:** update angular to v20.1.4 ([7dd8bfc](https://github.com/sbb-design-systems/lyne-angular/commit/7dd8bfc69b0b357fc754ed055edd9ec4e10a5a18))
* **deps:** update angular to v20.1.4 ([2358ec3](https://github.com/sbb-design-systems/lyne-angular/commit/2358ec37240802e6c0bf7132a686d2a0e00c4a93))
* **deps:** update esta to v3.1.0 ([#147](https://github.com/sbb-design-systems/lyne-angular/issues/147)) ([ebc058e](https://github.com/sbb-design-systems/lyne-angular/commit/ebc058e755c96573c6494fdcfccaa32689b9669c))
* **deps:** update esta to v3.2.0 ([#154](https://github.com/sbb-design-systems/lyne-angular/issues/154)) ([7efee1a](https://github.com/sbb-design-systems/lyne-angular/commit/7efee1a32f03babf496fd5293a251a89efdebbf8))
* **deps:** update esta to v3.3.0 ([#162](https://github.com/sbb-design-systems/lyne-angular/issues/162)) ([36e3791](https://github.com/sbb-design-systems/lyne-angular/commit/36e37919064802d50c7226df8f3d1fe5142b07b7))
* **sbb-autocomplete:** export SbbAutocompleteTrigger and document feature ([#160](https://github.com/sbb-design-systems/lyne-angular/issues/160)) ([8a465fa](https://github.com/sbb-design-systems/lyne-angular/commit/8a465fa4468b2bd702273a0fb3339d50c70fe0fb)), closes [#157](https://github.com/sbb-design-systems/lyne-angular/issues/157)


### Documentation

* **sbb-seat-reservation:** extended default storybook stories with data ([#143](https://github.com/sbb-design-systems/lyne-angular/issues/143)) ([59c1d8d](https://github.com/sbb-design-systems/lyne-angular/commit/59c1d8d9c2b4738cd72dc33367e2550caf8d3522))
* **sbb-table-wrapper:** update sbb-paginator documentation ([#149](https://github.com/sbb-design-systems/lyne-angular/issues/149)) ([81b2c38](https://github.com/sbb-design-systems/lyne-angular/commit/81b2c3819fc9090c7a50d11793e03bf7f8afe24c))


### Code Refactoring

* add string type to element references properties ([#145](https://github.com/sbb-design-systems/lyne-angular/issues/145)) ([98bd89c](https://github.com/sbb-design-systems/lyne-angular/commit/98bd89c40d899771b6369aca42655540976d7640))

## [20.0.0-rc.1](https://github.com/sbb-design-systems/lyne-angular/compare/v20.0.0-rc.0...v20.0.0-rc.1) (2025-07-07)


### ⚠ BREAKING CHANGES

* **deps:** update to Lyne 3.0.1, including the reflection of all breaking changes of Lyne. See https://github.com/sbb-design-systems/lyne-components/releases/tag/v3.0.0 for more information. On Angular side we changed the output observables to signals, having "Signal" as name suffix, e.g. "openSignal".

### Features

* update to breaking changes of lyne-elements ([#97](https://github.com/sbb-design-systems/lyne-angular/issues/97)) ([a161316](https://github.com/sbb-design-systems/lyne-angular/commit/a161316f7dd036b94f9c7d2cf20bf2ecb831718e)), closes [#54](https://github.com/sbb-design-systems/lyne-angular/issues/54)


### Bug Fixes

* **deps:** update angular ([874f8d5](https://github.com/sbb-design-systems/lyne-angular/commit/874f8d5b8964203be0f0fce7f62a33c4ba9f3e56))
* **deps:** update angular ([7d0d35b](https://github.com/sbb-design-systems/lyne-angular/commit/7d0d35b7cd155e28a82b96dde16511d5a6d219a4))
* **deps:** update angular ([9409fd0](https://github.com/sbb-design-systems/lyne-angular/commit/9409fd0171f6e9909807e08776c1e9142bb28508))
* **deps:** update dependency @angular/cdk to v20.0.5 ([357a7fa](https://github.com/sbb-design-systems/lyne-angular/commit/357a7fa69c2b6426bb36a4591400e1d3205ed134))
* **deps:** update esta to v3.0.0 ([#137](https://github.com/sbb-design-systems/lyne-angular/issues/137)) ([442f9cc](https://github.com/sbb-design-systems/lyne-angular/commit/442f9ccf06591f54b8f74dbda9c7fce723f7630c))
* **deps:** update lyne-elements to v3.0.1 ([#142](https://github.com/sbb-design-systems/lyne-angular/issues/142)) ([2d27b19](https://github.com/sbb-design-systems/lyne-angular/commit/2d27b19e6202882fdc7a71d10656da75a7014478))
* **sbb-time-input, sbb-date-input:** avoid emitting initial value as change ([#140](https://github.com/sbb-design-systems/lyne-angular/issues/140)) ([d6975a7](https://github.com/sbb-design-systems/lyne-angular/commit/d6975a768cdb94ba6458ef32d31317d03da2f3b2)), closes [#129](https://github.com/sbb-design-systems/lyne-angular/issues/129)


### Documentation

* provide stackblitz starter links ([#136](https://github.com/sbb-design-systems/lyne-angular/issues/136)) ([190b074](https://github.com/sbb-design-systems/lyne-angular/commit/190b07405496dac30bfac5cb2f4574b1122106be))


### Code Refactoring

* **sbb-table:** replace Angular sort animation with scss rules ([#134](https://github.com/sbb-design-systems/lyne-angular/issues/134)) ([2981fff](https://github.com/sbb-design-systems/lyne-angular/commit/2981fff54eeb6cd432189fdc95929bee1b348daf))

## [20.0.0-rc.0](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-rc.1...v20.0.0-rc.0) (2025-06-16)


### ⚠ BREAKING CHANGES

* Update to Angular v20

### Features

* update to lyne-elements 2.11.1 ([#124](https://github.com/sbb-design-systems/lyne-angular/issues/124)) ([3abe829](https://github.com/sbb-design-systems/lyne-angular/commit/3abe829337cee67ce6d2d3df93f290b7a408b39a))
* upgrade to Angular 20 ([#125](https://github.com/sbb-design-systems/lyne-angular/issues/125)) ([1aefc8c](https://github.com/sbb-design-systems/lyne-angular/commit/1aefc8ca0e7e930c39c0c46f0b0ce20cebcd269c))


### Bug Fixes

* **deps:** update angular ([9869d94](https://github.com/sbb-design-systems/lyne-angular/commit/9869d947ba9f0e5c14e6bc4d65be09d9677328e3))
* **deps:** update angular ([e1c2041](https://github.com/sbb-design-systems/lyne-angular/commit/e1c2041fd7985315045edb5aefdd6c0eb092af2b))
* **deps:** update angular to v19.2.11 ([9451f6c](https://github.com/sbb-design-systems/lyne-angular/commit/9451f6c8e379958ab7d689c073477d7c15cf10d3))
* **deps:** update angular to v19.2.13 ([2a2fb75](https://github.com/sbb-design-systems/lyne-angular/commit/2a2fb75f49b8074f1ca570286422f1c86900716d))
* **deps:** update dependency @sbb-esta/lyne-design-tokens to v1.6.0 ([#121](https://github.com/sbb-design-systems/lyne-angular/issues/121)) ([1c8d64f](https://github.com/sbb-design-systems/lyne-angular/commit/1c8d64f94a7cc0868a5e9eb6e0567b09c312e277))
* **deps:** update esta to v2.10.1 ([#113](https://github.com/sbb-design-systems/lyne-angular/issues/113)) ([fa99d2c](https://github.com/sbb-design-systems/lyne-angular/commit/fa99d2cd6347f20205dd73c2299fd8b0c0a61ae8))


### Miscellaneous Chores

* configure release 20.0.0-rc.0 ([8bf3a73](https://github.com/sbb-design-systems/lyne-angular/commit/8bf3a730e8fd0eb92ff902121e81ed9c10a62fce))

## [19.0.0-rc.1](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-rc.0...v19.0.0-rc.1) (2025-05-15)


### Features

* update @sbb-esta/lyne-elements to 2.8.0 ([#90](https://github.com/sbb-design-systems/lyne-angular/issues/90)) ([426bde8](https://github.com/sbb-design-systems/lyne-angular/commit/426bde80f246a63b332892497c85ae058e2b97d0))
* update lyne-elements to 2.9.0 ([#95](https://github.com/sbb-design-systems/lyne-angular/issues/95)) ([30b2037](https://github.com/sbb-design-systems/lyne-angular/commit/30b2037d1df84e13fb78202d1f8d633ce34c81d1))


### Bug Fixes

* **deps:** update angular ([3d8aa26](https://github.com/sbb-design-systems/lyne-angular/commit/3d8aa262db96e06fadbaa55c90d7ea7e87be1e31))
* **deps:** update angular ([81b6c8f](https://github.com/sbb-design-systems/lyne-angular/commit/81b6c8f99bc6d14d8c5976fea618dba12a07b3d1))
* **deps:** update esta to v2.10.0 ([#108](https://github.com/sbb-design-systems/lyne-angular/issues/108)) ([52a9fe2](https://github.com/sbb-design-systems/lyne-angular/commit/52a9fe208ac6fb79a89522ab12cacf40d8f24a71))
* fix output event types ([#88](https://github.com/sbb-design-systems/lyne-angular/issues/88)) ([cf88bcb](https://github.com/sbb-design-systems/lyne-angular/commit/cf88bcb6c0f3d091377b533a0f5fceacbba26380)), closes [#80](https://github.com/sbb-design-systems/lyne-angular/issues/80)
* improve Angular Forms integration ([#94](https://github.com/sbb-design-systems/lyne-angular/issues/94)) ([34d2a44](https://github.com/sbb-design-systems/lyne-angular/commit/34d2a443afbac40389fe655c374f012c07501241))
* **table:** fix sort header offset of focus-outline ([#85](https://github.com/sbb-design-systems/lyne-angular/issues/85)) ([2ee20f9](https://github.com/sbb-design-systems/lyne-angular/commit/2ee20f9f6b6bacf479b9a532cfcb37f26f4a5604))


### Documentation

* fix readme reference to 'lyne-elements' ([#91](https://github.com/sbb-design-systems/lyne-angular/issues/91)) ([dd738dd](https://github.com/sbb-design-systems/lyne-angular/commit/dd738ddf03c812152b279bb4a88df46096522173))
* **sbb-table-wrapper:** add table-usage doc ([#107](https://github.com/sbb-design-systems/lyne-angular/issues/107)) ([76a09d6](https://github.com/sbb-design-systems/lyne-angular/commit/76a09d682101dae7c5f4a2315064314d691c8433))
* **sbb-table-wrapper:** fix story property name ([b14d705](https://github.com/sbb-design-systems/lyne-angular/commit/b14d7054bc0aa00a0a846292c371964d67e3c28a))


### Code Refactoring

* fix type imports and use modern Angular APIs ([#92](https://github.com/sbb-design-systems/lyne-angular/issues/92)) ([8eaeee5](https://github.com/sbb-design-systems/lyne-angular/commit/8eaeee50657a0aef32e34c7df812ab7ddcd39da4))

## [19.0.0-rc.0](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-beta.4...v19.0.0-rc.0) (2025-04-16)


### Features

* **sbb-table-wrapper:** add support to filtering, pagination and sticky use cases ([#60](https://github.com/sbb-design-systems/lyne-angular/issues/60)) ([0e02081](https://github.com/sbb-design-systems/lyne-angular/commit/0e0208111aeb069e0fd4998ebac612f66bbc2794))
* update to lyne-elements 2.7.0 ([#70](https://github.com/sbb-design-systems/lyne-angular/issues/70)) ([2b82797](https://github.com/sbb-design-systems/lyne-angular/commit/2b8279799c6f5a30c49b2f23771e14813b552951))


### Miscellaneous Chores

* configure release version 19.0.0-rc.0 ([c916d30](https://github.com/sbb-design-systems/lyne-angular/commit/c916d3057e5f762c5a16c1e16862c7cc77dc5b46))

## [19.0.0-beta.4](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-beta.3...v19.0.0-beta.4) (2025-04-09)


### ⚠ BREAKING CHANGES

* inputs have no alias anymore: migrate to the corresponding property.

### Features

* update to lyne-elements 2.6.0 ([#53](https://github.com/sbb-design-systems/lyne-angular/issues/53)) ([8d4e72c](https://github.com/sbb-design-systems/lyne-angular/commit/8d4e72c3e0ce2120a27e1ac3be8bc00e0aa263e5))


### Documentation

* include angular/cdk in installation steps ([#50](https://github.com/sbb-design-systems/lyne-angular/issues/50)) ([3de1030](https://github.com/sbb-design-systems/lyne-angular/commit/3de103067284397e1dcbe2745651ec67c2e86c58)), closes [#49](https://github.com/sbb-design-systems/lyne-angular/issues/49)


### Code Refactoring

* remove alias usage for inputs ([#48](https://github.com/sbb-design-systems/lyne-angular/issues/48)) ([3ef9451](https://github.com/sbb-design-systems/lyne-angular/commit/3ef94511d1bd9422807a70295505a5d6a3a258f3))

## [19.0.0-beta.3](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-beta.2...v19.0.0-beta.3) (2025-03-25)


### Bug Fixes

* **sbb-slider:** update value correctly ([#44](https://github.com/sbb-design-systems/lyne-angular/issues/44)) ([bc6d262](https://github.com/sbb-design-systems/lyne-angular/commit/bc6d262b3da89c437b79e1c8cd384226023bf0b8))
* **sbb-tag:** add form support ([#45](https://github.com/sbb-design-systems/lyne-angular/issues/45)) ([cd73512](https://github.com/sbb-design-systems/lyne-angular/commit/cd735124f675e5cf31cdff16164f6434e485fe0e))


### Code Refactoring

* update angular elements ([#43](https://github.com/sbb-design-systems/lyne-angular/issues/43)) ([cc044d6](https://github.com/sbb-design-systems/lyne-angular/commit/cc044d68e17277539517d69e5fa909167f7204c9))
* use type imports in stories where possible ([#47](https://github.com/sbb-design-systems/lyne-angular/issues/47)) ([e7fe25d](https://github.com/sbb-design-systems/lyne-angular/commit/e7fe25d1627dbb4ab85568f2e63c173e70328107))

## [19.0.0-beta.2](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-beta.1...v19.0.0-beta.2) (2025-03-20)


### Features

* **sbb-date-input:** add Angular Forms validation ([#39](https://github.com/sbb-design-systems/lyne-angular/issues/39)) ([8e5f849](https://github.com/sbb-design-systems/lyne-angular/commit/8e5f84944c60c3d31168890524ad2c363279e570))
* upgrade lyne-elements to 2.4.1 ([#33](https://github.com/sbb-design-systems/lyne-angular/issues/33)) ([093e203](https://github.com/sbb-design-systems/lyne-angular/commit/093e20354204931859948f1ca29e5b270a57236a))


### Bug Fixes

* duplicate events ([#42](https://github.com/sbb-design-systems/lyne-angular/issues/42)) ([d86f67e](https://github.com/sbb-design-systems/lyne-angular/commit/d86f67ed90a3bd251c1fe4e0994772d38640295b))
* remove output annotation to avoid duplicate events ([#40](https://github.com/sbb-design-systems/lyne-angular/issues/40)) ([d5bf664](https://github.com/sbb-design-systems/lyne-angular/commit/d5bf66489bc2fd65f75a1a5db4e6d684fc457401))
* replace input with sbb-date-input in stories ([#37](https://github.com/sbb-design-systems/lyne-angular/issues/37)) ([a00d19f](https://github.com/sbb-design-systems/lyne-angular/commit/a00d19fde175af15de256a30832755ec280154fe))
* **sbb-date-input:** handle value state correctly ([#38](https://github.com/sbb-design-systems/lyne-angular/issues/38)) ([f074e65](https://github.com/sbb-design-systems/lyne-angular/commit/f074e65ba228a8417305d7c9950c7a85ba8500a8))

## [19.0.0-beta.1](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-beta.0...v19.0.0-beta.1) (2025-03-10)


### Features

* **sbb-toggle:** add ControlValueAccessor implementation ([#32](https://github.com/sbb-design-systems/lyne-angular/issues/32)) ([5a88cf8](https://github.com/sbb-design-systems/lyne-angular/commit/5a88cf8ac3820edee0f6531f1cccd46da3db31de))


### Bug Fixes

* **sbb-select:** correctly update state on change ([#30](https://github.com/sbb-design-systems/lyne-angular/issues/30)) ([007dc61](https://github.com/sbb-design-systems/lyne-angular/commit/007dc61df94c6b15f269284d6596396620499237))


### Documentation

* improve documentation ([#28](https://github.com/sbb-design-systems/lyne-angular/issues/28)) ([a73a7e0](https://github.com/sbb-design-systems/lyne-angular/commit/a73a7e089494cdc0db10fd9dbf9e54f1c3af9c48))


### Code Refactoring

* move ControlValueAccessor implementation to radio button group ([#31](https://github.com/sbb-design-systems/lyne-angular/issues/31)) ([a62747d](https://github.com/sbb-design-systems/lyne-angular/commit/a62747d7bc5d3902a80b182d02ffdf9de513dfe2))

## [19.0.0-beta.0](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-alpha.5...v19.0.0-beta.0) (2025-02-28)


### Miscellaneous Chores

* set next release version ([841861d](https://github.com/sbb-design-systems/lyne-angular/commit/841861d5c0d12ba865faa6de2d24a6cb0d4ad692))

## [19.0.0-alpha.5](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-alpha.4...v19.0.0-alpha.5) (2025-02-28)


### Miscellaneous Chores

* set version ([38163a6](https://github.com/sbb-design-systems/lyne-angular/commit/38163a6110768f2de6572bad74fda062a721f52d))

## [19.0.0-alpha.4](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-alpha.3...v19.0.0-alpha.4) (2025-02-28)


### Features

* add storybook ([#19](https://github.com/sbb-design-systems/lyne-angular/issues/19)) ([bc23fbb](https://github.com/sbb-design-systems/lyne-angular/commit/bc23fbba147ec1b1d8a549d87ca113de40af32ef))

## [19.0.0-alpha.3](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-alpha.2...v19.0.0-alpha.3) (2025-01-21)


### Features

* support Angular RouterLink ([#18](https://github.com/sbb-design-systems/lyne-angular/issues/18)) ([f323b77](https://github.com/sbb-design-systems/lyne-angular/commit/f323b775bb3cb2e189d27448f09868acdb77b89e))

## [19.0.0-alpha.2](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-alpha.1...v19.0.0-alpha.2) (2025-01-20)


### Features

* integrate Angular form support ([#11](https://github.com/sbb-design-systems/lyne-angular/issues/11)) ([44f7160](https://github.com/sbb-design-systems/lyne-angular/commit/44f7160b541292b800cda37b534638aebe4ae790))


### Bug Fixes

* boolean transform ([#13](https://github.com/sbb-design-systems/lyne-angular/issues/13)) ([52430c1](https://github.com/sbb-design-systems/lyne-angular/commit/52430c13f8dd302307478495198d0a44be84c1f2))
* remove 'Directive' name and update libraries ([#15](https://github.com/sbb-design-systems/lyne-angular/issues/15)) ([bfa0ffc](https://github.com/sbb-design-systems/lyne-angular/commit/bfa0ffc211089cdec52b78fa308a0d9c029aad67))


### Code Refactoring

* remove obsolete standalone flag ([#17](https://github.com/sbb-design-systems/lyne-angular/issues/17)) ([cc0370f](https://github.com/sbb-design-systems/lyne-angular/commit/cc0370f0fae3eea60c3248109d302d22faf41980))

## [19.0.0-alpha.1](https://github.com/sbb-design-systems/lyne-angular/compare/v19.0.0-0...v19.0.0-alpha.1) (2025-01-08)


### Features

* create Angular classes ([41ae8ee](https://github.com/sbb-design-systems/lyne-angular/commit/41ae8ee0d6927d7be5e40d632e3446765e4628bf))


### Miscellaneous Chores

* enable release please for main branch ([55e3ec5](https://github.com/sbb-design-systems/lyne-angular/commit/55e3ec5bfd303b3695206c310c3e419b32e42111))
