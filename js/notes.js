import { createTableList, createArchivedList, createStatusList } from './table.js';
// let data = [];
let noteToRedact = null;

let data = [
    {
        id: "1",
        name: "Shopping List",
        createdAt: "01.01.2023",
        category: "Task",
        content: "Apples, bread",
        dates: "",
        archived: false
    },
    {
        id: "2",
        name: "The theory of evolution",
        createdAt: "02.02.2023",
        category: "Random Thought",
        content: "Charles Darwin was a British naturalist who proposed the theory of biological evolution",
        dates: "",
        archived: false
    },
    {
        id: "3",
        name: "New Feature",
        createdAt: "03.03.2023",
        category: "Idea",
        content: "New feature definition (03/03/2023): Something that is new has been recently created (05/03/2023)",
        dates: "03/03/2023 05/03/2023",
        archived: false
    },
    {
        id: "4",
        name: "William Gaddis",
        createdAt: "04.04.2023",
        category: "Quote",
        content: "New feature definition: Something that is new has been recently created",
        dates: "",
        archived: false
    },
    {
        id: "5",
        name: "Task",
        createdAt: "05.05.2023",
        category: "Task",
        content: "fffff ffffffff fffffffffffffffff",
        dates: "",
        archived: false
    },
    {
        id: "6",
        name: "One Man",
        createdAt: "06.06.2023",
        category: "Quote",
        content: "fffff ffffffff fffffffffffffffff",
        dates: "",
        archived: false
    },
    {
        id: "7",
        name: "Some Idea",
        createdAt: "07.07.2023",
        category: "Idea",
        content: "idea ideaa ideaaaaaa",
        dates: "",
        archived: false
    }
];



const mainTable = document.querySelector(".main-table__body");
const archivedTable = document.querySelector(".archived-table__body");
const statusTable = document.querySelector(".status-table__body");
const modal = document.querySelector("[data-modal]");
const modalCloseButton = document.querySelector(".modal-close__button");
const archiveButton = document.querySelector(".modal-archive__button");
const createNoteButton = document.querySelector(".modal-create__button");
const submitForm = document.querySelector(".form");

updateLists(data);


// async function fetchNotes() {
//     try {
//         const response = await fetch('../data/data.json');
//         const notes = await response.json();
//         data = notes;
//         updateLists(data);
//     } catch (error) {
//         // console.error("Error: ", error.message);
//     }    
// };

// fetchNotes();

mainTable.addEventListener("click", handleOperationsWithNotes);
archivedTable.addEventListener("click", handleUnArchiveNote);
archiveButton.addEventListener("click", handleShowArchive);
createNoteButton.addEventListener("click", handleShowCreateNoteForm);
submitForm.addEventListener("submit", handleSubmitFormData);



function handleSubmitFormData(e) {
    e.preventDefault();
    const { elements: { category, name, content } } = e.currentTarget;   

    if (name.value === "" || content.value === "") {
        return alert("Please fill in all the fields!");
    }

    const dates = content.value.match(/\d{1,2}[./]\d{1,2}[./]\d{2,4}/g);

    noteToRedact ? updateNote(category, name, content, dates) : data = [...data, createNote(category, name, content, dates)];
    
    updateLists(data);
    noteToRedact = null;
    e.currentTarget.reset();
}

function createNote(category, name, content, dates) {
    return {
        id: Date.now().toString(),
        name: name.value,
        createdAt: new Date().toLocaleDateString(),
        category: category.value,
        content: content.value,
        dates: dates ? dates.join(" ") : "",
        archived: false
    };
}

function updateNote(category, name, content, dates) {
    data.forEach(note => {
        if (note.id === noteToRedact.id) {
            note.name = name.value;
            note.category = category.value;
            note.content = content.value;
            note.dates = dates ? dates.join(" ") : "";
        }
    });
}

function handleShowCreateNoteForm() {
    modal.classList.remove("drop-bg--is-hidden");
    submitForm.classList.remove("form--is-hidden");
    modalCloseButton.addEventListener("click", handleCloseModal);
}


function handleShowArchive() {
    modal.classList.remove("drop-bg--is-hidden");
    document.querySelector(".archived-table").classList.remove("archived-table--is-hidden");
    modalCloseButton.addEventListener("click", handleCloseModal);
}

function handleOperationsWithNotes(e) {
    const idNote = e.target.dataset.id;

    if (e.target.classList.contains('redact')) {
        handlePreRedact(idNote);
    }

    if (e.target.classList.contains('archieve')) {
        toggleArchivedNote(data, idNote);
    }

    if (e.target.classList.contains('delete')) {
        handlePreDelete(idNote);
    }
}

function handlePreRedact(idNote) {
    noteToRedact = data.find(({id}) => id === idNote);
    handleShowCreateNoteForm();
    submitForm.category.value = noteToRedact.category;
    submitForm.name.value = noteToRedact.name;
    submitForm.content.value = noteToRedact.content;
}

function handlePreDelete(idNote) {
    data = data.filter(({ id }) => id !== idNote);
    updateLists(data);
}

function updateLists(data) {
    mainTable.innerHTML = isNotesPresent(data) ? createTableList(data) : "List is empty";
    archivedTable.innerHTML = checkArchived(data) ? createArchivedList(data) : "List is empty";
    statusTable.innerHTML = createStatusList(data);
}

function checkArchived(data) {
    return data.find(({archived}) => archived === true);
}

function isNotesPresent(data) {
    const count = data.reduce((acc, { archived }) => {
        archived && acc++;
        return acc;
    }, 0);
    return count < data.length && data.length > 0;
}

function handleUnArchiveNote(e) {
    if (e.target.nodeName !== "BUTTON") return;

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
    submitForm.name.value = "";
    submitForm.content.value = "";
    modal.classList.add("drop-bg--is-hidden");
    document.querySelector(".archived-table").classList.add("archived-table--is-hidden");
    submitForm.classList.add("form--is-hidden");
}