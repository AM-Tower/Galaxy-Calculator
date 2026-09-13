/* ****************************************************************************
 * Written by Jeffrey Scott Flesher
 * galaxycalculator.js
 * Originally I wrote this as a math formula in 1989
 * I converted that to bash, then Qt QML, which is this code, only modified for a browser.
 * Last Update: 27 May 2024
 */
// include BigNumberMath
var isDebugMessage = 1;
// Set false when the Calculation finishes, it was a Global in the QML version
var isBusy = false;
// The Track that supports Life. 666 for our Solar System, which is where
// the Torah puts it, but that is our Galaxy, not every Galaxy, so it is an
// input with 666 as its default rather than a constant.
// It is also what anchors the Clock, every other Track takes its rate from it.
var lifeTrackDefault = 666;
// Every value the Formula derives on the way to the table, so a reader can
// check each step instead of taking the table on trust. Filled on every run.
var derivedValues = {};
var lifeTrackNumber = lifeTrackDefault;
/* ****************************************************************************
 * fixInput
 * Strip commas and spaces, then hand the digits to BigNumber as a String.
 * Do not use parseFloat, it is a Double, and a Double only holds about 17 digits,
 * so a 28 digit Galaxy Radius loses 11 of them before the Math ever sees it.
 */
function fixInput(sThis) {
    return (sThis + "").replace(/[, ]/g, "");
}
/* ****************************************************************************
 * Galaxy Calculator
 */
