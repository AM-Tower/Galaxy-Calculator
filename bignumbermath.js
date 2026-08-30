// .import "BigNumber.js" as BigNumberJs
//
var runTest = 0;      // 0=False, 1=True
var debugMessage = 1; // 0=False, 1=True
var makeDecimal = 0;  // 0=false, 1=true
/* **********************************************************
 * Configure BigNumber once, at load, not on every operation.
 * EXPONENTIAL_AT keeps Galaxy sized numbers in plain digits instead of
 * flipping to exponential notation, which the table has no use for.
 * DECIMAL_PLACES is the working scale for division, the same idea as
 * scale in BC math. Every function here still states its own places,
 * this is only the floor underneath them.
 * Note: BigNumber.DEBUG was removed in v10. Strict validation is now
 * always on, which is what this file always asked for anyway.
 */
BigNumber.config({ EXPONENTIAL_AT: 1e+9, DECIMAL_PLACES: 20 });
/* **********************************************************
 * decimalPlacesOf
 * Every function here names its third argument sDecimalPlaces, an s for
 * String, because it may well arrive as one, straight from an HTML field.
 * BigNumber only takes a primitive Number, and since v10 it throws rather
 * than coerce, so normalize it once, here, instead of in eight places.
 * Anything unusable falls back to 0 rather than throwing at the caller.
 */
function decimalPlacesOf(sDecimalPlaces)
{
    let places = parseInt(sDecimalPlaces, 10);
    if (isNaN(places) || places < 0) places = 0;
    return places;
} // end decimalPlacesOf
/* **********************************************************
 * zeroTo: zero, carried out to the places the caller asked for.
 * Returning a bare "0.0" to someone who asked for 4 places is a lie
 * about the precision, and the caller has no way to tell.
 */
function zeroTo(places)
{
    return new BigNumber(0).toFixed(places);
} // end zeroTo
/* **********************************************************
 * piCalc: PI to any number of places, calculated rather than stored.
 * Machin's Formula, the one Newton's contemporaries computed by hand:
 *   PI = 16 * arctan(1/5) - 4 * arctan(1/239)
 * Every term is a BigNumber, so there is no limit here but time.
 * This replaces a call to PiCalculator.js, which was left behind in the
 * QML version and was never in this project, so piCalc always threw.
 */
function piCalc(numDec)
{
    var places = parseInt(numDec, 10);
    if (isNaN(places) || places < 1) places = 13;
    // Guard digits, so rounding never reaches the places we hand back
    var work = places + 10;
    var BN = BigNumber.clone({ DECIMAL_PLACES: work });
    var pi = arctanReciprocal(5, BN).times(16).minus(arctanReciprocal(239, BN).times(4));
    return pi.toFixed(places);
} // end piCalc
/* **********************************************************
 * arctanReciprocal: arctan(1/n), as the series
 * 1/n - 1/(3*n^3) + 1/(5*n^5) - 1/(7*n^7) + ...
 * Each power is the one before it divided by n squared, so the series
 * stops itself the moment a term rounds away to nothing.
 */
function arctanReciprocal(n, BN)
{
    var nSquared = new BN(n).times(n);
    var power = new BN(1).dividedBy(n);
    var sum = new BN(0);
    var term = power;
    var k = 0;
    while (!term.isZero())
    {
        sum = (k % 2 === 0) ? sum.plus(term) : sum.minus(term);
        power = power.dividedBy(nSquared);
        k = k + 1;
        term = power.dividedBy((2 * k) + 1);
    }
    return sum;
} // end arctanReciprocal
/* **********************************************************
 * PI to x places
 * 250 max if you need more use piCalc(numDec) it has no limit, but this string does.
 * Optimize: I could do a string.length, but when the length is known,
 * what is the point, but still.
 * Defaults to 13
 * The first 141 add up to 666, Numberology: 141 ~ 1 + 4 + 1 = 6
 * or use the CPU and piCalc
 */
