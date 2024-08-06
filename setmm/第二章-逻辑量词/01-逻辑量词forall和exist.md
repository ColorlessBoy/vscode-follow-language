
# 逻辑量词 `forall` 和 `exist` 

这里我们定义集合论中用到的逻辑量词 `forall`。
量词第一个变量可以接受 `set` 但是不能接受 `class`，
`set` 可以转化成 `class`，但是 `class` 不能转化成 `set`。

```follow
type set class
term class stoc(set s0) { s0 }
term prop forall(set s0, prop p0) { ∀(s0, p0 ) } 
term prop exist(set s0, prop p0) { ∃(s0, p0) }

term set hs0
term set hs1
term set hs2
term set hs3
term set hs4
term set hs5
```

```follow
axiom exist.def(set s0, prop p0) {
  |- iff(exist(s0, p0), not(forall(s0, not(p0))))
  |- iff(not(forall(s0, not(p0))), exist(s0, p0))
  |- imp(exist(s0, p0), not(forall(s0, not(p0))))
  |- imp(not(forall(s0, not(p0))), exist(s0, p0))
}
```

```follow
// 泛化公理
axiom gen(set s0, prop p1) {
  |- forall(s0, p1)
  -| p1
}
```

```follow
axiom a4(set s0, prop p1, prop p2) {
  |- imp(forall(s0, imp(p1, p2)), imp(forall(s0, p1), forall(s0, p2)))
}
```

```follow
// 首次使用 diff 关键词, 要求穿入的变量 s0 和 p1 不能有相同的单词
axiom a5(set s0, prop p1) {
  |- imp(p1, forall(s0, p1))
  diff (s0, p1)
}
```

## 泛化公理 `gen` 相关的定理

```follow
thm gen.exist(set s0, prop p1) {
  |- not(exist(s0, p1))
  -| not(p1)
} = {
  mp(not(exist(s0,p1)), forall(s0,not(p1)))
  gen(s0, not(p1))
  con1i(forall(s0,not(p1)), exist(s0,p1))
  exist.def(s0, p1)
}
```

## 公理 `a4` 相关的定理 

```follow
thm a4i(set s0, prop p1, prop p2) {
  |- imp(forall(s0, p1), forall(s0, p2))
  -| forall(s0, imp(p1, p2))
} = {
  mp(imp(forall(s0,p1),forall(s0,p2)), forall(s0,imp(p1,p2)))
  a4(s0, p1, p2)
}
```

```follow
thm a4d(set s0, prop p1, prop p2, prop p3) {
  |- imp(p3, imp(forall(s0, p1), forall(s0, p2)))
  -| imp(p3, forall(s0, imp(p1, p2)))
} = {
  syl(p3, imp(forall(s0,p1),forall(s0,p2)), forall(s0,imp(p1,p2)))
  a4(s0, p1, p2)
}
```

```follow
thm a4i.gen(set s0, prop p1, prop p2) {
  |- imp(forall(s0, p1), forall(s0, p2))
  -| imp(p1, p2)
} = {
  a4i(s0, p1, p2)
  gen(s0, imp(p1,p2))
}
```

### `a4.iff`

```follow
thm a4.iff(set s0, prop p1, prop p2) {
  |- imp(forall(s0, iff(p1, p2)), iff(forall(s0, p1), forall(s0, p2)))
} = {
  iff.introd(forall(s0,iff(p1,p2)), forall(s0,p1), forall(s0,p2))
  a4d(s0, p1, p2, forall(s0,iff(p1,p2)))
  a4d(s0, p2, p1, forall(s0,iff(p1,p2)))
  a4i.gen(s0, iff(p1,p2), imp(p2,p1))
  a4i.gen(s0, iff(p1,p2), imp(p1,p2))
  iff.left(p1, p2)
  iff.right(p1, p2)
}
```

```follow
thm a4.iffi(set s0, prop p1, prop p2) {
  |- iff(forall(s0, p1), forall(s0, p2))
  -| forall(s0, iff(p1, p2)) 
} = {
  mp(iff(forall(s0,p1),forall(s0,p2)), forall(s0,iff(p1,p2)))
  a4.iff(s0, p1, p2)
}
```

```follow
thm a4.iffi.gen(set s0, prop p1, prop p2) {
  |- iff(forall(s0, p1), forall(s0, p2))
  -| iff(p1, p2)
} = {
  a4.iffi(s0, p1, p2)
  gen(s0, iff(p1,p2))
}
```

```follow
thm a4.iffd(set s0, prop p1, prop p2, prop p3) {
  |- imp(p3, iff(forall(s0, p1), forall(s0, p2)))
  -| imp(p3, forall(s0, iff(p1, p2)))
} = {
  syl(p3, iff(forall(s0,p1),forall(s0,p2)), forall(s0,iff(p1,p2)))
  a4.iff(s0, p1, p2)
}
```