function galaxyCalculator(myGalaxy, mySunSize, myLivablePlanetSize, myTrinaryEngines, myGalaxyRadius, myPrintNthTrack, myLifeTrack) {
    var vStorage;
    // 1 / 137.03599913 is not more accurate
    // var trinaryMarker = ( 1/137 );
    // 0.0072992700729
    // 0.0072992700729928
    // 0.007299270072992803
    // 0.00729927007299270073
    // 0.0072992700730
    var trinaryMarker = dividedBy("1", "137", 13);
    if (isDebugMessage == 1) console.debug("trinaryMarker=" + trinaryMarker);
    /**********************************************************************
     * 42          3.141592653589793238462643383279502884197169
     * 100         3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679
     * 355 / 113 = 3.14159292035398230088495575221238938053263786810735899116172564465
     * 333 / 106 = 3.14150943396226415094339622641509433962752091994680949531609664223
     * 22  / 7   = 3.1428571428571428571428571428571428571411778652131110178457589478
     **********************************************************************/
    var pIe = "3.14159265359";
    // PI: based on this version, to use a higher or lower Precession would require recalculate of baseline.
    // do not use Math.PI=3.141592653589793
    // this uses 11 bits which is what Newton used, the above uses 15
    // Constant Precession Rate: Constant in Newtons work.
    var cpRate = "324.540503";
    // Newtons Constant for Earths Atmospheric Density based on Torr
    // I Calculated from Trinary Engines to make it generic to all Planets
    var lpDensity = "73.120284";
    // Atmospheric Pressure Index acts as a Dampener for the Core Frequency causing it to expand at a known Rate based on its Size.
    // Livable Planet Ring Frequency: aP is based on Planet Earth, I do not make this an Arguments because I have no way of getting this data
    // Torr is a unit of pressure based on an absolute scale defined as 1/760
    // Newtons Constant for Earths Atmospheric Density based on Torr
    // Note: the Torr unit is named after Evangelista Torricelli, who discovered the
    // principle of the barometer in 1644. The concept came from the Torah, In My Opinion.
    // var aP = ( lpDensity * (1/760) );
    // 0.00131578947368421053
    // 0.001315789
    vStorage = dividedBy("1", "760", 9);
    // 55571.4358457169044580856
    // 55571.435845717
    var aP = times(lpDensity, vStorage, 9);
    // aP=( lpDensity * (1/760) )=73.120284 * 0.001315789 = 0.096210865
    if (isDebugMessage == 1) console.debug("aP=( lpDensity * (1/760) )=" + lpDensity + " * " + vStorage + " = " + aP);
    // Planets Trinary Engine Rings: First=.0001, Second=0.001, Third=.01
    // Earth's first ring is 7.83 Hz. The second ring is ? Hz. And the third ring frequency is 6.66 Hz.
    var ringPlanetSecond = "0.001";
    // Used to iterate
    var currentNth = 0;
    // Used to iterate
    var printThis = 1;
    // Number of Printed lines
    var printedLines = 0;
    // Used for Track Engine Counter
    var trackEngines = 0;
    // Read in configuration
    // Our Galaxy = Milky Way
    if (isDebugMessage == 1) console.debug("myGalaxy = " + myGalaxy);
    var galaxyName = myGalaxy;
    // in Miles in Diameter
    // Sun=864575.9
    if (isDebugMessage == 1) console.debug("mySunSize = " + mySunSize);
    var sunSize = fixInput(mySunSize);
    // in Miles in Diameter
    // Earth = 7926.2109;
    if (isDebugMessage == 1) console.debug("myLivablePlanetSize = " + myLivablePlanetSize);
    var livePlanetSize = fixInput(myLivablePlanetSize);
    // This number is negative, Taken from Configuration
    // Our Solar System as 333, so to test this system set this to Negative;
    if (isDebugMessage == 1) console.debug("myTrinaryEngines = " + myTrinaryEngines);
    var trinaryEngines = parseInt(myTrinaryEngines, 10) * -1;
    // in Miles in Diameter, Taken from Configuration
    // Milky Way = 238229441887838.4639953874;
    if (isDebugMessage == 1) console.debug("myGalaxyRadius = " + myGalaxyRadius)
    var galaxyRadius = fixInput(myGalaxyRadius);
    // Taken from Configuration
    if (isDebugMessage == 1) console.debug("myPrintNthTrack = " + myPrintNthTrack);
    var printNthTrack = parseInt(myPrintNthTrack, 10);
    // Now Calculate based on Defaults from configuration
    // Liveable Planet Ring Frequency: 7926.2109 * .001 = 7.9262109 - aP = 7.830 Hz
    // var lpRingFreq=((livePlanetSize * ringPlanetSecond) - aP );
    // 7.9262109
    // 7.926
    vStorage = times(livePlanetSize, ringPlanetSecond, 3);
    var lpRingFreq = minus(vStorage, aP, 3);
    // 7926.2109 * 0.001 - 55571.435845717 = -55563.510
    if (isDebugMessage == 1) console.debug("lpRingFreq=((livePlanetSize * ringPlanetSecond) - aP ) " + livePlanetSize + " * " + ringPlanetSecond + " - " + aP + " = " + lpRingFreq);
    //console.debug("subtract lpRingFreq = " + lpRingFreq );
    //console.debug("subtract lpRingFreq - aP ~ vStorage - Ap " + vStorage + " - " + aP);
    // Precession Rate: Sun: 10,656 / 4 = 2664
    // var pRate = ( sunSize / cpRate );
    var pRate = dividedBy(sunSize, cpRate, 0);
    // 2664
    if (isDebugMessage == 1) console.debug("pRate=" + pRate);
    // Precession: you must remove the speed required to over come it.
    var maxErrorRate = pRate;
    // Life Track: the Track that supports Life, and the Track that anchors
    // the Clock. Taken from Configuration, 666 by default, because that is
    // where the Torah puts it for our Solar System. Another Galaxy may carry
    // Life on another Track, so this is not a constant.
    // The last Track in this Galaxy, totalTracks is this plus one
    var lastTrack = (Math.abs(trinaryEngines) * 4);
    if (isDebugMessage == 1) console.debug("myLifeTrack = " + myLifeTrack);
    lifeTrackNumber = parseInt(myLifeTrack, 10);
    if (isNaN(lifeTrackNumber)) lifeTrackNumber = lifeTrackDefault;
    // It has to be a Track this Galaxy actually has, and it cannot be 0,
    // because every Speed in the table is divided by it.
    if (lifeTrackNumber < 1 || lifeTrackNumber > lastTrack) {
        console.debug("Life Track " + lifeTrackNumber + " is not between 1 and " + lastTrack +
            " for a Galaxy with " + Math.abs(trinaryEngines) + " Trinary Engines, using " +
            (Math.abs(trinaryEngines) * 2) + " instead");
        lifeTrackNumber = (Math.abs(trinaryEngines) * 2);
    }
    // Do Not Skip This Track: the Life Track is always printed
    var doNotSkipThisTrack = lifeTrackNumber;
    // I adjusted the date as to not need this, but its still required
    // I adjusted so each track accumulates 1 unit more of this quantity
    // The Minimum Error Rate is an Accumulation of Errors encountered on each track
    // As such this is just a counter of errors minimized
    // This is a Calculus Error handler, so I have a Max and Min Operator
    var minErrorRate = 0;
    // Iteration Ranges
    // maxIteration: The longest an Iteration can be
    // (Diameter in miles) x 1/137 / (3 Phase) = Max Iteration in years
    //var maxIteration = (( sunSize * trinaryMarker ) / 3 );
    vStorage = times(sunSize, trinaryMarker, 0);
    var maxIteration = dividedBy(vStorage, 3, 16);
    maxIteration = Math.floor(maxIteration);
    // 2103
    //console.debug("maxIteration=" + maxIteration + " vStorage=" + vStorage);
    // aveIteration: Based on Suns Magnetic Polarity Reversals
    // Sun changes polarity 10 (0 - 9) times a Century: 100 - 9 = 91
    // var aveIteration = ( maxIteration - 91 );
    var aveIteration = minus(maxIteration, "91", 0);
    // 2012
    // minIteration: Based on Max Min of Magnetic Fields
    // I hard coded date so I did not need Error Rate: Adds down to 6
    // Note this Number 1104 was determined from long running results done by Newton
    // This number is also found in the Torah
    // var minIteration = ( maxIteration - 1104 )
    var minIteration = minus(maxIteration, "1104", 0);
    // 999
    /* **********************************************************************
     * The Clock
     * Henrietta Swan Leavitt said every Sun orbits the Galaxy at the same rate,
     * like a record on a record player, but not at the same speed.
     * That is only true when Speed rises in direct proportion to the Track Number,
     * so a Sun twice as far out travels twice as fast and still holds formation.
     *
     * The Life Track sets the rate for the whole Galaxy. It is the Track that
     * supports Life, 666 for our Solar System, and it is the one Track where the
     * original Formula and the Clock already agree, to the mile.
     * Change the Life Track and the whole Galaxy is re-scaled around the new one,
     * which is the point: another Galaxy carries Life somewhere else.
     *
     * At the Life Track the Error Rate is known without accumulating it Track by Track:
     *   Max Error Rate = pRate + Life Track = 2664 + 666 = 3330
     *   Min Error Rate =     0 + Life Track =    0 + 666 =  666
     *
     * Life Track Max Speed = ( aveIteration * |Trinary Engines| ) - Max Error Rate
     *                      = ( 2012 * 333 ) - 3330 = 666,666 mph
     * Life Track Min Speed = ( minIteration * |Trinary Engines| ) + Min Error Rate
     *                      = (  999 * 333 ) +  666 = 333,333 mph
     *
     * Divide each by the Life Track to get the Speed added per Track:
     *   666,666 / 666 = 1001        333,333 / 666 = 500.5
     * 1001 is 7 * 11 * 13, and 500.5 is 1001 halved.
     * Every Track is that rate times its own Track Number, which is a Clock,
     * and no Track can come out negative.
     **********************************************************************/
    var absEngines = Math.abs(trinaryEngines);
    // Max Error Rate at the Life Track
    vStorage = plus(maxErrorRate, doNotSkipThisTrack, 0);
    // Life Track Max Speed
    var lifeMaxSpeed = minus(times(aveIteration, absEngines, 0), vStorage, 0);
    // Min Error Rate at the Life Track
    vStorage = plus(minErrorRate, doNotSkipThisTrack, 0);
    // Life Track Min Speed
    var lifeMinSpeed = plus(times(minIteration, absEngines, 0), vStorage, 0);
    // Speed added per Track: this is what makes it a Clock
    var maxSpeedPerTrack = dividedBy(lifeMaxSpeed, doNotSkipThisTrack, 13);
    var minSpeedPerTrack = dividedBy(lifeMinSpeed, doNotSkipThisTrack, 13);
    // Publish the whole derived chain so it can be checked step by step
    derivedValues = {
        trinaryMarker: trinaryMarker,
        torr: dividedBy("1", "760", 9),
        aP: aP,
        lpRingFreq: lpRingFreq,
        pRate: pRate,
        maxIteration: maxIteration,
        aveIteration: aveIteration,
        minIteration: minIteration,
        lifeTrack: lifeTrackNumber,
        lastTrack: lastTrack,
        lifeMaxSpeed: lifeMaxSpeed,
        lifeMinSpeed: lifeMinSpeed,
        maxSpeedPerTrack: maxSpeedPerTrack,
        minSpeedPerTrack: minSpeedPerTrack
    };
    // A Galaxy with too few Trinary Engines to carry its Life Track cannot
    // produce a Speed, and every Track would come out zero or backwards.
    if (Number(lifeMaxSpeed) <= 0 || Number(lifeMinSpeed) <= 0) {
        console.debug("Life Track " + lifeTrackNumber + " gives a Speed of " + lifeMaxSpeed +
            " and " + lifeMinSpeed + ", this Galaxy needs more Trinary Engines to carry it");
    }
    if (isDebugMessage == 1) {
        console.debug("lifeMaxSpeed=" + lifeMaxSpeed + " lifeMinSpeed=" + lifeMinSpeed);
        console.debug("maxSpeedPerTrack=" + maxSpeedPerTrack + " minSpeedPerTrack=" + minSpeedPerTrack);
    }
    // maxSpeed: As it begins decent into Galactic Plane
    var maxSpeed = "0.0";
    // minSpeed: At its Maximum Amplitude
    var minSpeed = "0.0";
    // Note that there are two ways to get this value; below and using the Livable Planets Properties
    // Earth for example: Orbital distance in Miles around Sun = 584,000,000 / (365 Days * 24 Hours) = 66,666.666 MPH * .0001 = 6.6666666 Hz
    // So this is a Double Verification Process; proving that this Math actually works both ways which is Magic proving God Designed this.
    // Frequency: maxSpeed * ringSunFirst = Frequency of Livable Planet
    var lpFrequency = "0.0";
    // This is based on the First Ring of the Sun
    // Sun: First=0.00001, Second=0.0001, Third=.001: One Magnitude different then Planets
    var ringSunFirst = "0.00001";
    // Orbital Distance in Miles around the Track.
    var orbitDist = 0;
    // Track Frequency Multiplier based on Galaxy Ring of Power; 13 is Masonic Number in Bible
    var trackFreqMultiplier = "0.0000000000001"; // JavaScript=1e-13
    // Track Frequency: .0000000000001 * |minSpeed|
    var trackFreq = "0.0";
    // Track Number
    // Total number of Tracks: twice trinaryEngines ~ 666 * 2 + 1 since its 0 based: 1333
    var totalTracks = 0;
    // Counter for loop
    var currentTrackNumber = 0;

    //console.debug("isDebugMessage == 1=" + isDebugMessage == 1);
    if (isDebugMessage == 1) {
        console.debug("galaxyName=" + galaxyName);
        console.debug("sunSize=" + sunSize);
        console.debug("livePlanetSize=" + livePlanetSize);
        console.debug("trinaryEngines=" + trinaryEngines);
        console.debug("galaxyRadius=" + galaxyRadius);
        console.debug("printNthTrack=" + printNthTrack);

        console.debug("totalTracks=" + totalTracks);
        console.debug("currentTrackNumber=" + currentTrackNumber);
        console.debug("trinaryMarker=" + trinaryMarker);
        console.debug("pIe=" + pIe);
        console.debug("cpRate=" + cpRate);
        console.debug("lpDensity=" + lpDensity);
        console.debug("aP=" + aP);
        console.debug("ringPlanetSecond=" + ringPlanetSecond);
        console.debug("currentNth=" + currentNth);
        console.debug("printThis=" + printThis);
        console.debug("printedLines=" + printedLines);
        console.debug("trackEngines=" + trackEngines);
        console.debug("lpRingFreq=" + lpRingFreq);
        console.debug("pRate=" + pRate);
        console.debug("doNotSkipThisTrack=" + doNotSkipThisTrack);
        console.debug("maxErrorRate=" + maxErrorRate);
        console.debug("minErrorRate=" + minErrorRate);
        console.debug("maxIteration=" + maxIteration);
        console.debug("aveIteration=" + aveIteration);
        console.debug("minIteration=" + minIteration);
        console.debug("maxSpeed=" + maxSpeed);
        console.debug("minSpeed=" + minSpeed);
        console.debug("lpFrequency=" + lpFrequency);
        console.debug("ringSunFirst=" + ringSunFirst);
        console.debug("orbitDist=" + orbitDist);
        console.debug("trackFreqMultiplier=" + trackFreqMultiplier);
        console.debug("trackFreq=" + trackFreq);
    }

    var ans;
    // Calculate or set all variables
    trackEngines = trinaryEngines;
    // Calculate Total Tracks: absolute value * 2, then * 2, then add 1
    // Note: I do not reply on Order of Precedence in Math
    // () forces the calculation
    // People that try to Optimize Math forget what they are doing
    // I do not want to be Cleaver I want to be Clear
    totalTracks = (((Math.abs(trinaryEngines) * 2) * 2) + 1);
    // for loop
    for (currentTrackNumber = 0; currentTrackNumber < totalTracks; currentTrackNumber++) {
        //console.debug("Working on: " + currentTrackNumber);
        // Orbital Distance
        // ((238229441887838.4639953874 * 666) * 2) * 3.14159265359
        // echo "$(bc <<< "scale=13;((238229441887838.4639953874 * 666) * 2) * 3.14159265359")"
        // 1011954093357316199.999999999911810770784788
        // orbitDist = ((( Number.parseFloat(galaxyRadius).toPrecision(20) * currentTrackNumber) * 2) * Number.parseFloat(pIe).toPrecision(12) );
        vStorage = times(galaxyRadius, currentTrackNumber, 13);
        orbitDist = times(vStorage, "2", 13);
        vStorage = times(orbitDist, pIe, 13);
        // JavaScript off by 100 Miles, C++ off by 103 miles, use boost
        // orbitDist = ((( galaxyRadius * currentTrackNumber) * 2) * pIe );
        orbitDist = format(vStorage, 0);
        // maxSpeed: As it begins decent into Galactic Plane
        // Speed is the Life Track rate times this Track Number, so every Track
        // takes the same time to go around, which is what Leavitt observed.
        maxSpeed = times(maxSpeedPerTrack, currentTrackNumber, 13);
        maxSpeed = Math.floor(maxSpeed);
        //maxSpeed = ( maxSpeedPerTrack * currentTrackNumber );
        if (doNotSkipThisTrack === currentTrackNumber) {
            if (isDebugMessage == 1) {
                console.debug("******************* orbitDist=" + orbitDist);
                console.debug("galaxyRadius=" + galaxyRadius);
                console.debug("pIe=" + pIe);
                console.debug("orbitDist=" + orbitDist);
                console.debug("maxSpeed=" + maxSpeed);
            }
        }
        // minSpeed: At its Maximum Amplitude, on the same Clock as maxSpeed
        minSpeed = times(minSpeedPerTrack, currentTrackNumber, 13);
        minSpeed = Math.floor(minSpeed);
        if (doNotSkipThisTrack === currentTrackNumber) {
            if (isDebugMessage == 1) console.debug("minSpeed: minSpeedPerTrack * currentTrackNumber = " + minSpeedPerTrack + " * " + currentTrackNumber + " = " + minSpeed);
        }
        //minSpeed = ( minSpeedPerTrack * currentTrackNumber );
        // lpFrequency
        // 5 places is exact: ringSunFirst shifts the decimal 5 places, so nothing rounds.
        // At 4 places 6.66666 rounded up to 6.6667, and chopping a digit hid it as 6.666.
        lpFrequency = times(maxSpeed, ringSunFirst, 5);
        if (isDebugMessage == 1) console.debug("lpFrequency: maxSpeed * ringSunFirst = " + maxSpeed + " * " + ringSunFirst + " = " + lpFrequency);
        // lpFrequency = ( maxSpeed * ringSunFirst );
        // trackFreq
        //console.debug("minSpeed=" + minSpeed + " abs(minSpeed)=" + abs(minSpeed));
        trackFreq = times(trackFreqMultiplier, abs(minSpeed), 16);
        // These Calculations are meaningless on these Tracks, and Track 0 has
        // no Speed at all, so there is nothing to take the reciprocal of.
        if (trackEngines === trinaryEngines || trackEngines === 0 || trackEngines === 1 || trackEngines === -1) {
            trackFreq = "0.0";
        }
        else {
            // Now do the Math
            trackFreq = dividedBy(1, trackFreq, 16);
        }
        // Format: Round
        trackFreq = format(trackFreq, 0);
        //
        currentNth = currentNth + 1;
        if (printNthTrack === currentNth) {
            currentNth = 0;
            printThis = 1;
        }
        else {
            printThis = 0;
        }
        // always show 666 or Life Track
        if (doNotSkipThisTrack === currentTrackNumber) {
            printThis = 1;
        }
        //
        if (printThis === 1) {
            // 666 | 333 | 666,666 | 333,333 | 6.66666 | 1,011,954,093,357,316,200 | 30,000,030
            // 666 | 666 |
            //console.debug("trackEngines=" + trackEngines);
            trackEngines = Math.floor(trackEngines);
            //console.debug("trackEngines=" + trackEngines);
            //console.debug("before maxSpeed=" + maxSpeed + " minSpeed=" + minSpeed);
            maxSpeed = format(maxSpeed, 0);
            minSpeed = format(minSpeed, 0);
            //console.debug("maxSpeed=" + maxSpeed + " minSpeed=" + minSpeed);
            // Save to Database
            //console.debug("insertRecord(currentTrackNumber=" + currentTrackNumber + ", trackEngines=" + trackEngines + ",  maxSpeed=" + maxSpeed + ",  minSpeed=" + minSpeed + ",  lpFrequency=" + lpFrequency + ",  orbitDist=" + orbitDist + ",  trackFreq=" + trackFreq);
            insertRecord(currentTrackNumber, trackEngines, maxSpeed, minSpeed, lpFrequency, orbitDist, trackFreq);
            // Increment printed lines
            printedLines = printedLines + 1;
        } // end if ( printThis === 1 )
        // Increment Variables
        // The Error Rate is applied once, at the Life Track, where it sets the
        // rate for the Galaxy, so there is nothing left to accumulate here.
        trackEngines = trackEngines + 1;
    } // end for currentTrackNumber < totalTracks
    if (isDebugMessage == 1) console.debug("########### Galaxy Calculation Finished ############################");
    isBusy = false;
} // end galaxyCalculator
/* ****************************************************************************
 * lifeTrackLabel
 * Marks the Life Track with an asterisk. Kept out of insertRecord, which
 * writes to the DOM and so cannot be checked without a browser, while this
 * is just a String and the Test Suite can hold it to account.
 * The Life Track is |Trinary Engines| * 2, so it is 666 only when there are
 * 333 Engines. It used to be hardcoded, which marked the wrong row on any
 * other Galaxy.
 */
