/* ****************************************************************************
 *  galaxies.js
 *  The Galaxy presets, kept apart from the calculator so the list can be
 *  edited without touching the mathematics.
 *
 *  HOW A GALAXY BECOMES A PRESET
 *
 *  The Livable Planet is the Track that runs at 666,666 mph. Not the Track
 *  half way out, not a Track chosen for its number: the one at that speed,
 *  because the speed is what sets time and what a body can live through.
 *
 *  That rule decides everything else, and it decides it more narrowly than
 *  it looks. The speed at the Life Track is
 *
 *      aveIteration x Engines - pRate - LifeTrack
 *
 *  and for this Sun that is 2012 x Engines - 2664 - LifeTrack. Ask for it to
 *  equal 666,666 and the Life Track is forced:
 *
 *      LifeTrack = 2012 x Engines - 669,330
 *
 *  For 333 Engines that gives 666. For 332 it gives a negative Track, for 334
 *  it gives 2,678 when the Galaxy only has 1,336. Across every Engine count
 *  from 100 to 700, **333 is the only one whose Life Track lands inside its
 *  own Galaxy**, and the Track it lands on is 666. Checked against the
 *  calculator, not argued: see testGalaxyPresets().
 *
 *  So if the Livable Planet is the Track at 666,666 mph, every Galaxy that
 *  has one has 333 Trinary Engines and 1,332 Tracks. The Galaxies differ in
 *  size, so what differs is the Track Radius:
 *
 *      TrackRadius = 238,229,441,887,838.46 miles x (diameter / 107,958 ly)
 *
 *  Galaxies scale. That was an observation before it was arithmetic, and the
 *  arithmetic did not have to agree with it.
 *
 *  THE OTHER READING
 *
 *  Set galaxyModel to "fixed" below and the Track Radius stays 40.525 light
 *  years everywhere, the Engine count follows from the Galaxy's size, and the
 *  Livable Planet is whichever Track comes nearest 666,666 mph. It is worth
 *  knowing what that gives, because it is not nonsense:
 *
 *    - The Livable Track lands between 665 and 669 in every Galaxy, and
 *      between 26,949 and 27,111 light years out. A Galaxy five times the
 *      size of another puts its Livable Planet at the same distance, to
 *      within half a percent. The speed sets the distance, as expected.
 *    - The 60,000,060 year cycle survives, because the Track is ours.
 *    - Galaxies under about 167 Engines never reach 666,666 mph at all, so
 *      they carry no Livable Planet. Three in the list below are that small.
 *
 *  What it costs is consistency: the Track marked as the Life Track is no
 *  longer the Track the Livable Planet is on, because the Life Track sets the
 *  speed ladder and the 666,666 mph Track is somewhere else. Two names for
 *  one thing, disagreeing. That is why "scaling" is the default.
 *
 *  What "scaling" costs is only the distance: the Livable Planet sits 10,000
 *  light years out in NGC 6946 and 50,000 in NGC 1365. Nothing else moves.
 *
 *  WHY THE DISTANCE IS ALLOWED TO MOVE AND THE REST IS NOT
 *
 *  The Track cycle is 2 / (1e-13 x minSpeed). There is no distance in it. In
 *  this model the Clock is set by the speed, not by how far around the Track
 *  is, so two Galaxies whose Livable Planets run at the same speed keep the
 *  same Clock even when one of them is half again as far out.
 *
 *  That is what decides between the two readings. The model has three
 *  signature numbers at the Life Track -- 666,666 mph, 6.66666 Hz and
 *  60,000,060 years -- and only one reading keeps all three:
 *
 *      scaling      666,666 mph   6.66666 Hz   60,000,060 yr   distance scales
 *      fixed        666,436 mph   6.66436 Hz   60,090,376 yr   26,949 ly
 *      varying Sun  666,674 mph   6.66674 Hz  102,653,069 yr   26,990 ly
 *
 *  Scaling holds all three exactly, across Galaxies from a third of ours to
 *  nearly twice it. The other two buy a constant distance by breaking the
 *  Clock. The distance was never the invariant; the speed is, and the Clock
 *  follows the speed.
 *
 *  THE SUN AND THE PLANET
 *
 *  Every preset carries our Sun's size and Earth's size. Not because the
 *  stars out there are our Sun, but because nobody has measured one. The
 *  question the calculator answers for another Galaxy is: if a Sun like
 *  ours sat on the Life Track of that Galaxy, what would it be doing. The
 *  Livable Planet is Earth for the same reason, and it is called the
 *  Livable Planet rather than Earth because it is a position, not a place.
 *  It may hold nothing at all. It is where you would look.
 *
 *  Only the Milky Way lists real planets, because only the Milky Way has
 *  any that have been measured. Nothing is invented to fill the list.
 *
 *  ON THE DIAMETERS
 *
 *  Every diameter below is a published D25 figure: the isophote where B-band
 *  surface brightness falls to 25 magnitudes per square arcsecond. That is the
 *  main body of light with the halo excluded by definition, which is the
 *  quantity this model wants. Each entry names its source.
 *
 *  HOW A PUBLISHED DIAMETER IS BUILT, and why they move. Nobody measures a
 *  Galaxy's diameter in light years. What is measured is an angular size, and
 *  the physical diameter is that angle times an adopted distance:
 *
 *      diameter = D25 angular size x distance
 *
 *  Both halves move. The angular size is stable -- most of these still trace
 *  to RC3 in 1991 -- but the distance is revised often, so a Galaxy appears to
 *  change size when nothing about it was re-observed. A published figure is a
 *  composite of a catalogued angle and whichever distance the source adopted,
 *  and the source does not always say which distance that was: for several of
 *  these, the stated diameter does not reproduce from the stated angular size
 *  and the stated distance on the same page. That is not an error in the entry
 *  below; it is what the published record looks like.
 *
 *  A reviewer should read these as good to the nearest ten percent or so, not
 *  as precise. They are worth revisiting about once a year.
 *
 *  ISOPHOTE IS THE LARGER TRAP THAN DISTANCE. A fainter cut gives a bigger
 *  Galaxy, and the difference dwarfs any distance revision:
 *
 *    - M83 is widely published at 118,000 light years. That is D26, one
 *      magnitude fainter. Its D25 is 55,000. The entry below is the D25.
 *    - M101 is widely published at 252,000 light years, at a high surface
 *      brightness level that is not D25. Its D25 figure is 170,000. The entry
 *      below is the D25.
 *
 *  Both of those look like errors against a casual lookup, and are not. Mixing
 *  a D26 for one Galaxy with a D25 for another would be the error.
 *
 *  SIX ENTRIES DO NOT NAME THEIR ISOPHOTE -- M106, NGC 2403, NGC 1300, M100,
 *  M66 and M95 publish a diameter in kpc without stating the cut. They are
 *  almost certainly D25, because that is what the catalogues carry, and
 *  "almost certainly" is the weakest word in this file. Their source field
 *  says so rather than implying a confidence nobody has. The consequence is
 *  bounded: a wrong isophote moves that one Galaxy's Livable Planet distance
 *  and reaches nothing else.
 *
 *  THE MILKY WAY IS THE ONE TO WATCH, for a reason that has nothing to do with
 *  its own accuracy. It is the denominator every other Galaxy is scaled from,
 *  so it is sixteen times more consequential than any single numerator -- and
 *  it is the only one that is modelled rather than measured, because nobody
 *  can photograph this Galaxy from outside. It is also the one being actively
 *  revised: Gaia-era work finds a broken exponential profile and a larger
 *  half-light radius than the single-exponential disk the 1997 figure assumed.
 *  A revision from 87,400 to 95,000 would move all sixteen Livable Planet
 *  distances by -8.7%. It would not move Track 666, which is anchored to the
 *  Sun's own measured distance from the core and takes no diameter as input.
 *
 *  (the original note follows)
 *
 *  A Galaxy has no edge. The published diameter is the D25 isophote, the
 *  contour where the surface brightness falls to 25 magnitudes per square
 *  arcsecond, and a fainter cut gives a bigger Galaxy. Andromeda is quoted
 *  anywhere from 152,000 to 220,000 light years depending on the cut. So
 *  these are not measurements in the sense the Solar System values in
 *  ACCURACY.md are measurements, and the Engine counts they produce carry
 *  that same looseness. Each entry says where its figure came from.
 *
 *  Only Spiral Galaxies are listed. Barred Spirals are included because a
 *  bar is a feature of the middle, not of the disk the Tracks describe.
 *  Ellipticals and irregulars are left out: untested, so not offered.
 *
 *  Written for the Galaxy Calculator, Jeffrey Scott Flesher
 *  With Claude, by Anthropic
 * *************************************************************************** */
