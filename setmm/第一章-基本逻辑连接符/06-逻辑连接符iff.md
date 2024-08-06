
# 逻辑连接符`iff` 

```follow
term prop iff(prop p0, prop p1) { (p0 ↔ p1) }
axiom iff.def(prop p0, prop p1) {
  |- imp(iff(p0, p1), and(imp(p0, p1), imp(p1, p0)))
  |- imp(and(imp(p0, p1), imp(p1, p0)), iff(p0, p1))
}
```

## 性质

```follow
thm iff.left(prop p0, prop p1) {
  |- imp(iff(p0, p1), imp(p0, p1))
} = {
  syl(iff(p0,p1), imp(p0,p1), and(imp(p0,p1),imp(p1,p0)))
  iff.def(p0, p1)
  and.left(imp(p0,p1), imp(p1,p0))
}
```

```follow
thm iff.lefti(prop p0, prop p1) {
  |- imp(p0, p1)
  -| iff(p0, p1)
} = {
  mp(imp(p0,p1), iff(p0,p1))
  iff.left(p0, p1)
}
```

```follow
thm iff.leftd(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(p1, p2))
  -| imp(p0, iff(p1, p2))
} = {
  syl(p0, imp(p1,p2), iff(p1,p2))
  iff.left(p1, p2)
}
```

```follow
thm iff.right(prop p0, prop p1) {
  |- imp(iff(p0, p1), imp(p1, p0))
} = {
  syl(iff(p0,p1), imp(p1,p0), and(imp(p0,p1),imp(p1,p0)))
  iff.def(p0, p1)
  and.right(imp(p0,p1), imp(p1,p0))
}
```

```follow
thm iff.righti(prop p0, prop p1) {
  |- imp(p1, p0)
  -| iff(p0, p1)
} = {
  mp(imp(p1,p0), iff(p0,p1))
  iff.right(p0, p1)
}
```

```follow
thm iff.rightd(prop p0, prop p1, prop p2) {
  |- imp(p0, imp(p2, p1))
  -| imp(p0, iff(p1, p2))
} = {
  syl(p0, imp(p2,p1), iff(p1,p2))
  iff.right(p1, p2)
}
```

```follow
thm iff.intro(prop p0, prop p1) {
  |- imp(imp(p0, p1), imp(imp(p1, p0), iff(p0, p1)))
} = {
  rw3(imp(p0,p1), imp(p1,p0), iff(p0,p1), and(imp(p0,p1),imp(p1,p0)))
  iff.def(p0, p1)
  and.intro(imp(p0,p1), imp(p1,p0))
}
```

```follow
thm iff.introii(prop p0, prop p1) {
  |- iff(p0, p1)
  -| imp(p0, p1)
  -| imp(p1, p0)
} = {
  mp(iff(p0,p1), imp(p1,p0))
  mp(imp(imp(p1,p0),iff(p0,p1)), imp(p0,p1))
  iff.intro(p0, p1)
}
```

```follow
thm iff.introd(prop p0, prop p1, prop p2) {
  |- imp(p0, iff(p1, p2))
  -| imp(p0, imp(p1, p2))
  -| imp(p0, imp(p2, p1))
} = {
  a2ii(p0, iff(p1,p2), imp(p2,p1))
  syl(p0, imp(imp(p2,p1),iff(p1,p2)), imp(p1,p2))
  iff.intro(p1, p2)
}
```

```follow
thm iff.com(prop p0, prop p1) {
  |- imp(iff(p0, p1), iff(p1, p0))
} = {
  syl(iff(p0,p1), iff(p1,p0), and(imp(p0,p1),imp(p1,p0)))
  iff.def(p0, p1)
  syl(and(imp(p0,p1),imp(p1,p0)), iff(p1,p0), and(imp(p1,p0),imp(p0,p1)))
  iff.def(p1, p0)
  and.com(imp(p0,p1), imp(p1,p0))
}
```

```follow
thm iff.comi(prop p0, prop p1) {
  |- iff(p0, p1)
  -| iff(p1, p0)
} = {
  mp(iff(p0,p1), iff(p1,p0))
  iff.com(p1, p0)
}
```

