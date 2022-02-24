//import { v4 as uuidv4 } from 'uuid';

const inputEnter = document.querySelector('#addTaskInput') as HTMLInputElement;
(document.querySelector('.bread') as HTMLElement).innerHTML += `
        	<div draggable="true" id="draggable" class="task">
                    <input id="${234234}" type="checkbox" name="r" value="2" />
                    <label for="${234234}">${'sdfgfgbsfdgd0'}</label>
                </div>
        	`;

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

//delete
(document.getElementById('delete') as HTMLButtonElement).onclick = function () {
    (document.querySelector('.deleteAll') as HTMLElement).innerHTML = '';
};

const draggables = document.querySelectorAll('#draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach((draggable) => {
    // console.dir(draggable.children[1]);
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

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
    const draggableElements = [
        ...container.querySelectorAll('.draggable:not(.dragging)')
    ];

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