function lifeTrackLabel(currentTrackNumber) {
    if (parseInt(currentTrackNumber, 10) === lifeTrackNumber) {
        return "*" + currentTrackNumber;
    }
    return String(currentTrackNumber);
}
/* ****************************************************************************
 * insertRecord
 */
function insertRecord(currentTrackNumber, trackEngines, maxSpeed, minSpeed, lpFrequency, orbitDist, trackFreq) {
    var tableBody = document.getElementById("myGalacticTable");
    var newRow = tableBody.insertRow();
	newRow.classList.add("ridge");
    // Add CSS class to alternate row colors
    // Use classList.add, assigning className would wipe out the ridge class above
    newRow.classList.add(tableBody.rows.length % 2 === 0 ? "evenRow" : "oddRow");

    var cell1 = newRow.insertCell(0);
	cell1.classList.add("ridge");
    var cell2 = newRow.insertCell(1);
	cell2.classList.add("ridge");
    var cell3 = newRow.insertCell(2);
	cell3.classList.add("ridge");
    var cell4 = newRow.insertCell(3);
	cell4.classList.add("ridge");
    var cell5 = newRow.insertCell(4);
	cell5.classList.add("ridge");
    var cell6 = newRow.insertCell(5);
	cell6.classList.add("ridge");
    var cell7 = newRow.insertCell(6);
	cell7.classList.add("ridge");

    currentTrackNumber = lifeTrackLabel(currentTrackNumber);

    cell1.innerHTML = currentTrackNumber;
    cell2.innerHTML = trackEngines;
    cell3.innerHTML = maxSpeed;
    cell4.innerHTML = minSpeed;
    cell5.innerHTML = lpFrequency;
    cell6.innerHTML = orbitDist;
    cell7.innerHTML = trackFreq;
}
/* ****************************************************************************
 * myGalaxy, mySunSize, myLivablePlanetSize, myTrinaryEngines, myGalaxyRadius, myPrintNthTrack
*/
function printValues() {
    const galaxy = document.getElementById('myGalaxy').value;                       // 0
    const sunSize = document.getElementById('mySunSize').value;                     // 1
    const livablePlanetSize = document.getElementById('myLivablePlanetSize').value; // 2
    const trinaryEngines = document.getElementById('myTrinaryEngines').value;       // 3
    const galaxyRadius = document.getElementById('myGalaxyRadius').value;           // 4
    const nthTrack = document.getElementById('myPrintNthTrack').value;              // 5
    const lifeTrack = document.getElementById('myLifeTrack').value;                 // 6

    console.log(`Galaxy: ${galaxy}`);
    console.log(`Sun Size: ${sunSize}`);
    console.log(`Livable Planet Size: ${livablePlanetSize}`);
    console.log(`Trinary Engines: ${trinaryEngines}`);
    console.log(`Galaxy Radius: ${galaxyRadius}`);
    console.log(`Print Nth Track: ${nthTrack}`);
    console.log(`Life Track: ${lifeTrack}`);
    galaxyCalculator(galaxy, sunSize, livablePlanetSize, trinaryEngines, galaxyRadius, nthTrack, lifeTrack)
    showGalaxyTitle(galaxy, trinaryEngines);
    showDerivedValues();
}
/* ****************************************************************************
 * showDerivedValues
 * Puts the derived chain on the page. Every number in the table above comes
 * from these, so this is what makes the result checkable rather than asserted.
 */
