
# 逻辑量词 `forall` 和 `exist` 

这里我们定义集合论中用到的逻辑量词 `forall`。
量词第一个变量可以接受 `set` 但是不能接受 `class`，
`set` 可以转化成 `class`，但是 `class` 不能转化成 `set`。

```follow
type set class
term prop forall(set s0, prop p0) { ∀(s0, p0 ) } 
term prop exist(set s0, prop p0) { ∃(s0, p0) }
term prop eq(class c0, class c1) { ( c0 = c1 )}
term class c(set s0) { s0 }

term set hs0
term set hs1
term set hs2
term set hs3
term set hs4
term set hs5
```

## `exist` 的定义

```follow
axiom exist.def.1(set s0, prop p0) {
  |- iff(exist(s0, p0), not(forall(s0, not(p0))))
}
```

```follow
thm exist.def.2(set s0, prop p0) {
  |- iff(exist(s0, p0), not(forall(s0, not(p0))))
  |- iff(not(forall(s0, not(p0))), exist(s0, p0))
  |- imp(exist(s0, p0), not(forall(s0, not(p0))))
  |- imp(not(forall(s0, not(p0))), exist(s0, p0))
} = {
  iff.lefti(exist(s0,p0), not(forall(s0,not(p0))))
  iff.righti(exist(s0,p0), not(forall(s0,not(p0))))
  iff.comi(not(forall(s0,not(p0))), exist(s0,p0))
  exist.def.1(s0, p0)
}
```

## `forall` 的四个基本公理

```follow
// 泛化公理
axiom gen.1(set s0, prop p1) {
  |- forall(s0, p1)
  -| p1
}
```

```follow
axiom a4.1(set s0, prop p1, prop p2) {
  |- imp(forall(s0, imp(p1, p2)), imp(forall(s0, p1), forall(s0, p2)))
}
```

```follow
// 首次使用 diff 关键词, 要求穿入的变量 s0 和 p1 不能包含相同的叶子变量
axiom a5.1(set s0, prop p1) {
  |- imp(p1, forall(s0, p1))
  diff (s0, p1)
}
```

```follow
axiom a6.1(set s0, set s1) {
  |- not(forall(s0, not(eq(c(s0), c(s1)))))
  |- exist(s0, eq(c(s0), c(s1)))
  diff (s0, s1)
}
```

## 公理 `a4` 相关的定理 

```follow
thm a4.1i(set s0, prop p1, prop p2) {
  |- imp(forall(s0, p1), forall(s0, p2))
  -| forall(s0, imp(p1, p2))
} = {
  mp(imp(forall(s0,p1),forall(s0,p2)), forall(s0,imp(p1,p2)))
  a4.1(s0, p1, p2)
}
```

```follow
thm a4.1d(set s0, prop p1, prop p2, prop p3) {
  |- imp(p3, imp(forall(s0, p1), forall(s0, p2)))
  -| imp(p3, forall(s0, imp(p1, p2)))
} = {
  syl(p3, imp(forall(s0,p1),forall(s0,p2)), forall(s0,imp(p1,p2)))
  a4.1(s0, p1, p2)
}
```

### `a4.2` 和 `exist.def` 

```follow
thm a4.2(set s0, prop p1, prop p2) {
  |- imp(forall(s0, iff(p1, p2)), iff(forall(s0, p1), forall(s0, p2)))
} = {
  iff.introd(forall(s0,iff(p1,p2)), forall(s0,p1), forall(s0,p2))
  a4.1d(s0, p1, p2, forall(s0,iff(p1,p2)))
  a4.1d(s0, p2, p1, forall(s0,iff(p1,p2)))
  a4.1i(s0, iff(p1,p2), imp(p2,p1))
  a4.1i(s0, iff(p1,p2), imp(p1,p2))
  gen.1(s0, imp(iff(p1,p2),imp(p1,p2)))
  gen.1(s0, imp(iff(p1,p2),imp(p2,p1)))
  iff.left(p1, p2)
  iff.right(p1, p2)
}
```

