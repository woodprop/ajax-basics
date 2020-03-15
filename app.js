

// ---------- ELEMENTS ----------
const container = document.querySelector('.container');
const btnGetPosts = document.querySelector('.btn-get-posts');




// ---------- EVENTS ----------
btnGetPosts.addEventListener('click', showAllPosts);







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






function showAllPosts() {
    getPosts(renderAllPosts);
}



function renderAllPosts(posts) {
    const fragment = document.createDocumentFragment();
    posts.forEach(post => {
        fragment.appendChild(cardTemplate(post))
    });

    container.appendChild(fragment);
}


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