```follow
thm iff.comd(prop p0, prop p1, prop p2) {
  |- imp(p0, iff(p1, p2))
  -| imp(p0, iff(p2, p1))
} = {
  syl(p0, iff(p1,p2), iff(p2,p1))
  iff.com(p2, p1)
}
```

```follow
thm iff.id(prop p0) {
  |- iff(p0, p0)
} = {
  iff.introii(p0, p0)
  id(p0)
}
```

```follow
thm iff.idd(prop p0, prop p1) {
  |- imp(p0, iff(p1, p1))
} = {
  a1i(p0, iff(p1,p1))
  iff.id(p1)
}
```

```follow
thm iff.intro2(prop p0, prop p1) {
  |- imp(p0, imp(p1, iff(p0, p1)))
} = {
  and.expoi(p0, p1, iff(p0,p1))
  iff.introd(and(p0,p1), p0, p1)
  syl(and(p0,p1), imp(p0,p1), p1)
  a1(p1, p0)
  and.right(p0, p1)
  syl(and(p0,p1), imp(p1,p0), p0)
  a1(p0, p1)
  and.left(p0, p1)
}
```

## 传递性 Transition

```follow
thm iff.trans.1(prop p0, prop p1, prop p2) {
  |- imp(iff(p0, p1), imp(iff(p1, p2), iff(p0, p2)))
} = {
  rw23(iff(p0,p1), iff(p1,p2), iff(p0,p2), and(imp(p1,p2),imp(p2,p1)), and(imp(p0,p2),imp(p2,p0)))
  iff.def(p0, p2)
  iff.def(p1, p2)
  and.2andd(iff(p0,p1), imp(p1,p2), imp(p2,p1), imp(p0,p2), imp(p2,p0))
  syl(iff(p0,p1), imp(imp(p1,p2),imp(p0,p2)), imp(p0,p1))
  trans(p0, p1, p2)
  iff.left(p0, p1)
  syl(iff(p0,p1), imp(imp(p2,p1),imp(p2,p0)), imp(p1,p0))
  trans(p2, p1, p0)
  iff.right(p0, p1)
}
```

```follow
thm iff.trans.2(prop p0, prop p1, prop p2) {
  |- imp(iff(p0, p1), imp(iff(p2, p1), iff(p0, p2)))
} = {
  rw2(iff(p0,p1), iff(p2,p1), iff(p0,p2), iff(p1,p2))
  iff.com(p2, p1)
  iff.trans.1(p0, p1, p2)
}
```

```follow
thm iff.trans.3(prop p0, prop p1, prop p2) {
  |- imp(iff(p0, p1), imp(iff(p1, p2), iff(p2, p0)))
} = {
  rw3(iff(p0,p1), iff(p1,p2), iff(p2,p0), iff(p0,p2))
  iff.com(p0, p2)
  iff.trans.1(p0, p1, p2)
}
```

```follow
thm iff.trans.4(prop p0, prop p1, prop p2) {
  |- imp(iff(p0, p1), imp(iff(p2, p1), iff(p2, p0)))
} = {
  rw23(iff(p0,p1), iff(p2,p1), iff(p2,p0), iff(p1,p2), iff(p0,p2))
  iff.com(p0, p2)
  iff.com(p2, p1)
  iff.trans.1(p0, p1, p2)
}
```

```follow
thm iff.trans.5(prop p0, prop p1, prop p2) {
  |- imp(iff(p1, p2), imp(iff(p0, p1), iff(p0, p2)))
} = {
  com12i(iff(p1,p2), iff(p0,p1), iff(p0,p2))
  iff.trans.1(p0, p1, p2)
}
```

```follow
thm iff.trans.6(prop p0, prop p1, prop p2) {
  |- imp(iff(p1, p2), imp(iff(p1, p0), iff(p0, p2)))
} = {
  rw2(iff(p1,p2), iff(p1,p0), iff(p0,p2), iff(p0,p1))
  iff.com(p1, p0)
  iff.trans.5(p0, p1, p2)
}
```

