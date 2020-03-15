function eval() {
    // Do not use eval!!!
    return;
}

function validParentheses(parens){
    let count=0;
    for(let i in parens){

        if(parens[i]=="("){count++;}
        if(parens[i]==")"){count--;}
        if(count<0){throw new Error("ExpressionError: Brackets must be paired");}
        if((parens[i] == '0')&(parens[i-1] == '/')){throw new Error("TypeError: Division by zero.");}

    }

    if(count != 0) {throw new Error("ExpressionError: Brackets must be paired");}
}
function easyCalc(str){
    
    expr = str.replace(/(\*|\/|\+|\-)/g, " $& ").split(' ');
	
	    for(let i = 0; i < expr.length; i++){
			if(expr[i] == ''){expr.splice(i,1);i--}
		}
		if(expr[0] == '-'){expr[1] = Number(expr[1]) * -1;expr.splice(0, 1);}
		for(let i = 0; i < expr.length; i++){
			if((expr[i] == '-')&(expr[i + 1] == '-')){ expr[i+1] = '+';expr.splice(i, 1);i-- }
			if((expr[i] == '/')&(expr[i + 1] == '-')){ expr[i+2] = Number(expr[i+2]) * -1;expr.splice(i+1, 1);}
            if((expr[i] == '*')&(expr[i + 1] == '-')){ expr[i+2] = Number(expr[i+2]) * -1;expr.splice(i+1, 1);}
            if((expr[i] == '+')&(expr[i + 1] == '-')){ expr[i+2] = Number(expr[i+2]) * -1;expr.splice(i+1, 1);}
			}
		
	
    for(let i = 0; i < expr.length; i++){
       
            let temp = 0;
            if((expr[i - 1] == '/')&(expr[i] != '-')){
                temp = Number(expr[i - 2]) / Number(expr[i]);
                expr.splice(i - 2, 3, temp);
                i -= 2;
            }
            if(expr[i - 1] == '*'){
                temp = Number(expr[i - 2]) * Number(expr[i]);
                expr.splice(i - 2, 3, temp);
                i -= 2;
            }

        
    
    }
    for(let i = 0; i < expr.length; i++){
            let temp = 0;
            if(expr[i - 1] == '+'){temp = Number(expr[i - 2]) + Number(expr[i])
					expr.splice(i - 2, 3, temp)
					i -= 2;
			}
			if(expr[i - 1] == '-'){temp = Number(expr[i - 2]) - Number(expr[i])
					expr.splice(i - 2, 3, temp)
					i -= 2;
			}
        }
    
    return Number(expr[0])
}

function expressionCalculator(expr) {
    expr = expr.split(' ').filter(element => element != "").join('');
    validParentheses(expr);
    if(/\(/g.test(expr)){ 
    expr = expr.replace(/(\)|\(|\*|\/|\+|\-)/g, " $& ").split(' ');  	
    for(let i = 0; i < expr.length; i++){
        if(expr[i] == ''){expr.splice(i,1);i--}
    }
    var indices = [];
    var idx = expr.indexOf('(');
    while (idx != -1) {
        indices.push(idx);
        idx = expr.indexOf('(', idx+1);
      }
for(let k = indices.length -1;k>=0;k--){
	let i = indices[k];		
	let tempArr = [];
	for( i ; i < expr.length; i++){
	let j = i + 1;
        if(expr[i] == '('){
			for(j; j<expr.length; j++){
				if(expr[j] == ')'){break}
				tempArr.push(expr[j]);				
			}
			let valueInParens = easyCalc(tempArr.join(''));
			expr.splice(i,tempArr.length + 2, valueInParens);
			i--;
		}
    }
  }    
    return  easyCalc(expr.join(''));
}   
 else{ return  easyCalc(expr);}
}
module.exports = {
    expressionCalculator
}