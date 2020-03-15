// ---------- ELEMENTS ----------
const container = document.querySelector('.container');
const btnGetPosts = document.querySelector('.btn-get-posts');
const btnAddPost = document.querySelector('.btn-add-post');
// -------------------------------------------------------------------------------------------------------------------


// ---------- EVENTS ----------
btnGetPosts.addEventListener('click', showAllPosts);
btnAddPost.addEventListener('click', addNewPost);
// -------------------------------------------------------------------------------------------------------------------


// ---------- EVENT ENTRY POINTS ----------
function showAllPosts() {
    getPosts(renderAllPosts);
}


function addNewPost() {
    const newPost = {
        title: 'mister alesha',
        body: 'ololo',
        userId: 155
    };
    addPost(newPost, (response) => {
        renderOnePost(response);
    })
}
// -------------------------------------------------------------------------------------------------------------------


// ---------- AJAX ----------
function getPosts(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        cb(response);
    });
    xhr.addEventListener('error', () => {
        console.log('ERROR');
    });

    xhr.send();
}


function addPost(body, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        cb(response);
    });
    xhr.addEventListener('error', () => {
        console.log('ERROR');
    });

    xhr.send(JSON.stringify(body));
}
// -------------------------------------------------------------------------------------------------------------------


// ---------- RENDER ----------
function renderOnePost(post) {
    const newPost = cardTemplate(post);
    container.insertAdjacentElement("afterbegin", newPost);
}


function renderAllPosts(posts) {
    const fragment = document.createDocumentFragment();
    posts.forEach(post => {
        fragment.appendChild(cardTemplate(post))
    });

    container.appendChild(fragment);
}
// -------------------------------------------------------------------------------------------------------------------

// ---------- MAKEUP TEMPLATES ----------
function cardTemplate(post) {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-2');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = post.title;
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = post.body;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);

    return card;
}