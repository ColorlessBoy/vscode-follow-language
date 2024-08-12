
# 非自由变量 `notfree` 

非自由变量的概念在一阶逻辑里非常重要，它指的是 $\forall x, p$ 或者 $\exists x, p$ 之类句子与变量 $x$ 的关系。在这些句子中，$x$ 不是自由的，无论 $x$ 取到什么值，都对整个句子的真假性没有影响。

在通常的数理逻辑教材中，会从语法(Syntax)层面定义什么叫做**自由变量**，什么叫做**非自由变量**。比如：$x$ 没有在句子 $p$ 中出现过，那么 $x$ 是 $p$ 的非自由变量；或者 $x$ 在 $p$ 中出现过，但是都在 $\forall$ 符号，或者 $\exist$ 符号旁边，那么 $x$ 是 $p$ 的非自由变量。

`follow` 继承了 `metamath` 中的方式：语法层面只是定义了`diff`关系，表示 $x$ 没有在句子 $p$ 中出现过。从逻辑语义(Semantic)层面定义完整的 $notfree$ 关系。

```follow
term prop nf(set s0, prop p0) { ㎋(s0, p0) }
```

```follow
axiom nf.def.1(set s0, prop p0) {
  |- iff(nf(s0, p0), imp(exist(s0,p0), forall(s0,p0)))
}
```

## 其他等价定义

```follow
thm nf.def.2(set s0, prop p0) {
  |- iff(nf(s0, p0), or(forall(s0,p0), not(exist(s0, p0))))
} = {
  iff.syl(nf(s0,p0), or(forall(s0,p0),not(exist(s0,p0))), imp(exist(s0,p0),forall(s0,p0)))
  nf.def.1(s0, p0)
  iff.syl(imp(exist(s0,p0),forall(s0,p0)), or(forall(s0,p0),not(exist(s0,p0))), imp(not(forall(s0,p0)),not(exist(s0,p0))))
  iff.or.def(forall(s0,p0), not(exist(s0,p0)))
  iff.con(exist(s0,p0), forall(s0,p0))
}
```

```follow
thm nf.def.3(set s0, prop p0) {
  |- iff(nf(s0, p0), or(forall(s0,p0), forall(s0, not(p0))))
} = {
  iff.syl(nf(s0,p0), or(forall(s0,p0),forall(s0,not(p0))), or(forall(s0,p0),not(exist(s0,p0))))
  nf.def.2(s0, p0)
  or.ifforii(forall(s0,p0), forall(s0,p0), not(exist(s0,p0)), forall(s0,not(p0)))
  iff.id(forall(s0,p0))
  exist.def(s0, p0)
}
```

```follow
thm nf.def.4(set s0, prop p0) {
  |- iff(nf(s0, p0), imp(not(forall(s0,p0)), forall(s0, not(p0))))
} = {
  iff.syl(nf(s0,p0), imp(not(forall(s0,p0)),forall(s0,not(p0))), or(forall(s0,p0),forall(s0,not(p0))))
  nf.def.3(s0, p0)
  iff.or.def(forall(s0,p0), forall(s0,not(p0)))
}
```

