# Big Number Templates

Have you ever been confused by BigNumber code? Long chaining method make it really hard to read:

```
(a + b) * (c + d)
```
becomes:
```
new BigNumber(a).plus(b).multipliedBy(new BigNumber(c).plus(d))
```

Have you ever wished things can be simpler? Like:

```
bnt`(${a} + ${b}) * (${c} + ${d})`
```
or
```
bnt(`($a + $b) * ($c + $d)`)({a,b,c,d})
```

Then your wishes has become true.

# Install

```
npm i --save bnt
```

