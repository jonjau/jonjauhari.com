---
title: "The Visitor Pattern for Collision Handling"
date: 2020-11-20
draft: false
description: "A motivation for the visitor design pattern, in the context of
basic collision handling in a game."
---

I find that in learning conventions in programming it always pays to know the
alternatives. Alternatives to
[software design patterns](https://refactoring.guru/design-patterns) (which
are conventions, really) are particularly important to know as patterns can be
very specific and at times, overkill.

I recently came across a situation where the Visitor pattern seemed like the
best fit, but in all honesty, the alternative only seemed worse because of
the lack of language support. To set it up:

Let's say we were building a system where components can
interact with other components, and based on the combination of components,
some behaviour is to be expected. We must also assume the handled
interactions are only between pairs.

A classic example is a pairwise collision system:

- Adventurers and beasts are creatures.
- Adventurers are either knights or archers.
- Beasts are either werewolves or (flying) dragons.
- When adventurers and beasts collide, they fight.
- The way a fight goes is decided by the kind of the adventurer, as well as the
  kind of the beast, e.g. archers shoot dragons, punch werewolves, and
  werewolves disarm knights.
- Knights are particularly polite -- when a pair of knights meet, they loudly
  greet each other.

We see that we can have well-defined adventurer-beast collisions and
possibly a knight-knight collision too. To start off, the collision handling
system shouldn't need to know the class hierarchy and how each
creature behaves when it hits another, it just needs them to _do what they do_.
A simple system might look like this, free of `instanceof` checks:

```java
class Game {
    List<Creature> cs;

    // called every turn / game tick
    void handleCollisions() {
        for (Creature c1 : cs) {
            List<Creature> colliding = c1.getColliding();
            for (Creature c2 : colliding) {
                c1.collide(c2);
            }
        }
    }
}
```

## The alternative

In abbreviated Java, an initial design might be:

```java
abstract class Creature {
    List<Creature> getColliding() { /*...*/ }
    void collide(Creature c) {};
}

abstract class Adventurer extends Creature {}
class Knight extends Adventurer {
    void collide(Creature c) {
        if (c instanceof Knight) { greet((Knight) c); }
        else if (c instanceof Werewolf) { slash((Werewolf) c); }
        else if (c instanceof Dragon) { taunt((Dragon) c); }
    }
}
class Archer extends Adventurer {
    void collide(Creature c) {
        if (c instanceof Werewolf) { punch((Werewolf) c); }
        else if (c instanceof Dragon) { shoot((Dragon) c); }
    }
}

abstract class Beast extends Creature {}
class Dragon extends Beast {
    void collide(Creature c) {
        if (c instanceof Knight) { immolate((Knight) c); }
        else if (c instanceof Archer) { immolate((Archer) c); }
    }
}
class Werewolf extends Beast {
    void collide(Creature c) {
        if (c instanceof Knight) { disarm((Knight) c); }
        else if (c instanceof Archer) { charge((Archer) c); }
    }
}
```

All we've really done is push back the `instanceof` checks into each
method's implementation. This works.

- Adding new behaviour for existing classes means adding an extra
  `instanceof` check.
- Adding a new kind of `Creature` will not affect existing classes. If they
  don't interact with the new kind of `Creature`, they simply don't have
  to handle it in the if-else chain.

