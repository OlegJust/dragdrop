//import { v4 as uuidv4 } from 'uuid';

const inputEnter = document.querySelector('#addTaskInput') as HTMLInputElement;

inputEnter.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        if (inputEnter.value.length == 0) {
            alert('Please Enter a Task');
        } else {
            // const id: string = uuidv4();
            const id: number = Math.floor(Math.random() * 10000);

            addTask('ToDo', String(id), inputEnter.value);

            inputEnter.value = '';
        }
    }
});
const containers = document.querySelectorAll('.container');

//delete
(document.getElementById('delete') as HTMLButtonElement).onclick = function () {
    // console.log(containers);
    (document.querySelector('.deleteAll') as HTMLElement).innerHTML = '';
};

containers.forEach((container) => {
    (container as HTMLElement).addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging') as HTMLElement;
        if (afterElement == null) {
            container.appendChild(draggable); // добавляет узел в конец списка дочерних элементов
        } else {
            container.insertBefore(draggable, afterElement);
            //добавляет элемент в  список дочерних элементов родителя перед указанным элементом.
        }
    });
});

function getDragAfterElement(container: any, y: any) {
    console.log('1');

    const draggableElements = [
        ...container.querySelectorAll('.task:not(.dragging)')
    ];
    console.log(draggableElements);
    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}
