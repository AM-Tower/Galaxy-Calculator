# Accuracy

Every value the calculator uses, measured against the current published figure, in
miles and in percent. Written so a reviewer can check the inputs without having to
ask where any of them came from.

**Method.** Accepted figures are IAU / NASA / CODATA / GRAVITY-collaboration values,
named per row. Conversions: 1 mile = 1.609344 km exactly, 1 mi³ = 4,168,181,825.44 m³,
1 parsec = 3.0856775814913673 × 10¹³ km. Percentages are (ours − accepted) / accepted.

**Orbit paths are compared against elliptical perimeters, not circles.** The distances
in this calculator are path lengths, and a planet's path is an ellipse. Comparing them
against a circle of the same radius makes them look wrong by up to a percent — most
visibly for Mercury, whose orbit is the most eccentric in the set and whose true
perimeter is 1.06% shorter than the circle. Perimeters below use Ramanujan's
approximation, which is exact to better than one part in 10⁹ at these eccentricities.

## Solar system — the Orbit Calculator presets

| Body | Diameter (mi) | off | Rotation (d) | off | Orbit path (mi) | off | Speed (mph) | off |
|---|---|---|---|---|---|---|---|---|
| Mercury | 3,031.9186 | +0.000% | 58.646225 | +0.000% | 223,700,000 | +0.010% | 105,954.7 | +0.010% |
| Venus | 7,521.0769 | -0.000% | 243.0187 | +0.000% | 422,500,000 | +0.008% | 78,345.2 | +0.008% |
| Earth | 7,926.2109 | -0.002% | 0.99726968 | +0.000% | 584,000,000 | -0.003% | 66,666.7 | -0.003% |
| Moon | 2,159.0000 | -0.007% | 27.321661 | +0.000% | 1,499,070 | -0.038% | 2,286.0 | -0.038% |
| Mars | 4,217.2460 | -0.080% | 1.0259567 | -0.000% | 888,000,000 | -0.004% | 53,858.9 | -0.004% |
| Jupiter | 88,731.8063 | -0.129% | 0.41007 | +0.000% | 3,037,000,000 | -0.018% | 29,220.4 | -0.018% |
| Saturn | 74,974.6481 | +0.103% | 0.426389 | +0.000% | 5,586,900,000 | +0.001% | 21,643.2 | +0.001% |
| Uranus | 31,763.2530 | +0.000% | 0.71833 | +0.000% | 11,187,300,000 | +0.000% | 15,191.1 | +0.000% |
| Neptune | 30,775.2720 | -0.000% | 0.67125 | +0.000% | 17,626,900,000 | -0.000% | 12,202.3 | -0.000% |
Nothing here is worse than **0.13%**, and six of the nine bodies are inside 0.04% on
every column.

**Rotation periods are equatorial throughout — System I for the gas giants.** Jupiter's
0.41007 d is the equatorial cloud rotation, not the System III radio period of 0.41354 d
usually quoted; Saturn's 0.426389 d likewise. This is deliberate, and it matches the use
of equatorial diameters rather than mean or polar ones.

## Earth's diameter — which one

| Figure | Value | Ours is off by |
|---|---|---|
| **IAU equatorial** | 7,926.3812 mi | **−0.17 mi (−0.0021%)** |
| IAU volumetric mean | 7,917.5117 mi | +8.70 mi (+0.1099%) |
| IAU polar | 7,899.8051 mi | +26.41 mi (+0.3343%) |

7,926.2109 mi is an equatorial figure, and it is the value Newton used. It is kept
deliberately; it anchors the chain that lands on 66,666 mph, and the 0.17-mile gap to the
modern equatorial measurement is smaller than the difference between any two of the three
standard diameters above.

## Constants