```follow
thm iff.trans.7(prop p0, prop p1, prop p2) {
  |- imp(iff(p1, p2), imp(iff(p0, p1), iff(p2, p0)))
} = {
  rw3(iff(p1,p2), iff(p0,p1), iff(p2,p0), iff(p0,p2))
  iff.com(p0, p2)
  iff.trans.5(p0, p1, p2)
}
```

```follow
thm iff.trans.8(prop p0, prop p1, prop p2) {
  |- imp(iff(p1, p2), imp(iff(p1, p0), iff(p2, p0)))
} = {
  rw23(iff(p1,p2), iff(p1,p0), iff(p2,p0), iff(p0,p1), iff(p0,p2))
  iff.com(p0, p2)
  iff.com(p1, p0)
  iff.trans.5(p0, p1, p2)
}
```

```follow
thm iff.trans(prop p0, prop p1, prop p2) {
  |- imp(iff(p0,p1), imp(iff(p0,p2), iff(p1,p2)))
  |- imp(iff(p0,p1), imp(iff(p0,p2), iff(p2,p1)))
  |- imp(iff(p0,p1), imp(iff(p2,p0), iff(p1,p2)))
  |- imp(iff(p0,p1), imp(iff(p2,p0), iff(p2,p1)))
  |- imp(iff(p0,p1), imp(iff(p1,p2), iff(p0,p2)))
  |- imp(iff(p0,p1), imp(iff(p1,p2), iff(p2,p0)))
  |- imp(iff(p0,p1), imp(iff(p2,p1), iff(p0,p2)))
  |- imp(iff(p0,p1), imp(iff(p2,p1), iff(p2,p0)))
} = {
  iff.trans.1(p0, p1, p2)
  iff.trans.2(p0, p1, p2)
  iff.trans.3(p0, p1, p2)
  iff.trans.4(p0, p1, p2)
  iff.trans.5(p2, p0, p1)
  iff.trans.6(p2, p0, p1)
  iff.trans.7(p2, p0, p1)
  iff.trans.8(p2, p0, p1)
}
```

## 非常有用的定理

```follow
thm iff.syl(prop p0, prop p1, prop p2) {
  |- iff(p0, p1)
  -| iff(p0, p2)
  -| iff(p2, p1)
} = {
  mp(iff(p0,p1), iff(p2,p1))
  mp(imp(iff(p2,p1),iff(p0,p1)), iff(p0,p2))
  iff.trans.1(p0, p2, p1)
}
```

```follow
thm iff.syld(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, iff(p1, p2))
  -| imp(p0, iff(p1, p3))
  -| imp(p0, iff(p3, p2))
} = {
  a2ii(p0, iff(p1,p2), iff(p3,p2))
  syl(p0, imp(iff(p3,p2),iff(p1,p2)), iff(p1,p3))
  iff.trans.1(p1, p3, p2)
}
```

```follow
thm iff.rw2(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, iff(p1, p2))
  -| imp(p0, iff(p3, p2))
  -| iff(p3, p1)
} = {
  syl(p0, iff(p1,p2), iff(p3,p2))
  mp(imp(iff(p3,p2),iff(p1,p2)), iff(p3,p1))
  iff.trans(p3, p1, p2)
}
```

```follow
thm iff.rw3(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, iff(p1, p2))
  -| imp(p0, iff(p1, p3))
  -| iff(p3, p2)
} = {
  syl(p0, iff(p1,p2), iff(p1,p3))
  mp(imp(iff(p1,p3),iff(p1,p2)), iff(p3,p2))
  iff.trans(p3, p2, p1)
}
```

```follow
thm iff.idi(prop p0, prop p1) {
  |- imp(p0, p1)
  -| imp(p0, iff(p1, p0))
} = {
  iid(p0, p1)
  iff.rightd(p0, p1, p0)
}
```

## 包含 `iff` 的 `a2` 

