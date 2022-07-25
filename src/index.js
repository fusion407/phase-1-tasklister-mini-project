// Deliverables:
// type task into input field
// click some form of submit button
// expect to see task string that was provided
// to appear in the DOM after the submit button
// has been activated    *************************** complete

// Must suppress a Default Action with Event.preventDefault()
// to do this must submit event on <form> element
// when the event lister "sees" the event, it needs to invoke
// the preventDefault() method on it     ************************ complete

// Stretch Deliverables
// implement delete function that removes task from list   ****** complete

// A priority value selected from dropdown that determines
//   color of the text in the list
//   (red:high   yellow:medium   green:low)  ******* complete
//       Bonus:implement sorting function that displays tasks in
//       ascending or descending order based on priority    ***** in progress

// An additional input field(user, duration, due date)   ****** complete

// Ability to edit tasks     ***** complete

// Something else of my choice  ***** complete
//    (add feature that allows user's input to affect the DOM)



document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.querySelector('input#new-task-description');
    const newTaskButton = document.querySelector('input#submitbtn');
    const sortButton = document.querySelector('button#sort')
    const list = document.querySelector('div#list')
    const completedTasks = document.querySelector('div#completedTasks');
    const dateForm = document.querySelector('input#dateform');
    const priorityForm = document.getElementsByName('priorityLevel');
    const tasksArray = [];
    tasksArray.priorityLevel = [];
    const priorityArray = [];

    
    function addToCompletedTasks(item) {
        let li = document.createElement('li');
        let inputTextNode = document.createTextNode(item.innerHTML);
        completedTasks.appendChild(li);
        li.appendChild(inputTextNode);
    }
    function checkPriority() {
        let priority = document.getElementsByName('priorityLevel');;
        for(i=0; i < priority.length; i++) {
            if (priority[i].checked) {
                return priority[i].value;
            } 
        }
    }
    function removeFromList(li) {
        let element = li;
        element.parentNode.removeChild(element);
        
    }
    function addToList(item, dueDate) {
        let li = document.createElement('li');
        li.contentEditable = 'true';
        let priorityValue = checkPriority();
        console.log(priorityValue);
        let priorityLevel;
        // work in progress  -- assigns listed item color
        // must tie priorityValue with taskArray (make it an object?)
        // in order to implement working sorting function
        if(priorityValue === undefined) {
            alert("must choose priority")
            return;
        } else if(priorityValue === 'High' ) {
            li.style.color = '#c94c4c';

            tasksArray.priorityLevel.push(3);
        } else if(priorityValue === 'Medium' ) {
            li.style.color = '#FFAA33';
            tasksArray.priorityLevel.push(2);
        } else if(priorityValue === 'Low' ) {
            li.style.color = '#86af49';
            tasksArray.priorityLevel.push(1);
        }

        let removebtn = document.createElement('button');
        let inputTextNode = document.createTextNode(item);
        let dateTextNode = document.createTextNode(dueDate);

        // appending elements to tasks list
        list.appendChild(li);
        li.appendChild(inputTextNode);
        list.appendChild(dateTextNode)
        list.appendChild(removebtn);
        tasksArray.push(li);
        priorityArray.push(priorityLevel);
        console.log(tasksArray.priorityLevel)

        // setting styles for removebtn
        removebtn.innerHTML = 'Complete';
        removebtn.style
            .width = 'auto'
            .height = 'auto';
        removebtn.style.marginLeft = '20px'
        removebtn.style.padding = '2px'
        removebtn.style.marginBottom = '40px'
        removebtn.style
            .color = 'black'
            .borderColor = '#c4b7a6'
            .background = 'black'
        removebtn.style.fontSize = '10px';
        removebtn.style.textAlign = 'center';

        // handling remove function event
        removebtn.onclick = function(e) {
            e.preventDefault();
            priorityArray.splice(tasksArray.indexOf(li), 1);
            tasksArray.splice(tasksArray.indexOf(li), 1);
            addToCompletedTasks(li)
            removeFromList(li);
            removeFromList(removebtn);
            removeFromList(dateTextNode)
            console.log('complete!');
            sortList();
        }
    }

    // work in progress
    
    function sortList() {
        let taskCopy = [...tasksArray]
        console.log('--------BEFORE-------')
        for(let i=0; i<tasksArray.length; i++) {
            console.log((i) + ' ' + tasksArray[i].innerHTML + ' ' + tasksArray[i].priorityLevel[i]);
        }
        // console.log('---------------------')
        // console.log('new array: ');
        // priorityArray.sort(function(a,b){
        //     return b-a
        // });
        // console.log(...priorityArray);
        // console.log(...taskCopy)
    }

    // events

    // Add button
    newTaskButton.onclick = function(e) {
        e.preventDefault();
        if(taskForm.value.length == 0) {
            alert("Please write a task");
        } else {
            addToList(taskForm.value, dateForm.value);
        }
        taskForm.value = '';
        dateForm.value = '';
        for(i=0; i < priorityForm.length; i++) {
            priorityForm[i].checked = false;
        }
    };

    // Sort button
    sortButton.onclick = function(e) {
        e.preventDefault();
        sortList();
    }
});