Note that we will have as many `instanceof` checks as the number of
well-defined interactions. Also note that what we've done here, is pretty
much [pattern matching](https://docs.microsoft.com/en-us/dotnet/csharp/pattern-matching),
just a lot uglier. Apparently more recent Java versions have
[improved on that](https://cr.openjdk.java.net/~briangoetz/amber/pattern-match.html).
That being said, this alternative `instanceof` approach doesn't really have
a name, and I'm not sure if it fits among the usual over-abstracted Java code.

## Multiple dispatch

It does seem like we're sidestepping the type system. In each `collide`
definition, we're lying about what we actually require. Knowing that we are
colliding with a `Creature` is not enough, we need more specific type
information, and yet this isn't reflected in the function signatures. Though
it's not clear how it would be!

What we want is [multiple dispatch](https://stackoverflow.com/questions/1749534/multiple-dispatch-in-c):

> The concrete function that is called from a function call can depend on the
> dynamic (runtime) type of more than one of its arguments.

Note that the object-oriented `a.collide(b)` is really just `collide(a,b)`,
where the objects `a`, `b` are arguments and `a` gets special treatment.

The issue is, Java, like C++, Python, and many other languages, only supports
[single dispatch](https://en.wikipedia.org/wiki/Dynamic_dispatch#Single_and_multiple_dispatch):

> The concrete function that is called from a function call depends on the
> dynamic (meaning runtime) type of a single object, the _receiver_, which is
> `a` in `a.collide(b)`.

To illustrate:

```java
Creature a = new Archer();
Creature w = new Werewolf();

a.collide(w); // Archer.collide(Creature) is called
w.collide(a); // Werewolf.collide(Creature) is called
```

## The visitor pattern

There is no way to achieve `Archer.collide(Werewolf)` or
`Werewolf.collide(Archer)` when both `a` and `w` are `Creature` references,
without an extra layer of indirection. It is not enough to know the
concrete type of the "collider" -- the "thing being hit" should also tell its
concrete type to the "collider". The latter should occur before the former:
it doesn't make sense to introduce yourself to someone after they've done
something special for you -- they need to know who you are to act accordingly.
This is exactly the [visitor pattern](https://www.tutorialspoint.com/design_pattern/visitor_pattern.htm).

```java
// we know 'w' is a Werewolf, 'w' accepts 'a' by calling 'a.visit(this)'
w.accept(a);

// now we also know 'a' is an Archer, so 'a' shoots 'w'.
a.visit(w);

// similarly for werewolves colliding with archers.
```

In our case, `Creature`s are both visitors and things to be visited, where
"visit" is understood as "collide".

```java
// things that can collide with creatures should implement (part of) this
interface CreatureVisitor {
    default void collide(Knight k) {};
    default void collide(Archer k) {};
    default void collide(Werewolf w) {};
    default void collide(Dragon d) {};
}

abstract class Creature implements CreatureVisitor {
    List<Creature> getColliding() { /*...*/ }
    // all creatures must "introduce themselves" to things colliding into them
    abstract void accept(CreatureVisitor visitor);
}

abstract class Adventurer extends Creature {}
class Knight extends Adventurer {
    void accept(CreatureVisitor visitor) { visitor.collide(this); }
    void collide(Knight k) { greet(k); }
    void collide(Werewolf w) { slash(w); }
    void collide(Dragon d) { taunt(d); }
}
class Archer extends Adventurer {
    void accept(CreatureVisitor visitor) { visitor.collide(this); }
    void collide(Werewolf w) { punch(w); }
    void collide(Dragon d) { shoot(d); }
}

abstract class Beast extends Creature {}
class Dragon extends Beast {
    void accept(CreatureVisitor visitor) { visitor.collide(this); }
    void collide(Knight k) { immolate(k); }
    void collide(Archer a) { immolate(a); }
}
class Werewolf extends Beast {
    void accept(CreatureVisitor visitor) { visitor.collide(this); }
    void collide(Knight k) { disarm(k); }
    void collide(Archer a) { charge(k); }
}
```

It ends up being just as verbose, but indeed it leans upon Java's (nominal)
type system a bit more. The calling code will also have to change slightly,
instead of calling `collide` directly, we instead "accept" collisions:

```java
class Game {
    List<Creature> cs;
    void handleCollisions() {
        for (Creature c1 : cs) {
            List<Creature> colliding = c1.getColliding();
            for (Creature c2 : colliding) {
                c2.accept(c1);
            }
        }
    }
}
```

This also works.

- Adding new behaviour for existing classes means changing the implementation
  of a `collide` method.
- Adding a new kind of Creature will not affect existing classes. If they
  aren’t concerned about the new kind of Creature, they simply don’t have to
  implement a `collide(NewCreatureType x)`. Though that method will have to
  be added to the `CreatureVisitor` interface as a default, empty method.

The duplication of `collide` in `CreatureVisitor` might be something that can
improved on, but I'm not sure. The use of `default` might also be less than
ideal, for instance if each class in the hierarchy only implements 1 or 2 out
of 10+ methods in the interface. But that would probably be an issue of the
design of the hierarchy itself.

[Here](https://ericlippert.com/2015/04/27/wizards-and-warriors-part-one/)
is a more in-depth exploration of alternatives to the visitor pattern. It's
particularly interesting as C# does have language support for multiple
dispatch, through the `dynamic` keyword.

## Code dump

To save space, I wrote the testing code in Kotlin:

```kotlin
interface CreatureVisitor {
    fun collide(k: Knight) {}
    fun collide(a: Archer) {}
    fun collide(w: Werewolf) {}
    fun collide(d: Dragon) {}
}
abstract class Creature : CreatureVisitor {
    fun getColliding(): List<Creature> = TODO()
    abstract fun accept(visitor: CreatureVisitor)
}

abstract class Adventurer : Creature()
class Knight : Adventurer() {
    override fun accept(visitor: CreatureVisitor) = visitor.collide(this)
    override fun collide(k: Knight) = greet(k)
    override fun collide(d: Dragon) = taunt(d)
    override fun collide(w: Werewolf) = slash(w)
    private fun greet(k: Knight) = println("Hail!")
    private fun taunt(d: Dragon) = println("(knight hits dragon)")
    private fun slash(w: Werewolf) = println("(knight slashes werewolf)")
}
class Archer : Adventurer() {
    override fun accept(visitor: CreatureVisitor) = visitor.collide(this)
    override fun collide(w: Werewolf) = punch(w)
    override fun collide(d: Dragon) = shoot(d)
    private fun shoot(d: Dragon) = println("(archer shoots dragon)")
    private fun punch(w: Werewolf) = println("(archer punches werewolf)")
}

abstract class Beast : Creature()
class Dragon : Beast() {
    override fun accept(visitor: CreatureVisitor) = visitor.collide(this)
    override fun collide(k: Knight) = immolate(k)
    override fun collide(a: Archer) = immolate(a)
    private fun immolate(adv: Adventurer) = println("(dragon immolates adventurer)")
}
class Werewolf : Beast() {
    override fun accept(visitor: CreatureVisitor) = visitor.collide(this)
    override fun collide(k: Knight) = disarm(k)
    override fun collide(a: Archer) = charge(a)
    private fun disarm(k: Knight) = println("(werewolf disarms knight)")
    private fun charge(a: Archer) = println("(werewolf charges archer)")
}

fun main() {
    val k1 = Knight()
    val k2 = Knight()
    val a = Archer()
    val d = Dragon()
    val w = Werewolf()
    val cs = listOf(k1, k2, a, d, w)
    for (c1 in cs) {
        // hardcoded: assume every creature is colliding with everything else
        val colliding = cs.filter { it != c1 }
        for (c2 in colliding) {
            c2.accept(c1)
        }
    }
}
```

The output:

```text
Hail!
(knight hits dragon)
(knight slashes werewolf)
Hail!
(knight hits dragon)
(knight slashes werewolf)
(archer shoots dragon)
(archer punches werewolf)
(dragon immolates adventurer)
(dragon immolates adventurer)
(dragon immolates adventurer)
(werewolf disarms knight)
(werewolf disarms knight)
(werewolf charges archer)
```
