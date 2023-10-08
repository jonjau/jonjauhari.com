---
title: "Engineering and Developing Software"
date: 2022-02-27
description: "Some thoughts about the nature of software engineering and
  development, and the role of communication."
---

Once, my friend told me that there was a 'financial engineering' subject
taught at my university and that he really wanted to take it. My immediate
reaction was to laugh as it sounded absurd, and somehow nefarious.

He did seem like the kind of guy who would love to work behind 6 or so
monitors trading in _((exotic))_ financial instruments for the fun of it.

> In fact I had been taking an introductory finance class (in person!) at
> that time, and my newly-formed intuition was that in the thing called
> Finance, KISS holds, and "engineered" complexity only invites middlemen and
> fraudulence...

Coming back to that moment a few times, I realised I was the weirdo. The
subject name was simply using 'engineering' with a slightly different meaning,
obviously not the kind with hard hats. That divergence in meaning caused me
to inspect another more commonly-used term more familiar to me: Software
Engineering.

For me, 'engineering' has always felt off for what I've seen software
engineers actually do. My preference for the term _'software development'_
over _'software engineering'_ in most cases has now led me to write a lot of
paragraphs to question the nature of the profession from the microscopic bit
of experience that I've had in it, even if I use them basically
interchangeably. Beginners and bikeshedding do go hand in hand!

My room-temperature take is that there are fundamental differences that set
software engineering apart from the other branches of engineering -- with
which I am even less familiar -- to warrant a different term.

## Similarity in methodologies

There are clearly similarities between the main engineering branches (civil,
mechanical, electrical, etc.) and software engineering.

In approaching the problem, the high-level steps taken are similar, including:

- understanding requirements, constraints, risks
- designing solutions
- evaluating solutions
- testing solutions
- realise the best solution in production
- maintaining the product

Easily, you could say that there are transferrable skills between the
branches: in problem solving and more importantly, understanding problems then
communicating that understanding to others.

But literally all professions deal with solving problems and being able to
communicate about them. Dictionary definitons suggest that, for engineering,
the emphasis on the underlying scientific principles and technologies being
used is key. There are bonus points if the end product is a machine,
structure, or tool.

> It's interesting to think about what distinguishes a modern
> farmer from an agricultural engineer, or a worker in a high-tech factory
> from a mechanical engineer. It seems to be the different expectations in
> academic credentials, broadness of technical knowledge, and to some extent,
> closeness to the production process.

I don't know enough about the other flavors of engineering to comment on
specifics, but from the single introductory subject that I took which was
labelled engineering where we had to calibrate a catapult to hit a target, the
knowledge base of physics calculations, materials, and software tools very
much paralleled the formal logic, programming language syntax, and developer
tools in my introduction to programming course.

So in software engineering, just as in the other branches, there is problem
solving, with technology and scientific principles always being used, for
instance with logic, algebra and computational complexity. At this high level
of abstraction, the discipline deserves its name.

Of course, when we get more practical there are differences that set software
engineering apart. One is the difference in educational expectations.
Arguably there are many more pathways (shortcuts!) to get the professional
title 'Software Engineer', than there are to get 'Mechanical Engineer'.

## Difference in constraints

As I see it, the fundamental difference is in the constraints of the problem
domain, and not just in the sense of analog versus digital. Simply put,
software engineering is not engineering because its problem domain is
virtually separate from the physical world.

In most other branches of engineering there are forces of nature to constantly
contend with in forming a solution, such as gravity, molecular structures, or
radiation, on top of the human factor. In software engineering, the only
physical things people contend with are time and human minds. Perhaps it's
even human impatience, rather than time that is a constraint. The discipline
sits squarely in the human world, solving human problems with human solutions,
considering only human contraints.

> What about the hardware on which software runs? The keyboards, computers,
> wires, and robotic arms... surely problems in that domain would fall under
> more proper branches of engineering: mechanical, electronic, electric,
> mechatronics. the moment you inspect the physical bits and bobs that breathe
> life into your "Hola Mundo", you would be far beyond the borders of
> "Software Engineering".

Not to mention, the domain where software applications are used can have very
little to do with the natural world -- consider music players, browsers,
jobseeking websites, mobile banking apps, law encyclopedia, text editors. The
closest software engineering gets to the physical is in modelling, and a
[random large percentage] of the time we are simply modelling abstract
concepts, whether it's UI elements in a desktop application, different
database adapters for a CRUD web service, or some business object whose
technicalities perpetually change.

> What if the software being engineered is to be applied to a problem in the
> physical world, say, to control generators in a dam? In that case, the
> problem (and the solution) would have been detailed by the dam engineer. We
> are dealing with a person's words and diagrams as a starting point.
> Otherwise, if the software engineer is expected to be intimate with the
> domain and solve that problem as well, then they would be, maybe literally,
> wearing two hats.

The important human constraint is that it takes time and effort to understand
complex information. It can be argued that computational complexity is a
"natural" constraint, but in producing software we really only consider the
cognition of the average human user/developer, and the time/memory tradeoffs
potentially resulting from that complexity. Notably, those tradeoffs can
change in production without the software engineer knowing! For instance, if
there are changes in the underlying third-party library or the bare-metal
hardware.

The scarcity of physical constraints in the true problem domain of software
engineering leads to the main constraint being centered around
**communication** -- the exchange of information.

## Software solutions are like onions

