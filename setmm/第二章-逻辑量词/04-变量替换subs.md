
# 变量替换 `subs` 

```follow
term prop subs(prop p0, set s0, set s1) { p0 [ s0 : s1 ] }
```

```follow
axiom subs.def.1(prop p0, set s0, set s1, set s2) {
  |- iff(subs(p0, s0, s1), forall(s2, imp(eq(c(s2), c(s1)), forall(s0, imp(eq(c(s0), c(s2)), p0)))))
  diff (s2, p0) (s2, s0) (s2, s1)
}
```

```follow
thm subs.def.2(prop p0, set s0, set s1, set s2) {
  |- iff(subs(p0, s0, s1), forall(s2, imp(eq(c(s2), c(s1)), forall(s0, imp(eq(c(s0), c(s2)), p0)))))
  |- iff(forall(s2, imp(eq(c(s2), c(s1)), forall(s0, imp(eq(c(s0), c(s2)), p0)))), subs(p0, s0, s1))
  |- imp(subs(p0, s0, s1), forall(s2, imp(eq(c(s2), c(s1)), forall(s0, imp(eq(c(s0), c(s2)), p0)))))
  |- imp(forall(s2, imp(eq(c(s2), c(s1)), forall(s0, imp(eq(c(s0), c(s2)), p0)))), subs(p0, s0, s1))
  diff (s2, p0) (s2, s0) (s2, s1)
} = {
  iff.lefti(subs(p0,s0,s1), forall(s2,imp(eq(c(s2),c(s1)),forall(s0,imp(eq(c(s0),c(s2)),p0)))))
  iff.righti(subs(p0,s0,s1), forall(s2,imp(eq(c(s2),c(s1)),forall(s0,imp(eq(c(s0),c(s2)),p0)))))
  iff.comi(forall(s2,imp(eq(c(s2),c(s1)),forall(s0,imp(eq(c(s0),c(s2)),p0)))), subs(p0,s0,s1))
  subs.def.1(p0, s0, s1, s2)
}
```

## 性质

```follow
thm subs.gen(prop p0, set s0, set s1) {
  |- subs(p0, s0, s1)
  -| p0
} = {
  mp(subs(p0,s0,s1), forall(hs0,imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0)))))
  subs.def.2(p0, s0, s1, hs0)
  gen(hs0, imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0))))
  a1i(eq(c(hs0),c(s1)), forall(s0,imp(eq(c(s0),c(hs0)),p0)))
  gen(s0, imp(eq(c(s0),c(hs0)),p0))
  a1i(eq(c(s0),c(hs0)), p0)
}
```

```follow
thm subs.forall(prop p0, set s0, set s1) {
  |- imp(forall(s0, p0), subs(p0, s0, s1))
} = {
  syl(forall(s0,p0), subs(p0,s0,s1), forall(hs0,imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0)))))
  subs.def.2(p0, s0, s1, hs0)
  mp(imp(forall(s0,p0),forall(hs0,imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0))))), forall(hs0,imp(forall(s0,p0),imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0))))))
  a4.diff(hs0, imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0))), forall(s0,p0))
  gen(hs0, imp(forall(s0,p0),imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0)))))
  a1d(forall(s0,p0), eq(c(hs0),c(s1)), forall(s0,imp(eq(c(s0),c(hs0)),p0)))
  a4.1i(s0, p0, imp(eq(c(s0),c(hs0)),p0))
  gen(s0, imp(p0,imp(eq(c(s0),c(hs0)),p0)))
  a1(p0, eq(c(s0),c(hs0)))
}
```

## `subs` 和 `imply` 

