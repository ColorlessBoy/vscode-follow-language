
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

我们通常也可以将一个证明流中的 `-|`(条件) 和 `|-`(结论) 之间的关系转化成 `imp` 连接符。逻辑学中，把这种转化叫做 `deduction`。

`Follow` 语言延续了 `Metamath` 语言的命名方式。如果一个定理的所有 `term` 是另一个定理的每个 `term` 添加一个 `imp` 操作，那么我们就把后一个操作的名字添加一个 `d` 字母，作为前一个定理的名字。这里对应着一种 `deduction`。
比如下面这个命题就是公理 `mp` 的每个`term`添加`imp`操作后的命题，所以起名叫做 `mpd`。它恰好就是 `a2ii`。

```follow
// mp.deduction
thm mpd(prop p0, prop p1, prop p2) {
  |- imp(p0,p1)
  -| imp(p0,p2)
  -| imp(p0,imp(p2,p1))
} = {
  a2ii(p0, p1, p2)
}
```

```follow
// imp.identity
thm id(prop p0) {
  |- imp(p0, p0)
} = {
  mpd(p0, p0, imp(p0,p0))
  a1(p0, p0)
  a1(p0, imp(p0,p0))
}
```

```follow
// imp.identity.deduction
thm idd(prop p0, prop p1) {
  |- imp(p0, imp(p1,p1))
} = {
  a1i(p0, imp(p1,p1))
  id(p1)
}
```

```follow
// 逻辑学中非常重要的工具：三段论(syllogism)
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
// a1.deduction
thm a1d(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(p1, p2))
  -| imp(p0, p2)
} = {
  syl(p0, imp(p1,p2), p2)
  a1(p2, p1)
}
```

```follow
// a2.deduction
thm a2d(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, imp(imp(p1,p2), imp(p1,p3)))
  -| imp(p0, imp(p1, imp(p2, p3)))
} = {
  syl(p0, imp(imp(p1,p2),imp(p1,p3)), imp(p1,imp(p2,p3)))
  a2(p1, p2, p3)
}
```

```follow
// imp.communation12.induction
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
// imp.communation12
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

在 `Follow` 语言中，公理或者定理可以有多个结论。
就好比电子芯片中的多输入多输出的元器件。
所有的输出都依赖同一组输入。
从下面这个例子我来解释一下为什么要这么设计。

数学逻辑推导存在传递性：当命题A能推导出命题B，命题B能推导出命题C时，我们可知命题A能推导出命题C。写成 `Follow` 语言就有两种形式，对应下面的 `trans.1` 和 `trans.2`。如果只有这两个命题，那么在使用过程中，我们就需要花费精力去确认究竟需要使用 `trans.1` 还是 `trans.2`。Follow语法允许我们把这两个命题合并成`trans`，这样,当我们想要使用 `imp` 的传递性时，我们就不需要再想究竟需要 `trans.1` 还是 `trans.2` 了，转而直接使用 `trans`。
在证明流中，当我们使用 `trans` 时，只要 `trans` 的两个结论有一条是当前需要证明的结论，编译器就能进行证明流的转化。

```follow
// imp.transition.1 第一种形式的传递性。
thm trans.1(prop p0, prop p1, prop p2) {
  |- imp(imp(p0,p1), imp(imp(p1,p2), imp(p0,p2)))
} = {
  com12i(imp(p0,p1), imp(p1,p2), imp(p0,p2))
  a2d(imp(p1,p2), p0, p1, p2)
  a1(imp(p1,p2), p0)
}
```

```follow
// imp.transition.2 第二种形式的传递性。
thm trans.2(prop p0, prop p1, prop p2) {
  |- imp(imp(p1,p2), imp(imp(p0,p1), imp(p0,p2)))
} = {
  com12i(imp(p1,p2), imp(p0,p1), imp(p0,p2))
  trans.1(p0, p1, p2)
}
```

```follow
// imp.transition 完整形式的传递性。
thm trans(prop p0, prop p1, prop p2) {
  |- imp(imp(p0,p1), imp(imp(p1,p2), imp(p0,p2)))
  |- imp(imp(p1,p2), imp(imp(p0,p1), imp(p0,p2)))
} = {
  com12i(imp(p1,p2), imp(p0,p1), imp(p0,p2))
  trans.1(p0, p1, p2))
}
```

```follow
// syl.deduction
thm syld(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, imp(p1,p2))
  -| imp(p0, imp(p3,p2))
  -| imp(p0, imp(p1,p3))
} = {
  a2ii(p0, imp(p1,p2), imp(p3,p2))
  syl(p0, imp(imp(p3,p2),imp(p1,p2)), imp(p1,p3))
  trans(p1, p3, p2)
}
```

```follow 
// imp.change2 替换imp(p0,imp(p1,p2))中的第二个元素
thm change2(prop p0, prop p1, prop p2, prop p3) {
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
// imp.change3 替换imp(p0,imp(p1,p2))中的第三个元素
thm change3(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, imp(p1,p2))
  -| imp(p0, imp(p1,p3))
  -| imp(p3, p2)
} = {
  syl(p0, imp(p1,p2), imp(p1,p3))
  mp(imp(imp(p1,p3),imp(p1,p2)), imp(p3,p2))
  trans(p1, p3, p2)
}
```

```follow
// imp.change23 替换imp(p0,imp(p1,p2))中的第二第三个元素
thm change23(prop p0, prop p1, prop p2, prop p3, prop p4) {
  |- imp(p0, imp(p1,p2))
  -| imp(p0, imp(p3,p4))
  -| imp(p4, p2)
  -| imp(p1, p3)
} = {
}
```