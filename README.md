# Galaxy Calculator

## The Goal

Prove that Newton and Leavitt are correct.

Every Sun in a Galaxy orbits at the same **rate**, like a record on a record player,
but not at the same **speed**. The Sun on an outer track has farther to travel, so it
must move faster in miles per hour, and it arrives at the same time as the inner one.
That is a clock. This calculator produces the table, and the plot draws it, so the
claim can be checked rather than argued about.

## Kepler, Newton, and Tesla

This combines Kepler, Newton, and Nikola Tesla into one Science. The math and the
concepts for treating Gravity as a wave come from Tesla, the orbital work from Kepler and
Newton, and the rest I added to get the results I needed.

Published as a book in 2019, written in 1988.

## Gravity is a Frequency

This is not a Centrifugal system. Nothing here is thrown outward and balanced by a
pull inward. Gravity is treated as a **frequency**, the same as Light, which is what
Newton implied God is, and what the Torah and the Bible imply God is: all Light without
Darkness, found inside all Atoms.

Newton did not write this in so many words, but taking his notes together with the
Principia, his work implies it, In My Opinion. In F = MA, the Force is that Light, in
terms of every Atom in the Universe, and everything is made of Atoms.

Because it is frequency driven, every measurement here is a **frequency and a
wavelength**, taken from an electromagnetic system. The Sun's Plasma is the proof that
such a system exists. Plasma is charged matter behaving electromagnetically at the
scale of a Star, which is what a frequency driven model requires.

A Centrifugal model gives no reason for every Sun to share a rate. A frequency driven
one does, because a frequency is a rate. That is what this calculator sets out to show.

There is no proof that Gravity is caused by Centrifugal force. There is proof that
electromagnetic forces act over great distances, and that is what this is built on.

## Track 666

Track 666 is the Life Track, the Track that supports Life as we know it.

The number comes from Leavitt's count. She counted the Tracks on the plates and this is
the number that came back. That count is from her notes rather than from her published
work, and the drawing that showed it is not in my hands, so to most people it is a story.
I have tried to find other ways to arrive at the number and I have not found one.

**The arithmetic arrives at the same number.** Given this Sun, the Life Track that makes
the Core Frequency come out at 6.66666 Hz is 666 and nothing else. Max Speed is
(aveIteration × Engines) − (pRate + Life Track), which is 667,332 − Life Track, and
6.66666 Hz needs a Max Speed of 666,666 mph, so the Life Track has to be 666. Track 665
gives 6.66667 and Track 667 gives 6.66665. Both aveIteration and pRate come from the Sun's
diameter, so the honest statement is: this is the Sun that puts Life on Track 666.

Leavitt counted it and the arithmetic derives it, by routes that share no step. That
agreement is the reason the number is used.

**333 Trinary Engines is forced by the same arithmetic.** Ask which Engine counts can put
666,666 mph on their own Life Track and the Life Track is no longer free:

```
LifeTrack = 2012 x Engines - 669,330
```

For 333 Engines that gives 666. For 332 it gives a negative Track. For 334 it gives 2,678
in a Galaxy that only has 1,336 Tracks. Across every Engine count from 100 to 700, **333
is the only one whose Life Track lands inside its own Galaxy.**

**There is still no formula for how many Tracks a Galaxy has.** Counting them is a visual
account, not a calculation, and this calculator does not know the number. It takes the
Engine count as an input and works from there. The plate archive still exists, and a
recount would settle it; counting them is something a machine could now do better than a
person, because the human eye loses its place.

Gravity here is an electromagnetic wave, and the value Newton gave it is the Frequency,
or the wavelength, meaning it is a result of the property rather than the property
itself. The Tracks are numbered to account for that.

The Life Track is an input with 666 as its default, not a constant. It also anchors the
Clock, so every other Track takes its rate from it. Move it and the whole Galaxy is
re-scaled around the new Track.

## The Livable Range