```follow
thm exist.def(set s0, prop p0) {
  // 第一组
  |- iff(exist(s0, p0), not(forall(s0, not(p0))))
  |- iff(not(forall(s0, not(p0))), exist(s0, p0))
  |- imp(exist(s0, p0), not(forall(s0, not(p0))))
  |- imp(not(forall(s0, not(p0))), exist(s0, p0))

  // 第二组
  |- iff(forall(s0, not(p0)), not(exist(s0, p0)))
  |- iff(not(exist(s0, p0)), forall(s0, not(p0)))
  |- imp(forall(s0, not(p0)), not(exist(s0, p0)))
  |- imp(not(exist(s0, p0)), forall(s0, not(p0)))

  // 第三组
  |- iff(forall(s0, p0), not(exist(s0, not(p0))))
  |- iff(not(exist(s0, not(p0))), forall(s0, p0))
  |- imp(forall(s0, p0), not(exist(s0, not(p0))))
  |- imp(not(exist(s0, not(p0))), forall(s0, p0))

  // 第四组
  |- iff(not(forall(s0, p0)), exist(s0, not(p0)))
  |- iff(exist(s0, not(p0)), not(forall(s0, p0)))
  |- imp(not(forall(s0, p0)), exist(s0, not(p0)))
  |- imp(exist(s0, not(p0)), not(forall(s0, p0)))
} = {
  iff.introii(not(forall(s0,p0)), exist(s0,not(p0)))
  iff.introii(exist(s0,not(p0)), not(forall(s0,p0)))

  mp(iff(forall(s0,not(p0)),not(exist(s0,p0))), iff(exist(s0,p0),not(forall(s0,not(p0)))))
  iff.con(exist(s0,p0), forall(s0,not(p0)))
  mp(iff(not(exist(s0,p0)),forall(s0,not(p0))), iff(not(forall(s0,not(p0))),exist(s0,p0)))
  iff.con(forall(s0,not(p0)), exist(s0,p0))
  con1i(forall(s0,not(p0)), exist(s0,p0))
  con2i(exist(s0,p0), forall(s0,not(p0)))
  exist.def.2(s0, p0)

  iff.introii(forall(s0,p0), not(exist(s0,not(p0))))
  iff.introii(not(exist(s0,not(p0))), forall(s0,p0))
  con1i(forall(s0,p0), exist(s0,not(p0)))
  syl(exist(s0,not(p0)), not(forall(s0,p0)), not(forall(s0,not(not(p0)))))
  exist.def.2(s0, not(p0))
  con3i(forall(s0,not(not(p0))), forall(s0,p0))
  a4.1i(s0, p0, not(not(p0)))
  gen.1(s0, imp(p0,not(not(p0))))
  con2i(exist(s0,not(p0)), forall(s0,p0))
  syl(not(forall(s0,p0)), exist(s0,not(p0)), not(forall(s0,not(not(p0)))))
  exist.def.2(s0, not(p0))
  con3i(forall(s0,p0), forall(s0,not(not(p0))))
  a4.1i(s0, not(not(p0)), p0)
  gen.1(s0, imp(not(not(p0)),p0))
  notnot(p0)
}
```

### `a4` 与 `forall.exist.exist` 

```follow
thm a4.aee.1(set s0, prop p1, prop p2) {
  |- imp(forall(s0, imp(p1, p2)), imp(exist(s0, p1), exist(s0, p2)))
} = {
  rw23(forall(s0,imp(p1,p2)), exist(s0,p1), exist(s0,p2), not(forall(s0,not(p1))), not(forall(s0,not(p2)))) 
  exist.def.2(s0, p2)
  exist.def.2(s0, p1)
  con3d(forall(s0,imp(p1,p2)), forall(s0,not(p1)), forall(s0,not(p2)))
  syl(forall(s0,imp(p1,p2)), imp(forall(s0,not(p2)),forall(s0,not(p1))), forall(s0,imp(not(p2),not(p1))))
  a4.1(s0, not(p2), not(p1))
  a4.1i(s0, imp(p1,p2), imp(not(p2),not(p1)))
  gen.1(s0, imp(imp(p1,p2),imp(not(p2),not(p1))))
  con3(p1, p2)
}
```

```follow
thm a4.aee.1i(set s0, prop p1, prop p2) {
  |- imp(exist(s0, p1), exist(s0, p2))
  -| forall(s0, imp(p1, p2)), 
} = {
  mp(imp(exist(s0,p1),exist(s0,p2)), forall(s0,imp(p1,p2)))
  a4.aee.1(s0, p1, p2)
}
```

```follow
thm a4.aee.1d(set s0, prop p1, prop p2, prop p3) {
  |- imp(p3, imp(exist(s0, p1), exist(s0, p2)))
  -| imp(p3, forall(s0, imp(p1, p2)))
} = {
  syl(p3, imp(exist(s0,p1),exist(s0,p2)), forall(s0,imp(p1,p2)))
  a4.aee.1(s0, p1, p2)
}
```


```follow
thm a4.aee.2(set s0, prop p1, prop p2) {
  |- imp(forall(s0, iff(p1, p2)), iff(exist(s0, p1), exist(s0, p2)))
} = {
  iff.introd(forall(s0,iff(p1,p2)), exist(s0,p1), exist(s0,p2))
  syl(forall(s0,iff(p1,p2)), imp(exist(s0,p1),exist(s0,p2)), forall(s0,imp(p1,p2)))
  a4.aee.1(s0, p1, p2)
  syl(forall(s0,iff(p1,p2)), imp(exist(s0,p2),exist(s0,p1)), forall(s0,imp(p2,p1)))
  a4.aee.1(s0, p2, p1)
  a4.1i(s0, iff(p1,p2), imp(p2,p1))
  a4.1i(s0, iff(p1,p2), imp(p1,p2))
  gen.1(s0, imp(iff(p1,p2),imp(p1,p2)))
  gen.1(s0, imp(iff(p1,p2),imp(p2,p1)))
  iff.left(p1, p2)
  iff.right(p1, p2)
}
```

### `a4` 与 `forall.exist.forall`

```follow
thm a4.aea(set s0, prop p1, prop p2) {
  |- imp(imp(exist(s0, p1), forall(s0, p2)), forall(s0, imp(p1, p2)))
} = {
  joinii(exist(s0,p1), forall(s0,p2), forall(s0,imp(p1,p2)))
  a4.1i(s0, p2, imp(p1,p2))
  gen.1(s0, imp(p2,imp(p1,p2)))
  a1(p2, p1)
  syl(not(exist(s0,p1)), forall(s0,imp(p1,p2)), forall(s0,not(p1)))
  exist.def(s0, p1)
  a4.1i(s0, not(p1), imp(p1,p2))
  gen.1(s0, imp(not(p1),imp(p1,p2)))
  cont(p1, p2)
}
```

### `a4` 与 `exist.forall.exist` 