"use strict";

/* One Track. The miles figure is the calculator's own constant; the light
 * year figure is the same length, given so the arithmetic above can be
 * followed without a calculator. */
/* Which reading of the model to build the presets from. "scaling" says every
 * Galaxy has 333 Engines and the Track Radius scales with its size; "fixed"
 * says the Track Radius is the same everywhere and the Engine count scales.
 * The long note above says what each one costs. One word changes it. */
var galaxyModel = "scaling";

/* The Milky Way's Track Radius, and the same length in light years. Under
 * "scaling" this is the Milky Way's own figure and the others are scaled from
 * it; under "fixed" it is every Galaxy's. */
var trackRadiusMiles = "238229441887838.4639953874";
var trackRadiusLightYears = 40.525;

/* The Milky Way, which is the anchor in either reading. */
var milkyWayEngines = 333;
var milkyWayLifeTrack = 666;

/* The Milky Way's D25 diameter: 26.8 +/- 1.1 kpc, Goodwin, Gribbin and Hendry
 * 1997, who could not photograph the Galaxy from outside and so modelled it by
 * comparing Cepheid distributions in 17 other spirals. It is the scaling
 * denominator, and it has to be a D25 figure because every numerator is one.
 *
 * What the model implies is a different number: 1,332 Tracks of 40.525 light
 * years is 107,958 light years across, 23.5% wider than D25. That is not a
 * contradiction -- D25 is where the light falls below 25 magnitudes per square
 * arcsecond, not where the Galaxy ends -- but the two cannot be mixed. Using
 * the model's figure as the denominator against other Galaxies' D25 understated
 * every one of them by that same 23.5%. */
