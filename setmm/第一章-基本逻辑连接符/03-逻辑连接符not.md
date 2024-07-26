
# 逻辑连接符 `not` 

逻辑连接符 `not` 是一阶逻辑中第二个基本的符号，他表示`否定`。

```follow
term prop not(prop p0) { ¬ p0 }
```

```follow
//一阶逻辑第三条公理 
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
thm contradiction.1(prop p0, prop p1) {
  |- imp(not(p0), imp(p0, p1))
} = {
  syl(not(p0), imp(p0,p1), imp(not(p1),not(p0)))
  a3(p1, p0)
  a1(not(p0), not(p1))
}
```

```follow
thm contradiction.2(prop p0) {
  |- imp(imp(not(p0), p0), p0)
} = {
  iid(imp(not(p0),p0), p0)
  a3d(imp(not(p0),p0), imp(not(p0),p0), p0)
  a2i(not(p0), p0, not(imp(not(p0),p0)))
  contradiction.1(p0, not(imp(not(p0),p0)))
}
```

```follow
thm notnot.1(prop p0) {
  |- imp(not(not(p0)), p0)
} = {
  iid(not(not(p0)), p0)
  a3d(not(not(p0)), not(not(p0)), p0)
  contradiction.1(not(p0), not(not(not(p0))))
}
```

```follow
thm contradiction.3(prop p0) {
  |- imp(imp(p0, not(p0)), not(p0))
} = {
  syl(imp(p0,not(p0)), not(p0), imp(not(not(p0)),not(p0)))
  contradiction.2(not(p0))
  mp(imp(imp(p0,not(p0)),imp(not(not(p0)),not(p0))), imp(not(not(p0)),p0))
  trans(not(not(p0)), p0, not(p0))
  notnot.1(p0)
}
```

```follow
thm contradiction(prop p0, prop p1) {
  |- imp(not(p0), imp(p0, p1))
  |- imp(p0, imp(not(p0), p1))
  |- imp(imp(not(p1), p1), p1)
  |- imp(imp(p1, not(p1)), not(p1))
} = {
  com12i(p0, not(p0), p1)
  contradiction.1(p0, p1)
  contradiction.2(p1)
  contradiction.3(p1)
}
```

# 否定的否定

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

# 逆否命题 Contraposition 

```follow
thm contraposition.1(prop p0, prop p1) {
  |- imp(imp(not(p0), p1), imp(not(p1), p0))
} = {
  a3d(imp(not(p0),p1), not(p1), p0)
  mp(imp(imp(not(p0),p1),imp(not(p0),not(not(p1)))), imp(p1,not(not(p1))))
  trans(not(p0), p1, not(not(p1)))
  notnot(p1)
}
```