```follow
thm iff.a2(prop p0, prop p1, prop p2) {
  |- imp(imp(p0, iff(p1, p2)), iff(imp(p0, p1), imp(p0, p2)))
} = {
  iff.introd(imp(p0,iff(p1,p2)), imp(p0,p1), imp(p0,p2))
  syl(imp(p0,iff(p1,p2)), imp(imp(p0,p1),imp(p0,p2)), imp(p0,imp(p1,p2)))
  a2(p0, p1, p2)
  a2i(p0, iff(p1,p2), imp(p1,p2))
  a1i(p0, imp(iff(p1,p2),imp(p1,p2)))
  iff.left(p1, p2)
  syl(imp(p0,iff(p1,p2)), imp(imp(p0,p2),imp(p0,p1)), imp(p0,imp(p2,p1)))
  a2(p0, p2, p1)
  a2i(p0, iff(p1,p2), imp(p2,p1))
  a1i(p0, imp(iff(p1,p2),imp(p2,p1)))
  iff.right(p1, p2)
}
```

```follow
thm iff.a2i(prop p0, prop p1, prop p2) {
  |- iff(imp(p0, p1), imp(p0, p2))
  -| imp(p0, iff(p1, p2))
} = {
  mp(iff(imp(p0,p1),imp(p0,p2)), imp(p0,iff(p1,p2)))
  iff.a2(p0, p1, p2)
}
```

```follow
thm iff.a2d(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, iff(imp(p1, p2), imp(p1, p3)))
  -| imp(p0, imp(p1, iff(p2, p3)))
} = {
  syl(p0, iff(imp(p1,p2),imp(p1,p3)), imp(p1,iff(p2,p3)))
  iff.a2(p1, p2, p3)
}
```


## `iff` 和 `imp` 的分配律 

```follow
thm imp.iffimp(prop p0, prop p1, prop p2, prop p3) {
  |- imp(iff(p0, p1), imp(iff(p2, p3), iff(imp(p0, p2), imp(p1, p3))))
} = {
  and.expoi(iff(p0,p1), iff(p2,p3), iff(imp(p0,p2),imp(p1,p3)))
  iff.introd(and(iff(p0,p1),iff(p2,p3)), imp(p0,p2), imp(p1,p3))
  and.impoi(iff(p0,p1), iff(p2,p3), imp(imp(p0,p2),imp(p1,p3)))
  rw12(iff(p0,p1), iff(p2,p3), imp(imp(p0,p2),imp(p1,p3)), imp(p1,p0), imp(p2,p3))
  trans4(p1, p0, p2, p3)
  iff.right(p0, p1)
  iff.left(p2, p3)
  and.impoi(iff(p0,p1), iff(p2,p3), imp(imp(p1,p3),imp(p0,p2)))
  rw12(iff(p0,p1), iff(p2,p3), imp(imp(p1,p3),imp(p0,p2)), imp(p0,p1), imp(p3,p2))
  trans4(p0, p1, p3, p2)
  iff.left(p0, p1)
  iff.right(p2, p3)
}
```

```follow
thm imp.iffimpii(prop p0, prop p1, prop p2, prop p3) {
  |- iff(imp(p0, p2), imp(p1, p3))
  -| iff(p0, p1)
  -| iff(p2, p3)
} = {
  mp(iff(imp(p0,p2),imp(p1,p3)), iff(p2,p3))
  mp(imp(iff(p2,p3),iff(imp(p0,p2),imp(p1,p3))), iff(p0,p1))
  imp.iffimp(p0, p1, p2, p3)
}
```

```follow
thm imp.iffimpd(prop p0, prop p1, prop p2, prop p3, prop p4) {
  |- imp(p0, iff(imp(p1, p3), imp(p2, p4)))
  -| imp(p0, iff(p1, p2))
  -| imp(p0, iff(p3, p4))
} = {
  a2ii(p0, iff(imp(p1,p3),imp(p2,p4)), iff(p3,p4))
  syl(p0, imp(iff(p3,p4),iff(imp(p1,p3),imp(p2,p4))), iff(p1,p2))
  imp.iffimp(p1, p2, p3, p4)
}
```