```follow
thm subs.imp(prop p0, prop p1, set s2, set s3) {
  |- imp(subs(imp(p0, p1), s2, s3), imp(subs(p0, s2, s3), subs(p1, s2, s3)))
} = {
  rw123(subs(imp(p0,p1),s2,s3), subs(p0,s2,s3), subs(p1,s2,s3), forall(hs0,imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),imp(p0,p1))))), forall(hs0,imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),p0)))), forall(hs0,imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),p1)))))
  subs.def.2(imp(p0,p1), s2, s3, hs0)
  subs.def.2(p0, s2, s3, hs0)
  subs.def.2(p1, s2, s3, hs0)
  a4.1d(hs0, imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),p0))), imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),p1))), forall(hs0,imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),imp(p0,p1))))))
  a4.1i(hs0, imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),imp(p0,p1)))), imp(imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),p0))),imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),p1)))))
  gen(hs0, imp(imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),imp(p0,p1)))),imp(imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),p0))),imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),p1))))))
  a2d(imp(eq(c(hs0),c(s3)),forall(s2,imp(eq(c(s2),c(hs0)),imp(p0,p1)))), eq(c(hs0),c(s3)), forall(s2,imp(eq(c(s2),c(hs0)),p0)), forall(s2,imp(eq(c(s2),c(hs0)),p1)))
  a2i(eq(c(hs0),c(s3)), forall(s2,imp(eq(c(s2),c(hs0)),imp(p0,p1))), imp(forall(s2,imp(eq(c(s2),c(hs0)),p0)),forall(s2,imp(eq(c(s2),c(hs0)),p1))))
  a1i(eq(c(hs0),c(s3)), imp(forall(s2,imp(eq(c(s2),c(hs0)),imp(p0,p1))),imp(forall(s2,imp(eq(c(s2),c(hs0)),p0)),forall(s2,imp(eq(c(s2),c(hs0)),p1)))))
  a4.1d(s2, imp(eq(c(s2),c(hs0)),p0), imp(eq(c(s2),c(hs0)),p1), forall(s2,imp(eq(c(s2),c(hs0)),imp(p0,p1))))
  a4.1i(s2, imp(eq(c(s2),c(hs0)),imp(p0,p1)), imp(imp(eq(c(s2),c(hs0)),p0),imp(eq(c(s2),c(hs0)),p1)))
  gen(s2, imp(imp(eq(c(s2),c(hs0)),imp(p0,p1)),imp(imp(eq(c(s2),c(hs0)),p0),imp(eq(c(s2),c(hs0)),p1))))
  a2(eq(c(s2),c(hs0)), p0, p1)
}
```

```follow
thm subs.imp.special(prop p0, prop p1, set s2, set s3) {
  |- imp(forall(s2, imp(p0, p1)), imp(subs(p0, s2, s3), subs(p1, s2, s3)))
} = {
  syl(forall(s2,imp(p0,p1)), imp(subs(p0,s2,s3),subs(p1,s2,s3)), subs(imp(p0,p1),s2,s3))
  subs.imp(p0, p1, s2, s3)
  subs.forall(imp(p0,p1), s2, s3)
}
```

```follow
thm subs.imp.gen(prop p0, prop p1, set s2, set s3) {
  |- imp(subs(p0, s2, s3), subs(p1, s2, s3))
  -| imp(p0, p1)
} = {
  mp(imp(subs(p0,s2,s3),subs(p1,s2,s3)), forall(s2,imp(p0,p1)))
  subs.imp.special(p0, p1, s2, s3)
  gen(s2, imp(p0,p1))
}
```

```follow
thm subs.impd.gen(prop p0, prop p1, prop p2, set s3, set s4) {
  |- imp(p0, imp(subs(p1, s3, s4), subs(p2, s3, s4)))
  -| imp(p0, imp(p1, p2))
  diff (p0, s3)
} = {
  syl(p0, imp(subs(p1,s3,s4),subs(p2,s3,s4)), forall(s3,imp(p1,p2)))
  subs.imp.special(p1, p2, s3, s4)
  gend(s3, imp(p1,p2), p0)
}
```

## `subs` 和 `iff` 

```follow
thm subs.iff.special(prop p0, prop p1, set s2, set s3) {
  |- imp(forall(s2, iff(p0, p1)), iff(subs(p0, s2, s3), subs(p1, s2, s3)))
} = {
  iff.introd(forall(s2,iff(p0,p1)), subs(p0,s2,s3), subs(p1,s2,s3))
  syl(forall(s2,iff(p0,p1)), imp(subs(p0,s2,s3),subs(p1,s2,s3)), forall(s2,imp(p0,p1)))
  subs.imp.special(p0, p1, s2, s3)
  syl(forall(s2,iff(p0,p1)), imp(subs(p1,s2,s3),subs(p0,s2,s3)), forall(s2,imp(p1,p0)))
  subs.imp.special(p1, p0, s2, s3)
  a4.1i(s2, iff(p0,p1), imp(p1,p0))
  a4.1i(s2, iff(p0,p1), imp(p0,p1))
  gen(s2, imp(iff(p0,p1),imp(p0,p1)))
  gen(s2, imp(iff(p0,p1),imp(p1,p0)))
  iff.left(p0, p1)
  iff.right(p0, p1)
}
```