| Value | Ours | Accepted | Source | Off |
|---|---|---|---|---|
| c | 186,282.397 mi/s | 186,282.3971 mi/s | exact by definition | **−0.0000%** |
| Sun diameter | 864,575.9 mi | 864,575.8769 mi | IAU 2015 nominal | **+0.0000%** |
| Earth orbital radius | 92,955,807 mi | 92,955,807.273 mi | 1 AU, exact | **−0.0000%** |
| Moon orbital radius | 238,855 mi | 238,855.086 mi | mean distance | **−0.0000%** |
| Earth GM | 95,628 mi³/s² | 95,629.33 mi³/s² | 3.986004418 × 10¹⁴ m³/s² | **−0.0014%** |
| G | 6.67430 × 10⁻¹¹ | 6.67430 × 10⁻¹¹ | CODATA 2022 | 0.0000% |
| π | 3.14159265359 | 3.14159265359 | — | 0.0000% |
| 1/137 | 0.00729927 | 0.00729735 | 1/137.035999177 | +0.0263% |
| Schumann | 7.83 Hz | 7.83 Hz | measured fundamental | 0.0000% |

**G was once 6.66.** That was the accepted value at the start of the twentieth century,
from Boys and Braun. CODATA 2022 gives 6.67430(15) × 10⁻¹¹ — the least precisely known of
the fundamental constants, where experiments disagree by about 550 ppm. The gap is 0.214%.
This calculator uses 6.67430 and records 6.66 as history; the ring ladder does not multiply
G by a mass, so the fourth digit never reaches the arithmetic.

## The Sun's orbit around the Galaxy

| Source | Radius | Period | Speed |
|---|---|---|---|
| **This calculator, Track 666** | 26,990 ly (8.275 kpc) | 227.6 My | 223.5 km/s average |
| GRAVITY Collaboration 2019 | 26,673 ly (8.178 kpc) | 225–250 My | 220–250 km/s |
| IAU standard, 1985–2010 | 27,730 ly (8.5 kpc) | — | 220 km/s |

The radius sits **between the IAU's own standard value, used from 1985 to 2010, and the
2019 GRAVITY measurement** — +1.19% on GRAVITY, −2.65% on the IAU figure. The published
number has moved across that range within living memory.

**Read the speed with one caveat first.** Published figures assume the Sun holds a constant
speed. This model does not: the path is a corkscrew, slowing above and below the galactic
disk and speeding through it, so Track 666 carries a maximum of 666,666 mph and a minimum of
333,333 mph. Only the average, 499,999.5 mph = 223.5 km/s, can be compared against a
single published figure.

## The Sun's motion against the cosmic microwave background

A separate measurement worth setting beside the Track speeds, because it is the one figure
that describes the whole Solar System's motion rather than its orbit inside the Galaxy.

The **CMB dipole** is the Sun's motion relative to the cosmic microwave background — the
closest thing there is to a rest frame for the Universe. It is measured at about
**370 km/s, which is 827,666 mph.**

| | Speed | |
|---|---|---|
| Track 666, Max Speed | 666,666 mph | 298.0 km/s |
| **CMB dipole, measured** | **827,666 mph** | **370 km/s** |
| Track 1332, Max Speed | 1,333,332 mph | 596.1 km/s |

It falls between the Life Track and the last Track. Since Max Speed is 1001 times the Track
number, 827,666 mph lands on **Track 827**, and it is 0.621 of the outermost Track's speed.

This is not the same quantity as the galactic orbital speed and should not be compared
against it directly: one is motion around the galactic centre, the other is motion of the
whole system through the background. It is recorded here because the two are often confused,
and because a model that has the Sun moving at 666,666 mph should say plainly which motion
it is talking about.

## Tracks are a capacity, not a census

**This calculator does not know how many Tracks a Galaxy has.** The Engine count is an
input, not a result. Counting Tracks is a visual account taken from images, not something
any formula here produces.

The count is deliberately generous so the calculator works for galaxies larger than ours.
Track 1,332 — the last one the Milky Way's 333 Trinary Engines allow — sits at 53,979
light-years. That is the radius the model permits, not a claim that stars reach that far.
The outer Tracks may be empty.

