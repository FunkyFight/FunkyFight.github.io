var app = new Vue({
    'el': '#el',
    'data': {
        state: "WAITING",
        func: "",
        antecedent: -1,
        stepone_logs: "",
        ta_logs: "",
        deriv_logs: "",
        tan_logs: ""
    }
})



$(".newExercise").click(function() {
    app.$data.state = "GENERATING"

    // Choose the function type with weight
    // SQUARE 0.5
    // POLYNOMIAL 2ND DEGREE 0.5
    var type = randomNumber(1, 100)
    console.log(type)
    
    if(1 < type < 50) {// Square
        var a = randomNumber(-10, 10) // Constant A
        app.$data.func = new algebra.Expression(`x^2`)
    } 
    if(50 < type < 100) {
        var a = randomNumber(-10, 10) // Constant A
        var b = randomNumber(-10, 10) // Constant B
        var c = randomNumber(-10, 10) // Constant C
        app.$data.func = new algebra.Expression(`(${a})x^2 + (${b})x + (${c})`).simplify()
    }
    
    // Generating antecedent
    app.$data.antecedent = randomNumber(-10, 10)



    /**
     * Calculating the image
     */
    var formula_str = app.$data.func.toString().replaceAll(/[1-9]*(x)/g, function(content) { // Replacing X's with antecedent
        if(content.length == 1) {
            return content.replace("x", `(${app.$data.antecedent})`)
        } else {
            return content.replace("x", ` * (${app.$data.antecedent})`)
        }
    })

    var formula = new algebra.Expression(formula_str); // Registering the formula
    addLogForStepOne(`f(${app.$data.antecedent}) =`, `${formula.toString()}`) // Logging the full calculation
    const image = algebra.parse(formula.toString()); // Calculating the image
    addLogForStepOne(`f(${app.$data.antecedent}) =`, `${image.toString()}`) // Logging the image

    /**
     * Calculating TA
     */
    // We first send the formula
    var formula_latex = "\\frac{f(\\alpha + h) - f(\\alpha)} {h}"
    addLogForTa("TA =", formula_latex)

    alphaplush = app.$data.func.toString().replaceAll(/[1-9]*(x)/g, function(content) { // Replacing X's with alpha + h
        if(content.length == 1) {
            return content.replace("x", `(${app.$data.antecedent} + h)`)
        } else {
            return content.replace("x", ` * (${app.$data.antecedent} + h)`)
        }
    })
    formula_latex = `\\frac{${alphaplush} - (${image})} {h}`
    addLogForTa("TA =", formula_latex)

    // Calculated + simplified
    var calculation = algebra.parse(alphaplush.toString());
    formula_latex = `\\frac{${calculation}} {h}`
    addLogForTa("TA =", formula_latex)

    // Final TA
    var temp_ta = new algebra.Expression(calculation.toString() + "/h")
    const ta = temp_ta.toString().replaceAll(/h\^2|\/h|h/g, function(content) {
        if(content == "h^2") return "h";
        if(content == "h") return "";
        if(content == "/h") return "";
    })
    addLogForTa("TA = ", ta)





    // Calculating nombre dérivé
    addLogForDeriv(`f'(${app.$data.antecedent}) = lim h -> 0 : `, "TA") // Formula first
    addLogForDeriv(`f'(${app.$data.antecedent}) = lim h -> 0 : `, ta)
    addLogForDeriv(`f'(${app.$data.antecedent}) = lim h -> 0 : `, ta.replaceAll("h", "(0)"))
    const nd = algebra.parse(ta.replaceAll("h", "(0)"));
    addLogForDeriv(`f'(${app.$data.antecedent}) = lim h -> 0 : `, nd.toString())



    // Calculating tan
    addLogForTan(`Tangeante = `, "f'(\\alpha)(x - \\alpha) + f(\\alpha)") // Formula first
    addLogForTan(`Tangeante = `, `(${nd})(x - (${app.$data.antecedent})) + (${image})`) // Replacing values
    addLogForTan(`Tangeante = `, algebra.parse(`(${nd})(x - (${app.$data.antecedent})) + (${image})`).toString())

    app.$data.ta_logs += "<br>"
    app.$data.state = "SOLVENOW"
})

// Regexes
// [\+|-|\/|\*] (x) // + or - or / or * and x 

function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}

function addLogForStepOne(text, maths) {
    app.$data.stepone_logs += text + " " + katex.renderToString(maths, {
        throwOnError: false
    });
    app.$data.stepone_logs += "<br>"
}

function addLogForTa(text, maths) {
    app.$data.ta_logs += text + katex.renderToString(maths, {
        throwOnError: false
    });
    app.$data.ta_logs += "<br>"
}

function addLogForDeriv(text, maths) {
    app.$data.deriv_logs += text + katex.renderToString(maths, {
        throwOnError: false
    });
    app.$data.deriv_logs += "<br>"
}

function addLogForTan(text, maths) {
    app.$data.tan_logs += text + katex.renderToString(maths, {
        throwOnError: false
    });
    app.$data.tan_logs += "<br>"
}