function showDerivedValues() {
    var panel = document.getElementById("derivedValues");
    if (!panel) return;
    var d = derivedValues;
    var rows = [
        ["Trinary Marker", "1 / 137", d.trinaryMarker, ""],
        ["Torr", "1 / 760", d.torr, ""],
        ["Atmospheric Pressure Index", "Livable Planet Density &times; Torr", d.aP, ""],
        ["Livable Planet Ring Frequency", "(Planet Diameter &times; 0.001) &minus; aP", d.lpRingFreq, "Hz"],
        ["Precession Rate", "Sun Diameter &divide; Constant Precession Rate", d.pRate, ""],
        ["Max Iteration", "(Sun Diameter &times; Trinary Marker) &divide; 3", d.maxIteration, "years"],
        ["Ave Iteration", "Max Iteration &minus; 91", d.aveIteration, "years"],
        ["Min Iteration", "Max Iteration &minus; 1104", d.minIteration, "years"],
        ["Life Track", "taken from Configuration", d.lifeTrack, "of " + d.lastTrack],
        ["Life Track Max Speed", "(Ave Iteration &times; Engines) &minus; (Precession Rate + Life Track)", format(d.lifeMaxSpeed, 0), "mph"],
        ["Life Track Min Speed", "(Min Iteration &times; Engines) + Life Track", format(d.lifeMinSpeed, 0), "mph"],
        ["Max Speed per Track", "Life Track Max Speed &divide; Life Track", fixNumber(d.maxSpeedPerTrack), "mph per Track"],
        ["Min Speed per Track", "Life Track Min Speed &divide; Life Track", fixNumber(d.minSpeedPerTrack), "mph per Track"]
    ];
    var html = '<table class="ridge tableContainer"><thead class="ridge"><tr class="ridge">' +
        '<th class="medium-font ridge">Derived Value</th>' +
        '<th class="medium-font ridge">How</th>' +
        '<th class="medium-font ridge">Result</th></tr></thead><tbody class="medium-font">';
    var i = 0;
    for (i = 0; i < rows.length; i++) {
        html += '<tr class="ridge ' + (i % 2 === 0 ? "oddRow" : "evenRow") + '">' +
            '<td class="ridge">' + rows[i][0] + '</td>' +
            '<td class="ridge">' + rows[i][1] + '</td>' +
            '<td class="ridge">' + rows[i][2] + ' ' + rows[i][3] + '</td></tr>';
    }
    html += '</tbody></table>';
    panel.innerHTML = html;
}
/* ****************************************************************************
 * showGalaxyTitle
 * Names the Galaxy above the table, and says which Tracks it can have.
 * The last Track is Trinary Engines times 4. Not every Track carries a Sun,
 * and there is no way to know from here which ones do.
 * Reads lifeTrackNumber after the run, so it reports the Life Track actually
 * used, including the fallback when the one asked for is out of range.
 */