A Planet does not stop being livable one Track either side of 666. There is a band, and
its edges come out of the model rather than out of a round number.

**The ceiling** is where the Track's Core Frequency meets the Livable Planet's own ring
frequency, 7.830 Hz. While the Core Frequency stays under it the Planet's cavity is the
faster of the two and the Planet holds its ring. Past that the Track is faster and the
ring cannot hold.

**The floor** is the ceiling mirrored through the Life Track, because the Life Track is
where the model is calibrated and nothing argues for an asymmetric band.

| Edge | Track | Speed | Core Frequency | Distance |
|---|---|---|---|---|
| Floor | 550 | 550,550 mph | 5.50550 Hz | 22,289 ly |
| **Life Track** | **666** | **666,666 mph** | **6.66666 Hz** | **26,990 ly** |
| Ceiling | 782 | 782,782 mph | 7.82782 Hz | 31,691 ly |

233 Tracks of 1,332, which is 17.5% of the Galaxy, and ± 116,116 mph.

The ceiling is derived — two quantities already in the model, compared. The floor is the
ceiling reflected, and a different argument could put it elsewhere. And the width rests
on one sample, because Earth is the only Planet anybody has confirmed Life on. This is
the model saying where Life could be, not a measurement saying where it is.

## The Math

It uses BC math, an arbitrary precision calculator, not floating point. The Track
Radius carries 28 significant digits and a Double holds about 17, so floating point
would throw the number away before the math ever started.

* `bignumber.js` is the library, `bignumbermath.js` is the BC style wrapper.
* PI is calculated by Machin's Formula to any number of places, not looked up.
* Every operation states its own decimal places, the same idea as `scale` in BC math.

The math is from Newton's notes, with what I added to get the results I needed.

`Trinary.Math.html` walks the whole thing, every constant, and Track 666 worked out one
operation at a time.

## The Result

For the Milky Way, 333 Trinary Engines, Life Track 666:

Speed on a Track is a **range**, not one fixed number. On Track 666 a Sun travels between
333,333 and 666,666 mph, averaging 499,999.5 mph. Every Sun varies to the same degree, so
the Clock stays the same and only the speed changes.

| Quantity | Model | Measured | Error |
|---|---|---|---|
| Sun orbital radius | 26,989 light years, 8,275 pc | 8,178 pc, GRAVITY 2019 | +1.19% |
| Sun orbital speed, mean of range | 223.5 km/s | 220 to 250 km/s | inside the band |
| Galactic year | 227.6 million years | 225 to 250 million | inside the band |
| Vertical half cycle, one plane crossing | 30.00 million years | 26 to 37 million | inside the band |
| Vertical full cycle | 60.00 million years | 52 to 74 million | inside the band |
| Vertical cycles per orbit | 3.791 | about 3.8 | −0.24% |
| Earth orbital speed, Max Speed ÷ 10 | 29.80 km/s | 29.7827 km/s | **+0.07%** |
| Earth ring frequency | 7.830 Hz | 7.83 Hz, Schumann | **0.00%** |

Nothing in that table is off by more than 4.3 percent, two land inside a tenth of a percent,
and the galactic figures sit inside the measured bands rather than against a single number.
The Clock itself is exact: the period is identical on all 1,332 orbiting Tracks, a spread of
1.000000 to 1.

**Read the speed with one caveat first.** Published figures assume the Sun holds a constant
speed. This model does not — the path is a corkscrew, slowing above and below the galactic
disk and speeding through it — so only the average of the range can be compared against a
single published number.

**[ACCURACY.md](ACCURACY.md) holds the full comparison** — every value the calculator uses
against the current published figure, in miles and in percent, with sources named. That file
owns the numbers; this one explains them. [ACCURACY.html](ACCURACY.html) is the same file as a
page a browser can read.

Max Speed comes out as 1001 times the Track number, so Track 333 reads 333,333 mph,
Track 666 reads 666,666 mph, and Track 999 reads 999,999 mph.

