# Language Specification

## Weekday示例

```fol
type Weekday
const Weekday sunday monday tuesday wednesday thursday friday saturday
var Weekday w0 w1

prop Weekday next : w0
axiom next.0 : w0 w1 : |- w0 = w1 -> next w0 = next w1
axiom next.1 : : |- next sunday = monday
axiom next.2 : : |- next monday = tuesday
axiom next.3 : : |- next tuesday = wednesday
axiom next.4 : : |- next wednesday = thursday
axiom next.5 : : |- next thursday = friday
axiom next.6 : : |- next friday = saturday
axiom next.7 : : |- next saturday = sunday

prop Weekday prev : w0
axiom prev.0 : w0 w1 : |- w0 = w1 -> prev w0 = prev w1
axiom prev.1 : : |- prev sunday = monday
axiom prev.2 : : |- prev monday = tuesday
axiom prev.3 : : |- prev tuesday = wednesday
axiom prev.4 : : |- prev wednesday = thursday
axiom prev.5 : : |- prev thursday = friday
axiom prev.6 : : |- prev friday = saturday
axiom prev.7 : : |- prev saturday = sunday

theorem prev.thm1 : |- prev prev sunday = tuesday : {
    // // eq.trans
    // -| prev prev sunday = prev monday
    // -| prev monday = tuesday
    // |- prev prev sunday = tuesday

    // // mp
    // -| prev sunday = monday
    // -| prev sunday = monday -> prev prev sunday = prev monday
    // |- prev prev sunday = prev monday

    // // prev.2
    // |- prev monday = tuesday

    // // prev.1
    // |- prev sunday = monday

    // // prev.0
    // |- prev sunday = monday -> prev prev sunday = prev monday
}
```

## 环论示例

```fol
type Ring
const Ring zero one
var Ring r0 r1 r2
prop Ring lneg rneg : r0
prop Ring add mult : r0 r1

axiom Ring.add.assoc : r0 r1 r2 : {
    |- add (add r0 r1) r2 = add r0 (add r1 r2)
}
axiom Ring.add.comm : r0 r1 : {
    |- add r0 r1 = add r1 r0
}
axiom Ring.add.lzero : r0 : {
    |- add zero r0 = r0
}
axiom Ring.add.lneg : r0 : {
    |- add lneg r0 r0 = zero
}
axiom Ring.add.rneg : r0 : {
    |- add rneg r0 r0 = zero
}
axiom Ring.mul.assoc : r0 r1 r2 : {
    |- mul (mul r0 r1) r2 = mul r0 (mul r1 r2)
}
axiom Ring.mul.lone : r0 : {
    |- mul one r0 = r0
}
axiom Ring.mul.rone : r0 : {
    |- mul r0 one = r0
}
axiom Ring.mul.ladd : r0 r1 r2 = {
    |- mul add r0 r1 r2 = add mul r0 r2 mul r1 r2
}
axiom Ring.mul.radd : r0 r1 r2 = {
    |- mul r0 add r1 r2 = add mul r0 r1 mul r0 r2
}
```
