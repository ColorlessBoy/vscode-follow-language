# Follow Language Language

```follow
type <TYPENAME>

term <TYPENAME> <TERMNAME> (<TYPENAME> <ARGNAME>, ...) { <NATURE MATH STRING> }

axiom <AXIOMNAME> (<TYPENAME> <ARGNAME>, ...) {
  |- <TARGET>
  |- <TARGET>
  ...
  -| <ASSUME>
  -| <ASSUME>
  ...
}

thm <THMNAME> (<TYPENAME> <ARGNAME>, ...) {
  |- <TARGET>
  |- <TARGET>
  ...
  -| <ASSUME>
  -| <ASSUME>
  ...
} = {
  <PROOF>
  <PROOF>
  <PROOF>
  ...
}
```