## The Ring Frequency and the Schumann Resonance

This is the closest result in the project and it is worth setting out in full so it can be
checked.

```
Earth diameter                      7,926.2109 miles
Earth diameter x 0.001              7.9262109
Livable Planet Density              73.120284
Torr, 1 / 760                       0.001315789
Atmospheric Pressure Index          73.120284 x 0.001315789 = 0.096210865
Livable Planet Ring Frequency       7.9262109 - 0.096210865 = 7.830 Hz
```

The Schumann resonance is the fundamental of the electromagnetic cavity between the
Earth's surface and its ionosphere, measured at **7.83 Hz**. The formula gives **7.830 Hz**.

The calculator prints this on the page, and the Test Suite asserts it, so it cannot drift
without a test failing. It is also the ceiling of the Livable Range above.

**Where Livable Planet Density came from.** 73.120284 is atmospheric resistance — the
viscosity a body passes through on the way down, which varies with altitude and is thickest
at the surface. It is the resistance a meteor meets, and the reason one that is any faster
does not get as far and one that is any slower does not burn up.

No published figure for it could be found, so it was worked out by reverse engineering the
resistance from the data that does exist: reentry measurements, satellites decaying out of
orbit, and years spent with SpaceX telemetry, which put the value close. That work was done
long before the Schumann resonance was known to this project at all — the match to 7.83 Hz
was found afterwards, and is what made the value look right rather than what set it. Newton
had written the same number down on a page of working, with no note of what it was.

It is worth being precise about what the arithmetic can and cannot settle here. The number
is numerically equal to (7.9262109 - 7.83) x 760 — but it would be, under either account,
because a constant that produces 7.830 Hz satisfies that identity whichever way it was
arrived at. The identity is therefore evidence for neither story. What decides it is the
provenance above, which is documentary rather than re-derivable from this calculator.

## The Galaxies

The calculator carries 17 Spiral Galaxies, barred ones among them, because a bar is a
feature of the middle and not of the disk the Tracks describe. Ellipticals and irregulars
are left out: untested, so not offered.

**Every Galaxy that carries a Livable Planet has 333 Engines and 1,332 Tracks.** That
follows from the Life Track arithmetic above — 333 is the only Engine count whose Life
Track lands inside its own Galaxy — so what differs between Galaxies is not their
structure but their size, and therefore their Track Radius:

```
TrackRadius = 40.525 light years x (Galaxy D25 / Milky Way D25)
```

Galaxies scale. That was an observation before it was arithmetic, and the arithmetic did
not have to agree with it.

**What scaling leaves alone.** Every Galaxy in the list gives the same three signature
numbers at its Life Track: **666,666 mph, 6.66666 Hz, and a 60,000,060 year Track cycle.**
The Track cycle is `2 / (1e-13 x minSpeed)` — there is no distance in it, so the Clock is
set by speed and not by how far around the Track is. A Galaxy half again as wide keeps the
same Clock. Only the Livable Planet's distance from the core moves, from 17,000 light years
in M83 to 62,000 in NGC 1365.

**The diameters are D25 figures**, the isophote where B-band surface brightness falls to
25 magnitudes per square arcsecond. That is the main body of light with the halo excluded
by definition, which is the quantity this model wants. Every entry in `galaxies.js` names
its source.

A published diameter is not a direct measurement. What is measured is an angular size,
and the diameter is that angle times an adopted distance — so a Galaxy appears to change
size when the distance is revised and nothing about it was re-observed. Read these as good
to about ten percent, and expect them to move.

Two of them look wrong against a casual lookup and are not. M83 is widely published at
118,000 light years, which is D26, one magnitude fainter; its D25 is 55,000. M101 is widely
published at 252,000 at a high surface brightness level that is not D25; its D25 figure is
170,000. Mixing a D26 for one Galaxy with a D25 for another would be the error, and the
entries here are all D25.

