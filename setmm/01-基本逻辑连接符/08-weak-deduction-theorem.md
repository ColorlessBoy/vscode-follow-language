# Weak Deduction Theorem

`Weak Deduction Theorem` 是为了更方便的从 `-| Assumption |- Target` 结构转化为 `Assumption -> Target`。 很多情况下，前一种形式非常好证明，可以用 `Weak Deduction Theorem` 作为桥梁，证明后一种形式。
这个定理的难点在于怎么使用 `Weak Deduction Theorem`。

这个定理非常不直观，隐藏着一个部分替换。这步部分替换需要我们手工完成。

```follow
thm deduction(prop assume, prop target, prop p2, prop p3, prop target[p2->if]) {
  |- imp(assume, target)
  -| imp(iff(if(assume, p2, p3), p2), iff(target[p2->if], target))
  -| target[p2->if]
} = {
  syl(assume, target, iff(if(assume,p2,p3),p2))
  if.true(assume, p2, p3)
  syl(iff(if(assume,p2,p3),p2), target, iff(target[p2->if],target))
  syl(iff(target[p2->if],target), target, imp(target[p2->if],target))
  iff.left(target[p2->if], target)
  mp(imp(imp(target[p2->if],target),target), target[p2->if])
  iidd(target[p2->if], target)
}
```

```follow
thm elimination(prop assume[p2->if], prop assume, prop p2, prop p3, prop assume[p2->p3]) {
  |- assume[p2->if] 
  -| imp(iff(if(assume, p2, p3), p2), iff(assume[p2->if], assume))
  -| imp(iff(if(assume, p2, p3), p3), iff(assume[p2->if], assume[p2->p3]))
  -| assume[p2->p3]
} = {
  cont4ii(assume, assume[p2->if])
  iff.idi(assume, assume[p2->if])
  syl(assume, iff(assume[p2->if],assume), iff(if(assume,p2,p3),p2))
  if.true(assume, p2, p3)
  mp(imp(not(assume),assume[p2->if]), assume[p2->p3])
  com12i(assume[p2->p3], not(assume), assume[p2->if])
  iff.rightd(not(assume), assume[p2->if], assume[p2->p3])
  syl(not(assume), iff(assume[p2->if],assume[p2->p3]), iff(if(assume,p2,p3),p3))
  if.false(assume, p2, p3)
}
```

## 使用样例

假设已经有了 `con3i` : `-| imp(p0, p1) |- imp(not(p1), not(p0))`， `con3d` : `-| imp(p0, imp(p1, p2) |- imp(p0, imp(not(p2), not(p1))`，如何证明 `imp(imp(p0, p1), imp(not(p1), not(p0)))` 呢？

在前面 `con3i`， `iff.con3d` 的证明都用到了 `con3`，实际上不需要用到 `con3` 也可以证明。

```follow
thm deduction.con3(prop p0, prop p1) {
  |- imp(imp(p0, p1), imp(not(p1), not(p0)))
} = {
  deduction(imp(p0,p1), imp(not(p1),not(p0)), p1, p0, imp(not(if(imp(p0,p1),p1,p0)),not(p0)))
  imp.iffimp.rightd(iff(if(imp(p0,p1),p1,p0),p1), not(p0), not(if(imp(p0,p1),p1,p0)), not(p1))
  syl(iff(if(imp(p0,p1),p1,p0),p1), iff(not(if(imp(p0,p1),p1,p0)),not(p1)), iff(if(imp(p0,p1),p1,p0),p1))
  iff.con(if(imp(p0,p1),p1,p0), p1)
  id(iff(if(imp(p0,p1),p1,p0),p1))
  con3i(if(imp(p0,p1),p1,p0), p0)
  elimination(imp(p0,if(imp(p0,p1),p1,p0)), imp(p0,p1), p1, p0, imp(p0,p0))
  id(p0)
  imp.iffimp.left(p0, if(imp(p0,p1),p1,p0), p1)
  imp.iffimp.left(p0, if(imp(p0,p1),p1,p0), p0)
}
```