```follow
thm a4.eae.1(set s0, prop p1, prop p2) {
  |- imp(exist(s0, imp(p1, p2)), imp(forall(s0, p1), exist(s0, p2)))
} = {
  com12i(exist(s0,imp(p1,p2)), forall(s0,p1), exist(s0,p2))
  syl(forall(s0,p1), imp(exist(s0,imp(p1,p2)),exist(s0,p2)), forall(s0,imp(imp(p1,p2),p2)))
  a4.aee.1(s0, imp(p1,p2), p2)
  a4.1i(s0, p1, imp(imp(p1,p2),p2))
  gen.1(s0, imp(p1,imp(imp(p1,p2),p2)))
  iidd(p1, p2)
}
```


```follow
thm a4.eae.1i(set s0, prop p1, prop p2) {
  |- imp(forall(s0, p1), exist(s0, p2))
  -| exist(s0, imp(p1, p2)) 
} = {
  mp(imp(forall(s0,p1),exist(s0,p2)), exist(s0,imp(p1,p2)))
  a4.eae.1(s0, p1, p2)
}
```

```follow
thm a4.eae.1d(set s0, prop p1, prop p2, prop p3) {
  |- imp(p3, imp(forall(s0, p1), exist(s0, p2)))
  -| imp(p3, exist(s0, imp(p1, p2)))
} = {
  syl(p3, imp(forall(s0,p1),exist(s0,p2)), exist(s0,imp(p1,p2)))
  a4.eae.1(s0, p1, p2)
}
```

```follow
thm a4.eae.2(set s0, prop p1, prop p2) {
  |- imp(imp(forall(s0, p1), exist(s0, p2)), exist(s0, imp(p1, p2)))
} = {
  joinii(forall(s0,p1), exist(s0,p2), exist(s0,imp(p1,p2)))
  syl(not(forall(s0,p1)), exist(s0,imp(p1,p2)), not(forall(s0,not(imp(p1,p2)))))
  exist.def.2(s0, imp(p1,p2))
  con3i(forall(s0,p1), forall(s0,not(imp(p1,p2))))
  a4.1i(s0, not(imp(p1,p2)), p1)
  gen.1(s0, imp(not(imp(p1,p2)),p1))
  con2i(imp(p1,p2), p1)
  cont(p1, p2)
  mp(imp(exist(s0,p2),exist(s0,imp(p1,p2))), forall(s0,imp(p2,imp(p1,p2))))
  a4.aee.1(s0, p2, imp(p1,p2))
  gen.1(s0, imp(p2,imp(p1,p2)))
  a1(p2, p1)
}
```

```follow
thm a4.eae(set s0, prop p1, prop p2) {
  |- iff(exist(s0, imp(p1, p2)), imp(forall(s0, p1), exist(s0, p2)))
  |- iff(imp(forall(s0, p1), exist(s0, p2)), exist(s0, imp(p1, p2)))
  |- imp(exist(s0, imp(p1, p2)), imp(forall(s0, p1), exist(s0, p2)))
  |- imp(imp(forall(s0, p1), exist(s0, p2)), exist(s0, imp(p1, p2)))
} = {
  iff.introii(exist(s0,imp(p1,p2)), imp(forall(s0,p1),exist(s0,p2)))
  iff.introii(imp(forall(s0,p1),exist(s0,p2)), exist(s0,imp(p1,p2)))
  a4.eae.1(s0, p1, p2)
  a4.eae.2(s0, p1, p2)
}
```

### `a4` 与 `and` 

```follow
thm a4.and.1(set s0, prop p1, prop p2) {
  |- imp(forall(s0, and(p1, p2)), and(forall(s0, p1), forall(s0, p2)))
} = {
  and.introd(forall(s0,and(p1,p2)), forall(s0,p1), forall(s0,p2))
  a4.1i(s0, and(p1,p2), p1)
  a4.1i(s0, and(p1,p2), p2)
  gen.1(s0, imp(and(p1,p2),p2))
  gen.1(s0, imp(and(p1,p2),p1))
  and.left(p1, p2)
  and.right(p1, p2)
}
```

```follow
thm a4.and.2(set s0, prop p1, prop p2) {
  |- imp(exist(s0, and(p1, p2)), and(exist(s0, p1), exist(s0, p2)))
} = {
  and.introd(exist(s0,and(p1,p2)), exist(s0,p1), exist(s0,p2))
  mp(imp(exist(s0,and(p1,p2)),exist(s0,p1)), forall(s0,imp(and(p1,p2),p1)))
  a4.aee.1(s0, and(p1,p2), p1)
  gen.1(s0, imp(and(p1,p2),p1))
  and.left(p1, p2)
  mp(imp(exist(s0,and(p1,p2)),exist(s0,p2)), forall(s0,imp(and(p1,p2),p2)))
  a4.aee.1(s0, and(p1,p2), p2)
  gen.1(s0, imp(and(p1,p2),p2))
  and.right(p1, p2)
}
```

### `a4` 与 `or` 

```follow
thm a4.or.1(set s0, prop p1, prop p2) {
  |- imp(exist(s0, or(p1, p2)), or(exist(s0, p1), exist(s0, p2)))
} = {
  syl(exist(s0,or(p1,p2)), or(exist(s0,p1),exist(s0,p2)), imp(not(exist(s0,p1)),exist(s0,p2)))
  or.def(exist(s0,p1), exist(s0,p2))
  rw2(exist(s0,or(p1,p2)), not(exist(s0,p1)), exist(s0,p2), forall(s0,not(p1)))
  exist.def(s0, p1)
  syl(exist(s0,or(p1,p2)), imp(forall(s0,not(p1)),exist(s0,p2)), exist(s0,imp(not(p1),p2)))
  a4.eae(s0, not(p1), p2)
  a4.aee.1i(s0, or(p1,p2), imp(not(p1),p2))
  gen.1(s0, imp(or(p1,p2),imp(not(p1),p2)))
  or.def(p1, p2)
}
```

