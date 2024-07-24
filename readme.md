# `Follow` 语言的基本语法规则

`Follow` 语言根据 [`Metamath`](https://us.metamath.org/) 语言的启发而设计，
它是一个专门为计算机设计的数学证明语言。
`Follow` 语言基于计算机最擅长的字符串的 **替换** 和 **比较** 两个操作而设计，语法上非常简单。
也正是因为它语法上的简洁性，`Follow` 语言也成为了一个非常好的一阶数理逻辑的入门工具。

## 关键词一 `type`

`prop` 的全称是 `proposition` ，它的中文含义是 `提议`。
它属于一阶逻辑的核心类型。
提议可能是对的也可能是错的，所以 `proposition` 可能是对的也可能是错的。

```follow
type prop
```

## 关键词二 `term`

`imp` 的全称是 `imply`，它的中文含义是 `因此`。
它属于一阶逻辑的核心连接符。
它隐含的真值表达式是:

- `imp(False, False) = True`;
- `imp(False, True ) = True`;
- `imp(True,  False) = False`;
- `imp(True,  True ) = True`;

需要注意的是，这种隐含的真值表达式应该只在我们的脑子里，
`Follow` 语言的编译器并不知道 `imp` 需要满足这样一张真值表达式。

```follow
term prop imp(prop p0, prop p1) {
  (p0 -> p1) // 人类便于理解的表达式
}
```

## 关键词三 `axiom`

公理是一系列我们人类可以接受的 `term` 组合。
公理由（条件 + 结论）组成。
条件由关键词 `-|` 开头，结论由 `-|` 开头。
在 `Follow` 语言中，公理可以是多个条件和多个结论。
这里建议将结论写在开头，条件写在末尾。这条建议和 `Follow` 语言的证明语法有关。

```follow
// 一阶逻辑第一条公理
axiom a1(prop p0, prop p1) {
  |- imp(p0,imp(p1,p0))
}
```

```follow
// 一阶逻辑第二条公理
axiom a2(prop p0, prop p1, prop p2) {
  |- imp(imp(p0,imp(p1,p2)), imp(imp(p0,p1),imp(p0,p2)))
}
```

```follow
// 一阶逻辑第三条公理
axiom mp(prop p0, prop p1) {
  |- p0
  -| imp(p1, p0)
  -| p1
}
```

## 关键词四 `thm`

`thm` 的全称是 `theorem` ，它的中文含义是 `定理`。
定理是一系列需要证明的 `term` 组合。

`Follow` 的证明语法是一个反向的过程。
比如下面这个定理 `a1i`：

- 第一步是什么都不做的起始阶段，我们需要证明 `imp(p0,p1)`；
- 第二步是输入 `mp(imp(p0,p1),p1)`。经过对字符串的替换操作，
  它会产生这样一个 `term` 组合 `|- imp(p0,p1) -| imp(p1,imp(p0,p1)) |- p1`；
  编译器通过对字符串的比较操作，这一步成功将证明 `imp(p0,p1)`
  转化为证明另外两个 `term`：`imp(p1,imp(p0,p1))` 和 `p1`。
  由于 `p1` 正是 `a1i` 的条件，所以也不需要证明。
  最终，第二步的结果是我们只需要再证明 `imp(p1,imp(p0,p1))；
- 第三步是输入 `a1(p1,p0)`。经过对字符串的替换操作，
  它会产生这样一个 `term` `|- imp(p1,imp(p0,p1))`。
  编译器通过对字符串的比较操作，发现这正是我们需要证明的结论。
  由于没有更多的 `term` 需要被证明，所以整个证明过程就结束了。
  此时编译器也就判定定理 `a1i` 被证明。

```follow
thm a1i(prop p0, prop p1) {
  |- imp(p0, p1)
  -| p1
} = {
  mp(imp(p0,p1), p1)
  a1(p1, p0)
}
```