function showGalaxyTitle(myGalaxy, myTrinaryEngines) {
    var title = document.getElementById("galaxyTitle");
    if (!title) return;
    var lastTrack = Math.abs(parseInt(myTrinaryEngines, 10)) * 4;
    if (isNaN(lastTrack)) lastTrack = 0;
    title.innerHTML = myGalaxy + " &nbsp; Track 1 to Track " + lastTrack.toLocaleString() +
        " &nbsp; Life Track " + lifeTrackNumber.toLocaleString() +
        " &nbsp; Not every Track carries a Sun";
}
/* ****************************************************************************
 * Function to show the help dialog
 */
function showHelp(itemId) {
    var popupHelp = document.getElementById("helppopupHelp" + itemId);
    popupHelp.style.display = "block";
}
/* ****************************************************************************
 * Function to close the help dialog
 */
function closeHelp(itemId) {
    var popupHelp = document.getElementById("helppopupHelp" + itemId);
    popupHelp.style.display = "none";
}
/* ****************************************************************************
 * Function to show the popup
 */
function showPopup(containerId, imageSrc) {
    // Check if the container ID is valid
    if (!document.getElementById(containerId)) {
        console.error('Invalid container ID:', containerId);
        return;
    }

    // Display the corresponding popup container
    const popupContainer = document.getElementById(containerId);
    popupContainer.style.display = 'block';

    // Set the image source
    const popupImage = popupContainer.querySelector('.popupImage');
    popupImage.src = imageSrc;

    // Adjust image size to fit the viewport
    popupImage.style.maxWidth = window.innerWidth + 'px';
    popupImage.style.maxHeight = window.innerHeight + 'px';

    // Scroll to center the image vertically if necessary
    popupContainer.scrollTop = (popupImage.offsetHeight - popupContainer.offsetHeight) / 2;
}
/* ****************************************************************************
 * Function to close the popup
 */
