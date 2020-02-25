const listSelector = document.querySelectorAll('#list li'),
    tabs = [];
for (let i = 0; i < listSelector.length; i++) {
    tabs.push(listSelector[i].innerHTML);
    console.log(tabs.indexOf(""));
    alert(listSelector[i].textContent);
}

function addItem() {
    // console.log("addItem()");
    var list = document.getElementById("list");
    // var list2 = document.getElementById("list2");
    var inputText = document.getElementById("inputField").value
    
    if (!inputText) { // If input is empty
        alert("Can not add empty To-Do(s)");
        return;
    } else { // if input is already in the list
        var listItems = document.getElementById("list").childNodes;
        for (var i = 0; i < listItems.length; i++) {
            if (inputText == listItems[i].childNodes[1].data) {
                alert("To-do Already Exist!");
                return;
            }
        }
    }
    //creating new todo
    var tag = document.createElement("li");
    tag.setAttribute('draggable', 'true');
    tag.setAttribute('id', Math.random());
    tag.className = "list-group-item column";
    tag.innerHTML = '<input type="checkbox" name="category" value="One" onclick="selectTodo(this)">' + inputText +
    '<button id="btn" onclick="removeItem(this)">x</button>' +
    '<button id="btnEdit" onclick="editMe(this)">Edit</button>' +
    '<label class="switch" onclick="statusChange(this)"><input type="checkbox"><span class="slider round"></span></label>' +
    '<p id="status">pending</p>';
    list.appendChild(tag);
    document.getElementById("inputField").value = "";
    var cols = document.querySelectorAll('#list .column');
    [].forEach.call(cols, addDnDHandlers);
}

function editMe(me) {
    // console.log("editMe()");
    var todo = prompt("Edit this To-Do:", me.parentNode.childNodes[1].data);
    var oldCheck = me.childNodes[0].checked;
    if (todo == null || todo == "") {
        alert("Can not add empty To-Do(s)");
        return;
    } else {
        var list = document.getElementById("list").childNodes;
        for (var i = 0; i < list.length; i++) {
            if (todo == list[i].childNodes[1].data) {
                alert("To-do Already Exist!");
                return;
            }
        }
        // list[0].childNodes[1].data = todo;
        txt = '<input type="checkbox" name="category" value="One" onclick="selectTodo(this)">' + todo +
            '<button id="btn" onclick="removeItem(this)">x</button>' + '<button id="btnEdit" onclick="editMe(this)">Edit</button>' +
            '<label class="switch" onclick="statusChange(this)"><input type="checkbox"><span class="slider round"></span></label>' +
            '<p id="status">' + me.parentNode.childNodes[5].innerHTML + '</p>';
    }
    me.parentNode.innerHTML = txt;
}

function removeItem(me) {
    // console.log("removeItem()");
    if (tabs.length) {
        for (var i = tabs.length - 1; i >= 0; i--) {
            document.getElementById("list").removeChild(tabs[i]);
            tabs.pop();
        }
    } else {
        document.getElementById("list").removeChild(me.parentNode);
    }
}

function selectTodo(me) {
    // console.log('selectTodo');
    if (me.checked) {
        tabs.push(me.parentNode)
    } else {
        tabs.splice(tabs.indexOf(me.parentNode), 1);
    }
}

function statusChange(me) {
    // console.log('statusChange()', me.parentNode.childNodes[5].innerHTML);
    var status = me.childNodes[0].checked;
    if (status) {
        me.parentNode.classList.toggle('columnPending');
        me.parentNode.childNodes[5].innerHTML = "Done";
        console.log(me.parentNode.childNodes);

        // var tag = document.createElement("li");
        // tag.setAttribute('draggable', 'true');
        // tag.setAttribute('id', Math.random());
        // tag.className = "list-group-item column";
        // tag.innerHTML = '<input type="checkbox" name="category" value="One" onclick="selectTodoDone(this)">' +
        //     'me.parentNode.childNodes[1].data' +
        //     '<button id="btn" onclick="removeItemDone(this)">x</button>' +
        //     '<button id="btnEdit" onclick="editMeDone(this)">Edit</button>' +
        //     '<label class="switch" onclick="statusChange(this)"><input type="checkbox"><span class="slider round"></span></label>' +
        //     '<p id="status">Done</p>';

        document.getElementById("list2").appendChild(me.parentNode);
        var cols = document.querySelectorAll('#list2 .column2');
        [].forEach.call(cols, addDnDHandlers);
        removeItem(me);
    } else {
        me.parentNode.childNodes[5].innerHTML = "Pending";
    }
}












var dragSrcEl = null;

function handleDragStart(e) {
    // Target (this) element is the source node.
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);

    this.classList.add('dragElem');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    this.classList.add('over');

    e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
}

function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
}

function handleDrop(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        //alert(this.outerHTML);
        //dragSrcEl.innerHTML = this.innerHTML;
        //this.innerHTML = e.dataTransfer.getData('text/html');
        this.parentNode.removeChild(dragSrcEl);
        var dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        var dropElem = this.previousSibling;
        addDnDHandlers(dropElem);

    }
    this.classList.remove('over');
    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    this.classList.remove('over');

    /*[].forEach.call(cols, function (col) {
      col.classList.remove('over');
    });*/
}

function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false)
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);

}

var cols = document.querySelectorAll('#list .column');
[].forEach.call(cols, addDnDHandlers);