```follow
// notfree 定义性质大杂烩
thm nf.def.5(set s0, prop p0) {
  // 第一组
  |- iff(nf(s0, p0), imp(exist(s0,p0), forall(s0,p0)))
  |- iff(imp(exist(s0,p0), forall(s0,p0)), nf(s0, p0))
  |- imp(nf(s0, p0), imp(exist(s0,p0), forall(s0,p0)))
  |- imp(imp(exist(s0,p0), forall(s0,p0)), nf(s0, p0))

  // 第二组
  |- iff(nf(s0, p0), or(forall(s0,p0), not(exist(s0, p0))))
  |- iff(or(forall(s0,p0), not(exist(s0, p0))), nf(s0, p0))
  |- imp(nf(s0, p0), or(forall(s0,p0), not(exist(s0, p0))))
  |- imp(or(forall(s0,p0), not(exist(s0, p0))), nf(s0, p0))

  // 第三组
  |- iff(nf(s0, p0), or(forall(s0,p0), forall(s0, not(p0))))
  |- iff(or(forall(s0,p0), forall(s0, not(p0))), nf(s0, p0))
  |- imp(nf(s0, p0), or(forall(s0,p0), forall(s0, not(p0))))
  |- imp(or(forall(s0,p0), forall(s0, not(p0))), nf(s0, p0))

  // 第四组
  |- iff(nf(s0, p0), imp(not(forall(s0,p0)), forall(s0, not(p0))))
  |- iff(imp(not(forall(s0,p0)), forall(s0, not(p0))), nf(s0, p0))
  |- imp(nf(s0, p0), imp(not(forall(s0,p0)), forall(s0, not(p0))))
  |- imp(imp(not(forall(s0,p0)), forall(s0, not(p0))), nf(s0, p0))
} = {
  iff.comi(imp(exist(s0,p0),forall(s0,p0)), nf(s0,p0))
  iff.lefti(nf(s0,p0), imp(exist(s0,p0),forall(s0,p0)))
  iff.righti(nf(s0,p0), imp(exist(s0,p0),forall(s0,p0)))
  nf.def.1(s0, p0)

  iff.comi(or(forall(s0,p0),not(exist(s0,p0))), nf(s0,p0))
  iff.lefti(nf(s0,p0), or(forall(s0,p0),not(exist(s0,p0))))
  iff.righti(nf(s0,p0), or(forall(s0,p0),not(exist(s0,p0))))
  nf.def.2(s0, p0)

  iff.comi(or(forall(s0,p0),forall(s0,not(p0))), nf(s0,p0))
  iff.lefti(nf(s0,p0), or(forall(s0,p0),forall(s0,not(p0))))
  iff.righti(nf(s0,p0), or(forall(s0,p0),forall(s0,not(p0))))
  nf.def.3(s0, p0)

  iff.comi(imp(not(forall(s0,p0)),forall(s0,not(p0))), nf(s0,p0))
  iff.lefti(nf(s0,p0), imp(not(forall(s0,p0)),forall(s0,not(p0))))
  iff.righti(nf(s0,p0), imp(not(forall(s0,p0)),forall(s0,not(p0))))
  nf.def.4(s0, p0)
}
```

```follow
thm nf.intro.1(set s0, prop p0) {
  |- imp(forall(s0, p0), nf(s0, p0))
  |- imp(not(exist(s0, p0)), nf(s0, p0))
  |- imp(forall(s0, not(p0)), nf(s0, p0))
} = {
  syl(forall(s0,p0), nf(s0,p0), imp(exist(s0,p0),forall(s0,p0)))
  nf.def.5(s0, p0)
  a1(forall(s0,p0), exist(s0,p0))
  syl(not(exist(s0,p0)), nf(s0,p0), imp(exist(s0,p0),forall(s0,p0)))
  nf.def.5(s0, p0)
  cont(exist(s0,p0), forall(s0,p0))
  syl(forall(s0,not(p0)), nf(s0,p0), imp(exist(s0,p0),forall(s0,p0)))
  nf.def.5(s0, p0)
  syl(forall(s0,not(p0)), imp(exist(s0,p0),forall(s0,p0)), not(exist(s0,p0)))
  cont(exist(s0,p0), forall(s0,p0))
  exist.def(s0, p0)
}
```

## `a4`

```follow
thm nf.a4.1(set s0, prop p0, prop p1) {
  |- imp(nf(s0,p0), iff(imp(exist(s0,p0), forall(s0,p1)), forall(s0, imp(p0,p1))))
  |- imp(nf(s0,p0), iff(forall(s0, imp(p0,p1)), imp(exist(s0,p0), forall(s0,p1))))
  |- imp(nf(s0,p0), imp(imp(exist(s0,p0), forall(s0,p1)), forall(s0, imp(p0,p1))))
  |- imp(nf(s0,p0), imp(forall(s0, imp(p0,p1)), imp(exist(s0,p0), forall(s0,p1))))
} = {
  iff.introd(nf(s0,p0), imp(exist(s0,p0),forall(s0,p1)), forall(s0,imp(p0,p1)))
  iff.introd(nf(s0,p0), forall(s0,imp(p0,p1)), imp(exist(s0,p0),forall(s0,p1)))
  a1i(nf(s0,p0), imp(imp(exist(s0,p0),forall(s0,p1)),forall(s0,imp(p0,p1))))
  syl(nf(s0,p0), imp(forall(s0,imp(p0,p1)),imp(exist(s0,p0),forall(s0,p1))), imp(exist(s0,p0),forall(s0,p0)))
  nf.def.5(s0, p0)
  com12i(imp(exist(s0,p0),forall(s0,p0)), forall(s0,imp(p0,p1)), imp(exist(s0,p0),forall(s0,p1)))
  syl(forall(s0,imp(p0,p1)), imp(imp(exist(s0,p0),forall(s0,p0)),imp(exist(s0,p0),forall(s0,p1))), imp(forall(s0,p0),forall(s0,p1)))
  trans(exist(s0,p0), forall(s0,p0), forall(s0,p1))
  a4(s0, p0, p1)
}
```