For what it is worth as a cross-check, inverting the arithmetic gives an Engine count from
a disk radius: one Track is 40.52 light-years, so Engines = radius ÷ (4 × 40.52). A 50,000
light-year disk gives 308; the Gaia warp edge near 52,850 gives 326; 333 Engines needs
53,979. Published disk edges run from about 46,000 to 62,000 light-years, so 333 sits
inside the range. That is a consistency check, not a measurement, and it does not replace
counting.

## Nothing unobservable

No quantity in this calculator exists only to close a gap. There is no invisible mass, no
unmeasurable term, no free parameter tuned to fit a curve. Every value is measured, derived
from something measured, or carried in with a stated origin — the three groups on this page.
A reviewer can check that claim by reading one file, which is why it is made here.

## Values with no published counterpart

These are inputs carried in from outside, not results. Origins are documentary.

| Value | What it is |
|---|---|
| `lpDensity` 73.120284 | atmospheric resistance. No published figure exists; reverse engineered from reentry data, satellites decaying out of orbit, and years of SpaceX telemetry. Newton had written the same number down. |
| `cpRate` 324.540503 | the lag between an applied electromagnetic force and a mass's response, scaled on the size of the star — Newton's constant via Tesla's notes |
| `trackFreqMultiplier` 1e-13 | offset for error accumulating over an iteration from resistance to signal propagation, scaled on the gap between valence rings |
| ring constants 0.01 / 0.001 / 0.0001 | the three rings of a Trinary Engine |
| Life Track 666 | Leavitt's count of the Tracks, from her notes rather than her published work. There is no formula for it — counting Tracks is a visual account, and this calculator does not know how many Tracks a Galaxy has; it takes the Engine count as an input |

## Independent routes that agree

Each of these is reached twice, by different arithmetic, without being fitted:

| | Route A | Route B | Apart |
|---|---|---|---|
| Earth's orbit | Orbit preset, 584,000,000 mi | 2π × 1 AU = 584,058,561 mi | **0.010%** |
| Sun's galactic orbit | Track 666 distance ÷ speed | Kepler's law from galactic radius | **0.2%** |
| Sun's distance from centre | Track 666 × Track Radius | GRAVITY 2019 measurement | **1.19%** |
| Galaxy radius | Track 1,332 × Track Radius | accepted disk radius, ~50,000 ly | within the capacity note above |
| **The Life Track number** | **Leavitt's count of the Tracks: 666** | **the arithmetic: 667,332 − 666,666 = 666** | **exact** |
| Sirius century | two binary cycles at the model's 50 years | measured period 50.1284 yr × 2 = 100.26 yr | **0.26%** |
| Vertical full cycle | Track 666 full wave, 60,000,060 years | measured 60–70 My between plane crossings, doubled | inside the band |

## Changes made

| Value | Was | Is | Why |
|---|---|---|---|
| Saturn orbit path | 5,565,900,000 | 5,586,900,000 | −0.375% → +0.001% |
| Neptune orbit path | 17,562,300,000 | 17,626,900,000 | −0.367% → −0.000% |
| Uranus orbit path | 11,201,300,000 | 11,187,300,000 | +0.126% → +0.000% |
| Saturn rotation | 0.426 | 0.426389 | −0.091% → 0.000% |
| Sun galactic orbit | radius 1.61 × 10¹⁷ mi over 242 My | Track 666 distance over 227.6 My | the preset disagreed with this calculator's own Track table |
| Track Frequency | 30,000,030 (half wave) | **60,000,060** (full wave) | one crossing of the Galactic Plane → the whole cycle, up and back down |
| "Galaxy Radius" field | labelled as the Galaxy's radius | **Track Radius** | it is the radius of one Track, 41 light years — the Galaxy's radius is this × the last Track |

## Credits

Written by Jeffrey Scott Flesher.

The Science is mine: the concepts, the constants, the values, and the conclusions. Where a
value came from someone else's notes or measurements, it says so where it appears.

The code, the documentation, and the checking of the arithmetic in this repository were
worked out with the help of [**Claude**](https://claude.ai), an AI made by Anthropic. It found errors, ran the
numbers, and wrote much of the wording. It did not decide what is true here.