function closePopup(containerId) {
    const popupContainer = document.getElementById(containerId);
    popupContainer.style.display = 'none';
}
/* ****************************************************************************
 * Test Suite, the Galaxy end
 * bignumbermath.js holds testIs, testReset and testReport, and it loads first.
 * These run the real galaxyCalculator and check the table it produces, which
 * is the only way to know the Clock still holds after any change.
 */
function testUnComma(sThis) {
    return Number(String(sThis).replace(/[,*]/g, ""));
}
/* ****************************************************************************
 * testBuildTable: run the calculator and hand back its rows
 */
function testBuildTable(myGalaxy, mySunSize, myLivablePlanetSize, myTrinaryEngines, myGalaxyRadius, myPrintNthTrack, myLifeTrack) {
    var rows = [];
    var savedInsertRecord = insertRecord;
    insertRecord = function (n, engines, maxSpeed, minSpeed, lpFrequency, orbitDist, trackFreq) {
        rows.push({
            n: n, engines: engines, maxSpeed: maxSpeed, minSpeed: minSpeed,
            lpFrequency: lpFrequency, orbitDist: orbitDist, trackFreq: trackFreq
        });
    };
    try {
        galaxyCalculator(myGalaxy, mySunSize, myLivablePlanetSize, myTrinaryEngines, myGalaxyRadius, myPrintNthTrack, myLifeTrack);
    }
    finally {
        insertRecord = savedInsertRecord;
    }
    return rows;
}
/* ****************************************************************************
 * testGalaxy
 */