...and onions have layers. To truly validate a solution in classical
engineering you would have to carefully spend physical materials and run your
tests. In software engineering, disregarding entirely your colleagues and the
potential implications on your career, changing a piece of software and
running it is virtually free. At most, you'll spend time and electricity.

That malleability of software makes it much easier to overengineer, i.e.
coming up with complex solutions when simpler ones would do. Often this
would mean adding more layers of abstraction. An example in programming is
[overcomplicating FizzBuzz](https://www.dalejefferson.com/articles/2018-03-15-convoluted-fizzbuzz/):
functionally each iteration is equivalent, but you could argue the extra
indirection there makes for nice-to-read-and-maintain code, i.e. the code
communicates better.

Abstraction in communicating information (sometimes to the point of
overengineering) is not only easier in software, it is also necessary. To save
time and bypass needing to understand hard things, we ought to program in
well-documented C, or, even better, write code in the runnable pseudocode that
is Python, rather than trudge through machine code, therefore reducing the
cognitive load on the next developer (and also future you, as they always
say) and enabling them to work on top of it effectively. The field of machine
learning's reliance on high-level programming languages and tailor-made
environments like Jupyter is an obvious example of this.

Communication happens in all levels of abstraction in software engineering. Of
course, the idea of abstraction itself is also to aid in communication. At a
higher level of abstraction, we could think of the software tools developers
use as inter-developer communication. IDEs communicate the complexities of
executing and debugging code through a nice graphical interface, as do
graphical git clients for git commands. Even the leanest of developer
environments would need an operating system.
**We use the software to make the software**.

It's becoming clear to me that creating software is inherently "softer" than
other engineering disciplines, and that is because the core problem being
solved is communicating logic to another person effectively. Instead of
finding deterministic solution(s) as in say, physics, chemistry, or
mathematics, often the solutions to a software engineering problem are equally
correct, and the choice of one over the other is down to the client, company
convention, or even personal preference -- not unlike the choices of wording
in an email.

## The Overfull Stack

In software development, web development in particular, there is a thing where
one would quote the shiny techonologies they use, perhaps to signal
tech-forwardness to investors and fellow developers. Some of these "stacks"
are so commonly-used, they are crystallised as acronyms used in job
listings, such as LAMP, MEAN, or MERN.

I find it interesting to think that the "stack" of technologies, does not end
at whether you use C# or Java, React or Vue, or even AWS or Azure, but that
the communication of concepts between developers and clients that sits atop
these layers is a technology in itself. It might explain why the entire world
clings so dearly to the word "Agile", as it is a vital name-tag for an
improved process of communication whose effects can outweigh any choice of
'actual' technology. And the bulk of software engineering is just
communicating concepts in many different mediums.

DevOps is an emergent term related to Agile that aims to capture the
infrastructure and software tools that developers use. I'll reach a bit and
suggest going further: to codify the way natural language is used day-to-day
for effective communication and coining a term for it. Imagine if we formally
specified the process and format that should be followed. For instance, when
communicating requirements, nudging a colleague about an issue, or explaining
a difficult concept to clients, maybe precise sentence forms and vocabulary to
minimise ambiguity and redundancy are mandated.

After all, short of telepathy, natural language in its many forms is
probably the highest level communication tool we have. If Agile tells us to
flexibly respond to changing requirements, why not formally specify how to do
exactly that, perhaps even in a language that is not English? Being able to
use natural language unambiguously such that no back-and-forth clarification
is needed would probably invalidate a large part of the profession, for
instance requirements gathering, standups, and code reviews.
[Outside of closed-world exercises](https://jonjauhari.com/blog/a-sudoku-solver-in-15-lines-of-prolog/)
this is impossible anyway. Humans are fickle, and we all secretly enjoy
overcoming artificial complexities and getting paid for it.

Maybe effective comunication is already what people strive for, and maybe
specifying how to say things would just turn team communication into legal
documents. But I still think the general idea of formalising the use of
natural language (probably English) outside of computer code can be useful in
reducing cognitive load, especially for non-English speakers.

Represented with a catchy term, it could give a truer representation of the
development environment and how software development work is actually done:
lots of communication, not just via code, but also emails, diagrams, comments,
interface design and so on. It would mean that the stack as in
"full-stack" engineer is actually overfull...

## A Final Subheading

Seeking wisdom from a dozen blog posts on the internet reveals that a software
engineer is understood to be a cut above software developers, with a focus on
the gathering of requirements, client communication, systems analysis and
working with larger teams. I still feel uneasy in admitting that "applying
engineering principles to the software development lifecycle" is enough to win
over a term that describes entire domains which work with fundamentally
different applications and constraints.

It may be a sign of my ignorance, but my impression was that most developers
are already expected to apply those engineering principles anyway, on top of
many other things extraneous to writing code that fulfills requirements and is
easy to understand or maintain. Those things are those that I say make up "the
overfull stack".

Besides, if the pure act of writing code, while adhering to benevolent
practices such as code documentation, reviews, and integration testing, is
entirely what a role comprises, then we could use more focused words like
"programmer" to describe it.

If Software Developer isn't exactly right, then maybe we try misusing other
terms: architect, designer, interpreter, logician, refactorer(!?). The
relative youth of the discipline helps here, and frantically renaming things
for no good reason shouldn't be too out of character. Surely we can 'engineer'
some better terms to fit the nature of software development. And so ends my
aimless rambling.
