import { createTableList, createArchivedList, createStatusList } from './table.js';
let data = [];

const mainTable = document.querySelector(".main-table__body");
const archivedTable = document.querySelector(".archived-table__body");
const statusTable = document.querySelector(".status-table__body");
const modal = document.querySelector("[data-modal]");
const archiveButton = document.querySelector(".modal-archive__button");
// const archivedTableButtons = document.querySelector(".main-table__body");

fetch('../data/data.json')
    .then((response) => response.json())
    .then((json) => {
        data = json;
        updateLists(data);
        // mainTable.insertAdjacentHTML('beforeend', createTableList(data));
    });

mainTable.addEventListener("click", handleOperationsWithNotes);
archivedTable.addEventListener("click", handleUnArchiveNote);
archiveButton.addEventListener("click", handleShowArchive);



// modalButton.addEventListener("click", e => {
//     console.log(e.target);
//     document.querySelector('[data-rowid="1"]').remove();
// });


function handleShowArchive() {
    modal.classList.remove("drop-bg--is-hidden");
    document.querySelector(".archived-table").classList.remove("archived-table--is-hidden");
    document.querySelector(".modal-button").addEventListener("click", handleCloseModal);
}

function handleOperationsWithNotes(e) {

    if (e.target.classList.contains('redact')) {
        console.log(e.target.dataset.id);
    }

    if (e.target.classList.contains('archieve')) {
        const idNote = e.target.dataset.id;
        toggleArchivedNote(data, idNote);
    }

    if (e.target.classList.contains('delete')) { 
        const idNote = e.target.dataset.id;
        document.querySelector(`[data-rowid="${idNote}"]`).remove();
        data = data.filter(({ id }) => id !== idNote);
    }
}

function updateLists(data) {
    mainTable.innerHTML = createTableList(data);
    archivedTable.innerHTML = createArchivedList(data);
    statusTable.innerHTML = createStatusList(data);
}

function handleUnArchiveNote(e) {
    if (e.target.nodeName !== "BUTTON") {
        return;
    }

    const idNote = e.target.dataset.id;
    toggleArchivedNote(data, idNote);
}

function toggleArchivedNote(data, idNote) {
    data.forEach(note => {
        if (note.id === idNote) note.archived = !note.archived;
    });
    updateLists(data);
}

function handleCloseModal() {
    modal.classList.add("drop-bg--is-hidden");
    document.querySelector(".archived-table").classList.add("archived-table--is-hidden");
}