```follow
thm nf.a4.2(set s0, prop p0, prop p1) {
  |- imp(nf(s0,p1), iff(imp(exist(s0,p0), forall(s0,p1)), forall(s0, imp(p0,p1))))
  |- imp(nf(s0,p1), iff(forall(s0, imp(p0,p1)), imp(exist(s0,p0), forall(s0,p1))))
  |- imp(nf(s0,p1), imp(imp(exist(s0,p0), forall(s0,p1)), forall(s0, imp(p0,p1))))
  |- imp(nf(s0,p1), imp(forall(s0, imp(p0,p1)), imp(exist(s0,p0), forall(s0,p1))))
} = {
  iff.introd(nf(s0,p1), imp(exist(s0,p0),forall(s0,p1)), forall(s0,imp(p0,p1)))
  iff.introd(nf(s0,p1), forall(s0,imp(p0,p1)), imp(exist(s0,p0),forall(s0,p1)))
  a1i(nf(s0,p1), imp(imp(exist(s0,p0),forall(s0,p1)),forall(s0,imp(p0,p1))))
  syl(nf(s0,p1), imp(forall(s0,imp(p0,p1)),imp(exist(s0,p0),forall(s0,p1))), imp(exist(s0,p1),forall(s0,p1)))
  nf.def.5(s0, p1)
  com12i(imp(exist(s0,p1),forall(s0,p1)), forall(s0,imp(p0,p1)), imp(exist(s0,p0),forall(s0,p1)))
  syl(forall(s0,imp(p0,p1)), imp(imp(exist(s0,p1),forall(s0,p1)),imp(exist(s0,p0),forall(s0,p1))), imp(exist(s0,p0),exist(s0,p1)))
  trans(exist(s0,p0), exist(s0,p1), forall(s0,p1))
  a4(s0, p0, p1)
}
```

## `diff` 

```follow
thm nf.diff(set s0, prop p0) {
  |- nf(s0, p0)
  diff (s0, p0)
} = {
  mp(nf(s0,p0), imp(exist(s0,p0),forall(s0,p0)))
  nf.def.5(s0, p0)
  a5(s0, p0)
}
```

## `gen`

```follow
thm nf.gen(set s0, prop p0) {
  |- nf(s0, p0)
  -| p0
} = {
  mp(nf(s0,p0), forall(s0,p0))
  nf.intro.1(s0, p0)
  gen(s0, p0)
}
```

## `nf.iffnf`

```follow
thm nf.iffnf(set s0, prop p0, prop p1) {
  |- imp(forall(s0, iff(p0, p1)), iff(nf(s0,p0),nf(s0,p1)))
} = {
  iff.rw23(forall(s0,iff(p0,p1)), nf(s0,p0), nf(s0,p1), imp(exist(s0,p0),forall(s0,p0)), imp(exist(s0,p1),forall(s0,p1)))
  nf.def.5(s0, p0)
  nf.def.5(s0, p1)
  imp.iffimpd(forall(s0,iff(p0,p1)), exist(s0,p0), exist(s0,p1), forall(s0,p0), forall(s0,p1))
  a4(s0, p0, p1)
}
```

```follow
thm nf.iffnfi(set s0, prop p0, prop p1) {
  |- iff(nf(s0,p0),nf(s0,p1))
  |- iff(nf(s0,p1), nf(s0,p0))
  |- imp(nf(s0,p0),nf(s0,p1))
  |- imp(nf(s0,p1), nf(s0,p0))
  -| forall(s0, iff(p0, p1)) 
} = {
  iff.comi(nf(s0,p1), nf(s0,p0))
  iff.lefti(nf(s0,p0), nf(s0,p1))
  iff.righti(nf(s0,p0), nf(s0,p1))
  mp(iff(nf(s0,p0),nf(s0,p1)), forall(s0,iff(p0,p1)))
  nf.iffnf(s0, p0, p1)
}
```

