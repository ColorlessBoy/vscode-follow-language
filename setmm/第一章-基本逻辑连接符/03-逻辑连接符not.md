
# 逻辑连接符 `not` 

逻辑连接符 `not` 是一阶逻辑中第二个基本的符号，他表示`否定`。

```follow
term prop not(prop p0) { ¬ p0 }
```

```follow
/*
//一阶逻辑第三条公理 
*/
axiom a3(prop p0, prop p1) {
  |- imp(imp(not(p0), not(p1)), imp(p1, p0))
}
```

```follow
thm a3i(prop p0, prop p1) {
  |- imp(p0, p1)
  -| imp(not(p1), not(p0))
} = {
  mp(imp(p0,p1), imp(not(p1),not(p0)))
  a3(p1, p0)
}
```

```follow
thm a3d(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(p1, p2))
  -| imp(p0, imp(not(p2), not(p1)))
} = {
  syl(p0, imp(p1,p2), imp(not(p2),not(p1)))
  a3(p2, p1)
}
```

## 反证法 Contradiction 

```follow
thm cont1(prop p0, prop p1) {
  |- imp(not(p0), imp(p0, p1))
  |- imp(p0, imp(not(p0), p1))
} = {
  com12i(p0, not(p0), p1)
  syl(not(p0), imp(p0,p1), imp(not(p1),not(p0)))
  a3(p1, p0)
  a1(not(p0), not(p1))
}
```

```follow
thm cont2(prop p0) {
  |- imp(imp(not(p0), p0), p0)
} = {
  iid(imp(not(p0),p0), p0)
  a3d(imp(not(p0),p0), imp(not(p0),p0), p0)
  a2i(not(p0), p0, not(imp(not(p0),p0)))
  cont1(p0, not(imp(not(p0),p0)))
}
```

```follow
thm notnot.1(prop p0) {
  |- imp(not(not(p0)), p0)
} = {
  iid(not(not(p0)), p0)
  a3d(not(not(p0)), not(not(p0)), p0)
  cont1(not(p0), not(not(not(p0))))
}
```

```follow
thm cont3(prop p0) {
  |- imp(imp(p0, not(p0)), not(p0))
} = {
  syl(imp(p0,not(p0)), not(p0), imp(not(not(p0)),not(p0)))
  cont2(not(p0))
  mp(imp(imp(p0,not(p0)),imp(not(not(p0)),not(p0))), imp(not(not(p0)),p0))
  trans(not(not(p0)), p0, not(p0))
  notnot.1(p0)
}
```

```follow
thm cont1ii(prop p0, prop p1) {
  |- p1
  -| p0
  -| not(p0)
} = {
  mp(p1, p0)
  mp(imp(p0,p1), not(p0))
  cont1(p0, p1)
}
```

```follow
thm cont2i(prop p0) {
  |- p0
  -| imp(not(p0), p0)
} = {
  mp(p0, imp(not(p0),p0))
  cont2(p0)
}
```

```follow
thm cont3i(prop p0) {
  |- not(p0)
  -| imp(p0, not(p0))
} = {
  mp(not(p0), imp(p0,not(p0)))
  cont3(p0)
}
```

## 否定的否定

```follow
thm notnot(prop p0) {
  |- imp(p0, not(not(p0)))
  |- imp(not(not(p0)), p0)
} = {
  a3i(p0, not(not(p0)))
  notnot.1(not(p0))
  notnot.1(p0)
}
```

## 逆否命题 Contraposition 

```follow
thm con1(prop p0, prop p1) {
  |- imp(imp(p0, not(p1)), imp(p1, not(p0)))
} = {
  a3d(imp(p0,not(p1)), p1, not(p0))
  mp(imp(imp(p0,not(p1)),imp(not(not(p0)),not(p1))), imp(not(not(p0)),p0))
  trans(not(not(p0)), p0, not(p1))
  notnot(p0)
}
```

```follow
thm con2(prop p0, prop p1) {
  |- imp(imp(not(p0), p1), imp(not(p1), p0))
} = {
  a3d(imp(not(p0),p1), not(p1), p0)
  mp(imp(imp(not(p0),p1),imp(not(p0),not(not(p1)))), imp(p1,not(not(p1))))
  trans(not(p0), p1, not(not(p1)))
  notnot(p1)
}
```

```follow
thm con3(prop p0, prop p1) {
  |- imp(imp(p0, p1), imp(not(p1), not(p0)))
} = {
  syl(imp(p0,p1), imp(not(p1),not(p0)), imp(not(not(p0)),p1))
  con2(not(p0), p1)
  mp(imp(imp(p0,p1),imp(not(not(p0)),p1)), imp(not(not(p0)),p0))
  trans(not(not(p0)), p0, p1)
  notnot(p0)
}
```