```follow
thm a4.or.2(set s0, prop p1, prop p2) {
  |- imp(or(exist(s0, p1), exist(s0, p2)), exist(s0, or(p1, p2)))
} = {
  or.casesii(exist(s0,p1), exist(s0,p2), exist(s0,or(p1,p2)))
  a4.aee.1i(s0, p1, or(p1,p2))
  a4.aee.1i(s0, p2, or(p1,p2))
  gen.1(s0, imp(p2,or(p1,p2)))
  gen.1(s0, imp(p1,or(p1,p2)))
  or.left(p1, p2)
  or.right(p1, p2)
}
```

```follow
thm a4.or(set s0, prop p1, prop p2) {
  |- iff(or(exist(s0, p1), exist(s0, p2)), exist(s0, or(p1, p2)))
  |- iff(exist(s0, or(p1, p2)), or(exist(s0, p1), exist(s0, p2)))
  |- imp(or(exist(s0, p1), exist(s0, p2)), exist(s0, or(p1, p2)))
  |- imp(exist(s0, or(p1, p2)), or(exist(s0, p1), exist(s0, p2)))
} = {
  iff.introii(or(exist(s0,p1),exist(s0,p2)), exist(s0,or(p1,p2)))
  iff.introii(exist(s0,or(p1,p2)), or(exist(s0,p1),exist(s0,p2)))
  a4.or.1(s0, p1, p2)
  a4.or.2(s0, p1, p2)
}
```

### `a4` 汇总

```follow
thm a4(set s0, prop p1, prop p2) {
  |- imp(forall(s0, imp(p1, p2)), imp(forall(s0, p1), forall(s0, p2))) // a4.1
  |- imp(forall(s0, iff(p1, p2)), iff(forall(s0, p1), forall(s0, p2))) // a4.2
  |- imp(forall(s0, imp(p1, p2)), imp(exist(s0, p1), exist(s0, p2))) // a4.aee.1
  |- imp(forall(s0, iff(p1, p2)), iff(exist(s0, p1), exist(s0, p2))) // a4.aee.2
  |- imp(imp(exist(s0, p1), forall(s0, p2)), forall(s0, imp(p1, p2))) // a4.aea
  |- iff(exist(s0, imp(p1, p2)), imp(forall(s0, p1), exist(s0, p2))) // a4.eae
  |- iff(imp(forall(s0, p1), exist(s0, p2)), exist(s0, imp(p1, p2))) // a4.eae
  |- imp(exist(s0, imp(p1, p2)), imp(forall(s0, p1), exist(s0, p2))) // a4.eae
  |- imp(imp(forall(s0, p1), exist(s0, p2)), exist(s0, imp(p1, p2))) // a4.eae
  |- imp(forall(s0, and(p1, p2)), and(forall(s0, p1), forall(s0, p2))) // a4.and.1
  |- imp(exist(s0, and(p1, p2)), and(exist(s0, p1), exist(s0, p2))) // a4.and.2
  |- iff(or(exist(s0, p1), exist(s0, p2)), exist(s0, or(p1, p2))) // a4.or
  |- iff(exist(s0, or(p1, p2)), or(exist(s0, p1), exist(s0, p2))) // a4.or
  |- imp(or(exist(s0, p1), exist(s0, p2)), exist(s0, or(p1, p2))) // a4.or
  |- imp(exist(s0, or(p1, p2)), or(exist(s0, p1), exist(s0, p2))) // a4.or
} = {
  a4.1(s0, p1, p2)
  a4.2(s0, p1, p2)
  a4.aea(s0, p1, p2)
  a4.aee.1(s0, p1, p2)
  a4.aee.2(s0, p1, p2)
  a4.eae(s0, p1, p2)
  a4.and.1(s0, p1, p2)
  a4.and.2(s0, p1, p2)
  a4.or(s0, p1, p2)
}
```

## 泛化公理 `gen` 相关的定理

```follow
thm gen.notexist(set s0, prop p1) {
  |- not(exist(s0, p1))
  -| not(p1)
} = {
  mp(not(exist(s0,p1)), forall(s0,not(p1)))
  gen.1(s0, not(p1))
  con1i(forall(s0,not(p1)), exist(s0,p1))
  exist.def.2(s0, p1)
}
```

```follow
thm gen.2(set s0, prop p1) {
  |- exist(s0, p1)
  -| p1
} = {
  mp(exist(s0,p1), exist(s0,eq(c(s0),c(hs0))))
  a6.1(s0, hs0)
  a4.aee.1i(s0, eq(c(s0),c(hs0)), p1)
  gen.1(s0, imp(eq(c(s0),c(hs0)),p1))
  a1i(eq(c(s0),c(hs0)), p1)
}
```

```follow
thm gen(set s0, prop p1) {
  |- forall(s0, p1)
  |- exist(s0, p1)
  -| p1
} = {
  gen.1(s0, p1)
  gen.2(s0, p1)
}
```

```follow
thm forall.2exist(set s0, prop p0) {
  |- imp(forall(s0, p0), exist(s0, p0))
} = {
  a4.eae.1i(s0, p0, p0)
  gen(s0, imp(p0,p0))
  id(p0)
}
```