**The Milky Way is the one to watch**, for a reason that has nothing to do with its own
accuracy. It is the denominator every other Galaxy scales from, so it is sixteen times more
consequential than any single numerator, and it is the only one that is modelled rather
than measured, because nobody can photograph this Galaxy from outside. A revision of it
moves all sixteen Livable Planet distances together. It does not move Track 666, which is
anchored to the Sun's own measured distance from the core and takes no diameter as input.

Only the Milky Way lists planets in the Orbit Calculator, because only the Milky Way has
any that have been measured. Every other Galaxy offers one body, the Livable Planet, which
is a position rather than a place: it is where you would look, and it may hold nothing at all.

## Where Every Value Comes From

This matters more than any single agreement in the results, and it is here so nobody has to
reverse engineer it. **A value carried in from elsewhere is not the same as a value this
calculator produced, and the two should not be weighed alike.** So the values fall into three
kinds, and which kind each one is says what weight it can carry.

**Measured, taken from outside this work.** The Sun's diameter, Earth's diameter, the speed
of light, 1/137, the orbital distances and periods of every body in the Orbit Calculator,
and the Galaxy diameters. These can be checked against a published figure by anyone, and
[ACCURACY.md](ACCURACY.md) does exactly that, line by line.

**Derived here, from measured values.** maxIteration = 2103 is the floor of (Sun diameter ×
1/137) ÷ 3 — the one intermediate in this whole calculator that falls straight out of measured
values. The Clock is the other: Speed proportional to Track follows from
anchoring every Track to the Life Track, and no choice of constants can break it. These two
are results in the strict sense.

**Carried in from outside this calculator.** lpDensity, cpRate, the Track Frequency
offset, the three ring constants, the Life Track number. Two of these are measuring the
same kind of thing and are worth naming plainly: **`trackFreqMultiplier` is an offset**,
for the error that accumulates over an iteration from resistance to signal propagation,
and **`cpRate` measures resistance to motion** — the lag between a force applied and a
mass responding to it. Neither is centrifugal force, and most models leave both out. Each
has an origin — a measurement made elsewhere, a figure from Newton's or Tesla's notes, a
count from Leavitt's plates — but none can be re-derived from the other numbers on this
page. Their provenance is documentary, and [ACCURACY.md](ACCURACY.md) lists each one with
where it came from. Each is documented where it is declared, in the code, so a reader meets
the caveat at the same moment they meet the number.

That third group is why this is a **framework** rather than a proof, and it says exactly
where a proof would have to come from: derive lpDensity, or cpRate, or 1104 from first
principles instead of from a measurement or a notebook, and each one turns from an input into
a prediction. That is the shortest path from a model that fits to evidence that holds.

What the model does **not** do is add anything unobservable to make the arithmetic work.
There is no invisible mass in it, and no term that exists only to close a gap. Every quantity
in the calculator is either measured, derived from something measured, or carried in with a
stated origin. Whether that is a strength is for a reader to judge; that it is true of every
number here is checkable in one file.

## Files

| File | What it is |
|---|---|
| `index.html` | the entry point, the Galaxy Calculator |
| `Trinary.Math.html` | how the math works, every constant, Track 666 worked out |
| `galaxy.plot.html` | plots the course of every Sun, and measures the Clock live |
| `test.html` | the Test Suite in the browser |
| `ACCURACY.md` | every value against the published figure, with sources |
| `ACCURACY.html` | the same file as a page, generated by `make-html.js` |
| `bignumber.js` | the arbitrary precision library |
| `bignumbermath.js` | the BC style wrapper, and the math half of the Test Suite |
| `galaxycalculator.js` | the Galaxy Calculator, and the galaxy half of the Test Suite |
| `galaxies.js` | the Galaxy presets, the drop-downs, and the preset half of the Test Suite |
| `run-tests.js` | runs the Test Suite from the command line |
| `make-html.js` | turns `ACCURACY.md` into `ACCURACY.html` |
| `backup.sh` | backup, local commit, and push |
| `update.bc.sh` | updates bignumber.js, but only if the tests still pass |