```follow
thm subs.iff.gen(prop p0, prop p1, set s2, set s3) {
  |- iff(subs(p0, s2, s3), subs(p1, s2, s3))
  -| iff(p0, p1)
} = {
  mp(iff(subs(p0,s2,s3),subs(p1,s2,s3)), forall(s2,iff(p0,p1)))
  subs.iff.special(p0, p1, s2, s3)
  gen(s2, iff(p0,p1))
}
```

```follow
thm subs.iffd.gen(prop p0, prop p1, prop p2, set s3, set s4) {
  |- imp(p0, iff(subs(p1, s3, s4), subs(p2, s3, s4)))
  -| imp(p0, iff(p1, p2))
  diff (p0, s3)
} = {
  syl(p0, iff(subs(p1,s3,s4),subs(p2,s3,s4)), forall(s3,iff(p1,p2)))
  subs.iff.special(p1, p2, s3, s4)
  gend(s3, iff(p1,p2), p0)
}
```

## `subs` 与 `exist` 

```follow
// 真命题表示存在这个命题
thm subs.exist(prop p0, set s0, set s1) {
  |- imp(subs(p0, s0, s1), exist(s0, p0))
} = {
  syl(subs(p0,s0,s1), exist(s0,p0), forall(hs0,imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0)))))
  subs.def.2(p0, s0, s1, hs0)
  syl(forall(hs0,imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0)))), exist(s0,p0), exist(hs0,forall(s0,imp(eq(c(s0),c(hs0)),p0))))
  eq.subs.exist(p0, s0, hs0)
  mp(imp(forall(hs0,imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0)))),exist(hs0,forall(s0,imp(eq(c(s0),c(hs0)),p0)))), exist(hs0,eq(c(hs0),c(s1))))
  a6.1(hs0, s1)
  com12i(exist(hs0,eq(c(hs0),c(s1))), forall(hs0,imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0)))), exist(hs0,forall(s0,imp(eq(c(s0),c(hs0)),p0))))
  a4(hs0, eq(c(hs0),c(s1)), forall(s0,imp(eq(c(s0),c(hs0)),p0)))
}
```

## `subs` 和 `eq` 

```follow
thm subs.eq.1(prop p0, set s0, set s1, set s2) {
  |- imp(eq(c(s1), c(s2)), imp(subs(p0, s0, s1), subs(p0, s0, s2)))
} = {
  rw23(eq(c(s1),c(s2)), subs(p0,s0,s1), subs(p0,s0,s2), forall(hs0,imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0)))), forall(hs0,imp(eq(c(hs0),c(s2)),forall(s0,imp(eq(c(s0),c(hs0)),p0)))))
  subs.def.2(p0, s0, s2, hs0)
  subs.def.2(p0, s0, s1, hs0)
  a4.1d(hs0, imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0))), imp(eq(c(hs0),c(s2)),forall(s0,imp(eq(c(s0),c(hs0)),p0))), eq(c(s1),c(s2)))
  gend(hs0, imp(imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0))),imp(eq(c(hs0),c(s2)),forall(s0,imp(eq(c(s0),c(hs0)),p0)))), eq(c(s1),c(s2)))
  syl(eq(c(s1),c(s2)), imp(imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0))),imp(eq(c(hs0),c(s2)),forall(s0,imp(eq(c(s0),c(hs0)),p0)))), imp(eq(c(hs0),c(s2)),eq(c(hs0),c(s1))))
  trans(eq(c(hs0),c(s2)), eq(c(hs0),c(s1)), forall(s0,imp(eq(c(s0),c(hs0)),p0)))
  eq.trans(s1, s2, hs0)
}
```