```follow
thm gend(set s0, prop p0, prop p1) {
  |- imp(p1, forall(s0, p0))
  |- imp(p1, exist(s0, p0))
  -| imp(p1, p0)
  diff (p1, s0)
} = {
  syl(p1, exist(s0,p0), forall(s0,p0))
  forall.2exist(s0, p0)
  syl(p1, forall(s0,p0), forall(s0,p1))
  a5.1(s0, p1)
  a4.1i(s0, p1, p0)
  gen(s0, imp(p1,p0))
}
```

## 公理 `a5` 相关的定理 


```follow
thm a5.exist.1(set s0, prop p1) {
  |- imp(exist(s0, p1), p1)
  diff (s0, p1)
} = {
  syl(exist(s0,p1), p1, not(forall(s0,not(p1))))
  exist.def.2(s0, p1)
  con2i(forall(s0,not(p1)), p1)
  a5.1(s0, not(p1))
}
```

```follow
thm a5.exist.2(set s0, prop p1) {
  |- imp(exist(s0, p1), forall(s0, p1))
  diff (s0, p1)
} = {
  syl(exist(s0,p1), forall(s0,p1), p1)
  a5.exist.1(s0, p1)
  a5.1(s0, p1)
}
```

```follow
thm a5.exist.3(set s0, prop p0) {
  |- imp(p0, exist(s0, p0))
  diff (s0, p0)
} = {
  syl(p0, exist(s0,p0), forall(s0,p0))
  forall.2exist(s0, p0)
  a5.1(s0, p0)
}
```

```follow
thm a5(set s0, prop p0) {
  // 第一组  
  |- iff(p0, forall(s0, p0))
  |- iff(forall(s0, p0), p0)
  |- imp(p0, forall(s0, p0))
  |- imp(forall(s0, p0), p0)

  // 第二组  
  |- iff(p0, exist(s0, p0))
  |- iff(exist(s0, p0), p0)
  |- imp(p0, exist(s0, p0))
  |- imp(exist(s0, p0), p0)

  // 第三组  
  |- iff(forall(s0,p0), exist(s0, p0))
  |- iff(exist(s0, p0), forall(s0, p0))
  |- imp(forall(s0, p0), exist(s0, p0))
  |- imp(exist(s0, p0), forall(s0, p0))

  diff (s0, p0)
} = {
  iff.introii(p0, exist(s0,p0))
  iff.introii(exist(s0,p0), p0)
  a5.exist.1(s0, p0)
  iff.introii(p0, forall(s0,p0))
  iff.introii(forall(s0,p0), p0)
  a5.1(s0, p0)
  syl(forall(s0,p0), p0, not(exist(s0,not(p0))))
  exist.def(s0, p0)
  con2i(exist(s0,not(p0)), p0)
  a5.exist.3(s0, not(p0))
  a5.exist.3(s0, p0)

  iff.introii(forall(s0,p0), exist(s0,p0))
  iff.introii(exist(s0,p0), forall(s0,p0))
  forall.2exist(s0, p0)
  a5.exist.2(s0, p0)
}
```

### `a4` + `a5` 

```follow
thm a4.1.diff(set s0, prop p1, prop p2) {
  |- imp(forall(s0, imp(p1, p2)), imp(forall(s0, p1), p2))
  |- imp(forall(s0, imp(p2, p1)), imp(p2, forall(s0, p1)))
  diff (s0, p2)
} = {
  rw3(forall(s0,imp(p1,p2)), forall(s0,p1), p2, forall(s0,p2))
  a5(s0, p2)
  rw2(forall(s0,imp(p2,p1)), p2, forall(s0,p1), forall(s0,p2))
  a5(s0, p2)
  a4.1(s0, p2, p1)
  a4.1(s0, p1, p2)
}
```

```follow
thm a4.2.diff(set s0, prop p1, prop p2) {
  |- imp(forall(s0, iff(p1, p2)), iff(forall(s0, p1), p2))
  |- imp(forall(s0, iff(p2, p1)), iff(p2, forall(s0, p1)))
  diff (s0, p2)
} = {
  iff.rw3(forall(s0,iff(p1,p2)), forall(s0,p1), p2, forall(s0,p2))
  a5(s0, p2)
  iff.rw2(forall(s0,iff(p2,p1)), p2, forall(s0,p1), forall(s0,p2))
  a5(s0, p2)
  a4.2(s0, p1, p2)
  a4.2(s0, p2, p1)
}
```

```follow
thm a4.aee.1.diff(set s0, prop p1, prop p2) {
  |- imp(forall(s0, imp(p1, p2)), imp(exist(s0, p1), p2))
  |- imp(forall(s0, imp(p2, p1)), imp(p2, exist(s0, p1)))
  diff (s0, p2)
} = {
  rw3(forall(s0,imp(p1,p2)), exist(s0,p1), p2, exist(s0,p2))
  a5(s0, p2)
  rw2(forall(s0,imp(p2,p1)), p2, exist(s0,p1), exist(s0,p2))
  a5(s0, p2)
  a4.aee.1(s0, p2, p1)
  a4.aee.1(s0, p1, p2)
}
```

```follow
thm a4.aee.2.diff(set s0, prop p1, prop p2) {
  |- imp(forall(s0, iff(p1, p2)), iff(exist(s0, p1), p2))
  |- imp(forall(s0, iff(p2, p1)), iff(p2, exist(s0, p1)))
  diff (s0, p2)
} = {
  iff.rw3(forall(s0,iff(p1,p2)), exist(s0,p1), p2, exist(s0,p2))
  a5(s0, p2)
  iff.rw2(forall(s0,iff(p2,p1)), p2, exist(s0,p1), exist(s0,p2))
  a5(s0, p2)
  a4.aee.2(s0, p2, p1)
  a4.aee.2(s0, p1, p2)
}
```