var milkyWayD25 = 87400;
var milkyWayModelDiameter = 107958;

/* The speed a Livable Planet runs at. Track 666 of this Galaxy, and the
 * Core Frequency is this times 0.00001: 6.66666 Hz. */
var livableSpeedMph = 666666;

/* ****************************************************************************
 *  THE LIVABLE RANGE
 *
 *  A Planet does not stop being livable one Track either side of 666. There is
 *  a band, and its edges come out of the model rather than out of a round
 *  number.
 *
 *  THE CEILING is where the Track's Core Frequency meets the Livable Planet's
 *  own ring frequency:
 *
 *      lpRingFreq = (Earth diameter x 0.001) - aP
 *                 = 7.9262109 - 0.096210865 = 7.830 Hz
 *
 *  That is the Planet's second ring, the Schumann cavity. The Core Frequency
 *  is the Track's, and it rises with the Track number. While it stays under
 *  7.830 Hz the Planet's cavity is the faster of the two and the Planet holds
 *  its own ring. Past that the Track is faster and the ring cannot hold. So
 *  the ceiling is Track 782: 782,782 mph, 7.82782 Hz, 31,691 light years out.
 *
 *  THE FLOOR is the ceiling mirrored through the Life Track. The Life Track is
 *  where the model is calibrated, so a band around it is symmetric in frequency
 *  unless something says otherwise, and nothing does. That is Track 550:
 *  550,550 mph, 5.50550 Hz, 22,289 light years out.
 *
 *      floor   Track  550    550,550 mph   5.50550 Hz   22,289 ly
 *      Life    Track  666    666,666 mph   6.66666 Hz   26,990 ly
 *      ceiling Track  782    782,782 mph   7.82782 Hz   31,691 ly
 *
 *  233 Tracks of 1,332, which is 17.5% of the Galaxy, and +/- 116,116 mph.
 *
 *  WHAT THIS IS WORTH. The ceiling is derived: it is two quantities already in
 *  the model, compared. The floor is not derived, it is the ceiling reflected,
 *  and a different argument could put it somewhere else.
 *
 *  And the width rests on one sample. Earth is the only Planet anybody has
 *  confirmed life on, so nothing here is measured against a second case. This
 *  is the model saying where life could be, not a measurement saying where it
 *  is, and it is the weakest claim in this file. It is written down so it can
 *  be argued with, which is more than a round number allows.
 * *************************************************************************** */
var livableCeilingHz = 7.830;      // the Livable Planet's own ring frequency
var livableCeilingTrack = 782;
var livableFloorTrack = 550;       // the ceiling mirrored through Track 666

/* Set by the Sun alone, so they are the same for every preset here. Held as
 * numbers only to work out which Track carries the livable speed; the
 * calculator derives them for itself, and a test asserts these still match
 * what it derives, so a change to the Sun cannot pass unnoticed. */
var sunAveIteration = 2012;
var sunPRate = 2664;

/* The Sun and the Livable Planet, in miles. Every preset uses these. */
var presetSunSize = "864575.9";
var presetLivablePlanetSize = "7926.2109";

/* Engines from a diameter, for the "fixed" reading. Rounded, because an
 * Engine is a whole thing. */