```follow
thm nf.iffnfd(set s0, prop p0, prop p1, prop p2) {
  |- imp(p2, iff(nf(s0,p0),nf(s0,p1)))
  |- imp(p2, iff(nf(s0,p1), nf(s0,p0)))
  |- imp(p2, imp(nf(s0,p0),nf(s0,p1)))
  |- imp(p2, imp(nf(s0,p1), nf(s0,p0)))
  -| imp(p2, forall(s0, iff(p0, p1)))
} = {
  iff.comd(p2, nf(s0,p1), nf(s0,p0))
  iff.leftd(p2, nf(s0,p0), nf(s0,p1))
  iff.rightd(p2, nf(s0,p0), nf(s0,p1))
  syl(p2, iff(nf(s0,p0),nf(s0,p1)), forall(s0,iff(p0,p1)))
  nf.iffnf(s0, p0, p1)
}
```

```follow
thm nf.rw(set s0, prop p0, prop p1) {
  |- nf(s0, p0)
  -| nf(s0, p1)
  -| iff(p1, p0)
} = {
  mp(nf(s0,p0), nf(s0,p1))
  nf.iffnfi(s0, p1, p0)
  gen(s0, iff(p1,p0))
}
```

## `nf` 与 `not` 

```follow
thm nf.not(set s0, prop p0) {
  |- iff(nf(s0,p0),nf(s0,not(p0)))
  |- iff(nf(s0,not(p0)), nf(s0,p0))
  |- imp(nf(s0,p0),nf(s0,not(p0)))
  |- imp(nf(s0,not(p0)), nf(s0,p0))
} = {
  iff.comi(nf(s0,not(p0)), nf(s0,p0))
  iff.lefti(nf(s0,p0), nf(s0,not(p0)))
  iff.righti(nf(s0,p0), nf(s0,not(p0)))
  iff.syl(nf(s0,p0), nf(s0,not(p0)), or(forall(s0,p0),forall(s0,not(p0))))
  nf.def.5(s0, p0)
  iff.syl(or(forall(s0,p0),forall(s0,not(p0))), nf(s0,not(p0)), or(forall(s0,not(p0)),forall(s0,not(not(p0)))))
  nf.def.5(s0, not(p0))
  iff.syl(or(forall(s0,p0),forall(s0,not(p0))), or(forall(s0,not(p0)),forall(s0,not(not(p0)))), or(forall(s0,not(p0)),forall(s0,p0)))
  iff.or.com(forall(s0,p0), forall(s0,not(p0)))
  or.ifforii(forall(s0,not(p0)), forall(s0,not(p0)), forall(s0,p0), forall(s0,not(not(p0))))
  iff.id(forall(s0,not(p0)))
  mp(iff(forall(s0,p0),forall(s0,not(not(p0)))), forall(s0,iff(p0,not(not(p0)))))
  a4(s0, p0, not(not(p0)))
  gen(s0, iff(p0,not(not(p0))))
  iff.notnot(p0)
}
```

```follow
thm nf.noti(set s0, prop p0) {
  |- nf(s0, not(p0))
  -| nf(s0, p0)
} = {
  mp(nf(s0,not(p0)), nf(s0,p0))
  nf.not(s0, p0)
}
```

```follow
thm nf.notd(set s0, prop p0, prop p1) {
  |- imp(p1, nf(s0, not(p0)))
  -| imp(p1, nf(s0, p0))
} = {
  syl(p1, nf(s0,not(p0)), nf(s0,p0))
  nf.not(s0, p0)
}
```

