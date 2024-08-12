
# Class Abstraction

```follow
term class cab(set s0, prop p0) { { s0 | p0 } }
```

```follow
axiom cab.def.1(set s0, set s1, prop p1) {
  |- iff(in(c(s0), cab(s1, p1)), subs(p1, s1, s0))
}
```

```follow
thm cab.def(set s0, set s1, prop p1) {
  |- iff(in(c(s0), cab(s1, p1)), subs(p1, s1, s0))
  |- iff(subs(p1, s1, s0), in(c(s0), cab(s1, p1)))
  |- imp(in(c(s0), cab(s1, p1)), subs(p1, s1, s0))
  |- imp(subs(p1, s1, s0), in(c(s0), cab(s1, p1)))
} = {
  iff.comi(subs(p1,s1,s0), in(c(s0),cab(s1,p1)))
  iff.lefti(in(c(s0),cab(s1,p1)), subs(p1,s1,s0))
  iff.righti(in(c(s0),cab(s1,p1)), subs(p1,s1,s0))
  cab.def.1(s0, s1, p1)
}
```

## 性质

```follow
thm cab.id(set s0, prop p0) {
  |- iff(in(c(s0), cab(s0, p0)), p0)
} = {
  iff.syl(in(c(s0),cab(s0,p0)), p0, subs(p0,s0,s0))
  cab.def(s0, s0, p0)
  
}
```