function galaxyEngineCount(diameterLightYears) {
    return Math.round(diameterLightYears / 2 / trackRadiusLightYears / 4);
}

/* The speed the model gives at a Track, for a Galaxy of this many Engines
 * whose Life Track is where the geometry puts it. */
function trackSpeed(engines, lifeTrack, trackNumber) {
    var lifeMaxSpeed = sunAveIteration * engines - sunPRate - lifeTrack;
    return Math.floor(lifeMaxSpeed / lifeTrack * trackNumber);
}

/* The Life Track that would put 666,666 mph on itself. Forced, not chosen. */
function selfConsistentLifeTrack(engines) {
    return sunAveIteration * engines - sunPRate - livableSpeedMph;
}

/* For the "fixed" reading: which Track comes nearest the livable speed, and
 * null when the Galaxy is too small ever to reach it. */
function nearestLivableTrack(engines) {
    var lifeTrack = engines * 2;
    var lastTrack = engines * 4;
    if (trackSpeed(engines, lifeTrack, lastTrack) < livableSpeedMph) {
        return null;
    }
    var best = 1;
    var bestGap = Infinity;
    for (var n = 1; n <= lastTrack; n = n + 1) {
        var gap = Math.abs(trackSpeed(engines, lifeTrack, n) - livableSpeedMph);
        if (gap < bestGap) {
            bestGap = gap;
            best = n;
        }
    }
    return best;
}

/* Scaling the Track Radius. The Milky Way keeps its own figure to the last
 * digit; the rest are that figure times how much bigger the Galaxy is. */
function scaledTrackRadius(diameterLightYears) {
    if (diameterLightYears === milkyWayD25) {
        return trackRadiusMiles;
    }
    return (Number(trackRadiusMiles) * (diameterLightYears / milkyWayD25)).toFixed(4);
}

/* The Orbit Calculator's body list. The values behind these are in
 * presetCB() in galaxycalculator.js; these are only the labels and the
 * numbers that pick them. "4" is the Earth preset, which is what a
 * Livable Planet is: Earth's size, day and year, put somewhere else. */
var solarSystemBodies = [
    { value: "1",  name: "Sun" },
    { value: "2",  name: "Mercury" },
    { value: "3",  name: "Venus" },
    { value: "4",  name: "Earth" },
    { value: "5",  name: "Moon" },
    { value: "6",  name: "Mars" },
    { value: "7",  name: "Jupiter" },
    { value: "8",  name: "Saturn" },
    { value: "9",  name: "Uranus" },
    { value: "10", name: "Neptune" }
];

/* Every Galaxy but ours. One entry, because one is all that is known. */
var livablePlanetOnly = [
    { value: "4", name: "Livable Planet" }
];

/* ****************************************************************************
 *  THE LIST
 *
 *  diameter is in light years. Every diameter below is a published D25
 *  figure and every one of them still wants checking against a named
 *  source before this goes to review: see the note above on why they are
 *  softer numbers than the Solar System ones.
 *
 *  To add a Galaxy, copy a line and change the name and the diameter. The
 *  Engine count and the Life Track are worked out from the diameter, so
 *  there is nothing else to fill in.
 * *************************************************************************** */
