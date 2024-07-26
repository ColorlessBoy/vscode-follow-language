
# 逻辑连接符 `not` 

逻辑连接符 `not` 是一阶逻辑中第二个基本的符号，他表示`否定`。

```follow
term prop not(prop p0) { ¬ p0 }
term prop hp0
```

```follow
//一阶逻辑第三条公理 
axiom a3(prop p0, prop p1) {
  |- imp(imp(not(p0), not(p1)), imp(p1, p0))
}
```

```follow
thm contradiction.1(prop p0, prop p1) {
  |- imp(not(p0), imp(p0, p1))
} = {
  syl(not(p0), imp(p0,p1), imp(not(p1),not(p0)))
  a3(p1, p0)
  a1(not(p0), not(p1))
}
```
