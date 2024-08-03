# 逻辑连接符 `and` 

```follow
term prop and(prop p0, prop p1) { (p0 ∧ p1)}
axiom and.def(prop p0, prop p1) {
  |- imp(and(p0, p1), not(imp(p0, not(p1))))
  |- imp(not(imp(p0, not(p1))), and(p0, p1))
}
```

## 性质

```follow
thm and.left(prop p0, prop p1) {
  |- imp(and(p0, p1), p0)
} = {
  syl(and(p0,p1), p0, not(imp(p0,not(p1))))
  and.def(p0, p1)
  con1i(imp(p0,not(p1)), p0)
  cont(p0, not(p1))
}
```

```follow
thm and.right(prop p0, prop p1) {
  |- imp(and(p0, p1), p1)
} = {
  syl(and(p0,p1), p1, not(imp(p0,not(p1))))
  and.def(p0, p1)
  con1i(imp(p0,not(p1)), p1)
  a1(not(p1), p0)
}
```

```follow
thm and.intro(prop p0, prop p1) {
  |- imp(p0, imp(p1, and(p0, p1)))
} = {
  rw3(p0, p1, and(p0,p1), not(imp(p0,not(p1))))
  and.def(p0, p1)
  con2d(p0, p1, imp(p0,not(p1)))
  com12i(p0, imp(p0,not(p1)), not(p1))
  id(imp(p0,not(p1)))
}
```

```follow
thm and.introii(prop p0, prop p1) {
  |- and(p0, p1)
  -| p0
  -| p1
} = {
  mp(and(p0,p1), p1)
  mp(imp(p1,and(p0,p1)), p0)
  and.intro(p0, p1)
}
```

```follow
thm and.introd(prop p0, prop p1, prop p2) {
  |- imp(p0, and(p1, p2))
  -| imp(p0, p1)
  -| imp(p0, p2)
} = {
  a2ii(p0, and(p1,p2), p2)
  syl(p0, imp(p2,and(p1,p2)), p1)
  and.intro(p1, p2)
}
```

## 交换率

```follow
thm and.com(prop p0, prop p1) {
  |- imp(and(p0, p1), and(p1, p0))
} = {
  syl(and(p0,p1), and(p1,p0), not(imp(p0,not(p1))))
  and.def(p0, p1)
  syl(not(imp(p0,not(p1))), and(p1,p0), not(imp(p1,not(p0))))
  and.def(p1, p0)
  con3i(imp(p0,not(p1)), imp(p1,not(p0)))
  con2(p1, p0)
}
```

```follow
thm and.comi(prop p0, prop p1) {
  |- and(p0, p1)
  -| and(p1, p0)
} = {
  mp(and(p0,p1), and(p1,p0))
  and.com(p1, p0)
}
```

```follow
thm and.comd(prop p0, prop p1, prop p2) {
  |- imp(p0, and(p1, p2))
  -| imp(p0, and(p2, p1))
} = {
  syl(p0, and(p1,p2), and(p2,p1))
  and.com(p2, p1)
}
```

## Importation Inference 引入 `and` 

```follow
thm and.impo(prop p0, prop p1, prop p2) {
  |- imp(imp(p0, imp(p1, p2)), imp(and(p0, p1), p2))
} = {
  rw2(imp(p0,imp(p1,p2)), and(p0,p1), p2, not(imp(p0,not(p1))))
  and.def(p0, p1)
  con1d(imp(p0,imp(p1,p2)), imp(p0,not(p1)), p2)
  syl(imp(p0,imp(p1,p2)), imp(not(p2),imp(p0,not(p1))), imp(p0,imp(not(p2),not(p1))))
  com12(p0, not(p2), not(p1))
  mp(imp(imp(p0,imp(p1,p2)),imp(p0,imp(not(p2),not(p1)))), imp(imp(p1,p2),imp(not(p2),not(p1))))
  trans(p0, imp(p1,p2), imp(not(p2),not(p1)))
  con3(p1, p2)
}
```

```follow
thm and.impoi(prop p0, prop p1, prop p2) {
  |- imp(and(p0, p1), p2)
  -| imp(p0, imp(p1, p2))
} = {
  mp(imp(and(p0,p1),p2), imp(p0,imp(p1,p2)))
  and.impo(p0, p1, p2)
}
```

```follow
thm and.impod(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, imp(and(p1, p2), p3))
  -| imp(p0, imp(p1, imp(p2, p3)))
} = {
  syl(p0, imp(and(p1,p2),p3), imp(p1,imp(p2,p3)))
  and.impo(p1, p2, p3)
}
```

## Exportation Inference 转换 `and` 

```follow
thm and.expo(prop p0, prop p1, prop p2) {
  |- imp(imp(and(p0, p1), p2), imp(p0, imp(p1, p2)))
} = {
  com12i(imp(and(p0,p1),p2), p0, imp(p1,p2))
  com23i(p0, imp(and(p0,p1),p2), p1, p2)
  rw3(p0, p1, imp(imp(and(p0,p1),p2),p2), and(p0,p1))
  and.intro(p0, p1)
  com12i(and(p0,p1), imp(and(p0,p1),p2), p2)
  id(imp(and(p0,p1),p2))
}
```

```follow
thm and.expoi(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(p1, p2))
  -| imp(and(p0, p1), p2)
} = {
  mp(imp(p0,imp(p1,p2)), imp(and(p0,p1),p2))
  and.expo(p0, p1, p2)
}
```

```follow
thm and.expod(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, imp(p1, imp(p2, p3)))
  -| imp(p0, imp(and(p1, p2), p3))
} = {
  syl(p0, imp(p1,imp(p2,p3)), imp(and(p1,p2),p3))
  and.expo(p1, p2, p3)
}
```