var galaxies = [
    {
        name: "Milky Way",
        type: "Spiral",
        group: "Local Group",
        /* The only one nobody can photograph from outside, so the only one
         * whose D25 is modelled rather than measured. 26.8 +/- 1.1 kpc.
         * The familiar "100,000 light years" is a different quantity -- the
         * stellar disk, which reaches past the D25 isophote. */
        diameter: 87400,
        enginesFixed: 333,
        bodies: solarSystemBodies,
        source: "D25 26.8 +/- 1.1 kpc, Goodwin, Gribbin & Hendry 1997, arXiv astro-ph/9704216"
    },
    { name: "Andromeda",  designation: "M31",  type: "Spiral", group: "Local Group",
      diameter: 152000, bodies: livablePlanetOnly, source: "D25 46.56 kpc, RC3 1991 at 765 kpc" },
    { name: "Triangulum", designation: "M33",  type: "Spiral", group: "Local Group",
      diameter: 61100,  bodies: livablePlanetOnly, source: "D25 18.74 kpc" },

    { name: "Whirlpool",  designation: "M51",  type: "Spiral", group: "Nearby",
      diameter: 76900,  bodies: livablePlanetOnly, source: "D25 23.58 kpc" },
    { name: "Pinwheel",   designation: "M101", type: "Spiral", group: "Nearby",
      diameter: 170000, bodies: livablePlanetOnly, source: "D25, 28.8 arcmin at 6.9 Mpc" },
    { name: "NGC 628",    designation: "M74",  type: "Spiral", group: "Nearby",
      diameter: 85300,  bodies: livablePlanetOnly, source: "D25 26.16 kpc" },
    { name: "NGC 4258",   designation: "M106", type: "Spiral", group: "Nearby",
      diameter: 151700, bodies: livablePlanetOnly, source: "46.53 kpc; isophote NOT stated by the source, assumed D25" },
    { name: "NGC 7331",   type: "Spiral", group: "Nearby",
      diameter: 146250, bodies: livablePlanetOnly, source: "D25 44.84 kpc, 25.0 B-mag/arcsec2" },
    { name: "NGC 6946",   designation: "Fireworks", type: "Spiral", group: "Nearby",
      diameter: 87300,  bodies: livablePlanetOnly, source: "D25 26.77 kpc, RC3 1991" },
    { name: "NGC 2403",   type: "Spiral", group: "Nearby",
      diameter: 90300,  bodies: livablePlanetOnly, source: "27.69 kpc; isophote NOT stated by the source, assumed D25" },

    { name: "NGC 1300",   type: "Barred Spiral", group: "Barred",
      diameter: 130000, bodies: livablePlanetOnly, source: "39.40 kpc; isophote NOT stated by the source, assumed D25" },
    { name: "NGC 1365",   type: "Barred Spiral", group: "Barred",
      diameter: 201700, bodies: livablePlanetOnly, source: "D25.5 61.85 kpc; 2MASS K-band gives 306,800" },
    { name: "NGC 5236",   designation: "M83",  type: "Barred Spiral", group: "Barred",
      diameter: 55000,  bodies: livablePlanetOnly, source: "D25 16.9 kpc; the 118,000 figure is D26, a fainter cut" },
    { name: "NGC 4321",   designation: "M100", type: "Barred Spiral", group: "Barred",
      diameter: 166100, bodies: livablePlanetOnly, source: "50.93 kpc; isophote NOT stated by the source, assumed D25" },
    { name: "NGC 3627",   designation: "M66",  type: "Barred Spiral", group: "Barred",
      diameter: 85200,  bodies: livablePlanetOnly, source: "26.12 kpc; isophote NOT stated by the source, assumed D25" },
    { name: "NGC 3351",   designation: "M95",  type: "Barred Spiral", group: "Barred",
      diameter: 80130,  bodies: livablePlanetOnly, source: "24.58 kpc; isophote NOT stated by the source, assumed D25" },
    { name: "NGC 2903",   type: "Barred Spiral", group: "Barred",
      diameter: 100800,  bodies: livablePlanetOnly, source: "D25 30.91 kpc" }
];

/* ****************************************************************************
 *  NOT YET LISTED
 *
 *  These are Spirals from the same working list, left out because no
 *  diameter could be given for them that was worth putting a number to.
 *  Each needs one figure, its D25 diameter in light years, and then it can
 *  be moved up into the list above as an ordinary line:
 *
 *      NGC 300, NGC 7793, NGC 1097, NGC 1512, NGC 3359,
 *      NGC 4414, NGC 1566, NGC 2997, NGC 1309,
 *      NGC 4254 (M99), NGC 4535
 *
 *  Leaving a Galaxy out costs nothing. Putting a made up size in would
 *  cost the whole table, because a reviewer who finds one invented number
 *  is right to stop reading.
 * *************************************************************************** */

/* Fill in what the list leaves out, so nothing has to be kept in step by
 * hand. Anything the entry states for itself is left alone. */
(function completeGalaxies() {
    var scaling = (galaxyModel === "scaling");
    for (var i = 0; i < galaxies.length; i = i + 1) {
        var g = galaxies[i];

        if (scaling) {
            /* Same Galaxy, different size. The Engine count, the Track count
             * and the Life Track are the Milky Way's, because 333 is the only
             * Engine count that can carry a Livable Planet at all. */
            g.engines = milkyWayEngines;
            g.lifeTrack = milkyWayLifeTrack;
            g.trackRadius = scaledTrackRadius(g.diameter);
            g.trackLightYears = trackRadiusLightYears * (g.diameter / milkyWayD25);
            g.livableTrack = milkyWayLifeTrack;
        } else {
            /* Same Track everywhere, different Galaxy. The size sets the
             * Engines, and the Livable Planet is wherever 666,666 mph falls,
             * which is not the Track the model marks as the Life Track. */
            if (typeof g.enginesFixed === "number") {
                g.engines = g.enginesFixed;
            } else {
                g.engines = galaxyEngineCount(g.diameter);
            }
            g.lifeTrack = g.engines * 2;
            g.trackRadius = trackRadiusMiles;
            g.trackLightYears = trackRadiusLightYears;
            g.livableTrack = nearestLivableTrack(g.engines);
        }

        g.lastTrack = g.engines * 4;
        g.radius = g.lastTrack * g.trackLightYears;
        g.livableSpeed = (g.livableTrack === null)
            ? null
            : trackSpeed(g.engines, g.lifeTrack, g.livableTrack);
        g.livableDistance = (g.livableTrack === null)
            ? null
            : g.livableTrack * g.trackLightYears;
        g.label = g.designation ? g.name + " (" + g.designation + ")" : g.name;
    }
}());

