# Language Specification

## 从Coq和Lean的Weekday示例启发

```fol
type Weekday;
const Weekday sunday monday tuesday wednesday thursday friday saturday;

prop Weekday next(w : Weekday);
axiom next.0(w0, w1: Weekday) : |- w0 = w1 -> next w0 = next w1;
axiom next.1 : |- next sunday = monday;
axiom next.2 : |- next monday = tuesday;
axiom next.3 : |- next tuesday = wednesday;
axiom next.4 : |- next wednesday = thursday;
axiom next.5 : |- next thursday = friday;
axiom next.6 : |- next friday = saturday;
axiom next.7 : |- next saturday = sunday;

prop Weekday prev(w : Weekday);
axiom prev.0(w0, w1: Weekday) : |- w0 = w1 -> prev w0 = prev w1;
axiom prev.1 : |- prev sunday = monday;
axiom prev.2 : |- prev monday = tuesday;
axiom prev.3 : |- prev tuesday = wednesday;
axiom prev.4 : |- prev wednesday = thursday;
axiom prev.5 : |- prev thursday = friday;
axiom prev.6 : |- prev friday = saturday;
axiom prev.7 : |- prev saturday = sunday;

theorem prev.thm1 : |- prev prev sunday = tuesday : {
    // prev sunday = monday -> prev prev sunday = prev monday;
    // prev monday = tuesday;
    // prev prev sunday = tuesday;
}
```