```follow
thm imp.iffimp.left(prop p0, prop p1, prop p2) {
  |- imp(iff(p1, p2), iff(imp(p0, p1), imp(p0, p2)))
} = {
  mp(imp(iff(p1,p2),iff(imp(p0,p1),imp(p0,p2))), iff(p0,p0))
  imp.iffimp(p0, p0, p1, p2)
  iff.id(p0)
}
```

```follow
thm imp.iffimp.lefti(prop p0, prop p1, prop p2) {
  |- iff(imp(p0, p1), imp(p0, p2))
  -| iff(p1, p2)
} = {
  mp(iff(imp(p0,p1),imp(p0,p2)), iff(p1,p2))
  imp.iffimp.left(p0, p1, p2)
}
```

```follow
thm imp.iffimp.leftd(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, iff(imp(p1, p2), imp(p1, p3)))
  -| imp(p0, iff(p2, p3))
} = {
  syl(p0, iff(imp(p1,p2),imp(p1,p3)), iff(p2,p3))
  imp.iffimp.left(p1, p2, p3)
}
```

```follow
thm imp.iffimp.right(prop p0, prop p1, prop p2) {
  |- imp(iff(p1, p2), iff(imp(p1, p0), imp(p2, p0)))
} = {
  mp(imp(iff(p1,p2),iff(imp(p1,p0),imp(p2,p0))), iff(p0,p0))
  com12i(iff(p0,p0), iff(p1,p2), iff(imp(p1,p0),imp(p2,p0)))
  imp.iffimp(p1, p2, p0, p0)
  iff.id(p0)
}
```

```follow
thm imp.iffimp.righti(prop p0, prop p1, prop p2) {
  |- iff(imp(p1, p0), imp(p2, p0))
  -| iff(p1, p2) 
} = {
  mp(iff(imp(p1,p0),imp(p2,p0)), iff(p1,p2))
  imp.iffimp.right(p0, p1, p2)
}
```

```follow
thm imp.iffimp.rightd(prop p0, prop p1, prop p2, prop p3) {
  |- imp(p0, iff(imp(p2, p1), imp(p3, p1)))
  -| imp(p0, iff(p2, p3))
} = {
  syl(p0, iff(imp(p2,p1),imp(p3,p1)), iff(p2,p3))
  imp.iffimp.right(p1, p2, p3)
}
```

## `and.iffand`

```follow
thm and.iffand(prop p0, prop p1, prop p2, prop p3) {
  |- imp(iff(p0,p1), imp(iff(p2,p3), iff(and(p0,p2), and(p1,p3))))
} = {
  and.expoi(iff(p0,p1), iff(p2,p3), iff(and(p0,p2),and(p1,p3)))
  iff.introd(and(iff(p0,p1),iff(p2,p3)), and(p0,p2), and(p1,p3))
  and.impoi(iff(p0,p1), iff(p2,p3), imp(and(p0,p2),and(p1,p3)))
  rw12(iff(p0,p1), iff(p2,p3), imp(and(p0,p2),and(p1,p3)), imp(p0,p1), imp(p2,p3))
  and.2and(p0, p1, p2, p3)
  iff.left(p0, p1)
  iff.left(p2, p3)
  and.impoi(iff(p0,p1), iff(p2,p3), imp(and(p1,p3),and(p0,p2)))
  rw12(iff(p0,p1), iff(p2,p3), imp(and(p1,p3),and(p0,p2)), imp(p1,p0), imp(p3,p2))
  and.2and(p1, p0, p3, p2)
  iff.right(p0, p1)
  iff.right(p2, p3)
}
```

```follow
thm and.iffandii(prop p0, prop p1, prop p2, prop p3) {
  |- iff(and(p0, p1), and(p2, p3))
  -| iff(p0, p2)
  -| iff(p1, p3)
} = {
  mp(iff(and(p0,p1),and(p2,p3)), iff(p1,p3))
  mp(imp(iff(p1,p3),iff(and(p0,p1),and(p2,p3))), iff(p0,p2))
  and.iffand(p0, p2, p1, p3)
}
```