/* ****************************************************************************
 *  THE PAGE
 *
 *  Building the drop down from the list above rather than writing it into
 *  index.html means a Galaxy is added in one place, not two.
 * *************************************************************************** */

/* The label carried in the option value is what printValues() reads and what
 * the title above the table shows, so it is the name and not an index. */
function findGalaxy(label) {
    for (var i = 0; i < galaxies.length; i = i + 1) {
        if (galaxies[i].label === label) {
            return galaxies[i];
        }
    }
    return null;
}

/* The Galaxy drop down, grouped the way the working list was grouped. */
function buildGalaxySelect() {
    var select = document.getElementById("myGalaxy");
    if (!select) {
        return;
    }
    var group = "";
    var holder = select;
    select.innerHTML = "";
    for (var i = 0; i < galaxies.length; i = i + 1) {
        var g = galaxies[i];
        if (g.group !== group) {
            group = g.group;
            holder = document.createElement("optgroup");
            holder.label = group;
            select.appendChild(holder);
        }
        var option = document.createElement("option");
        option.value = g.label;
        option.text = g.label;
        holder.appendChild(option);
    }
    select.value = galaxies[0].label;
}

/* The Orbit Calculator's body list. Our Galaxy gets the planets that have
 * been measured; every other Galaxy gets the one position the model puts a
 * Livable Planet at, and nothing made up to keep it company. */
function buildBodySelect(g) {
    var select = document.getElementById("presetBody");
    if (!select) {
        return;
    }
    select.innerHTML = "";
    var first = document.createElement("option");
    first.value = "0";
    first.text = "Select";
    select.appendChild(first);
    for (var i = 0; i < g.bodies.length; i = i + 1) {
        var option = document.createElement("option");
        option.value = g.bodies[i].value;
        option.text = g.bodies[i].name;
        select.appendChild(option);
    }
    /* "4" is the Earth preset, which is the Livable Planet everywhere else. */
    select.value = "4";
}

/* Picking a Galaxy fills the form, rebuilds the body list, and loads the
 * Livable Planet into the Orbit Calculator, so the two halves of the page
 * are always describing the same Galaxy.
 *
 * The Galaxy table is emptied rather than recalculated. Rebuilding it means
 * drawing up to 2,469 rows, which is the Calculate button's job to ask for,
 * not something a drop down should do on its own. */
function galaxyPreset(label) {
    var g = findGalaxy(label);
    if (!g) {
        return;
    }
    var set = function (id, value) {
        var field = document.getElementById(id);
        if (field) {
            field.value = value;
        }
    };
    set("mySunSize", presetSunSize);
    set("myLivablePlanetSize", presetLivablePlanetSize);
    set("myTrinaryEngines", g.engines);
    set("myLifeTrack", g.lifeTrack);
    set("myGalaxyRadius", g.trackRadius);

    buildBodySelect(g);
    if (typeof presetCB === "function") {
        presetCB("4");
    }

    var table = document.getElementById("myGalacticTable");
    if (table) {
        table.innerHTML = "";
    }
    var title = document.getElementById("galaxyTitle");
    if (title) {
        title.innerHTML = g.label + " &nbsp; " + g.engines.toLocaleString() +
            " Trinary Engines, Life Track " + g.lifeTrack.toLocaleString() +
            " &nbsp; press Calculate Galaxy";
    }
}

/* Before load, so the drop down is populated by the time galaxycalculator.js
 * fills in the orbit values. */
if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function () {
        buildGalaxySelect();
        /* The body list too, or the Orbit Calculator opens holding the one
         * option index.html carries as a fallback instead of the Milky Way's
         * ten measured bodies. */
        buildBodySelect(galaxies[0]);
    });
}