### `a4.exist`

```follow
thm a4.exist(set s0, prop p1, prop p2) {
  |- imp(forall(s0, imp(p1, p2)), imp(exist(s0, p1), exist(s0, p2)))
} = {
  rw23(forall(s0,imp(p1,p2)), exist(s0,p1), exist(s0,p2), not(forall(s0,not(p1))), not(forall(s0,not(p2)))) 
  exist.def(s0, p2)
  exist.def(s0, p1)
  con3d(forall(s0,imp(p1,p2)), forall(s0,not(p1)), forall(s0,not(p2)))
  syl(forall(s0,imp(p1,p2)), imp(forall(s0,not(p2)),forall(s0,not(p1))), forall(s0,imp(not(p2),not(p1))))
  a4(s0, not(p2), not(p1))
  a4i(s0, imp(p1,p2), imp(not(p2),not(p1)))
  gen(s0, imp(imp(p1,p2),imp(not(p2),not(p1))))
  con3(p1, p2)
}
```

```follow
thm a4.existi(set s0, prop p1, prop p2) {
  |- imp(exist(s0, p1), exist(s0, p2))
  -| forall(s0, imp(p1, p2)) 
} = {
  mp(imp(exist(s0,p1),exist(s0,p2)), forall(s0,imp(p1,p2)))
  a4.exist(s0, p1, p2)
}
```

```follow
thm a4.existi.gen(set s0, prop p1, prop p2) {
  |- imp(exist(s0, p1), exist(s0, p2))
  -| imp(p1, p2)
} = {
  a4.existi(s0, p1, p2)
  gen(s0, imp(p1,p2))
}
```

```follow
thm a4.existd(set s0, prop p1, prop p2, prop p3) {
  |- imp(p3, imp(exist(s0, p1), exist(s0, p2)))
  -| imp(p3, forall(s0, imp(p1, p2)))
} = {
  syl(p3, imp(exist(s0,p1),exist(s0,p2)), forall(s0,imp(p1,p2)))
  a4.exist(s0, p1, p2)
}
```

```follow
thm a4.exist.iff(set s0, prop p1, prop p2) {
  |- imp(forall(s0, iff(p1, p2)), iff(exist(s0, p1), exist(s0, p2)))
} = {
  iff.introd(forall(s0,iff(p1,p2)), exist(s0,p1), exist(s0,p2))
  a4.existd(s0, p1, p2, forall(s0,iff(p1,p2)))
  a4.existd(s0, p2, p1, forall(s0,iff(p1,p2)))
  a4i.gen(s0, iff(p1,p2), imp(p2,p1))
  a4i.gen(s0, iff(p1,p2), imp(p1,p2))
  iff.left(p1, p2)
  iff.right(p1, p2)
}
```

```follow
thm a4.exist.iffi(set s0, prop p1, prop p2) {
  |- iff(exist(s0, p1), exist(s0, p2))
  -| forall(s0, iff(p1, p2)) 
} = {
  mp(iff(exist(s0,p1),exist(s0,p2)), forall(s0,iff(p1,p2)))
  a4.exist.iff(s0, p1, p2)
}
```

```follow
thm a4.exist.iffi.gen(set s0, prop p1, prop p2) {
  |- iff(exist(s0, p1), exist(s0, p2))
  -| iff(p1, p2)
} = {
  a4.exist.iffi(s0, p1, p2)
  gen(s0, iff(p1,p2))
}
```

```follow
thm a4.exist.iffd(set s0, prop p1, prop p2, prop p3) {
  |- imp(p3, iff(exist(s0, p1), exist(s0, p2)))
  -| imp(p3, forall(s0, iff(p1, p2)))
} = {
  syl(p3, iff(exist(s0,p1),exist(s0,p2)), forall(s0,iff(p1,p2)))
  a4.exist.iff(s0, p1, p2)
}
```

### `a4.exist2`

```follow
thm a4.exist2.1(set s0, prop p1, prop p2) {
  |- imp(exist(s0, imp(p1, p2)), imp(forall(s0, p1), exist(s0, p2)))
} = {
  com12i(exist(s0,imp(p1,p2)), forall(s0,p1), exist(s0,p2))
  syl(forall(s0,p1), imp(exist(s0,imp(p1,p2)),exist(s0,p2)), forall(s0,imp(imp(p1,p2),p2)))
  a4.exist(s0, imp(p1,p2), p2)
  a4i.gen(s0, p1, imp(imp(p1,p2),p2))
  iidd(p1, p2)
}
```

```follow
thm a4.exist2.1i(set s0, prop p1, prop p2) {
  |- imp(forall(s0, p1), exist(s0, p2))
  -| exist(s0, imp(p1, p2))
} = {
  mp(imp(forall(s0,p1),exist(s0,p2)), exist(s0,imp(p1,p2)))
  a4.exist2.1(s0, p1, p2)
}
```