```follow
thm con4(prop p0, prop p1) {
  |- imp(imp(not(p1), not(p0)), imp(p0, p1))
} = {
  a3(p1, p0)
}
```

```follow
thm con1i(prop p0, prop p1) {
  |- imp(p0, not(p1))
  -| imp(p1, not(p0))
} = {
  mp(imp(p0,not(p1)), imp(p1,not(p0)))
  con1(p1, p0)
}
```

```follow
thm con2i(prop p0, prop p1) {
  |- imp(not(p0), p1)
  -| imp(not(p1), p0)
} = {
  mp(imp(not(p0),p1), imp(not(p1),p0))
  con2(p1, p0)
}
```

```follow
thm con3i(prop p0, prop p1) {
  |- imp(not(p0), not(p1))
  -| imp(p1, p0)
} = {
  mp(imp(not(p0),not(p1)), imp(p1,p0))
  con3(p1, p0)
}
```

```follow
thm con4i(prop p0, prop p1) {
  |- imp(p0, p1)
  -| imp(not(p1),not(p0))
} = {
  mp(imp(p0,p1), imp(not(p1),not(p0)))
  con4(p0, p1)
}
```

```follow
thm con1d(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(p1, not(p2)))
  -| imp(p0, imp(p2, not(p1)))
} = {
  syl(p0, imp(p1,not(p2)), imp(p2,not(p1)))
  con1(p2, p1)
}
```

```follow
thm con2d(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(not(p1), p2))
  -| imp(p0, imp(not(p2), p1))
} = {
  syl(p0, imp(not(p1),p2), imp(not(p2),p1))
  con2(p2, p1)
}
```

```follow
thm con3d(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(not(p1), not(p2)))
  -| imp(p0, imp(p2, p1))
} = {
  syl(p0, imp(not(p1),not(p2)), imp(p2,p1))
  con3(p2, p1)
}
```

```follow
thm con4d(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(p1, p2))
  -| imp(p0, imp(not(p2), not(p1)))
} = {
  syl(p0, imp(p1,p2), imp(not(p2),not(p1)))
  con4(p1, p2)
}
```

## 补充

```follow
thm cont4(prop p0, prop p1) {
  |- imp(imp(p0, p1), imp(imp(not(p0), p1), p1))
  |- imp(imp(not(p0), p1), imp(imp(p0, p1), p1))
} = {
  com12i(imp(not(p0),p1), imp(p0,p1), p1)
  rw23(imp(p0,p1), imp(not(p0),p1), p1, imp(not(p1),p0), imp(not(p1),p1))
  con2(p0, p1)
  trans(not(p1), p0, p1)
  cont2(p1)
}
```

```follow
thm cont5(prop p0, prop p1) {
  |- imp(imp(p0, p1), imp(imp(p0, not(p1)), not(p0)))
  |- imp(imp(p0, not(p1)), imp(imp(p0, p1), not(p0)))
} = {
  com12i(imp(p0,not(p1)), imp(p0,p1), not(p0))
  rw12(imp(p0,p1), imp(p0,not(p1)), not(p0), imp(not(p1),not(p0)), imp(p1,not(p0)))
  con3(p0, p1)
  con1(p0, p1)
  cont4(p1, not(p0))
}
```

```follow
thm cont6(prop p0, prop p1) {
  |- imp(imp(not(p0), p1), imp(imp(not(p0), not(p1)), p0))
  |- imp(imp(not(p0), not(p1)), imp(imp(not(p0), p1), p0))
} = {
  com12i(imp(not(p0),p1), imp(not(p0),not(p1)), p0)
  rw3(imp(not(p0),not(p1)), imp(not(p0),p1), p0, not(not(p0)))
  cont5(not(p0), p1)
  notnot(p0)
}
```

```follow
thm join(prop p0, prop p1, prop p2) {
  |- imp(imp(not(p0), p2), imp(imp(p1, p2), imp(imp(p0, p1), p2)))
  |- imp(imp(p1, p2), imp(imp(not(p0), p2), imp(imp(p0, p1), p2)))
} = {
  com12i(imp(p1,p2), imp(not(p0),p2), imp(imp(p0,p1),p2))
  rw123(imp(not(p0),p2), imp(p1,p2), imp(imp(p0,p1),p2), imp(not(p2),p0), imp(not(p2),not(p1)), imp(not(p2),not(imp(p0,p1))))
  con2(p0, p2)
  con3(p1, p2)
  con4(imp(p0,p1), p2)
  a2d(imp(not(p2),p0), not(p2), not(p1), not(imp(p0,p1)))
  a2i(not(p2), p0, imp(not(p1),not(imp(p0,p1))))
  a1i(not(p2), imp(p0,imp(not(p1),not(imp(p0,p1)))))
  con3d(p0, p1, imp(p0,p1))
  com12i(p0, imp(p0,p1), p1)
  id(imp(p0,p1))
}
```

