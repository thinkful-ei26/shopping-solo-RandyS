const STORE = {
    items: [ {name: "apples", checked: false}, 
    {name: "oranges", checked: false},
    {name: "milk", checked: true},
    {name: "bread", checked: false} ],
    hideCompleted: false,
};

console.log(STORE.hideCompleted)
console.log(...STORE.items)

function generateStringHTML(items) {
    return items.map((item, itemIndex) => {
        return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
    });
};

function renderShoppingList() {
    // this function will be responsible for rendering the shopping list in
    // the DOM
    let currentList = STORE.items

    if (STORE.hideCompleted) {
        currentList = STORE.items.filter(item => item.checked === false)
    }

    const html = generateStringHTML(currentList);
    $('.shopping-list').html(html);
    
    
    


//For each item in STORE, generate a string representing an <li> with:
// the item name rendered as inner text .innerHTML()      .text()
// the item's index in the STORE set as a data attribute on the <li> (more on that in a moment)
// the item's checked state (true or false) rendered as the 
//presence or absence of a CSS class for indicating checked items (specifically, .shopping-item__checked from index.css)
// Join together the individual item strings into one long string
// Insert the <li>s string inside the .js-shopping-list <ul> in the DOM.
    
    console.log('`renderShoppingList` ran');
}
  
function storeObjectGenerator(itemName) {
      return STORE.items.push(
          { name: itemName, checked: false}
      )
}
  
function handleNewItemSubmit() {
    // this function will be responsible for when users add a new shopping list item

    //store the actual name of the new item based form input --> event listener on .submit() form
    //add it as a new object name in STORE with default checked value: false

    //invoke renderShoppingList()

    $('#js-shopping-list-form').submit(event => {
        event.preventDefault();
        storeObjectGenerator($('.js-shopping-list-entry').val())
        $('.js-shopping-list-entry').val('');
        renderShoppingList();
    });
    
};

function handleHideItemsClicked() {
    $('#js-hide-completed-items-checkbox').on('click', '#toggle-filter-completed-items', event => {
        console.log(`The hide completed button was clicked.. now i will change value of hideCompleted`)
        STORE.hideCompleted = !STORE.hideCompleted
        console.log(`now the new value of STORE.hideCompleted = ${STORE.hideCompleted}. now i re render the shopping list`)
        renderShoppingList();
        console.log(`now the value of STORE.hideCompleted should still be ${STORE.hideCompleted}`)
        // toggleHideItems();
        // renderShoppingList();
    });
}

// function toggleHideItems() {
//     STORE.hideCompleted = !STORE.hideCompleted  
// }

function toggleCheckedForListItem(itemIndex) {
    console.log("Toggling checked property for item at index " + itemIndex);
    STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
  }
  
  
  function getItemIndexFromElement(item) {
    const itemIndexString = $(item)
      .closest('.js-item-index-element')
      .attr('data-item-index');
    return parseInt(itemIndexString, 10);
  }
  
  function handleItemCheckClicked() {
      // this function will be responsible for when users click the "check" button on
      // a shopping list item.
    
      //event listener on parent element of click event
      //find class name of clicked object and save title (inner HTML/text)
      //compare text with STORE.name values
      //if title matches value, update STORE.checked value from false to true or vice versa 
      //invoke renderSHoppingList()
    $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
      console.log('`handleItemCheckClicked` ran');
      const itemIndex = getItemIndexFromElement(event.currentTarget);
      toggleCheckedForListItem(itemIndex);
      renderShoppingList();
    });
  }
  
function deleteItem(itemIndex) {
    console.log(`deleteing at position ${itemIndex}`)
    return STORE.items.splice(itemIndex, 1)
}

function handleDeleteItemClicked() {
    // this function will be responsible for when users want to delete a shopping list
    // item
    //event listener on parent element of click event
    //find class name of clicked object and save title (inner HTML/text)
    //compare text with STORE.name values
    //if title matches value, remove object from STORE
    //invoke renderSHoppingList()

    $('.js-shopping-list').on('click', '.js-item-delete', event => {
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        deleteItem(itemIndex);
        renderShoppingList();
        
    });

    console.log('`handleDeleteItemClicked` ran')
  };
  
  // this function will be our callback when the page loads. it's responsible for
  // initially rendering the shopping list, and activating our individual functions
  // that handle new item submission and user clicks on the "check" and "delete" buttons
  // for individual shopping list items.
function handleShoppingList() {
    renderShoppingList();
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleHideItemsClicked();
    // toggleHideItems();
}

$(handleShoppingList);