```follow
thm a4.exist2.2(set s0, prop p1, prop p2) {
  |- imp(imp(forall(s0, p1), exist(s0, p2)), exist(s0, imp(p1, p2)))
} = {
  joinii(forall(s0,p1), exist(s0,p2), exist(s0,imp(p1,p2)))
  syl(not(forall(s0,p1)), exist(s0,imp(p1,p2)), not(forall(s0,not(imp(p1,p2)))))
  exist.def(s0, imp(p1,p2))
  con3i(forall(s0,p1), forall(s0,not(imp(p1,p2))))
  a4i.gen(s0, not(imp(p1,p2)), p1)
  con2i(imp(p1,p2), p1)
  cont(p1, p2)
  a4.existi.gen(s0, p2, imp(p1,p2))
  a1(p2, p1)
}
```

```follow
thm a4.exist2.2i(set s0, prop p1, prop p2) {
  |- exist(s0, imp(p1, p2)))
  -| imp(forall(s0, p1), exist(s0, p2)) 
} = {
  mp(exist(s0,imp(p1,p2)), imp(forall(s0,p1),exist(s0,p2)))
  a4.exist2.2(s0, p1, p2)
}
```

```follow
thm a4.exist2(set s0, prop p1, prop p2) {
  |- iff(exist(s0, imp(p1, p2)), imp(forall(s0, p1), exist(s0, p2)))
  |- iff(imp(forall(s0, p1), exist(s0, p2)), exist(s0, imp(p1, p2)))
  |- imp(exist(s0, imp(p1, p2)), imp(forall(s0, p1), exist(s0, p2)))
  |- imp(imp(forall(s0, p1), exist(s0, p2)), exist(s0, imp(p1, p2)))
} = {
  iff.introii(exist(s0,imp(p1,p2)), imp(forall(s0,p1),exist(s0,p2)))
  iff.introii(imp(forall(s0,p1),exist(s0,p2)), exist(s0,imp(p1,p2)))
  a4.exist2.1(s0, p1, p2)
  a4.exist2.2(s0, p1, p2)
}
```

## 公理 `a5` 相关的定理 

```follow
thm a5d(set s0, prop p1, prop p3) {
  |- imp(p3, imp(p1, forall(s0, p1)))
  diff (s0, p1)
} = {
  a1i(p3, imp(p1,forall(s0,p1)))
  a5(s0, p1)
}
```

```follow
thm a5.exist.1(set s0, prop p1) {
  |- imp(exist(s0, p1), p1)
  diff (s0, p1)
} = {
  syl(exist(s0,p1), p1, not(forall(s0,not(p1))))
  exist.def(s0, p1)
  con2i(forall(s0,not(p1)), p1)
  a5(s0, not(p1))
}
```

```follow
thm a5.e2a(set s0, prop p1) {
  |- imp(exist(s0, p1), forall(s0, p1))
  diff (s0, p1)
} = {
  syl(exist(s0,p1), forall(s0,p1), p1)
  a5.exist.1(s0, p1)
  a5(s0, p1)
}
```

```follow
thm gend(set s0, prop p1, prop p2) {
  |- imp(p2, forall(s0, p1))
  -| imp(p2, p1)
  diff (s0, p2)
} = {
  syl(p2, forall(s0,p1), forall(s0,p2))
  a5(s0, p2)
  a4i(s0, p2, p1)
  gen(s0, imp(p2,p1))
}

```

```follow
thm a4d.gen(set s0, prop p1, prop p2, prop p3) {
  |- imp(p3, imp(forall(s0, p1), forall(s0, p2)))
  -| imp(p3, imp(p1, p2))
  diff (s0, p3)
} = {
  a4d(s0, p1, p2, p3)
  gend(s0, imp(p1,p2), p3)
}
```

```follow
thm a4.iffd.gen(set s0, prop p1, prop p2, prop p3) {
  |- imp(p3, iff(forall(s0, p1), forall(s0, p2)))
  -| imp(p3, iff(p1, p2))
  diff (s0, p3)
} = {
  a4.iffd(s0, p1, p2, p3)
  gend(s0, iff(p1,p2), p3)
}
```

```follow
thm a4.existd.gen(set s0, prop p1, prop p2, prop p3) {
  |- imp(p3, imp(exist(s0, p1), exist(s0, p2)))
  -| imp(p3, imp(p1, p2))
  diff (s0, p3)
} = {
  syl(p3, imp(exist(s0,p1),exist(s0,p2)), forall(s0,imp(p1,p2)))
  a4.exist(s0, p1, p2)
  gend(s0, imp(p1,p2), p3)
}
```