```follow
thm a4.aea.diff(set s0, prop p1, prop p2) {
  |- iff(imp(exist(s0, p1), p2), forall(s0, imp(p1, p2))) // a4.aea
  |- iff(imp(p2, forall(s0, p1)), forall(s0, imp(p2, p1))) // a4.aea
  |- iff(forall(s0, imp(p1, p2)), imp(exist(s0, p1), p2)) // a4.aea
  |- iff(forall(s0, imp(p2, p1)), imp(p2, forall(s0, p1))) // a4.aea
  |- iff(imp(p2, forall(s0, p1)), forall(s0, imp(p2, p1))) // a4.aea
  |- imp(imp(exist(s0, p1), p2), forall(s0, imp(p1, p2))) // a4.aea
  |- imp(imp(p2, forall(s0, p1)), forall(s0, imp(p2, p1))) // a4.aea
  diff (s0, p2)
} = {
  iff.introii(imp(exist(s0,p1),p2), forall(s0,imp(p1,p2)))
  iff.introii(imp(p2,forall(s0,p1)), forall(s0,imp(p2,p1)))
  iff.introii(forall(s0,imp(p1,p2)), imp(exist(s0,p1),p2))
  iff.introii(forall(s0,imp(p2,p1)), imp(p2,forall(s0,p1)))
  syl(imp(exist(s0,p1),p2), forall(s0,imp(p1,p2)), imp(exist(s0,p1),forall(s0,p2)))
  a4.aea(s0, p1, p2)
  mp(imp(imp(exist(s0,p1),p2),imp(exist(s0,p1),forall(s0,p2))), imp(p2,forall(s0,p2)))
  trans(exist(s0,p1), p2, forall(s0,p2))
  a5(s0, p2)
  syl(imp(p2,forall(s0,p1)), forall(s0,imp(p2,p1)), imp(exist(s0,p2),forall(s0,p1)))
  a4.aea(s0, p2, p1)
  mp(imp(imp(p2,forall(s0,p1)),imp(exist(s0,p2),forall(s0,p1))), imp(exist(s0,p2),p2))
  trans(exist(s0,p2), p2, forall(s0,p1))
  a5(s0, p2)
  a4.aee.1.diff(s0, p1, p2)
  a4.1.diff(s0, p1, p2)
}
```

```follow
thm a4.eae.1.diff(set s0, prop p1, prop p2) {
  |- imp(exist(s0, imp(p1, p2)), imp(forall(s0, p1), p2))
  |- imp(exist(s0, imp(p2, p1)), imp(p2, exist(s0, p1)))
  diff (s0, p2)
} = {
  rw3(exist(s0,imp(p1,p2)), forall(s0,p1), p2, exist(s0,p2))
  a5(s0, p2)
  rw2(exist(s0,imp(p2,p1)), p2, exist(s0,p1), forall(s0,p2))
  a5(s0, p2)
  a4.eae.1(s0, p2, p1)
  a4.eae.1(s0, p1, p2)
}
```

```follow
thm a4.eae.2.diff(set s0, prop p1, prop p2) {
  |- imp(imp(forall(s0, p1), p2), exist(s0, imp(p1, p2)))
  |- imp(imp(p2, exist(s0, p1)), exist(s0, imp(p2, p1)))
  diff (s0, p2)
} = {
  syl(imp(forall(s0,p1),p2), exist(s0,imp(p1,p2)), imp(forall(s0,p1),exist(s0,p2)))
  a4.eae.2(s0, p1, p2)
  mp(imp(imp(forall(s0,p1),p2),imp(forall(s0,p1),exist(s0,p2))), imp(p2,exist(s0,p2)))
  trans(forall(s0,p1), p2, exist(s0,p2))
  a5(s0, p2)
  syl(imp(p2,exist(s0,p1)), exist(s0,imp(p2,p1)), imp(forall(s0,p2),exist(s0,p1)))
  a4.eae.2(s0, p2, p1)
  mp(imp(imp(p2,exist(s0,p1)),imp(forall(s0,p2),exist(s0,p1))), imp(forall(s0,p2),p2))
  trans(forall(s0,p2), p2, exist(s0,p1))
  a5(s0, p2)
}
```

```follow
thm a4.eae.diff(set s0, prop p1, prop p2) {
  |- imp(exist(s0, imp(p1, p2)), imp(forall(s0, p1), p2))
  |- imp(exist(s0, imp(p2, p1)), imp(p2, exist(s0, p1)))
  |- imp(imp(forall(s0, p1), p2), exist(s0, imp(p1, p2)))
  |- imp(imp(p2, exist(s0, p1)), exist(s0, imp(p2, p1)))
  |- iff(exist(s0, imp(p1, p2)), imp(forall(s0, p1), p2))
  |- iff(exist(s0, imp(p2, p1)), imp(p2, exist(s0, p1)))
  |- iff(imp(forall(s0, p1), p2), exist(s0, imp(p1, p2)))
  |- iff(imp(p2, exist(s0, p1)), exist(s0, imp(p2, p1)))
  diff (s0, p2)
} = {
  iff.introii(exist(s0,imp(p1,p2)), imp(forall(s0,p1),p2))
  iff.introii(exist(s0,imp(p2,p1)), imp(p2,exist(s0,p1)))
  iff.introii(imp(forall(s0,p1),p2), exist(s0,imp(p1,p2)))
  iff.introii(imp(p2,exist(s0,p1)), exist(s0,imp(p2,p1)))
  a4.eae.1.diff(s0, p1, p2)
  a4.eae.2.diff(s0, p1, p2)
}
```

