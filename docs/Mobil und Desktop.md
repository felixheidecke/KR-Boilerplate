Ansteuern der unterschiedlichen Geräte und Browser.

```CSS
[data-mobile] {
   /* Hier Anweisungen für alle Mobilen Geräte */
}
```

```CSS
[data-mobile*="iPad"],
[data-mobile*="iPhone"] {
   /* Hier Anweisungen für ALLE iOS Geräte */
}
```

```CSS
[data-mobile*="Samsung"],
[data-mobile*="iPhone"] {
   /* Hier Anweisungen für alle iPhones und Samsung Geräte */
}
```

```CSS
[data-agent] {
   /* Hier Anweisungen für alle NICHT mobilen Geräte. */
}
```