```follow
thm a4.exist.iffd.gen(set s0, prop p1, prop p2, prop p3) {
  |- imp(p3, iff(exist(s0, p1), exist(s0, p2)))
  -| imp(p3, iff(p1, p2))
  diff (s0, p3)
} = {
  a4.exist.iffd(s0, p1, p2, p3)
  gend(s0, iff(p1,p2), p3)
}
```

## `exist` 的性质

```follow
thm forall.notexist(set s0, prop p0) {
  |- iff(forall(s0, not(p0)), not(exist(s0, p0)))
  |- iff(not(exist(s0, p0)), forall(s0, not(p0)))
  |- imp(forall(s0, not(p0)), not(exist(s0, p0)))
  |- imp(not(exist(s0, p0)), forall(s0, not(p0)))

  |- iff(forall(s0, p0), not(exist(s0, not(p0))))
  |- iff(not(exist(s0, not(p0))), forall(s0, p0))
  |- imp(forall(s0, p0), not(exist(s0, not(p0))))
  |- imp(not(exist(s0, not(p0))), forall(s0, p0))
} = {
  mp(iff(forall(s0,not(p0)),not(exist(s0,p0))), iff(exist(s0,p0),not(forall(s0,not(p0)))))
  iff.con(exist(s0,p0), forall(s0,not(p0)))
  mp(iff(not(exist(s0,p0)),forall(s0,not(p0))), iff(not(forall(s0,not(p0))),exist(s0,p0)))
  iff.con(forall(s0,not(p0)), exist(s0,p0))
  con1i(forall(s0,not(p0)), exist(s0,p0))
  con2i(exist(s0,p0), forall(s0,not(p0)))
  exist.def(s0, p0)

  iff.introii(forall(s0,p0), not(exist(s0,not(p0))))
  iff.introii(not(exist(s0,not(p0))), forall(s0,p0))
  con1i(forall(s0,p0), exist(s0,not(p0)))
  syl(exist(s0,not(p0)), not(forall(s0,p0)), not(forall(s0,not(not(p0)))))
  exist.def(s0, not(p0))
  con3i(forall(s0,not(not(p0))), forall(s0,p0))
  a4i.gen(s0, p0, not(not(p0)))
  con2i(exist(s0,not(p0)), forall(s0,p0))
  syl(not(forall(s0,p0)), exist(s0,not(p0)), not(forall(s0,not(not(p0)))))
  exist.def(s0, not(p0))
  con3i(forall(s0,p0), forall(s0,not(not(p0))))
  a4i.gen(s0, not(not(p0)), p0)
  notnot(p0)
}
```

```follow
thm exist.orexist.1(set s0, prop p1, prop p2) {
  |- imp(exist(s0, or(p1, p2)), or(exist(s0, p1), exist(s0, p2)))
} = {
  syl(exist(s0,or(p1,p2)), or(exist(s0,p1),exist(s0,p2)), imp(not(exist(s0,p1)),exist(s0,p2)))
  or.def(exist(s0,p1), exist(s0,p2))
  rw2(exist(s0,or(p1,p2)), not(exist(s0,p1)), exist(s0,p2), forall(s0,not(p1)))
  forall.notexist(s0, p1)
  syl(exist(s0,or(p1,p2)), imp(forall(s0,not(p1)),exist(s0,p2)), exist(s0,imp(not(p1),p2)))
  a4.exist2(s0, not(p1), p2)
  a4.existi.gen(s0, or(p1,p2), imp(not(p1),p2))
  or.def(p1, p2)
}
```

```follow
thm exist.orexist.2(set s0, prop p1, prop p2) {
  |- imp(or(exist(s0, p1), exist(s0, p2)), exist(s0, or(p1, p2)))
} = {
  or.casesii(exist(s0,p1), exist(s0,p2), exist(s0,or(p1,p2)))
  a4.existi.gen(s0, p1, or(p1,p2))
  a4.existi.gen(s0, p2, or(p1,p2))
  or.left(p1, p2)
  or.right(p1, p2)
}
```

```follow
thm exist.orexist(set s0, prop p1, prop p2) {
  |- iff(or(exist(s0, p1), exist(s0, p2)), exist(s0, or(p1, p2)))
  |- iff(exist(s0, or(p1, p2)), or(exist(s0, p1), exist(s0, p2)))
  |- imp(or(exist(s0, p1), exist(s0, p2)), exist(s0, or(p1, p2)))
  |- imp(exist(s0, or(p1, p2)), or(exist(s0, p1), exist(s0, p2)))
} = {
  iff.introii(or(exist(s0,p1),exist(s0,p2)), exist(s0,or(p1,p2)))
  iff.introii(exist(s0,or(p1,p2)), or(exist(s0,p1),exist(s0,p2)))
  exist.orexist.1(s0, p1, p2)
  exist.orexist.2(s0, p1, p2)
}
```
