The `<sbb-timetable-occupancy-icon>` displays the wagon occupancy depending on occupancy property
and the page style (normal, negative, high contrast mode).

```html
<sbb-timetable-occupancy-icon occupancy="high"></sbb-timetable-occupancy-icon>
```

## Style

It's possible to display the component in `negative` variant using the self-named property;
in this case, the rendered icon will change accordingly.

```html
<sbb-timetable-occupancy-icon occupancy="low" negative></sbb-timetable-occupancy-icon>
```

## Accessibility

In high contrast mode, the rendered icon changes for a better user experience.