function pI(sDecimalPlaces)
{
    var myDecimalPlaces = parseInt(sDecimalPlaces, 10);
    if (isNaN(myDecimalPlaces)) myDecimalPlaces = 13;
    var pi = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909";
    // This string carries 249 places. Answering for the last one would mean
    // rounding off a digit we do not have, so 248 is the honest limit.
    // Past that, calculate it, rather than quietly hand back fewer digits.
    if (myDecimalPlaces > (pi.length - 4)) return piCalc(myDecimalPlaces);
    // Round, do not truncate. PI to 11 places is 3.14159265359, which is the
    // pIe constant galaxycalculator.js uses. Truncating gives 3.14159265358,
    // which is not PI to 11 places and does not match that constant.
    return new BigNumber(pi).toFixed(myDecimalPlaces);
} // end pI
/* **********************************************************
 * Test Suite
 * Every function this project actually relies on, checked against an
 * answer worked out by hand. test() returns
 *   { passed, failed, total, failures[] }
 * and logs a one line summary. Run it three ways, all the same code:
 *   browser console : test()  or  testAll()
 *   browser page    : test.html
 *   command line    : node run-tests.js
 * update.bc.sh runs it and refuses to keep a new bignumber.js that fails.
 */
var testResults = { passed: 0, failed: 0, total: 0, failures: [] };
/* **********************************************************
 * testReset
 */
function testReset()
{
    testResults = { passed: 0, failed: 0, total: 0, failures: [] };
} // end testReset
/* **********************************************************
 * testReport: a copy, so a later reset cannot reach back and blank it
 */
function testReport()
{
    return {
        passed: testResults.passed,
        failed: testResults.failed,
        total: testResults.total,
        failures: testResults.failures.slice()
    };
} // end testReport
/* **********************************************************
 * testIs: compare as Strings, because every function here returns one
 */
function testIs(thisLabel, thisGot, thisExpected)
{
    let got = String(thisGot);
    let expected = String(thisExpected);
    testResults.total = testResults.total + 1;
    if (got === expected)
    {
        testResults.passed = testResults.passed + 1;
        return true;
    }
    testResults.failed = testResults.failed + 1;
    testResults.failures.push(thisLabel + "  expected [" + expected + "]  got [" + got + "]");
    return false;
} // end testIs
/* **********************************************************
 * test: the Math functions
 */
