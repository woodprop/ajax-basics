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
    // getPosts(renderAllPosts);
    const request = http();
    request.get('https://jsonplaceholder.typicode.com/posts', renderAllPosts);
}


function addNewPost() {
    const request = http();
    const newPost = {
        title: 'mister alesha',
        body: 'ololo',
        userId: 155
    };
    const headers = {
        'Content-type': 'application/json; charset=UTF-8',
    };

    request.post('https://jsonplaceholder.typicode.com/posts', newPost, headers, renderOnePost);

}
// -------------------------------------------------------------------------------------------------------------------


// ---------- AJAX ----------
function http() {
    return {
        get(url, cb) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.addEventListener('load', () => {
                    if (Math.floor(xhr.status / 100) !== 2) {
                        cb(`Error! Status code: ${xhr.status}`, xhr);
                        return;
                    }

                    const response = JSON.parse(xhr.responseText);
                    cb(null, response);
                });
                xhr.addEventListener('error', () => {
                    cb(`Error! Status code: ${xhr.status}`, xhr);
                });

                xhr.send();
            }
            catch (error) {
                cb(error);
            }
        },
        post(url, body, headers, cb) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                if (headers) {
                    Object.entries(headers).forEach(([key, value]) => {
                        xhr.setRequestHeader(key, value);
                    });
                }

                xhr.addEventListener('load', () => {
                    if (Math.floor(xhr.status / 100) !== 2) {
                        cb(`Error! Status code: ${xhr.status}`, xhr);
                        return;
                    }

                    const response = JSON.parse(xhr.responseText);
                    cb(null, response);
                });
                xhr.addEventListener('error', () => {
                    cb(`Error! Status code: ${xhr.status}`, xhr);
                });

                xhr.send(JSON.stringify(body));
            }
            catch (error) {
                cb(error);
            }
        }

    };
}

// -------------------------------------------------------------------------------------------------------------------


// ---------- RENDER ----------
function renderOnePost(error, post) {
    if (error) {
        console.log(error);
        return;
    }
    const newPost = cardTemplate(post);
    container.insertAdjacentElement("afterbegin", newPost);
}


function renderAllPosts(error, posts) {
    if (error) {
        console.log(error);
        return;
    }

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