## Inputs

| Field | Default | What it is |
|---|---|---|
| Galaxy | Milky Way | picked from a drop-down of 17 Spiral Galaxies, in `galaxies.js` |
| Sun Size | 864575.9 | diameter in miles |
| Livable Planet Size | 7926.2109 | diameter in miles, Earth |
| Trinary Engines | 333 | Dark Stars, a term Halley implied. Last Track is this times 4 |
| Life Track | 666 | the Track that supports Life, 1 to Engines x 4 |
| Track Radius | 238229441887838.4639953874 | miles, one Track. Scales with the Galaxy's size |
| Print Nth Track | 66 | how many rows to skip |

## Testing

325 tests. Nothing passes until every one of them does.

* In a browser, open `test.html`
* From a terminal, `node run-tests.js`, exit 0 pass, exit 1 fail
* In the console, `test()`, `testGalaxy()`, `testGalaxyPresets()`, or `testAll()`

The math half checks `fixNumber`, `plus`, `minus`, `times`, `dividedBy`, `abs`, `sqrt`,
`squareRoot`, `format`, `pI`, `piCalc`, `modInverse`, `modInverseJs`, `isInArray`, and
the guards for divide by zero, a negative square root, and decimal places arriving as a
String.

The galaxy half runs the real calculator and checks the table it produces: 1,333 Tracks,
Track 666 at 666,666 mph, no Track running backwards, Max Speed is 1001 times the Track
on every row, the Clock spread is 1.000000, and the Life Track input holds up when it is
moved, left out, set to zero, set out of range, or set to nonsense.

The preset half checks every Galaxy in the list: that the signature numbers hold in all 17,
that each entry names a source, that the Livable Planet is on Track 666, and that every
diameter is measured the same way as the denominator it is scaled against.

Two guards sit outside the calculator. One rejects smart quotes inside HTML tags, because an
editor that curls a quote inside `class="ridge"` leaves a page that looks half right and does
nothing. The other rebuilds `ACCURACY.html` in memory and compares it against the file on
disk, so the page and its source cannot drift apart.

It also asserts the bridges. These are the places where a number is reached twice, by
arithmetic that shares no step, with nothing fitted to make them meet:

| Bridge | One route | The other | Apart |
|---|---|---|---|
| Earth's orbit | the Orbit Calculator's 584,000,000 miles | 2π × the measured AU | 0.010% |
| The Sun's distance out | Track 666 × the Track Radius | GRAVITY Collaboration 2019 | 1.19% |
| The Galaxy's drive frequency | Track 666's own distance ÷ its own speed | the gravitational route | 0.2% |
| The Galaxy's radius | the last Track × the Track Radius | the measured disk radius | inside 10% |
| The Life Track number | Leavitt's count of the Tracks | the only Track giving 6.66666 Hz | exact |
| The Engine count | 333, the model's own figure | the only count whose Life Track fits its Galaxy | exact |

They are tests rather than prose so that if a constant moves and one of them stops
agreeing, the Test Suite says so instead of a reader finding it later.

## backup.sh

```
./backup.sh --backup                       rsync a backup, then commit
./backup.sh --backup --message="..."       commit with your own message
./backup.sh --backup --github              back up, commit, and push
./backup.sh --dry-run                      say what it would do, change nothing
./backup.sh --no-commit                    back up without committing
./backup.sh --list                         list the backups
```

Without `--message=` the commit message is the date, which reads poorly in a history
heading. Give it a message that says what changed.

## update.bc.sh

```
./update.bc.sh                    fetch the latest bignumber.js, test it, keep it if it passes
./update.bc.sh --dry-run          say what it would do, change nothing
./update.bc.sh --force            reinstall even if the version is unchanged
./update.bc.sh --version 11.1.5   pin a version
```

