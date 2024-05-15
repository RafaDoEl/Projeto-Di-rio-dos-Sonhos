document.addEventListener("DOMContentLoaded", function() {
    loadDreams();
    createStars();
});

function addDream() {
    var title = document.getElementById("dream-title").value;
    var text = document.getElementById("dream-entry").value;

    if (text.trim() === "") {
        alert("Por favor, escreva um sonho válido.");
        return;
    }

    var dream = {
        id: new Date().getTime(),
        title: title,
        text: text
    };

    saveDream(dream);

    addDreamToList(dream);

    document.getElementById("dream-title").value = "";
    document.getElementById("dream-entry").value = "";
}

function saveDream(dream) {
    var dreams = getDreams();
    dreams.push(dream);
    localStorage.setItem("dreams", JSON.stringify(dreams));
}

function getDreams() {
    return localStorage.getItem("dreams") ? JSON.parse(localStorage.getItem("dreams")) : [];
}

function loadDreams() {
    var dreams = getDreams();
    dreams.forEach(addDreamToList);
}

function addDreamToList(dream) {
    var dreamsList = document.getElementById("dreams-list");

    var dreamItem = document.createElement("li");
    dreamItem.className = "dream-item";
    dreamItem.dataset.id = dream.id;

    var dreamTitle = document.createElement("h3");
    dreamTitle.textContent = dream.title;
    dreamTitle.onclick = function() {
        toggleDreamText(dream.id);
    };

    var dreamText = document.createElement("p");
    dreamText.className = "dream-text"; // Adicionamos uma classe para poder selecionar o texto facilmente
    dreamText.textContent = dream.text;
    dreamText.style.display = "none"; // Ocultamos inicialmente o texto do sonho

    var buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    var editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "Editar";
    editButton.onclick = function() {
        openEditModal(dream);
    };

    var deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Excluir";
    deleteButton.onclick = function() {
        openDeleteModal(dream);
    };

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    dreamItem.appendChild(dreamTitle);
    dreamItem.appendChild(dreamText);
    dreamItem.appendChild(buttonContainer);

    dreamsList.appendChild(dreamItem);
}

function toggleDreamText(dreamId) {
    var dreamText = document.querySelector(`.dream-item[data-id="${dreamId}"] .dream-text`);
    dreamText.style.display = dreamText.style.display === "none" ? "block" : "none";
}

function openEditModal(dream) {
    var editModal = document.getElementById("editModal");
    var editTextarea = document.getElementById("edit-dream-text");
    editTextarea.value = dream.text;
    editModal.style.display = "block";
}

function closeEditModal() {
    var editModal = document.getElementById("editModal");
    editModal.style.display = "none";
}

function saveEditedDream() {
    var editedText = document.getElementById("edit-dream-text").value;
    var dreamId = document.querySelector(".modal-content").parentNode.dataset.id;
    var dreamItem = document.querySelector(`.dream-item[data-id="${dreamId}"] p`);
    dreamItem.textContent = editedText;

    var dreams = getDreams();
    var index = dreams.findIndex(d => d.id === Number(dreamId));
    dreams[index].text = editedText;
    localStorage.setItem("dreams", JSON.stringify(dreams));

    closeEditModal(); // Fechar o modal após salvar
}

function openDeleteModal(dream) {
    var deleteModal = document.getElementById("deleteModal");
    deleteModal.dataset.id = dream.id;
    deleteModal.style.display = "block";
}

function closeDeleteModal() {
    var deleteModal = document.getElementById("deleteModal");
    deleteModal.style.display = "none";
}

function confirmDeleteDream() {
    var dreamId = document.getElementById("deleteModal").dataset.id;
    var dreams = getDreams();
    var updatedDreams = dreams.filter(d => d.id !== Number(dreamId));
    localStorage.setItem("dreams", JSON.stringify(updatedDreams));

    var dreamItem = document.querySelector(`.dream-item[data-id="${dreamId}"]`);
    dreamItem.remove();

    closeDeleteModal();
}

function createStars() {
    var stars = document.createElement("div");
    stars.className = "stars";
    document.body.appendChild(stars);
}
