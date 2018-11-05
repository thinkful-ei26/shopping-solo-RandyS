const STORE = {
    items: [ {name: "apples", checked: false, editingItem: false}, 
    {name: "oranges", checked: false, editingItem: false},
    {name: "milk", checked: true, editingItem: false},
    {name: "bread", checked: false, editingItem: false} ],
    hideCompleted: false,
    editItem: false,
    searchList: [],
};

console.log(STORE.searchList)

function generateStringHTML(items) {
    return items.map((item, itemIndex) => {
        return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="edit-item-button">
            <span class="button-label">Edit item name</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
    });
};

function generateSearchHTML(items) {
    return items.map((item, itemIndex) => {
        return `
            <li class="js-item-index-element" data-item-index="${itemIndex}">
            <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
            <div class="shopping-item-controls">
                <button class="shopping-item-toggle js-item-toggle">
                    <span class="button-label">check</span>
                </button>
                <button class="edit-item-button">
                    <span class="button-label">Edit item name</span>
                </button>
                <button class="shopping-item-delete js-item-delete">
                    <span class="button-label">delete</span>
                </button>
            </div>
            </li>
            
            <button class="back-to-list-button">
                <span class="button-label">Back to list</span>
            </button>
            `;
    });
};

function generateChangeItemNameHTML(items) {
    return items.map((item, itemIndex) => {
        return `
            <li class="js-item-index-element" data-item-index="${itemIndex}">
            <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
            <div class="shopping-item-controls">
                <form id="js-shopping-list-form">
                    <label for="shopping-list-entry">Change item name to: </label>
                    <input type="text" name="shopping-list-entry" class="js-shopping-list-entry" placeholder="">
                    <button type="submit">Update</button>
                </form>
            </div>
            </li>
            
            <button class="back-to-list-button">
                <span class="button-label">Back to list</span>
            </button>
            `;
    });
}

function renderShoppingList() {
    let currentList = [...STORE.items]

    if (STORE.hideCompleted) {
        //hide checked items
        currentList = STORE.items.filter(item => item.checked === false)
        const html = generateStringHTML(currentList);
        $('.shopping-list').html(html);
    } else if (STORE.searchList.length > 0) {
        //display searched item
        currentList = STORE.searchList
        const html = generateSearchHTML(currentList);
        $('.shopping-list').html(html);
    } else if (STORE.editItem === true) {
        //display searched item
        currentList = STORE.items.filter(item => item.editingItem === true)
        const html = generateChangeItemNameHTML(currentList)
        $('.shopping-list').html(html);
    } else { 
        //dispaly regular list
        const html = generateStringHTML(currentList);
        $('.shopping-list').html(html);
    } 
    console.log('`renderShoppingList` ran');
}
  
function storeObjectGenerator(itemName) {
      return STORE.items.push(
          { name: itemName, checked: false, editingItem: false}
      );
};
  
function handleNewItemSubmit() {
    // this function will be responsible for when users add a new shopping list item
    //store the actual name of the new item based form input --> event listener on .submit() form
    //add it as a new object name in STORE with default checked value: false
    //invoke renderShoppingList()
    $('#js-shopping-list-form').submit(event => {
        event.preventDefault();
        const itemName = $('.js-shopping-list-entry').val()
        storeObjectGenerator(itemName)
        $('.js-shopping-list-entry').val('');
        renderShoppingList();
    });
};

function handleSearchItemSubmit() {
    //this function will save input from search form as a variable
    //it will use that variable to find an item in STORE with the same name
    //then it should give render a new seach parameter to make a new array only of the same name
    $('#js-search-list-form').submit(event => {
        console.log('search button pressed')
        event.preventDefault();
        const searchItem = $('.js-search-list-entry').val()
        //save searched item name into variable
        console.log(`search item value is ${searchItem}`)
        STORE.searchList = STORE.items.filter(item => item.name === searchItem)
        //now have an array of objects using searched object variable
        console.log(`STORE.searchList is ${STORE.searchList}`)
        $('.js-search-list-entry').val('');
        //reset search form
        renderShoppingList();
    });
};

function handleHideItemsClicked() {
    $('#js-hide-completed-items-checkbox').on('click', '#toggle-filter-completed-items', event => {
        console.log(`The hide completed button was clicked.. now i will change value of hideCompleted`)
        STORE.hideCompleted = !STORE.hideCompleted
        // toggleHideItems();
        console.log(`now the new value of STORE.hideCompleted = ${STORE.hideCompleted}. now i re render the shopping list`)
        renderShoppingList();
    });
};

// function toggleHideItems() {
//     STORE.hideCompleted = !STORE.hideCompleted  
// };

function toggleCheckedForListItem(itemIndex) {
    console.log("Toggling checked property for item at index " + itemIndex);
    STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
    //
  }
  
  
function getItemIndexFromElement(item) {
    const itemIndexString = $(item)
      .closest('.js-item-index-element')
      .attr('data-item-index');
    return parseInt(itemIndexString, 10);
};
  
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
};
  
function deleteItem(itemIndex) {
    console.log(`deleting at position ${itemIndex}`)
    if (STORE.searchList.length > 0) {
        STORE.items.splice(itemIndex, 1)
    } else {
        STORE.items.splice(itemIndex, 1)
        renderShoppingList();
    }
};


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
        console.log(`deleteing at position ${itemIndex}`)
        deleteItem(itemIndex);
        STORE.searchList = 0
        renderShoppingList();
    });
    console.log('`handleDeleteItemClicked` ran')
};

function handleBackToListButtonClicked() {
    $('.js-shopping-list').on('click', '.back-to-list-button', event => {
        event.preventDefault();
        STORE.searchList = 0;
        renderShoppingList();
  });
};

function handleEditItemNameClicked() {
    //invoke search function
    //replace 
    $('.js-shopping-list').on('click', '.edit-item-button', event => {
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        console.log(`editing item at position ${itemIndex}`)
        STORE.editItem = true,
        STORE.items[itemIndex].editingItem = true
        renderShoppingList();      
    });
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
    handleSearchItemSubmit();
    handleEditItemNameClicked();
    handleBackToListButtonClicked();

    // toggleHideItems();
}

$(handleShoppingList);