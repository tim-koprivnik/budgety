// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) { //IIFE
    
    var setupEventListeners = function() { //function for all event listeners
        var DOM = UICtrl.getDOMstrings(); //to get all DOM strings/elements
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); //for adding an item

        document.addEventListener('keypress', function(event) { //'event' is there so we can call 'keyCode' function on it 
            if (event.keyCode === 13 || event.which === 13) { //'13' is for 'enter'; 'event.which' is for older browsers
                ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem); //for deleting an item
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType); //for changing type - income (+) or expense (-)
    };
    
    
    var updateBudget = function() {
        
        //1. calculate the budget
        budgetCtrl.calculateBudget();
        
        //2. return the budget
        var budget = budgetCtrl.getBudget();
        
        //3. display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    
    
    var updatePercentages = function() {
        
        //1. calculate percentages
        budgetCtrl.calculatePercentages();
        
        //2. read/get percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        
        //3. update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };
    
    
    var ctrlAddItem = function() { //function for adding an item
        var input, newItem;
        
        //1. get the field input data
        input = UICtrl.getInput();        
        
        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            //2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4. clear the fields
            UICtrl.clearFields();

            //5. calculate and update budget
            updateBudget();
            
            //6. calculate and update percentages
            updatePercentages();
        }
    };
    
    
    var ctrlDeleteItem = function(event) { //function for deleting an item
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID) {
            
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            //1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            //2. delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            //3. update and show the new budget
            updateBudget();
            
            //4. calculate and update percentages
            updatePercentages();
        }
    };
    
    
    return { //public
        init: function() { //initialization function
            console.log('Application "Budgety" has started.');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners(); //calling function for all event listeners
        }
    };
    
})(budgetController, UIController); //calling the function


controller.init(); //without this, nothing will happen