```follow
thm a4.and.1.diff(set s0, prop p1, prop p2) {
  |- imp(forall(s0, and(p1, p2)), and(forall(s0, p1), p2))
  |- imp(forall(s0, and(p2, p1)), and(p2, forall(s0, p1)))
  diff (s0, p2)
} = {
  and.rw3(forall(s0,and(p1,p2)), forall(s0,p1), p2, forall(s0,p2))
  a5(s0, p2)
  and.rw2(forall(s0,and(p2,p1)), p2, forall(s0,p1), forall(s0,p2))
  a5(s0, p2)
  a4.and.1(s0, p2, p1)
  a4.and.1(s0, p1, p2)
}
```

```follow
thm a4.and.2.diff(set s0, prop p1, prop p2) {
  |- imp(exist(s0, and(p1, p2)), and(exist(s0, p1), p2))
  |- imp(exist(s0, and(p2, p1)), and(p2, exist(s0, p1)))
  diff (s0, p2)
} = {
  and.rw3(exist(s0,and(p1,p2)), exist(s0,p1), p2, exist(s0,p2))
  a5(s0, p2)
  and.rw2(exist(s0,and(p2,p1)), p2, exist(s0,p1), exist(s0,p2))
  a5(s0, p2)
  a4.and.2(s0, p2, p1)
  a4.and.2(s0, p1, p2)
}
```

```follow
thm a4.and.3.diff(set s0, prop p1, prop p2) {
  |- imp(and(exist(s0, p1), p2), exist(s0, and(p1, p2)))
  |- imp(and(p2, exist(s0, p1)), exist(s0, and(p2, p1)))
  diff (s0, p2)
} = {
  and.impoi(exist(s0,p1), p2, exist(s0,and(p1,p2)))
  com12i(exist(s0,p1), p2, exist(s0,and(p1,p2)))
  a4.aee.1d(s0, p1, and(p1,p2), p2)
  gend(s0, imp(p1,and(p1,p2)), p2)
  and.intro(p1, p2)
  and.impoi(p2, exist(s0,p1), exist(s0,and(p2,p1)))
  a4.aee.1d(s0, p1, and(p2,p1), p2)
  gend(s0, imp(p1,and(p2,p1)), p2)
  and.intro(p2, p1)
}
```

```follow
thm a4.and.diff(set s0, prop p1, prop p2) {
  |- imp(forall(s0, and(p1, p2)), and(forall(s0, p1), p2))
  |- imp(forall(s0, and(p2, p1)), and(p2, forall(s0, p1)))

  |- imp(exist(s0, and(p1, p2)), and(exist(s0, p1), p2))
  |- imp(exist(s0, and(p2, p1)), and(p2, exist(s0, p1)))

  |- imp(and(exist(s0, p1), p2), exist(s0, and(p1, p2)))
  |- imp(and(p2, exist(s0, p1)), exist(s0, and(p2, p1)))

  |- iff(exist(s0, and(p1, p2)), and(exist(s0, p1), p2))
  |- iff(exist(s0, and(p2, p1)), and(p2, exist(s0, p1)))
  |- iff(and(exist(s0, p1), p2), exist(s0, and(p1, p2)))
  |- iff(and(p2, exist(s0, p1)), exist(s0, and(p2, p1)))

  diff (s0, p2)
} = {
  iff.introii(exist(s0,and(p1,p2)), and(exist(s0,p1),p2))
  iff.introii(exist(s0,and(p2,p1)), and(p2,exist(s0,p1)))
  iff.introii(and(exist(s0,p1),p2), exist(s0,and(p1,p2)))
  iff.introii(and(p2,exist(s0,p1)), exist(s0,and(p2,p1)))
  a4.and.1.diff(s0, p1, p2)
  a4.and.2.diff(s0, p1, p2)
  a4.and.3.diff(s0, p1, p2)
}
```

```follow
thm a4.or.1.diff(set s0, prop p1, prop p2) {
  |- imp(exist(s0, or(p1, p2)), or(exist(s0, p1), p2))
  |- imp(exist(s0, or(p2, p1)), or(p2, exist(s0, p1)))
  diff (s0, p2)
} = {
  or.rw3(exist(s0,or(p1,p2)), exist(s0,p1), p2, exist(s0,p2))
  a5(s0, p2)
  or.rw2(exist(s0,or(p2,p1)), p2, exist(s0,p1), exist(s0,p2))
  a5(s0, p2)
  a4.or.1(s0, p2, p1)
  a4.or.1(s0, p1, p2)
}
```