function test()
{
    testReset();
    let savedDebug = debugMessage;
    debugMessage = 0;

    // fixNumber: normalize before any operation
    testIs('fixNumber("1234.6789")', fixNumber("1234.6789"), "1234.6789");
    testIs('fixNumber("100000.000000")', fixNumber("100000.000000"), "100000.0");
    testIs('fixNumber("42")', fixNumber("42"), "42.0");
    testIs('fixNumber("0.00000")', fixNumber("0.00000"), "0.0");
    testIs('fixNumber("-5.500")', fixNumber("-5.500"), "-5.5");

    // the four operations
    testIs('plus("1","1",0)', plus("1", "1", 0), "2");
    testIs('minus("3","1",0)', minus("3", "1", 0), "2");
    testIs('times("1","2",0)', times("1", "2", 0), "2");
    testIs('dividedBy("4","2",0)', dividedBy("4", "2", 0), "2");

    // this is the whole reason for the library: 0.1 + 0.2 is not 0.3 in floating point
    testIs('plus("0.1","0.2",1) floating point', plus("0.1", "0.2", 1), "0.3");
    testIs('minus("0.3","0.1",1) floating point', minus("0.3", "0.1", 1), "0.2");

    // 28 significant digits must survive, a Double holds about 17
    testIs('times keeps 28 significant digits',
        times("241828072282107.5071453596951", "2", 13), "483656144564215.0142907193902");
    // the Galaxy Radius the calculator ships with, R0 / 666, must survive too
    testIs('times keeps the measured Galaxy Radius',
        times("238229441887838.4639953874", "2", 13), "476458883775676.9279907748000");

    // the constants the Galaxy Calculator is built on
    testIs('dividedBy("1","137",13) Trinary Marker', dividedBy("1", "137", 13), "0.0072992700730");
    testIs('dividedBy("1","760",9) Torr', dividedBy("1", "760", 9), "0.001315789");

    // abs
    testIs('abs("-5")', abs("-5"), "5.0");
    testIs('abs("5")', abs("5"), "5.0");
    testIs('abs("0")', abs("0"), "0.0");

    // square roots
    testIs('sqrt("9",4)', sqrt("9", 4), "3.0000");
    testIs('sqrt("2",13)', sqrt("2", 13), "1.4142135623731");
    testIs('squareRoot("144",2)', squareRoot("144", 2), "12.00");
    testIs('sqrt("0",4) zero keeps the places', sqrt("0", 4), "0.0000");
    testIs('sqrt("-9",4) negative has no root', sqrt("-9", 4), "0.0000");

    // format, the thousands separators the table needs
    testIs('format("1234567.9",2)', format("1234567.9", 2), "1,234,567.90");
    testIs('format("1000",0)', format("1000", 0), "1,000");
    testIs('format("0",2) zero keeps the places', format("0", 2), "0.00");
    testIs('format(orbitDist,0)', format("1011954093357316200", 0), "1,011,954,093,357,316,200");

    // divide by zero must not throw, and must keep the places asked for
    testIs('dividedBy("1","0",4) guard', dividedBy("1", "0", 4), "0.0000");
    testIs('dividedBy("0","5",4) guard', dividedBy("0", "5", 4), "0.0000");

    // places may arrive as a String from an HTML field, or missing
    testIs('dividedBy("1","137","13") String places', dividedBy("1", "137", "13"), "0.0072992700730");
    testIs('times("2","3","4") String places', times("2", "3", "4"), "6.0000");
    testIs('plus("1","2",null) missing places', plus("1", "2", null), "3");

    // PI, stored and calculated, must agree with each other and with pIe
    testIs('pI(11) matches the pIe constant', pI(11), "3.14159265359");
    testIs('piCalc(11) matches the pIe constant', piCalc(11), "3.14159265359");
    testIs('pI(13) === piCalc(13)', pI(13), piCalc(13));
    testIs('pI(200) === piCalc(200)', pI(200), piCalc(200));
    testIs('piCalc(50)', piCalc(50), "3.14159265358979323846264338327950288419716939937511");
    testIs('pI(300) hands off to piCalc', String(pI(300).length - 2), "300");

    // the odds and ends
    testIs('modInverse(3,7)', modInverse(3, 7), "5");
    testIs('modInverseJs(3,7)', modInverseJs(3, 7), "5");
    testIs('isInArray("Abc",["abc","def"])', isInArray("Abc", ["abc", "def"]), "true");
    testIs('isInArray("xyz",["abc"])', isInArray("xyz", ["abc"]), "false");

    debugMessage = savedDebug;
    console.debug("test: " + testResults.passed + " of " + testResults.total + " passed, " +
        testResults.failed + " failed");
    return testReport();
} // end test
/* **********************************************************
 * isInArray
 */
function isInArray(thisItem, thisArray)
{
    return thisArray.indexOf(thisItem.toLowerCase()) > -1;
} // end isInArray
/* **********************************************************
 * modInverseJs
 */
function modInverseJs(thisNumber, thisMod)
{
    let thatNumber = thisNumber % thisMod;
    let x = 0;
    for (x = 1; x < thisMod; x++)
    {
       if ((thatNumber * x) % thisMod === 1)
       {
          return x;
       }
    }
    // should never get here
    return thisNumber;
} // end modInverseJs
/* **********************************************************
 * modInverse
 */
function modInverse(thisNumber, thisMod)
{
    let thatNumber = new BigNumber(thisNumber);
    thatNumber = thatNumber.modulo(thisMod);
    let x = 0;
    for (x = 1; x < thisMod; x++)
    {
       if (thatNumber.times(x).modulo(thisMod).toString() === "1")
       {
          return x;
       }
    }
    // should never get here
    return thisNumber;
} // end modInverse
/* **********************************************************
 * squareRoot
 */
function squareRoot(sThis, sDecimalPlaces)
{
    let places = decimalPlacesOf(sDecimalPlaces);
    let fThis = sThis + "";
    fThis = fixNumber(fThis);
    if (fThis === "0.0")
    {
        return zeroTo(places);
    }
    if (fThis.charAt(0) === "-")
    {
        console.debug("squareRoot error: a negative number has no square root (" + fThis + ")");
        return zeroTo(places);
    }
    let bnThis = new BigNumber(fThis);
    let sqrValue = new BigNumber(0);
    try
    {
        sqrValue = bnThis.squareRoot();
    }
    catch (e)
    {
        if (e instanceof Error && e.message.indexOf('[BigNumber Error]') === 0)
        {
            console.debug("BigNumber squareRoot Error: " + e);
        }
    }
    if (debugMessage === 1)
        console.debug("BigNumber squareRoot(" + fThis + ") = " + sqrValue.toString() + " formated: " + sqrValue.decimalPlaces(places).toFixed(places));
    return sqrValue.decimalPlaces(places).toFixed(places);
} // end squareRoot
/* **********************************************************
 * sqrt
 */
