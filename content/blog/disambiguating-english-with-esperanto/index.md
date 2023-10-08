---
title: "Disambiguating English with Esperanto"
date: 2020-12-27
draft: false
description: "Exploring the use of Esperanto grammar structures with English
  vocabulary to disambiguate sentences."
---

## Some problems

As a learner of English (who isn't?), I've come across a lot of inconsistent
rules and exceptions in the language, and I can imagine they exist in most
other natural languages. People just (have to) get used to them. In general:

1. Grammar is complex (13+ tenses!) and verb modification is irregular.
2. Ambiguous semantics: the same sentence can mean different things.
3. Spelling does not reflect pronunciation; accents vary wildly.
4. Vocabulary is vast and borrows from many other languages.
5. Spoken vs written disconnect: slang, idioms, figures of speech.

What can be done to improve it? I'm not sure, but there have been
[been](<https://en.wikipedia.org/wiki/Learning_English_(version_of_English)>)
[many](https://en.wikipedia.org/wiki/Basic_English)
[efforts](https://en.wikipedia.org/wiki/Simple_English_Wikipedia), mainly
by simplifying sentence structure and restricting vocabulary.

Of course, there's no changing the way English is spoken in the
mainstream, but ideas are ideas, so here's one.

Designing a new language from the ground up is hard, so in any case
vocabulary should be kept constant (if not restricted to simpler words). This
means points 3, 4, 5 are off-limits, there is no way to improve on those
without modifying English words or how they are spelled
([related](https://jonjauhari.com/projects/cifero/)). So, grammar has to
change.

I've been thinking about how Esperanto
[grammar constructs](https://lernu.net/en/gramatiko) (the few that I know)
can be used to make English and similar languages to be more regular. This
should address point 1 and, to a certain extent, point 2 as well. Specifically,
this post explores that in the context of ambiguity in sentences, which is
apparently
[an inherent property of all natural languages](https://michealaxelsen.com/blog/?p=346).

### Grammar simplification

All we're taking from Esperanto are the suffixes and sentence structure.

| Suffix | Meaning   |
| :----- | :-------- |
| -o     | noun      |
| -a     | adjective |
| -e     | adverb    |

The immediate problem are the words themselves. Most English words have
grammatical meaning baked into their "root words", like 'often' or 'again';
modifying them with suffixes leads to non-obvious interpretations ('again-o':
what would 'again' mean as a noun?) and should be avoided, but what if
someone does it anyway? Exceptions regarding special word forms will have to
remain.

A good practice might be to avoid special words and phrases altogether, and
stick with simple suffix-friendly words, say, writing 'frequent-e' to mean
'frequently' instead of 'often'. But I don't know how 'again' could be broken
down into a word and a suffix, so it might have to be a 'special word'.

The verb suffix system for Esperanto is
[well-defined](http://esperanto.davidgsimpson.com/eo-verbforms.html):

| Suffix | Meaning     | Example    | Interpretation |
| :----- | :---------- | :--------- | :------------- |
| -as    | present     | I do-as    | I do           |
| -is    | past        | I do-is    | I did          |
| -os    | future      | I do-os    | I will do      |
| -u     | imperative  | do-u it-n! | do it!         |
| -us    | conditional | I do-us    | I would do     |
| -i     | infinitive  | do-i it    | to do it       |

These should cover most cases when forming simple sentences.

There are also more complex verb suffixes, which may be unnecessary:

| Suffix | Meaning         | Example         | Interpretation        |
| :----- | :-------------- | :-------------- | :-------------------- |
| -anta  | present active  | I be-as do-anta | I am doing            |
| -inta  | perfect active  | I be-as do-inta | I have done           |
| -onta  | future active   | I be-as do-onta | I am about to do      |
| -ata   | present passive | I be-as do-ata  | I am being done       |
| -ita   | perfect passive | I be-as do-ita  | I have been done      |
| -ota   | future passive  | I be-as do-ota  | I am about to be done |

### Going further

But what if we wanted to extend verbs such that they could be nouns,
adjectives or adverbs?

Consider `'repeat-e'`. It means 'repeat', as an adverb. But how exactly should
it be interpreted?

1. Repetitively
2. Repeatedly

Both are adverbs and they overlap in meaning -- maybe they should not be
different words in the first place. But the rule was to not modify English
words more than necessary. Trying to get at meaning 1 leads to another issue:

1. `repetition-e`
2. `repetitive-e`
3. `repetitively-e`

Which one is correct? Perhaps all of them, although 3 is redundant. We see that
mixing English suffixes and (abused) Esperanto suffixes leads to even more
choice.

So, abusing Esperanto's suffix system, words can become verbs, adjectives or
adverbs, as appropriate. Let's say prepositions (over, on, at), articles (a,
the), conjunctions (and, or) are not changed, and omitted if appropriate.

In this system, the words to which we attach suffixes are the English words,
and those words don't have to be actual root words. It's not always possible
and might lead to ambiguity (e.g. `'repeat-e'`).

Here's how the system might be used to disambiguate some sentences:

### Syntactic ambiguity

Also known as structural ambiguity or grammatical ambiguity. This is when
the structure of the sentence makes its meaning unclear.

A popular example is:

    I saw a man on a hill with a telescope.

There are several interpretations:

1. The hill has a telescope.
2. The man has a telescope.
3. I used a telescope to see the man.

In English, the sentence might be disambiguated by context, or a change in
sentence structure:

    1. I saw a man on a hill, which had a telescope.
    2. I saw a man, who had a telescope, on a hill.
    3. I saw, using a telescope, a man on a hill.

If it were "I saw a man with a woman with a telescope", disambiguation
would be much more difficult. In speech, emphasis and pauses could be used.

A possible translation:

    1. I see-is man-on on have-telescope-a hill-o.
    2. I see-is have-telescope-a man-on on hill-o.
    3. I use-telescope-e see-is man-on on hill-o.

- the article 'a' is dropped.
- -o marks a noun.
- -on marks a noun that is the direct object of the verb
  (here the man is the object of seeing, so 'man-on').
- -is turns a verb into past tense.
- -e marks an adverb.
- -a marks an adjective.

But using -e and -a to mark adverbial and adjectival clauses is probably not
a good idea, since they might get more complex. What if instead of 'have
telescope' we had 'had one telescope and now have two'? More extensible but
less natural would be:

    1. I see-is man-on on hill-o which have-as telescope-on.
    2. I see-is man-on who have-as telescope-on on hill-o.
    3. I see-is use-ante telescope-on man-on on hill-o.

- -ant- marks continuity, and again, -e makes an adverb so 'use-ante
  telescope-on' is an adverbial clause that would describe an action as 'using
  a telescope', in this case the action is 'seeing'.
- -as turns a verb into present tense.

### Lexical ambiguity 1

    She went to the bank.

What bank? Merriam-Webster lists
[5 entries](https://www.merriam-webster.com/dictionary/bank) for 'bank', but
the sentence structure rules out the verb definitions. Also, the 5th definition
('a group or series of objects arranged together in a row') seems quire rare.
Here 'bank' is either:

1. the bank of a river
2. the bank to deposit your money in

Further context is needed, and often it is available. There is no good way to
deal with this without adding an extra clause.

    1. She go-is to the-bank-o of the-river-o.
    2. She go-is to the-bank-o for store-i money-o.

- -i makes a verb infinitive: 'store-i money-o' is 'to store money'.

### Lexical ambiguity 2

    I like understanding people.

This time the sentence structure doesn't help us, and the ambiguity arises
from the fact that 'understanding' can be a verb or an adjective:

1. I like people who are understanding.
2. I like to understand people.

Disambiguation by inventing new English words (this is irregular, and not always
possible):

    1. I like understanders.
    2. I like people-understanding.

Esperanto grammar is particularly well-suited for this. Changing the suffix
changes the role of the word, and the structure is untouched:

    1. I like-as understand-ajn person-ojn.
    2. I like-as understand-i person-ojn.

In the first sentence:

- -j, pronounced like 'y', marks plurality: 'people' becomes 'person-oj', then
  it becomes 'person-ojn' because it is the direct object of 'like'.
- The adjective 'understand-a' describes 'person-ojn', so the former follows the
  latter's suffixes: 'understand-ajn'.

In the second sentence:

- -i marks an infinitive: 'understand-i' is 'to understand'.
- 'understand-i person-ojn' means 'people-understanding' as a noun, it is the
  direct object of 'like', so there is an -n.

### Morphological ambiguity

Somewhat related to lexical ambiguity is morphological ambiguity, which (as I
understand) is when adding prefixes and suffixes leads to (further) ambiguity.

    This shoe is untieable.

Interpretations:

1. This shoe can be untied.
2. This shoe cannot be tied.

With punctuation (different emphasis in speech):

    1. This shoe is untie-able.
    2. This shoe is un-tieable.

With Esperanto grammar:

    1. This-shoe-o can-as be-i not-tie-ita.
    2. This-shoe-o not-can-as be-i tie-ita.

- not- negates
- 'can' is considered a verb
- -ita means 'has been done': 'tie-ita' means 'tied' as in the adjective
  (note it ends with -a), e.g. tied shoes.
- 'be-i tie-ita' means 'to be tied'
- 'can-as be-i tie-ita' means 'be able to be tied'
- 'can-as be-i not-tie-ita' means 'be able to be not tied'

### The "comma problem"

    I invited my parents, Jack and Jill to the party.

Interpretations:

1. Two people are invited: my parents who are named Jack and Jill.
2. Four people are invited: Jack, Jill and my parents.

Changing the sentence structure, and punctuation can disambiguate:

    1. I invited my parents, Jack, and Jill to the party.
       I invited Jack, Jill, and my parents to the party.

    2. I invited my parents (Jack and Jill) to the party.
       I invited to the party, my parents: Jack and Jill.

Esperanto grammar (as well as more regular punctuation):

    1. I invite-is I-an parent-ojn, Jack-on, and Jill-on to the-party-o.
    2. I invite-is I-an parent-ojn who name-as Jack and Jill to the-party-o.

- 'I' becomes 'my' by adding -a.
- Since 'my parents' is a direct object we also add -n, so 'I-an parent-ojn'.
- I'm not sure if Jack and Jill need -o's in the second sentence.

### The "it problem"

    The dog furiously chased the cat until it suddenly fell.

What is 'it' referring to?

1. The dog chased the cat until the cat fell.
2. The dog chased the cat until the dog fell.

I can't think of a way to disambiguate this while keeping the 'it'.

    1. The-dog-o fury-e chase-is the-cat-on until the-cat-o sudden-e fall-is.
    2. The-dog-o fury-e chase-is the-cat-on until the-dog-o sudden-e fall-is.

### Sample translation

[Source](https://omniglot.com/language/articles/englishlearningchallenges.htm).
With slight alterations:

    English grammar is complex, making it difficult to remember, master and use
    logically. Ensuring you use the correct grammar can be tricky, especially
    when you are in conversation with someone and they are speaking at an
    alarmingly fast pace. Learning grammar is like learning to drive, you can
    learn all of the theory, rules and regulations, but you won't be good at it
    unless you practice it and it starts to become second nature to you. Grammar
    is extremely important, incorrect use of grammar can confuse the person you
    are speaking to and even change the meaning of what you are communicating,
    what's more is native English speakers are hyper-aware of grammar and will
    notice almost immediately if a grammatical error is made, even if this is
    the smallest of errors. Don't get me started on accents...

Esperanto grammar (kind of):

    English-a grammar-o be-as complex-a, such-that difficult-as remember-i,
    master-i and use-i logic-e it-n. Ensure-i that you use-as correct-a
    grammar-o can-as be-i trick-a, special-e when you converse-as with
    person-o and they speak-as at alarm-e fast-a pace-o. Learn-i grammar-on
    be-as like learn-i drive-i, you can-as learn-i all the theory-ojn,
    rule-ojn, regulation-ojn, but you not good-os at it unless you
    practice-as it-n and it start-as become-i second-a nature-o to you.
    Grammar-o be-as extreme-e important-a, not-correct-a use-o of grammar-o
    can-as confuse-i the person-on whom you speak-as, and even change-as the
    meaning-on of what you communicate-as, more-e, native-a English-a
    speaker-oj hyper-e aware-as of grammar-o and notice-os almost immediate-e
    if grammar-a error-o make-itas, even if this be-as the most small
    error-o. Not start-u I-n on accent-oj...

Most of this is probably inaccurate, but it is interesting still.

### Conclusion

Clearly, mixing Esperanto grammar and English vocabulary leads to language
that is unpleasant and difficult to read, speak, write or listen to. I would
say this is mostly due to the heavy use of '-' (maybe apostrophes would have
been better) and the difference in the pronunciation systems -- more
irregularity in English.

Perhaps a system similar to this may be useful in informal human-readable
[speech tagging](https://en.wikipedia.org/wiki/Part-of-speech_tagging), to
disambiguate speech, or more generally, help separate
grammar from vocabulary (I have not looked into that). Importantly, English
vocabulary here could be swapped out for some other language's vocabulary.