It will not leave a broken library in place. If the Test Suite fails on the new file, the
old one is put back and it exits 1. It reads the version from the banner, tries jsDelivr
then unpkg, tries both `dist/bignumber.js` and `bignumber.js` because older releases kept
it at the root, and checks the download is real JavaScript before it goes anywhere near
the project.

## What the Tracks are, and are not

The Tracks show the movement of the **Suns**. They are not the Spiral Arms. The Arms show
the path of the **debris**, which travels differently, and the two should not be read as
the same thing.

Not every Track carries a Sun. This is written for any Galaxy, and there is no way to
know from here how many Suns a Galaxy has or which Tracks they sit on. The last Track a
Galaxy can have is its Trinary Engines times 4, which is Track 1,332, and the heading above
the table says so for whatever Galaxy is entered. The inner Tracks are hard to measure in
real life because they are so close in to the center.

## On Newton, Leavitt, and the record

Newton did not write, in so many words, that God is the Force of Gravity in his
equations. In the General Scholium to the Principia, second edition of 1713, he wrote that
the system "could only proceed from the counsel and dominion of an intelligent and powerful
Being", and on the cause of Gravity, in the same passage, "hypotheses non fingo", I frame no
hypotheses. Those two are his own words and can be checked in any edition. His published
books leave out a great deal that is in his notes. Taking the notes together with the
Principia, his work implies it, In My Opinion.

Henrietta Swan Leavitt worked for Edward Charles Pickering at the Harvard College
Observatory from 1902, and died in 1921. She did not work for Edwin Hubble. Hubble used
her work after her death and is reported to have said she deserved the Nobel Prize, an account
widely repeated but with no original source located. Her published discovery
is the period to luminosity relation for Cepheid variables, Leavitt's Law. Her
observations also showed the inner stars moving faster than expected, and the Suns
orbiting the Galaxy together. The phrase "same rate, but not the same speed" is mine, not
a quote from her.

The Torr unit is named after Evangelista Torricelli, who discovered the barometer
principle in 1644. The concept came from the Torah, In My Opinion.

The Trinary Marker is 1 divided by 137. That is the fine structure constant, which
physics measures at 1 divided by 137.035999 and calls the coupling constant of
electromagnetism, the number that sets how strongly Light and charged matter interact.
For a model treating Gravity as a Frequency in an electromagnetic system, that is not an
arbitrary constant to be holding. It is the one number in physics that already ties Light
to matter.

## You Cannot Mix Theories With Trinary Science

This has to be said plainly, because a reader who mixes them will get a wrong answer and
blame the arithmetic.

**The only theory in this work is the Trinary Engine.** I cannot prove what is inside a
Galaxy, a Sun, a Planet, or a Moon, so that one is a theory and I call it one. Everything
else here is a measurement, a value carried in with a stated origin, or arithmetic done on
those.

**Einstein cannot be mixed in.** He sets Light as dynamic, and has the Universe as both
dynamic and static. Trinary Science is the opposite of that: Light is static and the
Universe is dynamic. The two do not combine, and an argument that starts by assuming his
position has already left this model behind. That is not a complaint about him. It is a
statement that the two systems answer different questions and their answers cannot be
added together.

So when this work is reviewed, review it on its own terms: check the values against what is
measured, check the arithmetic, and check whether the numbers that arrive twice by
unrelated routes really do agree. Those are all things anyone can do without accepting
anything.

## Credits

Written by Jeffrey Scott Flesher.
I used AI to verify the accuracy of my work. AI: Claude.ai

The Science is mine: the concepts, the constants, the values, and the conclusions. Where a
value came from someone else's notes or measurements, it says so where it appears.

The code, the documentation, and the checking of the arithmetic in this repository were
worked out with the help of **Claude**, an AI made by Anthropic. It found errors, ran the
numbers, and wrote much of the wording. It did not decide what is true here.

## Links

Planetary Orbital Speed Calculator: https://am-tower.com/documents/#orbitalspeeds

Source: https://github.com/AM-Tower/Galaxy-Calculator/