```follow
thm subs.eq.2(prop p0, set s0, set s1, set s2) {
  |- imp(eq(c(s1), c(s2)), iff(subs(p0, s0, s1), subs(p0, s0, s2)))
  |- imp(eq(c(s1), c(s2)), iff(subs(p0, s0, s2), subs(p0, s0, s1)))
  |- imp(eq(c(s1), c(s2)), imp(subs(p0, s0, s1), subs(p0, s0, s2)))
  |- imp(eq(c(s1), c(s2)), imp(subs(p0, s0, s2), subs(p0, s0, s1)))
} = {
  iff.introd(eq(c(s1),c(s2)), subs(p0,s0,s1), subs(p0,s0,s2))
  iff.introd(eq(c(s1),c(s2)), subs(p0,s0,s2), subs(p0,s0,s1))
  syl(eq(c(s1),c(s2)), imp(subs(p0,s0,s2),subs(p0,s0,s1)), eq(c(s2),c(s1)))
  eq.com(s1, s2)
  subs.eq.1(p0, s0, s2, s1)
  subs.eq.1(p0, s0, s1, s2)
}
```

## `subs`，`forall` 与 `diff` 

```follow
thm subs.forall.diff(prop p0, set s0, set s1) {
  |- iff(subs(p0, s0, s1), forall(s0, imp(eq(c(s0), c(s1)), p0)))
  |- iff(forall(s0, imp(eq(c(s0), c(s1)), p0)), subs(p0, s0, s1))
  |- imp(subs(p0, s0, s1), forall(s0, imp(eq(c(s0), c(s1)), p0)))
  |- imp(forall(s0, imp(eq(c(s0), c(s1)), p0)), subs(p0, s0, s1))
  diff (s0, s1)
} = {
  iff.comi(forall(s0,imp(eq(c(s0),c(s1)),p0)), subs(p0,s0,s1))
  iff.lefti(subs(p0,s0,s1), forall(s0,imp(eq(c(s0),c(s1)),p0)))
  iff.righti(subs(p0,s0,s1), forall(s0,imp(eq(c(s0),c(s1)),p0)))
  iff.syl(subs(p0,s0,s1), forall(s0,imp(eq(c(s0),c(s1)),p0)), forall(hs0,imp(eq(c(hs0),c(s1)),forall(s0,imp(eq(c(s0),c(hs0)),p0)))))
  subs.def.2(p0, s0, s1, hs0)
  eq.forall.3(forall(s0,imp(eq(c(s0),c(hs0)),p0)), hs0, forall(s0,imp(eq(c(s0),c(s1)),p0)), s1)
  syl(eq(c(hs0),c(s1)), iff(forall(s0,imp(eq(c(s0),c(hs0)),p0)),forall(s0,imp(eq(c(s0),c(s1)),p0))), forall(s0,iff(imp(eq(c(s0),c(hs0)),p0),imp(eq(c(s0),c(s1)),p0))))
  a4(s0, imp(eq(c(s0),c(hs0)),p0), imp(eq(c(s0),c(s1)),p0))
  gend(s0, iff(imp(eq(c(s0),c(hs0)),p0),imp(eq(c(s0),c(s1)),p0)), eq(c(hs0),c(s1)))
  imp.iffimpd(eq(c(hs0),c(s1)), eq(c(s0),c(hs0)), eq(c(s0),c(s1)), p0, p0)
  iff.idd(eq(c(hs0),c(s1)), p0)
  eq.trans(hs0, s1, s0)
}
```

## `subs.subs` 