function sqrt(sThis, sDecimalPlaces)
{
    let places = decimalPlacesOf(sDecimalPlaces);
    let fThis = sThis + "";
    fThis = fixNumber(fThis);
    if (fThis === "0.0")
    {
        return zeroTo(places);
    }
    if (fThis.charAt(0) === "-")
    {
        console.debug("sqrt error: a negative number has no square root (" + fThis + ")");
        return zeroTo(places);
    }
    let bnThis = new BigNumber(fThis);
    let sqrValue = new BigNumber(0);
    try
    {
        sqrValue = bnThis.sqrt();
    }
    catch (e)
    {
        if (e instanceof Error && e.message.indexOf('[BigNumber Error]') === 0)
        {
            console.debug("BigNumber sqrt Error: " + e);
        }
    }
    if (debugMessage === 1)
        console.debug("BigNumber sqrt(" + fThis + ") = " + sqrValue.toString() + " formated: " + sqrValue.decimalPlaces(places).toFixed(places));
    return sqrValue.decimalPlaces(places).toFixed(places);
} // end sqrt
/* **********************************************************
 * dividedBy
 */
function dividedBy(sThis, sThat, sDecimalPlaces)
{
    let places = decimalPlacesOf(sDecimalPlaces);
    let fThis = sThis + "";
    let fThat = sThat + "";
    fThis = fixNumber(fThis);
    fThat = fixNumber(fThat);

    if (fThat === "0.0")
    {
        console.debug("dividedBy error, cannot divide by zero (" + fThis + ", " + fThat + ", " + sDecimalPlaces + ")")
        return zeroTo(places);
    }
    if (fThis === "0.0")
    {
        return zeroTo(places);
    }

    let bnThis = new BigNumber(fThis);
    let bnThat = new BigNumber(fThat);
    let result = 0;
    try
    {
        result = bnThis.dividedBy(bnThat);
    }
    catch (e)
    {
        if (e instanceof Error && e.message.indexOf('[BigNumber Error]') === 0)
        {
            console.debug("BigNumber dividedBy Error: " + e);
        }
    }
    if (debugMessage === 1)
        console.debug("BigNumber a / b= " + fThis + " / " + fThat + " = " + result.toString() + " formated: " + result.decimalPlaces(places).toFixed(places));
    return result.decimalPlaces(places).toFixed(places);
} // end dividedBy
/* **********************************************************
 * times
 */
function times(sThis, sThat, sDecimalPlaces)
{
    let places = decimalPlacesOf(sDecimalPlaces);
    let fThis = sThis + "";
    let fThat = sThat + "";
    fThis = fixNumber(fThis);
    fThat = fixNumber(fThat);
    let bnThis = new BigNumber(fThis);
    let bnThat = new BigNumber(fThat);

    let result = 0;
    try
    {
        result = new BigNumber(bnThis.times(bnThat))
    }
    catch (e)
    {
        if (e instanceof Error && e.message.indexOf('[BigNumber Error]') === 0)
        {
            console.debug("BigNumber times Error: " + e);
        }
    }
    if (debugMessage === 1)
        console.debug("BigNumber a * b= " + fThis + " * " + fThat + " = " + result.toString() + " formated: " + result.decimalPlaces(places).toFixed(places));
    return result.decimalPlaces(places).toFixed(places);
} // end times
/* **********************************************************
 * plus
 */
function plus(sThis, sThat, sDecimalPlaces)
{
    let places = decimalPlacesOf(sDecimalPlaces);
    let result = 0;
    let fThis = sThis + "";
    let fThat = sThat + "";
    fThis = fixNumber(fThis);
    fThat = fixNumber(fThat);
    if (debugMessage === 1)
        console.debug("BigNumber a + b ~ [" + fThis + "] + [" + fThat + "]");

    let bnThis = new BigNumber(fThis + "");
    let bnThat = new BigNumber(fThat + "");
    try
    {
        result = bnThis.plus(bnThat);
    }
    catch (e)
    {
        if (e instanceof Error && e.message.indexOf('[BigNumber Error]') === 0)
        {
            console.debug("BigNumber plus Error: " + e);
        }
    }
    if (debugMessage === 1)
        console.debug("BigNumber a + b= [" + fThis + "] + [" + fThat + "] = " + result.decimalPlaces(places).toFixed(places));
    return result.decimalPlaces(places).toFixed(places);
} // end plus
/* **********************************************************
 * minus
 */