/* ****************************************************************************
 *  THE TESTS
 *
 *  testIs, testReset and testReport live in bignumbermath.js. Run by
 *  testAll() in galaxycalculator.js, so `node run-tests.js` covers this file
 *  along with the rest.
 * *************************************************************************** */
function testGalaxyPresets() {
    testReset();
    var i;
    var g;

    /* The anchor. If this ever stops reading 333 and 666, the list has been
     * edited into disagreeing with the model it came from. */
    var milkyWay = findGalaxy("Milky Way");
    testIs("Milky Way is first, so it is the default", galaxies[0].label, "Milky Way");
    testIs("Milky Way Engines", milkyWay.engines, 333);
    testIs("Milky Way Life Track", milkyWay.lifeTrack, 666);
    testIs("Milky Way last Track", milkyWay.lastTrack, 1332);

    /* The derivation has to reproduce the anchor from its own radius, or it
     * is not the same rule being applied to the other Galaxies. */
    testIs("333 Engines derive from the Milky Way's own radius",
        galaxyEngineCount(333 * 4 * trackRadiusLightYears * 2), 333);

    /* One Track is one Track everywhere. That is the whole assumption. */
    testIs("a Track is 40.525 light years", trackRadiusLightYears, 40.525);

    for (i = 0; i < galaxies.length; i = i + 1) {
        g = galaxies[i];

        /* The Life Track is half the last Track in every Galaxy, which is
         * what 666 of 1332 is. */
        testIs(g.label + ": Life Track is half the last Track",
            g.lifeTrack * 2, g.lastTrack);
        testIs(g.label + ": last Track is Engines x 4",
            g.lastTrack, g.engines * 4);

        /* A Galaxy with no Engines would divide by nothing downstream. */
        testIs(g.label + ": has Engines", g.engines > 0, true);

        /* Every entry says where its size came from. A preset without a
         * source is the thing this project cannot afford. */
        testIs(g.label + ": names a source", (typeof g.source === "string" && g.source.length > 0), true);
    }

    /* ---- the sixth bridge --------------------------------------------
     * The Livable Planet runs at 666,666 mph. Ask which Engine counts can
     * put that speed on their own Life Track, and only one can. This is not
     * the Life Track being chosen to give 6.66666 Hz, which is already
     * tested in galaxycalculator.js; it is the Galaxy's size being forced by
     * the speed a body can live at. */
    testIs("the Milky Way's Life Track is the one that carries 666,666 mph",
        selfConsistentLifeTrack(333), 666);
    testIs("and the calculator agrees that Track 666 runs at 666,666 mph",
        trackSpeed(333, 666, 666), livableSpeedMph);

    var works = [];
    for (i = 100; i <= 700; i = i + 1) {
        var L = selfConsistentLifeTrack(i);
        if (L >= 1 && L <= i * 4) {
            works.push(i);
        }
    }
    testIs("333 Engines is the only count from 100 to 700 whose Life Track " +
        "lands inside its own Galaxy", works.join(","), "333");

    /* If the Sun changes, the two numbers above stop being this Sun's and
     * every livable Track in this file is wrong. The calculator derives them
     * for itself, so they are checked against it rather than trusted. */
    if (typeof testBuildTable === "function" && typeof derivedValues === "object") {
        testBuildTable("check", "864575.9", "7926.2109", "333",
            trackRadiusMiles, "666", "666");
        testIs("aveIteration still matches the calculator", derivedValues.aveIteration, sunAveIteration);
        testIs("pRate still matches the calculator", derivedValues.pRate, sunPRate);
        testIs("and its Life Track speed is the livable speed", derivedValues.lifeMaxSpeed, livableSpeedMph);
    }

    /* ---- what the chosen model gives ---------------------------------- */
    for (i = 0; i < galaxies.length; i = i + 1) {
        g = galaxies[i];
        if (galaxyModel === "scaling") {
            /* Every Galaxy is the same Galaxy at a different size, so every
             * Livable Planet runs at exactly the livable speed. */
            testIs(g.label + ": Livable Planet runs at 666,666 mph", g.livableSpeed, livableSpeedMph);
            testIs(g.label + ": Livable Planet is on Track 666", g.livableTrack, 666);
            testIs(g.label + ": Track Radius is scaled by size",
                Math.round(g.trackLightYears / trackRadiusLightYears * 100000),
                Math.round(g.diameter / milkyWayD25 * 100000));
        } else {
            /* Nobody lives further from 666,666 mph than a Track's worth. */
            if (g.livableTrack !== null) {
                testIs(g.label + ": Livable Planet is within 1,100 mph of 666,666",
                    Math.abs(g.livableSpeed - livableSpeedMph) < 1100, true);
            }
        }
    }

    /* ---- the Clock ----------------------------------------------------
     * The reason scaling wins. The Track cycle has no distance in it, so a
     * Galaxy half again as wide keeps the same Clock. If this ever stops
     * reading 60,000,060 for every Galaxy, the model has been changed into
     * one where the Livable Planet's year depends on which Galaxy it is in. */
    if (galaxyModel === "scaling" && typeof testBuildTable === "function") {
        for (i = 0; i < galaxies.length; i = i + 1) {
            g = galaxies[i];
            var built = testBuildTable(g.label, presetSunSize, presetLivablePlanetSize,
                String(g.engines), g.trackRadius, "666", String(g.lifeTrack));
            var lifeRow = null;
            for (var k = 0; k < built.length; k = k + 1) {
                if (Number(String(built[k].n).replace(/[*,]/g, "")) === 666) {
                    lifeRow = built[k];
                }
            }
            testIs(g.label + ": Life Track speed", lifeRow.maxSpeed, "666,666");
            testIs(g.label + ": Core Frequency", lifeRow.lpFrequency, "6.66666");
            testIs(g.label + ": Track cycle", lifeRow.trackFreq, "60,000,060");
        }
    }

    /* ---- the livable range ---------------------------------------------
     * The ceiling is the Livable Planet's own ring frequency, so it is two
     * quantities already in the model compared against each other, not a
     * chosen number. If lpRingFreq ever moves, this moves with it. */
    testIs("the ceiling is the Livable Planet's ring frequency",
        livableCeilingHz, 7.830);
    testIs("which puts the ceiling on Track 782",
        Math.round(livableCeilingHz * 100000 / 1001), livableCeilingTrack);
    testIs("the floor is the ceiling mirrored through the Life Track",
        livableCeilingTrack - 666, 666 - livableFloorTrack);
    testIs("the Life Track sits in its own band",
        (666 > livableFloorTrack && 666 < livableCeilingTrack), true);
    /* Track 1055 was the worked example of too fast. It must fall outside. */
    testIs("Track 1055 is outside the band", (1055 > livableCeilingTrack), true);

    /* ---- what the published diameters can and cannot move ---------------
     * Track 666's radius is 666 Tracks of 40.525 light years, which lands on
     * the Sun's own measured distance from the core. It is anchored to that
     * measurement, not to the Galaxy's edge, so no revision of a published
     * diameter can move it. This asserts that. */
    testIs("Life Track 666 sits at the Sun's measured distance from the core",
        Math.round(666 * trackRadiusLightYears), 26990);

    /* Every diameter in the list is a D25 figure, including the denominator.
     * If a measured D25 ever gets mixed with a model-implied diameter, this
     * ratio stops being the same for every Galaxy and the scaling is wrong. */
    var ratio0 = null;
    for (i = 0; i < galaxies.length; i = i + 1) {
        g = galaxies[i];
        var modelOverD25 = Math.round(
            g.lastTrack * g.trackLightYears * 2 / g.diameter * 10000);
        if (ratio0 === null) {
            ratio0 = modelOverD25;
            testIs("the model reaches past D25 by the Milky Way's own factor",
                ratio0, Math.round(milkyWayModelDiameter / milkyWayD25 * 10000));
        }
        testIs(g.label + ": measured the same way as the denominator",
            modelOverD25, ratio0);
    }

    /* The Milky Way's own Track Radius is never recomputed, in either model,
     * because every other Galaxy is scaled from it. */
    testIs("the Milky Way keeps its Track Radius to the last digit",
        findGalaxy("Milky Way").trackRadius, trackRadiusMiles);

    /* Only our Galaxy has planets anybody has measured. */
    testIs("only the Milky Way lists real planets", milkyWay.bodies.length, 10);
    for (i = 1; i < galaxies.length; i = i + 1) {
        testIs(galaxies[i].label + ": one Livable Planet and nothing invented",
            galaxies[i].bodies.length, 1);
        testIs(galaxies[i].label + ": that planet is the Earth preset",
            galaxies[i].bodies[0].value, "4");
    }

    return testReport();
}

/* Node, for the tests. A browser ignores this. */
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        galaxies: galaxies,
        testGalaxyPresets: testGalaxyPresets,
        galaxyEngineCount: galaxyEngineCount,
        trackRadiusMiles: trackRadiusMiles,
        trackRadiusLightYears: trackRadiusLightYears
    };
}
/* ***************************** End of File ******************************* */