```follow
thm subs.subs.diff(prop p0, set s0, set s1, set s2) {
  |- iff(subs(subs(p0, s0, s1), s1, s2), subs(subs(p0, s0, s2), s1, s2))
  |- iff(subs(subs(p0, s0, s2), s1, s2), subs(subs(p0, s0, s1), s1, s2))
  |- imp(subs(subs(p0, s0, s1), s1, s2), subs(subs(p0, s0, s2), s1, s2))
  |- imp(subs(subs(p0, s0, s2), s1, s2), subs(subs(p0, s0, s1), s1, s2))
  diff (s1, s2)
} = {
  iff.lefti(subs(subs(p0,s0,s1),s1,s2), subs(subs(p0,s0,s2),s1,s2))
  iff.righti(subs(subs(p0,s0,s1),s1,s2), subs(subs(p0,s0,s2),s1,s2))
  iff.comi(subs(subs(p0,s0,s2),s1,s2), subs(subs(p0,s0,s1),s1,s2))
  iff.syl(subs(subs(p0,s0,s1),s1,s2), subs(subs(p0,s0,s2),s1,s2), forall(s1,imp(eq(c(s1),c(s2)),subs(p0,s0,s1))))
  subs.forall.diff(subs(p0,s0,s1), s1, s2)
  iff.syl(forall(s1,imp(eq(c(s1),c(s2)),subs(p0,s0,s1))), subs(subs(p0,s0,s2),s1,s2), forall(s1,imp(eq(c(s1),c(s2)),subs(p0,s0,s2))))
  subs.forall.diff(subs(p0,s0,s2), s1, s2)
  mp(iff(forall(s1,imp(eq(c(s1),c(s2)),subs(p0,s0,s1))),forall(s1,imp(eq(c(s1),c(s2)),subs(p0,s0,s2)))), forall(s1,iff(imp(eq(c(s1),c(s2)),subs(p0,s0,s1)),imp(eq(c(s1),c(s2)),subs(p0,s0,s2)))))
  a4(s1, imp(eq(c(s1),c(s2)),subs(p0,s0,s1)), imp(eq(c(s1),c(s2)),subs(p0,s0,s2)))
  gen(s1, iff(imp(eq(c(s1),c(s2)),subs(p0,s0,s1)),imp(eq(c(s1),c(s2)),subs(p0,s0,s2))))
  iff.a2i(eq(c(s1),c(s2)), subs(p0,s0,s1), subs(p0,s0,s2))
  subs.eq.2(p0, s0, s1, s2)
}
```

## `subs` 和 `special` 

```follow
thm subs.special.diff.1(prop p0, set s0, set s1) {
  |- iff(subs(p0, s0, s1), p0)
  |- iff(p0, subs(p0, s0, s1))
  |- imp(subs(p0, s0, s1), p0)
  |- imp(p0, subs(p0, s0, s1))
  diff (p0, s0)
} = {
  iff.introii(subs(p0,s0,s1), p0)
  iff.introii(p0, subs(p0,s0,s1))
  syl(subs(p0,s0,s1), p0, exist(s0,p0))
  subs.exist(p0, s0, s1)
  a5(s0, p0)
  syl(p0, subs(p0,s0,s1), forall(s0,p0))
  subs.forall(p0, s0, s1)
  a5(s0, p0)
}
```

```follow
thm subs.special.diff.2(prop p0, set s0, prop p1, set s1) {
  |- iff(subs(p0, s0, s1), p1)
  |- iff(p1, subs(p0, s0, s1))
  |- imp(subs(p0, s0, s1), p1)
  |- imp(p1, subs(p0, s0, s1))
  -| imp(eq(c(s0), c(s1)), iff(p0, p1))
  diff (s0, s1) (s0, p1) 
} = {
  iff.comi(p1, subs(p0,s0,s1))
  iff.lefti(subs(p0,s0,s1), p1)
  iff.righti(subs(p0,s0,s1), p1)
  iff.syl(subs(p0,s0,s1), p1, forall(s0,imp(eq(c(s0),c(s1)),p0)))
  subs.forall.diff(p0, s0, s1)
  eq.forall.3(p0, s0, p1, s1)
}
```

```follow
thm subs.special.diff.3(prop p0, set s0, prop p1, set s1, prop p2, set s2) {
  |- iff(subs(p0, s0, s1), p1)
  |- iff(p1, subs(p0, s0, s1))
  |- imp(subs(p0, s0, s1), p1)
  |- imp(p1, subs(p0, s0, s1))
  -| imp(eq(c(s0), c(s2)), iff(p0, p2))
  -| imp(eq(c(s2), c(s1)), iff(p2, p1))
  diff (s2, p0) (s2, s0) (s2, p1) (s2, s1) (p2, s0)
} = {
  iff.comi(p1, subs(p0,s0,s1))
  iff.lefti(subs(p0,s0,s1), p1)
  iff.righti(subs(p0,s0,s1), p1)
  iff.syl(subs(p0,s0,s1), p1, subs(p2,s2,s1))
  subs.special.diff.2(p2, s2, p1, s1)
  iff.syl(subs(p0,s0,s1), subs(p2,s2,s1), subs(subs(p0,s0,s1),s2,s1))
  subs.special.diff.1(subs(p0,s0,s1), s2, s1)
  iff.syl(subs(subs(p0,s0,s1),s2,s1), subs(p2,s2,s1), subs(subs(p0,s0,s2),s2,s1))
  subs.subs.diff(p0, s0, s2, s1)
  subs.iff.gen(subs(p0,s0,s2), p2, s2, s1)
  subs.special.diff.2(p0, s0, p2, s2)
}
```

