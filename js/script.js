'use strict';

const
    boards = document.querySelector('.boards'),
    btnAddBoard = document.querySelector('.button');

boards.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('title')) {
        window.getSelection().selectAllChildren(target);
    } else if (target.classList.contains('cross-board')) {
        if (confirm('Удалить доску?')) {
            target.parentNode.remove();
        }
    } else if (target.classList.contains('add__btn')) {
        target.parentNode.childNodes.forEach(item => {
            if (item.classList && item.classList.contains('form')) {
                item.style.display = 'block';
                item.children[0].value = '';
            } else if (item.classList && item.classList.contains('add__btn')) {
                item.style.display = 'none';
            }
        });
    } else if (target.classList.contains('add__item-btn') && target.parentNode.parentNode.children[0].value !== '') {
        let newCard = document.createElement('div');
        newCard.classList.add('list__item');
        newCard.setAttribute('draggable', 'true');
        newCard.innerText = target.parentNode.parentNode.children[0].value;
        target.parentNode.parentNode.parentNode.children[2].append(newCard);
        target.parentNode.parentNode.parentNode.childNodes.forEach(item => {
            if (item.classList && item.classList.contains('form')) {
                item.style.display = 'none';
            } else if (item.classList && item.classList.contains('add__btn')) {
                item.style.display = 'block';
            }
        });
    } else if (target.classList.contains('cancel__item-btn')) {
        target.parentNode.parentNode.parentNode.childNodes.forEach(item => {
            if (item.classList && item.classList.contains('form')) {
                item.style.display = 'none';
            } else if (item.classList && item.classList.contains('add__btn')) {
                item.style.display = 'block';
            }
        });
    } else if (target.classList.contains('cross-card')) {
        if (confirm('Удалить карточку?')) {
            target.parentNode.remove();
        }
    }
});

boards.addEventListener('dblclick', event => {
    const target = event.target;

    if (target.classList.contains('list__item')) {
        target.parentNode.parentNode.childNodes.forEach(item => {
            if (item.classList && item.classList.contains('form')) {
                item.style.display = 'block';
                item.children[0].value = target.innerText;
            } else if (item.classList && item.classList.contains('add__btn')) {
                item.style.display = 'none';
            }
        });
        target.remove();
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
        <div class="form">
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