function testGalaxy() {
    testReset();
    var savedDebug = isDebugMessage;
    var savedMathDebug = debugMessage;
    isDebugMessage = 0;
    debugMessage = 0;
    var i = 0;

    // ---- the Milky Way, every Track -------------------------------------
    var rows = testBuildTable("Milkyway", "864575.9", "7926.2109", "333", "238229441887838.4639953874", "1");
    testIs("track count, ((333 * 2) * 2) + 1", rows.length, 1333);

    // The Life Track, which must not have moved
    var life = null;
    for (i = 0; i < rows.length; i++) {
        if (testUnComma(rows[i].n) === 666) life = rows[i];
    }
    testIs("Life Track found", (life !== null), true);
    testIs("lifeTrackNumber, 333 Engines gives 666", lifeTrackNumber, 666);
    testIs("lifeTrackLabel marks it", lifeTrackLabel(666), "*666");
    testIs("lifeTrackLabel leaves others alone", lifeTrackLabel(665), "665");
    if (life !== null) {
        testIs("Life Track engines", life.engines, 333);
        testIs("Life Track Max Speed", life.maxSpeed, "666,666");
        testIs("Life Track Min Speed", life.minSpeed, "333,333");
        testIs("Life Track Frequency", life.lpFrequency, "6.66666");
        testIs("Life Track Orbit Distance", life.orbitDist, "996,895,259,518,900,613");
        testIs("Life Track Frequency of Track", life.trackFreq, "30,000,030");
    }

    // ---- no Track may run backwards -------------------------------------
    var negative = 0;
    for (i = 0; i < rows.length; i++) {
        if (testUnComma(rows[i].maxSpeed) < 0 || testUnComma(rows[i].minSpeed) < 0) negative = negative + 1;
    }
    testIs("Tracks running backwards", negative, 0);

    // ---- the derived chain, so a change upstream cannot move these quietly ----
    testIs("Trinary Marker, 1 / 137", derivedValues.trinaryMarker, "0.0072992700730");
    testIs("Atmospheric Pressure Index", derivedValues.aP, "0.096210865");
    // The Schumann resonance, the Earth to ionosphere cavity, is measured at 7.83 Hz
    testIs("Livable Planet Ring Frequency is 7.830 Hz", derivedValues.lpRingFreq, "7.830");
    testIs("Precession Rate", derivedValues.pRate, "2664");
    testIs("Max Iteration", derivedValues.maxIteration, 2103);
    testIs("Ave Iteration", derivedValues.aveIteration, "2012");
    testIs("Min Iteration", derivedValues.minIteration, "999");

    // ---- Speed rises in direct proportion to the Track -------------------
    var outOfStep = 0;
    for (i = 0; i < rows.length; i++) {
        var n = testUnComma(rows[i].n);
        if (testUnComma(rows[i].maxSpeed) !== (1001 * n)) outOfStep = outOfStep + 1;
    }
    testIs("Tracks where Max Speed is not 1001 * n", outOfStep, 0);

    // ---- the Clock: every Track takes the same time to go around ---------
    var minPeriod = Infinity;
    var maxPeriod = 0;
    for (i = 0; i < rows.length; i++) {
        var dist = testUnComma(rows[i].orbitDist);
        var speed = testUnComma(rows[i].maxSpeed);
        if (dist > 0 && speed > 0) {
            var period = dist / speed;
            if (period < minPeriod) minPeriod = period;
            if (period > maxPeriod) maxPeriod = period;
        }
    }
    testIs("Clock, slowest Track over fastest Track", (maxPeriod / minPeriod).toFixed(6), "1.000000");

    // ---- the Nth Track setting ------------------------------------------
    var skipped = testBuildTable("Milkyway", "864575.9", "7926.2109", "333", "238229441887838.4639953874", "66");
    testIs("every 66th Track, plus the Life Track", skipped.length, 21);

    // ---- a Galaxy that is not ours ---------------------------------------
    var other = testBuildTable("Test", "864575.9", "7926.2109", "500", "238229441887838.4639953874", "1");
    testIs("500 Engines, ((500 * 2) * 2) + 1 Tracks", other.length, 2001);

    // ---- the Life Track is an input, not a constant -----------------------
    // Left out, it defaults to 666, where the Torah puts it for our Solar System
    testBuildTable("Milkyway", "864575.9", "7926.2109", "333", "238229441887838.4639953874", "66");
    testIs("Life Track defaults to 666", lifeTrackNumber, 666);

    // Asked for another Track, the Galaxy is re-scaled around it
    var moved = testBuildTable("Milkyway", "864575.9", "7926.2109", "333", "238229441887838.4639953874", "1", "1000");
    testIs("Life Track 1000 is taken", lifeTrackNumber, 1000);
    testIs("Life Track 1000 is marked", lifeTrackLabel(1000), "*1000");
    testIs("Life Track 1000 leaves 666 unmarked", lifeTrackLabel(666), "666");
    var movedLife = null;
    var movedClockMin = Infinity;
    var movedClockMax = 0;
    for (i = 0; i < moved.length; i++) {
        if (testUnComma(moved[i].n) === 1000) movedLife = moved[i];
        var movedDist = testUnComma(moved[i].orbitDist);
        var movedSpeed = testUnComma(moved[i].maxSpeed);
        if (movedDist > 0 && movedSpeed > 0) {
            var movedPeriod = movedDist / movedSpeed;
            if (movedPeriod < movedClockMin) movedClockMin = movedPeriod;
            if (movedPeriod > movedClockMax) movedClockMax = movedPeriod;
        }
    }
    // (2012 * 333) - (2664 + 1000) = 666,332 at the Life Track
    testIs("Life Track 1000 Max Speed", movedLife.maxSpeed, "666,332");
    // Still a Clock, but the table reports Speed in whole miles per hour, and
    // 666,332 / 1000 is 666.332, which does not divide into whole numbers.
    // The innermost Track is then off by a third of a mile per hour, 0.05 percent,
    // and it shrinks to nothing further out. Track 666 is exact because
    // 666,666 / 666 is 1001, a whole number, which no other Track gives.
    testIs("Life Track 1000 still a Clock, within whole mph rounding",
        ((movedClockMax / movedClockMin) < 1.001), true);

    // Out of range for this Galaxy, fall back rather than divide by a Track
    // that does not exist. 333 Engines run 1 to 1332.
    testBuildTable("Milkyway", "864575.9", "7926.2109", "333", "238229441887838.4639953874", "66", "99999");
    testIs("Life Track past the last Track falls back", lifeTrackNumber, 666);
    testBuildTable("Milkyway", "864575.9", "7926.2109", "333", "238229441887838.4639953874", "66", "0");
    testIs("Life Track 0 falls back, nothing is divided by zero", lifeTrackNumber, 666);
    testBuildTable("Milkyway", "864575.9", "7926.2109", "333", "238229441887838.4639953874", "66", "nonsense");
    testIs("Life Track that is not a number falls back", lifeTrackNumber, 666);

    // ---- the busy flag is released ---------------------------------------
    testIs("isBusy released when finished", isBusy, false);

    isDebugMessage = savedDebug;
    debugMessage = savedMathDebug;
    console.debug("testGalaxy: " + testResults.passed + " of " + testResults.total + " passed, " +
        testResults.failed + " failed");
    return testReport();
} // end testGalaxy
/* ****************************************************************************
 * testAll: the Math functions and the Galaxy together
 */
function testAll() {
    var mathResults = test();
    var galaxyResults = testGalaxy();
    return {
        passed: mathResults.passed + galaxyResults.passed,
        failed: mathResults.failed + galaxyResults.failed,
        total: mathResults.total + galaxyResults.total,
        failures: mathResults.failures.concat(galaxyResults.failures)
    };
} // end testAll
/* ****************************************************************************
 *  calc Speeds
    Orbital Speeds
    Minimum: 333,333
    Maximum: 666,666
    Current: 477,354.850
    Variable: 7.826 hertz
    Minimum: 3.333
    Maximum: 6.666
    I need to write the Math Formula that uses this Variable to calculate the Speed.
    Average Speed = Distance / (Days * 24)
    Variable is Frequency and Wavelength and relates to Earths Resonant frequency of 7.826 hz currently
    If the Frequency is 7.826 hz, what is the Wavelength,
    Frequency * Wavelength = Speed, maximum is the Speed of Light
 */