```follow
thm subs.trans.diff(prop p0, set s0, set s1, set s2) {
  |- iff(subs(subs(p0, s0, s1), s1, s2), subs(p0, s0, s2))
  |- iff(subs(p0, s0, s2), subs(subs(p0, s0, s1), s1, s2))
  |- imp(subs(subs(p0, s0, s1), s1, s2), subs(p0, s0, s2))
  |- imp(subs(p0, s0, s2), subs(subs(p0, s0, s1), s1, s2))
  diff (s1, s0) (s1, p0)
} = {
  iff.comi(subs(p0,s0,s2), subs(subs(p0,s0,s1),s1,s2))
  iff.lefti(subs(subs(p0,s0,s1),s1,s2), subs(p0,s0,s2))
  iff.righti(subs(subs(p0,s0,s1),s1,s2), subs(p0,s0,s2))
  subs.special.diff.3(subs(p0,s0,s1), s1, subs(p0,s0,s2), s2, subs(p0,s0,hs0), hs0)
  subs.eq.2(p0, s0, s1, hs0)
  subs.eq.2(p0, s0, hs0, s2)
}
```

## `eq` 作用上 `subs` 

```follow
thm eq.subs.diff.left(set s0, set s1, set s2) {
  |- iff(subs(eq(c(s0),c(s1)), s0, s2), eq(c(s2), c(s1)))
  |- iff(eq(c(s2), c(s1)), subs(eq(c(s0),c(s1)), s0, s2))
  |- imp(subs(eq(c(s0),c(s1)), s0, s2), eq(c(s2), c(s1)))
  |- imp(eq(c(s2), c(s1)), subs(eq(c(s0),c(s1)), s0, s2))
  diff (s0, s1)
} = {
  iff.comi(eq(c(s2),c(s1)), subs(eq(c(s0),c(s1)),s0,s2))
  iff.lefti(subs(eq(c(s0),c(s1)),s0,s2), eq(c(s2),c(s1)))
  iff.righti(subs(eq(c(s0),c(s1)),s0,s2), eq(c(s2),c(s1)))
  subs.special.diff.3(eq(c(s0),c(s1)), s0, eq(c(s2),c(s1)), s2, eq(c(hs0),c(s1)), hs0)
  eq.trans(s0, hs0, s1)
  eq.trans(hs0, s2, s1)
}
```

```follow
thm eq.subs.diff.right(set s0, set s1, set s2) {
  |- iff(subs(eq(c(s0),c(s1)), s1, s2), eq(c(s0), c(s2)))
  |- iff(eq(c(s0), c(s2)), subs(eq(c(s0),c(s1)), s1, s2))
  |- imp(subs(eq(c(s0),c(s1)), s1, s2), eq(c(s0), c(s2)))
  |- imp(eq(c(s0), c(s2)), subs(eq(c(s0),c(s1)), s1, s2))
  diff (s0, s1)
} = {
  iff.comi(eq(c(s0),c(s2)), subs(eq(c(s0),c(s1)),s1,s2))
  iff.lefti(subs(eq(c(s0),c(s1)),s1,s2), eq(c(s0),c(s2)))
  iff.righti(subs(eq(c(s0),c(s1)),s1,s2), eq(c(s0),c(s2)))
  subs.special.diff.3(eq(c(s0),c(s1)), s1, eq(c(s0),c(s2)), s2, eq(c(s0),c(hs0)), hs0)
  eq.trans(s1, hs0, s0)
  eq.trans(hs0, s2, s0)
}
```

```follow
thm eq.subs.diff.id(set s0, set s1) {
  |- subs(eq(c(s0), c(s1)), s0, s1)
  |- subs(eq(c(s0), c(s1)), s1, s0)
  diff (s0, s1)
} = {
  mp(subs(eq(c(s0),c(s1)),s0,s1), eq(c(s1),c(s1)))
  eq.subs.diff.left(s0, s1, s1)
  eq.id(s1)
  mp(subs(eq(c(s0),c(s1)),s1,s0), eq(c(s0),c(s0)))
  eq.subs.diff.right(s0, s1, s0)
  eq.id(s0)
}
```