'use strict';

const
    boards = document.querySelector('.boards'),
    btnAddBoard = document.querySelector('.button');

let
    edit = false,
    editText = '',
    draggingCard = null;

boards.addEventListener('click', e => {
    const t = e.target;

    if (t.classList.contains('title')) {
        window.getSelection().selectAllChildren(t);
    } else if (t.classList.contains('cross-board')) {
        removeBoard(t);
    } else if (t.classList.contains('add__btn')) {
        createCard(t);
    } else if (t.classList.contains('add__item-btn')) {
        addCard(t);
    } else if (t.classList.contains('cancel__item-btn')) {
        cancelCard(t);
    } else if (t.classList.contains('cross-card')) {
        removeCard(t);
    }

});

boards.addEventListener('dblclick', e => {
    const t = e.target;

    if (t.classList.contains('list__item')) {
        t.closest('.boards__item').childNodes.forEach(item => {
            if (item.classList && item.classList.contains('form')) {
                item.style.display = '';
                editText = t.firstChild.textContent;
                item.children[0].value = t.firstChild.textContent;
                item.querySelector('.add__item-btn').innerText = 'Сохранить';
                edit = true;
            } else if (item.classList && item.classList.contains('add__btn')) {
                item.style.display = 'none';
            }
        });
        t.remove();
    }

});

btnAddBoard.addEventListener('click', event => {
    event.preventDefault();

    let newBoard = document.createElement('div');
    newBoard.classList.add('boards__item');
    newBoard.innerHTML = `
        <div class="cross-board">&#10006;</div>
        <span contenteditable="true" class="title">Введите название</span>
        <div class="list"></div>
        <div class="form" style="display: none;">
            <textarea class="textarea" placeholder="Введите название для этой карточки"></textarea>
            <div class="buttons">
                <button class="add__item-btn">Добавить карточку</button>
                <button class="cancel__item-btn">Отмена</button>
            </div>
        </div>
        <div class="add__btn">
            <span>+</span>Добавить карточку
        </div>`;
    boards.append(newBoard);
});

function removeBoard(t) {
    if (confirm('Удалить доску?')) {
        t.parentNode.remove();
    }
}

function createCard(t) {
    t.parentNode.childNodes.forEach(item => {
        if (item.classList && item.classList.contains('form')) {
            item.style.display = '';
            item.children[0].value = '';
            item.children[0].classList.remove('red');
            edit ? item.querySelector('.add__item-btn').innerText = 'Сохранить' : item.querySelector('.add__item-btn').innerText = 'Добавить карточку';
        } else if (item.classList && item.classList.contains('add__btn')) {
            item.style.display = 'none';
        }
    });
}

function addCard(t) {
    if (t.closest('.form').children[0].value === '') {
        t.closest('.form').children[0].classList.add('red');
    } else {
        let newCard = document.createElement('div');
        newCard.classList.add('list__item');
        newCard.setAttribute('draggable', 'true');
        newCard.setAttribute('title', 'Double click to edit');
        t.closest('.form').childNodes.forEach(item => {
            if (item.classList && item.classList.contains('textarea')) {
                newCard.innerHTML = `${item.value}<div class="cross-card">&#10006;</div>`;
            }
        });
        t.closest('.boards__item').childNodes.forEach(item => {
            if (item.classList) {
                if (item.classList.contains('list')) {
                    item.append(newCard);
                } else if (item.classList.contains('form')) {
                    item.style.display = 'none';
                } else if (item.classList.contains('add__btn')) {
                    item.style.display = '';
                }
            }
        });
        dragCard(newCard);
        edit = false;
    }
}

function cancelCard(t) {
    if (edit) {
        let newCard = document.createElement('div');
        newCard.classList.add('list__item');
        newCard.setAttribute('draggable', 'true');
        newCard.innerText = editText;
        t.closest('.boards__item').childNodes.forEach(item => {
            if (item.classList && item.classList.contains('list')) {
                item.append(newCard);
            } else if (item.classList && item.classList.contains('form')) {
                item.style.display = 'none';
                item.querySelector('.add__item-btn').innerText = 'Добавить карточку';
            } else if (item.classList && item.classList.contains('add__btn')) {
                item.style.display = '';
            }
        });
        edit = false;
    } else {
        t.closest('.boards__item').childNodes.forEach(item => {
            if (item.classList && item.classList.contains('form')) {
                item.style.display = 'none';
            } else if (item.classList && item.classList.contains('add__btn')) {
                item.style.display = '';
            }
        });
    }
}

function removeCard(t) {
    if (confirm('Удалить карточку?')) {
        t.parentNode.remove();
    }
}

function dragCard(card) {
    card.addEventListener('dragstart', () => {
        draggingCard = card;
        setTimeout(() => {
            card.style.display = 'none';
        }, 0);
    });

    card.addEventListener('dragend', () => {
        draggingCard = null;
        setTimeout(() => {
            card.style.display = '';
        }, 0);
    })
}

function dropCard() {

}