```follow
thm nf.imp(set s0, prop p0, prop p1) {
  |- imp(and(nf(s0, p0), nf(s0,p1)), nf(s0, imp(p0, p1)))
} = {
  syl(and(nf(s0,p0),nf(s0,p1)), nf(s0,imp(p0,p1)), imp(exist(s0,imp(p0,p1)),forall(s0,imp(p0,p1))))
  nf.def.5(s0, imp(p0,p1))
  rw23(and(nf(s0,p0),nf(s0,p1)), exist(s0,imp(p0,p1)), forall(s0,imp(p0,p1)), imp(forall(s0,p0),exist(s0,p1)), imp(exist(s0,p0),forall(s0,p1)))
  a4(s0, p0, p1)
  and.impoi(nf(s0,p0), nf(s0,p1), imp(imp(forall(s0,p0),exist(s0,p1)),imp(exist(s0,p0),forall(s0,p1))))
  rw2(nf(s0,p0), nf(s0,p1), imp(imp(forall(s0,p0),exist(s0,p1)),imp(exist(s0,p0),forall(s0,p1))), imp(exist(s0,p1),forall(s0,p1)))
  nf.def.5(s0, p1)
  syl(nf(s0,p0), imp(imp(exist(s0,p1),forall(s0,p1)),imp(imp(forall(s0,p0),exist(s0,p1)),imp(exist(s0,p0),forall(s0,p1)))), imp(exist(s0,p0),forall(s0,p0)))
  trans4(exist(s0,p0), forall(s0,p0), exist(s0,p1), forall(s0,p1))
  nf.def.5(s0, p0)
}
```

```follow
thm nf.impii(set s0, prop p0, prop p1) {
  |- nf(s0, imp(p0, p1))
  -| nf(s0, p0)
  -| nf(s0, p1) 
} = {
  mp(nf(s0,imp(p0,p1)), and(nf(s0,p0),nf(s0,p1)))
  nf.imp(s0, p0, p1)
  and.introii(nf(s0,p0), nf(s0,p1))
}
```

```follow
thm nf.impd(set s0, prop p0, prop p1, prop p2) {
  |- imp(p2, nf(s0, imp(p0, p1)))
  -| imp(p2, nf(s0, p0))
  -| imp(p2, nf(s0,p1))
} = {
  syl(p2, nf(s0,imp(p0,p1)), and(nf(s0,p0),nf(s0,p1)))
  nf.imp(s0, p0, p1)
  and.introd(p2, nf(s0,p0), nf(s0,p1))
}
```

```follow
thm nf.and(set s0, prop p0, prop p1) {
  |- imp(and(nf(s0, p0), nf(s0,p1)), nf(s0, and(p0, p1)))
} = {
  syl(and(nf(s0,p0),nf(s0,p1)), nf(s0,and(p0,p1)), nf(s0,not(imp(p0,not(p1)))))
  nf.iffnfi(s0, and(p0,p1), not(imp(p0,not(p1))))
  gen(s0, iff(and(p0,p1),not(imp(p0,not(p1)))))
  iff.and.def(p0, p1)
  syl(and(nf(s0,p0),nf(s0,p1)), nf(s0,not(imp(p0,not(p1)))), nf(s0,imp(p0,not(p1))))
  nf.not(s0, imp(p0,not(p1)))
  syl(and(nf(s0,p0),nf(s0,p1)), nf(s0,imp(p0,not(p1))), and(nf(s0,p0),nf(s0,not(p1))))
  nf.imp(s0, p0, not(p1))
  and.2andii(nf(s0,p0), nf(s0,p0), nf(s0,p1), nf(s0,not(p1)))
  id(nf(s0,p0))
  nf.not(s0, p1)
}
```

```follow
thm nf.andi(set s0, prop p0, prop p1) {
  |- nf(s0, and(p0, p1))
  -| nf(s0, p0)
  -| nf(s0, p1) 
} = {
  mp(nf(s0,and(p0,p1)), and(nf(s0,p0),nf(s0,p1)))
  nf.and(s0, p0, p1)
  and.introii(nf(s0,p0), nf(s0,p1))
}
```

```follow
thm nf.andd(set s0, prop p0, prop p1, prop p2) {
  |- imp(p2, nf(s0, and(p0, p1)))
  -| imp(p2, nf(s0, p0))
  -| imp(p2, nf(s0,p1))
} = {
  syl(p2, nf(s0,and(p0,p1)), and(nf(s0,p0),nf(s0,p1)))
  nf.and(s0, p0, p1)
  and.introd(p2, nf(s0,p0), nf(s0,p1))
}
```

## `nf` 与 `or`