```follow
thm and.iffandd(prop p0, prop p1, prop p2, prop p3, prop p4) {
  |- imp(p0, iff(and(p1, p2), and(p3, p4)))
  -| imp(p0, iff(p1, p3))
  -| imp(p0, iff(p2, p4))
} = {
  a2ii(p0, iff(and(p1,p2),and(p3,p4)), iff(p2,p4))
  syl(p0, imp(iff(p2,p4),iff(and(p1,p2),and(p3,p4))), iff(p1,p3))
  and.iffand(p1, p3, p2, p4)
}
```

## `or.iffor`

```follow
thm or.iffor(prop p0, prop p1, prop p2, prop p3) {
  |- imp(iff(p0, p1), imp(iff(p2, p3), iff(or(p0, p2), or(p1, p3))))
} = {
  and.expoi(iff(p0,p1), iff(p2,p3), iff(or(p0,p2),or(p1,p3)))
  iff.introd(and(iff(p0,p1),iff(p2,p3)), or(p0,p2), or(p1,p3))
  and.impoi(iff(p0,p1), iff(p2,p3), imp(or(p0,p2),or(p1,p3)))
  rw12(iff(p0,p1), iff(p2,p3), imp(or(p0,p2),or(p1,p3)), imp(p0,p1), imp(p2,p3))
  or.2or(p0, p1, p2, p3)
  iff.left(p0, p1)
  iff.left(p2, p3)
  and.impoi(iff(p0,p1), iff(p2,p3), imp(or(p1,p3),or(p0,p2)))
  rw12(iff(p0,p1), iff(p2,p3), imp(or(p1,p3),or(p0,p2)), imp(p1,p0), imp(p3,p2))
  or.2or(p1, p0, p3, p2)
  iff.right(p0, p1)
  iff.right(p2, p3)
}
```

```follow
thm or.ifforii(prop p0, prop p1, prop p2, prop p3) {
  |- iff(or(p0, p2), or(p1, p3))
  -| iff(p0, p1)
  -| iff(p2, p3)
} = {
  mp(iff(or(p0,p2),or(p1,p3)), iff(p2,p3))
  mp(imp(iff(p2,p3),iff(or(p0,p2),or(p1,p3))), iff(p0,p1))
  or.iffor(p0, p1, p2, p3)
}
```

```follow
thm or.ifford(prop p0, prop p1, prop p2, prop p3, prop p4) {
  |- imp(p0, iff(or(p1, p2), or(p3, p4)))
  -| imp(p0, iff(p1, p3))
  -| imp(p0, iff(p2, p4))
} = {
  a2ii(p0, iff(or(p1,p2),or(p3,p4)), iff(p2,p4))
  syl(p0, imp(iff(p2,p4),iff(or(p1,p2),or(p3,p4))), iff(p1,p3))
  or.iffor(p1, p3, p2, p4)
}
```

## 补充前面的定义

```follow
thm iff.and.def(prop p0, prop p1) {
  |- iff(and(p0, p1), not(imp(p0, not(p1))))
  |- iff(not(imp(p0, not(p1))), and(p0, p1))
  |- imp(and(p0, p1), not(imp(p0, not(p1))))
  |- imp(not(imp(p0, not(p1))), and(p0, p1))
} = {
  iff.introii(and(p0,p1), not(imp(p0,not(p1))))
  iff.introii(not(imp(p0,not(p1))), and(p0,p1))
  and.def(p0, p1)
}
```

```follow
thm iff.and.com(prop p0, prop p1) {
  |- iff(and(p0, p1), and(p1, p0))
} = {
  iff.introii(and(p0,p1), and(p1,p0))
  and.com(p0, p1)
  and.com(p1, p0)
}
```

```follow
thm iff.or.def(prop p0, prop p1) {
  |- iff(or(p0, p1), imp(not(p0), p1))
  |- iff(imp(not(p0), p1), or(p0, p1))
  |- imp(or(p0, p1), imp(not(p0), p1))
  |- imp(imp(not(p0), p1), or(p0, p1))
} = {
  iff.introii(or(p0,p1), imp(not(p0),p1))
  iff.introii(imp(not(p0),p1), or(p0,p1))
  or.def(p0, p1)
}
```

