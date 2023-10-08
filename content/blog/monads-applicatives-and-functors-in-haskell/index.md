---
title: "Monads, Applicatives, and Functors in Haskell"
date: 2020-10-07
description: "A brief summary of Haskell's type system, detailing monads,
applicatives and functors, and how they relate to one another."
---

This is my summary of Chapter 11 and 12 of
[Learn You a Haskell for Great Good!](http://learnyouahaskell.com/chapters),
a great introduction to functional programming and Haskell. I've found its
explanation of monads, by far the most notorious of category theory jargon
(monoids and functors being runner-ups), to be about as intuitive as monad
explanations can get.

This is hardly comprehensive, but these notes touch on most of the main
concepts of the Haskell type system (that I'm aware of...).

## Values

Values have types. Types can be inferred:

```haskell
x = 'f'       -- x has (inferred) type Char
y = ['f','g'] -- y has (inferred) type [Char], a list of Char's
```

Use `:t` in [GHCi](https://docs.haskellstack.org/en/stable/ghci/)
to check the type of a value, e.g. `:t 'f'` will give `f :: Char`, where
`::` can be read as 'type of' or 'has type'. There is also
[Hoogle](<[hoogle.com](https://hoogle.haskell.org)>).
Though Haskell is able to infer types very well, it is good practice that
top-level definitions are explicitly type-annotated:

```haskell
-- the type declaration doesn't have to sit on top of the definition either
x :: Char
x = 'f'
```

## Functions

Functions map values to values. Since functions themselves are values
(["first-class citizens"](https://en.wikipedia.org/wiki/First-class_citizen)),
they too have types. `f :: p -> p` can be read as "f takes a p and returns a p".

```haskell
f :: p -> p
f x = x            -- no-op

g :: Eq a => a -> a -> Bool
g x y = x == y      -- equality, g is pretty much (==)
```

The second function `g` has a type constraint: it takes two arguments of a type
`a` that must have properly defined equality, such that it is of the
typeclass `Eq` (more on this later), e.g. `Int`. This is
_parametric polymorphism_, with especially lightweight syntax.

Note functions in Haskell are automatically
[curried](https://en.wikipedia.org/wiki/Currying) (like partial application,
but one argument at at time) -- a function that takes two arguments, like `g`,
is still a valid function when only one of its arguments is given:

```haskell
-- (g 3) is a function that expects one argument, and returns true if it equals
-- 3 and false otherwise. This returns all the items equal to 3 in the list:
filter (g 3) [1,2,3,4,5,3] -- evaluates to [3,3]
```

## Defining (data) types

`data` defines an algebraic data type
([ADT](https://en.wikipedia.org/wiki/Algebraic_data_type)):

```haskell
data TrafficLight = Red | Yellow | Green

-- the value of type Person may be constructed with: Person "bob" 9
data Person = Person String Int
```

On the left is the name of the type, and on the right are data constructors
(or type constructors). Type constructors are like functions: they may take
parameters and are automatically curried. Types may have the same name as
their data constructor(s). Note that type constructors do not have a function
body, they simply construct types.

`newtype` defines new types out of existing data types:

```haskell
-- this is record syntax in Haskell
data ZipList a = ZipList { getZipList :: [a] }

-- faster (no wrapping/unwrapping overhead) and equivalent:
newtype ZipList a = ZipList { getZipList :: [a] }
```

It was made exactly for cases when we want to just take one type and
wrap it in something to present it as another type.
`data` can only and should be replaced with `newtype` if the type has exactly
one constructor with exactly one field inside it. Contrast this with:

## Type synonyms

`type` defines a type alias. Wherever one can be used, the other can
take its place. No data constructor is defined.

```haskell
type MyStr = String
```

## Typeclasses

A typeclass takes a type variable and describes what can be done to it;
typeclasses are like interfaces in languages like Java.

```haskell
-- What does it mean to have well-defined equality?
-- It must define the following functions:
class Eq a where
    (==) :: a -> a -> Bool
    (/=) :: a -> a -> Bool
    x == y = not (x /= y)    -- this is the default implementation for (==)
    x /= y = not (x == y)    -- and for (/=), note the indirect recursion.
```

Typeclasses allow for polymorphism:

```haskell
-- constraints check out: 'equal' works for any type a that is an instance of Eq
equal :: Eq a => a -> a -> Bool
equal x y = x == y
```

Types can be made instances of typeclasses:

```haskell
-- How does a TrafficLight have well-defined equality?
instance Eq TrafficLight where
    Red == Red = True
    Green == Green = True
    Yellow == Yellow = True
    _ == _ = False
```

> If you want to see what the instances of a typeclass are, just do `:info`
> (or `:i`) on a typeclass in GHCI. Typing `:info Num` will show which
> functions the typeclass defines and it will give you a list of the types in
> the typeclass. `:info` works for types and type constructors too.

## Monoids

A monoid is a type for which you have a well-defined associative binary
function e.g. `(*)` in `(1*(2*3) == (1*2)*3)` and a value which acts as an
identity with respect to that function. When something acts as an identity
with respect to a function, it means that when called with that function and
some other value, the result is always equal to that other value:

> `1` is the identity with respect to `*`
> and `[]` is the identity with respect to `++`.
> Any number multiplied by 1 is itself, and appending the empty list to any
> list yields the list. So `1` and `[]` are `mempty`s and `*` and `++` are
> `mappend`s for the `Num` and `[]` monoids, respectively.

```haskell
class Monoid m where
    mempty :: m -- polymorphic constant: the identity value (e.g. 1 w.r.t *)
    mappend :: m -> m -> m -- takes two monoid values and returns a third
    mconcat :: [m] -> m
    mconcat = foldr mappend mempty -- default implementation!
```

Monoid laws (surrounding a function with backticks `` ` `` allows infix calling):

```text
1. mempty `mappend` x = x
2. x `mappend` mempty = x
3. (x `mappend` y) `mappend` z = x `mappend` (y `mappend` z)
```

Monoid instances:

- lists are monoids, where `mempty = []`, `mappend = (++)`
- numbers can be monoids in multiple ways with `0` and `+`, and `1` and `*`
- booleans can be monoids in two ways with `False` and `OR` (`newtype`'d as `Any`
  in `Data.Monoid`), and `True` and `AND`
  (`newtype`'d as `All` in `Data.Monoid`).

## Functors

What can I map functions over? I can map functions over a
"computational context".

- functors are things that can be mapped over (e.g. lists, `Maybe`s).
- functors are instances of the typeclass `Functor`.
- `fmap` works like `map`, but is more general (works on all functors, not
  just lists).
- `(<$>)` is an infix synonym of `fmap`.
- "normal" functors support mapping "normal" functions over them.
  "normal" here meaning dealing with plain old values, i.e. non-monadic
  values.

Technically any type can be defined to be a Functor, whether it makes sense
is a separate issue. Examples of where it makes sense:

- mapping a function over a list of `a`s means applying the function to each
  `a` in the list. The computational context here is the "repetition".
- mapping a function over a `Maybe a`, means applying the function to the `a`
  if it's there, or evaluating to `Nothing` if it's not.
  The computational context here is the "optionality".

> A `Maybe a` is either a `Just a` or a `Nothing` -- it has two data
> constructors.

```haskell
-- these two expressions are equivalent, they both evaluate to [4,5,6,7,8]
fmap (+3) [1,2,3,4,5]
(+3) <$> [1,2,3,4,5]

-- a Maybe supports mapping (+3), a normal function as follows:
fmap (+3) (Just 5) -- evaluates to (Just 8)
(+3) <$> Nothing   -- evaluates to Nothing
```

> Note how the values end up inside the context (wrapped in the List/Maybe).
> In general there is not a nice function you can use to recover the `a` once
> it is inside a functor (or an `Applicative`, or a `Monad`). That is,
> `Functor` does not require its instances to define what it means to unwrap
> the context to return the value.
>
> This is by design. For instance, unwrapping a `Maybe` to try and get the value
> inside of it doesn't always make sense: what would `Nothing` unwrap into?
> **... NullPointerException**. In the case of the `IO` monad, whose
> computational context I think of as "impurity", it is even more finicky to
> extract a pure value from a monadic one. In any case you will invite
> runtime errors.

Anyway, here are the Functor laws:

```text
1. fmap id = id
2. fmap (f . g) = fmap f . fmap g

-- equivalently for 2. :
fmap (f . g) F = fmap f (fmap g F)
```

where `id` is `\x -> x`: "return what was passed".

The `\x y -> x + y` syntax is a lambda expression, here it defines an
anonymous function that takes two arguments x and y and returns their sum.
The `.` syntax is
[function composition](https://en.wikipedia.org/wiki/Function_composition) as
in mathematics: `(f . g) x` is equivalent to `f (g x)`.

## Applicative functors

What if I want to map normal functions in a functor over another functor:
"to reach into the context, compute, and return the value in that context"?
Those functors must be applicative.

> - applicative values are values with "added context", e.g. `Just 5`
> - applicative functors support mapping functions inside functors over them
> - applicative functors are functors, and they are instances of the
>   `Applicative` typeclass. It defines `pure` and `(<*>)`.
> - `pure` takes a value and returns that value in the applicative functor
>   ("wrapped in the minimal context")
> - `<*>` (infix) takes a functor with a function in it and another functor,
>   and extracts the function from the first functor and maps it over the
>   second one.

```haskell
-- mapping functions in a functor over values in a functor
-- (the same type of functor!)
[(+3), (1-), (^2)] <*> [1,2,3,4] -- [4,5,6,7,0,-1,-2,-3,1,4,9,16]
[(==3)] <*> [1,2,3,4]            -- [False, False, True, False]

(Just (+3)) <*> Nothing    -- Nothing
(Just (3-)) <*> (Just (7)) -- Just (-4)
Nothing <*> Nothing        -- Nothing
```

Applicative functor laws (this is where the analogies fall apart):

```text
1. pure id <*> v = v
2. pure f <*> pure x = pure (f x)
3. u <*> pure y = pure ($ y) <*> u
4. pure (.) <*> u <*> v <*> w = u <*> (v <*> w)
```

## Monads

What if I have a value in a context, `m a`, and want apply to it a function
that takes a normal `a` and returns a value in that context?
How do you apply a function of type `a -> m b` to a value of type `m a`?

Another take on monads from a similarly great book:
[a programmable semicolon](http://book.realworldhaskell.org/read/monads.html).

> - monads are just applicative functors that support `>>=` (read as "bind")
> - `>>=` is like function application, only instead of taking a normal value
>   and feeding it to a normal function, it takes a monadic value (that is,
>   a value with a context) and feeds it to a function that takes a normal
>   value but returns a monadic value.
> - a `Monad`'s `return` is the same as an `Applicative`'s `pure`,
>   just a different name.

The most useful monad: the `IO` monad (again, it is also an Applicative and a
Functor). Sequencing operations one after the other (functions) is possible
in the IO monad. This looks like imperative programming and is indeed necessary
when dealing with IO operations, which are inherently
[impure](https://en.wikipedia.org/wiki/Functional_purity).

In a way, since the fact that potential side effects from the `IO` operations
are clearly in laid out in the type system, they are not really side effects,
and this makes the whole program easier to reason with. It is said that this
makes Haskell a purely functional language still.

```haskell
-- we can finally write Hello World :)
-- f >> g is the same as f >>= \_ -> g
main :: IO ()
main =
    putStr "Hello" >>= \_ ->
        putStr " ...World" >>
            putStrLn "in Haskell"

-- demonstrating the I in IO, as well as monad syntax:
-- a function that fetches user input, prints it out and returns it.
main :: IO String
main =
    putStrLn "Who?" >>
        getLine >>= \name ->
            putStrLn ("Oh Hello " ++ name) >>
                return name
```

The distinction with applicative functors is very slight.
**Most common functors are applicative and are monads**, e.g.
`[]`, `Maybe`, `State`, `IO`

[do-blocks](https://en.wikibooks.org/wiki/Haskell/do_notation)
are syntactic sugar to deal with monads, to do away with nesting. See below.

## Syntax

To make a point about the syntax, all of these functions are exactly equivalent:

```haskell
-- list comprehension
-- lists get their own special shorthand syntax, comprehensions like in Python.
e1 :: [a] -> [(a,a,Int)]
e1 lst =
    let c = 3
    in  [(x,y,c) | x <- lst, y <- lst]

-- do-block: "implicit" (>>=)'s
e2 :: [a] -> [(a,a,Int)]
e2 lst = do
    x <- lst
    y <- lst
    let c = 3
    return (x,y,c)

-- sugarless: binding monadic operations explicitly
e3 :: [a] -> [(a,a,Int)]
e3 lst =
    let c = 3 in
    lst >>= \x ->
        lst >>= \y ->
            pure (x,y,c)

-- maximum golf: remember (<*>) :: Applicative f => f (a -> b) -> f a -> f b
-- implicitly the <$> bit is evaluated first to get a list of functions.
e4 :: [a] -> [(a,a,Int)]
e4 lst =
    let c = 3 in
    (\x y -> (x,y,c)) <$> lst <*> lst
```

## Types and instances of functors et al

- `map :: (a -> b) -> [a] -> [b]`, literally `fmap` but just for lists
- `fmap :: (a -> b) -> f a -> f b`, where f is a functor \*
- `(<$>) :: (a -> b) -> f a -> f b`, where f is a functor
- `pure :: a -> f a`, where f is an applicative functor
- `(<*>) :: f (a -> b) -> f a -> f b`, where f is an applicative functor
- `(>>=) :: m a -> (a -> m b) -> m b`, where m is a monad
- `(>>) :: m a -> m b -> m b`, where m is a monad
- `return :: a -> m a`, where m is a monad

\* ["lifting"](https://wiki.haskell.org/Lifting):
`(->)` is right-applicative, so
`fmap :: (a -> b) -> (f a -> f b)` is equivalent, and emphasises the "lift",
likewise for `pure` et al.

this is how lists are instances of Functor:

```haskell
-- [] here is A TYPE CONSTRUCTOR, i.e. the f in Functor f
-- not the literal for an empty list.
instance Functor [] where
    fmap = map
```

and Maybe:

```haskell
instance Functor Maybe where
    fmap f (Just x) = Just (f x)
    fmap f Nothing = Nothing
```

and Either:

```haskell
data Either a b = Left a | Right b

instance Functor (Either a) where
    fmap f (Right x) = Right (f x)
    fmap f (Left x) = Left x
```

`Either a` is a type constructor that takes 1 parameter, which is what the
Functor typeclass expects.

Functions are in fact monads too:

```haskell
instance Applicative ((->) r) where
    pure x = (\_ -> x)
    f <*> g = \x -> f x (g x)

-- this makes my head hurt
ghci> (+) <$> (+3) <*> (*100) $ 5
508
```

## In action

Golfing once again...

```haskell
-- equivalently:
-- getZipList $ fmap (+) (ZipList [1,2,3]) <*> (ZipList [100,10,20])
ghci> getZipList $ (+) <$> ZipList [1,2,3] <*> ZipList [100,10,20]
[101, 12, 23]

-- implicitly, this is (fmap <$> [(+2,(*2))]) <*> [Just 10, Just 20]
ghci> fmap <$> [(+2),(*2)] <*> [Just 10, Just 20]
[Just 12,Just 22,Just 20,Just 40]

ghci> (fmap (*2)) <$> [Just 1, Nothing, Just 3]
[Just 2,Nothing,Just 6]

```

## Class constraints

Class constraints can appear in (type)class declarations vs instance
declarations, as in `(Eq m) => Eq (classOrInstanceName m)`.

- In class declarations, they are used for making a typeclass a subclass of
  another typeclass.
- In instance declarations, they are used to express requirements about the
  contents of some type.

For instance, we might require the contents of a Maybe, which is a concrete
type to also be part of the Eq typeclass. Note the Maybe is a type constructor.

## Kinds

[Few languages](<https://en.wikipedia.org/wiki/Kind_(type_theory)>)
have type systems that allow access to higher-kinded types (e.g. Monads).
Haskell lets you see the kinds of types too. I have yet to realise where
this might be useful.

Kinds are to types what types are to values. Find out kind of a type with
`:k` in GHCi.

`*` means concrete type:

- `Int :: *`
- `Maybe :: * -> *`
- `Maybe Int :: *`
- `Either :: * -> * -> *`

I haven't quite grasped this, but it's interesting regardless:

```haskell
class Tofu t where
    tofu :: j a -> t a j
```

If `t` is an instance of `Tofu`, what would its kind be?

- `j a` is the type of the value of the first parameter of `tofu`, so
  its kind must be `*`, i.e. it is a concrete type.
- Assuming `a` is of kind `*`, `j` has kind `* -> *`.
- `t a j` must be a concrete type, and since it takes two types `a` and `j`,
  whose kinds we inferred above, `t` has kind `* -> (* -> *) -> *`.

So, `t` takes a concrete type `a`, a type constructor `j` that takes a concrete
type, and produces a concrete type.
