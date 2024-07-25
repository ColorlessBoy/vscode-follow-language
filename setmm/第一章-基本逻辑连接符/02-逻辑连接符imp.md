
# 逻辑连接符 `imp`

逻辑连接符 `imp` 是一阶逻辑最基本的符号。
值得一题的是，在上一章中我们两次碰到了因果：

- 第一次是定义逻辑连接符 `imp`。我们希望它表示一个因果关系。
- 第二次是 `Follow` 语言的证明流中，中 `-|`(条件) 和 `|-`(结论) 之间的关系。

第一个是一个 `term`，它有对也有错。第二个是`Follow`语言中判定对错的标准，它总是对的。在编译器的眼中，它们是两个完全不同的东西。而在逻辑学中，它们之间存在着千丝万缕的联系。

我们可以将一个`imp`连接符转化成证明流中的 `-|`(条件) 和 `|-`(结论) 之间的关系。逻辑学中，把这种转化叫做 `induction`。

```follow
// a2.induction 
thm a2i(prop p0, prop p1, prop p2) {
  |- imp(imp(p0,p1), imp(p0,p2))
  -| imp(p0, imp(p1,p2))
} = {
  mp(imp(imp(p0,p1),imp(p0,p2)), imp(p0,imp(p1,p2)))
  a2(p0, p1, p2)
}
```

```follow
// a2.induction.induction
thm a2ii(prop p0, prop p1, prop p2) {
  |- imp(p0,p1)
  -| imp(p0,p2)
  -| imp(p0,imp(p2,p1))
} = {
  mp(imp(p0,p1), imp(p0,p2))
  a2i(p0, p2, p1)
}
```

```follow
thm mpd(prop p0, prop p1, prop p2) {
  |- imp(p0,p1)
  -| imp(p0,p2)
  -| imp(p0,imp(p2,p1))
} = {
  a2ii(p0, p1, p2)
}
```

```follow
thm id(prop p0) {
  |- imp(p0, p0)
} = {
  mpd(p0, p0, imp(p0,p0))
  a1(p0, p0)
  a1(p0, imp(p0,p0))
}
```

```follow
thm idd(prop p0, prop p1) {
  |- imp(p0, imp(p1,p1))
} = {
  a1i(p0, imp(p1,p1))
  id(p1)
}
```

```follow
// 三段论 syllogism
thm syl(prop p0, prop p1, prop p2) {
  |- imp(p0, p1)
  -| imp(p0, p2)
  -| imp(p2, p1)
} = {
  mpd(p0, p1, p2)
  a1i(p0, imp(p2,p1))
}
```

```follow
thm a1d(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(p1, p2))
  -| imp(p0, p2)
} = {
  syl(p0, imp(p1,p2), p2)
  a1(p2, p1)
}
```

```follow
thm a2d(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, imp(imp(p1,p2), imp(p1,p3)))
  -| imp(p0, imp(p1, imp(p2, p3)))
} = {
  syl(p0, imp(imp(p1,p2),imp(p1,p3)), imp(p1,imp(p2,p3)))
  a2(p1, p2, p3)
}
```

```follow
thm com12i(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(p1, p2))
  -| imp(p1, imp(p0, p2))
} = {
  syl(p0, imp(p1,p2), imp(p1,p0))
  a1(p0, p1)
  a2i(p1, p0, p2)
}
```

```follow
thm com12(prop p0, prop p1, prop p2) {
  |- imp(imp(p0, imp(p1, p2)), imp(p1, imp(p0, p2)))
} = {
  com12i(imp(p0,imp(p1,p2)), p1, imp(p0,p2))
  a2d(p1, p0, imp(p1,p2), p2)
  com12i(p1, p0, imp(imp(p1,p2),p2))
  a1i(p0, imp(p1,imp(imp(p1,p2),p2)))
  com12i(p1, imp(p1,p2), p2)
  id(imp(p1,p2))
}
```

```follow
thm trans.1(prop p0, prop p1, prop p2) {
  |- imp(imp(p0,p1), imp(imp(p1,p2), imp(p0,p2)))
} = {
  com12i(imp(p0,p1), imp(p1,p2), imp(p0,p2))
  a2d(imp(p1,p2), p0, p1, p2)
  a1(imp(p1,p2), p0)
}
```

```follow
thm trans(prop p0, prop p1, prop p2) {
  |- imp(imp(p0,p1), imp(imp(p1,p2), imp(p0,p2)))
  |- imp(imp(p1,p2), imp(imp(p0,p1), imp(p0,p2)))
} = {
  com12i(imp(p1,p2), imp(p0,p1), imp(p0,p2))
  trans.1(p0, p1, p2))
}
```

```follow
thm syl5(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, imp(p1,p2))
  -| imp(p0, imp(p3,p2))
  -| imp(p1, p3)
} = {
  syl(p0, imp(p1,p2), imp(p3,p2))
  mp(imp(imp(p3,p2),imp(p1,p2)), imp(p1,p3))
  trans(p1, p3, p2)
}
```

```follow
thm syl6(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, imp(p1,p2))
  -| imp(p0, imp(p1,p3))
  -| imp(p3, p2)
} = {
  syl(p0, imp(p1,p2), imp(p1,p3))
  mp(imp(imp(p1,p3),imp(p1,p2)), imp(p3,p2))
  trans(p1, p3, p2)
}
```