```follow
thm iff.or.com(prop p0, prop p1) {
  |- iff(or(p0, p1), or(p1, p0))
} = {
  iff.introii(or(p0,p1), or(p1,p0))
  or.com(p0, p1)
  or.com(p1, p0)
}
```

## `iff` 和 `not` 

```follow
thm iff.notnot(prop p0) {
  |- iff(p0, not(not(p0)))
  |- iff(not(not(p0)), p0)
  |- imp(p0, not(not(p0)))
  |- imp(not(not(p0)), p0)
} = {
  iff.introii(p0, not(not(p0)))
  iff.introii(not(not(p0)), p0)
  notnot(p0)
}
```

```follow
thm iff.con(prop p0, prop p1) {
  // 第一组
  |- iff(imp(p0, not(p1)), imp(p1, not(p0)))
  |- iff(imp(not(p0), p1), imp(not(p1), p0))
  |- iff(imp(p0, p1), imp(not(p1), not(p0)))
  |- iff(imp(not(p0), not(p1)), imp(p1, p0))

  // 第二组
  |- imp(iff(p0, not(p1)), iff(p1, not(p0)))
  |- imp(iff(not(p0), p1), iff(not(p1), p0))
  |- imp(iff(p0, p1), iff(not(p1), not(p0)))
  |- imp(iff(not(p0), not(p1)), iff(p1, p0))

  // 第三组
  |- imp(iff(p0, not(p1)), iff(not(p0), p1))
  |- imp(iff(not(p0), p1), iff(p0, not(p1)))
  |- imp(iff(p0, p1), iff(not(p0), not(p1)))
  |- imp(iff(not(p0), not(p1)), iff(p0, p1))

  // 第四组
  |- imp(imp(p0, not(p1)), imp(p1, not(p0)))
  |- imp(imp(not(p0), p1), imp(not(p1), p0))
  |- imp(imp(p0, p1), imp(not(p1), not(p0)))
  |- imp(imp(not(p0), not(p1)), imp(p1, p0))
} = {
  iff.comd(iff(p0,not(p1)), not(p0), p1)
  iff.comd(iff(not(p0),p1), p0, not(p1))
  iff.comd(iff(p0,p1), not(p0), not(p1))
  iff.comd(iff(not(p0),not(p1)), p0, p1)

  iff.introii(imp(p0,not(p1)), imp(p1,not(p0)))
  iff.introii(imp(not(p0),p1), imp(not(p1),p0))
  iff.introii(imp(not(p0),not(p1)), imp(p1,p0))
  iff.introii(imp(p0,p1), imp(not(p1),not(p0)))

  iff.introd(iff(p0,not(p1)), p1, not(p0))
  iff.introd(iff(not(p0),p1), not(p1), p0)
  iff.introd(iff(p0,p1), not(p1), not(p0))
  iff.introd(iff(not(p0),not(p1)), p1, p0)

  syl(iff(not(p0),not(p1)), imp(p1,p0), imp(not(p0),not(p1)))
  iff.left(not(p0), not(p1))
  syl(iff(not(p0),not(p1)), imp(p0,p1), imp(not(p1),not(p0)))
  iff.right(not(p0), not(p1))
  syl(iff(p0,p1), imp(not(p1),not(p0)), imp(p0,p1))
  iff.left(p0, p1)
  syl(iff(p0,p1), imp(not(p0),not(p1)), imp(p1,p0))
  iff.right(p0, p1)
  syl(iff(not(p0),p1), imp(not(p1),p0), imp(not(p0),p1))
  iff.left(not(p0), p1)
  syl(iff(not(p0),p1), imp(p0,not(p1)), imp(p1,not(p0)))
  iff.right(not(p0), p1)
  syl(iff(p0,not(p1)), imp(p1,not(p0)), imp(p0,not(p1)))
  iff.left(p0, not(p1))
  syl(iff(p0,not(p1)), imp(not(p0),p1), imp(not(p1),p0))
  iff.right(p0, not(p1))
  con(p1, p0)
  con(p0, p1)
}
```