```follow
thm cont4ii(prop p0, prop p1) {
  |- p1
  -| imp(p0, p1)
  -| imp(not(p0), p1)
} = {
  mp(p1, imp(p0,p1))
  mp(imp(imp(p0,p1),p1), imp(not(p0),p1))
  cont4(p0, p1)
}
```

```follow
thm cont5ii(prop p0, prop p1) {
  |- not(p0)
  -| imp(p0, p1)
  -| imp(p0, not(p1))
} = {
  mp(not(p0), imp(p0,p1))
  mp(imp(imp(p0,p1),not(p0)), imp(p0,not(p1)))
  cont5(p0, p1)
}
```

```follow
thm cont6ii(prop p0, prop p1) {
  |- p0
  -| imp(not(p0), p1)
  -| imp(not(p0), not(p1))
} = {
  mp(p0, imp(not(p0),p1))
  mp(imp(imp(not(p0),p1),p0), imp(not(p0),not(p1)))
  cont6(p0, p1)
}
```

```follow
thm joinii(prop p0, prop p1, prop p2) {
  |- imp(imp(p0, p1), p2)
  -| imp(not(p0), p2)
  -| imp(p1, p2)
} = {
  mp(imp(imp(p0,p1),p2), imp(p1,p2))
  mp(imp(imp(p1,p2),imp(imp(p0,p1),p2)), imp(not(p0),p2))
  join(p0, p1, p2)
}
```

```follow
thm cont4d(prop p0, prop p1, prop p2) {
  |- imp(p0, p1)
  -| imp(p0, imp(p2, p1))
  -| imp(p0, imp(not(p2), p1))
} = {
  a2ii(p0, p1, imp(p2,p1))
  syl(p0, imp(imp(p2,p1),p1), imp(not(p2),p1))
  cont4(p2, p1)
}
```

```follow
thm cont5d(prop p0, prop p1, prop p2) {
  |- imp(p0, not(p1))
  -| imp(p0, imp(p1, p2))
  -| imp(p0, imp(p1, not(p2)))
} = {
  a2ii(p0, not(p1), imp(p1,p2))
  syl(p0, imp(imp(p1,p2),not(p1)), imp(p1,not(p2)))
  cont5(p1, p2)
}
```

```follow
thm cont6d(prop p0, prop p1, prop p2) {
  |- imp(p0, p1)
  -| imp(p0, imp(not(p1), p2))
  -| imp(p0, imp(not(p1), not(p2)))
} = {
  a2ii(p0, p1, imp(not(p1),p2))
  syl(p0, imp(imp(not(p1),p2),p1), imp(not(p1),not(p2)))
  cont6(p1, p2)
}
```

```follow
thm joind(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, imp(imp(p1, p2), p3))
  -| imp(p0, imp(not(p1), p3))
  -| imp(p0, imp(p2, p3))
} = {
  a2ii(p0, imp(imp(p1,p2),p3), imp(not(p1),p3))
  syl(p0, imp(imp(not(p1),p3),imp(imp(p1,p2),p3)), imp(p2,p3))
  join(p1, p2, p3)
}
```

## 合并定理

```follow
// 反证法 Contradiction 
// 反证法的形式非常多
thm cont(prop p0, prop p1) {
  |- imp(not(p0), imp(p0, p1))
  |- imp(p0, imp(not(p0), p1))
  |- imp(imp(not(p1), p1), p1)
  |- imp(imp(p1, not(p1)), not(p1))
  |- imp(imp(p0, p1), imp(imp(not(p0), p1), p1))
  |- imp(imp(not(p0), p1), imp(imp(p0, p1), p1))
  |- imp(imp(p0, p1), imp(imp(p0, not(p1)), not(p0)))
  |- imp(imp(p0, not(p1)), imp(imp(p0, p1), not(p0)))
  |- imp(imp(not(p0), p1), imp(imp(not(p0), not(p1)), p0))
  |- imp(imp(not(p0), not(p1)), imp(imp(not(p0), p1), p0))
} = {
  cont1(p0, p1)
  cont2(p1)
  cont3(p1)
  cont4(p0, p1)
  cont5(p0, p1)
  cont6(p0, p1)
}
```

```follow
// 逆否命题 Contraposition
thm con(prop p0, prop p1) {
  |- imp(imp(not(p0), p1), imp(not(p1), p0))
  |- imp(imp(p0, not(p1)), imp(p1, not(p0)))
  |- imp(imp(p0, p1), imp(not(p1), not(p0)))
  |- imp(imp(not(p1), not(p0)), imp(p0, p1))
} = {
  con2(p0, p1)
  con1(p0, p1)
  con3(p0, p1)
  con4(p0, p1)
}
```