```follow
thm a4.diff(set s0, prop p1, prop p2) {
  |- imp(forall(s0, imp(p1, p2)), imp(forall(s0, p1), p2)) // a4.1.diff
  |- imp(forall(s0, imp(p2, p1)), imp(p2, forall(s0, p1))) // a4.1.diff

  |- imp(forall(s0, iff(p1, p2)), iff(forall(s0, p1), p2)) // a4.2.diff
  |- imp(forall(s0, iff(p2, p1)), iff(p2, forall(s0, p1))) // a4.2.diff

  |- imp(forall(s0, imp(p1, p2)), imp(exist(s0, p1), p2)) //a4.aee.1.diff
  |- imp(forall(s0, imp(p2, p1)), imp(p2, exist(s0, p1))) // a4.aee.1.diff

  |- imp(forall(s0, iff(p1, p2)), iff(exist(s0, p1), p2)) // a4.aee.2.diff
  |- imp(forall(s0, iff(p2, p1)), iff(p2, exist(s0, p1))) // a4.aee.2.diff

  // a4.aea
  |- iff(imp(exist(s0, p1), p2), forall(s0, imp(p1, p2))) // a4.aea
  |- iff(imp(p2, forall(s0, p1)), forall(s0, imp(p2, p1))) // a4.aea
  |- iff(forall(s0, imp(p1, p2)), imp(exist(s0, p1), p2)) // a4.aea
  |- iff(forall(s0, imp(p2, p1)), imp(p2, forall(s0, p1))) // a4.aea
  |- imp(imp(exist(s0, p1), p2), forall(s0, imp(p1, p2))) // a4.aea
  |- imp(imp(p2, forall(s0, p1)), forall(s0, imp(p2, p1))) // a4.aea

  // a4.eae
  |- imp(exist(s0, imp(p1, p2)), imp(forall(s0, p1), p2)) // a4.eae
  |- imp(exist(s0, imp(p2, p1)), imp(p2, exist(s0, p1))) // a4.eae
  |- imp(imp(forall(s0, p1), p2), exist(s0, imp(p1, p2))) // a4.eae
  |- imp(imp(p2, exist(s0, p1)), exist(s0, imp(p2, p1))) // a4.eae
  |- iff(exist(s0, imp(p1, p2)), imp(forall(s0, p1), p2)) // a4.eae
  |- iff(exist(s0, imp(p2, p1)), imp(p2, exist(s0, p1))) // a4.eae
  |- iff(imp(forall(s0, p1), p2), exist(s0, imp(p1, p2))) // a4.eae
  |- iff(imp(p2, exist(s0, p1)), exist(s0, imp(p2, p1))) // a4.eae

  |- imp(forall(s0, and(p1, p2)), and(forall(s0, p1), p2)) // a4.and.diff
  |- imp(forall(s0, and(p2, p1)), and(p2, forall(s0, p1))) // a4.and.diff

  |- imp(exist(s0, and(p1, p2)), and(exist(s0, p1), p2)) // a4.and.diff
  |- imp(exist(s0, and(p2, p1)), and(p2, exist(s0, p1))) // a4.and.diff

  |- imp(and(exist(s0, p1), p2), exist(s0, and(p1, p2))) // a4.and.diff
  |- imp(and(p2, exist(s0, p1)), exist(s0, and(p2, p1))) // a4.and.diff

  |- iff(exist(s0, and(p1, p2)), and(exist(s0, p1), p2)) // a4.and.diff
  |- iff(exist(s0, and(p2, p1)), and(p2, exist(s0, p1))) // a4.and.diff
  |- iff(and(exist(s0, p1), p2), exist(s0, and(p1, p2))) // a4.and.diff
  |- iff(and(p2, exist(s0, p1)), exist(s0, and(p2, p1))) // a4.and.diff

  |- imp(exist(s0, or(p1, p2)), or(exist(s0, p1), p2))  // a4.or.1.diff
  |- imp(exist(s0, or(p2, p1)), or(p2, exist(s0, p1))) // a4.or.1.diff

  diff (s0, p2)
} = {
  a4.1.diff(s0, p1, p2)
  a4.2.diff(s0, p1, p2)
  a4.aea.diff(s0, p1, p2)
  a4.aee.1.diff(s0, p1, p2)
  a4.aee.2.diff(s0, p1, p2)
  a4.eae.diff(s0, p1, p2)
  a4.and.diff(s0, p1, p2)
  a4.or.1.diff(s0, p1, p2)
}
```

## 补充定理 

### `exist.imp`

```follow
thm exist.imp.1(set s0, prop p1, prop p2) {
  |- imp(imp(exist(s0, p1), exist(s0, p2)), exist(s0, imp(p1, p2)))
} = {
  syl(imp(exist(s0,p1),exist(s0,p2)), exist(s0,imp(p1,p2)), imp(forall(s0,p1),exist(s0,p2)))
  a4.eae(s0, p1, p2)
  mp(imp(imp(exist(s0,p1),exist(s0,p2)),imp(forall(s0,p1),exist(s0,p2))), imp(forall(s0,p1),exist(s0,p1)))
  trans(forall(s0,p1), exist(s0,p1), exist(s0,p2))
  forall.2exist(s0, p1)
}
```

```follow
thm exist.imp.2(set s0, prop p1, prop p2) {
  |- imp(imp(forall(s0, p1), forall(s0, p2)), exist(s0, imp(p1, p2)))
} = {
  syl(imp(forall(s0,p1),forall(s0,p2)), exist(s0,imp(p1,p2)), imp(forall(s0,p1),exist(s0,p2)))
  a4.eae(s0, p1, p2)
  mp(imp(imp(forall(s0,p1),forall(s0,p2)),imp(forall(s0,p1),exist(s0,p2))), imp(forall(s0,p2),exist(s0,p2)))
  trans(forall(s0,p1), forall(s0,p2), exist(s0,p2))
  forall.2exist(s0, p2)
}
```

### `exist.or` 

```follow
thm exist.or(set s0, prop p1, prop p2) {
  |- imp(or(forall(s0, p1), exist(s0, p2)), exist(s0, or(p1, p2)))
} = {
  syl(or(forall(s0,p1),exist(s0,p2)), exist(s0,or(p1,p2)), or(exist(s0,p1),exist(s0,p2)))
  a4.or(s0, p1, p2)
  or.2orii(forall(s0,p1), exist(s0,p2), exist(s0,p1), exist(s0,p2))
  id(exist(s0,p2))
  forall.2exist(s0, p1)
}
```