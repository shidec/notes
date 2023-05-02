import Note from './Note.js';

'use strict';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("serviceworker.js", 
    {
        scope: '/notes'
    });
 }

const notes = [];
let dbNotes;
let container;
let lastId = 0;
let editId = 0;

window.addEventListener('load', function(){
    container = document.getElementById('container');
    const bgModal = document.getElementById('bgModal');
    const modalEdit = document.getElementById('modalEdit');
    const textEdit = document.getElementById('textEdit');

    const btnAdd = document.getElementById('btnAdd');
    
    const btnEditClose = document.getElementById('btnEditClose');
    const btnEditSave = document.getElementById('btnEditSave');

    const btnColors = document.querySelectorAll('.btnColors');

    btnColors.forEach(item => item.addEventListener('click', function(){
        textEdit.style.backgroundColor = this.getAttribute('data-color');
    }));

    btnAdd.addEventListener('click', function(){
        editId = 0;
        textEdit.value = '';
        textEdit.style.backgroundColor = '#fff';
        showModal(modalEdit, bgModal);

        textEdit.focus();
    });

    btnEditClose.addEventListener('click', function(){
        hideModal(modalEdit, bgModal);
    });

    btnEditSave.addEventListener('click', function(){
        if(editId == 0){
            lastId++;
            let item = {id: lastId, text: textEdit.value, backgroundColor: textEdit.style.backgroundColor, x: 20, y: 20};
            dbNotes.push(item);

            const note = new Note(item, container, editItem, updatePositionItem, deleteItem);
            notes.push(note);

            renderAll();
        }else{
            notes.forEach((item, index) => {
                if(item.id == editId){
                    item.text = textEdit.value;
                    item.backgroundColor = textEdit.style.backgroundColor;
    
                    dbNotes[index].text = item.text;
                    dbNotes[index].backgroundColor = item.backgroundColor;
    
                    localStorage.setItem('notes', JSON.stringify(dbNotes));
                    renderAll();
    
                    return;
                }
            });

        }
        hideModal(modalEdit, bgModal);
    });

    
    let stNotes = localStorage.getItem('notes');
    dbNotes = (stNotes == null) ? [] : JSON.parse(stNotes);

    if(dbNotes.length == 0){
        let dt0 = {id: 1, text: "Hello world!", backgroundColor: '#acf', x: 100, y: 100};
        dbNotes.push(dt0);

        localStorage.setItem('notes', JSON.stringify(dbNotes));
    }    

    const editItem = function(id, text, bgColor){
        editId = id;
        textEdit.value = text;
        textEdit.style.backgroundColor = bgColor;
        
        showModal(modalEdit, bgModal);

        textEdit.focus();
    }

    const updatePositionItem = function(id){
        notes.forEach((item, index) => {
            if(id == item.id){
                dbNotes[index].x = item.x;
                dbNotes[index].y = item.y;

                localStorage.setItem('notes', JSON.stringify(dbNotes));
                return;
            }
        });
    }

    const deleteItem = function(id){
        notes.forEach((item, index) => {
            if(id == item.id){
                notes.splice(index, 1);
                dbNotes.splice(index, 1);

                localStorage.setItem('notes', JSON.stringify(dbNotes));
                return;
            }
        });
        renderAll();
    }

    dbNotes.forEach(item => {
        const note = new Note(item, container, editItem, updatePositionItem, deleteItem);
        notes.push(note);
        if(lastId < item.id) lastId = item.id;
    });

    renderAll();
});
function renderAll(){
    container.innerHTML = '';
    notes.forEach(note => {
        note.render();
    });
}

function showModal(modal, bg){
    bg.style.display = 'block';
    modal.style.display = 'block';
}

function hideModal(modal, bg){
    bg.style.display = 'none';
    modal.style.display = 'none';
}