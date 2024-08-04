
# 逻辑连接符`iff` 

```follow
term prop iff(prop p0, prop p1) { (p0 ↔ p1) }
axiom iff.def(prop p0, prop p1) {
  |- imp(iff(p0, p1), and(imp(p0, p1), imp(p1, p0)))
  |- imp(and(imp(p0, p1), imp(p1, p0)), iff(p0, p1))
}
```

## 性质

```follow
thm iff.left(prop p0, prop p1) {
  |- imp(iff(p0, p1), imp(p0, p1))
} = {
  syl(iff(p0,p1), imp(p0,p1), and(imp(p0,p1),imp(p1,p0)))
  iff.def(p0, p1)
  and.left(imp(p0,p1), imp(p1,p0))
}
```

```follow
thm iff.lefti(prop p0, prop p1) {
  |- imp(p0, p1)
  -| iff(p0, p1)
} = {
  mp(imp(p0,p1), iff(p0,p1))
  iff.left(p0, p1)
}
```

```follow
thm iff.leftd(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(p1, p2))
  -| imp(p0, iff(p1, p2))
} = {
  syl(p0, imp(p1,p2), iff(p1,p2))
  iff.left(p1, p2)
}
```

```follow
thm iff.right(prop p0, prop p1) {
  |- imp(iff(p0, p1), imp(p1, p0))
} = {
  syl(iff(p0,p1), imp(p1,p0), and(imp(p0,p1),imp(p1,p0)))
  iff.def(p0, p1)
  and.right(imp(p0,p1), imp(p1,p0))
}
```

```follow
thm iff.righti(prop p0, prop p1) {
  |- imp(p1, p0)
  -| iff(p0, p1)
} = {
  mp(imp(p1,p0), iff(p0,p1))
  iff.right(p0, p1)
}
```

```follow
thm iff.rightd(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(p2, p1))
  -| imp(p0, iff(p1, p2))
} = {
  syl(p0, imp(p2,p1), iff(p1,p2))
  iff.right(p1, p2)
}
```

```follow
thm iff.intro(prop p0, prop p1) {
  |- imp(imp(p0, p1), imp(imp(p1, p0), iff(p0, p1)))
} = {
  rw3(imp(p0,p1), imp(p1,p0), iff(p0,p1), and(imp(p0,p1),imp(p1,p0)))
  iff.def(p0, p1)
  and.intro(imp(p0,p1), imp(p1,p0))
}
```


```follow
thm iff.introii(prop p0, prop p1) {
  |- iff(p0, p1)
  -| imp(p0, p1)
  -| imp(p1, p0)
} = {
  mp(iff(p0,p1), imp(p1,p0))
  mp(imp(imp(p1,p0),iff(p0,p1)), imp(p0,p1))
  iff.intro(p0, p1)
}
```

```follow
thm iff.introd(prop p0, prop p1, prop p2) {
  |- imp(p0, iff(p1, p2))
  -| imp(p0, imp(p1, p2))
  -| imp(p0, imp(p2, p1))
} = {
  a2ii(p0, iff(p1,p2), imp(p2,p1))
  syl(p0, imp(imp(p2,p1),iff(p1,p2)), imp(p1,p2))
  iff.intro(p1, p2)
}
```

```follow
thm iff.com(prop p0, prop p1) {
  |- imp(iff(p0, p1), iff(p1, p0))
} = {
  syl(iff(p0,p1), iff(p1,p0), and(imp(p0,p1),imp(p1,p0)))
  iff.def(p0, p1)
  syl(and(imp(p0,p1),imp(p1,p0)), iff(p1,p0), and(imp(p1,p0),imp(p0,p1)))
  iff.def(p1, p0)
  and.com(imp(p0,p1), imp(p1,p0))
}
```

```follow
thm iff.comi(prop p0, prop p1) {
  |- iff(p0, p1)
  -| iff(p1, p0)
} = {
  mp(iff(p0,p1), iff(p1,p0))
  iff.com(p1, p0)
}
```

```follow
thm iff.comd(prop p0, prop p1, prop p2) {
  |- imp(p0, iff(p1, p2))
  -| imp(p0, iff(p2, p1))
} = {
  syl(p0, iff(p1,p2), iff(p2,p1))
  iff.com(p2, p1)
}
```

