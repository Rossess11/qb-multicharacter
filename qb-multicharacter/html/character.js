// character.js
let characters = [];
let selectedCharacter = null;
let currentMenu = "characters";
let configMaxCharacters = 2;

function loadAnimation() {
    document.getElementById('disconnect-btn').style.opacity = '1';
    setTimeout(() => {
        document.getElementById('new-character').style.opacity = '1';
    }, 200); 
    setTimeout(() => {
        document.getElementById('characters-container').style.opacity = '1';
    }, 600); 
}

function loadAnimation2() {
    document.getElementById('select-character').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('characters-container').style.opacity = '0';
    }, 200); 
    setTimeout(() => {
        document.getElementById('new-character').style.opacity = '0';
        document.getElementById('characters-container').style.display = 'none';
    }, 600); 
    setTimeout(() => {
        document.getElementById('disconnect-btn').style.opacity = '0';
    }, 1000); 
}

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('message', (event) => {
        if (event.data.action === 'ui') {
            fetch(`https://${GetParentResourceName()}/setupCharacters`, {
                method: 'POST'
            });
        }
        
        if (event.data.action === 'setupCharacters') {
            characters = event.data.characters;
            console.log(characters.length);
            renderCharacters();
            loadAnimation()
        }
    });

    initEventListeners();
});

function initEventListeners() {
    // Botón de nuevo personaje
    document.getElementById('new-character').addEventListener('click', () => {
        showCreationForm();
    });

    // Botón de desconexión
    document.getElementById('disconnect-btn').addEventListener('click', () => {
        fetch(`https://${GetParentResourceName()}/disconnectButton`, {
            method: 'POST'
        });
    });

    // Botón de confirmar creación
    document.getElementById('confirm-create').addEventListener('click', () => {
        createNewCharacter();
    });

    // Botón de cancelar creación
    document.getElementById('cancel-create').addEventListener('click', () => {
        showCharacterList();
    });

    document.getElementById('select-character').addEventListener('click', () => {
        fetch(`https://${GetParentResourceName()}/selectCharacter`, {
            method: 'POST',
            body: JSON.stringify({ cData: selectedCharacter })
        });
        loadAnimation2();
        setTimeout(() => {
            fetch(`https://${GetParentResourceName()}/closeUI`, {
                method: 'POST'
            });
        }, 2000);
    });
}

function renderCharacters() {
    const container = document.getElementById('characters-container');
    container.innerHTML = '';

    const charElementH = document.createElement('div');
    charElementH.className = 'characters-header';
    charElementH.innerHTML = `
        PERSONAJES
    `;
    container.appendChild(charElementH);

    characters.forEach((character, index) => {
        const charElement = document.createElement('div');
        charElement.className = 'character-card';
        charElement.innerHTML = `
            <div class="character-profile"></div>
            <div class="character-info">
            <a style="color: lightgrey; font-size: 14px;">${character.charinfo.firstname} ${character.charinfo.lastname}</a>
            ${character.charinfo.birthdate}<br>
            ${character.charinfo.nationality}
            </div>
            <button class="select-btn" data-index="${index}"></button>
        `;

        // Selección de personaje
        charElement.querySelector('.select-btn').addEventListener('click', (e) => {
            selectedCharacter = characters[parseInt(e.target.dataset.index)];
            fetch(`https://${GetParentResourceName()}/cDataPed`, {
                method: 'POST',
                body: JSON.stringify({ cData: selectedCharacter })
            });
            document.getElementById('select-character').style.display = 'flex';
            setTimeout(() => {
                document.getElementById('select-character').style.opacity = '1';
            }, 100);
        });
        container.appendChild(charElement);
    });
    const newCharacterBtn = document.getElementById('new-character');
    newCharacterBtn.style.display = characters.length < configMaxCharacters ? 'block' : 'none';
}

function showCreationForm() {
    currentMenu = "creation";
    document.getElementById('creation-form').style.display = 'block';
}

function showCharacterList() {
    currentMenu = "characters";
    document.getElementById('creation-form').style.display = 'none';
}

function createNewCharacter() {
    const formData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        birthdate: document.getElementById('birthdate').value,
        nationality: document.getElementById('nationality').value
    };

    if (validateForm(formData)) {
        document.getElementById('creation-form').style.opacity = '0';
        loadAnimation2();
        setTimeout(() => {
            fetch(`https://${GetParentResourceName()}/createNewCharacter`, {
                method: 'POST',
                body: JSON.stringify(formData)
            });
        }, 1000);
    }
}

function validateForm(data) {
    // Validación básica de campos requeridos
    return data.firstname && 
           data.lastname && 
           data.gender && 
           data.birthdate && 
           data.nationality;
}

// Cierre de la UI
/*document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        fetch(`https://${GetParentResourceName()}/closeUI`, {
            method: 'POST'
        });
    }
});*/


