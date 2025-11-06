# Getting started doc test

```html
<!-- HTML -->
<sbb-button icon-name="info"> Button text </sbb-button>

<sbb-button>
  <sbb-icon slot="icon" name="info"></sbb-icon>
  Button text
</sbb-button>

<sbb-button icon-name="info" aria-label="Click for more information."></sbb-button>
```

```ts
// TS
export class TablePaginatorExampleComponent implements OnInit {
  dataSource: SbbTableDataSource<any> = new SbbTableDataSource([]);
  @ViewChild('paginator', { static: true, read: SbbPaginatorComponent })
  paginator: SbbPaginatorComponent;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
```

## Table

| Name         | Attribute     | Privacy | Type                    | Default            | Description                                                                             |
| ------------ | ------------- | ------- | ----------------------- | ------------------ | --------------------------------------------------------------------------------------- |
| `multi`      | `multi`       | public  | `boolean`               | `false`            | Whether more than one sbb-expansion-panel can be open at the same time.                 |
| `size`       | `size`        | public  | `'s' \| 'l'`            | `'l' / 's' (lean)` | Size variant, either l or s; overrides the size on any projected `sbb-expansion-panel`. |
| `titleLevel` | `title-level` | public  | `SbbTitleLevel \| null` | `null`             | The heading level for the sbb-expansion-panel-headers within the component.             |
