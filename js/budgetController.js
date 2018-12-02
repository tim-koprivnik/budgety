// BUDGET/DATA CONTROLLER
var budgetController = (function() {
    
    //Expense function constructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    //new property for Expense function constructor - calcPercentage
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };
    
    //returning percentages
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
    
    
    //Income function constructor
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    
    //calculate everything together
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum = sum + cur.value;
        });
        data.totals[type] = sum; //data.totals for every type is the sum of all the elements in type (inc or exp) array
    };
    
    
    //data structure
    var data = {
        allItems: {
            exp: [], //all of our expense objects //objects are identified by their unique id
            inc: [] //all of our income objects
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1 //we normally use '-1' for something that is nonexistent
    };
    
    
    return { //public
        addItem: function(type, des, val) {
            var newItem, ID;
            
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            //create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1; //DON'T UNDERSTAND THIS
            } else {
                ID = 0;
            }
            
            //create new item based on 'inc' or 'exp' type !!!
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            //push this new item into our data structure
            data.allItems[type].push(newItem);
            
            //return the new item
            return newItem;
        },
        
        
        //deleting items
        deleteItem: function(type, id) {
            var ids, index;
            
            // id = 6
            //data.allItems[type][id];
            // ids = [1 2 4  8]
            //index = 3
            
            ids = data.allItems[type].map(function(current) { //an array with all the ID numbers //map looping method is similar to forEach looping method, the differce is that map returns a new array
                return current.id;
            });

            index = ids.indexOf(id); //indexOf returns the index number of the element of the array that we input (id)

            if (index !== -1) { //'-1' presents when something is not found in an array
                data.allItems[type].splice(index, 1); //a method to remove/delete elements from an array //index - where we want to start removing; 1 - how many items we want to remove
            }
            
        },
        
        
        //calculating budget
        calculateBudget: function() {
            
            //calculate total income and expenses - calling 'calculateTotal' function fot both types
            calculateTotal('exp');
            calculateTotal('inc');
            
            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            //calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }            
            
            //expense = 100 and income = 300, spent 100/300 = 0.3333 * 100 = 33.333%
        },
        
        
        calculatePercentages: function() {
            
            /*
            a=20
            b=10
            c=40
            income = 100
            a=20/100=20%
            b=10/100=10%
            c=40/100=40%
            */
            
            data.allItems.exp.forEach(function(cur) { //for each item in exp variable, calcPercentage (if total income is > 0)
               cur.calcPercentage(data.totals.inc);
            });
        },
        
        
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },
        
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        
        testing: function() {
            console.log(data);
        }
    };
    
})();