function minus(sThis, sThat, sDecimalPlaces)
{
    let places = decimalPlacesOf(sDecimalPlaces);
    let fThis = sThis + "";
    let fThat = sThat + "";
    fThis = fixNumber(fThis);
    fThat = fixNumber(fThat);
    let bnThis = new BigNumber(fThis);
    let bnThat = new BigNumber(fThat);
    let result = 0;
    try
    {
        result = bnThis.minus(bnThat);
    }
    catch (e)
    {
        if (e instanceof Error && e.message.indexOf('[BigNumber Error]') === 0)
        {
            console.debug("BigNumber minus Error: " + e);
        }
    }
    if (debugMessage === 1)
        console.debug("BigNumber a - b= " + fThis + " - " + fThat + " = " + result.toString());
    return result.decimalPlaces(places).toFixed(places);
} // end minus
/* **********************************************************
 * fixNumber("0.00000") = "0.0"
 * 100000 = 100000
 * 1234.5678 = 1234.5678
 * 100000.000000 = 100000.0 or 100000
 *
    BigNumber a + b= [1.0] + [1.0]
    BigNumber a + b= [1.0] + [1.0]
 */
function fixNumber(sThis)
{
    let fThis = sThis + "";
    // if not a float return
    if (fThis.indexOf(".") < 1) return fThis + ".0";
    let newThis = "";
    let returnThis = "";
    let isPositive = 0;
    let i = 0;
    let signThis = "";
    if (fThis.charAt(0) === '-') signThis = "-";
    // reverse the numbers to rid 0 as last decimal
    for (i = fThis.length - 1; i > -1; i--)
    {
        //
        if (fThis.charAt(i) !== '-' && fThis.charAt(i) !== '+')
        {
            if (fThis.charAt(i) !== '0')
            {
                isPositive = 1;
            }
            if (isPositive === 1)
            {
                newThis = newThis + fThis.charAt(i);
            }
        } // end if
    } // end for
    // reverse the numbers
    for (i = newThis.length - 1; i > -1; i--)
    {
        returnThis = returnThis + newThis.charAt(i);
    } // end for
    if (returnThis.charAt(returnThis.length - 1) === ".")
    {
        if (makeDecimal === 0)
        {
            returnThis = returnThis + "0";
        }
        else
        {
            returnThis = returnThis.substring(0, returnThis.length - 1);
        }
    } // end if .
    return signThis + returnThis;
} // end fixNumber
/* **********************************************************
 * abs
 */
function abs(sThis)
{
    let fThis = sThis + "";
    fThis = fixNumber(fThis);
    if (fThis === "0.0" || fThis === "-0.0") return "0.0";
    if (fThis.charAt(0) === "-" || fThis.charAt(0) === "+") return fThis.substring(1, fThis.length);
    return fThis;
} // end abs
/* **********************************************************
 * format Number
 */
function format(sThis, sDecimalPlaces)
{
    if (debugMessage === 1) console.debug("format(" + sThis + ", " + sDecimalPlaces + ")");
    let places = decimalPlacesOf(sDecimalPlaces);
    let fThis = sThis + "";
    fThis = fixNumber(fThis);
    if (fThis === "0.0" || fThis === "0") return zeroTo(places);
    let ndp = fThis.substring(fThis.indexOf(".") + 1, fThis.length);
    // do not give it a number like x.0, just x
    if (ndp === "0")
    {
        fThis = fThis.substring(0, fThis.indexOf("."));
    }
    // if (debugMessage) console.debug("format fThis=" + fThis + " ndp=" + ndp);
    let y = new BigNumber(fThis + "");
    // if (debugMessage) console.debug("format y=" + y);
    if (fThis.indexOf(".") > 0)
    {
        return y.toFormat(places);  // "1,234,567.90"
    }
    return y.toFormat();  // "1,234,567"
} // end format
/* **********************************************************
 * runTest
 */
if (runTest === 1) test();
/* ***************************** End of File ******************************* */