function calcSpeeds() {
    "use strict";
    /* Rotational */
    var aDiameter = parseFloat(document.getElementById("txtDiameter").value);
    var aRotation = parseFloat(document.getElementById("txtRotation").value);
    var rotation_result = (aDiameter * Math.PI) / (aRotation * 24);
    document.getElementById("rotation_speed").innerHTML = rotation_result.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    /* Orbital */
    var aOrbitalDistance = parseFloat(document.getElementById("txtOrbitalDistance").value);
    var aOrbitalPeriod = parseFloat(document.getElementById("txtOrbitalPeriod").value);
    var obrital_result = aOrbitalDistance / (aOrbitalPeriod * 24);
    document.getElementById("orbital_speed").innerHTML = obrital_result.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
}
/* ****************************************************************************
 *  preset Combo Box
 *  Notes: cb must not be a number, cb === 1 does not work
 *  I use 365 and not 365.2, this is to keep the numbers whole,
 *  in reality this an average and not the actual speed,
 *  this calculation needs a Maximum, Minimum and Current,
 *  set useJulianDays to 1 to change this to Julian days.
 */
function presetCB(cb) {
    "use strict";
    var useJulianDays = 0;
    var earthYearInDays = 365;
    if (useJulianDays === 1) {
        earthYearInDays = 365.256;
    }
    // alert("cb=" + cb);
    var cb_diameter_miles         = 7926.2109;
    var cb_sidereal_day           = 0.99726968;
    var cb_orbital_period_days    = earthYearInDays;  // Revolution period 365
    var cb_orbital_distance_miles = 584000000;
    /* Sun 483,000 to 514,495 miles per hour or 669,600,000.000 */
    if (cb === "1") {
        cb_diameter_miles         = 864575.9; // 864948.7  864575.9 864938
        cb_sidereal_day           = 25.379995;
        cb_orbital_distance_miles = (2 * 161057496139894200) * Math.PI; // 1011954093357316200
        cb_orbital_period_days    = 242000000 * earthYearInDays;  // 88330000000
    }
    /* Mercury orbits the sun 105,947 or 105,954.682 miles */
    if (cb === "2") {
        cb_diameter_miles         = 3031.9186;
        cb_sidereal_day           = 58.646225;
        cb_orbital_distance_miles = 223700000;
        cb_orbital_period_days    = 87.97;
    }
    /* Venus orbits the sun 78,341 or 78,345.201 miles per hour */
    if (cb === "3") {
        cb_diameter_miles         = 7521.0769;
        cb_sidereal_day           = 243.0187;
        cb_orbital_distance_miles = 422500000;
        cb_orbital_period_days    = 224.7;
    }
    /* Earth orbits the sun  */
    if (cb === "4") {
        cb_diameter_miles         = 7926.2109;
        cb_sidereal_day           = 0.99726968;
        cb_orbital_distance_miles = 584000000;
        cb_orbital_period_days    = earthYearInDays;  // 365 or 365.256
        /*
        584000000 / (365 * 24) = 66666.666666667
        584000000 / 8760 = 67,000 mph
        */
    }
    /* Moon orbits Earth at a speed of 2,288 or 2,286.032 miles per hour */
    if (cb === "5") {
        cb_diameter_miles         = 2159;
        cb_sidereal_day           = 27.321661;
        cb_orbital_distance_miles = 1499070; // 477168.801082 452954.96804 1423000  1499070
        cb_orbital_period_days    = 27.323;
    }
    /* Mars orbits the sun 53,979 or 53,858.919 miles per hour */
    if (cb === "6") {
        cb_diameter_miles         = 4217.246;
        cb_sidereal_day           = 1.02595675;
        cb_orbital_distance_miles = 888000000;
        cb_orbital_period_days    = 686.98;
    }
    /* Jupiter orbits the sun 29,236 miles per hour or 29,220.354 */
    if (cb === "7") {
        cb_diameter_miles         = 88731.8063;
        cb_sidereal_day           = 0.41007;
        cb_orbital_distance_miles = 3037000000;
        cb_orbital_period_days    = 4330.6;
    }
    /* Saturn orbits the sun 21,637 miles per hour or 21,561.823 */
    if (cb === "8") {
        cb_diameter_miles         = 74974.6481;
        cb_sidereal_day           = 0.426;
        cb_orbital_distance_miles = 5565900000;
        cb_orbital_period_days    = 10755.7;
    }
    /* Uranus orbits the sun 15,290 miles per hour or 15,210.065 Equatorial rotation velocity 5791.18 mph */
    if (cb === "9") {
        cb_diameter_miles         = 31763.253;
        cb_sidereal_day           = 0.71833;
        cb_orbital_distance_miles = 11201300000;
        cb_orbital_period_days    = 30685;
    }
    /* Neptune orbits the sun 12,253 miles per hour or 12,157.543 */
    if (cb === "10") {
        cb_diameter_miles         = 30775.272;
        cb_sidereal_day           = 0.67125;
        cb_orbital_distance_miles = 17562300000;
        cb_orbital_period_days    = 60190;
    }
    document.getElementById("txtDiameter").value = cb_diameter_miles;
    document.getElementById("txtRotation").value = cb_sidereal_day;
    document.getElementById("txtOrbitalDistance").value = cb_orbital_distance_miles;
    document.getElementById("txtOrbitalPeriod").value   = cb_orbital_period_days;
    calcSpeeds();
}
/* ***************************** End of File ******************************* */
