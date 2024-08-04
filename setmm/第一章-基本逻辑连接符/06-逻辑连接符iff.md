
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

## 传递性 Transition

```follow
thm iff.trans.1(prop p0, prop p1, prop p2) {
  |- imp(iff(p0, p1), imp(iff(p1, p2), iff(p0, p2)))
} = {
  rw23(iff(p0,p1), iff(p1,p2), iff(p0,p2), and(imp(p1,p2),imp(p2,p1)), and(imp(p0,p2),imp(p2,p0)))
  iff.def(p0, p2)
  iff.def(p1, p2)
  and.2andd(iff(p0,p1), imp(p1,p2), imp(p2,p1), imp(p0,p2), imp(p2,p0))
  syl(iff(p0,p1), imp(imp(p1,p2),imp(p0,p2)), imp(p0,p1))
  trans(p0, p1, p2)
  iff.left(p0, p1)
  syl(iff(p0,p1), imp(imp(p2,p1),imp(p2,p0)), imp(p1,p0))
  trans(p2, p1, p0)
  iff.right(p0, p1)
}
```

```follow
thm iff.trans.2(prop p0, prop p1, prop p2) {
  |- imp(iff(p0, p1), imp(iff(p2, p1), iff(p0, p2)))
} = {
  rw2(iff(p0,p1), iff(p2,p1), iff(p0,p2), iff(p1,p2))
  iff.com(p2, p1)
  iff.trans.1(p0, p1, p2)
}
```

```follow
thm iff.trans.3(prop p0, prop p1, prop p2) {
  |- imp(iff(p0, p1), imp(iff(p1, p2), iff(p2, p0)))
} = {
  rw3(iff(p0,p1), iff(p1,p2), iff(p2,p0), iff(p0,p2))
  iff.com(p0, p2)
  iff.trans.1(p0, p1, p2)
}
```

```follow
thm iff.trans.4(prop p0, prop p1, prop p2) {
  |- imp(iff(p0, p1), imp(iff(p2, p1), iff(p2, p0)))
} = {
  rw23(iff(p0,p1), iff(p2,p1), iff(p2,p0), iff(p1,p2), iff(p0,p2))
  iff.com(p0, p2)
  iff.com(p2, p1)
  iff.trans.1(p0, p1, p2)
}
```

```follow
thm iff.trans.5(prop p0, prop p1, prop p2) {
  |- imp(iff(p1, p2), imp(iff(p0, p1), iff(p0, p2)))
} = {
  com12i(iff(p1,p2), iff(p0,p1), iff(p0,p2))
  iff.trans.1(p0, p1, p2)
}
```

```follow
thm iff.trans.6(prop p0, prop p1, prop p2) {
  |- imp(iff(p1, p2), imp(iff(p1, p0), iff(p0, p2)))
} = {
  rw2(iff(p1,p2), iff(p1,p0), iff(p0,p2), iff(p0,p1))
  iff.com(p1, p0)
  iff.trans.5(p0, p1, p2)
}
```

```follow
thm iff.trans.7(prop p0, prop p1, prop p2) {
  |- imp(iff(p1, p2), imp(iff(p0, p1), iff(p2, p0)))
} = {
  rw3(iff(p1,p2), iff(p0,p1), iff(p2,p0), iff(p0,p2))
  iff.com(p0, p2)
  iff.trans.5(p0, p1, p2)
}
```

```follow
thm iff.trans.8(prop p0, prop p1, prop p2) {
  |- imp(iff(p1, p2), imp(iff(p1, p0), iff(p2, p0)))
} = {
  rw23(iff(p1,p2), iff(p1,p0), iff(p2,p0), iff(p0,p1), iff(p0,p2))
  iff.com(p0, p2)
  iff.com(p1, p0)
  iff.trans.5(p0, p1, p2)
}
```

```follow
thm iff.trans(prop p0, prop p1, prop p2) {
  |- imp(iff(p0,p1), imp(iff(p0,p2), iff(p1,p2)))
  |- imp(iff(p0,p1), imp(iff(p0,p2), iff(p2,p1)))
  |- imp(iff(p0,p1), imp(iff(p2,p0), iff(p1,p2)))
  |- imp(iff(p0,p1), imp(iff(p2,p0), iff(p2,p1)))
  |- imp(iff(p0,p1), imp(iff(p1,p2), iff(p0,p2)))
  |- imp(iff(p0,p1), imp(iff(p1,p2), iff(p2,p0)))
  |- imp(iff(p0,p1), imp(iff(p2,p1), iff(p0,p2)))
  |- imp(iff(p0,p1), imp(iff(p2,p1), iff(p2,p0)))
} = {
  iff.trans.1(p0, p1, p2)
  iff.trans.2(p0, p1, p2)
  iff.trans.3(p0, p1, p2)
  iff.trans.4(p0, p1, p2)
  iff.trans.5(p2, p0, p1)
  iff.trans.6(p2, p0, p1)
  iff.trans.7(p2, p0, p1)
  iff.trans.8(p2, p0, p1)
}
```

## 非常有用的定理

```follow
thm iff.syl(prop p0, prop p1, prop p2) {
  |- iff(p0, p1)
  -| iff(p0, p2)
  -| iff(p2, p1)
} = {
  mp(iff(p0,p1), iff(p2,p1))
  mp(imp(iff(p2,p1),iff(p0,p1)), iff(p0,p2))
  iff.trans.1(p0, p2, p1)
}
```

```follow
thm iff.syld(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, iff(p1, p2))
  -| imp(p0, iff(p1, p3))
  -| imp(p0, iff(p3, p2))
} = {
  a2ii(p0, iff(p1,p2), iff(p3,p2))
  syl(p0, imp(iff(p3,p2),iff(p1,p2)), iff(p1,p3))
  iff.trans.1(p1, p3, p2)
}
```