```follow
thm nf.or(set s0, prop p0, prop p1) {
  |- imp(and(nf(s0, p0), nf(s0,p1)), nf(s0, or(p0, p1)))
} = {
  syl(and(nf(s0,p0),nf(s0,p1)), nf(s0,or(p0,p1)), nf(s0,imp(not(p0),p1)))
  nf.iffnfi(s0, or(p0,p1), imp(not(p0),p1))
  gen(s0, iff(or(p0,p1),imp(not(p0),p1)))
  iff.or.def(p0, p1)
  syl(and(nf(s0,p0),nf(s0,p1)), nf(s0,imp(not(p0),p1)), and(nf(s0,not(p0)),nf(s0,p1)))
  nf.imp(s0, not(p0), p1)
  and.2andii(nf(s0,p0), nf(s0,not(p0)), nf(s0,p1), nf(s0,p1))
  nf.not(s0, p0)
  id(nf(s0,p1))
}
```

```follow
thm nf.ori(set s0, prop p0, prop p1) {
  |- nf(s0, or(p0, p1))
  -| nf(s0, p0)
  -| nf(s0, p1) 
} = {
  mp(nf(s0,or(p0,p1)), and(nf(s0,p0),nf(s0,p1)))
  nf.or(s0, p0, p1)
  and.introii(nf(s0,p0), nf(s0,p1))
}
```

```follow
thm nf.ord(set s0, prop p0, prop p1, prop p2) {
  |- imp(p2, nf(s0, or(p0, p1)))
  -| imp(p2, nf(s0, p0))
  -| imp(p2, nf(s0, p1))
} = {
  syl(p2, nf(s0,or(p0,p1)), and(nf(s0,p0),nf(s0,p1)))
  nf.or(s0, p0, p1)
  and.introd(p2, nf(s0,p0), nf(s0,p1))
}
```

## `nf` 与 `iff` 

```follow
thm nf.iff(set s0, prop p0, prop p1) {
  |- imp(and(nf(s0, p0), nf(s0,p1)), nf(s0, iff(p0, p1)))
} = {
  syl(and(nf(s0,p0),nf(s0,p1)), nf(s0,iff(p0,p1)), nf(s0,and(imp(p0,p1),imp(p1,p0))))
  nf.iffnfi(s0, and(imp(p0,p1),imp(p1,p0)), iff(p0,p1))
  gen(s0, iff(and(imp(p0,p1),imp(p1,p0)),iff(p0,p1)))
  iff.iff.def(p0, p1)
  syl(and(nf(s0,p0),nf(s0,p1)), nf(s0,and(imp(p0,p1),imp(p1,p0))), and(nf(s0,imp(p0,p1)),nf(s0,imp(p1,p0))))
  nf.and(s0, imp(p0,p1), imp(p1,p0))
  and.introd(and(nf(s0,p0),nf(s0,p1)), nf(s0,imp(p0,p1)), nf(s0,imp(p1,p0)))
  nf.imp(s0, p0, p1)
  syl(and(nf(s0,p0),nf(s0,p1)), nf(s0,imp(p1,p0)), and(nf(s0,p1),nf(s0,p0)))
  nf.imp(s0, p1, p0)
  and.com(nf(s0,p0), nf(s0,p1))
}
```

```follow
thm nf.iffii(set s0, prop p0, prop p1) {
  |- nf(s0, iff(p0, p1))
  -| nf(s0, p0)
  -| nf(s0, p1)
} = {
  mp(nf(s0,iff(p0,p1)), and(nf(s0,p0),nf(s0,p1)))
  nf.iff(s0, p0, p1)
  and.introii(nf(s0,p0), nf(s0,p1))
}
```

```follow
thm nf.iffd(set s0, prop p0, prop p1, prop p2) {
  |- imp(p2, nf(s0, iff(p0, p1)))
  -| imp(p2, nf(s0, p0))
  -| imp(p2, nf(s0, p1))
} = {
  syl(p2, nf(s0,iff(p0,p1)), and(nf(s0,p0),nf(s0,p1)))
  nf.iff(s0, p0, p1)
  and.introd(p2, nf(s0,p0), nf(s0,p1))
}
```

## `nf` 与 `eq`

```follow
thm nf.eqid(set s0, set s1) {
  |- nf(s0, eq(c(s1), c(s1)))
} = {
  nf.gen(s0, eq(c(s1),c(s1)))
  eq.id(s1)
}
```


